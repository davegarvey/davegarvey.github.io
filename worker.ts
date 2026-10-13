interface Env {
	ASSETS: Fetcher;
	ARO_SERVICE: Fetcher;
	ARO_ORIGIN: string;
	ARO_SITE_ID: string;
	ARO_INGESTION_KEY?: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const isFeed = url.pathname === "/feed.xml" && (request.method === "GET" || request.method === "HEAD");
		const timestamp = Date.now();

		// Let Cloudflare's asset handler preserve its normal body, validators and cache headers.
		const response = await env.ASSETS.fetch(request);

		if (isFeed && env.ARO_INGESTION_KEY) {
			ctx.waitUntil(reportFeedRequest(request, url, response.status, timestamp, env));
		}

		return response;
	},
} satisfies ExportedHandler<Env>;

async function reportFeedRequest(
	request: Request,
	url: URL,
	status: number,
	timestamp: number,
	env: Env,
): Promise<void> {
	try {
		const payload = JSON.stringify({
			site: env.ARO_SITE_ID,
			id: crypto.randomUUID(),
			timestamp,
			hostname: url.hostname,
			path: url.pathname,
			method: request.method,
			status,
			category: "feed",
			userAgent: (request.headers.get("User-Agent") ?? "").slice(0, 2048),
		});

		// Escaping can expand a user agent; skip an oversized report, never the feed.
		if (new TextEncoder().encode(payload).byteLength > 4096) return;

		const report = await env.ARO_SERVICE.fetch(new Request(new URL("/v1/request", env.ARO_ORIGIN), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${env.ARO_INGESTION_KEY}`,
			},
			body: payload,
			signal: AbortSignal.timeout(2000),
			redirect: "manual",
		}));
		await report.body?.cancel();
	} catch {
		// Feed delivery must succeed even when reporting fails.
	}
}

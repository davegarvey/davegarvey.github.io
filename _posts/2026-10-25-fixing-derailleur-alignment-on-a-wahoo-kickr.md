---
layout: post
title: Fixing derailleur alignment on a Wahoo Kickr
date: 2026-10-25 17:54:34 +0100
feed_id: urn:uuid:3dd71ba2-ce28-43ab-8fbd-2a777aa41101
description: Noisy gears on a Wahoo Kickr that shift perfectly on the road can mean the trainer is squeezing your frame. How to check, and how thin washers fix it without re-indexing.
image:
  path: /assets/images/cards/fixing-derailleur-alignment-on-a-wahoo-kickr-5807aa1c.png
  width: 1200
  height: 630
  alt: "A light grey bike sprocket on a dark background, with three orange washers in a row beside it."
tags:
  - cycling
---

> **Try this at your own risk.** Wahoo "strongly discourages" adding washers to the Kickr and says it may void your warranty. Contact Wahoo support first. I did, and only tried this because their answer meant re-indexing my gears every time I moved between the road and the trainer. This is what worked on my bike and trainer; check your own setup carefully before riding.

If your gears shift perfectly on the road but are noisy on a Wahoo Kickr, check how far your thru-axle turns before it's tight. If it turns further on the trainer than in your wheel, the trainer is slightly narrower than your hub and is squeezing the frame. That tilts the derailleur out of line with the cassette, which causes the noise. A few thin washers on the trainer's non-drive-side adapter fix it, and you don't have to touch the indexing.

<!--more-->

## The problem

My bike is a 2025 Canyon Aeroad with Shimano 105 Di2 12-speed and a 12x142 mm thru-axle. The trainer is a Wahoo Kickr v6 with its standard 142 mm adapters and the same 105 cassette as my wheel.

On the road the gears were perfect. On the Kickr they were noisy, worse in some sprockets than others, with the clicking you hear when the chain is about to change gear.

## The cause

When mounting the bike, I noticed the axle took about a quarter turn more to tighten on the Kickr than in the wheel. So the Kickr is slightly narrower, and tightening the axle pulls the dropouts in. The drive-side dropout is held against the trainer at the axle, so as it's pulled in, it bends slightly and tilts the derailleur hanger inwards. The derailleur ends up a fraction out of line with the cassette, which is enough to upset 12-speed indexing.

<figure>
  <p class="figure-title"><strong>Washers stop the trainer squeezing the frame</strong></p>
  <img src="{{ '/assets/images/fixing-derailleur-alignment-on-a-wahoo-kickr/washers-schematic.svg' | relative_url }}" alt="Two rear views of the back of a bike on a trainer. Without washers, the dropouts are pulled in, the derailleur hanger tilts inwards and the derailleur sits to one side of its sprocket. With washers behind the non-drive-side adapter's collar, the frame sits at its natural width and the derailleur lines up with the sprocket.">
  <figcaption>Rear view, not to scale, with the tilt exaggerated. The washers sit in the recess that holds the adapter, between its collar and the trainer.</figcaption>
</figure>

To check yours, compare how far the axle turns before it's tight, in the wheel and on the trainer:

- **It turns further on the trainer.** The trainer is narrower than your hub. Washers can fix this.
- **It turns less on the trainer.** The trainer is wider and is spreading the frame. Washers can only add width, so they won't help. Check you have the right adapters fitted, then ask Wahoo.
- **It turns about the same.** Width isn't the problem, so look elsewhere.

## What I ruled out

**Re-indexing.** Wahoo's support team suggested this. But the indexing would then be wrong on the road, so I'd have to redo it every time I switched. And with the derailleur tilted, I doubt it would ever be quite right in every gear.

**A freehub spacer.** I tried a spacer behind the cassette on the Kickr to move the cassette out. It made no difference, or made it slightly worse. The cassettes were identical, so the drive side was never the problem.

## The fix

The Kickr's non-drive-side adapter (Adapter D in Wahoo's manual) slides into the trainer, and a collar stops it going in too far. Washers on the inner side of the collar make it sit slightly further out, which widens the trainer to match your wheel's hub. The axle then tightens at the same point as it does in the wheel, and the frame isn't squeezed.

1. Pull the non-drive-side adapter out.
2. Slide a washer over it, against the inner side of the collar: the side with the arrow, which points into the trainer.
3. Refit the adapter and mount the bike.
4. Tighten the axle to the frame maker's torque. It should tighten a little sooner than before, and closer to where it does in the wheel.
5. Ride through the gears under real load and check whether the noise has improved.
6. Repeat until you're happy.

I used three 20x24x0.2 mm metal washers (20 mm inside, 24 mm outside, 0.2 mm thick), sold as RC car spares. That's 0.6 mm in all, and it fixed the noise. I'd recommend buying a multipack of thin washers, so you can build up the width gradually and find what works for your bike.

Once the washers are fitted, you'll probably never see them again: you only need to remove the adapter if you switch to a bike with a different axle standard. The washers sit behind the collar, so the interface between the dropouts and the trainer's adapters is unchanged.

Don't expect perfection. Even in 0.2 mm steps you may not land on exactly the right width, and because a trainer holds the bike rigidly, the frame flexes more than on the road, which adds some noise anyway.

## Further reading

- Wahoo, [Bicycle frame compatibility (KICKR)](https://support.wahoofitness.com/hc/en-us/articles/4407140853650-Bicycle-Frame-Compatibility-KICKR). Which hubs and adapters the Kickr supports, and Wahoo's warning about washers in its own words.
- Wahoo, [Updated KICKR/CORE thru axle adapter installation](https://support.wahoofitness.com/hc/en-us/articles/360018850859-Updated-KICKR-CORE-thru-axle-adapter-installation). Shows this kind of mismatch is real: in 2020 several new frames didn't fit older Kickrs properly, and Wahoo made new adapters.
- Wahoo, [KICKR v6 (2022) Smart Trainer Information & FAQ](https://support.wahoofitness.com/hc/en-us/articles/115000296704-KICKR-v6-2022-Smart-Trainer-Information-FAQ). Names each adapter in the box, so you can tell which one to take out.

---
title: GR-00 / GR0X Morphing Humanoid
codename: GR0X
summary: A single humanoid platform that reconfigures its own morphology — including prismatic legs that change length (≈71–100 cm) — to take on the advantages of multiple robot body types for different tasks.
role: Founder & research lead · 12-person team
date: 2025-05-01
featured: true
order: 1
status: active
tags: [Humanoid, Mechanism Design, ROS 2, CAN FD, RL Locomotion]
# cover: ../../assets/projects/gr0x-cover.jpg   # TODO: add a cover photo, then uncomment
# coverAlt: GR0X humanoid prototype on the test stand
# video: /media/gr0x-loop.mp4                    # TODO: short compressed loop (<3 MB) or a YouTube URL
repo: https://github.com/Juan-Pablo-Espinosa/GR-0X
links: []
specs:
  Lab: ALMaS Research Group, WPI
  Program: WPI Major Qualifying Project (MQP)
  Team: 12 (incl. 3 M.S. students, 5 seniors)
  Leg length: 71–100 cm (variable)
  Compute: Jetson AGX Thor + Raspberry Pi 5
  Control loop: 200 Hz over 2× CAN FD
  Actuators: RobStride RS-02 / RS-03 / RS-04
  Power: 48 V · 13S4P pack
  Sponsors: Microchip Technology · Polymaker · G20 Inc.
---

## Problem

Robots are usually built around one body type, and a platform tuned for one
task is a compromise for every other. GR0X asks a different question: **can a
single humanoid reconfigure its own morphology** to take on the advantages of
multiple robot body types — changing limb length to trade off strength, reach
and speed for the task at hand?

## My role

I founded GR0X and serve as its **research lead** in the ALMaS Research Group
at WPI, leading a **12-person research team** (including 3 M.S. students and 5
seniors) through WPI's Major Qualifying Project program. I architected the
control system, direct the mechanical and electrical integration across the
platform, and **advise 2 of the lab's 3 M.S. thesis projects**, guiding
research on morphology–performance trade-offs (strength, reach, speed).

I also secured sponsorship and in-kind support from **Microchip Technology,
Polymaker and G20 Inc.**, funding hardware, materials and compute.

## Approach

- **Adaptive lower body.** A planetary lead-screw prismatic limb mechanism
  lets each leg extend from roughly 71 cm to 100 cm. A **provisional USPTO
  patent** has been filed.
- **Distributed multi-brain control (ROS 2).** A Jetson AGX Thor runs the
  reinforcement-learning locomotion policy and talks over ROS 2 on Ethernet to
  a Raspberry Pi 5, which runs a **200 Hz motor control loop across two CAN FD
  buses** (see [robstride-motor-control](/projects/robstride-motor-control/)).
- **Actuation.** RobStride RS-02, RS-03 and RS-04 actuators.
- **Power.** A 48 V 13S4P battery with hierarchical power distribution.
- **Learning.** Locomotion policies are trained in Isaac Lab
  (see [RL Locomotion Training](/projects/rl-locomotion/)).

## Results

- **Adaptive lower-body / leg subsystem fully validated**, with working
  RL-based locomotion policies.
- Provisional patent filed; mechanism submitted to the 2026 ASME Student
  Mechanism and Robot Design Competition.
- **In progress:** the upper-body subsystem (torso, arms, actuation) and
  preparation for sim-to-real transfer.

---
title: GR-00 / GR0X Morphing Humanoid
codename: GR0X
summary: A humanoid robot with prismatic limbs that change length (legs ≈71–100 cm), so it can adapt its morphology to the task — even mid-task.
role: Lead engineer · 12-person research team
date: 2025-09-01  # TODO: confirm start date (only month/year is displayed)
featured: true
order: 1
status: active
tags: [Humanoid, Mechanism Design, ROS 2, CAN FD, Embedded Linux, RL]
# cover: ../../assets/projects/gr0x-cover.jpg   # TODO: add a cover photo, then uncomment
# coverAlt: GR0X humanoid prototype on the test stand
# video: /media/gr0x-loop.mp4                    # TODO: short compressed loop (<3 MB) or a YouTube URL
repo: https://github.com/Juan-Pablo-Espinosa/GR-0X
links: []
specs:
  Leg length: 71–100 cm (variable)
  Compute: Jetson AGX Thor + Raspberry Pi 5
  Control loop: 200 Hz over 2× CAN FD
  Actuators: RobStride RS-02 / RS-03 / RS-04
  Power: 48 V · 13S4P pack
  Team: 12 (grad + undergrad)
  # TODO: confirm sponsors can be listed publicly, then uncomment:
  # Sponsors: Microchip Technology · G20.INC · Polymaker
---

## Problem

Humanoid robots are built with a fixed body. Leg length, reach and center of
mass are frozen at design time, so a platform tuned for one task is a
compromise for every other. GR0X asks a different question: **what if the
robot could change its own morphology** — lengthening or shortening its limbs to
fit the task, and even doing so mid-task?

## My role

I founded the project under Daedamorph Robotics and serve as **lead engineer**,
leading a 12-person research team of master's students, seniors and
undergraduates. I own the system architecture and drive the limb mechanism,
electrical architecture and low-level control software.

## Approach

- **Prismatic limb mechanism.** A novel planetary lead-screw mechanism lets each
  leg extend from roughly 71 cm to 100 cm. I built a physical prototype and
  collected load-testing data to validate it. A **provisional USPTO patent** has
  been filed on the mechanism.
- **Compute & control architecture.** A Jetson AGX Thor runs the reinforcement
  learning locomotion policy and talks to a Raspberry Pi 5 over ROS 2 on
  Ethernet. The Pi runs a **200 Hz motor control loop across two CAN FD buses**
  (see [robstride-motor-control](/projects/robstride-motor-control/)).
- **Actuation.** RobStride RS-02, RS-03 and RS-04 quasi-direct-drive actuators.
- **Power.** A 48 V 13S4P battery with hierarchical power distribution.
- **Learning.** Locomotion policies are trained in simulation with Isaac Lab
  (see [RL Locomotion Training](/projects/rl-locomotion/)).

## Results

- Prismatic limb prototype built and load-tested.
- Provisional patent filed on the limb mechanism.
- Mechanism submitted to the 2026 ASME Student Mechanism and Robot Design Competition.
- End-to-end control stack running: policy computer → ROS 2 → 200 Hz CAN FD motor loop.
- **Locomotion validation is in progress** on the full robot.

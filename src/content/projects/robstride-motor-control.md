---
title: robstride-motor-control
codename: RS-CTL
summary: A production-grade C++ library for RobStride actuators over Linux SocketCAN — 200 Hz threaded control, per-motor fault handling and a two-bus ROS 2 node.
role: Author & maintainer
date: 2026-03-01  # TODO: confirm start date (only month/year is displayed)
featured: true
order: 2
status: active
tags: [C++, SocketCAN, CAN FD, ROS 2, systemd]
repo: https://github.com/Juan-Pablo-Espinosa/robstride-motor-control
links: []
specs:
  Language: C++
  Transport: Linux SocketCAN (CAN FD)
  Loop rate: 200 Hz, threaded
  Target: Raspberry Pi 5 (GR0X)
---

## Problem

GR0X drives RobStride actuators split across two CAN FD buses. The robot
needs a control layer that is **deterministic, fault-tolerant and safe to power
on unattended** — not a collection of test scripts.

## My role

Sole author. I designed the architecture, wrote the library and ROS 2 nodes,
and integrated it on the robot's Raspberry Pi 5.

## Approach

- **200 Hz threaded control loop** talking to actuators through Linux SocketCAN.
- **Per-motor fault detection with auto-disable**, so one faulted actuator
  cannot take down the rest of the robot.
- **Acceleration limiting** and a global **emergency stop**.
- A **two-bus ROS 2 node** with per-leg enable/disable for bring-up and testing.
- A **keyframe walking test node** for exercising the legs before a learned
  policy is in the loop.
- **systemd auto-start**, so the control stack comes up with the robot.

## Results

- Running as the motor-control layer of the GR0X humanoid.
- Open source on GitHub.

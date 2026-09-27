---
title: RL Locomotion Training
codename: RL-LOCO
summary: An Isaac Lab + PPO training pipeline for GR0X locomotion, validated against the Unitree G1 29-DOF — now producing working locomotion policies for the adaptive lower body.
role: Pipeline developer
date: 2026-05-01  # TODO: confirm start date (only month/year is displayed)
featured: true
order: 4
status: active
tags: [Isaac Lab, Reinforcement Learning, PPO, Python, Simulation]
repo: https://github.com/Juan-Pablo-Espinosa/grox-isaac-lab
links: []
specs:
  Simulator: NVIDIA Isaac Lab
  Algorithm: PPO (rsl_rl)
  Reference robot: Unitree G1 · 29 DOF
---

## Problem

A learned locomotion policy is the plan for making GR0X walk, and a policy is
only as good as the training pipeline behind it. Before training on the
robot's own model, the pipeline itself had to be proven correct.

## My role

I set up and debugged the training pipeline end to end.

## Approach

- Built on **Isaac Lab** and **unitree_rl_lab** with **PPO**.
- Used the **Unitree G1 (29 DOF)** as a known-good reference to validate the
  pipeline before switching to the GR0X model.
- Tracked down and fixed multiple pipeline issues, including **configuration
  mismatches with rsl_rl** and **observation divergence** between training and
  evaluation.

## Results

- Working RL-based locomotion policies for the GR0X adaptive lower body.
- In progress: preparing sim-to-real transfer.

/**
 * Site-wide identity & settings.
 *
 * This is the ONE place for your name, links and the boot-log text.
 * Everything else (projects, publications, news…) lives in `src/content/`.
 * Leave a value as an empty string ('') to hide the matching link everywhere.
 */
export const site = {
  name: 'Juan Pablo Espinosa',
  /** Short form used in the logo and boot prompt. */
  handle: 'juanpablo',
  /** One-line identity shown in the hero and in meta descriptions. */
  identity: 'Robotics engineer and research lead of GR0X, a morphing humanoid robot at WPI.',
  description:
    'Juan Pablo Espinosa — robotics engineer and research lead of the GR0X morphing humanoid in the ALMaS Research Group at WPI. B.S. Robotics Engineering & Computer Science.',
  location: 'Worcester, MA',
  url: 'https://juan-pablo-espinosa.github.io',

  contact: {
    /** Every address listed is shown; the first one is the primary "Email" button. */
    emails: [
      { label: 'Email', address: 'juanpabloespinosachessal@gmail.com' },
      { label: 'WPI Email', address: 'jchessal@wpi.edu' },
    ],
    github: 'https://github.com/Juan-Pablo-Espinosa',
    linkedin: 'https://www.linkedin.com/in/Juan-Pablo-ESCH',
  },

  /** Path (inside /public) to your resume. The CV page detects whether it exists. */
  resumePath: '/cv/Juan-Pablo-Espinosa-CV.pdf',

  /** Hero loop video (inside /public). Keep it short, muted, <3 MB. Optional. */
  heroVideo: '/media/hero-loop.mp4',
  heroPoster: '/media/hero-poster.jpg',

  /**
   * Boot sequence shown once per session on the home page.
   * Each string is one line. `[  OK  ]` is highlighted automatically.
   */
  boot: {
    enabled: true,
    lines: [
      'GR0X-OS 0.1 (Ubuntu 24.04 LTS / ROS 2 Jazzy) tty1',
      '[    0.000000] Linux version 6.8.0-rpi (aarch64) · Raspberry Pi 5',
      '[  OK  ] Mounted /boot/firmware.',
      '[  OK  ] Started systemd-networkd.service - Network Configuration (eth0 → Jetson AGX Thor)',
      '[  OK  ] Started gr0x-can.service - CAN FD bus bring-up (can0, can1)',
      '[  OK  ] Started gr0x-power.service - 48V 13S4P pack monitor',
      '[  OK  ] Started gr0x-motor.service - RobStride control loop @ 200 Hz',
      '[  OK  ] Started ros2-bridge.service - ROS 2 Jazzy node graph',
      '[  OK  ] Reached target Portfolio.',
    ],
    host: 'GR0X-PI',
  },
} as const;

export type Site = typeof site;

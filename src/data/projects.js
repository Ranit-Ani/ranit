export const projects = [
  {
    id: 'smart-car-parking',
    name: 'Smart Car Parking Management System',
    tagline: 'Slot, vehicle and staff management for a modern parking facility.',
    description:
      'A full-stack smart parking management system designed to manage parking slots, vehicles, users, staff, and administrators.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript'],
    features: [
      'User authentication',
      'Admin dashboard',
      'Staff management',
      'Parking slot management',
      'Vehicle management',
      'Parking status tracking',
      'Different parking slot categories',
      'Responsive interface',
    ],
    problem:
      'Manual parking slot tracking is error-prone and slow, making it hard for staff to know slot availability in real time or manage vehicles and users efficiently.',
    solution:
      'Built a centralized web application with role-based access for admins, staff and users, backed by a MongoDB data model for slots, vehicles and bookings, so slot status is always accurate and actions are auditable.',
    architecture:
      'React front end communicating with an Express + Node.js REST API, MongoDB for persistence, and role-based routes separating admin, staff and user flows.',
    challenges:
      'Designing a slot-status data model that stays consistent across concurrent updates from staff and users, and structuring role-based access cleanly across the API and UI.',
    learned:
      'Practical experience with role-based authentication, structuring a multi-role REST API, and designing a relational-style schema in a document database.',
    github: 'https://github.com/Ranit-Ani/campus-parking.git',
    demo: 'https://car-parking-app-xofv.onrender.com',
    accent: 'violet',
  },
  {
    id: 'college-event-management',
    name: 'College Event Management System',
    tagline: 'Registrations, admin controls and OTP-based auth for campus events.',
    description:
      'A web application for managing college events, registrations, users, and administrative activities.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Firebase'],
    features: [
      'User registration/login',
      'Event management',
      'Event registration',
      'Admin panel',
      'OTP-based authentication',
      'Database integration',
    ],
    problem:
      'Coordinating student event registrations manually through forms and spreadsheets does not scale and makes verification of student identity difficult.',
    solution:
      'Built an event platform with OTP-based authentication for verified sign-ups, an admin panel for creating and managing events, and a MongoDB-backed registration flow.',
    architecture:
      'React client, Express/Node.js API, MongoDB for event and user data, and Firebase used to support OTP-based authentication.',
    challenges:
      'Integrating OTP verification cleanly into the authentication flow, and keeping the admin panel simple while covering event creation, editing and registration tracking.',
    learned:
      'Hands-on experience combining a third-party auth flow (OTP) with a custom Node.js backend, and structuring an admin-facing panel separately from the public-facing app.',
    github: 'https://github.com/YOUR_USERNAME/college-event-management',
    demo: '',
    accent: 'cyan',
  },
  {
    id: 'ai-voice-assistant',
    name: 'AI / Voice Assistant',
    tagline: 'A Python voice assistant exploring speech recognition and AI APIs.',
    description:
      'A Python-based voice assistant project exploring speech recognition, voice interaction, and AI-powered functionality.',
    stack: ['Python', 'Speech Recognition', 'Text-to-Speech', 'AI/LLM APIs'],
    features: [
      'Voice command recognition',
      'Text-to-speech responses',
      'AI/LLM-powered replies',
      'Extensible command handling',
    ],
    problem:
      'Wanted a hands-on way to explore how speech recognition and language models can be combined into a responsive, voice-driven interface.',
    solution:
      'Built a Python voice assistant that captures speech, converts it to text, routes it through an AI/LLM API for a response, and replies back using text-to-speech.',
    architecture:
      'Python script pipeline: microphone input → speech-to-text → command/LLM handling → text-to-speech output, with room to plug in additional command modules.',
    challenges:
      'Handling recognition accuracy and latency, and structuring the command pipeline so new skills can be added without rewriting the core loop.',
    learned:
      'Foundational experience working with speech recognition libraries, text-to-speech engines, and calling AI/LLM APIs from a Python application.',
    github: 'https://github.com/YOUR_USERNAME/ai-voice-assistant',
    demo: '',
    accent: 'amber',
  },
]

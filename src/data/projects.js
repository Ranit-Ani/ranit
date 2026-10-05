export const projects = [
  {
    id: 'smart-car-parking',
    image: '/projects/smart-car-parking.png', // e.g. '/projects/smart-car-parking.png' — drop the file in public/projects/ and set this
    name: 'Smart Car Parking Management System',
    tagline: 'Slot, vehicle and staff management for a modern parking facility.',
    description:
      'A full-stack smart parking management system designed to manage parking slots, vehicles, users, staff, and administrators.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Vite', 'Bootstrap'],
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
    github: 'https://github.com/Ranit-Ani/park.git',
    demo: 'https://car-parking-app-xofv.onrender.com',
    accent: 'violet',
  },
  {
    id: 'sendto',
    image: '/projects/sendto.png',
    name: 'SendTo — Share Files & Text',
    tagline: 'Share files or text with a 6-digit code or QR. No account needed.',
    description:
      'A full-stack file and text sharing web app. The sender gets a 6-digit code and a QR code; the receiver enters the code or scans the QR to get exactly what was shared, with optional password, expiry and view limit.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Google Drive API'],
    features: [
      'Share files or text with a 6-digit code',
      'QR code generation and in-browser QR scanner',
      'Optional password, expiry time and view limit',
      'Files streamed to private Google Drive storage',
      'Text export as TXT, Markdown, HTML, CSV, JSON, PDF and DOCX',
      'Automatic cleanup of expired shares',
      'Rate limiting and secure headers',
      'Light / dark theme and responsive interface',
    ],
    problem:
      'Sending a file or a snippet of text to another device or person usually means logging in, installing an app, or emailing yourself, which is slow for a one-off transfer.',
    solution:
      'Built a no-account sharing flow: upload or paste, get a short code (and QR), and the receiver unlocks it with that code. Passwords, expiry and view limits give the sender control over how long and how often it can be opened.',
    architecture:
      'React SPA (Vite) served by an Express API. MongoDB (Mongoose) stores share codes, metadata and counters, while uploaded files are streamed straight into a private Google Drive folder and streamed back on download, so nothing is kept on the server disk.',
    challenges:
      'Streaming large uploads and downloads through the server without buffering them, generating unique short codes safely, and cleaning up expired shares from both the database and Google Drive.',
    learned:
      'Working with the Google Drive API and OAuth, streaming file transfers in Node.js, designing expiring and rate-limited access flows, and deploying a full-stack app on Render.',
    github: 'https://github.com/Ranit-Ani/sendto',
    demo: 'https://sendto.onrender.com',
    accent: 'rose',
  },
  {
    id: 'ai-voice-assistant',
    image: '', // e.g. '/projects/ai-voice-assistant.png' — drop the file in public/projects/ and set this
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
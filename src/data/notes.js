// Short write-ups / "what I learned" style notes. Edit freely — add a new
// object to this array for each note and it will appear automatically.
// `date` is a plain string so no timezone/formatting logic is needed.
export const notes = [
  {
    id: 'role-based-access-lessons',
    title: 'What I learned designing role-based access for the parking system',
    date: 'Add a date',
    tag: 'Backend',
    excerpt:
      'Notes on structuring admin / staff / user roles cleanly across an Express API and a React front end, and the mistakes I made the first time around.',
  },
  {
    id: 'otp-auth-notes',
    title: 'Wiring OTP-based auth into a Node.js backend',
    date: 'Add a date',
    tag: 'Auth',
    excerpt:
      'A short breakdown of combining Firebase OTP verification with a custom Express backend for the college event system.',
  },
  {
    id: 'first-voice-assistant',
    title: 'Building my first voice assistant in Python',
    date: 'Add a date',
    tag: 'AI / Python',
    excerpt:
      'Speech-to-text, routing through an LLM API, and text-to-speech — what worked, what was fiddly, and what I would do differently.',
  },
]

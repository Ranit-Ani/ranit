// Short write-ups / "what I learned" style notes. Edit freely — add a new
// object to this array for each note and it will appear automatically.
// `date` is a plain string so no timezone/formatting logic is needed.
// `body` is an array of paragraphs shown in the note's expanded view.
export const notes = [
  {
    id: 'role-based-access-lessons',
    title: 'What I learned designing role-based access for the parking system',
    date: 'Add a date',
    tag: 'Backend',
    excerpt:
      'Notes on structuring admin / staff / user roles cleanly across an Express API and a React front end, and the mistakes I made the first time around.',
    body: [
      'Replace this with your real write-up. The excerpt above is what shows on the card; this body is what shows when someone clicks "Read note".',
      'A good structure for these notes: what you were building, what you tried first, what actually broke, and what you changed once you understood the problem better.',
      'Keep it short and specific — one concrete lesson per note reads better than a full tutorial.',
    ],
  },
  {
    id: 'otp-auth-notes',
    title: 'Wiring OTP-based auth into a Node.js backend',
    date: 'Add a date',
    tag: 'Auth',
    excerpt:
      'A short breakdown of combining Firebase OTP verification with a custom Express backend for the college event system.',
    body: [
      'Replace this with your real write-up describing how you combined Firebase OTP verification with your own Express backend.',
      'Useful things to cover: how you handled token verification server-side, rate limiting OTP requests, and edge cases like expired or reused codes.',
    ],
  },
  {
    id: 'first-voice-assistant',
    title: 'Building my first voice assistant in Python',
    date: 'Add a date',
    tag: 'AI / Python',
    excerpt:
      'Speech-to-text, routing through an LLM API, and text-to-speech — what worked, what was fiddly, and what I would do differently.',
    body: [
      'Replace this with your real write-up on the speech-to-text → LLM → text-to-speech pipeline.',
      'Worth mentioning: which libraries you used, latency issues you ran into, and anything you would swap out if you rebuilt it today.',
    ],
  },
]

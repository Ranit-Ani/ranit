// Short write-ups / "what I learned" style notes. Edit freely — add a new
// object to this array for each note and it will appear automatically.
// `date` is a plain string so no timezone/formatting logic is needed.
// `body` is an array of paragraphs shown in the note's expanded view.
export const notes = [
  {
    id: 'role-based-access-lessons',
    title: 'What I learned designing role-based access for the parking system',
    date: 'Feb 2026',
    tag: 'Backend',
    excerpt:
      'Notes on structuring admin / staff / user roles cleanly across an Express API and a React front end, and the mistakes I made the first time around.',
    body: [
      'The Smart Car Parking Management System was the first project where I actually needed three different kinds of users — Admin, Staff, and regular Users — to share the same backend without stepping on each other\'s permissions. My first instinct was to just check "if user.role === admin" scattered across individual routes. It worked for about a week, and then I had ten routes doing the same check slightly differently.',
      'I ended up moving role checks into a single Express middleware that reads the role off the decoded JWT and gates each route by an allowed-roles list, instead of duplicating conditionals everywhere. That one change made it obvious, at a glance, exactly who was allowed to hit which endpoint — slot management and booking for Users, location and revenue oversight for Admins, day-to-day slot updates for Staff.',
      'The part I underestimated was the frontend side. Hiding a button in the UI is not the same as protecting the route behind it, so I had to be disciplined about enforcing every permission on the server and treating the React-side role checks as pure UX, not security. It also pushed me to think more carefully about JWT payload design — keeping it lean, putting the role in the token instead of doing an extra DB lookup on every request, and handling token expiry gracefully instead of silently failing.',
      'If I rebuilt this today, I would define the role-permission matrix on paper before writing a single route, instead of discovering the edge cases as I went.',
    ],
  },
  {
    id: 'otp-auth-notes',
    title: 'Wiring OTP-based auth into a Node.js backend',
    date: 'May 2026',
    tag: 'Auth',
    excerpt:
      'A short breakdown of combining Firebase OTP verification with a custom Express backend for the college event system.',
    body: [
      'For a college event registration system, I needed phone-number verification without building an SMS pipeline from scratch, so I used Firebase Phone Auth for OTP delivery and verification on the client, then had my own Express backend trust that verification rather than re-sending codes itself.',
      'The tricky part was the handoff: once Firebase verifies the OTP client-side, it hands back an ID token, and my backend has to independently verify that token using the Firebase Admin SDK before trusting it — otherwise you are just trusting whatever the client claims. Skipping that server-side verification step was my first mistake, and it is an easy one to make because the client-side flow "looks" complete on its own.',
      'Rate limiting mattered more than I expected. Without it, nothing stops someone from spamming the OTP endpoint. I added a simple attempt counter per phone number with a short cooldown window, and made sure expired or already-used codes failed cleanly with a clear error instead of a generic 500.',
      'The bigger lesson was to treat authentication as two separate concerns — proving who someone is (OTP verification) and deciding what they can do once they are in (issuing my own session/JWT after that) — rather than conflating the two into one step.',
    ],
  },
  {
    id: 'first-voice-assistant',
    title: 'Building my first voice assistant in Python',
    date: 'Aug 2026',
    tag: 'AI / Python',
    excerpt:
      'Speech-to-text, routing through an LLM API, and text-to-speech — what worked, what was fiddly, and what I would do differently.',
    body: [
      'This started as a weekend experiment to see how far I could get with a basic speech-in, speech-out assistant: capture audio, transcribe it, send the text to an LLM API, then speak the response back. The pipeline sounds simple in one sentence and turned out to have a rough edge at every stage.',
      'Speech-to-text was the first surprise — background noise and mic quality affected accuracy far more than the choice of library did. I spent more time tuning silence detection and recording thresholds than I expected to, just to reliably know when the user had finished speaking.',
      'Latency was the real constraint once transcription, the LLM call, and text-to-speech were chained together — each step added noticeable delay, and stacked end-to-end it stopped feeling like a conversation. Streaming the LLM response and starting text-to-speech on the first completed sentence, instead of waiting for the full reply, made the biggest difference in how "responsive" it felt.',
      'If I rebuilt this, I would design for streaming from the start instead of bolting it on afterward, and I would keep a local fallback for basic commands so the whole thing does not depend on an API call for every single interaction.',
    ],
  },
]
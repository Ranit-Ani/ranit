# Ranit Pramanick — Developer Portfolio

A modern, dark, premium developer portfolio built with React, Vite, Tailwind CSS and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL in your browser. To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
portfolio/
├── index.html                 # HTML shell, fonts, SEO/OG meta tags
├── public/
│   ├── favicon.svg
│   └── og-cover.svg           # Open Graph share image
├── src/
│   ├── main.jsx                # React entry point
│   ├── App.jsx                 # Assembles all sections
│   ├── index.css               # Tailwind + global styles/tokens
│   ├── data/
│   │   ├── projects.js         # Edit project content here
│   │   └── skills.js           # Edit skill groups here
│   ├── hooks/
│   │   └── useActiveSection.js # Scroll-spy for navbar
│   └── components/
│       ├── Background.jsx      # Grid/dot pattern + drifting glow ("antigravity")
│       ├── Navbar.jsx
│       ├── Hero.jsx            # Headline + animated terminal visual
│       ├── About.jsx
│       ├── Skills.jsx
│       ├── Projects.jsx
│       ├── ProjectModal.jsx    # Project detail overlay
│       ├── Journey.jsx         # Vertical timeline
│       ├── GithubSection.jsx
│       ├── Education.jsx
│       └── Contact.jsx         # Validated contact form (UI only)
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Things to customize before publishing

- **Personal links** — replace every `YOUR_USERNAME` (GitHub, LinkedIn) and the placeholder
  email `ranit@example.com` in `Hero.jsx`, `Contact.jsx`, `Footer.jsx` and `GithubSection.jsx`.
- **Projects** — edit `src/data/projects.js`. Each project object drives both the card and the
  detail modal, including GitHub/demo links, features, and the "what I learned" writeup.
- **Stats in About** — `src/components/About.jsx` has neutral placeholders
  (`Add your count`) for years learning / technologies, so no numbers are invented. Fill in your
  real numbers, or connect the GitHub contributions stat to the GitHub API.
- **Education** — `src/components/Education.jsx` has placeholder college name and duration.
- **Contact form** — `src/components/Contact.jsx` performs client-side validation but does not
  send email. Wire the `onSubmit` handler to a service such as Formspree, EmailJS, or your own
  API route.

## Design notes

- Typography: **Space Grotesk** (display), **Inter** (body), **JetBrains Mono** (code/terminal).
- Palette tokens live in `tailwind.config.js` under `theme.extend.colors` (`ink`, `mist`,
  `signal`) — change them there to re-theme the whole site.
- The hero's animated terminal and floating tech badges are the site's signature visual element;
  the same "drift" motion is echoed subtly in the background blobs.
- Respects `prefers-reduced-motion` and uses visible focus states throughout for accessibility.

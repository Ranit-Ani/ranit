import { useState } from 'react'
import { motion } from 'framer-motion'
import Background from './components/Background.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Journey from './components/Journey.jsx'
import GithubSection from './components/GithubSection.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Preloader from './components/Preloader.jsx'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <div className="relative min-h-screen font-body text-white">
      <Preloader onDone={() => setReady(true)} />
      <Background />
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <GithubSection />
        <Education />
        <Contact />
      </motion.main>
      <Footer />
    </div>
  )
}

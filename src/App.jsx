import Background from './components/Background.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Journey from './components/Journey.jsx'
import Notes from './components/Notes.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Preloader from './components/Preloader.jsx'
import CommandPalette from './components/CommandPalette.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen font-body text-white">
      <Preloader />
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Notes />
        <Education />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </div>
  )
}
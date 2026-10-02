import { useState } from 'react'
import { MotionConfig } from 'motion/react'
import { BootSequence } from './components/layout/BootSequence'
import { TopBar } from './components/layout/TopBar'
import { MobileDrawer } from './components/layout/MobileDrawer'
import { ConveyorRail } from './components/layout/ConveyorRail'
import { StatusHud } from './components/layout/StatusHud'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Experience } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { CaseStudy } from './components/sections/CaseStudy'
import { Process } from './components/sections/Process'
import { Contact } from './components/sections/Contact'
import { Metrics } from './components/sections/Metrics'
import { Ticker } from './components/ui/Ticker'

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <BootSequence />
      <TopBar drawerOpen={drawerOpen} onToggleDrawer={() => setDrawerOpen((o) => !o)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <ConveyorRail />
      <main>
        <Hero />
        <Metrics />
        <Ticker />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <CaseStudy />
        <Process />
        <Contact />
      </main>
      <Footer />
      <StatusHud />
    </MotionConfig>
  )
}

export default App

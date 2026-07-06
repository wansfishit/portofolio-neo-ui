import { getProfile, getSkills, getProjects, seedInitialData } from '@/lib/data'
import Nav from '@/components/portfolio/Nav'
import Hero from '@/components/portfolio/Hero'
import About from '@/components/portfolio/About'
import Skills from '@/components/portfolio/Skills'
import Projects from '@/components/portfolio/Projects'
import Contact from '@/components/portfolio/Contact'
import Footer from '@/components/portfolio/Footer'
import { ThemeInit } from '@/lib/theme'

// Revalidate every 60 seconds for near real-time updates
export const revalidate = 60

export default async function Home() {
  // Seed initial data if tables are empty
  await seedInitialData()

  // Fetch all data in parallel
  const [profile, skills, projects] = await Promise.all([
    getProfile(),
    getSkills(),
    getProjects(),
  ])

  return (
    <>
      <ThemeInit />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 brutal-btn z-50"
        id="skip-to-content"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main-content">
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Contact profile={profile} />
      </main>
      <Footer />
    </>
  )
}

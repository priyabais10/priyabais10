import AboutMe from "./components/home/about-me"
import Contact from "./components/home/contact"
import EducationSkills from "./components/home/education-skills"
import HeroSection from "./components/home/hero-section"
import ContactBar from "./components/home/hero-section/contact-bar"
import LatestWork from "./components/home/latest-work"

const page = () => {
  return (
    <>
      <main>
        <HeroSection />
        <ContactBar />
        <EducationSkills />
        <LatestWork />
        <Contact />
      </main>
    </>
  )
}

export default page
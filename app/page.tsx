import PromoTicker from '@/components/PromoTicker'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Process from '@/components/Process'
import ChileBand from '@/components/ChileBand'
import Profile from '@/components/Profile'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <PromoTicker />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <ChileBand />
        <Profile />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

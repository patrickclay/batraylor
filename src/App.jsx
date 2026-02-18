import Hero from './components/Hero'
import CTACards from './components/CTACards'
import RepairForm from './components/RepairForm'
import CarFinderForm from './components/CarFinderForm'
import StoryBanner from './components/StoryBanner'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Hero />
      <CTACards />
      <RepairForm />
      <CarFinderForm />
      <StoryBanner />
      <Footer />
    </div>
  )
}

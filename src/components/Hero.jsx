import logo from '../assets/logo.png'

export default function Hero() {
  return (
    <section className="bg-brand-blue text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 text-center">
        <img
          src={logo}
          alt="Bring A Traylor — Your Neighborhood Mechanic"
          className="mx-auto w-64 md:w-80 mb-6 invert"
        />
        <h1 className="sr-only">Bring A Traylor — Auto Repair &amp; Used Car Finder in Woodstock &amp; Marietta, GA</h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
          Honest, no-pressure auto repair in Woodstock &amp; Marietta, GA.
          Mobile and shop service — plus we help you find quality used cars.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#repair"
            className="bg-white text-brand-blue font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            I Need a Repair
          </a>
          <a
            href="#car-finder"
            className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Help Me Find a Car
          </a>
        </div>
      </div>
    </section>
  )
}

import reidShop from '../assets/reid-in-shop.jpg'
import reidBrianda from '../assets/reid-brianda.jpg'

export default function StoryBanner() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Meet Reid &amp; Brianda</h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <img
              src={reidShop}
              alt="Reid Traylor in his shop"
              className="rounded-xl shadow-md w-full object-cover aspect-[4/5]"
              loading="lazy"
            />
          </div>
          <div className="space-y-4">
            <img
              src={reidBrianda}
              alt="Reid and Brianda Traylor"
              className="rounded-xl shadow-md w-full object-cover aspect-square mb-6"
              loading="lazy"
            />
            <p className="text-gray-700 leading-relaxed">
              Bring A Traylor is a family-owned mechanic service run by Reid and Brianda
              out of Woodstock, Georgia. Reid brings honest, no-pressure expertise to every
              job — whether it's a brake repair, an engine diagnosis, or helping you track
              down the right used car at a fair price.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We serve the Woodstock and Marietta area with both mobile and shop-based
              service. No dealership markups, no unnecessary upsells — just a neighbor
              you can trust with your car.
            </p>
            <div className="flex items-center gap-2 text-brand-blue font-semibold">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              100% Recommended · 5 Reviews · $ Pricing
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

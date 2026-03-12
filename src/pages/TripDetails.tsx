import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Calendar, Star, ChevronRight, PlayCircle } from 'lucide-react';
import TripGallery from '../components/TripGallery';

gsap.registerPlugin(ScrollTrigger);

export default function TripDetails() {
    const { slug } = useParams();
    const mainRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        let ctx = gsap.context(() => {
            gsap.from('.hero-bg', { scale: 1.1, opacity: 0.5, duration: 1.5, ease: 'power3.out' });

            gsap.from('.header-content *', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.2
            });

            gsap.utils.toArray('.fade-in').forEach((section: any) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });
        }, mainRef);

        return () => ctx.revert();
    }, [slug]);

    const tripsContent: Record<string, any> = {
        'sunrise-kovalam-mar-15': {
            name: 'Sunrise at Kovalam',
            location: 'Kerala, India',
            duration: '1 Day',
            dateRange: 'Mar 15, 2026',
            price: 1999,
            bgImage: 'https://images.unsplash.com/photo-1627000086207-77e8fd7d706f?q=80&w=2000&auto=format&fit=crop',
            desc: "Join us for a magical morning at the rock beach. We witness the first light together at the Promenade, followed by a community breakfast and localized exploration.\n\nMorning begins with discovering beautiful locations and scenic spots. Afternoons are for experiences, activities, and exploring hidden gems."
        },
        'aare-falls-mar-15': {
            name: 'Aare Falls',
            location: 'Mumbai, India',
            duration: '1 Day',
            dateRange: 'Mar 15, 2026 (Sold Out)',
            price: 1499,
            bgImage: 'https://images.unsplash.com/photo-1542856334-2e2eaa88a71f?q=80&w=2000&auto=format&fit=crop',
            desc: "A refreshing trek to the hidden falls of Aare. Perfect for a quick escape from the city. This particular slot is currently full, but you can join us the following week!\n\nLush trails, cold dips, and strong community building."
        },
        'aare-falls-mar-22': {
            name: 'Aare Falls',
            location: 'Mumbai, India',
            duration: '1 Day',
            dateRange: 'Mar 22, 2026',
            price: 1499,
            bgImage: 'https://images.unsplash.com/photo-1542856334-2e2eaa88a71f?q=80&w=2000&auto=format&fit=crop',
            desc: "A second chance to explore the hidden trails of Aare. Perfect for city dwellers seeking a quick nature fix.\n\nMorning begins with discovering beautiful locations and scenic spots."
        },
        'sunrise-kovalam-mar-22': {
            name: 'Sunrise at Kovalam',
            location: 'Kerala, India',
            duration: '1 Day',
            dateRange: 'Mar 22, 2026',
            price: 1999,
            bgImage: 'https://images.unsplash.com/photo-1627000086207-77e8fd7d706f?q=80&w=2000&auto=format&fit=crop',
            desc: "Sunday morning magic at Kovalam. Peace, waves, and community. We gather to watch the sky turn gold over the lighthouse."
        },
        'sunrise-at-kovalam-past-1': {
            name: 'Sunrise at Kovalam',
            location: 'Kerala, India',
            duration: '1 Day',
            dateRange: 'Feb 2026 (Completed)',
            price: 0,
            bgImage: 'https://images.unsplash.com/photo-1627000086207-77e8fd7d706f?q=80&w=2000&auto=format&fit=crop',
            desc: "Reliving the magical morning at the lighthouse beach. A hallmark of our community adventures."
        },
        'aare-falls-past-1': {
            name: 'Aare Falls Expedition',
            location: 'Mumbai, India',
            duration: '1 Day',
            dateRange: 'Jan 2026 (Completed)',
            price: 0,
            bgImage: 'https://images.unsplash.com/photo-1588392382834-a8af4fce2ae3?q=80&w=1000&auto=format&fit=crop',
            desc: "Our previous trek to the hidden waterfalls. Lush trails, cold dips, and strong community building."
        }
    };

    const trip = tripsContent[slug || 'sunrise-kovalam-mar-15'] || tripsContent['sunrise-kovalam-mar-15'];

    const dates = [
        { label: 'Mar 15, 2026', spots: 8 },
        { label: 'Mar 22, 2026', spots: 12 }
    ];

    const faqs = [
        { q: "A. What’s Included & Price?", a: "Your package includes accommodation, local transport, guided tours, and carefully planned experiences throughout the journey." },
        { q: "B. Timing & Transport?", a: "Pickup begins at 8 AM from the designated meeting location. All transportation during the trip is arranged by our team." },
        { q: "C. Vibes Epdi Irkum?", a: "Expect a friendly and welcoming environment where travelers connect, explore new places, and share unforgettable experiences together. Semma vibe guaranteed!" },
        { q: "D. Can women join?", a: "Absolutely. Our trips are designed to be safe, inclusive, and welcoming for everyone." },
        { q: "E. Is this legit?", a: "Yes. Chapter AAA has hosted hundreds of travelers and is trusted by a growing community of explorers." },
        { q: "F. Vera Doubt Iruku!", a: "Redirecting you to our contact page..." }
    ];

    const galleryImages = [
        'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1000'
    ];

    return (
        <main ref={mainRef} className="bg-background text-foreground pb-24">
            {/* Hero Banner */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-end pb-16 px-8 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center hero-bg"
                        style={{ backgroundImage: `url(${trip.bgImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/20" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full header-content">
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 mb-4 text-white text-sm font-medium">
                        <MapPin size={16} />
                        <span>{trip.location}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-poppins font-bold text-white tracking-tight mb-6">
                        {trip.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-gray-200 font-medium">
                        <div className="flex items-center space-x-2">
                            <Clock size={20} className="text-ocean-blue" />
                            <span className="text-lg">{trip.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar size={20} className="text-ocean-blue" />
                            <span className="text-lg">{trip.dateRange}</span>
                        </div>
                        <div className="text-2xl font-bold font-poppins text-sunset-orange ml-auto">
                            ₹{trip.price}
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-20">

                    {/* About */}
                    <section className="fade-in">
                        <h2 className="text-3xl font-poppins font-bold mb-6">About This Trip</h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                            {trip.desc}
                        </div>
                    </section>

                    {/* Gallery */}
                    <section className="fade-in">
                        <h2 className="text-3xl font-poppins font-bold mb-4">Trip Moments</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            A glimpse into the incredible places and experiences waiting for you on this journey.
                        </p>
                        <TripGallery images={galleryImages} />
                    </section>

                    {/* Video Section */}
                    <section className="fade-in relative rounded-3xl overflow-hidden h-[400px] flex items-center justify-center group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Video cover" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                        <div className="relative z-10 text-center">
                            <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all mx-auto mb-4" />
                            <h3 className="text-2xl text-white font-poppins font-bold">Experience the Journey</h3>
                            <p className="text-gray-200 mt-2">Watch a glimpse of the adventure and discover what makes this trip truly special.</p>
                        </div>
                    </section>

                    {/* Traveler Reviews */}
                    <section className="fade-in bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-poppins font-bold">Traveler Reviews</h2>
                            <div className="flex items-center space-x-2 bg-ocean-blue/10 text-ocean-blue px-4 py-2 rounded-full font-bold">
                                <Star className="fill-current w-5 h-5" />
                                <span>4.7 Average Rating</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { name: 'Sarah M.', review: 'Incredible experience. The guides were knowledgeable and the itinerary was perfectly balanced. Watching the sunrise at Mount Batur was unforgettable.' },
                                { name: 'James K.', review: 'As a solo traveler, I was nervous at first. But this trip exceeded my expectations. I met amazing people and experienced some of the most beautiful places in Bali.' },
                                { name: 'Emma L.', review: 'Everything was well organized and the accommodations were fantastic. The rice terraces in Ubud were my favorite part of the trip.' }
                            ].map((review, i) => (
                                <div key={i} className="bg-white dark:bg-[#121212] p-6 rounded-2xl shadow-sm">
                                    <div className="flex items-center space-x-2 mb-3 text-sunset-orange">
                                        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{review.review}"</p>
                                    <p className="font-bold font-poppins">- {review.name}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    {/* Pre-Booking FAQs */}
                    <section id="faqs" className="fade-in">
                        <div className="mb-10">
                            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-2 flex items-center gap-3">
                                <span>💛</span> Unga Doubt eh Kelunga!
                            </h2>
                            <p className="text-xl font-medium text-ocean-blue">What's Your Doubt?</p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <details 
                                    key={idx} 
                                    className="group bg-zinc-50 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all duration-300"
                                    onToggle={(e: any) => {
                                        if (e.target.open && faq.q.includes("Vera Doubt")) {
                                            const contactSection = document.getElementById('contact');
                                            if (contactSection) {
                                                contactSection.scrollIntoView({ behavior: 'smooth' });
                                            } else {
                                                window.location.href = '/#contact';
                                            }
                                        }
                                    }}
                                >
                                    <summary className="cursor-pointer px-6 py-5 font-bold font-poppins text-lg list-none flex justify-between items-center outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <span className="w-8 h-8 rounded-lg bg-ocean-blue/10 text-ocean-blue flex items-center justify-center text-sm">{faq.q.split('.')[0]}</span>
                                            {faq.q.includes(".") ? faq.q.split('.')[1].trim() : faq.q}
                                        </div>
                                        <ChevronRight className="transform group-open:rotate-90 transition-transform text-ocean-blue" />
                                    </summary>
                                    <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-400 leading-relaxed ml-12">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>


                    {/* Ready to Book */}
                    <section className="fade-in bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-ocean-blue/30 shadow-xl text-center mb-12">
                        <h2 className="text-3xl font-poppins font-bold mb-4">You're Ready</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                            Click below to complete your booking and secure your spot for this adventure.
                        </p>
                        <button onClick={() => {
                            // Redirect to the booking link
                            const bookingLink = "https://tickets.kynhood.com/event/69a5539c4b2791e424c85146"; 
                            window.location.href = bookingLink;
                        }} className="bg-ocean-blue text-white py-4 px-12 rounded-xl font-bold font-poppins hover:bg-ocean-blue/90 shadow-lg shadow-ocean-blue/30 transition-all transform hover:scale-[1.02] cursor-pointer inline-block mb-4">
                            Book your slot
                        </button>
                        <p className="text-sm text-gray-500">
                            You will be redirected to our secure booking partner.
                        </p>
                    </section>

                </div>

                {/* Sidebar Widget */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32 fade-in bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
                        <h3 className="text-2xl font-poppins font-bold mb-6">Choose Your Date</h3>
                        <p className="text-gray-500 mb-6 text-sm">
                            Our trips run on select dates. Pick the one that works best for you.
                        </p>

                        <div className="space-y-4 mb-8">
                            {dates.map((date, idx) => (
                                <label key={idx} className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl cursor-pointer hover:border-ocean-blue transition-colors group">
                                    <div className="flex items-center space-x-3">
                                        <input type="radio" name="trip-date" className="w-5 h-5 text-ocean-blue focus:ring-ocean-blue" defaultChecked={idx === 0} />
                                        <span className="font-medium group-hover:text-ocean-blue transition-colors">{date.label}</span>
                                    </div>
                                    <span className="text-xs font-bold px-2 py-1 bg-sunset-orange/10 text-sunset-orange rounded-full">
                                        {date.spots} spots left
                                    </span>
                                </label>
                            ))}
                        </div>

                        <button onClick={() => {
                            const el = document.getElementById('faqs');
                            el?.scrollIntoView({ behavior: 'smooth' });
                        }} className="w-full bg-ocean-blue text-white py-4 rounded-xl font-bold font-poppins hover:bg-ocean-blue/90 shadow-lg shadow-ocean-blue/30 transition-all transform hover:scale-[1.02] cursor-pointer">
                            Continue to Questions
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
}

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, ArrowRight, History, Sparkles, Camera, MapPin } from 'lucide-react';
import TripCard, { Trip } from '../components/TripCard';

gsap.registerPlugin(ScrollTrigger);

interface PastTrip {
    slug: string;
    name: string;
    location: string;
    image: string;
    shortDesc: string;
    duration: string;
    date: string;
    tags: string[];
}

export default function Trips() {
    const mainRef = useRef(null);

    useEffect(() => {
        // Ensure we start at the top
        window.scrollTo(0, 0);

        let ctx = gsap.context(() => {
            // 1. Hero Content Entrance
            gsap.from('.trips-hero-content > *', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });

            // 2. Section Headings Reveal
            gsap.utils.toArray('.reveal-section').forEach((section: any) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 90%',
                        toggleActions: 'play none none none', // Ensures it plays immediately on reach
                    },
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
            });

            // 3. Trip Grids - THE FIX
            // Ensure cards are visible immediately if ScrollTrigger is slow
            gsap.utils.toArray('.trip-grid').forEach((grid: any) => {
                const cards = grid.children;
                if (!cards.length) return;

                gsap.fromTo(cards, 
                    { opacity: 0, y: 30 },
                    {
                        scrollTrigger: {
                            trigger: grid,
                            start: 'top 95%', // Fired earlier to avoid blank states
                        },
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power2.out',
                        onComplete: () => {
                            // Secondary safety refresh
                            ScrollTrigger.refresh();
                        }
                    }
                );
            });

        }, mainRef);

        // Global refresh after a series of delays to account for image loading and layout shifts
        const timers = [
            setTimeout(() => ScrollTrigger.refresh(), 100),
            setTimeout(() => ScrollTrigger.refresh(), 500),
            setTimeout(() => ScrollTrigger.refresh(), 1000),
            setTimeout(() => ScrollTrigger.refresh(), 2000),
        ];

        return () => {
            ctx.revert();
            timers.forEach(t => clearTimeout(t));
        };
    }, []);

    const upcomingTrips: Trip[] = [
        {
            slug: 'sunrise-kovalam-mar-15',
            name: 'Sunrise at Kovalam',
            location: 'Kerala, India',
            image: 'https://images.unsplash.com/photo-1627000086207-77e8fd7d706f?q=80&w=1000&auto=format&fit=crop',
            shortDesc: 'Sunday, March 15 - Experience the first light at the serene lighthouse beach. A perfect Sunday escape.',
            duration: '1 Day',
            price: 1999,
            tags: ['Coming Sunday', 'Sunrise Vibe', 'Nature']
        },
        {
            slug: 'aare-falls-mar-15',
            name: 'Aare Falls',
            location: 'Mumbai, India',
            image: 'https://images.unsplash.com/photo-1542856334-2e2eaa88a71f?q=80&w=1000&auto=format&fit=crop',
            shortDesc: 'March 15 - A refreshing trek to the hidden falls. Experience the lush trails and cold dips.',
            duration: '1 Day',
            price: 1499,
            tags: ['Sold Out', 'Sunday', 'Trekking']
        },
        {
            slug: 'aare-falls-mar-22',
            name: 'Aare Falls',
            location: 'Mumbai, India',
            image: 'https://images.unsplash.com/photo-1542856334-2e2eaa88a71f?q=80&w=1000&auto=format&fit=crop',
            shortDesc: 'Sunday, March 22 - A second chance to explore the hidden trails of Aare. Perfect for city dwellers.',
            duration: '1 Day',
            price: 1499,
            tags: ['Next Sunday', 'Trekking', 'Nature']
        },
        {
            slug: 'sunrise-kovalam-mar-22',
            name: 'Sunrise at Kovalam',
            location: 'Kerala, India',
            image: 'https://images.unsplash.com/photo-1627000086207-77e8fd7d706f?q=80&w=1000&auto=format&fit=crop',
            shortDesc: 'Sunday, March 22 - Join us for a magical morning at Kovalam. Peace, waves, and community.',
            duration: '1 Day',
            price: 1999,
            tags: ['Next Sunday', 'Sunrise Vibe', 'Beach']
        }
    ];

    const previousTrips: PastTrip[] = [
        {
            slug: 'sunrise-at-kovalam-past-1',
            name: 'Sunrise at Kovalam',
            location: 'Kerala, India',
            image: 'https://images.unsplash.com/photo-1627000086207-77e8fd7d706f?q=80&w=1000&auto=format&fit=crop',
            shortDesc: 'Reliving the magical morning at the lighthouse beach. A hallmark of our community adventures.',
            duration: '1 Day',
            date: 'Feb 2026',
            tags: ['Completed', 'Sunrise Vibe', 'Beach']
        },
        {
            slug: 'aare-falls-past-1',
            name: 'Aare Falls Expedition',
            location: 'Mumbai, India',
            image: 'https://images.unsplash.com/photo-1588392382834-a8af4fce2ae3?q=80&w=1000&auto=format&fit=crop',
            shortDesc: 'Our previous trek to the hidden waterfalls. Lush trails, cold dips, and strong community building.',
            duration: '1 Day',
            date: 'Jan 2026',
            tags: ['Completed', 'Trekking', 'Legacy']
        },
        {
            slug: 'mumbai-heritage-walk-feb-2026',
            name: 'Mumbai Heritage Walk',
            location: 'Mumbai, India',
            image: 'https://images.unsplash.com/photo-1562832135-0d7e12627750?q=80&w=1000&auto=format&fit=crop',
            shortDesc: 'A fascinating journey through Mumbai\'s iconic landmarks and hidden gems. History came alive!',
            duration: '1 Day',
            date: 'Feb 2026',
            tags: ['Completed', 'Culture', 'City Exploration']
        },
        {
            slug: 'ooty-weekend-getaway-jan-2026',
            name: 'Ooty Weekend Getaway',
            location: 'Tamil Nadu, India',
            image: 'https://images.unsplash.com/photo-1596436889106-be35e95251db?q=80&w=1000&auto=format&fit=crop',
            shortDesc: 'A refreshing escape to the "Queen of Hill Stations". Boating, botanical gardens, and beautiful views.',
            duration: '2 Days',
            date: 'Jan 2026',
            tags: ['Completed', 'Hills', 'Relaxation']
        }
    ];

    return (
        <main ref={mainRef} className="bg-background min-h-screen pt-32 pb-24 overflow-x-hidden font-sans">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-8 mb-20 trips-hero-content">
                <span className="inline-block py-1.5 px-4 rounded-full bg-ocean-blue/10 text-ocean-blue text-sm font-bold tracking-widest uppercase mb-6">World Wide Adventures</span>
                <h1 className="text-6xl md:text-8xl font-poppins font-bold tracking-tight mb-8">
                    Our <span className="text-ocean-blue">Journeys</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
                    From upcoming escapes to cherished memories, explore every chapter of our community's travels.
                </p>
            </div>

            {/* Upcoming Trips Section */}
            <section className="reveal-section py-16 mb-20">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex items-center space-x-4 mb-12">
                        <div className="w-12 h-12 bg-ocean-blue/10 rounded-2xl flex items-center justify-center text-ocean-blue">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h2 className="text-4xl font-poppins font-bold">Upcoming Adventures</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 trip-grid">
                        {upcomingTrips.map((trip) => (
                            <div key={trip.slug} className="flex flex-col h-full opacity-0"> {/* Initial opacity 0 for GSAP */}
                                <TripCard trip={trip} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Previous Meets Section */}
            <section className="reveal-section py-32 bg-zinc-50 dark:bg-[#0a0a0a] border-y border-zinc-100 dark:border-zinc-900">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div className="max-w-2xl">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-12 h-12 bg-sunset-orange/10 rounded-2xl flex items-center justify-center text-sunset-orange">
                                    <History className="w-6 h-6" />
                                </div>
                                <span className="text-sunset-orange font-bold tracking-widest uppercase text-sm">Our Legacy</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6">Previous Meets <span className="text-gray-400 font-light">&</span> Memories</h2>
                            <p className="text-gray-500 text-lg font-light leading-relaxed">
                                Explore the trips we've already conquered. Click on any journey to see the full story, photo gallery, and the vibes we shared.
                            </p>
                        </div>
                        <div className="hidden lg:block">
                            <Camera className="w-24 h-24 text-zinc-200 dark:text-zinc-800 -rotate-12" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 trip-grid">
                        {previousTrips.map((trip) => (
                            <div key={trip.slug} className="opacity-0 group relative bg-white dark:bg-[#121212] rounded-[3rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:border-sunset-orange/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col">
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={trip.image}
                                        alt={trip.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[40%] group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="absolute top-6 left-6 flex items-center space-x-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-[0.7rem] font-bold tracking-wider uppercase">
                                        <Camera className="w-3.5 h-3.5" />
                                        <span>Relive the Story</span>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-2xl font-bold font-poppins text-white mb-2 leading-tight">{trip.name}</h3>
                                        <div className="flex items-center text-white/80 text-sm font-medium">
                                            <MapPin className="w-3.5 h-3.5 mr-1.5 text-ocean-blue" />
                                            {trip.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center text-gray-500 dark:text-gray-400 font-semibold text-sm">
                                            <Calendar className="w-4 h-4 mr-2 text-sunset-orange" />
                                            {trip.date}
                                        </div>
                                        <div className="text-[0.6rem] font-black uppercase tracking-[0.2em] bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full border border-green-500/20">
                                            Completed
                                        </div>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-10 flex-grow font-light">
                                        {trip.shortDesc}
                                    </p>

                                    <Link
                                        to={`/trip/${trip.slug}`}
                                        className="flex items-center justify-center space-x-2 py-5 bg-zinc-50 dark:bg-zinc-800 text-foreground group-hover:bg-sunset-orange group-hover:text-white rounded-[2rem] transition-all duration-500 font-bold shadow-sm group-hover:shadow-lg group-hover:shadow-sunset-orange/30"
                                    >
                                        <span className="tracking-wide">View Full Journey</span>
                                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <div className="max-w-7xl mx-auto px-8 mt-32 reveal-section">
                <div className="relative bg-[#121212] rounded-[4rem] p-12 md:p-24 overflow-hidden text-center">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ocean-blue/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sunset-orange/10 rounded-full blur-[120px]" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-8 tracking-tight">Stay in the Loop</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-xl font-light leading-relaxed">
                            Join our community for early access to upcoming journeys.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-10 py-6 bg-white/5 border border-white/10 rounded-full text-white focus:outline-none focus:border-ocean-blue transition-all"
                            />
                            <button className="whitespace-nowrap px-12 py-6 bg-ocean-blue text-white rounded-full font-bold text-lg hover:bg-ocean-blue/90 transition-all shadow-2xl shadow-ocean-blue/20">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
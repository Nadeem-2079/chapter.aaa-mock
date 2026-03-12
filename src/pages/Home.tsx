import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Star, Map, Users, CheckCircle2, Compass, BookOpen, CalendarDays, CheckCircle, ArrowRight, Heart, Sparkles, Globe, MapPin, Camera, ArrowUp, Plus, Search } from 'lucide-react';
import TripCard from '../components/TripCard';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const mainRef = useRef(null);
    const navigate = useNavigate();
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Premium Parallax Effect for the Background
            gsap.to('.home-hero-bg', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero-impact-container',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            // Hero GSAP
            const tl = gsap.timeline();
            tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' })
                .from('.hero-title', { y: 40, opacity: 0, scale: 0.95, duration: 1, ease: 'power4.out' }, '-=0.5')
                .from('.hero-desc', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
                .from('.hero-buttons', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5');

            // Advanced Scroll Reveal
            const sections = gsap.utils.toArray('.reveal-section');
            sections.forEach((section: any) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        end: 'top 20%',
                        toggleActions: 'play none none reverse',
                    },
                    y: 80,
                    opacity: 0,
                    scale: 0.98,
                    duration: 1.2,
                    ease: 'expo.out'
                });
            });

            // Stagger items reveal
            gsap.utils.toArray('.stagger-reveal').forEach((container: any) => {
                gsap.from(container.children, {
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 80%',
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out'
                });
            });

        }, mainRef);

        return () => ctx.revert();
    }, []);

    const featuredTrips = [
        {
            slug: 'kovalam-beach',
            name: 'Kovalam Beach',
            location: 'Kerala, India',
            image: 'https://images.unsplash.com/photo-1627000086207-77e8fd7d706f?q=80&w=1000&auto=format&fit=crop',
            shortDesc: 'Experience the serene beaches and lighthouse of Kovalam. A perfect weekend getaway.',
            duration: '3 Days',
            price: 5999,
            tags: ['Beach', 'Sunset', 'Relax']
        },
        {
            slug: 'tada-waterfalls',
            name: 'Tada Waterfalls',
            location: 'Andhra Pradesh, India',
            image: 'https://images.unsplash.com/photo-1542856334-2e2eaa88a71f?q=80&w=1000&auto=format&fit=crop',
            shortDesc: 'A refreshing trek to the hidden falls of Tada. Perfect for a quick escape from the city.',
            duration: '1 Day',
            price: 1499,
            tags: ['Trekking', 'Waterfalls', 'Nature']
        },
        {
            slug: 'aarey-falls',
            name: 'Aarey Hidden Falls',
            location: 'Mumbai, India',
            image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop',
            shortDesc: 'Explore the secret monsoon trails and hidden falls right in the heart of the city.',
            duration: '1 Day',
            price: 999,
            tags: ['Nature', 'Hidden Gem', 'Monsoon Trail']
        }
    ];

    return (
        <main ref={mainRef} className="bg-background text-foreground overflow-hidden">
            {/* Parallax Hero & Impact Wrapper */}
            <div className="hero-impact-container relative">
                {/* Global Parallax Background */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div
                        className="w-full h-[120%] bg-cover bg-center home-hero-bg"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop")' }}
                    />
                    {/* Consistent dark overlay for text legibility */}
                    <div className="absolute inset-0 bg-black/60" />
                    {/* The Black Fade transition after the Impact slide */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                </div>

                {/* Hero Section */}
                <section className="relative h-screen flex items-center justify-center z-10">
                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
                        <span className="hero-badge inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 mb-6 text-sm font-medium tracking-wide">
                            Choose Your Next Adventure
                        </span>
                        <h1 className="hero-title text-4xl md:text-6xl font-poppins font-bold text-white tracking-tight mb-8 leading-tight">
                            Your Next Adventure <br /> <span className="text-ocean-blue">Starts Here.</span>
                        </h1>
                        <p className="hero-desc text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg opacity-90">
                            Explore amazing places, meet new people, and create unforgettable memories with Chapter AAA.
                        </p>
                        <p className="hero-desc text-md text-white/80 mb-10 max-w-2xl mx-auto font-light italic">
                            "Trip ku ready ah? Let the adventure begin."
                        </p>
                        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => navigate('/trips')}
                                className="group relative overflow-hidden px-12 py-5 bg-white text-black rounded-full font-bold tracking-wider shadow-2xl hover:bg-zinc-100 transition-all transform hover:-translate-y-1 cursor-pointer"
                            >
                                <span className="relative z-10 flex items-center">
                                    Explore Our Trips
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </button>
                            <button onClick={() => {
                                const el = document.getElementById('how-it-works');
                                el?.scrollIntoView({ behavior: 'smooth' });
                            }} className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-all cursor-pointer">
                                See How It Works
                            </button>
                        </div>
                    </div>
                </section>

                {/* Cinematic Trust & Impact Section (Now part of the parallax container) */}
                <section className="stats-section py-32 relative overflow-hidden z-10 reveal-section">
                    {/* Decorative Accent Glow */}
                    <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-ocean-blue/10 rounded-full blur-[150px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                            {/* Story Content */}
                            <div className="lg:col-span-7 space-y-10">
                                <div className="space-y-6">
                                    <span className="inline-block py-2 px-6 rounded-full bg-ocean-blue/10 text-ocean-blue text-xs font-bold tracking-[0.2em] uppercase border border-ocean-blue/20">
                                        Our Impact
                                    </span>
                                    <h2 className="text-5xl md:text-7xl font-poppins font-bold text-white leading-[1.1] tracking-tighter">
                                        Trusted by <br />
                                        <span className="text-ocean-blue">500+ Travelers.</span>
                                    </h2>
                                    <p className="text-gray-300 text-xl font-light leading-relaxed max-w-2xl">
                                        At Chapter AAA, travel is more than visiting places. It is about creating experiences, discovering cultures, and building friendships along the journey.
                                    </p>
                                </div>

                                {/* Social Proof Stack */}
                                <div className="flex items-center gap-6 pt-4">
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="w-14 h-14 rounded-full border-4 border-zinc-950 overflow-hidden transition-transform hover:scale-110 hover:z-20 cursor-pointer">
                                                <img src={`https://i.pravatar.cc/150?u=aaa-${i}`} alt="Traveler" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                        <div className="w-14 h-14 rounded-full border-4 border-zinc-950 bg-ocean-blue flex items-center justify-center text-white text-xs font-bold">
                                            +500
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex text-sunset-orange">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                                        </div>
                                        <p className="text-white/60 text-sm font-medium tracking-wide">Join the growing family</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid - Premium Glassmorphism Pods */}
                            <div className="lg:col-span-5">
                                <div className="grid grid-cols-2 gap-4 md:gap-6">
                                    {[
                                        { count: '500+', label: 'Travelers', icon: <Users className="w-5 h-5" />, color: 'text-blue-400' },
                                        { count: '4.7', label: 'Average Rating', icon: <Star className="w-5 h-5" />, color: 'text-orange-400' },
                                        { count: '20+', label: 'Destinations', icon: <Map className="w-5 h-5" />, color: 'text-green-400' },
                                        { count: 'Hundreds of', label: 'Unforgettable Memories', icon: <Heart className="w-5 h-5" />, color: 'text-rose-400', wide: true }
                                    ].map((stat, i) => (
                                        <div
                                            key={i}
                                            className={`group p-8 rounded-[2.5rem] bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-2xl ${stat.wide ? 'col-span-2' : ''}`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl bg-zinc-900 ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-zinc-800 transition-all border border-white/5`}>
                                                {stat.icon}
                                            </div>
                                            <h3 className="text-3xl font-poppins font-bold text-white mb-2 leading-tight">
                                                {stat.count}
                                            </h3>
                                            <p className="text-gray-400 text-[0.7rem] font-bold uppercase tracking-[0.2em] leading-relaxed group-hover:text-gray-300 transition-colors">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Enhanced About Section */}
            <section id="about" className="py-32 px-8 max-w-7xl mx-auto scroll-mt-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    {/* Visual Collage - Left Side on Desktop */}
                    <div className="lg:col-span-6 order-2 lg:order-1 relative">
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-12">
                                <div className="reveal-section rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] transform -rotate-2">
                                    <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2000&auto=format&fit=crop" alt="Community" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                                </div>
                                <div className="reveal-section rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square bg-ocean-blue/10 flex items-center justify-center p-8 border border-ocean-blue/20">
                                    <div className="text-center">
                                        <Heart className="w-12 h-12 text-ocean-blue mx-auto mb-4 animate-pulse" />
                                        <p className="font-poppins font-bold text-ocean-blue text-sm uppercase tracking-widest leading-tight">Shared<br />Moments</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="reveal-section rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square bg-zinc-900 flex items-center justify-center p-8">
                                    <div className="text-center">
                                        <Globe className="w-12 h-12 text-white/50 mx-auto mb-4" />
                                        <p className="font-poppins font-bold text-white text-sm uppercase tracking-widest leading-tight">Limitless<br />Borders</p>
                                    </div>
                                </div>
                                <div className="reveal-section rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] transform rotate-2">
                                    <img src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?q=80&w=2000&auto=format&fit=crop" alt="Explorer" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                                </div>
                            </div>
                        </div>
                        {/* Decorative Background Glows */}
                        <div className="absolute -top-20 -left-20 w-96 h-96 bg-ocean-blue/5 rounded-full blur-[100px] -z-10" />
                        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-sunset-orange/5 rounded-full blur-[100px] -z-10" />
                    </div>

                    {/* Content Section - Right Side on Desktop */}
                    <div className="lg:col-span-6 order-1 lg:order-2 space-y-10">
                        <div className="reveal-section">
                            <span className="inline-block py-2 px-6 rounded-full bg-ocean-blue/5 text-ocean-blue text-xs font-bold tracking-[0.2em] uppercase mb-6 border border-ocean-blue/10">The Chapter AAA Way</span>
                            <h2 className="text-5xl md:text-7xl font-poppins font-bold mb-8 leading-[1.1] tracking-tighter">
                                Travel With a <br />
                                <span className="text-ocean-blue">Purpose.</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                                Chapter AAA isn’t just about the miles we cover; it’s about the stories we write together. We are a growing community of explorers who believe travel should be deeply personal and authentically shared.
                            </p>
                        </div>

                        <div className="stagger-reveal grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            <div className="space-y-4 group">
                                <div className="w-14 h-14 bg-zinc-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-ocean-blue border border-zinc-100 dark:border-zinc-800 transition-all duration-500 group-hover:bg-ocean-blue group-hover:text-white group-hover:rotate-6">
                                    <Compass className="w-7 h-7" />
                                </div>
                                <h4 className="text-2xl font-bold font-poppins">Explore Real</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">No tourist traps. We find the hidden trails and local secrets that make a place feel truly alive.</p>
                            </div>
                            <div className="space-y-4 group">
                                <div className="w-14 h-14 bg-zinc-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-sunset-orange border border-zinc-100 dark:border-zinc-800 transition-all duration-500 group-hover:bg-sunset-orange group-hover:text-white group-hover:-rotate-6">
                                    <Users className="w-7 h-7" />
                                </div>
                                <h4 className="text-2xl font-bold font-poppins">Connect Deep</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">Strangers at the start, family by the end. Our trips are built on authentic human connection.</p>
                            </div>
                        </div>

                        <div className="reveal-section p-8 bg-[#121212] rounded-[2.5rem] relative overflow-hidden group shadow-2xl shadow-black/20">
                            <div className="relative z-10 flex items-start space-x-6">
                                <div className="mt-1">
                                    <div className="w-10 h-10 rounded-full bg-sunset-orange flex items-center justify-center text-white">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-white text-xl font-medium mb-3 italic">"No tension. Namma team irukku."</p>
                                    <p className="text-gray-400 text-sm">You just show up ready to explore. We handle the rest, from logistics to the vibe.</p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sunset-orange/10 rounded-full blur-3xl -z-0" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Trips */}
            <section id="trips" className="py-24 px-8 max-w-7xl mx-auto reveal-section z-10 relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-poppins font-bold tracking-tight mb-4">
                            Explore Our <span className="text-sunset-orange">Trips</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                            Every Chapter AAA trip is designed with a unique experience in mind. From peaceful nature escapes to thrilling adventures, each journey has its own story waiting to be discovered.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                            All you have to do is choose your destination. <span className="text-ocean-blue ml-2 italic">Next memory ready ah?</span>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-reveal">
                    {featuredTrips.map((trip) => (
                        <div key={trip.slug} className="fade-in-section">
                            <TripCard trip={trip} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Elegant Path - The Adventure Onboarding */}
            <section id="how-it-works" className="py-48 bg-[#020202] text-white relative overflow-hidden reveal-section z-10">
                {/* Minimalist Backdrop */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-48">
                        <span className="text-ocean-blue font-black tracking-[0.6em] uppercase text-[0.65rem] block mb-8 opacity-60">Operations Briefing</span>
                        <h2 className="text-5xl md:text-8xl font-poppins font-black tracking-tighter uppercase leading-[0.8] mb-10">
                            The <span className="text-ocean-blue">Elegant</span> <br /> Path.
                        </h2>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            "A seamless journey from browsing to boarding. No chaos, just premium vibes."
                        </p>
                    </div>

                    <div className="relative">
                        {/* Thin Glowing Timeline */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ocean-blue/50 via-ocean-blue/50 to-transparent -translate-x-1/2 z-0 hidden md:block">
                            <div className="absolute inset-0 bg-ocean-blue/20 blur-sm" />
                        </div>

                        <div className="space-y-48 relative z-10">
                            {[
                                {
                                    id: '01',
                                    title: 'Explore Trips',
                                    vibe: 'Namma Curated Trips!',
                                    desc: 'Namma curated trips list la browse pannunga and ungalukku excite aagura destination ah choose pannunga.',
                                    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
                                    align: 'left'
                                },
                                {
                                    id: '02',
                                    title: 'Check Trip Details',
                                    vibe: 'Full Intel Briefing!',
                                    desc: 'Trip pathi full details paathukonga — photos, itinerary, reviews ellam check pannitu trip vibe purinjukonga.',
                                    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
                                    align: 'right'
                                },
                                {
                                    id: '03',
                                    title: 'Pick Your Date',
                                    vibe: 'Comfortable Dates!',
                                    desc: 'Ungalukku comfortable ah irukkura date select pannunga and seat secure pannunga.',
                                    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
                                    align: 'left'
                                },
                                {
                                    id: '04',
                                    title: 'Clear Doubts & Book',
                                    vibe: 'Final Boarding!',
                                    desc: 'Yedhavathu doubt irundha ask pannunga. Everything clear na book pannitu adventure start pannunga!',
                                    image: 'https://images.unsplash.com/photo-1433086566277-ac08816c33aa?q=80&w=2070&auto=format&fit=crop',
                                    align: 'right'
                                }
                            ].map((step, i) => (
                                <div key={i} className={`flex flex-col md:flex-row items-center justify-between gap-16 md:gap-32 ${step.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Content Column */}
                                    <div className="w-full md:w-[42%] space-y-10 order-2 md:order-none text-center md:text-left">
                                        <div className="space-y-4">
                                            <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                                                <span className="text-ocean-blue font-mono text-[0.8rem] tracking-widest opacity-40">STEP_{step.id}</span>
                                                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                                    <span className="text-[0.6rem] font-black text-white/60 tracking-widest uppercase">{step.vibe}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-4xl md:text-6xl font-poppins font-black tracking-tighter uppercase leading-none">
                                                {step.title.split(' ')[0]} <br />
                                                <span className="text-ocean-blue/50 italic">{step.title.split(' ').slice(1).join(' ')}</span>
                                            </h3>
                                        </div>
                                        <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md mx-auto md:mx-0">
                                            {step.desc}
                                        </p>
                                    </div>

                                    {/* Timeline Node (Hidden on Mobile) */}
                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#020202] border border-white/10 items-center justify-center z-20 group">
                                        <div className="w-4 h-4 rounded-full bg-ocean-blue shadow-[0_0_20px_rgba(45,153,204,1)] animate-pulse" />
                                        <div className="absolute inset-[-4px] rounded-full border border-white/5 group-hover:border-ocean-blue/30 transition-colors" />
                                    </div>

                                    {/* Image Column */}
                                    <div className="w-full md:w-[48%] relative group order-1 md:order-none">
                                        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#080808] border border-white/5">
                                            <img 
                                                src={step.image} 
                                                alt={step.title}
                                                className="w-full aspect-[16/10] object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                                            />
                                            {/* Minimal Decorative Corners */}
                                            <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-white/20" />
                                            <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-white/20" />
                                            
                                            {/* Subtle Shutter Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Community Section */}
            <section id="community" className="py-32 bg-[#050505] text-white reveal-section z-10 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ocean-blue/50 to-transparent" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-ocean-blue/10 rounded-full blur-[120px]" />

                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left: Content & Stats */}
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <span className="inline-block py-2 px-6 rounded-full bg-ocean-blue/10 text-ocean-blue text-xs font-bold tracking-[0.2em] uppercase border border-ocean-blue/20">
                                    The Chapter AAA Vibe
                                </span>
                                <h2 className="text-5xl md:text-7xl font-poppins font-bold leading-[1.1] tracking-tighter">
                                    More Than a Trip. <br />
                                    <span className="text-ocean-blue italic">It's a Tribe.</span>
                                </h2>
                                <p className="text-gray-400 text-xl font-light leading-relaxed max-w-xl">
                                    "Destination kaaga mattum illa — <span className="text-white font-medium">vibe kaaga.</span>"
                                    We believe the people you travel with are just as important as the places you see.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 stagger-reveal">
                                {[
                                    {
                                        title: 'Zero Tension',
                                        desc: 'First time? Namma team irukku. We handle the chaos; you handle the fun.',
                                        icon: <Sparkles className="w-6 h-6" />
                                    },
                                    {
                                        title: 'Solo, Not Alone',
                                        desc: 'Join as a stranger, leave as family. Our group vibe is unmatched.',
                                        icon: <Users className="w-6 h-6" />
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-ocean-blue/50 transition-colors group">
                                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-ocean-blue/20 flex items-center justify-center text-ocean-blue group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Immersive Visuals */}
                        <div className="relative">
                            <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl border border-white/10">
                                <img
                                    src="https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?auto=format&fit=crop&q=80&w=1000"
                                    alt="Community Vibe"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                {/* Floating Badge */}
                                <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/150?u=vibe${i}`} alt="Member" />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm font-medium text-white/90">Join 500+ Explorers</p>
                                    </div>
                                    <p className="text-lg font-medium leading-snug">
                                        "The best decision I made. The vibe was pure magic from day one!"
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Blobs */}
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-ocean-blue/20 rounded-full blur-3xl animate-pulse" />
                        </div>

                    </div>
                </div>
            </section>

            {/* Refined FAQ - The Intelligence Hub */}
            <section id="faqs" className="py-32 bg-[#030303] text-white reveal-section z-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ocean-blue/10 to-transparent" />

                <div className="max-w-4xl mx-auto px-8 relative z-10">
                    <div className="text-center mb-24">
                        <span className="text-ocean-blue font-black tracking-[0.5em] uppercase text-[0.6rem] block mb-6 opacity-60">Frequenty Asked Intelligence</span>
                        <h2 className="text-4xl md:text-6xl font-poppins font-bold tracking-tighter uppercase mb-6 leading-none">
                            Common <span className="text-ocean-blue">Questions.</span>
                        </h2>
                        <p className="text-gray-500 text-lg font-light italic">"Doubts irukka? Chill. Mission briefings summarized below."</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: 'Who typically joins these trips?',
                                tamil: 'Namma tribe-la yaaru yaaru?',
                                a: 'Travelers aged 25-45 who seek a balance of luxury and adventure. We keep groups small (10-15 pax) for that personal tribe vibe.'
                            },
                            {
                                q: 'Can I join as a solo traveler?',
                                tamil: 'Naan mattum varalama?',
                                a: 'Totally. Most of our tribe members join solo. We pair you with like-minded travelers or offer private room upgrades.'
                            },
                            {
                                q: 'Are flights included?',
                                tamil: 'Flight tickets namma tharuvoma?',
                                a: 'International flights are excluded to give you freedom of choice. All domestic transport during the mission is managed by us.'
                            },
                            {
                                q: 'Do I need travel insurance?',
                                tamil: 'Insurance kandippa venuma?',
                                a: 'Mandatory. We prioritize safety protocol above all else to ensure a stress-free deployment.'
                            }
                        ].map((faq, idx) => (
                            <details key={idx} className="group bg-white/[0.02] rounded-[1.5rem] border border-white/5 transition-all duration-500 hover:border-ocean-blue/30 cursor-pointer overflow-hidden">
                                <summary className="px-8 py-8 flex items-center justify-between list-none outline-none">
                                    <div className="flex flex-col text-left">
                                        <span className="text-[0.55rem] text-ocean-blue font-black uppercase tracking-[0.3em] mb-1 opacity-40">"{faq.tamil}"</span>
                                        <span className="text-lg font-bold tracking-tight text-white/90 group-hover:text-white transition-colors uppercase">{faq.q}</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-ocean-blue group-hover:text-ocean-blue transition-all group-open:rotate-45">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                </summary>
                                <div className="px-8 pb-8 pt-2 text-gray-500 text-sm font-light leading-relaxed animate-fade-in divide-y divide-white/5">
                                    <p className="pt-4 border-t border-white/5">{faq.a}</p>
                                </div>
                            </details>
                        ))}
                    </div>

                    <div className="mt-20 flex flex-col md:flex-row items-center gap-6 justify-center">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-950 bg-zinc-900 overflow-hidden"><img src={`https://i.pravatar.cc/150?u=support${i}`} /></div>)}
                        </div>
                        <p className="text-gray-500 text-sm font-light">Vera query irukka? <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-white font-bold hover:text-ocean-blue transition-colors underline underline-offset-4 cursor-pointer">Live Briefing Kelunga</button></p>
                    </div>
                </div>
            </section>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-10 right-10 p-4 rounded-2xl bg-ocean-blue text-white shadow-2xl shadow-ocean-blue/40 z-[100] transition-all duration-500 transform hover:scale-110 active:scale-95 group ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
                    }`}
                aria-label="Back to top"
            >
                <ArrowUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
            </button>
        </main>
    );
}
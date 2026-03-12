import { useEffect, useRef } from 'react';
import { Send, Mail, Phone, MapPin, Instagram, Facebook, Twitter, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Background Parallax
            gsap.to('.contact-bg', {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Entry Animations
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });

            tl.from('.contact-header > *', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            })
            .from('.contact-card', {
                x: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.contact-form', {
                x: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.8');

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
            id="contact" 
            ref={sectionRef} 
            className="relative py-12 overflow-hidden bg-zinc-950 border-t border-white/5"
        >
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0 h-[120%] contact-bg">
                <img 
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-20 grayscale" 
                    alt="Mountain Landscape"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-zinc-950" />
            </div>

            {/* Decorative Glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-ocean-blue/10 rounded-full blur-[120px] -translate-y-1/2 -z-0 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="contact-header text-center mb-0">
                    <span className="inline-block py-2 px-6 rounded-full bg-ocean-blue/10 text-ocean-blue text-xs font-bold tracking-[0.2em] uppercase border border-ocean-blue/20 mb-2">
                        Get In Touch
                    </span>
                    <h2 className="text-5xl md:text-7xl font-poppins font-bold text-white mb-2 tracking-tighter">
                        Let's Plan Your <br/> <span className="text-ocean-blue font-light italic">Next Story.</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-2">
                        We are here to help you plan your next unforgettable adventure. Reach out to our team with any questions.
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Centered Contact Info Cards */}
                    <div className="contact-card-container">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {[
                                { 
                                    icon: <Mail className="w-6 h-6" />, 
                                    title: 'Email Us', 
                                    value: 'hello@chapteraaa.com', 
                                    desc: 'Typically replies in 24h',
                                    color: 'text-blue-400'
                                },
                                { 
                                    icon: <Phone className="w-6 h-6" />, 
                                    title: 'Call Us', 
                                    value: '+91 98765 43210', 
                                    desc: 'Mon-Sat, 10am - 7pm',
                                    color: 'text-orange-400'
                                },
                                { 
                                    icon: <MapPin className="w-6 h-6" />, 
                                    title: 'Visit Us', 
                                    value: 'OMR, Chennai, India', 
                                    desc: 'Adventure Hub',
                                    color: 'text-green-400'
                                }
                            ].map((item, i) => (
                                <div key={i} className="contact-card group p-8 rounded-[2.5rem] bg-black border border-white/10 hover:border-ocean-blue/30 transition-all duration-500 shadow-2xl flex flex-col items-center text-center">
                                    <div className={`w-14 h-14 rounded-2xl bg-zinc-900 ${item.color} flex items-center justify-center group-hover:scale-110 group-hover:bg-zinc-800 transition-all border border-white/5 mb-6`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-gray-500 text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-2">{item.title}</h4>
                                        <p className="text-white text-xl font-bold font-poppins mb-1">{item.value}</p>
                                        <p className="text-gray-500 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Premium Form - Centered */}
                    <div className="max-w-4xl mx-auto w-full">
                        <form className="contact-form bg-black/40 backdrop-blur-2xl p-10 md:p-14 rounded-[3.5rem] border border-white/10 shadow-3xl space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:bg-white/[0.06] focus:border-ocean-blue outline-none transition-all placeholder:text-gray-600" placeholder="John Doe" />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input type="email" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:bg-white/[0.06] focus:border-ocean-blue outline-none transition-all placeholder:text-gray-600" placeholder="john@example.com" />
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <label className="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
                                <textarea rows={6} className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-6 py-4 text-white focus:bg-white/[0.06] focus:border-ocean-blue outline-none transition-all resize-none placeholder:text-gray-600" placeholder="Tell us about your travel dreams..."></textarea>
                            </div>
                            
                            <button type="button" onClick={() => alert('Adventure Request Sent!')} className="group relative w-full overflow-hidden bg-white text-black py-5 rounded-2xl font-bold font-poppins hover:bg-zinc-100 transition-all flex items-center justify-center space-x-3 cursor-pointer shadow-xl">
                                <span className="relative z-10 flex items-center uppercase tracking-widest text-sm">
                                    Send Message
                                    <Send className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Send } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative py-24 bg-zinc-950 border-t border-white/5 overflow-hidden">
            {/* Subtle Gradient Glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-ocean-blue/5 rounded-full blur-[150px] -z-0 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-5 space-y-8">
                        <Link to="/" className="text-3xl font-poppins font-bold tracking-tighter flex items-center group">
                            <span className="text-white group-hover:text-ocean-blue transition-colors uppercase">Chapter</span>
                            <span className="text-ocean-blue ml-2 group-hover:text-white transition-colors uppercase">Aaa</span>
                            <div className="w-2 h-2 bg-sunset-orange rounded-full ml-1" />
                        </Link>
                        <p className="text-gray-400 text-lg font-light leading-relaxed max-w-sm">
                            Travel is more than visiting places; it's about the stories we write together. Join the community of global explorers.
                        </p>
                        <div className="flex space-x-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <button key={i} className="w-10 h-10 rounded-xl bg-white/5 text-gray-400 flex items-center justify-center hover:bg-ocean-blue hover:text-white transition-all cursor-pointer border border-white/5">
                                    <Icon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Explore</h4>
                        <ul className="space-y-4">
                            {['Home', 'About', 'Trips', 'Community', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link 
                                        to={link === 'Home' ? '/' : link === 'Trips' ? '/trips' : `/#${link.toLowerCase()}`}
                                        className="text-gray-500 hover:text-ocean-blue transition-colors text-sm font-medium"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Support</h4>
                        <ul className="space-y-4">
                            {['Help Center', 'Safety Guide', 'Terms of Service', 'Privacy Policy'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-500 hover:text-ocean-blue transition-colors text-sm font-medium">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info Column */}
                    <div className="lg:col-span-3 space-y-6">
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Contact</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-gray-500 text-sm">
                                <Mail className="w-4 h-4 text-ocean-blue" />
                                <span>hello@chapteraaa.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-500 text-sm">
                                <MapPin className="w-4 h-4 text-ocean-blue" />
                                <span>OMR, Chennai, India</span>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-white/5">
                            <p className="text-gray-500 text-[0.6rem] uppercase tracking-widest mb-2 font-bold opacity-50">Project Partners</p>
                            <a 
                                href="https://ausdauergroups.in" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white hover:text-ocean-blue transition-all text-sm font-bold flex items-center group"
                            >
                                <span className="mr-2">Developed by</span>
                                <span className="text-ocean-blue group-hover:underline">Ausdauer Groups</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Final Bottom Bar */}
                <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-600 text-[0.7rem] uppercase tracking-widest font-bold">
                        © {new Date().getFullYear()} Chapter AAA. Crafted for Explorers.
                    </p>
                    <div className="flex space-x-8">
                        <a href="#" className="text-gray-600 hover:text-white text-[0.7rem] uppercase tracking-widest font-bold transition-colors">Cookie Policy</a>
                        <a href="#" className="text-gray-600 hover:text-white text-[0.7rem] uppercase tracking-widest font-bold transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

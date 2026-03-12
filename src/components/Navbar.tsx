import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/#about' },
        { name: 'Trip', href: '/trips' },
        { name: 'Community', href: '/#community' },
    ];

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        if (href.startsWith('/#')) {
            const id = href.split('#')[1];
            if (location.pathname === '/') {
                const element = document.getElementById(id);
                if (element) {
                    const navHeight = 80;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: elementPosition - navHeight,
                        behavior: 'smooth'
                    });
                }
            } else {
                navigate(href);
            }
        }
    };

    const handleHomeClick = (e: React.MouseEvent) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const menuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                duration: 0.5,
                ease: "easeInOut",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    } as any;

    const itemVariants = {
        closed: { opacity: 0, y: 20 },
        open: { opacity: 1, y: 0 }
    };

    return (
        <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-[95%] max-w-7xl ${isScrolled ? 'top-4' : 'top-8'}`}>
            <div className={`flex items-center justify-between px-6 md:px-8 py-4 transition-all duration-700 rounded-[2rem] md:rounded-[2.5rem] border ${isScrolled ? 'bg-black/80 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'bg-black/20 backdrop-blur-md border-white/5'}`}>
                {/* Logo */}
                <Link 
                    to="/" 
                    onClick={handleHomeClick}
                    className="text-xl md:text-2xl font-poppins font-bold tracking-tighter flex items-center group shrink-0"
                >
                    <span className="text-white group-hover:text-ocean-blue transition-colors">CHAPTER</span>
                    <span className="text-ocean-blue ml-1 group-hover:text-white transition-colors">AAA</span>
                    <div className="w-1.5 h-1.5 bg-sunset-orange rounded-full ml-1" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            onClick={(e) => {
                                if (link.name === 'Home') {
                                    handleHomeClick(e);
                                } else if (link.href.startsWith('/#')) {
                                    e.preventDefault();
                                    handleNavClick(link.href);
                                }
                            }}
                            className={`text-[0.7rem] font-black tracking-[0.2em] uppercase transition-all duration-300 relative group py-2 ${location.pathname === link.href ? 'text-ocean-blue' : 'text-white/60 hover:text-white'}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-ocean-blue transition-all duration-500 ${location.pathname === link.href || (link.href.startsWith('/#') && location.pathname === '/') ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`} />
                        </Link>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:block">
                    <button 
                        onClick={() => handleNavClick('/#contact')}
                        className="px-8 py-3 bg-ocean-blue text-white rounded-full font-black text-[0.6rem] uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(45,153,204,0.3)] hover:shadow-[0_15px_40px_rgba(45,153,204,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 border border-white/20"
                    >
                        Contact Us
                    </button>
                </div>

                {/* Mobile Menu Trigger */}
                <div className="md:hidden flex items-center gap-4">
                    <button 
                        className="text-white hover:text-ocean-blue transition-all p-2 bg-white/5 rounded-xl border border-white/10"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Staggered Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-3xl z-[60] flex flex-col p-10 pt-32"
                    >
                        {/* Close button inside menu for convenience */}
                        <button 
                            className="absolute top-10 right-10 text-white/40 hover:text-white p-3"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col space-y-8">
                            <motion.span variants={itemVariants} className="text-ocean-blue font-black tracking-[0.4em] uppercase text-[0.6rem] opacity-60">Navigation Menu</motion.span>
                            
                            {navLinks.map((link) => (
                                <motion.div key={link.name} variants={itemVariants}>
                                    <Link
                                        to={link.href}
                                        onClick={(e) => {
                                            if (link.name === 'Home') {
                                                handleHomeClick(e);
                                            } else if (link.href.startsWith('/#')) {
                                                e.preventDefault();
                                                handleNavClick(link.href);
                                            } else {
                                                setIsMobileMenuOpen(false);
                                            }
                                        }}
                                        className="text-5xl md:text-7xl font-poppins font-bold text-white hover:text-ocean-blue transition-colors flex items-center group"
                                    >
                                        {link.name}
                                        <ArrowRight className="ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-ocean-blue" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div variants={itemVariants} className="mt-auto space-y-8">
                            <div className="h-px w-full bg-white/10" />
                            <div className="flex flex-col gap-6">
                                <button 
                                    onClick={() => handleNavClick('/#contact')}
                                    className="w-full py-6 bg-ocean-blue text-white rounded-3xl font-black text-lg uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3"
                                >
                                    Start Adventure
                                    <ArrowRight size={24} />
                                </button>
                                
                                <div className="flex items-center justify-between px-2">
                                    <div className="flex gap-4">
                                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                            <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                                                <Icon size={20} />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-white/20 text-[0.6rem] font-bold uppercase tracking-widest">© 2026 Chapter AAA</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

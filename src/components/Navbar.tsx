import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
                // If not on home page, navigate to home with hash
                navigate(href);
                // The scroll will be handled by the hash or a separate effect if needed
            }
        }
    };

    const handleHomeClick = (e: React.MouseEvent) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-[95%] max-w-7xl ${isScrolled ? 'top-4' : 'top-8'}`}>
            <div className={`flex items-center justify-between px-8 py-4 transition-all duration-700 rounded-[2.5rem] border ${isScrolled ? 'bg-black/40 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'bg-transparent border-transparent'}`}>
                {/* Logo on the Left */}
                <Link 
                    to="/" 
                    onClick={handleHomeClick}
                    className="text-2xl font-poppins font-bold tracking-tighter flex items-center group shrink-0"
                >
                    <span className="text-foreground group-hover:text-ocean-blue transition-colors">CHAPTER</span>
                    <span className="text-ocean-blue ml-1 group-hover:text-foreground transition-colors">AAA</span>
                    <div className="w-1.5 h-1.5 bg-sunset-orange rounded-full ml-1" />
                </Link>

                {/* Content in the Center (Desktop) */}
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
                            className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 relative group py-2 ${location.pathname === link.href ? 'text-ocean-blue' : 'text-white/70 hover:text-white'}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-ocean-blue transition-all duration-500 ${location.pathname === link.href || (link.href.startsWith('/#') && location.pathname === '/') ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`} />
                        </Link>
                    ))}
                </div>

                {/* CTA on the Right (Desktop) */}
                <div className="hidden md:block">
                    <button 
                        onClick={() => handleNavClick('/#contact')}
                        className="px-8 py-3 bg-ocean-blue text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(45,153,204,0.3)] hover:shadow-[0_15px_40px_rgba(45,153,204,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 border border-white/20"
                    >
                        Contact Us
                    </button>
                </div>

                {/* Mobile Trigger */}
                <button 
                    className="md:hidden text-foreground hover:text-ocean-blue transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-background/98 backdrop-blur-2xl z-40 md:hidden transition-all duration-500 flex flex-col items-center justify-center space-y-8 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none translate-y-10'}`}>
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
                        className="text-3xl font-poppins font-bold hover:text-ocean-blue transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}
                <button 
                    onClick={() => handleNavClick('/#contact')}
                    className="px-12 py-5 bg-ocean-blue text-white rounded-full font-black text-xl uppercase tracking-[0.2em] shadow-2xl"
                >
                    Join Tribe
                </button>
            </div>
        </nav>
    );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TripDetails from './pages/TripDetails';
import Trips from './pages/Trips';
import ContactSection from './components/ContactSection';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
                <Navbar />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/trips" element={<Trips />} />
                        <Route path="/trip/:slug" element={<TripDetails />} />
                        {/* Added fallback for currently unspecified routes */}
                        <Route path="*" element={<Home />} />
                    </Routes>
                </div>
                <ContactSection />
                <Footer />
            </div>
        </Router>
    );
}

export default App;

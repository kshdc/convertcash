import { useThemeStore } from '../store/themeStore';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Converter from '../components/Converter';
import Reviews from '../components/Reviews';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function HomePage() {
  const { isDark } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <Navbar />
      <main>
        <Hero />
        <Converter />
        <Reviews />
        <Features />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import ActiveContests from '@/components/sections/ActiveContests';
import Features from '@/components/sections/Features';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <ActiveContests />
      <Features />
      <Footer />
    </main>
  );
}

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, animate, useTransform, useScroll } from "motion/react";
import Terms from "./components/Terms";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { 
  Car, 
  ChevronDown, 
  Star, 
  Shield, 
  Zap, 
  ArrowRight, 
  MapPin, 
  Phone,
  Clock,
  Instagram, 
  Facebook, 
  Youtube,
  Play,
  X,
  RotateCw,
  Maximize2
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const VIDEOS = [
  {
    id: "1",
    title: "The EQS Experience",
    duration: "2:45",
    thumbnail: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1974",
    videoUrl: "https://www.youtube.com/embed/SceSRE7P_jQ" // Placeholder
  },
  {
    id: "2",
    title: "Mastering the Terrain",
    duration: "1:30",
    thumbnail: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070",
    videoUrl: "https://www.youtube.com/embed/SceSRE7P_jQ"
  },
  {
    id: "3",
    title: "Precision & Power",
    duration: "2:15",
    thumbnail: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072",
    videoUrl: "https://www.youtube.com/embed/SceSRE7P_jQ"
  },
  {
    id: "4",
    title: "Dubai at Night",
    duration: "3:00",
    thumbnail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083",
    videoUrl: "https://www.youtube.com/embed/SceSRE7P_jQ"
  }
];

const BRANDS = [
  { name: "MERCEDES-BENZ", font: "font-sans tracking-[0.3em]" },
  { name: "BMW", font: "font-sans font-bold tracking-tighter" },
  { name: "PORSCHE", font: "font-sans tracking-widest font-light" },
  { name: "RANGE ROVER", font: "font-serif tracking-[0.2em] italic" },
  { name: "BENTLEY", font: "font-serif font-bold tracking-tight" },
  { name: "ROLLS-ROYCE", font: "font-serif tracking-widest" },
  { name: "AUDI", font: "font-sans tracking-[0.4em] font-light" },
  { name: "FERRARI", font: "font-serif italic font-bold tracking-tighter" },
  { name: "LAMBORGHINI", font: "font-sans font-black tracking-tight" },
  { name: "ASTON MARTIN", font: "font-serif tracking-[0.5em] font-light" }
];

const FLEET = [
  { 
    id: 'eqs',
    name: 'Mercedes EQS', 
    category: 'Electric', 
    price: 'AED 450,000', 
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1974',
    exterior360: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070',
    interior360: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=2132'
  },
  { 
    id: 'rr-sport',
    name: 'Range Rover Sport', 
    category: 'Luxury SUV', 
    price: 'AED 580,000', 
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070',
    exterior360: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2071',
    interior360: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070'
  },
  { 
    id: 'bmw-x5',
    name: 'BMW X5 M-Sport', 
    category: 'Performance', 
    price: 'AED 390,000', 
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072',
    exterior360: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070',
    interior360: 'https://images.unsplash.com/photo-1493238792042-83b6903f71c4?q=80&w=2070'
  }
];

export default function App() {
  const sceneRef = useRef<HTMLElement>(null);
  const [activeVideo, setActiveVideo] = useState<typeof VIDEOS[0] | null>(null);
  const [active360, setActive360] = useState<{ car: typeof FLEET[0], view: 'exterior' | 'interior' } | null>(null);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const dragProgress = useMotionValue(50);
  const bgPos = useTransform(dragProgress, (val) => `${val}%`);

  const lamboVideo = 'https://cdn.coverr.co/videos/coverr-yellow-lamborghini-driving-fast-1561330272160?download=1080p';
  const showroomVideo = 'https://cdn.coverr.co/videos/coverr-driving-a-luxury-car-at-night-1565700646928?download=1080p';
  const frames = [
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083',
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = sceneRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const progress = Math.min(
        Math.max((window.innerHeight - rect.top) / (window.innerHeight * 1.5), 0),
        1
      );

      // BODY PANELS
      const leftPanel = section.querySelector(".left-panel") as HTMLElement;
      const rightPanel = section.querySelector(".right-panel") as HTMLElement;

      if (leftPanel && rightPanel) {
        leftPanel.style.transform = `
          translate(${-220 * progress}px, ${-180 * progress}px)
          rotate(${-25 * progress}deg)
        `;

        rightPanel.style.transform = `
          translate(${220 * progress}px, ${-180 * progress}px)
          rotate(${25 * progress}deg)
        `;
      }

      // WHEELS
      const leftWheel = section.querySelector(".left-wheel") as HTMLElement;
      const rightWheel = section.querySelector(".right-wheel") as HTMLElement;

      if (leftWheel && rightWheel) {
        leftWheel.style.transform = `
          translateX(${-260 * progress}px)
          rotate(${-360 * progress}deg)
        `;

        rightWheel.style.transform = `
          translateX(${260 * progress}px)
          rotate(${360 * progress}deg)
        `;
      }

      // CLAMSHELL
      const clamshell = section.querySelector(".clamshell") as HTMLElement;

      if (clamshell) {
        clamshell.style.transform = `
          translateX(-50%)
          translateY(${-120 * progress}px)
          rotateX(${70 * progress}deg)
        `;
      }

      // ENGINE
      const engine = section.querySelector(".engine-core") as HTMLElement;

      if (engine) {
        engine.style.opacity = progress.toString();
        engine.style.transform = `
          scale(${0.7 + progress * 0.3})
        `;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
      <AnimatePresence>
        {active360 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black flex flex-col"
          >
            {/* 360 Controls Top */}
            <div className="flex justify-between items-center p-8 z-20">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-1">360 Experience</span>
                <h2 className="text-2xl font-serif italic text-white">{active360.car.name}</h2>
              </div>
              <button 
                onClick={() => setActive360(null)}
                className="text-white/50 hover:text-white transition group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em]"
              >
                Exit Viewer <X className="w-5 h-5" />
              </button>
            </div>

            {/* 360 Viewer Canvas */}
            <div className="flex-1 relative overflow-hidden cursor-move group">
              <motion.div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${active360.view === 'exterior' ? active360.car.exterior360 : active360.car.interior360})`,
                  backgroundSize: '250% 100%',
                  backgroundPositionX: bgPos
                }}
                drag="x"
                dragConstraints={{ left: -300, right: 300 }}
                dragElastic={0.1}
                onDrag={(e, info) => dragProgress.set(50 + (info.offset.x / 10))}
                onDragEnd={() => animate(dragProgress, 50, { type: 'spring', bounce: 0.2 })}
              />
              
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />

              {/* Viewer UI Overlay */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 p-1 rounded-full">
                  <button 
                    onClick={() => setActive360(prev => prev ? { ...prev, view: 'exterior' } : null)}
                    className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${active360.view === 'exterior' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                  >
                    Exterior
                  </button>
                  <button 
                    onClick={() => setActive360(prev => prev ? { ...prev, view: 'interior' } : null)}
                    className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${active360.view === 'interior' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                  >
                    Interior
                  </button>
                </div>
                <div className="flex items-center gap-3 text-zinc-500 group-hover:text-white transition duration-700">
                  <RotateCw className="w-4 h-4 animate-spin-slow" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Drag horizontally to rotate view</span>
                </div>
              </div>
            </div>

            {/* 360 Footer Info */}
            <div className="p-10 border-t border-white/10 flex justify-between items-center text-zinc-500">
              <div className="flex gap-10 text-[10px] uppercase tracking-widest font-bold">
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-700">Perspective</span>
                  <span className="text-white italic">{active360.view}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-700">Rendering</span>
                  <span className="text-white">Ultra-Wide 8K</span>
                </div>
              </div>
              <div className="flex gap-6">
                <Maximize2 className="w-4 h-4 cursor-pointer hover:text-white transition" />
              </div>
            </div>
          </motion.div>
        )}

        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-20"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-10 right-10 text-white/50 hover:text-white transition group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em]"
            >
              Close <X className="w-5 h-5" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl aspect-video bg-zinc-900 border border-white/10 shadow-3xl overflow-hidden relative"
            >
              <iframe 
                src={`${activeVideo.videoUrl}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center md:items-end p-5 md:p-10 pb-4 border-b border-white/10 backdrop-blur-sm bg-black/40">
        <div className="flex flex-col">
          <span className="hidden sm:block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-1">Premium Showroom</span>
          <h1 className="text-xl md:text-2xl font-bold tracking-tighter italic font-serif">THE ELITE CARS</h1>
        </div>
        <nav className="hidden lg:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-400">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#collection" className="hover:text-white transition">Collection</a>
          <a href="#experience" className="hover:text-white transition">Experience</a>
          <a href="#showroom" className="hover:text-white transition">Showroom</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
        <button className="px-4 md:px-6 py-2 border border-white/20 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition duration-500">
          Inventory
        </button>
      </header>

      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 bg-gradient-to-tr from-zinc-950 via-black to-zinc-900 opacity-60 pointer-events-none"></div>

      {/* Lamborghini Interactive Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Animated Lamborghini Frames */}
        <div className="absolute inset-0">
          {frames.map((frame, index) => (
            <img
              key={index}
              src={frame}
              alt="Lamborghini"
              className="absolute inset-0 w-full h-full object-cover lambo-frame opacity-0"
              style={{
                animationDelay: `${index * 3.3}s`,
                zIndex: index,
              }}
            />
          ))}
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

        {/* Animated Light Effect */}
        <div className="absolute top-0 left-[-100%] w-[40%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 animate-[shine_6s_linear_infinite]"></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 hero-text">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-9xl font-black uppercase tracking-[4px] sm:tracking-[10px] bg-gradient-to-r from-white via-zinc-300 to-gray-500 bg-clip-text text-transparent py-2"
          >
            Lamborghini
          </motion.h1>

          <p className="mt-4 md:mt-8 text-lg md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            10 Second Cinematic Supercar Animation Experience
          </p>

          <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-6">
            <button 
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="glow-btn px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl bg-white text-black font-bold text-sm md:text-lg hover:scale-110 transition duration-500 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Start Engine
            </button>

            <button 
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl border border-white text-white hover:bg-white hover:text-black transition duration-500 hover:scale-110 flex items-center gap-3 text-sm md:text-lg"
            >
              Explore Design <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Performance Cards */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-wrap gap-3 md:gap-6 justify-center z-20 w-full px-4">
          {[
            ['V12', 'Twin Turbo'],
            ['2.9s', '0-100 KM/H'],
            ['780HP', 'Horsepower'],
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + (i * 0.2) }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 md:px-8 py-3 md:py-5 rounded-xl md:rounded-2xl hover:bg-white/20 hover:scale-110 transition duration-500 min-w-[120px] md:min-w-[160px] text-center"
            >
              <h3 className="text-xl md:text-3xl font-bold font-display tracking-tighter">{item[0]}</h3>
              <p className="text-gray-300 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 font-bold">{item[1]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-20 py-32 bg-black overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-10 leading-none">
                The <br/> <span className="text-zinc-500">Elite Legacy.</span>
              </h2>
              <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-light italic">
                <p>
                  Established in Dubai, The Elite Cars has redefined the luxury automotive market with a curated collection of the world's most prestigious marques.
                </p>
                <p>
                  With a 4.8-star legacy and thousands of satisfied clients, we are not just a showroom; we are the destination for automotive excellence in the Middle East.
                </p>
              </div>
              <div className="mt-12 flex gap-12">
                <div>
                  <h4 className="text-4xl font-bold text-white tracking-tighter">1,849+</h4>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-2 font-bold">Verified Reviews</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-white tracking-tighter">12+</h4>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-2 font-bold">Years of Excellence</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070" 
                alt="Showroom" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-100px)]">
        {/* Left Rail: Title and Primary CTA */}
        <section className="col-span-12 md:col-span-12 lg:col-span-5 flex flex-col justify-between p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20 md:mt-10"
          >
            <div className="inline-block px-3 py-1 border border-zinc-700 rounded-full text-[9px] uppercase tracking-widest text-zinc-400 mb-6 md:mb-8">
              Established 2012 — Dubai, UAE
            </div>
            <h2 className="text-5xl sm:text-7xl md:text-[100px] leading-[0.85] font-serif font-light mb-8 md:mb-10 italic">
              Curated <br/> <span className="not-italic font-bold tracking-tighter text-zinc-300">Excellence.</span>
            </h2>
            <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-sm font-light">
              Experience the pinnacle of automotive engineering with Dubai's most exclusive collection of luxury and electric vehicles.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 mt-10 md:mt-12 mb-10">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-zinc-200 transition-colors shadow-2xl"
            >
              Book Test Drive
            </motion.button>
            <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-medium italic">
              Explore the <br/> elite fleet below
            </div>
          </div>
        </section>

        {/* Right Rail: Featured Car & Stats Showcase */}
        <section className="col-span-12 md:col-span-12 lg:col-span-7 flex flex-col">
          {/* Big Feature Image Area */}
          <div className="flex-1 relative overflow-hidden group">
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 bg-zinc-900 flex items-center justify-center pointer-events-none"
            >
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1974')] bg-cover bg-center grayscale-[0.4] brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"></div>
            </motion.div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <div className="bg-black/60 backdrop-blur-xl p-6 md:p-8 border border-white/10 max-w-md w-full">
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">Available Now</span>
                <h3 className="text-2xl md:text-4xl font-bold mt-2 font-display">Mercedes-Benz EQS</h3>
                <div className="h-[1px] w-12 bg-zinc-700 my-4" />
                <p className="text-[9px] md:text-[10px] text-zinc-300 tracking-[0.2em] font-medium font-mono uppercase">AED 4,000 / MONTHLY INSTALLMENT</p>
              </div>
              <button className="hidden sm:flex group p-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white hover:text-black transition-all">
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>

          {/* Bottom Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/10 bg-black/40">
            <motion.div 
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="border-b sm:border-b-0 sm:border-r border-white/10 p-6 md:p-10 flex flex-col justify-between group hover:bg-white/5 transition duration-500"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400">01. Range Rover</span>
                <ChevronDown className="w-4 h-4 text-zinc-700" />
              </div>
              <h4 className="text-2xl font-bold italic font-serif mt-6">Sport SVR</h4>
              <p className="text-[10px] text-zinc-500 leading-tight uppercase tracking-[0.2em] mt-8 group-hover:text-zinc-300 transition">High-Performance Luxury SUV</p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="border-b sm:border-b-0 lg:border-r border-white/10 p-6 md:p-10 flex flex-col justify-between group hover:bg-white/5 transition duration-500"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400">02. BMW</span>
                <ChevronDown className="w-4 h-4 text-zinc-700" />
              </div>
              <h4 className="text-2xl font-bold italic font-serif mt-6">X5 M-Series</h4>
              <p className="text-[10px] text-zinc-500 leading-tight uppercase tracking-[0.2em] mt-8 group-hover:text-zinc-300 transition">The Ultimate Driving Machine</p>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="p-6 md:p-10 flex flex-col justify-between bg-zinc-900/50 backdrop-blur-md sm:col-span-2 lg:col-span-1"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-widest text-white/60">Live Inventory</span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div className="space-y-3 mt-8">
                {[
                  ["Collections", "500+"],
                  ["Global Rating", "4.8 ★"],
                  ["Verified Clients", "1850+"]
                ].map(([label, value], idx) => (
                  <div key={idx} className="flex justify-between text-[11px] uppercase border-b border-white/5 pb-2">
                    <span className="text-zinc-500">{label}</span>
                    <span className="font-bold tracking-tighter">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Lamborghini Extreme Luxury Showcase */}
      <section className="relative z-10 py-32 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="max-w-7xl mx-auto px-10 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-20 items-center"
          >
            <div className="relative group">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.05)]">
                <img
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070"
                  alt="Lamborghini"
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition duration-1000"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-black/60 backdrop-blur-2xl p-8 border border-white/10 rounded-2xl hidden lg:block">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Performance Tier</div>
                <h4 className="text-3xl font-display font-bold italic underline decoration-zinc-700">EXTREME</h4>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-6 block">Ultra-Premium Design</span>
              <h3 className="text-5xl md:text-6xl font-serif italic mb-8 leading-tight tracking-tighter">
                Extreme Luxury. <br />
                Performance.
              </h3>

              <p className="text-zinc-500 text-lg leading-relaxed font-light mb-10 italic">
                Experience futuristic design with cinematic motion effects, luxury typography, and premium animations designed for the world’s elite.
              </p>

              <div className="space-y-4">
                {[
                  'Cinematic Video Backgrounds',
                  'Interactive 360° Walkarounds',
                  'Glassmorphism Visual Accents',
                  'Bespoke Financial Advisory',
                  'Global Logistics & Delivery'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition duration-500 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-white transition-colors"></div>
                    <p className="text-sm uppercase tracking-widest text-zinc-300 font-medium">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Marquee Section */}
      <section className="relative z-10 py-16 border-y border-white/5 bg-black overflow-hidden group">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ 
            repeat: Infinity, 
            duration: 30, 
            ease: "linear" 
          }}
          className="flex whitespace-nowrap items-center gap-24"
        >
          {[...BRANDS, ...BRANDS].map((brand, idx) => (
            <div 
              key={idx} 
              className={`text-2xl md:text-3xl text-zinc-700 hover:text-white transition-colors duration-500 cursor-default uppercase ${brand.font}`}
            >
              {brand.name}
            </div>
          ))}
        </motion.div>
        
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </section>

      {/* Vertical Sidebar Element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 hidden lg:flex flex-col items-center gap-24 pointer-events-none">
        <div className="h-32 w-[1px] bg-white/10"></div>
        <span className="rotate-90 text-[10px] uppercase tracking-[0.6em] text-zinc-700 whitespace-nowrap font-medium">BORN IN DUBAI, UAE</span>
        <div className="h-32 w-[1px] bg-white/10"></div>
      </div>

      {/* Grid Collections Section (Restructured but preserving content) */}
      <section id="collection" className="relative z-10 py-32 border-t border-white/10 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-4 block">New Arrivals</span>
              <h2 className="text-5xl font-serif italic mb-2">The Fleet.</h2>
              <div className="w-20 h-[1px] bg-white/20"></div>
            </div>
          </div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 overflow-hidden"
          >
             {FLEET.map((car, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeIn}
                  viewport={{ once: true }}
                  className="bg-black p-12 group flex flex-col justify-between aspect-[3/4] hover:bg-zinc-900 transition-colors duration-700"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] uppercase tracking-widest text-zinc-600 block">{car.category}</span>
                      <button 
                        onClick={() => setActive360({ car, view: 'exterior' })}
                        className="p-2 border border-white/10 rounded-full hover:border-white transition-all group-hover:bg-white group-hover:text-black"
                      >
                        <RotateCw className="w-3 h-3" />
                      </button>
                    </div>
                    <h3 className="text-3xl font-serif italic mb-4">{car.name}</h3>
                  </div>
                  <div 
                    className="relative overflow-hidden aspect-video border border-white/5 mb-8 cursor-pointer"
                    onClick={() => setActive360({ car, view: 'exterior' })}
                  >
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <div className="bg-black/50 backdrop-blur-md px-4 py-2 text-[8px] uppercase tracking-[0.4em] border border-white/20">Enter 360 Viewer</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs tracking-widest uppercase font-mono">{car.price}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* Elite Cinema Section */}
      <section className="relative z-10 py-32 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 text-right md:text-left">
            <div className="md:ml-auto">
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-4 block">Immersive Walkarounds</span>
              <h2 className="text-5xl md:text-6xl font-serif italic mb-2 tracking-tighter">Elite Cinema.</h2>
              <div className="w-20 h-[1px] bg-white/20 ml-auto md:ml-0 md:mr-auto"></div>
            </div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5"
          >
            {VIDEOS.map((video) => (
              <motion.div 
                key={video.id}
                variants={fadeIn}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                className="relative aspect-video lg:aspect-[4/5] overflow-hidden group cursor-pointer bg-black p-8 flex flex-col justify-between"
                onClick={() => setActiveVideo(video)}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-mono">/{video.id.padStart(2, '0')}</span>
                  <div className="p-3 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <Play className="w-4 h-4 fill-current group-hover:fill-black" />
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="overflow-hidden aspect-video border border-white/5 mb-6">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" 
                    />
                  </div>
                  <h3 className="text-xl font-serif italic mb-2">{video.title}</h3>
                  <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-zinc-500">
                    <span>Performance Clip</span>
                    <span className="font-mono">{video.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 30s Scroll Background Video Experience */}
      <section className="relative min-h-[150vh] bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
          >
            <source src={showroomVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10"></div>
          
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-10">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="text-4xl sm:text-7xl md:text-[120px] font-black uppercase tracking-[8px] sm:tracking-[15px] bg-gradient-to-r from-white via-zinc-400 to-zinc-800 bg-clip-text text-transparent"
            >
              Excellence.
            </motion.h2>
            <p className="mt-8 text-zinc-400 text-xl md:text-2xl max-w-4xl font-light italic tracking-widest uppercase">
              The Finest Luxury Destination in Dubai
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Performance Showcase */}
      <section id="showroom" className="relative z-20 py-32 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-[4px] md:tracking-[10px] bg-gradient-to-r from-white via-gray-300 to-zinc-600 bg-clip-text text-transparent mb-6 md:mb-8">
              The Elite Showroom
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl max-w-4xl mx-auto font-light leading-relaxed">
              Dubai’s premier luxury supercar destination with futuristic showroom experience, luxury electric vehicles, elite customer service, and world-class automotive excellence.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left Showcase */}
            <div className="relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.1)]">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070"
                alt="Luxury Showroom"
                className="w-full h-[500px] md:h-[700px] object-cover group-hover:scale-110 transition duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 md:bottom-12 md:left-12 md:right-12">
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-[3px] md:tracking-[5px] mb-4 md:mb-6">
                  Dubai Luxury Experience
                </h3>
              </div>
            </div>

            {/* Right Details */}
            <div className="space-y-4 md:space-y-6">
              {[
                {
                  title: '4.8★ Premium Rating',
                  desc: 'Trusted by 1,850+ verified luxury car buyers with exceptional satisfaction and elite support.'
                },
                {
                  title: 'Luxury Vehicle Collection',
                  desc: 'Exclusive fleet of Range Rover, BMW X5, Mercedes EQS, Lamborghini, and Ferrari supercars.'
                },
                {
                  title: 'Electric Future Experience',
                  desc: 'Redefining the driving experience with zero-emission luxury and futuristic EV ownership.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] hover:bg-white/10 transition duration-500"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4 tracking-tight flex items-center gap-4">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-zinc-500" /> {item.title}
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-lg leading-relaxed font-light">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-32">
            {[
              ['AED 4,000', 'Monthly Installment'],
              ['0% Interest', 'Finance for 3 Years'],
              ['24/7 VIP', 'Customer Support'],
              ['Instant Delivery', 'Luxury Cars Ready']
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-white/10 to-transparent border border-white/10 p-12 rounded-[2rem] text-center hover:scale-105 transition duration-500"
              >
                <h4 className="text-3xl font-black text-white mb-2">{card[0]}</h4>
                <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">{card[1]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Voice Section */}
      <section className="relative z-20 py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-10">
          <div className="text-center mb-12 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[4px] md:tracking-[10px] text-white">
              Elite Customer Reviews
            </h2>
            <div className="h-1 w-12 bg-zinc-800 mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
              {[
                {
                  name: 'Jackie Kalwani',
                  review: 'Smooth, transparent, and truly customer-focused. A magical BMW X5 buying experience with unparalleled support.'
                },
                {
                  name: 'Mayassa Damerji',
                  review: 'Professional showroom with excellence from start to finish. Highly recommended for the pinnacle of luxury.'
                },
                {
                  name: 'Mariam Abbas',
                  review: 'Outstanding Range Rover delivery experience. team handled everything with extreme care and professionalism.'
                }
              ].map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 hover:bg-white/10 transition duration-500 group"
                >
                  <div className="flex gap-1 text-zinc-500 mb-6 md:mb-8 group-hover:text-white transition">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" />)}
                  </div>
                  <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light italic mb-8 md:mb-10">
                    “{review.review}”
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 border border-white/10"></div>
                    <div>
                      <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-white">
                        {review.name}
                      </h4>
                      <p className="text-zinc-600 text-[8px] md:text-[10px] uppercase tracking-widest mt-1">Verified Showroom Client</p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* 3D Pagani Disassembly Experience */}
      <section id="experience" ref={sceneRef} className="relative min-h-[250vh] md:min-h-[300vh] bg-black overflow-hidden z-20">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden [perspective:2000px]">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]"></div>

          {/* Main 3D Car Container */}
          <div className="relative w-full max-w-7xl h-[400px] md:h-[700px] flex items-center justify-center p-6 sm:p-10">
            <div 
              className="relative w-full max-w-[950px] aspect-[95/43]"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              {/* Shadow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-white/10 blur-3xl rounded-full"></div>

              {/* Main Body */}
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070"
                alt="Pagani Hypercar"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl md:rounded-[40px] shadow-[0_0_60px_md:0_0_120px_rgba(255,255,255,0.12)] z-20"
              />

              {/* Left Door/Panel */}
              <div className="left-panel smooth absolute left-0 md:left-[-120px] top-[10%] md:top-[90px] w-24 sm:w-32 md:w-[220px] h-24 sm:h-32 md:h-[220px] rounded-xl sm:rounded-2xl md:rounded-[30px] bg-white/10 border border-white/10 backdrop-blur-xl z-30 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 text-center">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-zinc-500 mb-2 md:mb-4" />
                <h3 className="text-[8px] sm:text-xs md:text-xl font-black uppercase tracking-widest text-white">Body Panel</h3>
              </div>

              {/* Right Door/Panel */}
              <div className="right-panel smooth absolute right-0 md:right-[-120px] top-[10%] md:top-[90px] w-24 sm:w-32 md:w-[220px] h-24 sm:h-32 md:h-[220px] rounded-xl sm:rounded-2xl md:rounded-[30px] bg-white/10 border border-white/10 backdrop-blur-xl z-30 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 text-center">
                <Zap className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-zinc-500 mb-2 md:mb-4" />
                <h3 className="text-[8px] sm:text-xs md:text-xl font-black uppercase tracking-widest text-white">Aero Panel</h3>
              </div>

              {/* Front Wheels */}
              <div className="left-wheel smooth absolute left-[10%] bottom-[-10%] w-16 sm:w-24 md:w-[150px] h-16 sm:h-24 md:h-[150px] rounded-full border-4 sm:border-8 md:border-[12px] border-zinc-800 bg-black z-40 shadow-[0_0_30px_rgba(255,255,255,0.1)]"></div>
              <div className="right-wheel smooth absolute right-[10%] bottom-[-10%] w-16 sm:w-24 md:w-[150px] h-16 sm:h-24 md:h-[150px] rounded-full border-4 sm:border-8 md:border-[12px] border-zinc-800 bg-black z-40 shadow-[0_0_30px_rgba(255,255,255,0.1)]"></div>

              {/* Rear Clamshell Reveal */}
              <div className="clamshell smooth absolute top-[-15%] left-1/2 -translate-x-1/2 w-[60%] h-[30%] md:h-[200px] rounded-xl sm:rounded-2xl md:rounded-[40px] bg-white/10 border border-white/10 backdrop-blur-xl z-50 flex flex-col items-center justify-center origin-bottom p-2 md:p-6 text-center">
                <Maximize2 className="hidden sm:block w-4 h-4 md:w-8 md:h-8 text-zinc-500 mb-2 md:mb-4" />
                <h3 className="text-[10px] sm:text-lg md:text-3xl font-black uppercase tracking-[2px] md:tracking-[4px] text-white">Rear Reveal</h3>
              </div>

              {/* Engine Core (Visible under disassembly) */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="engine-core smooth opacity-0 w-[40%] h-[50%] md:h-[240px] rounded-lg sm:rounded-2xl md:rounded-[40px] bg-gradient-to-br from-zinc-700 to-black border border-white/20 flex flex-col items-center justify-center p-2 md:p-8 text-center">
                  <h3 className="text-[10px] sm:text-2xl md:text-5xl font-black uppercase tracking-[2px] md:tracking-[5px] text-white">V12 Engine</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Feature Tags */}
          <div className="absolute bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 text-center z-50 w-full px-6">
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.8em] text-zinc-500 animate-pulse">Scroll to disassemble</span>
          </div>
        </div>

        {/* Feature Cards Grid (Appearing after disassembly) */}
        <div className="relative z-20 max-w-7xl mx-auto px-10 pb-40">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Carbon Fiber Chassis',
                desc: 'Ultra lightweight construction engineered for elite performance and maximum structural integrity.'
              },
              {
                title: 'Aerodynamic Systems',
                desc: 'Active airflow control with futuristic hypercar styling and precision-engineered downforce.'
              },
              {
                title: 'Twin Turbo Hybrid',
                desc: 'Massive power delivery with next-generation engine technology and zero-lag performance.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[35px] p-12 hover:scale-105 transition duration-700 shadow-[0_0_50px_rgba(255,255,255,0.05)]"
              >
                <h3 className="text-3xl font-black uppercase text-white leading-tight mb-6">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-lg leading-relaxed font-light italic">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Features Showcase */}
      <section className="relative z-20 py-20 md:py-32 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 md:mb-12 leading-tight">
              Why Choose <br/> <span className="text-zinc-500">The Elite Cars?</span>
            </h2>

            <div className="space-y-4 md:space-y-6">
              {[
                '0% Interest Finance Options',
                'Luxury Electric Vehicles Available',
                'Comprehensive Dealer Warranty',
                'Elite Trade-In Programs',
                'Immediate Worldwide Delivery'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 md:gap-6 bg-white/5 p-4 md:p-6 rounded-2xl hover:bg-white/10 transition duration-300 border border-white/5 group"
                >
                  <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-white group-hover:scale-125 transition" />
                  <p className="text-lg md:text-xl text-zinc-300 font-light italic">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083"
              className="rounded-[3rem] shadow-3xl hover:scale-105 transition duration-1000 grayscale-[0.2] hover:grayscale-0"
              alt="Luxury Car"
            />

            <div className="absolute -bottom-10 -left-10 bg-white text-black p-10 rounded-[2rem] shadow-3xl animate-pulse">
              <h3 className="text-4xl font-bold font-display italic tracking-tighter">AED 4,000</h3>
              <p className="text-[10px] uppercase tracking-widest mt-2 font-bold">Monthly Installment Starting</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="relative z-20 py-20 md:py-32 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-zinc-400 text-sm font-bold uppercase tracking-widest">4.8 (1,849 Reviews)</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">
                Visit our <br/> <span className="text-zinc-500">Dubai Hub.</span>
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-2">Location</h4>
                    <p className="text-xl text-white font-light italic leading-relaxed">
                      4th St - Al Qouz Ind.third - Al Quoz <br/>
                      Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-2">Inquiries</h4>
                    <p className="text-xl text-white font-light italic">+971 800 354832277</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-2">Opening Hours</h4>
                    <p className="text-xl text-white font-light italic">Every Day: 09:00 AM — 09:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex flex-wrap gap-4">
                <div className="px-6 py-3 border border-zinc-800 rounded-full text-[10px] uppercase tracking-[0.2em] text-zinc-400">In-store Shopping</div>
                <div className="px-6 py-3 border border-zinc-800 rounded-full text-[10px] uppercase tracking-[0.2em] text-zinc-400">Doorstep Delivery</div>
                <div className="px-6 py-3 border border-zinc-800 rounded-full text-[10px] uppercase tracking-[0.2em] text-zinc-400">Export Worldwide</div>
              </div>
            </motion.div>

            {/* Quick Contact Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[3rem] p-10 md:p-14 shadow-2xl"
            >
              <h3 className="text-3xl font-bold mb-10 tracking-tight">Express Inquiry</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Model of Interest</label>
                  <input type="text" placeholder="e.g. Lamborghini Revuelto" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition shadow-inner" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Your Name</label>
                    <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition shadow-inner" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Phone</label>
                    <input type="tel" placeholder="+971" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition shadow-inner" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Message</label>
                  <textarea rows={4} placeholder="Tell us about your requirements..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition resize-none shadow-inner"></textarea>
                </div>
                <button 
                  type="button"
                  className="w-full py-6 bg-white text-black font-black uppercase text-xs tracking-[0.4em] rounded-2xl hover:bg-zinc-200 transition-colors mt-4 active:scale-95"
                >
                  Submit Inquiry
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Short Legal Section for Scroll visibility */}
      <section className="relative z-10 py-16 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xl font-bold uppercase tracking-[0.3em] mb-4">Legal & Privacy</h2>
          <p className="text-zinc-600 text-xs mb-8 italic">
            Your trust is our priority. Review our policies on how we manage, protect and safeguard your automotive experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="px-8 py-3 border border-zinc-800 rounded-full text-[10px] uppercase tracking-widest text-zinc-400 hover:bg-white hover:text-black transition-all"
            >
              Terms & Conditions
            </button>
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="px-8 py-3 border border-zinc-800 rounded-full text-[10px] uppercase tracking-widest text-zinc-400 hover:bg-white hover:text-black transition-all"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer Bar */}
      <footer className="relative z-50 p-10 px-10 flex flex-col md:flex-row justify-between items-center border-t border-white/10 bg-black backdrop-blur-md">
        <div className="flex flex-col gap-2 mb-6 md:mb-0">
          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.4em]">&copy; 2026 THE ELITE CARS GROUP. DUBAI, UAE.</p>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="text-[9px] text-zinc-700 hover:text-white uppercase tracking-[0.3em] transition-colors text-left"
            >
              Terms
            </button>
            <span className="text-zinc-800">/</span>
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="text-[9px] text-zinc-700 hover:text-white uppercase tracking-[0.3em] transition-colors text-left"
            >
              Privacy
            </button>
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <a href="https://www.instagram.com/theelitecarsshowroom/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <Youtube className="w-5 h-5" />
          </a>
        </div>
      </footer>

      <AnimatePresence>
        {isTermsOpen && <Terms isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />}
        {isPrivacyOpen && <PrivacyPolicy isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

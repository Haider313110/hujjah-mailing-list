import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Globe2,
  BarChart3,
  Truck,
  CreditCard,
  Code2,
  CheckCircle,
  Shield,
  BookOpen,
  Clock,
  Check,
  ChevronDown,
  Menu,
  X,
  Quote,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onJoinMailingList: () => void;
}

const testimonials = [
  {
    name: "Zahra Ahmed",
    role: "University Student",
    location: "London",
    content: "As a university student balancing studies and deen, having 24/7 access to Islamic guidance is incredible. I can ask questions about fiqh at 2 AM before an exam and get authentic answers instantly. The human scholar consultation feature helped me understand complex jurisprudence issues my local masjid couldn't address."
  },
  {
    name: "Ali Hassan",
    role: "High School Student",
    location: "Toronto",
    content: "Growing up in the West, I had so many questions about Islam that I was embarrassed to ask. Hujjah.org gave me a safe space to learn without judgment. The AI teacher explains things in modern terms I can understand, and the multilingual support helped my non-English speaking parents use it too."
  },
  {
    name: "Fatima Al-Zahra",
    role: "Islamic Studies Professor",
    location: "Michigan",
    content: "The AI's understanding of Islamic jurisprudence is remarkable. It provides nuanced answers that respect different schools of thought. I now recommend it to all my students as a supplementary learning tool."
  },
  {
    name: "Mohammad Virani",
    role: "CEO",
    location: "New York",
    content: "This AI teacher has revolutionized my Islamic studies. The depth of knowledge and instant accessibility is incredible. I can learn during my commute and the personalized learning path keeps me motivated."
  },
  {
    name: "Amina Malik",
    role: "Mother of 3",
    location: "Dubai",
    content: "Teaching my children about Islam became so much easier with Hujjah.org. They can explore their curiosity independently, and I can verify everything is authentic. The Quran teacher feature with tafsir is exceptional for family learning."
  },
  {
    name: "Sarah Johnson",
    role: "New Muslim",
    location: "California",
    content: "Converting to Islam felt overwhelming with so much to learn. Hujjah.org became my personal guide - patient, always available, and never making me feel stupid for basic questions. The respectful tone and clear explanations helped me build a strong foundation in my new faith."
  },
  {
    name: "Sheikh Sadegh",
    role: "Religious Scholar",
    location: "Iraq",
    content: "As a scholar, I'm impressed by the accuracy and comprehensiveness of the responses. It's a valuable tool for both students and teachers. The fact that it's grounded in authentic sources and supervised by qualified scholars gives me confidence in recommending it to my community."
  },
  {
    name: "Hussein Al-Khafaji",
    role: "Community Organizer",
    location: "Sydney",
    content: "Our community center started recommending Hujjah.org to members with specific religious questions. It's particularly helpful for youth who prefer digital learning. The platform bridges the gap between traditional scholarship and modern accessibility."
  },
  {
    name: "Maryam Raza",
    role: "Software Engineer",
    location: "Seattle",
    content: "As someone working in tech, I appreciate both the AI sophistication and the Islamic authenticity. The platform respects our tradition while embracing modern technology. I use it daily for quick fiqh clarifications and deeper study sessions on weekends."
  },
  {
    name: "Dr. Ibrahim Khalil",
    role: "Medical Doctor",
    location: "London",
    content: "Between long shifts at the hospital, I barely had time for Islamic learning. Hujjah.org fits into my schedule perfectly. I can ask questions during breaks and the quality of responses rivals what I'd get from in-person scholars."
  },
  {
    name: "Layla Mansour",
    role: "Teacher",
    location: "Dubai",
    content: "The educational approach is outstanding. Complex Islamic concepts are broken down clearly without losing their depth. I use it for lesson planning and my own continued learning."
  },
  {
    name: "Yusuf Chen",
    role: "Business Owner",
    location: "Malaysia",
    content: "Being able to ask questions in Malay and get authentic Islamic answers is game-changing. No more language barriers in seeking knowledge. The platform truly serves the global Muslim community."
  }
];

const plans = [
  {
    id: 'free',
    name: 'Trial',
    description: 'Try it out',
    price: 0,
    messagesPerMonth: 5,
    features: ['Access to all Teachers', '5 messages per month', 'Basic support'],
  },
  {
    id: 'basic',
    name: 'Essential',
    description: 'Perfect for getting started',
    price: 0.99,
    messagesPerMonth: 25,
    features: ['Access to all Teachers', '25 messages per month', 'Basic support'],
  },
  {
    id: 'pro',
    name: 'Seeker',
    description: 'For serious learners',
    price: 2.99,
    messagesPerMonth: 100,
    isPopular: true,
    features: ['Access to all Teachers', '100 messages per month', 'Priority support', 'Custom chat history'],
  },
];

const faqs = [
  {
    question: "How do tickets get answered?",
    answer: "When the AI can't find an answer in its sources, it suggests creating a ticket. If you choose to proceed:\n\n1. Translation & Verification: Your question is translated to Arabic and verified by a qualified sheikh\n2. Scholar Review: The verified question is sent to the Head of Sayed Al-Sistani's Istifta office in Najaf, who provides an authoritative ruling in Arabic\n3. Translation & Verification: The answer is translated back to your language and verified by a sheikh for accuracy\n4. Delivery: You're notified and the verified answer is sent to you"
  },
  {
    question: "Why isn't Hujjah.org completely free?",
    answer: "AI costs quite a bit of money to run. To grow Hujjah.org sustainably without compromising our service quality, we need to cover our costs."
  },
  {
    question: "How quickly can I get started with Hujjah.org?",
    answer: "You can start learning immediately with our free trial. Simply sign up and begin chatting with our AI teachers within minutes. No setup required."
  },
  {
    question: "Which Islamic disciplines do you cover?",
    answer: "We cover all major Islamic disciplines including Fiqh (Islamic Law), Quran interpretation, Islamic History, Theology, Ethics, and more. Our AI teachers are trained on authentic sources from various schools of thought."
  },
  {
    question: "How does the scholar consultation work?",
    answer: "While our AI teachers provide instant responses, you can also schedule Email and video consultations with verified human scholars for complex questions or personal guidance that requires human wisdom and experience."
  },
  {
    question: "Are the AI responses authentic and reliable?",
    answer: "Yes, all AI responses are based on authentic Islamic sources and verified scholarly works. Our content is continuously validated by qualified scholars and Islamic institutions to ensure accuracy and authenticity."
  },
  {
    question: "How is Hujjah.org governed?",
    answer: "Hujjah.org is governed by a board of experts including Senior AI Experts from OpenAI, renowned Islamic scholars, and leaders from the global Islamic community. This ensures both technological excellence and authentic Islamic guidance in all our educational content."
  },
  {
    question: "Do you support different languages?",
    answer: "Absolutely! You can ask questions in any language and receive responses in your preferred language. Our platform breaks down language barriers to make Islamic knowledge accessible to everyone."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a free trial to help you experience our platform. No credit card required to start, and you can upgrade anytime as your learning needs grow."
  },
];

export function LandingPage({ onJoinMailingList }: LandingPageProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMonthly, setIsMonthly] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Auto-scroll animation
  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      if (!isPaused && !isHovering) {
        const speed = 50;
        const movement = (deltaTime / 1000) * speed;
        setScrollPosition((prev) => {
          const newPosition = prev + movement;
          const resetPoint = (sliderRef.current?.scrollWidth || 0) / 3;
          return newPosition >= resetPoint ? newPosition - resetPoint : newPosition;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(animationRef.current); };
  }, [isPaused, isHovering]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${scrollPosition}px)`;
    }
  }, [scrollPosition]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') setIsHovering(true);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') setIsHovering(false);
  };

  const handleCardClick = (index: number) => {
    const container = sliderRef.current?.parentElement;
    const card = sliderRef.current?.children[index] as HTMLElement | undefined;
    if (!container || !card) return;

    const containerWidth = container.clientWidth;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const centerOffset = cardLeft - (containerWidth / 2) + (cardWidth / 2);

    setIsPaused(true);
    setScrollPosition(Math.max(0, centerOffset));
    setActiveIndex(index % testimonials.length);

    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      setActiveIndex(null);
    }, 5000);
  };

  const scrollTestimonials = (direction: 'left' | 'right') => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);

    const firstCard = sliderRef.current?.children[0] as HTMLElement | undefined;
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 350;
    const gap = 24;
    const scrollAmount = cardWidth + gap;

    setScrollPosition((prev) => {
      const newPosition = direction === 'right' ? prev + scrollAmount : prev - scrollAmount;
      const resetPoint = (sliderRef.current?.scrollWidth || 0) / 3;
      if (newPosition >= resetPoint) return newPosition - resetPoint;
      if (newPosition < 0) return resetPoint + newPosition;
      return newPosition;
    });

    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      setActiveIndex(null);
    }, 5000);
  };

  useEffect(() => {
    return () => { if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current); };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="text-gray-300 antialiased flex flex-col min-h-screen font-inter relative">
      <div className="hero-bg" aria-hidden="true"></div>

      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-10">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <img src="/IMG_5985.png" alt="Hujjah.org Logo" className="h-8 w-auto" />
            <span className="text-xl sm:text-2xl font-semibold tracking-tighter text-gray-50">Hujjah.org</span>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm">
            <a href="#features" className="text-gray-400 hover:text-gray-50 transition-colors">Features</a>
            <a href="#testimonials" className="text-gray-400 hover:text-gray-50 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-gray-400 hover:text-gray-50 transition-colors">Pricing</a>
            <a href="#faq" className="text-gray-400 hover:text-gray-50 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onJoinMailingList}
              className="text-sm bg-gray-50 text-gray-900 font-normal px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Join Mailing List
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-50 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-[#111111] border border-white/5 rounded-xl p-4">
            <div className="space-y-3">
              <button onClick={() => scrollToSection('features')} className="block w-full text-left text-gray-400 hover:text-gray-50 transition-colors py-2 cursor-pointer">Features</button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-gray-400 hover:text-gray-50 transition-colors py-2 cursor-pointer">Testimonials</button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-gray-400 hover:text-gray-50 transition-colors py-2 cursor-pointer">Pricing</button>
              <button onClick={() => scrollToSection('faq')} className="block w-full text-left text-gray-400 hover:text-gray-50 transition-colors py-2 cursor-pointer">FAQ</button>
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col sm:pt-12 lg:pt-16 sm:pb-20 sm:px-6 lg:px-8 pt-8 pr-4 pb-16 pl-4 items-center relative z-10">
        <div className="max-w-5xl text-center">
          {/* Hero Title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-gray-50">
              A Direct Line to <span className="text-emerald-400">Najaf.</span>
            </h1>
            <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-gray-50 mt-2">
              Seminary Depth Across Every Subject.
            </p>
          </motion.div>

          {/* Hero Description */}
          <motion.p
            className="mt-4 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.9, 0.2, 1] }}
          >
            Go beyond basic answers. AI teachers built to deliver scholar-level insight in Quran, theology, history, ethics, and spirituality. For rulings according to Sayed Al-Sistani, questions beyond the sources are answered directly by the{' '}
            <span className="text-emerald-400 font-medium whitespace-nowrap">Head of his Istifta Office in Najaf</span>.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <button
              onClick={onJoinMailingList}
              className="inline-flex items-center justify-center gap-2 bg-gray-50 text-gray-900 font-normal px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Join Mailing List
            </button>

            <button
              onClick={() => scrollToSection('features')}
              className="inline-flex items-center justify-center gap-2 text-gray-300 border border-white/10 font-normal px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm hover:border-white/20 hover:text-gray-50 transition-colors cursor-pointer"
            >
              Learn More
            </button>
          </motion.div>

          {/* Trust Building Endorsements */}
          <motion.div
            className="mt-8 sm:mt-10 mb-16 sm:mb-20 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 text-gray-50 text-sm px-4 py-3 rounded-xl hover:bg-white/20 hover:shadow-md transition-all duration-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="font-normal">Tickets answered by Head of Sayed Al-Sistani's Istifta Office, Najaf</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 text-gray-50 text-sm px-4 py-3 rounded-xl hover:bg-white/20 hover:shadow-md transition-all duration-300">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="font-normal">Backed by The World Federation of KSIMC</span>
            </div>
          </motion.div>
        </div>

        {/* Feature cards grid */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-5xl" id="features">
          {/* AI Teachers Card */}
          <motion.article
            className="relative col-span-1 overflow-hidden transition-all duration-300 hover:border-emerald-400/30 hover:-translate-y-1 bg-[#111111] border-white/5 border rounded-xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img
              src="https://images.pexels.com/photos/7957076/pexels-photo-7957076.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="AI Teachers"
              className="h-24 sm:h-28 w-full object-cover"
            />
            <div className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-50">Instant AI Teachers</h3>
                  <p className="text-xs text-gray-500">24/7 availability</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-400 mb-3">
                Get immediate answers from AI, with verified scholars available for consultation across all Islamic disciplines.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  Instant responses
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  Human scholars available
                </span>
              </div>
            </div>
          </motion.article>

          {/* Complete Islamic Library Card */}
          <motion.article
            className="relative col-span-1 rounded-xl bg-[#111111] border border-white/5 overflow-hidden transition-all duration-300 hover:border-emerald-400/30 hover:-translate-y-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="https://images.pexels.com/photos/4991138/pexels-photo-4991138.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Islamic Library"
              className="h-24 sm:h-28 w-full object-cover"
            />
            <div className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-50">Complete Islamic Library</h3>
                  <p className="text-xs text-gray-500">All disciplines covered</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-400 mb-3">
                From Ahkam to Quranic tafsir, all Islamic disciplines in one platform with authentic sources.
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Teachers Available</span>
                  <span className="text-emerald-400 font-normal">6</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Verified Sources</span>
                  <span className="text-emerald-400 font-normal">100+</span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Trustworthy Sources Card */}
          <motion.article
            className="relative col-span-1 sm:col-span-2 lg:col-span-1 rounded-xl bg-[#111111] border border-white/5 overflow-hidden transition-all duration-300 hover:border-emerald-400/30 hover:-translate-y-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img
              src="https://images.pexels.com/photos/8164568/pexels-photo-8164568.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Trustworthy Sources"
              className="h-24 sm:h-28 w-full object-cover"
            />
            <div className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Truck className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-50">Trustworthy Sources</h3>
                  <p className="text-xs text-gray-500">Verified authenticity</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-400 mb-3">
                All responses are based on authentic Islamic sources and verified scholarly works with complete validation.
              </p>
            </div>
          </motion.article>

          {/* 24/7 Access Card */}
          <motion.article
            className="relative col-span-1 rounded-xl bg-[#111111] border border-white/5 overflow-hidden transition-all duration-300 hover:border-emerald-400/30 hover:-translate-y-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <img
              src="https://images.pexels.com/photos/13234206/pexels-photo-13234206.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="24/7 Access"
              className="h-24 sm:h-28 w-full object-cover"
            />
            <div className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                  <CreditCard className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-50">24/7 Access</h3>
                  <p className="text-xs text-gray-500">Always available</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-400 mb-3">
                AI available 24/7 for instant answers across all Islamic disciplines.
              </p>
            </div>
          </motion.article>

          {/* Multilingual Support Card */}
          <motion.article
            className="relative col-span-1 sm:col-span-2 rounded-xl bg-[#111111] border border-white/5 overflow-hidden transition-all duration-300 hover:border-emerald-400/30 hover:-translate-y-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <img
              src="https://images.pexels.com/photos/6873647/pexels-photo-6873647.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Multilingual Support"
              className="h-24 sm:h-28 w-full object-cover"
            />
            <div className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-50">Multilingual Support</h3>
                  <p className="text-xs text-gray-500">Breaking language barriers</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-400 mb-3">
                Ask questions and receive answers in any language - breaking down language barriers in Islamic education.
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-emerald-400" />
                  <span>All Languages</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe2 className="w-3 h-3 text-emerald-400" />
                  <span>Real-time Translation</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>Instant Access</span>
                </div>
              </div>
            </div>
          </motion.article>
        </div>

        {/* Trusted Institutions Marquee */}
        <section className="mt-16 sm:mt-20 w-full">
          <motion.div
            className="text-center mb-8 sm:mb-12 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-gray-50 mb-4">
              Trusted by leading <span className="text-emerald-400">Islamic institutions</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Recognized and endorsed by prestigious Islamic organisations and scholarly institutions worldwide.
            </p>
          </motion.div>

          <div className="relative overflow-hidden py-8">
            <div className="flex animate-marquee whitespace-nowrap">
              <span className="mx-8 text-gray-50 text-lg sm:text-xl font-semibold">Sayyid Al-Sistani's Office in Najaf</span>
              <span className="mx-8 text-gray-50 text-lg sm:text-xl font-semibold">Hawza in Najaf</span>
              <span className="mx-8 text-gray-50 text-lg sm:text-xl font-semibold">World Federation of KSIMC</span>
              <span className="mx-8 text-gray-50 text-lg sm:text-xl font-semibold">Sayyid Al-Sistani's Office in Najaf</span>
              <span className="mx-8 text-gray-50 text-lg sm:text-xl font-semibold">Hawza in Najaf</span>
              <span className="mx-8 text-gray-50 text-lg sm:text-xl font-semibold">World Federation of KSIMC</span>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="mt-16 sm:mt-20 w-full max-w-5xl">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-gray-50 mb-4 sm:mb-6">
              Loved by <span className="text-emerald-400">early users</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Join our growing community of knowledge seekers who trust our platform for authentic Islamic learning.
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            <button
              onClick={() => scrollTestimonials('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#111111]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-[#111111] transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollTestimonials('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#111111]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-[#111111] transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              className="testimonials-slider-container"
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            >
              <div
                ref={sliderRef}
                className="testimonials-slider flex gap-6"
                style={{ transition: isPaused ? 'transform 0.5s ease-out' : 'none' }}
              >
                {duplicatedTestimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className={`testimonial-card flex-shrink-0 w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1rem)] group relative bg-gradient-to-br from-[#111111] via-[#0f0f0f] to-[#0d0d0d] border rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 overflow-hidden cursor-pointer ${
                      activeIndex === index % testimonials.length
                        ? 'border-emerald-500/50 shadow-2xl shadow-emerald-500/15 scale-[1.02]'
                        : 'border-white/5'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="mb-4">
                        <Quote className="w-8 h-8 text-emerald-400/30 group-hover:text-emerald-400/50 transition-colors duration-300" />
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/5 group-hover:border-emerald-500/20 transition-colors duration-300">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 border border-emerald-500/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <span className="text-emerald-400 font-semibold text-base">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-gray-50 font-semibold text-sm group-hover:text-emerald-50 transition-colors duration-300">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-500 text-xs group-hover:text-emerald-400/70 transition-colors duration-300">
                            {testimonial.role} &bull; {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mt-16 sm:mt-20 w-full max-w-5xl">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-gray-50 mb-4 sm:mb-6">
              Simple, <span className="text-emerald-400">transparent pricing</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Choose the plan that best fits your learning journey. No hidden fees, no surprises.
            </p>

            {/* Monthly/Yearly Toggle */}
            <div className="flex justify-center items-center mt-8">
              <span className={`text-sm mr-3 transition-colors ${isMonthly ? 'text-gray-50 font-medium' : 'text-gray-400'}`}>Monthly</span>
              <div className={`relative inline-block w-12 h-6 transition-all duration-200 ease-in-out rounded-full ${isMonthly ? 'bg-white/20' : 'bg-emerald-500'}`}>
                <label
                  htmlFor="pricing-toggle"
                  className={`absolute w-5 h-5 top-0.5 transition-all duration-200 ease-in-out transform rounded-full cursor-pointer bg-white shadow-lg ${isMonthly ? 'translate-x-0.5' : 'translate-x-[26px]'}`}
                ></label>
                <input
                  type="checkbox"
                  id="pricing-toggle"
                  name="pricing-toggle"
                  checked={!isMonthly}
                  onChange={() => setIsMonthly(!isMonthly)}
                  className="w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <span className={`text-sm ml-3 transition-colors ${!isMonthly ? 'text-gray-50 font-medium' : 'text-gray-400'}`}>
                Yearly <span className="text-sm font-semibold text-emerald-400">(Save 20%)</span>
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {plans.map((plan, index) => {
              const getPrice = () => {
                if (plan.id === 'free') return 0;
                if (isMonthly) return plan.price;
                return Math.round(plan.price * 12 * 0.8);
              };
              const getPriceLabel = () => {
                if (plan.id === 'free') return '/total';
                return isMonthly ? '/month' : '/year';
              };

              return (
                <motion.div
                  key={plan.id}
                  className={`relative bg-[#111111] rounded-xl p-6 transition-all duration-300 flex flex-col ${
                    plan.isPopular
                      ? 'border-2 border-emerald-500/30 hover:border-emerald-500/50'
                      : 'border border-white/5 hover:border-white/10'
                  }`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-emerald-500 text-white text-xs font-normal px-3 py-1 rounded-full">Most Popular</span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-50 mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-medium text-gray-50">${getPrice()}</span>
                      <span className="text-sm text-gray-400">{getPriceLabel()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{plan.messagesPerMonth} messages per month</p>
                  </div>

                  <ul className="space-y-3 mb-8 text-sm flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={onJoinMailingList}
                    className={`w-full font-normal py-3 rounded-xl transition-colors text-sm cursor-pointer ${
                      plan.isPopular
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                        : 'bg-white/5 border border-white/10 text-gray-50 hover:bg-white/10'
                    }`}
                  >
                    Join Mailing List
                  </button>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="text-center bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-50 mb-6">All plans include</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-300 justify-items-center">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Authentic sources
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="whitespace-nowrap">Access to both Scholars and AI</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-emerald-400" />
                Chat history
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                Multilingual support
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-16 sm:mt-20 w-full max-w-4xl">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-gray-50 mb-4 sm:mb-6">
              Frequently asked <span className="text-emerald-400">questions</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about Hujjah.org and how it can enhance your Islamic learning journey.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-[#111111] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-gray-50 font-medium">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-4 text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-50 mb-4 sm:mb-6">
            Be the First to Know
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join our mailing list to be the first to get access when Hujjah.org launches. Be part of the future of Islamic education.
          </p>
          <button
            onClick={onJoinMailingList}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-normal px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            Join Mailing List
          </button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs text-gray-500">&copy; 2026 Hujjah.org. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

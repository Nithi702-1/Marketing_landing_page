/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Facebook,
  ArrowDown,
  ArrowRight,
  X as CloseIcon,
  Menu,
} from "lucide-react";
import FeatureTabs from "./components/FeatureTabs";
import AISolutionsSection from "./components/AISolutionsSection";

// ─── Reusable layout primitives ───────────────────────────────────────────────

const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`w-full px-[30px] md:px-[60px] max-w-[1920px] mx-auto ${className}`}>
    {children}
  </div>
);

const WideContainer = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`w-full px-[30px] max-w-[1920px] mx-auto ${className}`}>
    {children}
  </div>
);

const Section = ({
  children,
  className = "",
  id = "",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab,        setActiveTab]        = useState("");
  const isManualNavRef = useRef(false);

  const navLinks = [
    { name: "AI Solution", href: "#ai-solutions" },
    { name: "Services",    href: "#services"     },
    { name: "Platform",    href: "#platform"     },
    { name: "Benefits",    href: "#benefits"     },
    { name: "Download",    href: "#cta"          },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const SECTION_MAP: Record<string, string> = {
      "ai-solutions": "AI Solution",
      "services":     "Services",
      "platform":     "Platform",
      "benefits":     "Benefits",
      "cta":          "Download",
    };

    const updateActive = () => {
      if (isManualNavRef.current) return;
      const vh        = window.innerHeight;
      const heroBound = document.getElementById("hero")?.getBoundingClientRect();
      if (heroBound && heroBound.bottom > vh * 0.4) {
        setActiveTab("");
        return;
      }
      let bestTab = "";
      let bestPx  = 0;
      Object.entries(SECTION_MAP).forEach(([id, tab]) => {
        const el = document.getElementById(id);
        if (!el) return;
        const { top, bottom } = el.getBoundingClientRect();
        const visible = Math.max(0, Math.min(vh, bottom) - Math.max(0, top));
        if (visible > bestPx) { bestPx = visible; bestTab = tab; }
      });
      setActiveTab(bestTab);
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  const handleNavClick = (name: string) => {
    setActiveTab(name);
    isManualNavRef.current = true;
    setTimeout(() => { isManualNavRef.current = false; }, 1000);
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          width:           isScrolled ? "70%"                   : "95%",
          maxWidth:        isScrolled ? "1000px"                : "1620px",
          paddingTop:      isScrolled ? "8px"                   : "20px",
          paddingBottom:   isScrolled ? "8px"                   : "20px",
          paddingLeft:     isScrolled ? "16px"                  : "32px",
          paddingRight:    isScrolled ? "16px"                  : "32px",
          borderRadius:    isScrolled ? "100px"                 : "16px",
          backgroundColor: isScrolled ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0)",
          backdropFilter:  isScrolled ? "blur(20px)"            : "blur(0px)",
          top:             isScrolled ? "12px"                  : "24px",
          scale:           isScrolled ? 0.94                    : 1,
          boxShadow:       isScrolled
            ? "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)"
            : "0 0 0px rgba(0,0,0,0)",
          borderColor: isScrolled ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30, mass: 1 }}
        className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center border"
      >
        <div className="w-full flex items-center">
          <div className="flex-1 flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary">
              <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45" />
            </div>
            <span className={`font-bold text-lg tracking-tight whitespace-nowrap hidden lg:block transition-colors duration-300 ${isScrolled ? "text-text-primary" : "text-white"}`}>
              Saudi Tadawul Group
            </span>
          </div>

          <div className="hidden md:flex flex-[2] justify-center items-center">
            <div className={`flex items-center transition-all duration-500 ${isScrolled ? "gap-1" : "gap-6"}`}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.name)}
                  className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full whitespace-nowrap
                    ${
                      activeTab === link.name
                        ? isScrolled
                          ? "text-primary bg-primary/10"
                          : "text-white bg-white/10"
                        : isScrolled
                        ? "text-text-secondary hover:text-primary hover:bg-primary/5"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex-1 justify-end items-center">
            <motion.button
              animate={{
                width:   isScrolled ? "40px"  : "auto",
                height:  isScrolled ? "40px"  : "auto",
                padding: isScrolled ? "0px"   : "10px 24px",
              }}
              className="flex items-center justify-center gap-2 bg-primary text-white rounded-full font-bold text-sm hover:scale-105 hover:shadow-lg active:scale-95 overflow-hidden transition-all"
            >
              <AnimatePresence mode="wait">
                {!isScrolled && (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap"
                  >
                    Get in Touch
                  </motion.span>
                )}
              </AnimatePresence>
              <ArrowRight size={18} />
            </motion.button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              className={`p-2 rounded-lg transition-colors ${isScrolled ? "text-text-primary" : "text-white"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-32 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => { setIsMobileMenuOpen(false); handleNavClick(link.name); }}
                  className={`text-3xl font-bold transition-colors ${activeTab === link.name ? "text-primary" : "text-white"}`}
                >
                  {link.name}
                </a>
              ))}
              <button className="mt-8 w-full bg-primary text-white py-4 rounded-full font-bold text-xl">
                Get in Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Sticky socials sidebar ───────────────────────────────────────────────────
const StickySocials = () => {
  const socials = [
    { Icon: Facebook,  href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Youtube,   href: "#" },
    { Icon: Linkedin,  href: "#" },
    { Icon: Twitter,   href: "#" },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 p-3 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
      {socials.map(({ Icon, href }, i) => (
        <a
          key={i}
          href={href}
          className="p-2 text-text-primary/70 hover:text-primary hover:bg-primary/10 hover:scale-110 hover:translate-x-1 transition-all duration-300 rounded-xl"
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const fadeIn = {
    initial:     { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0  },
    viewport:    { once: true },
    transition:  { duration: 0.6 },
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <StickySocials />

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <header id="hero" className="relative h-[900px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Skyscraper"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary-gradient opacity-80 backdrop-blur-[2px]" />
        </div>

        <Container className="relative z-10 pt-20 h-full">
          <div className="flex flex-row items-end justify-between gap-8 w-full h-full pt-[120px] pb-0 px-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center pb-24 max-w-[580px] shrink-0"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-6">
                INVESTOR RELATIONS <br /> MADE SIMPLE
              </h1>
              <p className="text-white/90 mb-10 leading-relaxed text-base md:text-lg lg:text-[18px] text-left">
                Our app will keep you up to date with the latest development — from latest share prices and press
                releases to investor days, financial results and our document library on the go.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex flex-1 justify-center items-end self-end"
              style={{ maxWidth: 560 }}
            >
              <img
                src="/phone-mockup.png"
                alt="Saudi Tadawul Group IR App on mobile"
                className="w-full object-contain object-bottom select-none"
                style={{
                  maxHeight: 760,
                  mixBlendMode: "multiply",
                  filter: "drop-shadow(0 32px 56px rgba(0,0,0,0.35))",
                }}
                draggable={false}
              />
            </motion.div>
          </div>
        </Container>

        <div className="absolute bottom-10 left-24 z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg cursor-pointer border-2 border-white"
          >
            <ArrowDown size={28} />
          </motion.div>
        </div>
      </header>

      {/* ══ 2. AI GENERATIVE SOLUTIONS ══════════════════════════════════════ */}
      <AISolutionsSection />

      {/* ══ 3. FEATURES — 4-block asymmetric bento grid ═════════════════════ */}
      <section id="services" className="bg-white" style={{ padding: "72px 0 72px" }}>
        <WideContainer>
          <motion.div {...fadeIn} className="text-center mb-6">
            <h2 className="text-4xl font-semibold text-text-primary mb-3">
              Your Investor Relations Needs in one App
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-sm">
              Download the Investor Relations app to follow our share price and learn about investor events, stock
              exchange announcements, presentations, annual and quarterly reports, and interact with key data on-screen.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows:    "repeat(2, 1fr)",
              gap:                 "16px",
              height:              "75vh",
            }}
          >
            {/* Block 1: Primary Anchor */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px -8px rgba(0,0,0,0.10)" }}
              style={{ gridColumn: "1", gridRow: "1 / 3" }}
              className="bg-[#F0F9FF] rounded-[24px] overflow-hidden flex flex-col"
            >
              <div style={{ flex: 3 }} className="relative m-4 rounded-[18px] overflow-hidden flex items-center justify-center">
                <img src="/Stay_Informed.png" alt="Stay Informed" className="w-full h-full object-contain" />
              </div>
              <div style={{ flex: 2 }} className="px-6 pb-7 pt-4 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-text-primary mb-2">Stay Informed</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Access the latest share prices, press releases, events, and financial results instantly.
                  Dive into dividend history, analyst consensus, and key financials.
                </p>
              </div>
            </motion.div>

            {/* Block 2: Wide Feature */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px -8px rgba(0,0,0,0.10)" }}
              style={{ gridColumn: "2 / 4", gridRow: "1" }}
              className="bg-[#F0F9FF] rounded-[24px] overflow-hidden flex flex-col"
            >
              <div style={{ flex: 3 }} className="relative m-4 rounded-[18px] overflow-hidden flex items-center justify-center">
                <img src="/Share_Grpah.png" alt="Interactive Charting" className="w-full h-full object-contain" />
              </div>
              <div style={{ flex: 2 }} className="px-6 pb-7 pt-4 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-text-primary mb-2">Interactive Charting</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Analyze historical performance with advanced charting tools. Compare against indices, peers,
                  and track long-term growth with ease.
                </p>
              </div>
            </motion.div>

            {/* Block 3: Curated Watchlist */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.14 }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px -8px rgba(0,0,0,0.10)" }}
              style={{ gridColumn: "2", gridRow: "2" }}
              className="bg-[#F0F9FF] rounded-[24px] overflow-hidden flex flex-col"
            >
              <div style={{ flex: 3 }} className="relative m-4 rounded-[18px] overflow-hidden flex items-center justify-center">
                <img src="/Curated_watchlist.png" alt="Curated Watchlist" className="w-full h-full object-contain" />
              </div>
              <div style={{ flex: 2 }} className="px-6 pb-7 pt-4 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-text-primary mb-2">Curated Watchlist</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Monitor stock performance with a curated list of peers and personal watchlists synced
                  to your user profile across any device.
                </p>
              </div>
            </motion.div>

            {/* Block 4: Never Miss Updates */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.20 }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px -8px rgba(0,0,0,0.10)" }}
              style={{ gridColumn: "3", gridRow: "2" }}
              className="bg-[#F0F9FF] rounded-[24px] overflow-hidden flex flex-col"
            >
              <div style={{ flex: 3 }} className="relative m-4 rounded-[18px] overflow-hidden flex items-center justify-center">
                <img src="/Never_Missupdate.png" alt="Never Miss Updates" className="w-full h-full object-contain" />
              </div>
              <div style={{ flex: 2 }} className="px-6 pb-7 pt-4 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-text-primary mb-2">Never Miss Updates</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Stay updated with push notifications for reports, news, and events—and add those events
                  directly to your device calendar.
                </p>
              </div>
            </motion.div>
          </div>
        </WideContainer>
      </section>

      {/* ══ 4. INVESTOR EXPERIENCE ═══════════════════════════════════════════ */}
      <Section id="platform" className="bg-primary-gradient relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 65%)", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)", transform: "translate(-30%, 30%)" }}
        />

        <Container className="relative z-10 text-center">
          <motion.h2 {...fadeIn} className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Investor Friendly <br /> Experience
          </motion.h2>
          <motion.p
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/85 text-base md:text-lg leading-relaxed mx-auto mb-12"
            style={{ maxWidth: 700 }}
          >
            Our app ensures a seamless experience to keep you connected to our company's essential updates and
            information. It makes it simpler for you to stay informed, no matter where you are.
            The app is optimized for iPhone, iPad and all major Android phones and tablets.
          </motion.p>

          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="w-full rounded-[28px] min-h-[420px] md:min-h-[500px] relative overflow-hidden flex items-center justify-center"
            style={{
              background:          "rgba(255,255,255,0.07)",
              backdropFilter:      "blur(16px)",
              WebkitBackdropFilter:"blur(16px)",
              border:              "1px solid rgba(255,255,255,0.14)",
              boxShadow:           "inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 48px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-[28px]"
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 45%)" }}
            />
            <img
              src="/Tab-mockup.png"
              alt="Investor Friendly Experience App Mockup"
              className="relative z-10 w-full h-full object-contain"
              style={{ maxHeight: 600 }}
            />
          </motion.div>
        </Container>
      </Section>

      {/* ══ 5. BENEFITS ══════════════════════════════════════════════════════ */}
      <FeatureTabs id="benefits" />

      {/* ══ 6. CTA ═══════════════════════════════════════════════════════════ */}
      <Section id="cta" className="pb-24">
        <Container>
          <motion.div
            {...fadeIn}
            className="bg-primary-gradient rounded-[24px] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[420px] relative"
          >
            {/* Download_BG overlay */}
            <img
              src="/Download_BG.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain z-0 pointer-events-none"
            />

            {/* LEFT: text content */}
            <div className="flex-1 flex flex-col justify-center px-10 py-14 md:px-14 md:py-16 relative z-10">
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
                <div className="grid grid-cols-5 h-full">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="border-r border-b border-white" />
                  ))}
                </div>
              </div>
              <div className="relative z-10">
                <span className="inline-block text-white/60 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  Saudi Tadawul Group · IR App
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-[1.15] mb-5">
                  Start your Investor<br />Journey Today
                </h2>
                <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8 max-w-sm">
                  Stay informed and make smarter decisions.<br />
                  Download our app now and access real-time<br />
                  markets from anywhere.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-primary font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all text-sm"
                  >
                    Download App
                  </motion.button>
                  <span className="text-white/50 text-xs tracking-wide">Available on iOS &amp; Android</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Mockup */}
            <div className="relative z-10 flex-1 min-h-[320px] md:min-h-0 flex items-stretch p-5 md:p-6">
              <div className="relative w-full rounded-[20px] overflow-hidden">
                <img
                  src="/Download_Mockup.png"
                  alt="Download the IR App"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ══ 7. FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="bg-primary py-16 text-white">
        <Container className="text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                <div className="w-6 h-6 border-2 border-white rounded-sm rotate-45" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">Saudi Tadawul Group</span>
            </div>
            <p className="text-white/60 text-sm max-w-lg mx-auto leading-relaxed">
              Connecting investors with the information they need — from real-time share prices and press releases to
              financial results, event calendars, and AI-powered insights, all in one place.
            </p>
            <div className="w-full h-px bg-white/10 my-8" />
            <p className="text-white/40 text-xs tracking-widest uppercase font-medium">© 2025 Saudi Tadawul Group</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

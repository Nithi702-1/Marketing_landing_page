import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const FEATURES = [
  {
    id: 0,
    title: "AI Solutions",
    description:
      "Deploy advanced AI agents across your business functions to automate complex tasks, improve efficiency, and deliver tailored customer experiences. Features include sentiment analysis, automated reporting, and dynamic task prioritization.",
    actionText: "Explore AI Capabilities",
  },
  {
    id: 1,
    title: "AI Podcast",
    description:
      "Automatically generate and synthesize audio content for investor calls, market summaries, and internal training from raw data and text. Create professional-quality voiceovers and dialogue scripts for distribution.",
    actionText: "Generate AI Audio",
  },
];

// ─── Illustration 1: AI Hub ───────────────────────────────────────────────────
const AIHubIllustration = () => (
  <svg viewBox="0 0 480 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ maxHeight: 320 }}>
    <defs>
      <radialGradient id="hubGrad3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1e40af" />
      </radialGradient>
      <radialGradient id="nodeGrad3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f0f9ff" /><stop offset="100%" stopColor="#e0f2fe" />
      </radialGradient>
    </defs>
    <circle cx="240" cy="200" r="130" fill="none" stroke="#dbeafe" strokeWidth="1" strokeDasharray="4,6" />
    <line x1="240" y1="152" x2="240" y2="70"  stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="5,4" />
    <line x1="287" y1="178" x2="370" y2="122" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="5,4" />
    <line x1="287" y1="222" x2="370" y2="292" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="5,4" />
    <line x1="193" y1="222" x2="110" y2="292" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="5,4" />
    <line x1="193" y1="178" x2="110" y2="122" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="5,4" />
    <circle cx="240" cy="200" r="56" fill="url(#hubGrad3)" />
    <circle cx="240" cy="200" r="62" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
    <text x="240" y="196" textAnchor="middle" fill="white" fontSize="20" fontWeight="700" fontFamily="system-ui,sans-serif">AI</text>
    <text x="240" y="216" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui,sans-serif" opacity="0.75" letterSpacing="3">HUB</text>
    <circle cx="240" cy="44"  r="28" fill="url(#nodeGrad3)" stroke="#bfdbfe" strokeWidth="1.5" />
    <rect x="226" y="36" width="5" height="15" rx="1.5" fill="#93c5fd" />
    <rect x="234" y="30" width="5" height="21" rx="1.5" fill="#3b82f6" />
    <rect x="242" y="34" width="5" height="17" rx="1.5" fill="#60a5fa" />
    <rect x="250" y="40" width="5" height="11" rx="1.5" fill="#bfdbfe" />
    <circle cx="386" cy="110" r="28" fill="url(#nodeGrad3)" stroke="#bfdbfe" strokeWidth="1.5" />
    <circle cx="386" cy="103" r="9" fill="#60a5fa" />
    <path d="M370 127c0-8.8 7.2-16 16-16s16 7.2 16 16" fill="#93c5fd" />
    <circle cx="386" cy="298" r="28" fill="url(#nodeGrad3)" stroke="#bfdbfe" strokeWidth="1.5" />
    <circle cx="386" cy="298" r="10.5" fill="none" stroke="#3b82f6" strokeWidth="2" />
    <circle cx="386" cy="298" r="4.5" fill="#60a5fa" />
    <rect x="383" y="283" width="6" height="7" rx="2" fill="#3b82f6" />
    <rect x="383" y="308" width="6" height="7" rx="2" fill="#3b82f6" />
    <rect x="370" y="295.5" width="7" height="6" rx="2" fill="#3b82f6" />
    <rect x="395" y="295.5" width="7" height="6" rx="2" fill="#3b82f6" />
    <circle cx="94" cy="298" r="28" fill="url(#nodeGrad3)" stroke="#bfdbfe" strokeWidth="1.5" />
    <ellipse cx="94" cy="287" rx="12" ry="4.5" fill="#60a5fa" />
    <rect x="82" y="287" width="24" height="9" fill="#93c5fd" />
    <ellipse cx="94" cy="296" rx="12" ry="4.5" fill="#60a5fa" />
    <rect x="82" y="296" width="24" height="8" fill="#93c5fd" />
    <ellipse cx="94" cy="304" rx="12" ry="4.5" fill="#60a5fa" />
    <circle cx="94" cy="110" r="28" fill="url(#nodeGrad3)" stroke="#bfdbfe" strokeWidth="1.5" />
    <polyline points="79,117 88,106 97,112 108,98" stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="108" cy="98" r="3" fill="#1d4ed8" />
  </svg>
);

// ─── Illustration 2: AI Podcast ───────────────────────────────────────────────
const PodcastIllustration = () => (
  <svg viewBox="0 0 480 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ maxHeight: 320 }}>
    <defs>
      <linearGradient id="micGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
      <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#bfdbfe" />
      </linearGradient>
    </defs>
    <circle cx="240" cy="158" r="115" fill="none" stroke="#dbeafe" strokeWidth="1" strokeDasharray="6,6" />
    <circle cx="240" cy="158" r="88"  fill="none" stroke="#dbeafe" strokeWidth="1" opacity="0.5" />
    <rect x="210" y="85" width="60" height="102" rx="30" fill="url(#micGrad3)" />
    {[103,118,133,148,163,176].map((y, i) => (
      <line key={i} x1={i===0||i===5?220:216} y1={y} x2={i===0||i===5?260:264} y2={y} stroke="white" strokeWidth="1" opacity="0.22" />
    ))}
    <rect x="233" y="187" width="14" height="50" fill="#dbeafe" />
    <path d="M194 224 Q194 282 240 282 Q286 282 286 224" fill="none" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
    <line x1="240" y1="282" x2="240" y2="304" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
    <rect x="208" y="304" width="64" height="6" rx="3" fill="#93c5fd" />
    {[24,42,64,50,72,40,22].map((h, i) => (
      <rect key={`lw${i}`} x={44+i*19} y={157-h/2} width="11" height={h} rx="5.5" fill="url(#waveGrad3)" opacity="0.9" />
    ))}
    {[30,54,40,70,46,60,26].map((h, i) => (
      <rect key={`rw${i}`} x={302+i*19} y={157-h/2} width="11" height={h} rx="5.5" fill="url(#waveGrad3)" opacity="0.9" />
    ))}
    {[28,44,36,52,30,46,22].map((h, i) => (
      <rect key={`bc${i}`} x={172+i*22} y={320-h} width="14" height={h} rx="2" fill={i%2===0?"#60a5fa":"#3b82f6"} opacity="0.9" />
    ))}
    <circle cx="74"  cy="316" r="17" fill="#dbeafe" />
    <path d="M50 344c0-13.3 10.7-24 24-24s24 10.7 24 24" fill="#bfdbfe" />
    <circle cx="406" cy="316" r="17" fill="#dbeafe" />
    <path d="M382 344c0-13.3 10.7-24 24-24s24 10.7 24 24" fill="#bfdbfe" />
  </svg>
);

const ILLUSTRATIONS = [AIHubIllustration, PodcastIllustration];

export default function AISolutionsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  const [progress,  setProgress]  = useState(0);
  const [mode,      setMode]      = useState<"before" | "fixed" | "after">("before");
  const [headerH,   setHeaderH]   = useState(0);
  // slotH = height of each feature slot in the scroll tape (55% of viewport)
  const [slotH,     setSlotH]     = useState(() =>
    typeof window !== "undefined" ? Math.round(window.innerHeight * 0.55) : 300
  );

  // ── Measure header & slot heights on mount / resize ──────────────────────
  useEffect(() => {
    const measure = () => {
      setHeaderH(headerRef.current?.offsetHeight ?? 0);
      setSlotH(Math.round(window.innerHeight * 0.55));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ── Scroll tracker — drives mode + progress ───────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const { top }  = wrapper.getBoundingClientRect();
      const vh       = window.innerHeight;
      const hH       = headerRef.current?.offsetHeight ?? 0;
      // Sticky panel is active for FEATURES.length × 100 vh of scroll
      const stickyDist = FEATURES.length * vh;
      // How many px past the header bottom we have scrolled
      const pastHeader = -(top + hH);

      if (pastHeader < 0) {
        setMode("before");
        setProgress(0);
      } else if (pastHeader >= stickyDist) {
        setMode("after");
        setProgress(1);
      } else {
        setMode("fixed");
        setProgress(pastHeader / stickyDist);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // slot: 0 = Feature 0 centred · 1 = Feature 1 centred
  const slot        = progress * (FEATURES.length - 1);
  const activeIndex = slot < 0.5 ? 0 : 1;
  const ActiveIll   = ILLUSTRATIONS[activeIndex];

  // ── Panel positioning (JS-based sticky avoids overflow:hidden breakage) ───
  const panelStyle: React.CSSProperties =
    mode === "fixed"
      ? { position: "fixed",    top: 0,       left: 0, right: 0, height: "100vh" }
      : mode === "after"
      ? { position: "absolute", bottom: 0,    left: 0, right: 0, height: "100vh" }
      : { position: "absolute", top: headerH, left: 0, right: 0, height: "100vh" };

  // Total wrapper height = Layer-1 header + sticky scroll range + one panel height
  // = headerH  +  FEATURES.length × 100vh  +  100vh
  const wrapperH = `calc(${headerH}px + ${(FEATURES.length + 1) * 100}vh)`;

  return (
    <div
      ref={wrapperRef}
      id="ai-solutions"
      style={{ position: "relative", height: wrapperH }}
    >

      {/* ── LAYER 1: Section title + description — scrolls naturally ── */}
      <div
        ref={headerRef}
        className="text-center px-6 pt-20 pb-16 bg-[#fafafa]"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-4">
          Our AI Generative Solutions
        </h2>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Download the Investor Relations app to follow our share price and learn about investor
          events, stock exchange announcements, presentations, annual and quarterly reports, and
          interact with key data on-screen.
        </p>
      </div>

      {/* ── LAYER 2: Sticky interactive panel — 100 vh, centred ── */}
      <div
        style={panelStyle}
        className="bg-[#fafafa] flex items-center overflow-hidden"
      >
        {/* Inner card — horizontally padded, two columns */}
        <div className="w-full flex gap-8 lg:gap-14 px-6 md:px-14 lg:px-24 items-center">

          {/* LEFT ── pagination + masked scroll tape */}
          <div className="flex flex-col w-full max-w-[420px] shrink-0">

            {/* Pagination dots */}
            <div className="flex items-center gap-2.5 mb-7">
              {FEATURES.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
                    i === activeIndex
                      ? "bg-primary w-7"
                      : "bg-transparent border border-gray-300 w-2"
                  }`}
                />
              ))}
            </div>

            {/* Masked scroll tape */}
            <div
              className="relative overflow-hidden"
              style={{
                height: slotH,
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
              }}
            >
              {/* Tape — shifts by one slotH per feature */}
              <div
                style={{
                  height:      slotH * FEATURES.length,
                  transform:   `translateY(${-slot * slotH}px)`,
                  willChange:  "transform",
                }}
              >
                {FEATURES.map((f) => (
                  <div
                    key={f.id}
                    style={{ height: slotH }}
                    className="flex flex-col justify-center pr-4"
                  >
                    <h3 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4 leading-tight">
                      {f.title}
                    </h3>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
                      {f.description}
                    </p>
                    <button className="flex items-center gap-2 px-5 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-semibold text-sm hover:bg-emerald-100 transition-colors w-fit group">
                      <span>{f.actionText}</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT ── stationary illustration */}
          <div className="flex-1 min-w-0">
            <div
              className="relative w-full bg-blue-50 rounded-2xl border border-blue-100 overflow-hidden"
              style={{ height: `min(${slotH + 100}px, 72vh)` }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.97, y: 8  }}
                  animate={{ opacity: 1, scale: 1,    y: 0  }}
                  exit={{    opacity: 0, scale: 1.03, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center p-8"
                >
                  <ActiveIll />
                </motion.div>
              </AnimatePresence>

              {/* Progress pip */}
              <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1.5">
                <span className="text-[10px] font-bold text-blue-300 tracking-widest uppercase">
                  {activeIndex + 1} / {FEATURES.length}
                </span>
                <div className="flex gap-1.5">
                  {FEATURES.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === activeIndex ? "bg-primary w-5" : "bg-blue-200 w-1.5"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

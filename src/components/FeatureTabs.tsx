import { useEffect, useState, useRef, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`w-full px-[30px] md:px-[60px] max-w-[1920px] mx-auto ${className}`}>
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
  <section id={id} className={`py-24 ${className}`}>
    {children}
  </section>
);

const TABS = [
  {
    title: "Personalization",
    desc: "Customize your settings for investors such as language, currency, and more.",
    image: "/Features/Features%201.png",
  },
  {
    title: "Shareable Content",
    desc: "Share the latest updates with others using various channels by sharing content directly from the app.",
    image: "/Features/Features%202.png",
  },
  {
    title: "Accessible",
    desc: "Your content syncs seamlessly and is available both online and offline.",
    image: "/Features/Features%203.png",
  },
  {
    title: "User Profile",
    desc: "Allow investors to carry saved companies for watchlists across different MyIRApps and devices.",
    image: "/Features/Features%204.png",
  },
  {
    title: "Notifications",
    desc: "Get updated on reports, news, and events by receiving notifications on your mobile devices.",
    image: "/Features/Features%205.png",
  },
  {
    title: "Innovation",
    desc: "Stay ahead of the game with our proactive approach to enhancing the investor experience.",
    image: "/Features/Features%206.png",
  },
];

// Each tab stays active for TICKS_PER_TAB × TICK_MS = 4 seconds
const TICK_MS       = 100;
const TICKS_PER_TAB = 40;

export default function FeatureTabs({ id }: { id?: string }) {
  const [active,   setActive]   = useState(0);
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef   = useRef(0);
  const tickRef     = useRef(0);

  const startTimer = useCallback((startIndex: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    activeRef.current = startIndex;
    tickRef.current   = 0;
    setActive(startIndex);
    setProgress(0);

    intervalRef.current = setInterval(() => {
      tickRef.current += 1;

      const pct = Math.min((tickRef.current / TICKS_PER_TAB) * 100, 100);
      setProgress(pct);

      if (tickRef.current >= TICKS_PER_TAB) {
        const next = (activeRef.current + 1) % TABS.length;
        activeRef.current = next;
        tickRef.current   = 0;

        setActive(next);
        setProgress(0);
      }
    }, TICK_MS);
  }, []);

  useEffect(() => {
    startTimer(0);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTimer]);

  const handleTabClick = (index: number) => {
    startTimer(index);
  };

  return (
    <Section id={id} className="bg-white py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-text-primary mb-4">Benefits that you will find here</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Discover how our IRApp streamlines your investor relations with features designed for efficiency,
            accessibility, and proactive engagement.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-20 items-center justify-center max-w-6xl mx-auto w-full">

          {/* ── LEFT: Tab list ── */}
          <div className="w-full md:w-[320px] shrink-0 space-y-8">
            {TABS.map((tab, index) => {
              const isActive = index === active;

              return (
                <div
                  key={index}
                  className="relative pl-8 cursor-pointer"
                  onClick={() => handleTabClick(index)}
                >
                  {/* Vertical progress line */}
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-gray-200">
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 w-[2px] bg-primary"
                        style={{ height: `${progress}%` }}
                      />
                    )}
                  </div>

                  <div
                    className={`transition-colors duration-300 ${
                      isActive ? "text-text-primary" : "text-gray-400"
                    }`}
                  >
                    <h4 className="text-xl font-medium">{tab.title}</h4>

                    <AnimatePresence mode="wait" initial={false}>
                      {isActive && (
                        <motion.div
                          key={`desc-${index}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="mt-3 overflow-hidden"
                        >
                          <p className="text-base text-text-secondary leading-relaxed">{tab.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── RIGHT: Feature image panel ── */}
          <div className="flex-1 flex items-center justify-center min-h-[450px]">
            <div className="w-full h-[450px] rounded-[8px] overflow-hidden relative bg-transparent">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={active}
                  src={TABS[active].image}
                  alt={`${TABS[active].title} preview`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </AnimatePresence>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HeroCanvas from "./HeroCanvas";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

const ROLES = [
  "Full Stack Developer",
  "React Specialist",
  "Node.js Engineer",
  "UI Craftsman",
  "Problem Solver",
];

// Deterministic particle positions (avoids re-randomization on re-render)
const PARTICLES = [
  { x: 12, y: 18, size: 1.5, delay: 0, dur: 9 },
  { x: 35, y: 72, size: 1, delay: 2.1, dur: 11 },
  { x: 58, y: 31, size: 2, delay: 4.3, dur: 8 },
  { x: 78, y: 55, size: 1.5, delay: 1.5, dur: 12 },
  { x: 22, y: 88, size: 1, delay: 6.7, dur: 7.5 },
  { x: 48, y: 14, size: 2.5, delay: 3.2, dur: 10 },
  { x: 88, y: 42, size: 1, delay: 0.8, dur: 13 },
  { x: 66, y: 82, size: 2, delay: 5.1, dur: 8.5 },
  { x: 8, y: 61, size: 1.5, delay: 2.8, dur: 11.5 },
  { x: 42, y: 96, size: 1, delay: 7.4, dur: 9 },
  { x: 94, y: 78, size: 1.5, delay: 1.1, dur: 10 },
  { x: 3, y: 35, size: 1, delay: 4.9, dur: 12 },
  { x: 70, y: 6, size: 2, delay: 2.6, dur: 8 },
  { x: 50, y: 60, size: 1, delay: 5.8, dur: 14 },
];

// Hollow floating diamonds - echoes the cursor shape
const DIAMONDS = [
  { x: 14, y: 24, size: 5, delay: 1.2, dur: 14 },
  { x: 74, y: 15, size: 7, delay: 3.5, dur: 11 },
  { x: 92, y: 66, size: 4, delay: 0.7, dur: 16 },
  { x: 27, y: 47, size: 6, delay: 5.1, dur: 13 },
  { x: 53, y: 83, size: 5, delay: 2.3, dur: 10 },
  { x: 85, y: 33, size: 8, delay: 4.8, dur: 12 },
  { x: 17, y: 75, size: 4, delay: 6.2, dur: 15 },
  { x: 63, y: 51, size: 6, delay: 1.9, dur: 9 },
  { x: 39, y: 9, size: 5, delay: 3.1, dur: 13 },
  { x: 2, y: 55, size: 4, delay: 0.4, dur: 11 },
];

// Small floating rings
const RINGS = [
  { x: 96, y: 22, size: 14, delay: 2.7, dur: 14 },
  { x: 44, y: 92, size: 10, delay: 0.3, dur: 12 },
  { x: 6, y: 14, size: 12, delay: 4.6, dur: 16 },
  { x: 81, y: 77, size: 9, delay: 1.5, dur: 10 },
  { x: 32, y: 30, size: 11, delay: 6.0, dur: 13 },
];

function scramble(el, text, speed = 32) {
  let iteration = 0;
  const id = setInterval(() => {
    el.textContent = text
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (i < iteration) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join("");
    if (iteration >= text.length) {
      clearInterval(id);
      el.textContent = text;
    }
    iteration += 0.38;
  }, speed);
  return () => {
    clearInterval(id);
    if (el) el.textContent = text;
  };
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  const ref = useRef(null);
  const name1Ref = useRef(null);
  const name2Ref = useRef(null);
  const roleRef = useRef(null);
  const cleanupRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Initial states ────────────────────────────────────────────────
      gsap.set(".scan-line", { top: 0, opacity: 0 });
      gsap.set(".hero-eyebrow", { opacity: 0, y: 8 });
      gsap.set(".hero-meta", { opacity: 0, y: 20 });
      gsap.set(".hero-scroll-ind", { opacity: 0 });
      gsap.set(".hero-role-wrap", { opacity: 0 });
      gsap.set(".hero-orb", { opacity: 0 });

      // Measure and set up SVG drawing paths
      const geoPaths = gsap.utils.toArray(".hero-geo-path", ref.current);
      geoPaths.forEach((el) => {
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      });

      // Hide names (text pre-filled in JSX to reserve layout space)
      gsap.set([name1Ref.current, name2Ref.current], { opacity: 0 });

      // ── Main timeline ─────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Depth orbs fade in slowly
      tl.to(".hero-orb", { opacity: 1, duration: 2.5, stagger: 0.5 }, 0);

      // SVG geometry draws on load
      tl.to(
        geoPaths,
        {
          strokeDashoffset: 0,
          duration: 2.4,
          ease: "power2.inOut",
          stagger: 0.3,
        },
        0,
      );

      // Scan line sweeps
      tl.to(".scan-line", { opacity: 1, duration: 0.08 }, 0.5);
      tl.to(
        ".scan-line",
        { top: "100vh", duration: 0.65, ease: "power1.in" },
        0.5,
      );
      tl.to(".scan-line", { opacity: 0, duration: 0.08 }, "-=0.08");

      // Eyebrow
      tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.5 }, 1.0);

      // Name scrambles - make visible then scramble into final text
      tl.add(() => {
        if (!name1Ref.current) return;
        gsap.set(name1Ref.current, { opacity: 1 });
        cleanupRef.current.push(scramble(name1Ref.current, "MUHAMMED"));
      }, 1.15);
      tl.add(() => {
        if (!name2Ref.current) return;
        gsap.set(name2Ref.current, { opacity: 1 });
        cleanupRef.current.push(scramble(name2Ref.current, "PARVESH"));
      }, 1.9);

      // Role ticker appears after scramble settles
      tl.to(".hero-role-wrap", { opacity: 1, duration: 0.5 }, 3.2);

      // Meta row + scroll cue
      tl.to(".hero-meta", { opacity: 1, y: 0, duration: 0.7 }, 3.4);
      tl.to(".hero-scroll-ind", { opacity: 1, duration: 0.5 }, 3.8);
    }, ref);

    // ── Role cycling (starts after load, loops forever) ──────────────────
    let roleIdx = 0;
    const roleEl = roleRef.current;
    let intervalId;

    const cycleRole = () => {
      if (!roleEl) return;
      gsap.to(roleEl, {
        y: -22,
        opacity: 0,
        duration: 0.38,
        ease: "power2.in",
        onComplete: () => {
          roleIdx = (roleIdx + 1) % ROLES.length;
          roleEl.textContent = ROLES[roleIdx];
          gsap.fromTo(
            roleEl,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.38, ease: "power2.out" },
          );
        },
      });
    };

    // Delay start until initial animation is done
    const startTimer = setTimeout(() => {
      intervalId = setInterval(cycleRole, 2600);
    }, 4500);

    return () => {
      cleanupRef.current.forEach((fn) => fn?.());
      clearTimeout(startTimer);
      clearInterval(intervalId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={ref} id="hero" className="relative h-auto md:h-[300vh]">
      {/* Sticky viewport on desktop; normal block on mobile */}
      <div
        className={
          isMobile
            ? "h-screen flex flex-col justify-center pt-16 pb-10 overflow-hidden relative"
            : "sticky top-0 h-screen flex flex-col justify-end pb-24 overflow-hidden"
        }
      >
        {/* 3D icosahedron - WebGL canvas, desktop only */}
        {!isMobile && <HeroCanvas />}

        {/* Depth orbs - large blurred radial gradients that drift */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          <div className="hero-orb hero-orb--1" />
          <div className="hero-orb hero-orb--2" />
          <div className="hero-orb hero-orb--3" />
        </div>

        {/* Floating ambient particles */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.dur}s`,
              }}
            />
          ))}
        </div>

        {/* Floating hollow diamonds */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          {DIAMONDS.map((d, i) => (
            <div
              key={i}
              className="hero-float-diamond"
              style={{
                left: `${d.x}%`,
                top: `${d.y}%`,
                width: `${d.size}px`,
                height: `${d.size}px`,
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.dur}s`,
              }}
            />
          ))}
        </div>

        {/* Floating small rings */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          {RINGS.map((r, i) => (
            <div
              key={i}
              className="hero-float-ring"
              style={{
                left: `${r.x}%`,
                top: `${r.y}%`,
                width: `${r.size}px`,
                height: `${r.size}px`,
                animationDelay: `${r.delay}s`,
                animationDuration: `${r.dur}s`,
              }}
            />
          ))}
        </div>

        {/* Scan line */}
        <div
          className="scan-line"
          style={{ position: "absolute", left: 0, right: 0, top: 0 }}
        />

        {/* Content */}
        <div className="max-w-[1240px]  mx-auto px-5 sm:px-10 w-full relative z-10">
          {/* Eyebrow */}
          <div className="hero-eyebrow font-mono text-[0.62rem] tracking-[0.3em] uppercase text-amber mb-5 sm:mb-10 flex items-center gap-3">
            <span className="block w-6 h-px bg-amber shrink-0" />
            <span className="whitespace-nowrap">Software Developer</span>
            {!isMobile && (
              <span className="whitespace-nowrap">
                &nbsp;·&nbsp; React &amp; Node.js &nbsp;·&nbsp; Full Stack
              </span>
            )}
          </div>

          {/* Name - pre-filled to reserve layout space, hidden until scramble fires */}
          <div className="mb-1 leading-none">
            <span
              ref={name1Ref}
              className="font-display font-extrabold text-ink block"
              style={{
                fontSize: "clamp(1.6rem, 7.5vw, 8rem)",
                letterSpacing: "-0.02em",
                lineHeight: 0.92,
              }}
            >
              MUHAMMED
            </span>
          </div>
          <div className={`leading-none ${isMobile ? "mb-3" : "mb-6"}`}>
            <span
              ref={name2Ref}
              className="font-display font-semibold text-ink-muted block"
              style={{
                fontSize: "clamp(1.6rem, 7.5vw, 8rem)",
                letterSpacing: "-0.02em",
                lineHeight: 0.92,
              }}
            >
              PARVESH
            </span>
          </div>

          {/* Looping role ticker - cycles through roles after load */}
          <div
            className={`hero-role-wrap overflow-hidden ${isMobile ? "mb-5" : "mb-10"}`}
            style={{ height: "1.6em" }}
          >
            <span
              ref={roleRef}
              className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-amber block leading-none pt-1"
            >
              Full Stack Developer
            </span>
          </div>

          {/* Meta row */}
          <div
            className={`hero-meta flex ${isMobile ? "flex-col pt-4 gap-2" : "flex-row items-end justify-between pt-7 gap-5"}`}
          >
            <div className="font-mono text-[0.68rem] tracking-[0.25em] uppercase text-ink-muted leading-relaxed">
              <span className="text-ink font-bold">Full Stack</span> Developer
              <br />
              <span className="text-[0.58rem] text-ink-muted tracking-[0.2em]">
                React · Node.js · MongoDB · Express.js
              </span>
            </div>
            {!isMobile && (
              <p className="max-w-[260px] text-[0.83rem] text-ink-muted text-right leading-[1.65]">
                Crafting performant, visually exceptional web experiences - from
                concept to deployment.
              </p>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-ind absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="font-mono text-[0.52rem] tracking-[0.38em] uppercase text-ink-ghost">
            scroll
          </span>
          <div className="scroll-line" />
        </div>
      </div>
      {/* end sticky */}
    </section>
  );
}

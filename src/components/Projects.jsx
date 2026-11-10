import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Github } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

// ── Featured case: the end-to-end proof ─────────────────────────────────
const featured = {
  name: "TASTIN",
  subtitle: "Spice e-commerce · Freelance",
  badge: "live",
  outcome:
    "An online spice store where customers browse, pay and track their delivery, with orders handled in a background queue.",
  desc: "A full-scale spice e-commerce platform built with Next.js and Node.js, deployed on AWS. Features variant-based shopping, dynamic recipe blog, real-time delivery tracking via Shiprocket, and BullMQ-powered order queue management.",
  href: "https://www.tastinnov.com/",
  host: "tastinnov.com",
  image: "/projects/tastin.jpg",
  alt: "TASTIN storefront: tea and spice products with category navigation and search",
  pipeline: [
    {
      stage: "Storefront",
      tech: "Next.js · TypeScript",
      plain: "Variant-based shopping and a dynamic recipe blog.",
    },
    {
      stage: "Payments",
      tech: "Razorpay",
      plain: "Online checkout and payment.",
    },
    {
      stage: "Order queue",
      tech: "Node.js · Redis · BullMQ",
      plain: "Orders handled in a background job queue.",
    },
    {
      stage: "Delivery",
      tech: "Shiprocket",
      plain: "Real-time shipment tracking for customers.",
    },
    {
      stage: "Infrastructure",
      tech: "AWS · MongoDB · Cloudinary",
      plain: "Hosting, database and image delivery.",
    },
  ],
};

// ── Other work ──────────────────────────────────────────────────────────
const projects = [
  {
    name: "GAfix",
    subtitle: "Analytics platform · NeenOpal",
    badge: "live",
    outcome:
      "An automated GA4 and GTM auditing platform that identifies tracking issues, configuration gaps, and data-quality problems.",
    role: "Contributing to the frontend development using React and TypeScript.",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Sass", "Shadcn UI"],
    image: "/projects/gafix.jpg",
    alt: "GAfix homepage: GA4, GTM and compliance monitoring with a tracking health preview",
    host: "gafix.ai",
    links: [{ label: "Live site", href: "https://www.gafix.ai/", icon: "external" }],
  },
  {
    name: "GoAtom",
    subtitle: "Agency portfolio · Dubai",
    badge: "live",
    outcome:
      "A portfolio website for an advertising agency based in Dubai, reflecting the agency's creative brand.",
    role: "Built with React and Framer Motion, focused on smooth animations and a polished visual identity.",
    tech: ["React.js", "Framer Motion", "JavaScript"],
    image: "/projects/goatom.jpg",
    alt: "GoAtom homepage: bold uppercase headline on black with the agency's 3D logo mark",
    host: "goatom.ae",
    links: [{ label: "Live site", href: "https://www.goatom.ae/", icon: "external" }],
  },
  {
    name: "Dine Delight",
    subtitle: "Restaurant reservation · Academic",
    badge: "academic",
    outcome:
      "Find nearby restaurants on a map, book tables, pre-order food, and chat with staff in real time.",
    role: "Owners get a full dashboard to manage reservations, menus, and orders, with QR-based menu scanning for dine-in.",
    tech: [
      "React.js",
      "Node.js",
      "MongoDB",
      "TypeScript",
      "Socket.IO",
      "Mapbox",
      "Redux Toolkit",
      "Google OAuth",
      "Stripe",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ParveshM/Dine-Delight",
        icon: "github",
      },
    ],
  },
];

const PROJECTS_PARTICLES = [
  { x: 88, y: 15, size: 1.5, delay: 0.5, dur: 11 },
  { x: 94, y: 50, size: 1, delay: 3, dur: 9 },
  { x: 82, y: 78, size: 2, delay: 1.8, dur: 13 },
  { x: 91, y: 35, size: 1, delay: 4.5, dur: 8 },
];

function Shot({ href, host, image, alt, eager = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="proj-shot group/shot"
      aria-label={`Open ${host} in a new tab`}
    >
      <div className="proj-shot-bar">
        <span>{host}</span>
        <ArrowUpRight
          size={13}
          aria-hidden="true"
          className="ml-auto transition-colors duration-300 group-hover/shot:text-amber"
        />
      </div>
      <img
        src={image}
        alt={alt}
        width="1440"
        height="900"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </a>
  );
}

function ProjectLink({ link }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] tracking-[0.14em] uppercase text-ink-muted hover:text-amber transition-colors duration-300 whitespace-nowrap py-1"
    >
      {link.icon === "external" ? (
        <ArrowUpRight size={14} aria-hidden="true" />
      ) : (
        <Github size={14} aria-hidden="true" />
      )}
      {link.label}
    </a>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const starRef = useRef(null);

  useEffect(() => {
    const fills = ref.current.querySelectorAll(".pipeline-fill");
    const nodes = gsap.utils.toArray(".pipeline-node", ref.current);

    if (prefersReducedMotion()) {
      // Static, complete pipeline
      gsap.set(fills, { scaleX: 1, scaleY: 1 });
      gsap.set(nodes, { backgroundColor: "#C8963F" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".proj-featured > *", {
        opacity: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proj-featured", start: "top 80%" },
      });

      gsap.from(".project-row", {
        opacity: 0,
        y: 36,
        duration: 0.85,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: ".projects-list", start: "top 82%" },
      });

      gsap.to(starRef.current, {
        rotation: 360,
        duration: 45,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
      });

      // The authored moment: the order flows through the pipeline as you
      // scroll — the line draws and each stage lights up in sequence.
      const mm = gsap.matchMedia();
      mm.add(
        {
          wide: "(min-width: 1024px)",
          narrow: "(max-width: 1023px)",
        },
        (c) => {
          const { wide } = c.conditions;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".pipeline",
              start: wide ? "top 78%" : "top 75%",
              end: wide ? "top 40%" : "bottom 55%",
              scrub: 1,
            },
          });
          tl.fromTo(
            fills,
            wide ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 },
            { scaleX: 1, scaleY: 1, ease: "none", duration: 1 },
            0,
          );
          nodes.forEach((node, i) => {
            tl.fromTo(
              node,
              { backgroundColor: "#0C0A08" },
              { backgroundColor: "#C8963F", duration: 0.08, ease: "none" },
              (i / (nodes.length - 1)) * 0.92,
            );
          });
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative overflow-hidden bg-canvas py-16 md:py-32"
    >
      {/* Rotating asterisk background element */}
      <svg
        ref={starRef}
        aria-hidden="true"
        className="hidden md:block"
        style={{
          position: "absolute",
          right: "-60px",
          top: "50%",
          width: "420px",
          height: "420px",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.035,
          transform: "translateY(-50%)",
        }}
        viewBox="0 0 420 420"
        fill="none"
      >
        <line x1="210" y1="15" x2="210" y2="405" stroke="rgba(200,150,63,1)" strokeWidth="1" />
        <line x1="15" y1="210" x2="405" y2="210" stroke="rgba(200,150,63,1)" strokeWidth="1" />
        <line x1="72" y1="72" x2="348" y2="348" stroke="rgba(200,150,63,1)" strokeWidth="1" />
        <line x1="348" y1="72" x2="72" y2="348" stroke="rgba(200,150,63,1)" strokeWidth="1" />
        <circle cx="210" cy="210" r="195" stroke="rgba(200,150,63,0.5)" strokeWidth="0.8" />
        <circle cx="210" cy="210" r="120" stroke="rgba(200,150,63,0.4)" strokeWidth="0.8" />
      </svg>

      {/* Particles */}
      {PROJECTS_PARTICLES.map((p, i) => (
        <div
          key={i}
          className="section-depth-particle"
          aria-hidden="true"
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

      <div className="max-w-[1240px] mx-auto px-5 sm:px-10 relative z-10">
        <div className="mb-14">
          <div className="section-label">Projects</div>
          <h2 className="section-title">
            Things I've <em>shipped</em>
          </h2>
        </div>

        {/* ── Featured: TASTIN ─────────────────────────────────────────── */}
        <article
          aria-labelledby="proj-featured-title"
          className="border-t border-edge pt-10 md:pt-14 pb-14 md:pb-20"
        >
          <div className="proj-featured">
            <Shot
              href={featured.href}
              host={featured.host}
              image={featured.image}
              alt={featured.alt}
            />

            <div>
              <div className="flex gap-2 mb-4">
                <Badge variant={featured.badge}>● Live</Badge>
              </div>
              <h3
                id="proj-featured-title"
                className="font-display font-semibold text-ink leading-none mb-2"
                style={{ fontSize: "clamp(2.4rem, 4.4vw, 3.8rem)", letterSpacing: "-0.02em" }}
              >
                {featured.name}
              </h3>
              <p className="font-mono text-[0.75rem] tracking-[0.14em] uppercase text-ink-muted mb-6">
                {featured.subtitle}
              </p>
              <p className="text-[1.08rem] text-ink leading-[1.7] mb-4 max-w-[34rem] text-pretty">
                {featured.outcome}
              </p>
              <p className="text-[0.92rem] text-ink-muted leading-[1.75] mb-7 max-w-[34rem] text-pretty">
                {featured.desc}
              </p>
              <ProjectLink
                link={{ label: "Visit live site", href: featured.href, icon: "external" }}
              />
            </div>
          </div>

          {/* Delivery pipeline */}
          <div className="mt-14 md:mt-20">
            <h4
              className="font-display font-medium text-ink mb-8 md:mb-10 text-balance"
              style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.8rem)", letterSpacing: "-0.01em" }}
            >
              From storefront to doorstep{" "}
              <span className="text-ink-muted font-normal">
                — the whole system behind one order.
              </span>
            </h4>
            <div className="relative">
            <div className="pipeline-track" aria-hidden="true">
              <div className="pipeline-fill" />
            </div>
            <ol className="pipeline" aria-label="How a TASTIN order moves through the system">
              {featured.pipeline.map((step) => (
                <li key={step.stage} className="pipeline-step">
                  <span className="pipeline-node" aria-hidden="true" />
                  <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-amber mb-2">
                    {step.stage}
                  </p>
                  <p className="font-display font-medium text-ink text-[1.02rem] leading-snug mb-1.5">
                    {step.tech}
                  </p>
                  <p className="text-[0.88rem] text-ink-muted leading-[1.6] max-w-[22rem]">
                    {step.plain}
                  </p>
                </li>
              ))}
            </ol>
            </div>
          </div>
        </article>

        {/* ── Other work ───────────────────────────────────────────────── */}
        <div className="projects-list">
          {projects.map((p) => (
            <article
              key={p.name}
              className={`project-row project-layout-row ${p.image ? "" : "project-layout-row--text"} py-10 md:py-12 border-t border-edge last:border-b`}
            >
              {p.image && (
                <Shot href={p.links[0].href} host={p.host} image={p.image} alt={p.alt} />
              )}

              <div>
                <div className="flex gap-2 mb-3">
                  <Badge variant={p.badge}>
                    {p.badge === "live" ? "● Live" : "Academic"}
                  </Badge>
                </div>

                <h3 className="font-display text-[clamp(1.6rem,2.5vw,2.2rem)] font-medium text-ink mb-1 leading-tight">
                  {p.name}
                </h3>

                <p className="font-mono text-[0.75rem] tracking-[0.14em] uppercase text-ink-muted mb-4">
                  {p.subtitle}
                </p>

                <p className="text-[0.98rem] text-ink leading-[1.7] max-w-xl mb-2 text-pretty">
                  {p.outcome}
                </p>
                <p className="text-[0.9rem] text-ink-muted leading-[1.7] max-w-xl mb-6 text-pretty">
                  {p.role}
                </p>

                <ul className="flex flex-wrap gap-2 list-none" aria-label={`${p.name} tech stack`}>
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-[0.75rem] tracking-wide bg-canvas-card border border-edge-strong px-2.5 py-1 text-ink-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-row md:flex-col flex-wrap gap-3 md:items-end">
                {p.links.map((link) => (
                  <ProjectLink key={link.label} link={link} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

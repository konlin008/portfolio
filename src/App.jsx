import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { ArrowUpRight, Code2, Database, Globe, ChevronDown, ExternalLink } from "lucide-react";


const skills = [
  { name: "React", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Redux", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "MongoDB", category: "Backend" },
  { name: "Socket.io", category: "Backend" },
];

const projects = [
  {
    number: "01",
    title: "Skillora LMS",
    tags: ["MERN", "Stripe", "Auth"],
    desc: "Modern LMS with secure authentication, role-based access control, and full Stripe payment integration.",
    year: "2024",
    liveLink: 'https://lms-buwm.vercel.app/',
    repoLink: 'https://github.com/konlin008/LMS'
  },
  {
    number: "02",
    title: "Team Task Manager",
    tags: ["Socket.io", "Kanban", "Realtime"],
    desc: "Collaborative Kanban board with real-time chat powered by WebSockets and Socket.io.",
    year: "2024",
    liveLink: 'https://team-task-manager-zeta-seven.vercel.app',
    repoLink: 'https://github.com/konlin008/Team-Task-Manager'
  },
  {
    number: "03",
    title: "Portfolio Website",
    tags: ["React", "Animation", "UI"],
    desc: "Personal developer portfolio with scroll animations, responsive layout, and clean visual UX.",
    year: "2025",
    liveLink: '/',
    repoLink: 'https://github.com/konlin008/portfolio'
  },
];


function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    };
    window.addEventListener("mousemove", onMove);
    let raf;
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-amber-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-amber-400/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}


const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-4 mb-14">
    <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-zinc-500">
      {children}
    </span>
    <span className="h-px w-24 bg-zinc-800" />
  </div>
);

export default function App() {
  const [filter, setFilter] = useState("All");
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState("");


  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);


  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollPct =
    typeof document !== "undefined"
      ? (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      : 0;

  const categories = ["All", "Frontend", "Backend"];
  const filtered = filter === "All" ? skills : skills.filter((s) => s.category === filter);

  return (

    <div
      className="min-h-screen bg-[#0c0c0c] text-[#e8e4d9] overflow-x-hidden selection:bg-amber-400 selection:text-black"
      style={{ cursor: "none", fontFamily: "'DM Sans', sans-serif" }}
    >

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');
        * { cursor: none !important; }
        .font-display { font-family: 'Playfair Display', Georgia, serif !important; }
        .font-mono-dm { font-family: 'DM Mono', 'Courier New', monospace !important; }
      `}</style>

      <Cursor />


      <div
        className="fixed top-0 left-0 h-0.5 bg-amber-400 z-[9997] transition-[width] duration-75"
        style={{ width: `${scrollPct}%` }}
      />


      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 border-b border-zinc-900 bg-[#0c0c0c]/90 backdrop-blur-sm">
        <span className="font-display font-black text-xl tracking-tight">
          Aman<span className="text-amber-400">.</span>
        </span>

        <div className="hidden md:flex items-center gap-10">
          {["about", "skills", "projects", "contact"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="font-mono-dm text-[0.68rem] tracking-[0.14em] uppercase text-zinc-500 hover:text-[#e8e4d9] transition-colors duration-200"
            >
              {s}
            </a>
          ))}
        </div>

        <span className="font-mono-dm text-[0.68rem] text-zinc-600 hidden md:block">
          {time} <span className="opacity-50 ml-1">IST</span>
        </span>
      </nav>


      <section className="min-h-screen flex flex-col justify-between pt-28 pb-12 px-8 md:px-16">

        <div className="absolute top-32 right-16 text-right hidden md:block">
          {["Full Stack Dev", "MERN Stack", "Based in India"].map((l) => (
            <p key={l} className="font-mono-dm text-[0.62rem] tracking-[0.16em] uppercase text-zinc-600 leading-loose">
              {l}
            </p>
          ))}
        </div>


        <div className="flex-1 flex flex-col justify-center max-w-5xl mt-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block w-7 h-px bg-amber-400/60" />
            <span className="font-mono-dm text-[0.65rem] tracking-[0.16em] uppercase text-zinc-500">
              Available for work
            </span>
          </div>

          <h1 className="font-display font-black leading-[0.93] tracking-tight mb-8"
            style={{ fontSize: "clamp(3.8rem,13vw,9.5rem)" }}>
            <span
              className="block overflow-hidden"
              style={{ animation: "slideUp 0.9s cubic-bezier(.16,1,.3,1) 0.05s both" }}
            >
              Building
            </span>
            <span
              className="block overflow-hidden italic font-normal text-zinc-600"
              style={{ animation: "slideUp 0.9s cubic-bezier(.16,1,.3,1) 0.15s both" }}
            >
              digital
            </span>
            <span
              className="block overflow-hidden"
              style={{ animation: "slideUp 0.9s cubic-bezier(.16,1,.3,1) 0.25s both" }}
            >
              Experiences<span className="text-amber-400">.</span>
            </span>
          </h1>

          <p className="text-zinc-500 text-base md:text-lg max-w-md leading-relaxed mb-10 font-light">
            MERN stack developer crafting scalable web apps — clean architecture, thoughtful UX, and code that lasts.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-amber-400 text-black font-mono-dm text-[0.72rem] tracking-[0.1em] uppercase px-7 py-3.5 font-medium hover:bg-amber-300 transition-colors duration-200"
            >
              View Projects <ArrowUpRight size={14} />
            </a>
            <a href="/Aman_CV.pdf" download>
              <button className="inline-flex items-center gap-2 border border-zinc-800 text-[#e8e4d9] font-mono-dm text-[0.72rem] tracking-[0.1em] uppercase px-7 py-3.5 hover:border-amber-400 hover:text-amber-400 transition-colors duration-200">
                Download CV
              </button>
            </a>

          </div>
        </div>


        <div className="flex items-end justify-between mt-12">
          <div className="flex gap-3">
            {[
              { icon: <FaGithub />, href: "https://github.com/konlin008" },
              { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/aman-mondal-506a402a8/" },
              { icon: <IoIosMail />, href: "mailto:amanofficial0108@gmail.com" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:border-amber-400 hover:text-amber-400 transition-all duration-200 text-lg"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-mono-dm text-[0.6rem] tracking-[0.15em] uppercase text-zinc-600">Scroll</span>
            <ChevronDown
              size={14}
              className="text-zinc-600"
              style={{ animation: "bounce 2s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>


      <div className="border-y border-zinc-900 py-4 overflow-hidden">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "marquee 22s linear infinite" }}
        >
          {[...Array(2)].flatMap(() =>
            ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind", "Redux", "JavaScript"].map((t, i) => (
              <span key={t + i} className="font-mono-dm text-[0.68rem] tracking-[0.14em] uppercase text-zinc-600">
                {t} <span className="text-amber-400 mx-3">✦</span>
              </span>
            ))
          )}
        </div>
      </div>


      <section id="about" className="px-8 md:px-16 py-24">
        <FadeIn><SectionLabel>01 — About</SectionLabel></FadeIn>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.1}>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight">
              Turning ideas into<br />
              <span className="italic font-normal text-zinc-600">real products.</span>
            </h2>
            <p className="text-zinc-500 leading-relaxed mt-6 text-[0.95rem]">
              I'm a full-stack developer focused on the MERN stack. I care deeply about code quality,
              system architecture, and shipping products that feel right — both under the hood and in
              the hands of users.
            </p>
            <p className="text-zinc-500 leading-relaxed mt-4 text-[0.95rem]">
              Whether it's a polished frontend, a secure REST API, or a real-time feature — I bring
              the same attention to detail across the full stack.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col gap-4">
              {[
                { Icon: Code2, title: "Frontend", desc: "Responsive UIs with React, Tailwind CSS, and clean component architecture." },
                { Icon: Database, title: "Backend", desc: "Secure APIs, MongoDB, JWT auth, and scalable Node/Express systems." },
                { Icon: Globe, title: "Full Stack", desc: "End-to-end MERN apps — real-time features, Stripe, cloud deployment." },
              ].map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-5 items-start border border-zinc-900 p-5 hover:border-amber-400/40 transition-colors duration-300"
                >
                  <Icon size={20} className="text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-display font-bold text-lg mb-1">{title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>


      <section id="skills" className="px-8 md:px-16 py-24 border-t border-zinc-900">
        <FadeIn><SectionLabel>02 — Skills</SectionLabel></FadeIn>


        <FadeIn delay={0.1}>
          <div className="flex items-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={[
                  "font-mono-dm text-[0.68rem] tracking-[0.1em] uppercase px-4 py-1.5 border transition-colors duration-200",
                  filter === c
                    ? "border-amber-400 text-amber-400"
                    : "border-transparent text-zinc-500 hover:text-[#e8e4d9]",
                ].join(" ")}
              >
                {c}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-3">
            {filtered.map((s) => (
              <div
                key={s.name}
                className="px-5 py-2.5 border border-zinc-800 font-mono-dm text-[0.78rem] tracking-[0.06em] text-zinc-400 hover:border-amber-400 hover:text-amber-400 hover:bg-amber-400/5 transition-all duration-200"
              >
                {s.name}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>


      <section
        id="projects"
        className="px-8 md:px-16 py-24 border-t border-zinc-900"
      >
        <FadeIn>
          <SectionLabel>03 — Projects</SectionLabel>
        </FadeIn>

        <div>
          {projects.map((p, i) => (
            <FadeIn key={p.number} delay={i * 0.08}>
              <div className="group border-t border-zinc-900 py-8 px-4 -mx-4 hover:bg-zinc-900/40 transition-all duration-300 hover:border-amber-400/30">

                <div className="flex items-start justify-between gap-6">

                  <div className="flex gap-6 md:gap-10 flex-1">

                    <span className="font-mono-dm text-xs text-zinc-700 group-hover:text-amber-400 transition-colors duration-300 pt-1 w-6 shrink-0">
                      {p.number}
                    </span>

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="font-display font-bold text-2xl md:text-3xl">
                          {p.title}
                        </h3>

                        <div className="flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="font-mono-dm text-[0.6rem] tracking-[0.12em] uppercase px-2.5 py-1 border border-zinc-800 text-zinc-600 rounded-full"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-zinc-500 text-sm leading-relaxed max-w-xl mb-5">
                        {p.desc}
                      </p>

                      <div className="flex items-center gap-4">

                        <a
                          href={p.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition-colors"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>

                        <a
                          href={p.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                          <FaGithub size={16} />
                          Source Code
                        </a>

                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-mono-dm text-xs text-zinc-700">
                      {p.year}
                    </span>

                    <ArrowUpRight
                      size={20}
                      className="text-amber-400 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}

          <div className="border-t border-zinc-900" />
        </div>
      </section>


      <section id="contact" className="px-8 md:px-16 py-24 border-t border-zinc-900">
        <FadeIn><SectionLabel>04 — Contact</SectionLabel></FadeIn>

        <div className="max-w-3xl">
          <FadeIn delay={0.1}>
            <h2
              className="font-display font-black leading-none mb-8"
              style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)" }}
            >
              Let's build<br />
              <span className="italic font-normal text-zinc-600">something</span><br />
              great<span className="text-amber-400">.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-zinc-500 text-lg leading-relaxed mb-10 max-w-lg font-light">
              Open to internships, freelance projects, and full-time roles. Let's connect and ship something meaningful.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="mailto:amanofficial0108@gmail.com"
                className="inline-flex items-center gap-2 bg-amber-400 text-black font-mono-dm text-[0.72rem] tracking-[0.1em] uppercase px-7 py-3.5 font-medium hover:bg-amber-300 transition-colors duration-200"
              >
                Get in touch <ArrowUpRight size={14} />
              </a>

              <div className="flex gap-3">
                {[
                  { icon: <FaGithub />, href: "https://github.com/konlin008" },
                  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/aman-mondal-506a402a8/" },
                  { icon: <IoIosMail />, href: "mailto:amanofficial0108@gmail.com" }
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:border-amber-400 hover:text-amber-400 transition-all duration-200 text-lg"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>


      <footer className="border-t border-zinc-900 px-8 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display font-black text-xl">
          Aman<span className="text-amber-400">.</span>
        </span>
        <span className="font-mono-dm text-[0.68rem] text-zinc-600">
          © 2026 — Designed &amp; built by Aman
        </span>
        <span className="font-mono-dm text-[0.68rem] text-zinc-600 hidden md:block">
          MERN Stack Developer
        </span>
      </footer>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(105%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes marquee {
          from { transform: translateX(0);    }
          to   { transform: translateX(-50%); }
        }
        @keyframes bounce {
          0%,100% { transform: translateY(0);  }
          50%     { transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
}
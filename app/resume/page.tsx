import type { Metadata } from 'next';
// Removed: import { Inter } from 'next/font/google';
import {
  Mail,
  Github,
  Linkedin,
  Download,
  ArrowUpRight,
  Briefcase,
  Layers,
  GraduationCap,
  Award,
  Star,
  Cpu,
  Server,
  
  ShoppingCart,
  Languages,
} from 'lucide-react';

// Removed: Setting up the Inter font
// const inter = Inter({ subsets: ['latin'] });

// SEO Metadata for recruiters
export const metadata: Metadata = {
  title: 'Ashutosh Devgotra | Live Resume',
  description:
    'The live resume of Ashutosh Devgotra, a tech-savvy entrepreneur blending AI, e-commerce, and full-stack development.',
};

// --- Reusable Components ---

/**
 * A reusable component for section headings
 */
const Section: React.FC<{
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}> = ({ title, icon: Icon, children }) => (
  <section className="mb-12">
    <h2 className="flex items-center text-2xl font-bold text-indigo-400 mb-6 pb-2 border-b-2 border-indigo-400/30">
      <Icon className="w-6 h-6 mr-3 text-indigo-300" />
      {title}
    </h2>
    <div className="text-slate-300">{children}</div>
  </section>
);

/**
 * A reusable component for project cards
 */
interface ProjectCardProps {
  title: string;
  tech: string;
  link: string;
  children: React.ReactNode;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  tech,
  link,
  children,
}) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-6 bg-slate-900 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-indigo-500/30 hover:-translate-y-1 hover:bg-slate-800/60"
  >
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
      <ArrowUpRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
    </div>
    <p className="text-sm font-medium text-indigo-300 mb-4">{tech}</p>
    <div className="text-slate-400 text-sm">{children}</div>
  </a>
);

/**
 * A reusable component for skill badges
 */
const SkillBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-slate-800 text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full">
    {children}
  </span>
);

// --- Main Page Component ---

export default function ResumePage() {
  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-200`} // Removed: ${inter.className}
    >
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Ashutosh Devgotra
            </h1>
            <p className="mt-2 text-xl md:text-2xl text-indigo-400 font-medium">
              Entrepreneur & Full-Stack Developer
            </p>
            <p className="mt-3 text-base text-slate-300 max-w-xl">
              Tech-savvy student blending AI, e-commerce, and automation to build
              future-focused D2C brands and SaaS solutions.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end gap-3 flex-shrink-0">
            {/* Contact Links */}
            <div className="flex space-x-4">
              <a
                href="mailto:ashutoshdevgotra@gmail.com"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/AshutoshDevgotra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/ashutosh-devgotra-284057269"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            {/* Download CTA */}
            <a
              href="/CV/AI_RESUME_2026.pdf"
              className="mt-2 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-950"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </a>
          </div>
        </header>

        <main>
          {/* --- Summary Section --- */}
          <Section title="Professional Summary" icon={Briefcase}>
            <p className="text-base leading-relaxed">
              B.Tech Chemical Engineering student with expertise in full-stack
              development, e-commerce operations, cloud deployment, and
              automation. Proven ability to build and deploy live platforms,
              manage large-scale operations, and optimize workflows from product
              sourcing to delivery. Skilled in logistics, return management, GST
              compliance, and digital infrastructure setup. Strong foundational
              knowledge in OOP and DSA.
            </p>
          </Section>

          {/* --- Experience Section --- */}
          <Section title="Experience" icon={Briefcase}>
            <div className="mb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-semibold text-slate-100">
                  Founder & CEO – Growwithgarry.in
                </h3>
                <span className="text-sm text-slate-400">
                  June 2022 – Present
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-4">Mukerian, Punjab</p>
              <ul className="list-disc list-outside ml-5 space-y-2 text-slate-300">
                <li>
                  Built and deployed full-stack e-commerce platforms using
                  Next.js, Tailwind, Firebase, and Razorpay.
                </li>
                <li>
                  Managed all digital infrastructure: domain, DNS, SSL, and
                  email routing via Cloudflare; deployments on Vercel/Netlify.
                </li>
                <li>
                  Handled complete business operations: GST & import-export
                  licence registration, 11,000+ unit procurement, and logistics.
                </li>
                <li>
                  Launched and manage Estrobella.Store (premium activewear
                  brand) and listed products on Amazon, Flipkart, & Meesho.
                </li>
              </ul>
            </div>
          </Section>

          {/* --- Projects Section --- */}
          <Section title="Projects" icon={Layers}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectCard
                title="NyayDwar – Legal AI Platform"
                tech="LLaMA 3 | LangChain | RAG | NLP"
                link="https://nyayadwar.growwithgarry.in/"
              >
                <p>
                  Developed a legal AI trained on 170+ Indian legal docs (IPC,
                  CrPC, Constitution). Provides an LLM chatbot for advocates,
                  NGOs, and citizens.
                </p>
              </ProjectCard>
              <ProjectCard
                title="Estrobella.Store – Activewear Brand"
                tech="Next.js | Shopify | Firebase"
                link="https://www.estrobella.store"
              >
                <p>
                  Founded and built a premium activewear D2C brand from scratch,
                  utilizing a Next.js frontend with a Shopify backend for
                  e-commerce.
                </p>
              </ProjectCard>
              <ProjectCard
                title="CreatorHub – SaaS Prototype"
                tech="Next.js | Tailwind CSS"
                link="https://creatorhub-outx.vercel.app/"
              >
                <p>
                  Built a SaaS prototype designed for creator collaboration and
                  digital portfolio management, focusing on a clean UI/UX.
                </p>
              </ProjectCard>
              <ProjectCard
                title="Diia Project – NITJ Website"
                tech="HTML | Tailwind CSS | JS"
                link="https://nitj.ac.in/diia_U/main/oiia.html"
              >
                <p>
                  Developed the full-stack responsive web portal for the OIIA,
                  NIT Jalandhar. Received a Certificate of Excellence for the
                  work.
                </p>
              </ProjectCard>
            </div>
          </Section>

          {/* --- Technical Skills Section --- */}
          <Section title="Technical Skills" icon={Cpu}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-100 mb-3">
                  Languages & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge>Python</SkillBadge>
                  <SkillBadge>C</SkillBadge>
                  <SkillBadge>JavaScript</SkillBadge>
                  <SkillBadge>TypeScript</SkillBadge>
                  <SkillBadge>Next.js</SkillBadge>
                  <SkillBadge>React.js</SkillBadge>
                  <SkillBadge>Django</SkillBadge>
                  <SkillBadge>FastAPI</SkillBadge>
                  <SkillBadge>Tailwind CSS</SkillBadge>
                  <SkillBadge>HTML/CSS</SkillBadge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 mb-3">
                  AI/ML & LLMs
                </h4>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge>LLaMA 3</SkillBadge>
                  <SkillBadge>LangChain</SkillBadge>
                  <SkillBadge>Hugging Face</SkillBadge>
                  <SkillBadge>TensorFlow</SkillBadge>
                  <SkillBadge>RAG</SkillBadge>
                  <SkillBadge>NLP</SkillBadge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 mb-3">
                  Cloud, DevOps & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge>AWS</SkillBadge>
                  <SkillBadge>Google Cloud</SkillBadge>
                  <SkillBadge>Vercel</SkillBadge>
                  <SkillBadge>Netlify</SkillBadge>
                  <SkillBadge>Cloudflare</SkillBadge>
                  <SkillBadge>Git/GitHub</SkillBadge>
                  <SkillBadge>Postman</SkillBadge>
                  <SkillBadge>Figma</SkillBadge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 mb-3">
                  E-Commerce & Business
                </h4>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge>Shopify</SkillBadge>
                  <SkillBadge>GST Filing</SkillBadge>
                  <SkillBadge>Razorpay</SkillBadge>
                  <SkillBadge>Zapier</SkillBadge>
                  <SkillBadge>Meta Ads</SkillBadge>
                  <SkillBadge>DNS/SSL Setup</SkillBadge>
                </div>
              </div>
            </div>
          </Section>

          {/* --- Education Section --- */}
          <Section title="Education" icon={GraduationCap}>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-100">
                  B.Tech, Chemical Engineering
                </h3>
                <p className="text-slate-400">
                  Dr. B. R. Ambedkar NIT Jalandhar | 2022 – 2026
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">
                  Class 12 (Non-Medical)
                </h3>
                <p className="text-slate-400">
                  Dasmesh Public School, Mukerian | 80.4%
                </p>
              </div>
            </div>
          </Section>

          {/* --- Achievements & Certs Section --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Section title="Achievements" icon={Award}>
              <ul className="list-disc list-outside ml-5 space-y-2">
                <li>Certificate of Excellence (OIIA, NIT Jalandhar, 2024)</li>
                <li>11K+ Product Procurement (Growwithgarry Operations)</li>
                <li>Secured GST & IEC Registration for Business</li>
              </ul>
            </Section>

            <Section title="Certifications" icon={Star}>
              <ul className="list-disc list-outside ml-5 space-y-2">
                <li>Oracle Cloud Infrastructure AI Foundations Associate</li>
                <li>Essential React Training</li>
                <li>Diia Internship Certificate (NIT Jalandhar)</li>
              </ul>
            </Section>
          </div>
        </main>

        {/* --- Footer --- */}
        <footer className="text-center mt-16 pt-8 border-t border-slate-700/50">
          <p className="text-sm text-slate-500">
            Last Updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            © {new Date().getFullYear()} Ashutosh Devgotra. Built with Next.js &
            Tailwind CSS.
          </p>
        </footer>
      </div>
    </div>
  );
}


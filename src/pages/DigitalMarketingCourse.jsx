import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, BarChart2, Users, Calendar, Award, Brain, Megaphone, Folder, Briefcase, Target, BookOpen, Globe, Mail, ArrowUpRight, Search, Layout, MessageSquare, Cpu, CheckCircle } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import { USER_APP_URL } from '../utils/apiClient';

// Hero Image
import heroImg from '../assets/digital_marketing_hero.webp';

// Tool Logos
import googleAdsLogo from '../assets/google_ads_logo.svg';
import googleAnalyticsLogo from '../assets/google_analytics_logo.svg';
import metaAdsLogo from '../assets/meta_logo.webp'; // Using existing meta.webp as it's the same logo
import linkedinLogo from '../assets/linkedin_logo.svg';
import mailchimpLogo from '../assets/mailchimp.webp';
import canvaLogo from '../assets/canva.svg';

// Company Logos (Reusing existing ones)
import googleLogo from '../assets/google_logo.svg';
import microsoftLogo from '../assets/microsoft_logo.svg';
import awsLogo from '../assets/aws_logo.svg';
import ibmLogo from '../assets/ibm_logo.svg';
import metaLogo from '../assets/meta_logo.webp';
import netflixLogo from '../assets/netflix_logo.svg';
import infosysLogo from '../assets/infosys_logo.svg';
import accentureLogo from '../assets/accenture_logo.svg';

const Section = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const DigitalMarketingCourse = () => {
  useEffect(() => {
    document.title = "Online Digital Marketing Course with Certificate | Aindhin";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Become a job-ready digital marketer with hands-on training in SEO, Google Ads, Analytics, AI Marketing, and real-world projects.");
    }
  }, []);

  const [activeModule, setActiveModule] = useState(0);

  return (
    <div className="dm-course font-sans text-slate-900 bg-blue-50 w-full">
      <style>{`
            /* ===== DIGITAL MARKETING COURSE PAGE (scoped) ===== */
            .dm-course{
              font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
              color:#0f172a;
              background:#e0f2fe;
              width:100%;
            }
            .dm-course *{box-sizing:border-box;}
            
            /* HERO */
            .dm-hero{
              color:#fff;
              background:
                linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)),
                url("${heroImg}")
                center/cover no-repeat;
              padding:70px 20px;
              display:flex;
              align-items:center;
              justify-content:center;
            }
            .dm-hero-content{
              max-width:900px;
              text-align:left;
            }
            .dm-badge{
              display:inline-block;
              padding:4px 12px;
              border-radius:999px;
              background:rgba(15,23,42,.7);
              border:1px solid rgba(248,250,252,.4);
              font-size:12px;
              letter-spacing:.08em;
              text-transform:uppercase;
              margin-bottom:10px;
            }
            .fs-hero-title{
              color:#fff;
              font-size:64px;
              line-height:1.1;
              margin:0 0 14px;
            }
            .fs-hero-sub{
              font-size:20px;
              max-width:720px;
              color:#e5e7eb;
              margin:0 0 16px;
            }
            .dm-hero-meta{
              display:flex;
              flex-wrap:wrap;
              gap:10px 18px;
              font-size:13px;
              color:#e5e7eb;
            }
            .dm-hero-meta span::before{
              content:"• ";
              color:#fde68a;
              font-weight:700;
            }
            
            /* MAIN LAYOUT */
            .dm-main{padding:40px 20px 50px;}
            .dm-main-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,2fr) minmax(0,1.1fr);
              gap:24px;
            }
            .dm-left,.dm-right{
              display:flex;
              flex-direction:column;
              gap:16px;
            }
            
            /* CARDS */
            .dm-card{
              background:#ffffff;
              border-radius:18px;
              padding:20px 22px;
              box-shadow:0 10px 25px rgba(15,23,42,.08);
            }
            .dm-card h2{
              font-size:18px;
              margin:0 0 10px;
              color:#1d4ed8;
            }
            .dm-about-text{
              font-size:14px;
              color:#4b5563;
              line-height:1.6;
            }
            
            /* SYLLABUS */
            .dm-module{
              border:1px solid #e5e7eb;
              border-radius:12px;
              background:#f9fafb;
              margin-top:8px;
              overflow:hidden;
            }
            .dm-module .summary{
              list-style:none;
              padding:10px 14px;
              cursor:pointer;
              display:flex;
              justify-content:space-between;
              align-items:center;
              font-size:14px;
              font-weight:600;
            }
            .dm-module .summary::after{
              content:"▾";
              font-size:12px;
              color:#9ca3af;
              transition:transform .2s;
            }
            .dm-module.open .summary::after{transform:rotate(-180deg);}
            .dm-module-title{
              display:flex;
              gap:8px;
              flex-wrap:wrap;
              align-items:baseline;
            }
            .dm-module-label{
              font-size:11px;
              text-transform:uppercase;
              letter-spacing:.08em;
              color:#111827;   /* dark text */
              font-weight:700; /* bold */
            }
            .dm-module-content{
              padding:0 14px 10px 24px;
              font-size:13px;
              color:#4b5563;
            }
            .dm-module-content ul{
              margin:0;
              padding-left:16px;
            }
            .dm-module-content li{margin-bottom:4px;}
            
            /* RIGHT-COLUMN DETAILS */
            .dm-detail-list{
              list-style:none;
              padding:0;
              margin:0 0 16px;
              font-size:14px;
            }
            .dm-detail-item{
              display:flex;
              gap:10px;
              margin-bottom:10px;
            }
            .dm-detail-icon{
              width:26px;
              height:26px;
              border-radius:999px;
              background:#e0f2fe;
              display:flex;
              align-items:center;
              justify-content:center;
              font-size:13px;
              color:#1d4ed8;
              flex-shrink:0;
            }
            .dm-detail-text strong{
              display:block;
              font-weight:600;
              color:#111827;
            }
            .dm-detail-text span{
              font-size:13px;
              color:#4b5563;
            }
            
            /* CTA BUTTON (BLUE THEME) */
            .dm-cta-btn{
              display:block;
              width:100%;
              border-radius:999px;
              padding:11px 16px;
              border:none;
              text-align:center;
              text-decoration:none;
              background:linear-gradient(135deg,#38bdf8,#6366f1);
              color:#fff !important;
              font-weight:600;
              font-size:15px;
              box-shadow:0 14px 30px rgba(37,99,235,.45);
              transition:transform .15s,box-shadow .15s,filter .15s,color .15s;
            }
            .dm-cta-btn:hover{
              transform:translateY(-1px);
              filter:brightness(1.04);
              box-shadow:0 18px 40px rgba(37,99,235,.6);
              color:#fff !important;
            }
            
            /* TOP COMPANIES */
            .dm-companies{
              background:#e0f2fe;
              padding:40px 20px 40px;
            }
            .dm-companies-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .dm-companies h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .dm-companies p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .dm-logo-row{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:18px;
            }
            .dm-logo-card{
              width:130px;
              height:62px;
              border-radius:14px;
              background:#ffffff;
              display:flex;
              align-items:center;
              justify-content:center;
              box-shadow:0 8px 18px rgba(15,23,42,.08);
              transition:transform .18s,box-shadow .18s;
            }
            .dm-logo-card img{
              max-height:40px;
              max-width:100%;
            }
            .dm-logo-card:hover{
              transform:translateY(-3px);
              box-shadow:0 14px 30px rgba(15,23,42,.16);
            }
            
            /* EXTRA COURSE DETAILS SECTION */
            .dm-highlights{
              background:#e0f2fe;
              padding:10px 20px 50px;
            }
            .dm-highlights-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,1.7fr) minmax(0,1.1fr);
              gap:28px;
              align-items:center;
            }
            .dm-highlights-heading{
              margin-bottom:12px;
            }
            .dm-highlights-heading h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .dm-highlights-heading p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .dm-highlight-grid{
              margin-top:18px;
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:14px;
            }
            .dm-highlight-card{
              background:#ffffff;
              border-radius:16px;
              padding:14px 12px;
              box-shadow:0 10px 24px rgba(15,23,42,.08);
            }
            .dm-highlight-icon{
              width:38px;
              height:38px;
              border-radius:999px;
              background:linear-gradient(135deg,#38bdf8,#6366f1); /* BLUE ICONS */
              display:flex;
              align-items:center;
              justify-content:center;
              color:#fff;
              font-size:20px;
              margin-bottom:8px;
            }
            .dm-highlight-card h3{
              font-size:14px;
              margin:0 0 4px;
              color:#0f172a;
            }
            .dm-highlight-card p{
              font-size:13px;
              margin:0;
              color:#4b5563;
            }
            
            /* representation "image" block */
            .dm-highlights-visual{
              display:flex;
              justify-content:center;
            }
            .dm-dashboard{
              width:100%;
              max-width:340px;
              background:#ffffff;
              border-radius:20px;
              padding:14px 14px 18px;
              box-shadow:0 18px 40px rgba(37,99,235,.35); /* BLUE SHADOW */
            }
            .dm-dashboard-header{
              display:flex;
              justify-content:space-between;
              align-items:center;
              margin-bottom:10px;
              font-size:12px;
              color:#0f172a;
            }
            .dm-dashboard-dots{
              display:flex;
              gap:4px;
            }
            .dm-dashboard-dots span{
              width:7px;
              height:7px;
              border-radius:999px;
              background:#bfdbfe; /* LIGHT BLUE */
            }
            .dm-dashboard-graph{
              display:flex;
              gap:6px;
              align-items:flex-end;
              height:90px;
              margin-bottom:12px;
            }
            .dm-dashboard-bar{
              flex:1;
              border-radius:8px 8px 2px 2px;
              background:linear-gradient(180deg,#38bdf8,#1d4ed8); /* BLUE BARS */
            }
            .dm-dashboard-bar:nth-child(2){height:55%;}
            .dm-dashboard-bar:nth-child(3){height:80%;}
            .dm-dashboard-bar:nth-child(4){height:40%;}
            .dm-dashboard-bar:nth-child(5){height:70%;}
            .dm-dashboard-bar:nth-child(1){height:30%;}
            .dm-dashboard-tags{
              display:flex;
              flex-wrap:wrap;
              gap:6px;
              font-size:11px;
            }
            .dm-dashboard-tags span{
              padding:3px 7px;
              border-radius:999px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            
            /* TOOLS SECTION */
            .dm-tools{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .dm-tools-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .dm-tools-inner h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .dm-tools-inner p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .dm-tools-grid{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:16px;
            }
            .dm-tools-card{
              width:140px;
              height:90px;
              border-radius:16px;
              background:#ffffff;
              box-shadow:0 10px 26px rgba(15,23,42,.12);
              display:flex;
              flex-direction:column;
              align-items:center;
              justify-content:center;
              padding:8px;
            }
            .dm-tools-logo{
              max-height:36px;
              max-width:90px;
              margin-bottom:4px;
            }
            .dm-tools-card span{
              font-size:12px;
              color:#111827;
            }
            
            /* MORE DETAILS SECTION */
            .dm-more{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .dm-more-inner{
              max-width:1160px;
              margin:0 auto;
            }
            .dm-more-header{
              text-align:center;
              margin-bottom:20px;
            }
            .dm-more-header h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .dm-more-header p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .dm-more-grid{
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:18px;
            }
            .dm-more-card{
              background:#ffffff;
              border-radius:18px;
              padding:16px 14px;
              box-shadow:0 12px 30px rgba(15,23,42,.12);
              display:flex;
              flex-direction:column;
              gap:8px;
            }
            .dm-more-top{
              display:flex;
              align-items:flex-start;
              gap:8px;
            }
            .dm-more-icon{
              width:32px;
              height:32px;
              border-radius:999px;
              background:linear-gradient(135deg,#38bdf8,#6366f1); /* BLUE ICONS */
              color:#fff;
              display:flex;
              align-items:center;
              justify-content:center;
              font-size:18px;
            }
            .dm-more-title{
              font-size:15px;
              font-weight:600;
              margin:0;
              color:#0f172a;
            }
            .dm-more-text{
              font-size:13px;
              color:#4b5563;
              margin:0;
            }
            .dm-tool-logos{
              margin-top:12px;
              display:flex;
              flex-wrap:wrap;
              gap:10px;
              align-items:center;
              justify-content:center;
              width:100%;
            }
            .dm-tool-logo{
              max-height:32px;
              width:auto;
              filter:drop-shadow(0 2px 4px rgba(15,23,42,.18));
            }
            .dm-tool-logos img{
              max-height:32px !important;
              width:auto !important;
              object-fit:contain;
            }
            .dm-roles-image{
              margin-top:8px;
              display:flex;
              flex-wrap:wrap;
              gap:6px;
            }
            .dm-role-tag{
              padding:4px 8px;
              border-radius:999px;
              font-size:11px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            .dm-journey{
              margin-top:8px;
              border-left:2px solid #bfdbfe;
              padding-left:10px;
            }
            .dm-journey-step{
              position:relative;
              padding-left:10px;
              margin-bottom:6px;
              font-size:12px;
              color:#4b5563;
            }
            .dm-journey-step::before{
              content:"";
              position:absolute;
              left:-11px;
              top:5px;
              width:8px;
              height:8px;
              border-radius:999px;
              background:#38bdf8;
            }
            
            /* RESPONSIVE */
            @media (max-width:900px){
              .dm-hero{padding:50px 18px;}
              .fs-hero-title{font-size:48px;}
              .dm-main-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .dm-highlights-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .dm-more-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            @media (max-width:640px){
              .dm-hero{padding:38px 16px;}
              .dm-hero-meta{flex-direction:column;}
              .dm-highlight-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            `}</style>

      <div className="dm-course" id="top">

        {/* HERO */}
        <Section className="dm-hero dm-section">
          <div className="flex flex-col md:flex-row justify-between items-start max-w-[1200px] mx-auto w-full gap-8">
            <div className="dm-hero-content">
              <span className="dm-badge">Online Digital Marketing Certificate Course</span>
              <h1 className="fs-hero-title">
                Become a Job-Ready Digital Marketer with Industry-Relevant Skills
              </h1>
              <p className="fs-hero-sub">
                Master SEO, Google Ads, Social Media Marketing, AI-Powered Marketing, Content Strategy, Email Marketing, Analytics, and Marketing Automation through a structured online learning experience.
              </p>
              <div className="dm-hero-meta">
                <span>Learn SEO, AI-Powered Marketing, Google Ads &amp; Social Media Marketing</span>
                <span>Hands-On Training with Modern AI Marketing Tools</span>
                <span>Develop a Portfolio Through Hands-On Campaign Projects</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto mt-6 md:mt-12">
              <a 
                  href={`${USER_APP_URL}/signin`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300 font-inter text-lg w-full md:w-auto animate-color-blink"
              >
                  Enroll Now <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </Section>

        {/* MAIN CONTENT */}
        <main className="dm-main dm-section">
          <div className="dm-main-inner">

            {/* Left side */}
            <div className="dm-left">

              {/* About */}
              <Section className="dm-card">
                <h2>Build Future-Ready Digital Marketing Skills</h2>
                <div className="dm-about-text">
                  <p className="mb-4">
                    Digital marketing is one of the most valuable skills in today's business environment. Businesses rely on search engines, social media, paid advertising, content marketing, and data analytics to attract customers and drive growth. As AI-powered search experiences continue to evolve, marketers need practical skills that go beyond traditional marketing concepts.
                  </p>
                  <p className="mb-4">
                    The Aindhin Online Digital Marketing Certificate Course is designed to help learners build industry-relevant expertise through structured online training. Over 10 weeks, you'll gain hands-on experience in SEO, AEO, GEO, XEO, Google Ads, Social Media Marketing, Email Marketing, Analytics, Marketing Automation, and AI-powered marketing workflows used by modern businesses.
                  </p>
                  <p>
                    Through interactive learning, practical assignments, and real-world marketing scenarios, you'll gain the ability to create, manage, and improve digital marketing campaigns across multiple platforms.
                  </p>
                </div>
              </Section>

              {/* Syllabus */}
              <Section className="dm-card">
                <h2>Syllabus Covered</h2>

                <div className="flex flex-col gap-4">
                  {[
                    {
                      icon: <Target className="w-5 h-5 text-blue-600" />,
                      label: "Module 1",
                      title: "Digital Marketing Fundamentals",
                      content: (
                        <ul>
                          <li>Understand the digital marketing ecosystem, customer journey, and buyer personas</li>
                          <li>Identify marketing funnels & customer acquisition pathways</li>
                          <li>Analyze competitor strategies and define brand positioning</li>
                          <li>Learn the fundamentals of core digital marketing strategies</li>
                        </ul>
                      )
                    },
                    {
                      icon: <Layout className="w-5 h-5 text-blue-600" />,
                      label: "Module 2",
                      title: "Website, Landing Pages & Conversion Optimization",
                      content: (
                        <ul>
                          <li>Understand website structure and planning layout</li>
                          <li>Create high-converting landing pages and craft compelling calls-to-action (CTAs)</li>
                          <li>Apply user experience (UX) and lead generation strategies</li>
                          <li>Implement conversion rate optimization (CRO) techniques</li>
                          <li>Follow website performance & optimization best practices</li>
                        </ul>
                      )
                    },
                    {
                      icon: <Search className="w-5 h-5 text-blue-600" />,
                      label: "Module 3",
                      title: "Modern Search Optimization (SEO, AEO, GEO & XEO)",
                      content: (
                        <ul>
                          <li>Master keyword research and search intent analysis</li>
                          <li>Implement traditional Search Engine Optimization (SEO) strategies</li>
                          <li>Master Answer Engine Optimization (AEO) for AI assistants & voice search</li>
                          <li>Apply Generative Engine Optimization (GEO) concepts for AI search results (SGE)</li>
                          <li>Develop Search Experience Optimization (XEO) across platforms</li>
                        </ul>
                      )
                    },
                    {
                      icon: <MessageSquare className="w-5 h-5 text-blue-600" />,
                      label: "Module 4",
                      title: "Content Marketing & Social Media Marketing",
                      content: (
                        <ul>
                          <li>Develop skills in content planning, creation, and distribution strategies</li>
                          <li>Learn content writing, blogging, and general content strategy</li>
                          <li>Plan organic social media campaigns and audience engagement</li>
                          <li>Apply brand positioning, content distribution, and community building</li>
                          <li>Manage content scheduling and tracking toolsets</li>
                        </ul>
                      )
                    },
                    {
                      icon: <Megaphone className="w-5 h-5 text-blue-600" />,
                      label: "Module 5",
                      title: "Google Ads & Performance Marketing",
                      content: (
                        <ul>
                          <li>Create and optimize paid search, display, and video advertising campaigns</li>
                          <li>Master audience targeting, segments, and budget management</li>
                          <li>Set up conversion tracking and execute campaign analysis</li>
                          <li>Implement retargeting, remarketing campaigns & bidding strategies</li>
                          <li>Measure key metrics: CPC, CTR, CPA, and ROAS</li>
                        </ul>
                      )
                    },
                    {
                      icon: <Mail className="w-5 h-5 text-blue-600" />,
                      label: "Module 6",
                      title: "Email Marketing & Marketing Automation",
                      content: (
                        <ul>
                          <li>Design and run effective email marketing campaigns</li>
                          <li>Understand list building, lead nurturing, and audience segmentation</li>
                          <li>Implement email marketing automation workflows & triggers</li>
                          <li>Deliver personalized communication and customer retention techniques</li>
                          <li>Analyze email metrics: open rates, CTR, and list growth</li>
                        </ul>
                      )
                    },
                    {
                      icon: <Cpu className="w-5 h-5 text-blue-600" />,
                      label: "Module 7",
                      title: "Analytics, Reporting & AI-Powered Marketing",
                      content: (
                        <ul>
                          <li>Measure performance using Google Analytics 4 (GA4) and Google Search Console</li>
                          <li>Integrate tracking tags via Google Tag Manager (GTM)</li>
                          <li>Analyze website traffic, user behavior, and campaign reports</li>
                          <li>Build client-ready reporting dashboards and attribution frameworks</li>
                          <li>Leverage AI tools for campaign planning, content creation, and workflow automation</li>
                        </ul>
                      )
                    },
                    {
                      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
                      label: "Module 8",
                      title: "Hands-On Projects & Practical Implementation",
                      content: (
                        <ul>
                          <li>Conduct detailed SEO audits and recommend optimizations</li>
                          <li>Execute AEO & GEO optimization strategies on web content</li>
                          <li>Build a multi-channel content strategy plan and content calendar</li>
                          <li>Set up and plan a simulated Google Ads performance campaign</li>
                          <li>Configure an automated email nurturing sequence workflow</li>
                          <li>Compile a complete campaign analytics and performance report</li>
                        </ul>
                      )
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`dm-module ${activeModule === idx ? 'open' : ''}`}
                      onClick={() => setActiveModule(activeModule === idx ? null : idx)}
                    >
                      <div className="summary">
                        <div className="dm-module-title">
                          <span className="mr-2 flex items-center">{item.icon}</span>
                          <span className="dm-module-label">{item.label}</span>
                          <span>{item.title}</span>
                        </div>
                      </div>
                      {activeModule === idx && (
                        <div className="dm-module-content">
                          {item.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>

              {/* Who Is This Course For? */}
              <Section className="dm-card">
                <h2>Who Is This Course For?</h2>
                <p className="mb-4 text-sm text-gray-500">No prior marketing experience is required. This course is suitable for:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {[
                    "Students and graduates",
                    "Working professionals",
                    "Business owners",
                    "Freelancers",
                    "Career changers",
                    "Anyone interested in digital marketing"
                  ].map((role, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-2xl border border-blue-100/60 hover:bg-blue-50 transition-all duration-300">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs shrink-0">
                        <CheckCircle size={14} />
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{role}</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Mentors */}
              <Section className="dm-card">
                <h2>Learn From Industry-Focused Mentors</h2>
                <div className="dm-about-text">
                  <p className="mb-4">
                    The course is guided by experienced digital marketing professionals who understand current industry practices and evolving trends. The curriculum is regularly updated to reflect changes in search behavior, advertising platforms, analytics tools, and AI-driven marketing workflows.
                  </p>
                  <p>
                    The goal is to help learners build practical knowledge that can be applied in real business environments.
                  </p>
                </div>
              </Section>

              {/* Why Choose Aindhin */}
              <Section className="dm-card">
                <h2>Why Choose Aindhin?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[
                    { title: "Structured online learning", desc: "Step-by-step curriculum built for online engagement." },
                    { title: "Beginner-friendly curriculum", desc: "No coding or prior marketing experience required." },
                    { title: "Practical project-based approach", desc: "Apply learning directly through real-world campaign work." },
                    { title: "Modern SEO, AEO & GEO concepts", desc: "Stay ahead with search optimization for AI engines like ChatGPT & Perplexity." },
                    { title: "Exposure to industry-relevant tools", desc: "Gain hands-on familiarity with GA4, Google Ads, Meta Ads & more." },
                    { title: "AI-powered marketing fundamentals", desc: "Learn to use modern AI tools to boost marketing workflows & productivity." },
                    { title: "Live training & campaign practice", desc: "Interact with instructors and get feedback on live campaigns." },
                    { title: "Certificate upon successful completion", desc: "Earn a certificate upon successful completion to boost your resume." }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                      <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* Right side */}
            <aside className="dm-right">
              <Section className="dm-card">
                <h2>Course Details</h2>
                <ul className="dm-detail-list">
                  <li className="dm-detail-item">
                    <div className="dm-detail-icon"><Clock size={20} /></div>
                    <div className="dm-detail-text">
                      <strong>Duration</strong>
                      <span>10 Weeks (60+ hours of live sessions &amp; campaign practice)</span>
                    </div>
                  </li>
                  <li className="dm-detail-item">
                    <div className="dm-detail-icon"><BarChart2 size={20} /></div>
                    <div className="dm-detail-text">
                      <strong>Skill Level</strong>
                      <span>Beginner to Intermediate – no prior marketing required</span>
                    </div>
                  </li>
                  <li className="dm-detail-item">
                    <div className="dm-detail-icon"><Users size={20} /></div>
                    <div className="dm-detail-text">
                      <strong>Includes</strong>
                      <span>Campaign templates, live reviews &amp; interview‑oriented guidance</span>
                    </div>
                  </li>
                  <li className="dm-detail-item">
                    <div className="dm-detail-icon"><Calendar size={20} /></div>
                    <div className="dm-detail-text">
                      <strong>Next Batch</strong>
                      <span>06.06.2026</span>
                    </div>
                  </li>
                  <li className="dm-detail-item">
                    <div className="dm-detail-icon"><Award size={20} /></div>
                    <div className="dm-detail-text">
                      <strong>Certificate</strong>
                      <span>Completion certificate + portfolio of growth campaigns</span>
                    </div>
                  </li>
                </ul>

                <a 
                  href={`${USER_APP_URL}/signin`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="dm-cta-btn"
                >
                  Enroll Now &amp; Start Learning
                </a>
              </Section>
            </aside>

          </div>
        </main>

        {/* TOP COMPANIES */}
        <Section className="dm-companies dm-section">
          <div className="dm-companies-inner">
            <h2>Top Companies Hiring Digital Marketers</h2>
            <p>Digital marketing skills are in demand across product companies, agencies, startups and e‑commerce brands.</p>
            <div className="dm-logo-row">
              <div className="dm-logo-card">
                <img src={googleLogo} alt="Google" />
              </div>
              <div className="dm-logo-card">
                <img src={microsoftLogo} alt="Microsoft" />
              </div>
              <div className="dm-logo-card">
                <img src={awsLogo} alt="AWS" />
              </div>
              <div className="dm-logo-card">
                <img src={ibmLogo} alt="IBM" />
              </div>
              <div className="dm-logo-card">
                <img src={metaLogo} alt="Meta" />
              </div>
              <div className="dm-logo-card">
                <img src={netflixLogo} alt="Netflix" />
              </div>
              <div className="dm-logo-card">
                <img src={infosysLogo} alt="Infosys" />
              </div>
              <div className="dm-logo-card">
                <img src={accentureLogo} alt="Accenture" />
              </div>
            </div>
          </div>
        </Section>

        {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
        <Section className="dm-highlights dm-section">
          <div className="dm-highlights-inner">
            <div>
              <div className="dm-highlights-heading">
                <h2>What You Will Achieve in This Digital Marketing Program</h2>
                <p>Build practical digital marketing skills that help you plan, execute, and measure campaigns across modern marketing channels.</p>
              </div>

              <div className="dm-highlight-grid">
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Globe size={24} /></div>
                  <h3>Search &amp; Visibility Optimization</h3>
                  <p>Learn SEO, AEO, GEO, and XEO strategies to improve visibility across search engines and AI-powered search experiences.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Megaphone size={24} /></div>
                  <h3>Multi-Channel Marketing Skills</h3>
                  <p>Gain hands-on knowledge in content marketing, social media marketing, Google Ads, email marketing, and performance marketing.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><BarChart2 size={24} /></div>
                  <h3>Analytics &amp; Data-Driven Decisions</h3>
                  <p>Use Google Analytics 4, Google Search Console, and reporting tools to track performance and optimize campaigns with confidence.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Cpu size={24} /></div>
                  <h3>AI-Powered Marketing Workflows</h3>
                  <p>Understand how modern marketers use AI tools for research, content creation, campaign planning, automation, and productivity.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Folder size={24} /></div>
                  <h3>Real-World Project Experience</h3>
                  <p>Apply your learning through practical projects including SEO audits, content strategies, paid advertising campaigns, and analytics reporting.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Briefcase size={24} /></div>
                  <h3>Career &amp; Business Readiness</h3>
                  <p>Build a portfolio of work, gain exposure to industry-standard tools, and develop skills valued by businesses, agencies, startups, and entrepreneurs.</p>
                </div>
              </div>
            </div>

            {/* Visual representation */}
            <div className="dm-highlights-visual">
              <div className="dm-dashboard">
                <div className="dm-dashboard-header">
                  <span>Campaign Performance Snapshot</span>
                  <div className="dm-dashboard-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="dm-dashboard-graph">
                  <div className="dm-dashboard-bar"></div>
                  <div className="dm-dashboard-bar"></div>
                  <div className="dm-dashboard-bar"></div>
                  <div className="dm-dashboard-bar"></div>
                  <div className="dm-dashboard-bar"></div>
                </div>
                <div className="dm-dashboard-tags">
                  <span>Impressions</span>
                  <span>Clicks</span>
                  <span>Conversions</span>
                  <span>ROAS</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* TOOLS USED IN THE COURSE (LOGOS) */}
        <Section className="dm-tools dm-section">
          <div className="dm-tools-inner">
            <h2>Tools &amp; Platforms You Will Use</h2>
            <p>Get hands‑on with the most widely used tools in modern digital marketing teams.</p>

            <div className="dm-tools-grid">
              <div className="dm-tools-card">
                <img className="dm-tools-logo" src={googleAdsLogo} alt="Google Ads" />
                <span>Google Ads</span>
              </div>
              <div className="dm-tools-card">
                <img className="dm-tools-logo" src={googleAnalyticsLogo} alt="Google Analytics" />
                <span>Google Analytics 4</span>
              </div>
              <div className="dm-tools-card">
                <img className="dm-tools-logo" src={metaAdsLogo} alt="Meta Ads" />
                <span>Meta (Facebook/Instagram) Ads</span>
              </div>
              <div className="dm-tools-card">
                <img className="dm-tools-logo" src={linkedinLogo} alt="LinkedIn" />
                <span>LinkedIn Campaign Manager</span>
              </div>
              <div className="dm-tools-card">
                <img className="dm-tools-logo" src={mailchimpLogo} alt="Mailchimp" />
                <span>Mailchimp / Email Tools</span>
              </div>
              <div className="dm-tools-card">
                <img className="dm-tools-logo" src={canvaLogo} alt="Canva" />
                <span>Canva (Creatives)</span>
              </div>
            </div>
          </div>
        </Section>

        {/* MORE COURSE DETAILS WITH ICONS + MINI IMAGES */}
        <Section className="dm-more dm-section">
          <div className="dm-more-inner">
            <div className="dm-more-header">
              <h2>Roles &amp; Learning Journey</h2>
              <p>See how this course maps to growth‑focused roles and how your skills evolve over 10 weeks.</p>
            </div>

            <div className="dm-more-grid">
              {/* Card 1: Tools overview */}
              <div className="dm-more-card">
                <div className="dm-more-top">
                  <div className="dm-more-icon"><Briefcase size={20} /></div>
                  <div>
                    <h3 className="dm-more-title">Channel Toolset</h3>
                    <p className="dm-more-text">
                      Use Google Ads, Meta Ads and GA4 together to plan, launch and analyze full‑funnel campaigns.
                    </p>
                  </div>
                </div>
                <div className="dm-tool-logos">
                  <img className="dm-tool-logo" src={googleAdsLogo} alt="Google Ads" />
                  <img className="dm-tool-logo" src={googleAnalyticsLogo} alt="Google Analytics" />
                  <img className="dm-tool-logo" src={metaAdsLogo} alt="Meta" />
                </div>
              </div>

              {/* Card 2: Roles */}
              <div className="dm-more-card">
                <div className="dm-more-top">
                  <div className="dm-more-icon"><Target size={20} /></div>
                  <div>
                    <h3 className="dm-more-title">Career Roles You Can Target</h3>
                    <p className="dm-more-text">
                      Align your projects and portfolio with the titles most commonly used in digital marketing teams.
                    </p>
                  </div>
                </div>
                <div className="dm-roles-image">
                  <span className="dm-role-tag">Digital Marketing Executive</span>
                  <span className="dm-role-tag">Performance Marketing Analyst</span>
                  <span className="dm-role-tag">SEO / SEM Specialist</span>
                  <span className="dm-role-tag">Social Media Marketer</span>
                  <span className="dm-role-tag">Growth Marketer (Entry‑level)</span>
                </div>
              </div>

              {/* Card 3: Journey */}
              <div className="dm-more-card">
                <div className="dm-more-top">
                  <div className="dm-more-icon"><BookOpen size={20} /></div>
                  <div>
                    <h3 className="dm-more-title">Your 10‑Week Learning Journey</h3>
                    <p className="dm-more-text">
                      A step‑by‑step plan that grows your skills from fundamentals to campaign‑ready marketer.
                    </p>
                  </div>
                </div>
                <div className="dm-journey">
                  <div className="dm-journey-step">Weeks 1–2: Fundamentals, funnels &amp; marketing strategy</div>
                  <div className="dm-journey-step">Weeks 3–4: Website, content &amp; SEO basics</div>
                  <div className="dm-journey-step">Weeks 5–7: Paid ads &amp; social media campaigns</div>
                  <div className="dm-journey-step">Weeks 8–10: Email, automation, analytics &amp; capstone growth project</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ SECTION */}
        <FAQSection 
          title="Frequently Asked Questions"
          subtitle="Find answers to some of the most common questions about the course."
          faqs={[
            {
              question: "Is this Digital Marketing Certificate Course suitable for beginners?",
              answer: "Yes. The course is designed for beginners as well as learners who want to strengthen their digital marketing knowledge. No prior marketing experience is required."
            },
            {
              question: "Will I receive an Digital Marketing Certificate after completing the training?",
              answer: "Yes. Participants who successfully complete the program will receive an Aindhin Digital Marketing Certificate."
            },
            {
              question: "What topics are covered in this course?",
              answer: "The curriculum covers landing page designing, SEO, AEO, GEO, XEO, Google Ads, Social Media Marketing, Content Marketing, Email Marketing, Marketing Automation, Analytics, Conversion Optimization, and AI-powered marketing strategies."
            },
            {
              question: "Is this course conducted online?",
              answer: "Yes. This is a structured online digital marketing course delivered through live sessions, practical activities, and guided learning exercises."
            },
            {
              question: "Do I need coding knowledge to get started with digital marketing?",
              answer: "No. Coding knowledge is not required. The course focuses on marketing concepts, tools, strategies, analytics, and practical implementation."
            }
          ]}
        />

      </div>
    </div>
  );
};

export default DigitalMarketingCourse;

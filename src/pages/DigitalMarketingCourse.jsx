import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, BarChart2, Users, Calendar, Award, Brain, Megaphone, Folder, Briefcase, Target, BookOpen, Globe, Mail } from 'lucide-react';

// Hero Image
import heroImg from '../assets/courses/digital-marketing-hero.jpg';

// Tool Logos
import googleAdsLogo from '../assets/courses/logos/google-ads.svg';
import googleAnalyticsLogo from '../assets/courses/logos/google-analytics.png';
import metaAdsLogo from '../assets/courses/logos/meta.png'; // Using existing meta.png as it's the same logo
import linkedinLogo from '../assets/courses/logos/linkedin.png';
import mailchimpLogo from '../assets/courses/logos/mailchimp.png';
import canvaLogo from '../assets/courses/logos/canva.svg';

// Company Logos (Reusing existing ones)
import googleLogo from '../assets/courses/logos/google.svg';
import microsoftLogo from '../assets/courses/logos/microsoft.svg';
import awsLogo from '../assets/courses/logos/aws.svg';
import ibmLogo from '../assets/courses/logos/ibm.svg';
import metaLogo from '../assets/courses/logos/meta.png';
import netflixLogo from '../assets/courses/logos/netflix.svg';
import infosysLogo from '../assets/courses/logos/infosys.svg';
import accentureLogo from '../assets/courses/logos/accenture.svg';

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
    document.title = "Digital Marketing Course: Master Social Media, SEO & Ads | Aindhin";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Scale your brand with our comprehensive Digital Marketing course. Master SEO, Social Media Marketing, and Paid Ads with hands-on growth campaigns.");
    }
  }, []);

  const [activeModule, setActiveModule] = useState(0);

  return (
    <div className="dm-course font-sans text-slate-900 bg-blue-50 w-full overflow-x-hidden">
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
          <div className="dm-hero-content">
            <span className="dm-badge">Digital Marketing</span>
            <h1 className="fs-hero-title">
              Master Digital Marketing: Grow Businesses with Social Media, Ads &amp; SEO
            </h1>
            <p className="fs-hero-sub">
              Learn SEO, paid ads, social media, email and analytics to design and run growth campaigns.
              Build real‑world marketing assets and a portfolio that showcases measurable results.
            </p>
            <div className="dm-hero-meta">
              <span>Covers SEO, SEM, Social, Email &amp; Analytics</span>
              <span>Hands‑on with live tools and sample ad accounts</span>
              <span>Capstone multi‑channel growth campaign</span>
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
                <h2>About This Course</h2>
                <div className="dm-about-text">
                  <p>
                    This course is designed to take you from marketing basics to planning and executing
                    performance‑driven digital campaigns. You’ll learn how different channels work together
                    across the funnel — awareness, acquisition, activation and retention.
                  </p>
                  <p>
                    Through hands‑on projects you will research keywords, create ad sets, design landing pages,
                    write email sequences and track results in analytics dashboards. By the end, you’ll have
                    practical experience running growth campaigns and the confidence to contribute to real
                    marketing teams.
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
                      title: "Marketing Fundamentals & Customer Journey",
                      content: (
                        <ul>
                          <li>Introduction to digital marketing & growth mindset</li>
                          <li>Customer personas, value propositions & funnels</li>
                          <li>Competitive research & positioning</li>
                          <li>Overview of key channels: SEO, SEM, Social, Email</li>
                          <li>Setting measurable goals & KPIs</li>
                        </ul>
                      )
                    },
                    {
                      icon: <Globe className="w-5 h-5 text-blue-600" />,
                      label: "Module 2",
                      title: "Website, Content & SEO Basics",
                      content: (
                        <ul>
                          <li>Landing pages, CTAs and conversion best practices</li>
                          <li>Keyword research & search intent</li>
                          <li>On-page SEO: titles, meta, headings & copy</li>
                          <li>Content planning: blogs, lead magnets & social content</li>
                          <li>Basic technical SEO & site health checks</li>
                        </ul>
                      )
                    },
                    {
                      icon: <Megaphone className="w-5 h-5 text-blue-600" />,
                      label: "Module 3",
                      title: "Paid Ads & Social Media Campaigns",
                      content: (
                        <ul>
                          <li>Google Ads: account structure, campaigns & ad groups</li>
                          <li>Creating search ads, extensions & negative keywords</li>
                          <li>Meta (Facebook/Instagram) ads: audiences & creatives</li>
                          <li>Understanding CPC, CTR, CPA, ROAS & budgets</li>
                          <li>Organic social media planning and content calendars</li>
                        </ul>
                      )
                    },
                    {
                      icon: <Mail className="w-5 h-5 text-blue-600" />,
                      label: "Module 4",
                      title: "Email, Automation & Growth Analytics",
                      content: (
                        <ul>
                          <li>Email marketing fundamentals & list building</li>
                          <li>Segmentation, drip sequences & basic automation</li>
                          <li>Google Analytics 4, UTM tracking & funnel reports</li>
                          <li>Experiment design, A/B testing & optimization loops</li>
                          <li>Capstone: design a full-funnel growth campaign & report</li>
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
                      <span>23 Dec 2025 (new digital marketing batches every month)</span>
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

                <a href="#top" className="dm-cta-btn">Enroll Now &amp; Start Learning</a>
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
                <p>Combine strategy, execution and analytics to drive measurable growth across channels.</p>
              </div>

              <div className="dm-highlight-grid">
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Brain size={24} /></div>
                  <h3>Strategic Foundations</h3>
                  <p>Understand funnels, customer journeys and positioning so every campaign has a clear objective.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Megaphone size={24} /></div>
                  <h3>Channel Execution</h3>
                  <p>Plan and launch campaigns across SEO, search ads, social ads and email using best practices.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><BarChart2 size={24} /></div>
                  <h3>Analytics &amp; Optimization</h3>
                  <p>Track performance in GA4 and ad managers, run A/B tests and iterate based on data, not guesses.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Folder size={24} /></div>
                  <h3>Campaign Portfolio</h3>
                  <p>Graduate with multiple documented campaigns and reports you can show to hiring managers.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Briefcase size={24} /></div>
                  <h3>Tool Confidence</h3>
                  <p>Be comfortable navigating real dashboards in Google Ads, Meta Ads, GA4 and email tools.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Users size={24} /></div>
                  <h3>Mentorship &amp; Feedback</h3>
                  <p>Get critique on your copy, creatives, landing pages and campaign structures from mentors.</p>
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

      </div>
    </div>
  );
};

export default DigitalMarketingCourse;

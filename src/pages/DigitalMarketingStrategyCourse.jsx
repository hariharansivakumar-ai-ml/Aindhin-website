import { Clock, BarChart2, Users, Calendar, Award, Brain, Megaphone, Folder, Briefcase, Target, BookOpen, TrendingUp, Zap } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Hero Image
import heroImg from '../assets/courses/digital-marketing-strategy-hero.jpg';

// Tool Logos
import googleAdsLogo from '../assets/courses/logos/google-ads.svg';
import googleAnalyticsLogo from '../assets/courses/logos/google-analytics.png';
import metaAdsLogo from '../assets/courses/logos/meta.png';
import linkedinLogo from '../assets/courses/logos/linkedin.png';
import mailchimpLogo from '../assets/courses/logos/mailchimp.png';
import canvaLogo from '../assets/courses/logos/canva.svg';

// Company Logos
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

const DigitalMarketingStrategyCourse = () => {
  useEffect(() => {
    document.title = "Digital Marketing Strategy, Ads & Analytics Course | Aindhin";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Master the art of digital growth. Learn advanced strategies in Google Ads, Meta Ads, and Analytics with our expert-led Digital Marketing course.");
    }
  }, []);

  return (
    <div className="dm-course font-sans text-slate-900 bg-blue-50 w-full overflow-x-hidden">
      <style>{`
            /* ===== DIGITAL MARKETING – STRATEGY, ADS & ANALYTICS (scoped) ===== */
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
            .dm-module summary{
              list-style:none;
              padding:10px 14px;
              cursor:pointer;
              display:flex;
              justify-content:space-between;
              align-items:center;
              font-size:14px;
              font-weight:600;
            }
            .dm-module summary::-webkit-details-marker{display:none;}
            .dm-module summary::after{
              content:"▾";
              font-size:12px;
              color:#9ca3af;
              transition:transform .2s;
            }
            .dm-module[open] summary::after{transform:rotate(-180deg);}
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
              background:linear-gradient(135deg,#38bdf8,#6366f1);
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
              box-shadow:0 18px 40px rgba(37,99,235,.35);
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
              background:#bfdbfe;
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
              background:linear-gradient(180deg,#38bdf8,#1d4ed8);
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
              background:linear-gradient(135deg,#38bdf8,#6366f1);
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
            
            /* ENQUIRY / FORM SECTION */
            .dm-enquiry{
              background:linear-gradient(135deg,#dbeafe,#e0f2fe);
              padding:40px 20px 50px;
            }
            .dm-enquiry-inner{
              max-width:900px;
              margin:0 auto;
            }
            .dm-enquiry-card{
              background:#ffffff;
              border-radius:22px;
              padding:24px 22px 18px;
              box-shadow:0 18px 40px rgba(37,99,235,.2);
              border-top:4px solid #38bdf8;
            }
            .dm-enquiry-header{
              display:flex;
              align-items:flex-start;
              gap:10px;
              margin-bottom:10px;
            }
            .dm-enquiry-icon{
              width:32px;
              height:32px;
              border-radius:999px;
              background:radial-gradient(circle at 30% 20%,#38bdf8,#6366f1);
              display:flex;
              align-items:center;
              justify-content:center;
              color:#fff;
              font-size:18px;
            }
            .dm-enquiry-title{
              font-size:18px;
              font-weight:700;
              margin:0;
              color:#0f172a;
            }
            .dm-enquiry-text{
              font-size:14px;
              color:#4b5563;
              margin:2px 0 12px;
            }
            
            /* FADE-IN ON SCROLL */
            .dm-section{
              opacity:0;
              transform:translateY(24px);
              transition:opacity .7s ease-out, transform .7s ease-out;
            }
            .dm-section.dm-visible{
              opacity:1;
              transform:translateY(0);
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
              Master Digital Marketing: Advanced Strategy, Ads &amp; Analytics for Business Growth
            </h1>
            <p className="fs-hero-sub">
              Master the core frameworks, channels and measurement skills needed to plan strategy,
              run paid campaigns and turn marketing data into insights that grow a business.
            </p>
            <div className="dm-hero-meta">
              <span>Strategy + Execution + Analytics in one program</span>
              <span>Hands‑on with Google Ads, Meta Ads &amp; GA4</span>
              <span>Capstone performance marketing case‑study</span>
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
                    This program is focused on the three pillars of modern digital marketing:
                    clear strategy, high‑impact ads and data‑driven analytics. You’ll learn how
                    to design campaigns starting from business goals, select the right channels
                    and budgets, and measure success using the right KPIs.
                  </p>
                  <p>
                    Through guided projects you will research audiences and keywords, build
                    Google &amp; Meta ad campaigns, design reports in GA4, and present your
                    findings as a marketing performance review – just like you would in a real
                    company.
                  </p>
                </div>
              </Section>

              {/* Syllabus */}
              <Section className="dm-card">
                <h2>Syllabus Covered</h2>

                <details className="dm-module" open>
                  <summary>
                    <div className="dm-module-title">
                      <span className="mr-2 flex items-center"><Target className="w-5 h-5 text-blue-600" /></span>
                      <span className="dm-module-label">Module 1</span>
                      <span>Strategy &amp; Planning</span>
                    </div>
                  </summary>
                  <div className="dm-module-content">
                    <ul>
                      <li>Understanding the business model &amp; north‑star metric</li>
                      <li>Customer personas, JTBD (jobs‑to‑be‑done) &amp; journeys</li>
                      <li>Channel selection &amp; media planning</li>
                      <li>Goal setting (OKRs), KPIs &amp; budgeting</li>
                      <li>Campaign briefs &amp; hypothesis‑driven planning</li>
                    </ul>
                  </div>
                </details>

                <details className="dm-module">
                  <summary>
                    <div className="dm-module-title">
                      <span className="mr-2 flex items-center"><Megaphone className="w-5 h-5 text-blue-600" /></span>
                      <span className="dm-module-label">Module 2</span>
                      <span>Search &amp; Social Ads</span>
                    </div>
                  </summary>
                  <div className="dm-module-content">
                    <ul>
                      <li>Google Ads: keyword research &amp; match types</li>
                      <li>Writing high‑intent ad copy &amp; using extensions</li>
                      <li>Meta Ads: audiences, creatives &amp; placements</li>
                      <li>Structuring campaigns for testing &amp; scaling</li>
                      <li>Reading ad dashboards: CTR, CPC, CPA, ROAS</li>
                    </ul>
                  </div>
                </details>

                <details className="dm-module">
                  <summary>
                    <div className="dm-module-title">
                      <span className="mr-2 flex items-center"><BarChart2 className="w-5 h-5 text-blue-600" /></span>
                      <span className="dm-module-label">Module 3</span>
                      <span>Measurement &amp; Analytics</span>
                    </div>
                  </summary>
                  <div className="dm-module-content">
                    <ul>
                      <li>Implementing UTM tags &amp; tracking plans</li>
                      <li>Google Analytics 4: events, conversions &amp; funnels</li>
                      <li>Attribution basics &amp; reading multi‑channel reports</li>
                      <li>Building weekly performance dashboards</li>
                      <li>Turning data into insights &amp; next‑step recommendations</li>
                    </ul>
                  </div>
                </details>

                <details className="dm-module">
                  <summary>
                    <div className="dm-module-title">
                      <span className="mr-2 flex items-center"><TrendingUp className="w-5 h-5 text-blue-600" /></span>
                      <span className="dm-module-label">Module 4</span>
                      <span>Optimization &amp; Capstone Project</span>
                    </div>
                  </summary>
                  <div className="dm-module-content">
                    <ul>
                      <li>A/B testing on ads, landing pages &amp; emails</li>
                      <li>Scaling winners, pausing under‑performers</li>
                      <li>Creating an executive campaign review deck</li>
                      <li>Capstone: full strategy, ads &amp; analytics case‑study</li>
                      <li>Interview prep &amp; how to present your campaigns</li>
                    </ul>
                  </div>
                </details>
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
                      <span>8 Weeks (50+ hours of live strategy, ads &amp; analytics work)</span>
                    </div>
                  </li>
                  <li className="dm-detail-item">
                    <div className="dm-detail-icon"><BarChart2 size={20} /></div>
                    <div className="dm-detail-text">
                      <strong>Skill Level</strong>
                      <span>Beginner to Intermediate – ideal for graduates &amp; junior marketers</span>
                    </div>
                  </li>
                  <li className="dm-detail-item">
                    <div className="dm-detail-icon"><Users size={20} /></div>
                    <div className="dm-detail-text">
                      <strong>Includes</strong>
                      <span>Strategy reviews, ad account walk‑throughs &amp; analytics feedback</span>
                    </div>
                  </li>
                  <li className="dm-detail-item">
                    <div className="dm-detail-icon"><Calendar size={20} /></div>
                    <div className="dm-detail-text">
                      <strong>Next Batch</strong>
                      <span>23 Dec 2025 (new strategy‑focused batches every month)</span>
                    </div>
                  </li>
                  <li className="dm-detail-item">
                    <div className="dm-detail-icon"><Award size={20} /></div>
                    <div className="dm-detail-text">
                      <strong>Certificate</strong>
                      <span>Completion certificate + documented campaign case‑study</span>
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
            <h2>Top Companies Hiring for Performance &amp; Growth Marketing</h2>
            <p>Strategy, ads and analytics skills are used by marketing teams at fast‑growing startups and global brands.</p>
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

        {/* EXTRA DETAILS / REPRESENTATION */}
        <Section className="dm-highlights dm-section">
          <div className="dm-highlights-inner">
            <div>
              <div className="dm-highlights-heading">
                <h2>What You Will Achieve in This Strategy, Ads &amp; Analytics Program</h2>
                <p>Think like a growth marketer, execute like a performance specialist and report like an analyst.</p>
              </div>

              <div className="dm-highlight-grid">
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Brain size={24} /></div>
                  <h3>Strategic Clarity</h3>
                  <p>Always link campaigns back to business goals, segments and the overall growth model.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Megaphone size={24} /></div>
                  <h3>Ad Account Mastery</h3>
                  <p>Confidently structure and optimize search and social accounts for testing and scaling.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><BarChart2 size={24} /></div>
                  <h3>Analytics Fluency</h3>
                  <p>Read GA4 and ad manager reports, build dashboards and know which metrics really matter.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Zap size={24} /></div>
                  <h3>Experimentation Mindset</h3>
                  <p>Design A/B tests, interpret results and roll learnings into the next iteration of your campaigns.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Folder size={24} /></div>
                  <h3>Case‑Study Portfolio</h3>
                  <p>Document your campaigns as case‑studies you can share with hiring managers and clients.</p>
                </div>
                <div className="dm-highlight-card">
                  <div className="dm-highlight-icon"><Users size={24} /></div>
                  <h3>Mentor Feedback</h3>
                  <p>Receive detailed comments on strategy decks, ad setups and analytics reports.</p>
                </div>
              </div>
            </div>

            {/* Visual snapshot */}
            <div className="dm-highlights-visual">
              <div className="dm-dashboard">
                <div className="dm-dashboard-header">
                  <span>Campaign KPI Snapshot</span>
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
                  <span>Spend</span>
                  <span>Clicks</span>
                  <span>Leads</span>
                  <span>CPA</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* TOOLS */}
        <Section className="dm-tools dm-section">
          <div className="dm-tools-inner">
            <h2>Tools &amp; Platforms You Will Use</h2>
            <p>Work inside real dashboards used by marketing teams worldwide.</p>

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

        {/* MORE DETAILS / JOURNEY */}
        <Section className="dm-more dm-section">
          <div className="dm-more-inner">
            <div className="dm-more-header">
              <h2>Roles &amp; Learning Journey</h2>
              <p>See how this course maps to performance and growth marketing roles and how your skills evolve.</p>
            </div>

            <div className="dm-more-grid">
              {/* Card 1: Tools overview */}
              <div className="dm-more-card">
                <div className="dm-more-top">
                  <div className="dm-more-icon"><Briefcase size={20} /></div>
                  <div>
                    <h3 className="dm-more-title">Channel Toolset</h3>
                    <p className="dm-more-text">
                      Use Google Ads, Meta Ads and GA4 together to run measurable, multi‑touch campaigns.
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
                      Align your portfolio with titles used in performance, acquisition and growth marketing teams.
                    </p>
                  </div>
                </div>
                <div className="dm-roles-image">
                  <span className="dm-role-tag">Performance Marketing Executive</span>
                  <span className="dm-role-tag">Growth Marketing Analyst</span>
                  <span className="dm-role-tag">Digital Marketing Specialist</span>
                  <span className="dm-role-tag">Paid Media Analyst</span>
                  <span className="dm-role-tag">Acquisition Marketer</span>
                </div>
              </div>

              {/* Card 3: Journey */}
              <div className="dm-more-card">
                <div className="dm-more-top">
                  <div className="dm-more-icon"><BookOpen size={20} /></div>
                  <div>
                    <h3 className="dm-more-title">Your 8‑Week Learning Journey</h3>
                    <p className="dm-more-text">
                      A structured progression from strategy to ad execution to analytics‑driven optimization.
                    </p>
                  </div>
                </div>
                <div className="dm-journey">
                  <div className="dm-journey-step">Weeks 1–2: Strategy foundations &amp; planning</div>
                  <div className="dm-journey-step">Weeks 3–4: Search &amp; social ad campaign builds</div>
                  <div className="dm-journey-step">Weeks 5–6: Analytics, dashboards &amp; optimization</div>
                  <div className="dm-journey-step">Weeks 7–8: Capstone case‑study &amp; interview prep</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default DigitalMarketingStrategyCourse;

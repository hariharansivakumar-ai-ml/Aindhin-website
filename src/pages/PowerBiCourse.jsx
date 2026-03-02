import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, BarChart2, Users, Calendar, Award, Database, Calculator, LayoutDashboard, Lock, Rocket, Briefcase, Target, BookOpen } from 'lucide-react';

// Hero Image
import heroImg from '../assets/courses/power-bi-hero.webp';

// Tool Logos
import powerBiLogo from '../assets/courses/logos/powerbi.svg';
import excelLogo from '../assets/courses/logos/excel.svg'; // Using the new SVG
import mysqlLogo from '../assets/courses/logos/mysql.svg';
import azureLogo from '../assets/courses/logos/azure.svg';
import pythonLogo from '../assets/courses/logos/python-tool.svg';

// Company Logos
import googleLogo from '../assets/courses/logos/google.svg';
import microsoftLogo from '../assets/courses/logos/microsoft.svg';
import awsLogo from '../assets/courses/logos/aws.svg';
import ibmLogo from '../assets/courses/logos/ibm.svg';
import metaLogo from '../assets/courses/logos/meta.webp';
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

const PowerBiCourse = () => {
  const [activeModule, setActiveModule] = useState(0);

  return (
    <div className="power-bi-course font-sans text-slate-900 bg-blue-50 w-full overflow-x-hidden">
      <style>{`
            /* ===== POWER BI COURSE PAGE (scoped) ===== */
            .power-bi-course{
              font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
              color:#0f172a;
              background:#e0f2fe;
              width:100%;
            }
            .power-bi-course *{box-sizing:border-box;}
            
            /* HERO */
            .pb-hero{
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
            .pb-hero-content{
              max-width:900px;
              text-align:left;
            }
            .pb-badge{
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
            .pb-hero-title{
              color:#fff;
              font-size:64px;
              line-height:1.1;
              margin:0 0 14px;
            }
            .pb-hero-sub{
              font-size:20px;
              max-width:720px;
              color:#e5e7eb;
              margin:0 0 16px;
            }
            .pb-hero-meta{
              display:flex;
              flex-wrap:wrap;
              gap:10px 18px;
              font-size:13px;
              color:#e5e7eb;
            }
            .pb-hero-meta span::before{
              content:"• ";
              color:#fde68a;
              font-weight:700;
            }
            
            /* MAIN LAYOUT */
            .pb-main{padding:40px 20px 50px;}
            .pb-main-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,2fr) minmax(0,1.1fr);
              gap:24px;
            }
            .pb-left,.pb-right{
              display:flex;
              flex-direction:column;
              gap:16px;
            }
            
            /* CARDS */
            .pb-card{
              background:#ffffff;
              border-radius:18px;
              padding:20px 22px;
              box-shadow:0 10px 25px rgba(15,23,42,.08);
            }
            .pb-card h2{
              font-size:18px;
              margin:0 0 10px;
              color:#db2777;
            }
            .pb-about-text{
              font-size:14px;
              color:#4b5563;
              line-height:1.6;
            }
            
            /* SYLLABUS */
            .pb-module{
              border:1px solid #e5e7eb;
              border-radius:12px;
              background:#f9fafb;
              margin-top:8px;
              overflow:hidden;
            }
            .pb-module .summary{
              list-style:none;
              padding:10px 14px;
              cursor:pointer;
              display:flex;
              justify-content:space-between;
              align-items:center;
              font-size:14px;
              font-weight:600;
            }
            .pb-module .summary::after{
              content:"▾";
              font-size:12px;
              color:#9ca3af;
              transition:transform .2s;
            }
            .pb-module.open .summary::after{transform:rotate(-180deg);}
            .pb-module-title{
              display:flex;
              gap:8px;
              flex-wrap:wrap;
              align-items:baseline;
            }
            .pb-module-label{
              font-size:11px;
              text-transform:uppercase;
              letter-spacing:.08em;
              color:#111827;   /* dark text */
              font-weight:700; /* bold */
            }
            .pb-module-content{
              padding:0 14px 10px 24px;
              font-size:13px;
              color:#4b5563;
            }
            .pb-module-content ul{
              margin:0;
              padding-left:16px;
            }
            .pb-module-content li{margin-bottom:4px;}
            
            /* RIGHT-COLUMN DETAILS */
            .pb-detail-list{
              list-style:none;
              padding:0;
              margin:0 0 16px;
              font-size:14px;
            }
            .pb-detail-item{
              display:flex;
              gap:10px;
              margin-bottom:10px;
            }
            .pb-detail-icon{
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
            .pb-detail-text strong{
              display:block;
              font-weight:600;
              color:#111827;
            }
            .pb-detail-text span{
              font-size:13px;
              color:#4b5563;
            }
            
            /* CTA BUTTON */
            .pb-cta-btn{
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
              box-shadow:0 14px 30px rgba(37,99,235,.4);
              transition:transform .15s,box-shadow .15s,filter .15s,color .15s;
            }
            .pb-cta-btn:hover{
              transform:translateY(-1px);
              filter:brightness(1.04);
              box-shadow:0 18px 40px rgba(37,99,235,.55);
              color:#fff !important;
            }
            
            /* TOP COMPANIES */
            .pb-companies{
              background:#e0f2fe;
              padding:40px 20px 40px;
            }
            .pb-companies-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .pb-companies h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .pb-companies p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .pb-logo-row{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:18px;
            }
            .pb-logo-card{
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
            .pb-logo-card img{
              max-height:40px;
              max-width:100%;
            }
            .pb-logo-card:hover{
              transform:translateY(-3px);
              box-shadow:0 14px 30px rgba(15,23,42,.16);
            }
            
            /* EXTRA COURSE DETAILS SECTION */
            .pb-highlights{
              background:#e0f2fe;
              padding:10px 20px 50px;
            }
            .pb-highlights-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,1.7fr) minmax(0,1.1fr);
              gap:28px;
              align-items:center;
            }
            .pb-highlights-heading{
              margin-bottom:12px;
            }
            .pb-highlights-heading h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .pb-highlights-heading p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .pb-highlight-grid{
              margin-top:18px;
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:14px;
            }
            .pb-highlight-card{
              background:#ffffff;
              border-radius:16px;
              padding:14px 12px;
              box-shadow:0 10px 24px rgba(15,23,42,.08);
            }
            .pb-highlight-icon{
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
            .pb-highlight-card h3{
              font-size:14px;
              margin:0 0 4px;
              color:#0f172a;
            }
            .pb-highlight-card p{
              font-size:13px;
              margin:0;
              color:#4b5563;
            }
            
            /* representation "image" block */
            .pb-highlights-visual{
              display:flex;
              justify-content:center;
            }
            .pb-dashboard{
              width:100%;
              max-width:340px;
              background:#ffffff;
              border-radius:20px;
              padding:14px 14px 18px;
              box-shadow:0 18px 40px rgba(37,99,235,.25);
            }
            .pb-dashboard-header{
              display:flex;
              justify-content:space-between;
              align-items:center;
              margin-bottom:10px;
              font-size:12px;
              color:#0f172a;
            }
            .pb-dashboard-dots{
              display:flex;
              gap:4px;
            }
            .pb-dashboard-dots span{
              width:7px;
              height:7px;
              border-radius:999px;
              background:#e5e7eb;
            }
            .pb-dashboard-graph{
              display:flex;
              gap:6px;
              align-items:flex-end;
              height:90px;
              margin-bottom:12px;
            }
            .pb-dashboard-bar{
              flex:1;
              border-radius:8px 8px 2px 2px;
              background:linear-gradient(180deg,#38bdf8,#1d4ed8);
            }
            .pb-dashboard-bar:nth-child(2){height:55%;}
            .pb-dashboard-bar:nth-child(3){height:80%;}
            .pb-dashboard-bar:nth-child(4){height:40%;}
            .pb-dashboard-bar:nth-child(5){height:70%;}
            .pb-dashboard-bar:nth-child(1){height:30%;}
            .pb-dashboard-tags{
              display:flex;
              flex-wrap:wrap;
              gap:6px;
              font-size:11px;
            }
            .pb-dashboard-tags span{
              padding:3px 7px;
              border-radius:999px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            
            /* TOOLS SECTION */
            .pb-tools{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .pb-tools-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .pb-tools-inner h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .pb-tools-inner p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .pb-tools-grid{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:16px;
            }
            .pb-tools-card{
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
            .pb-tools-logo{
              max-height:36px;
              max-width:90px;
              margin-bottom:4px;
            }
            .pb-tools-card span{
              font-size:12px;
              color:#111827;
            }
            
            /* MORE DETAILS SECTION */
            .pb-more{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .pb-more-inner{
              max-width:1160px;
              margin:0 auto;
            }
            .pb-more-header{
              text-align:center;
              margin-bottom:20px;
            }
            .pb-more-header h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .pb-more-header p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .pb-more-grid{
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:18px;
            }
            .pb-more-card{
              background:#ffffff;
              border-radius:18px;
              padding:16px 14px;
              box-shadow:0 12px 30px rgba(15,23,42,.12);
              display:flex;
              flex-direction:column;
              gap:8px;
            }
            .pb-more-top{
              display:flex;
              align-items:flex-start;
              gap:8px;
            }
            .pb-more-icon{
              width:32px;
              height:32px;
              border-radius:999px;
              background:linear-gradient(135deg,#22c55e,#14b8a6);
              color:#fff;
              display:flex;
              align-items:center;
              justify-content:center;
              font-size:18px;
            }
            .pb-more-title{
              font-size:15px;
              font-weight:600;
              margin:0;
              color:#0f172a;
            }
            .pb-more-text{
              font-size:13px;
              color:#4b5563;
              margin:0;
            }
            .pb-tool-logos{
              margin-top:12px;
              display:flex;
              flex-wrap:wrap;
              gap:10px;
              align-items:center;
              justify-content:center;
              width:100%;
            }
            .pb-tool-logo{
              max-height:32px;
              width:auto;
              filter:drop-shadow(0 2px 4px rgba(15,23,42,.18));
            }
            .pb-tool-logos img{
              max-height:32px !important;
              width:auto !important;
              object-fit:contain;
            }
            .pb-roles-image{
              margin-top:8px;
              display:flex;
              flex-wrap:wrap;
              gap:6px;
            }
            .pb-role-tag{
              padding:4px 8px;
              border-radius:999px;
              font-size:11px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            .pb-journey{
              margin-top:8px;
              border-left:2px solid #bfdbfe;
              padding-left:10px;
            }
            .pb-journey-step{
              position:relative;
              padding-left:10px;
              margin-bottom:6px;
              font-size:12px;
              color:#4b5563;
            }
            .pb-journey-step::before{
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
              .pb-hero{padding:50px 18px;}
              .pb-hero-title{font-size:48px;}
              .pb-main-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .pb-highlights-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .pb-more-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            @media (max-width:640px){
              .pb-hero{padding:38px 16px;}
              .pb-hero-meta{flex-direction:column;}
              .pb-highlight-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            `}</style>

      <div className="power-bi-course" id="top">

        {/* HERO */}
        <Section className="pb-hero pb-section">
          <div className="pb-hero-content">
            <span className="pb-badge">Power BI</span>
            <h1 className="fs-hero-title">
              Power BI – Data Visualization &amp; Business Intelligence
            </h1>
            <p className="fs-hero-sub">
              Learn to connect, transform and model data in Power BI, build interactive dashboards,
              write DAX measures, and publish BI reports that help teams make faster, better decisions.
            </p>
            <div className="pb-hero-meta">
              <span>End‑to‑end Power BI – Desktop, DAX &amp; Service</span>
              <span>No prior BI experience required (basic Excel helps)</span>
              <span>Capstone project with real‑world business dataset</span>
            </div>
          </div>
        </Section>

        {/* MAIN CONTENT */}
        <main className="pb-main pb-section">
          <div className="pb-main-inner">

            {/* Left side */}
            <div className="pb-left">

              {/* About */}
              <Section className="pb-card">
                <h2>About This Course</h2>
                <div className="pb-about-text">
                  <p>
                    This hands‑on course teaches you how to use Power BI as a full Business Intelligence
                    platform. You’ll learn how to connect to Excel and database sources, clean and shape
                    data with Power Query, design data models, and write DAX to calculate business metrics.
                  </p>
                  <p>
                    You will then create interactive dashboards and reports, apply row‑level security,
                    and publish your work to the Power BI Service so that stakeholders can access fresh,
                    reliable insights on any device.
                  </p>
                </div>
              </Section>

              {/* Syllabus */}
              <Section className="pb-card">
                <h2>Syllabus Covered</h2>

                <div className="flex flex-col gap-4">
                  {[
                    {
                      label: "Module 1",
                      title: "Getting Started with Power BI Desktop",
                      content: (
                        <ul>
                          <li>Power BI ecosystem: Desktop, Service & Mobile</li>
                          <li>Connecting to Excel, CSV and database sources</li>
                          <li>Using Power Query to clean & transform data</li>
                          <li>Creating relationships & star schemas</li>
                          <li>Building your first interactive report</li>
                        </ul>
                      )
                    },
                    {
                      label: "Module 2",
                      title: "Data Modeling & DAX Fundamentals",
                      content: (
                        <ul>
                          <li>Dimension vs fact tables & model design patterns</li>
                          <li>Calculated columns vs measures</li>
                          <li>DAX basics: SUM, COUNTROWS, CALCULATE, FILTER</li>
                          <li>Time-intelligence: YTD, MTD, YoY growth</li>
                          <li>Optimizing models for performance & reuse</li>
                        </ul>
                      )
                    },
                    {
                      label: "Module 3",
                      title: "Visualizations, Dashboards & UX Design",
                      content: (
                        <ul>
                          <li>Choosing the right visuals for different questions</li>
                          <li>Designing layout, navigation & drill-through pages</li>
                          <li>Bookmarks, tooltips, slicers & custom visuals</li>
                          <li>Building executive KPI dashboards</li>
                          <li>Theming, branding & report performance tips</li>
                        </ul>
                      )
                    },
                    {
                      label: "Module 4",
                      title: "Publishing, Security & Power BI Service",
                      content: (
                        <ul>
                          <li>Publishing reports to Power BI Service</li>
                          <li>Workspaces, apps & sharing strategies</li>
                          <li>Refresh schedules & gateway basics</li>
                          <li>Row-level security (RLS) & access control</li>
                          <li>Capstone: end-to-end Power BI BI solution</li>
                        </ul>
                      )
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`pb-module ${activeModule === idx ? 'open' : ''}`}
                      onClick={() => setActiveModule(activeModule === idx ? null : idx)}
                    >
                      <div className="summary">
                        <div className="pb-module-title">
                          <span className="pb-module-label">{item.label}</span>
                          <span>{item.title}</span>
                        </div>
                      </div>
                      {activeModule === idx && (
                        <div className="pb-module-content">
                          {item.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* Right side */}
            <aside className="pb-right">
              <Section className="pb-card">
                <h2>Course Details</h2>
                <ul className="pb-detail-list">
                  <li className="pb-detail-item">
                    <div className="pb-detail-icon"><Clock size={20} /></div>
                    <div className="pb-detail-text">
                      <strong>Duration</strong>
                      <span>8 Weeks (50+ hours of intensive Power BI practice)</span>
                    </div>
                  </li>
                  <li className="pb-detail-item">
                    <div className="pb-detail-icon"><BarChart2 size={20} /></div>
                    <div className="pb-detail-text">
                      <strong>Skill Level</strong>
                      <span>Beginner to Intermediate – basic Excel/SQL is helpful</span>
                    </div>
                  </li>
                  <li className="pb-detail-item">
                    <div className="pb-detail-icon"><Users size={20} /></div>
                    <div className="pb-detail-text">
                      <strong>Includes</strong>
                      <span>Live labs, DAX exercises, dashboard reviews &amp; Q&amp;A sessions</span>
                    </div>
                  </li>
                  <li className="pb-detail-item">
                    <div className="pb-detail-icon"><Calendar size={20} /></div>
                    <div className="pb-detail-text">
                      <strong>Next Batch</strong>
                      <span>23 Dec 2025 (new Power BI batches every month)</span>
                    </div>
                  </li>
                  <li className="pb-detail-item">
                    <div className="pb-detail-icon"><Award size={20} /></div>
                    <div className="pb-detail-text">
                      <strong>Certificate</strong>
                      <span>Completion certificate + production‑style Power BI reports</span>
                    </div>
                  </li>
                </ul>

                <a href="#top" className="pb-cta-btn">Enroll Now &amp; Start Learning</a>
              </Section>
            </aside>

          </div>
        </main>

        {/* TOP COMPANIES */}
        <Section className="pb-companies pb-section">
          <div className="pb-companies-inner">
            <h2>Top Companies Using Power BI for BI &amp; Reporting</h2>
            <p>Power BI is widely adopted across enterprises, startups and consulting firms for self‑service BI.</p>
            <div className="pb-logo-row">
              <div className="pb-logo-card">
                <img src={googleLogo} alt="Google" />
              </div>
              <div className="pb-logo-card">
                <img src={microsoftLogo} alt="Microsoft" />
              </div>
              <div className="pb-logo-card">
                <img src={awsLogo} alt="AWS" />
              </div>
              <div className="pb-logo-card">
                <img src={ibmLogo} alt="IBM" />
              </div>
              <div className="pb-logo-card">
                <img src={metaLogo} alt="Meta" />
              </div>
              <div className="pb-logo-card">
                <img src={netflixLogo} alt="Netflix" />
              </div>
              <div className="pb-logo-card">
                <img src={infosysLogo} alt="Infosys" />
              </div>
              <div className="pb-logo-card">
                <img src={accentureLogo} alt="Accenture" />
              </div>
            </div>
          </div>
        </Section>

        {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
        <Section className="pb-highlights pb-section">
          <div className="pb-highlights-inner">
            <div>
              <div className="pb-highlights-heading">
                <h2>What You Will Achieve in This Power BI Program</h2>
                <p>Go from raw data to enterprise‑grade Power BI dashboards and BI reports.</p>
              </div>

              <div className="pb-highlight-grid">
                <div className="pb-highlight-card">
                  <div className="pb-highlight-icon"><Database size={24} /></div>
                  <h3>Strong Data Modeling Skills</h3>
                  <p>Design robust star‑schema models that perform well on large datasets and evolve with business needs.</p>
                </div>
                <div className="pb-highlight-card">
                  <div className="pb-highlight-icon"><Calculator size={24} /></div>
                  <h3>DAX for Business Metrics</h3>
                  <p>Write DAX measures to calculate KPIs like revenue growth, churn, cohort metrics and more.</p>
                </div>
                <div className="pb-highlight-card">
                  <div className="pb-highlight-icon"><LayoutDashboard size={24} /></div>
                  <h3>Interactive Dashboards</h3>
                  <p>Build pixel‑perfect dashboards with drill‑downs, bookmarks and mobile‑friendly layouts.</p>
                </div>
                <div className="pb-highlight-card">
                  <div className="pb-highlight-icon"><Lock size={24} /></div>
                  <h3>Secure BI Deployments</h3>
                  <p>Configure workspaces, apps, refresh schedules and RLS so your reports stay fresh and secure.</p>
                </div>
                <div className="pb-highlight-card">
                  <div className="pb-highlight-icon"><Rocket size={24} /></div>
                  <h3>Real‑World Capstone</h3>
                  <p>Deliver a complete Power BI solution for a simulated company, from raw CSVs to published app.</p>
                </div>
                <div className="pb-highlight-card">
                  <div className="pb-highlight-icon"><Users size={24} /></div>
                  <h3>Mentor Guidance</h3>
                  <p>Get support on DAX logic, model design and dashboard UX from experienced BI practitioners.</p>
                </div>
              </div>
            </div>

            {/* Visual representation */}
            <div className="pb-highlights-visual">
              <div className="pb-dashboard">
                <div className="pb-dashboard-header">
                  <span>Power BI Sales Overview</span>
                  <div className="pb-dashboard-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="pb-dashboard-graph">
                  <div className="pb-dashboard-bar"></div>
                  <div className="pb-dashboard-bar"></div>
                  <div className="pb-dashboard-bar"></div>
                  <div className="pb-dashboard-bar"></div>
                  <div className="pb-dashboard-bar"></div>
                </div>
                <div className="pb-dashboard-tags">
                  <span>Total Sales</span>
                  <span>Profit Margin</span>
                  <span>Region Performance</span>
                  <span>Top Products</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* TOOLS USED IN THE COURSE (LOGOS) */}
        <Section className="pb-tools pb-section">
          <div className="pb-tools-inner">
            <h2>Tools &amp; Platforms You Will Use</h2>
            <p>Get comfortable with the Power BI ecosystem and common data sources used with it.</p>

            <div className="pb-tools-grid">
              <div className="pb-tools-card">
                <img className="pb-tools-logo" src={powerBiLogo} alt="Power BI" />
                <span>Power BI Desktop / Service</span>
              </div>
              <div className="pb-tools-card">
                <img className="pb-tools-logo" src={excelLogo} alt="Excel" />
                <span>Microsoft Excel</span>
              </div>
              <div className="pb-tools-card">
                <img className="pb-tools-logo" src={mysqlLogo} alt="MySQL" />
                <span>SQL Databases</span>
              </div>
              <div className="pb-tools-card">
                <img className="pb-tools-logo" src={azureLogo} alt="Azure" />
                <span>Azure / Cloud Sources</span>
              </div>
              <div className="pb-tools-card">
                <img className="pb-tools-logo" src={pythonLogo} alt="Python" />
                <span>Python (optional data prep)</span>
              </div>
            </div>
          </div>
        </Section>

        {/* MORE COURSE DETAILS WITH ICONS + MINI IMAGES */}
        <Section className="pb-more pb-section">
          <div className="pb-more-inner">
            <div className="pb-more-header">
              <h2>Roles &amp; Learning Journey</h2>
              <p>See how this course maps directly to common Power BI and BI Analyst job roles.</p>
            </div>

            <div className="pb-more-grid">
              {/* Card 1: Tools overview */}
              <div className="pb-more-card">
                <div className="pb-more-top">
                  <div className="pb-more-icon"><Briefcase size={20} /></div>
                  <div>
                    <h3 className="pb-more-title">Power BI Toolset</h3>
                    <p className="pb-more-text">
                      Use Desktop for modeling and report design, and the Service for sharing, security and refresh orchestration.
                    </p>
                  </div>
                </div>
                <div className="pb-tool-logos">
                  <img className="pb-tool-logo" src={powerBiLogo} alt="Power BI" />
                  <img className="pb-tool-logo" src={excelLogo} alt="Excel" />
                  <img className="pb-tool-logo" src={mysqlLogo} alt="MySQL" />
                </div>
              </div>

              {/* Card 2: Roles */}
              <div className="pb-more-card">
                <div className="pb-more-top">
                  <div className="pb-more-icon"><Target size={20} /></div>
                  <div>
                    <h3 className="pb-more-title">Career Roles You Can Target</h3>
                    <p className="pb-more-text">
                      Align your portfolio and skills with the Power BI‑focused roles recruiters are hiring for today.
                    </p>
                  </div>
                </div>
                <div className="pb-roles-image">
                  <span className="pb-role-tag">Power BI Developer</span>
                  <span className="pb-role-tag">BI Analyst</span>
                  <span className="pb-role-tag">Reporting Analyst</span>
                  <span className="pb-role-tag">Data Analyst (Power BI)</span>
                  <span className="pb-role-tag">Analytics Engineer – BI</span>
                </div>
              </div>

              {/* Card 3: Journey */}
              <div className="pb-more-card">
                <div className="pb-more-top">
                  <div className="pb-more-icon"><BookOpen size={20} /></div>
                  <div>
                    <h3 className="pb-more-title">Your 8‑Week Learning Journey</h3>
                    <p className="pb-more-text">
                      A compact plan that makes you productive in Power BI in just two months.
                    </p>
                  </div>
                </div>
                <div className="pb-journey">
                  <div className="pb-journey-step">Weeks 1–2: Power BI Desktop basics, Power Query &amp; data loading</div>
                  <div className="pb-journey-step">Weeks 3–4: Data modeling best practices &amp; core DAX measures</div>
                  <div className="pb-journey-step">Weeks 5–6: Advanced visuals, interactions &amp; dashboard UX</div>
                  <div className="pb-journey-step">Weeks 7–8: Power BI Service, security, refresh &amp; capstone project</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default PowerBiCourse;

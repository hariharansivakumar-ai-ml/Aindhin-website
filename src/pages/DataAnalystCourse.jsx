import { useEffect, useRef, useState } from 'react';
import {
  Clock, Users, Target, Briefcase, Award,
  BarChart2, Code, Database, Cpu, LayoutDashboard,
  Layers, Map
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Hero Image
import heroImg from '../assets/courses/data-analyst-hero.webp';

// Tool Logos
import pythonLogo from '../assets/courses/logos/python-tool.svg';
import rLogo from '../assets/courses/logos/r-logo.svg';
import rstudioLogo from '../assets/courses/logos/rstudio.svg';
import excelLogo from '../assets/courses/logos/excel.webp';
import powerbiLogo from '../assets/courses/logos/powerbi.svg';
import tableauLogo from '../assets/courses/logos/tableau.webp';
import mysqlLogo from '../assets/courses/logos/mysql.svg';
import jupyterLogo from '../assets/courses/logos/jupyter.svg';
import githubLogo from '../assets/courses/logos/github.svg';

// Company Logos
import microsoftLogo from '../assets/courses/logos/microsoft.svg';
import amazonLogo from '../assets/courses/logos/amazon.svg';
import googleLogo from '../assets/courses/logos/google.svg';
import ibmLogo from '../assets/courses/logos/ibm.svg';
import accentureLogo from '../assets/courses/logos/accenture.svg';
import tcsLogo from '../assets/courses/logos/tcs.svg';
import deloitteLogo from '../assets/courses/logos/deloitte.svg';
import eyLogo from '../assets/courses/logos/ey.svg';

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

const DataAnalystCourse = () => {
  useEffect(() => {
    document.title = "Data Analyst Course: Master Data Analytics & Business Intelligence | Aindhin";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
    }
  }, []);

  const [openModuleIndex, setOpenModuleIndex] = useState(0);

  const handleToggle = (index, e) => {
    e.preventDefault();
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  return (
    <div className="fs-course font-sans text-slate-900 bg-blue-50 w-full overflow-x-hidden">
      <style>{`
            /* ===== DATA ANALYTICS COURSE PAGE (scoped) ===== */
            .fs-course{
              font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
              color:#0f172a;
              background:#e0f2fe;
              width:100%;
            }
            .fs-course *{box-sizing:border-box;}

            /* HERO */
            .fs-hero{
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
            .fs-hero-content{
              max-width:900px;
              text-align:left;
            }
            .fs-badge{
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
            .fs-hero-meta{
              display:flex;
              flex-wrap:wrap;
              gap:10px 18px;
              font-size:13px;
              color:#e5e7eb;
            }
            .fs-hero-meta span::before{
              content:"• ";
              color:#fde68a;
              font-weight:700;
            }
            
            /* MAIN LAYOUT */
            .fs-main{padding:40px 20px 50px;}
            .fs-main-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,2fr) minmax(0,1.1fr);
              gap:24px;
            }
            .fs-left,.fs-right{
              display:flex;
              flex-direction:column;
              gap:16px;
            }
            
            /* CARDS */
            .fs-card{
              background:#ffffff;
              border-radius:18px;
              padding:20px 22px;
              box-shadow:0 10px 25px rgba(15,23,42,.08);
            }
            .fs-card h2{
              font-size:18px;
              margin:0 0 10px;
              color:#1d4ed8;
            }
            .fs-about-text{
              font-size:14px;
              color:#4b5563;
              line-height:1.6;
            }
            
            /* SYLLABUS */
            .fs-module{
              border:1px solid #e5e7eb;
              border-radius:12px;
              background:#f9fafb;
              margin-top:8px;
              overflow:hidden;
            }
            .fs-module summary{
              list-style:none;
              padding:10px 14px;
              cursor:pointer;
              display:flex;
              justify-content:space-between;
              align-items:center;
              font-size:14px;
              font-weight:600;
            }
            .fs-module summary::-webkit-details-marker{display:none;}
            .fs-module summary::after{
              content:"▾";
              font-size:12px;
              color:#9ca3af;
              transition:transform .2s;
            }
            .fs-module[open] summary::after{transform:rotate(-180deg);}
            .fs-module-title{
              display:flex;
              gap:8px;
              flex-wrap:wrap;
              align-items:baseline;
            }
            .fs-module-label{
              font-size:11px;
              text-transform:uppercase;
              letter-spacing:.08em;
              color:#0f172a;
              font-weight:700; /* Module 1 / 2 / 3 / Projects bold */
            }
            .fs-module-content{
              padding:0 14px 10px 24px;
              font-size:13px;
              color:#4b5563;
            }
            .fs-module-content ul{
              margin:0;
              padding-left:16px;
            }
            .fs-module-content li{margin-bottom:4px;}
            
            /* RIGHT-COLUMN DETAILS */
            .fs-detail-list{
              list-style:none;
              padding:0;
              margin:0 0 16px;
              font-size:14px;
            }
            .fs-detail-item{
              display:flex;
              gap:10px;
              margin-bottom:10px;
            }
            .fs-detail-icon{
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
            .fs-detail-text strong{
              display:block;
              font-weight:600;
              color:#111827;
            }
            .fs-detail-text span{
              font-size:13px;
              color:#4b5563;
            }
            
            /* CTA BUTTON (BLUE THEME) */
            .fs-cta-btn{
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
            .fs-cta-btn:hover{
              transform:translateY(-1px);
              filter:brightness(1.04);
              box-shadow:0 18px 40px rgba(37,99,235,.6);
              color:#fff !important;
            }
            
            /* TOP SECTORS / ORGANISATIONS */
            .fs-companies{
              background:#e0f2fe;
              padding:40px 20px 40px;
            }
            .fs-companies-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .fs-companies h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .fs-companies p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .fs-logo-row{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:18px;
            }
            .fs-logo-card{
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
            .fs-logo-card img{
              max-height:40px;
              max-width:100%;
            }
            .fs-logo-card:hover{
              transform:translateY(-3px);
              box-shadow:0 14px 30px rgba(15,23,42,.16);
            }
            
            /* EXTRA COURSE DETAILS SECTION */
            .fs-highlights{
              background:#e0f2fe;
              padding:10px 20px 50px;
            }
            .fs-highlights-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,1.7fr) minmax(0,1.1fr);
              gap:28px;
              align-items:center;
            }
            .fs-highlights-heading{
              margin-bottom:12px;
            }
            .fs-highlights-heading h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .fs-highlights-heading p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .fs-highlight-grid{
              margin-top:18px;
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:14px;
            }
            .fs-highlight-card{
              background:#ffffff;
              border-radius:16px;
              padding:14px 12px;
              box-shadow:0 10px 24px rgba(15,23,42,.08);
            }
            .fs-highlight-icon{
              width:38px;
              height:38px;
              border-radius:999px;
              background:linear-gradient(135deg,#38bdf8,#6366f1);
              display:flex;
              align-items:center;
              justify-content:center;
              color:#fff;
              font-size:14px;
              margin-bottom:8px;
            }
            .fs-highlight-card h3{
              font-size:14px;
              margin:0 0 4px;
              color:#0f172a;
            }
            .fs-highlight-card p{
              font-size:13px;
              margin:0;
              color:#4b5563;
            }
            
            /* representation "image" block */
            .fs-highlights-visual{
              display:flex;
              justify-content:center;
            }
            .fs-dashboard{
              width:100%;
              max-width:340px;
              background:#ffffff;
              border-radius:20px;
              padding:14px 14px 18px;
              box-shadow:0 18px 40px rgba(37,99,235,.35);
            }
            .fs-dashboard-header{
              display:flex;
              justify-content:space-between;
              align-items:center;
              margin-bottom:10px;
              font-size:12px;
              color:#0f172a;
            }
            .fs-dashboard-dots{
              display:flex;
              gap:4px;
            }
            .fs-dashboard-dots span{
              width:7px;
              height:7px;
              border-radius:999px;
              background:#bfdbfe;
            }
            .fs-dashboard-graph{
              display:flex;
              gap:6px;
              align-items:flex-end;
              height:90px;
              margin-bottom:12px;
            }
            .fs-dashboard-bar{
              flex:1;
              border-radius:8px 8px 2px 2px;
              background:linear-gradient(180deg,#38bdf8,#1d4ed8);
            }
            .fs-dashboard-bar:nth-child(2){height:55%;}
            .fs-dashboard-bar:nth-child(3){height:80%;}
            .fs-dashboard-bar:nth-child(4){height:40%;}
            .fs-dashboard-bar:nth-child(5){height:70%;}
            .fs-dashboard-bar:nth-child(1){height:30%;}
            .fs-dashboard-tags{
              display:flex;
              flex-wrap:wrap;
              gap:6px;
              font-size:11px;
            }
            .fs-dashboard-tags span{
              padding:3px 7px;
              border-radius:999px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            
            /* TOOLS SECTION */
            .fs-tools{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .fs-tools-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .fs-tools-inner h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .fs-tools-inner p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .fs-tools-grid{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:16px;
            }
            .fs-tools-card{
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
            .fs-tools-logo{
              max-height:36px;
              max-width:90px;
              margin-bottom:4px;
            }
            .fs-tools-card span{
              font-size:12px;
              color:#111827;
            }
            
            /* MORE DETAILS SECTION */
            .fs-more{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .fs-more-inner{
              max-width:1160px;
              margin:0 auto;
            }
            .fs-more-header{
              text-align:center;
              margin-bottom:20px;
            }
            .fs-more-header h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .fs-more-header p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .fs-more-grid{
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:18px;
            }
            .fs-more-card{
              background:#ffffff;
              border-radius:18px;
              padding:16px 14px;
              box-shadow:0 12px 30px rgba(15,23,42,.12);
              display:flex;
              flex-direction:column;
              gap:8px;
            }
            .fs-more-top{
              display:flex;
              align-items:flex-start;
              gap:8px;
            }
            .fs-more-icon{
              width:32px;
              height:32px;
              border-radius:999px;
              background:linear-gradient(135deg,#38bdf8,#6366f1);
              color:#fff;
              display:flex;
              align-items:center;
              justify-content:center;
              font-size:16px;
            }
            .fs-more-title{
              font-size:15px;
              font-weight:600;
              margin:0;
              color:#0f172a;
            }
            .fs-more-text{
              font-size:13px;
              color:#4b5563;
              margin:0;
            }
            .fs-tool-logos{
              margin-top:12px;
              display:flex;
              flex-wrap:wrap;
              gap:10px;
              align-items:center;
              justify-content:center;
              width:100%;
            }
            .fs-tool-logo{
              max-height:32px;
              width:auto;
              filter:drop-shadow(0 2px 4px rgba(15,23,42,.18));
            }
            .fs-tool-logos img{
              max-height:32px !important;
              width:auto !important;
              object-fit:contain;
            }
            .fs-roles-image{
              margin-top:8px;
              display:flex;
              flex-wrap:wrap;
              gap:6px;
            }
            .fs-role-tag{
              padding:4px 8px;
              border-radius:999px;
              font-size:11px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            .fs-journey{
              margin-top:8px;
              border-left:2px solid #bfdbfe;
              padding-left:10px;
            }
            .fs-journey-step{
              position:relative;
              padding-left:10px;
              margin-bottom:6px;
              font-size:12px;
              color:#4b5563;
            }
            .fs-journey-step::before{
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
              .fs-hero{padding:50px 18px;}
              .fs-hero-title{font-size:48px;}
              .fs-main-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .fs-highlights-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .fs-more-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            @media (max-width:640px){
              .fs-hero{padding:38px 16px;}
              .fs-hero-meta{flex-direction:column;}
              .fs-highlight-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            `}</style>

      <div className="fs-course" id="top">

        {/* HERO */}
        <Section className="fs-hero fs-section">
          <div className="fs-hero-content">
            <span className="fs-badge">Data Analytics Course</span>
            <h1 className="fs-hero-title">
              Become a Data Expert: Master Data Analytics &amp; Business Intelligence
            </h1>
            <p className="fs-hero-sub">
              Gain job‑ready skills in data cleaning, analysis, visualisation and basic machine learning
              using tools like Excel, SQL, Python and BI platforms. Learn how to turn raw data into clear,
              actionable insights.
            </p>
            <div className="fs-hero-meta">
              <span>Key topics: Excel, SQL, Python / R, Statistics, Dashboards, Intro to Machine Learning</span>
              <span>Professional Course · Duration as per institution (often 4–6 months)</span>
              <span>Beginner‑friendly · Ideal for students &amp; working professionals · 4.7 / 5 learner feedback</span>
            </div>
          </div>
        </Section>

        {/* MAIN CONTENT */}
        <main className="fs-main fs-section">
          <div className="fs-main-inner">

            {/* Left side */}
            <div className="fs-left">

              {/* About */}
              <Section className="fs-card">
                <h2>About This Course</h2>
                <div className="fs-about-text">
                  <p>
                    This Data Analytics Course is designed to help you understand the complete analytics
                    workflow – from collecting and cleaning data, to analysing it and presenting insights
                    for business decisions. You start with the basics of spreadsheets, statistics, SQL and
                    Python / R, and progressively move into visualisation and machine learning.
                  </p>
                  <p>
                    The course is highly practical, with labs, case studies and project work. You will work
                    with real‑world datasets, build dashboards, run analyses and explain your findings in a
                    clear, business‑friendly way. By the end, you’ll be ready for entry‑level data analytics,
                    BI and reporting roles, or to strengthen your profile in your current job.
                  </p>
                </div>
              </Section>

              {/* Syllabus */}
              <Section className="fs-card">
                <h2>Syllabus Overview</h2>

                <details className="fs-module" open={openModuleIndex === 0}>
                  <summary onClick={(e) => handleToggle(0, e)}>
                    <div className="fs-module-title">
                      <span className="fs-module-label">Module 1</span>
                      <span>Foundations: Excel, SQL &amp; Basic Statistics</span>
                    </div>
                  </summary>
                  <div className="fs-module-content">
                    <ul>
                      <li>Introduction to Data &amp; Analytics – lifecycle, roles and use cases</li>
                      <li>Excel for Data Analysis – formulas, pivot tables, charts</li>
                      <li>Descriptive Statistics – mean, median, variation, correlation</li>
                      <li>Database Concepts &amp; SQL Basics (SELECT, FILTER, JOIN, GROUP BY)</li>
                      <li>Working with CSV / Excel files &amp; simple data cleaning</li>
                      <li>Communicating insights with basic reports &amp; charts</li>
                    </ul>
                  </div>
                </details>

                <details className="fs-module" open={openModuleIndex === 1}>
                  <summary onClick={(e) => handleToggle(1, e)}>
                    <div className="fs-module-title">
                      <span className="fs-module-label">Module 2</span>
                      <span>Python / R, EDA &amp; Visualisation</span>
                    </div>
                  </summary>
                  <div className="fs-module-content">
                    <ul>
                      <li>Introduction to Python / R for Data Analysis</li>
                      <li>Data Wrangling – importing, cleaning &amp; transforming data</li>
                      <li>Exploratory Data Analysis (EDA) – patterns, outliers &amp; distributions</li>
                      <li>Data Visualisation – bar, line, scatter, box plots &amp; custom charts</li>
                      <li>Building Interactive Dashboards (Power BI / Tableau basics)</li>
                      <li>Mini‑project: Analyse and present insights from a real‑world dataset</li>
                    </ul>
                  </div>
                </details>

                <details className="fs-module" open={openModuleIndex === 2}>
                  <summary onClick={(e) => handleToggle(2, e)}>
                    <div className="fs-module-title">
                      <span className="fs-module-label">Module 3</span>
                      <span>Intro to Machine Learning &amp; Applied Analytics</span>
                    </div>
                  </summary>
                  <div className="fs-module-content">
                    <ul>
                      <li>Probability &amp; Inferential Statistics (confidence intervals, hypothesis tests)</li>
                      <li>Machine Learning Basics – regression &amp; classification concepts</li>
                      <li>Building &amp; Evaluating Simple ML Models</li>
                      <li>Case Studies in Marketing, Finance or Operations Analytics</li>
                      <li>Data Storytelling – structuring presentations for stakeholders</li>
                      <li>Best Practices: Ethics, privacy &amp; working with real‑world data</li>
                    </ul>
                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                      *Exact modules and tools may vary as per institution and delivery format.
                    </p>
                  </div>
                </details>

                <details className="fs-module" open={openModuleIndex === 3}>
                  <summary onClick={(e) => handleToggle(3, e)}>
                    <div className="fs-module-title">
                      <span className="fs-module-label">Projects</span>
                      <span>Hands‑on Assignments &amp; Capstone</span>
                    </div>
                  </summary>
                  <div className="fs-module-content">
                    <ul>
                      <li>Regular lab‑based assignments in Excel, SQL and Python / R</li>
                      <li>End‑to‑end EDA &amp; dashboard mini‑projects</li>
                      <li>Domain‑based analytics case studies (e.g. sales, churn, HR)</li>
                      <li>Capstone project where you pick a dataset, analyse it and present findings</li>
                      <li>Portfolio preparation – GitHub / online profile with your project work</li>
                    </ul>
                  </div>
                </details>
              </Section>
            </div>

            {/* Right side */}
            <aside className="fs-right">
              <Section className="fs-card">
                <h2>Course Details</h2>
                <ul className="fs-detail-list">
                  <li className="fs-detail-item">
                    <div className="fs-detail-icon"><Clock size={20} /></div>
                    <div className="fs-detail-text">
                      <strong>Course Type &amp; Duration</strong>
                      <span>Data Analytics Course · Duration as per institution (often 4–6 months, classroom / online / blended).</span>
                    </div>
                  </li>
                  <li className="fs-detail-item">
                    <div className="fs-detail-icon"><Users size={20} /></div>
                    <div className="fs-detail-text">
                      <strong>Eligibility</strong>
                      <span>Any graduate / final‑year student / working professional from any stream with basic computer skills. Comfort with mathematics is helpful but not mandatory.</span>
                    </div>
                  </li>
                  <li className="fs-detail-item">
                    <div className="fs-detail-icon"><Target size={20} /></div>
                    <div className="fs-detail-text">
                      <strong>Focus Areas</strong>
                      <span>Excel, SQL, Python / R, statistics, data visualisation, dashboards and introductory machine learning.</span>
                    </div>
                  </li>
                  <li className="fs-detail-item">
                    <div className="fs-detail-icon"><Briefcase size={20} /></div>
                    <div className="fs-detail-text">
                      <strong>Ideal For</strong>
                      <span>Students and professionals who want to start a career in data analytics, BI, reporting or strengthen data skills for their current role.</span>
                    </div>
                  </li>
                  <li className="fs-detail-item">
                    <div className="fs-detail-icon"><Award size={20} /></div>
                    <div className="fs-detail-text">
                      <strong>Learner Feedback</strong>
                      <span>4.7 / 5 average rating (content quality, hands‑on labs, instructor support &amp; career guidance).</span>
                    </div>
                  </li>
                </ul>

                <a href="#top" className="fs-cta-btn">View Course Curriculum &amp; Career Outcomes</a>
              </Section>
            </aside>

          </div>
        </main>

        {/* TOP SECTORS / ORGANISATIONS */}
        <Section className="fs-companies fs-section">
          <div className="fs-companies-inner">
            <h2>Top Sectors Using Data Analytics</h2>
            <p>Analytics skills are in demand across IT services, product companies, consulting, e‑commerce, BFSI and startups.</p>
            <div className="fs-logo-row">
              <div className="fs-logo-card">
                <img src={microsoftLogo} alt="Microsoft" />
              </div>
              <div className="fs-logo-card">
                <img src={amazonLogo} alt="Amazon" />
              </div>
              <div className="fs-logo-card">
                <img src={googleLogo} alt="Google" />
              </div>
              <div className="fs-logo-card">
                <img src={ibmLogo} alt="IBM" />
              </div>
              <div className="fs-logo-card">
                <img src={accentureLogo} alt="Accenture" />
              </div>
              <div className="fs-logo-card">
                <img src={tcsLogo} alt="TCS" />
              </div>
              <div className="fs-logo-card">
                <img src={deloitteLogo} alt="Deloitte" />
              </div>
              <div className="fs-logo-card">
                <img src={eyLogo} alt="EY" />
              </div>
            </div>
          </div>
        </Section>

        {/* EXTRA PROGRAM DETAILS WITH ICONS / REPRESENTATION */}
        <Section className="fs-highlights fs-section">
          <div className="fs-highlights-inner">
            <div>
              <div className="fs-highlights-heading">
                <h2>What You Will Gain from This Data Analytics Course</h2>
                <p>Graduate with a blend of analytical thinking, programming skills and business understanding.</p>
              </div>

              <div className="fs-highlight-grid">
                <div className="fs-highlight-card">
                  <div className="fs-highlight-icon"><BarChart2 size={24} /></div>
                  <h3>Strong Statistical Base</h3>
                  <p>Build a clear understanding of descriptive and inferential statistics for data‑driven decisions.</p>
                </div>
                <div className="fs-highlight-card">
                  <div className="fs-highlight-icon"><Code size={24} /></div>
                  <h3>Programming Confidence</h3>
                  <p>Write clean code in Python / R to manipulate, analyse and visualise real‑world datasets.</p>
                </div>
                <div className="fs-highlight-card">
                  <div className="fs-highlight-icon"><Database size={24} /></div>
                  <h3>Data Management</h3>
                  <p>Work with SQL databases, join tables and design efficient queries for analytics.</p>
                </div>
                <div className="fs-highlight-card">
                  <div className="fs-highlight-icon"><Cpu size={24} /></div>
                  <h3>Machine Learning Basics</h3>
                  <p>Apply basic regression and classification techniques to solve simple business problems.</p>
                </div>
                <div className="fs-highlight-card">
                  <div className="fs-highlight-icon"><LayoutDashboard size={24} /></div>
                  <h3>BI &amp; Dashboards</h3>
                  <p>Create interactive dashboards and automated reports for business stakeholders.</p>
                </div>
                <div className="fs-highlight-card">
                  <div className="fs-highlight-icon"><Briefcase size={24} /></div>
                  <h3>Career Readiness</h3>
                  <p>Develop communication, teamwork and presentation skills for analytics interviews and roles.</p>
                </div>
              </div>
            </div>

            {/* Visual representation */}
            <div className="fs-highlights-visual">
              <div className="fs-dashboard">
                <div className="fs-dashboard-header">
                  <span>Sales &amp; Customer Analytics Dashboard</span>
                  <div className="fs-dashboard-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="fs-dashboard-graph">
                  <div className="fs-dashboard-bar"></div>
                  <div className="fs-dashboard-bar"></div>
                  <div className="fs-dashboard-bar"></div>
                  <div className="fs-dashboard-bar"></div>
                  <div className="fs-dashboard-bar"></div>
                </div>
                <div className="fs-dashboard-tags">
                  <span>Revenue</span>
                  <span>Users</span>
                  <span>Conversion</span>
                  <span>Churn</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* TOOLS USED IN THE COURSE (LOGOS) */}
        <Section className="fs-tools fs-section">
          <div className="fs-tools-inner">
            <h2>Tools &amp; Platforms You May Work With</h2>
            <p>Become hands‑on with the core tools used in analytics, BI and data science teams.</p>

            <div className="fs-tools-grid">
              <div className="fs-tools-card">
                <img className="fs-tools-logo" src={pythonLogo} alt="Python" />
                <span>Python</span>
              </div>
              <div className="fs-tools-card">
                <img className="fs-tools-logo" src={rLogo} alt="R" />
                <span>R (stats &amp; ML)</span>
              </div>
              <div className="fs-tools-card">
                <img className="fs-tools-logo" src={rstudioLogo} alt="RStudio" />
                <span>RStudio / IDEs</span>
              </div>
              <div className="fs-tools-card">
                <img className="fs-tools-logo" src={excelLogo} alt="Excel" />
                <span>MS Excel</span>
              </div>
              <div className="fs-tools-card">
                <img className="fs-tools-logo" src={powerbiLogo} alt="Power BI" />
                <span>Power BI / BI tools</span>
              </div>
              <div className="fs-tools-card">
                <img className="fs-tools-logo" src={tableauLogo} alt="Tableau" />
                <span>Tableau</span>
              </div>
              <div className="fs-tools-card">
                <img className="fs-tools-logo" src={mysqlLogo} alt="MySQL" />
                <span>SQL / MySQL</span>
              </div>
              <div className="fs-tools-card">
                <img className="fs-tools-logo" src={jupyterLogo} alt="Jupyter" />
                <span>Jupyter Notebook</span>
              </div>
              <div className="fs-tools-card">
                <img className="fs-tools-logo" src={githubLogo} alt="GitHub" />
                <span>Git &amp; GitHub</span>
              </div>
            </div>
          </div>
        </Section>

        {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
        <Section className="fs-more fs-section">
          <div className="fs-more-inner">
            <div className="fs-more-header">
              <h2>Careers &amp; Learning Journey</h2>
              <p>See how this Data Analytics Course builds your skills and prepares you for analytics careers.</p>
            </div>

            <div className="fs-more-grid">
              {/* Card 1: Focus overview */}
              <div className="fs-more-card">
                <div className="fs-more-top">
                  <div className="fs-more-icon"><Layers size={20} /></div>
                  <div>
                    <h3 className="fs-more-title">Full‑Stack Analytics Exposure</h3>
                    <p className="fs-more-text">
                      Learn to collect, clean, analyse and present data – moving from raw files to
                      dashboards and simple models that answer business questions.
                    </p>
                  </div>
                </div>
                <div className="fs-tool-logos">
                  <img className="fs-tool-logo" src={pythonLogo} alt="Python" />
                  <img className="fs-tool-logo" src={rLogo} alt="R" />
                  <img className="fs-tool-logo" src={powerbiLogo} alt="Power BI" />
                </div>
              </div>

              {/* Card 2: Roles */}
              <div className="fs-more-card">
                <div className="fs-more-top">
                  <div className="fs-more-icon"><Users size={20} /></div>
                  <div>
                    <h3 className="fs-more-title">Career Roles You Can Target</h3>
                    <p className="fs-more-text">
                      Use your course projects and portfolio to target high‑growth entry‑level analytics roles.
                    </p>
                  </div>
                </div>
                <div className="fs-roles-image">
                  <span className="fs-role-tag">Data Analyst</span>
                  <span className="fs-role-tag">Business Intelligence (BI) Analyst</span>
                  <span className="fs-role-tag">Reporting / MIS Executive</span>
                  <span className="fs-role-tag">Junior Data Scientist</span>
                  <span className="fs-role-tag">Analytics Consultant (Entry‑level)</span>
                  <span className="fs-role-tag">Product / Marketing / Operations Analyst</span>
                </div>
              </div>

              {/* Card 3: Journey */}
              <div className="fs-more-card">
                <div className="fs-more-top">
                  <div className="fs-more-icon"><Map size={20} /></div>
                  <div>
                    <h3 className="fs-more-title">Your Learning Journey</h3>
                    <p className="fs-more-text">
                      A clear, module‑wise path from basics of tools and stats to applied analytics projects.
                    </p>
                  </div>
                </div>
                <div className="fs-journey">
                  <div className="fs-journey-step">Module 1: Foundations in Excel, SQL, basic statistics &amp; understanding data problems.</div>
                  <div className="fs-journey-step">Module 2: Python / R, data cleaning, EDA, visualisation &amp; dashboard creation.</div>
                  <div className="fs-journey-step">Module 3: Intro ML, domain case studies, capstone project &amp; portfolio building.</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default DataAnalystCourse;

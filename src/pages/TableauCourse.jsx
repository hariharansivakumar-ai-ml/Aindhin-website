import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, BarChart2, Users, Calendar, Award, PieChart, Calculator, LayoutDashboard, BookOpen, Rocket, Briefcase, Target, Database, Lock } from 'lucide-react';

// Hero Image
import heroImg from '../assets/tableau_hero.webp';

// Tool Logos
import tableauLogo from '../assets/tableau.webp';
import excelLogo from '../assets/excel.webp';
import mysqlLogo from '../assets/mysql_logo.svg';
import pythonLogo from '../assets/python_tool.svg';

// Company Logos
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

const TableauCourse = () => {
  const [activeModule, setActiveModule] = useState(0);

  return (
    <div className="tab-course font-sans text-slate-900 bg-blue-50 w-full overflow-x-hidden">
      <style>{`
            /* ===== TABLEAU COURSE PAGE (scoped) ===== */
            .tab-course{
              font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
              color:#0f172a;
              background:#e0f2fe;
              width:100%;
            }
            .tab-course *{box-sizing:border-box;}
            
            /* HERO */
            .tab-hero{
              color:#fff;
              background:
                linear-gradient(120deg,rgba(15,23,42,.96),rgba(56,189,248,.7)),
                url("${heroImg}")
                center/cover no-repeat;
              padding:70px 20px;
              display:flex;
              align-items:center;
              justify-content:center;
            }
            .tab-hero-content{
              max-width:900px;
              text-align:left;
            }
            .tab-badge{
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
            .tab-hero-meta{
              display:flex;
              flex-wrap:wrap;
              gap:10px 18px;
              font-size:13px;
              color:#e5e7eb;
            }
            .tab-hero-meta span::before{
              content:"• ";
              color:#fde68a;
              font-weight:700;
            }
            
            /* MAIN LAYOUT */
            .tab-main{padding:40px 20px 50px;}
            .tab-main-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,2fr) minmax(0,1.1fr);
              gap:24px;
            }
            .tab-left,.tab-right{
              display:flex;
              flex-direction:column;
              gap:16px;
            }
            
            /* CARDS */
            .tab-card{
              background:#ffffff;
              border-radius:18px;
              padding:20px 22px;
              box-shadow:0 10px 25px rgba(15,23,42,.08);
            }
            .tab-card h2{
              font-size:18px;
              margin:0 0 10px;
              color:#db2777;
            }
            .tab-about-text{
              font-size:14px;
              color:#4b5563;
              line-height:1.6;
            }
            
            /* SYLLABUS */
            .tab-module{
              border:1px solid #e5e7eb;
              border-radius:12px;
              background:#f9fafb;
              margin-top:8px;
              overflow:hidden;
            }
            .tab-module .summary{
              list-style:none;
              padding:10px 14px;
              cursor:pointer;
              display:flex;
              justify-content:space-between;
              align-items:center;
              font-size:14px;
              font-weight:600;
            }
            .tab-module .summary::after{
              content:"▾";
              font-size:12px;
              color:#9ca3af;
              transition:transform .2s;
            }
            .tab-module.open .summary::after{transform:rotate(-180deg);}
            .tab-module-title{
              display:flex;
              gap:8px;
              flex-wrap:wrap;
              align-items:baseline;
            }
            .tab-module-label{
              font-size:11px;
              text-transform:uppercase;
              letter-spacing:.08em;
              color:#9ca3af;
            }
            .tab-module-content{
              padding:0 14px 10px 24px;
              font-size:13px;
              color:#4b5563;
            }
            .tab-module-content ul{
              margin:0;
              padding-left:16px;
            }
            .tab-module-content li{margin-bottom:4px;}
            
            /* RIGHT-COLUMN DETAILS */
            .tab-detail-list{
              list-style:none;
              padding:0;
              margin:0 0 16px;
              font-size:14px;
            }
            .tab-detail-item{
              display:flex;
              gap:10px;
              margin-bottom:10px;
            }
            .tab-detail-icon{
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
            .tab-detail-text strong{
              display:block;
              font-weight:600;
              color:#111827;
            }
            .tab-detail-text span{
              font-size:13px;
              color:#4b5563;
            }
            
            /* CTA BUTTON */
            .tab-cta-btn{
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
            .tab-cta-btn:hover{
              transform:translateY(-1px);
              filter:brightness(1.04);
              box-shadow:0 18px 40px rgba(37,99,235,.55);
              color:#fff !important;
            }
            
            /* TOP COMPANIES */
            .tab-companies{
              background:#e0f2fe;
              padding:40px 20px 40px;
            }
            .tab-companies-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .tab-companies h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .tab-companies p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .tab-logo-row{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:18px;
            }
            .tab-logo-card{
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
            .tab-logo-card img{
              max-height:40px;
              max-width:100%;
            }
            .tab-logo-card:hover{
              transform:translateY(-3px);
              box-shadow:0 14px 30px rgba(15,23,42,.16);
            }
            
            /* EXTRA COURSE DETAILS SECTION */
            .tab-highlights{
              background:#e0f2fe;
              padding:10px 20px 50px;
            }
            .tab-highlights-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,1.7fr) minmax(0,1.1fr);
              gap:28px;
              align-items:center;
            }
            .tab-highlights-heading{
              margin-bottom:12px;
            }
            .tab-highlights-heading h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .tab-highlights-heading p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .tab-highlight-grid{
              margin-top:18px;
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:14px;
            }
            .tab-highlight-card{
              background:#ffffff;
              border-radius:16px;
              padding:14px 12px;
              box-shadow:0 10px 24px rgba(15,23,42,.08);
            }
            .tab-highlight-icon{
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
            .tab-highlight-card h3{
              font-size:14px;
              margin:0 0 4px;
              color:#0f172a;
            }
            .tab-highlight-card p{
              font-size:13px;
              margin:0;
              color:#4b5563;
            }
            
            /* representation "image" block */
            .tab-highlights-visual{
              display:flex;
              justify-content:center;
            }
            .tab-dashboard{
              width:100%;
              max-width:340px;
              background:#ffffff;
              border-radius:20px;
              padding:14px 14px 18px;
              box-shadow:0 18px 40px rgba(37,99,235,.25);
            }
            .tab-dashboard-header{
              display:flex;
              justify-content:space-between;
              align-items:center;
              margin-bottom:10px;
              font-size:12px;
              color:#0f172a;
            }
            .tab-dashboard-dots{
              display:flex;
              gap:4px;
            }
            .tab-dashboard-dots span{
              width:7px;
              height:7px;
              border-radius:999px;
              background:#e5e7eb;
            }
            .tab-dashboard-graph{
              display:flex;
              gap:6px;
              align-items:flex-end;
              height:90px;
              margin-bottom:12px;
            }
            .tab-dashboard-bar{
              flex:1;
              border-radius:8px 8px 2px 2px;
              background:linear-gradient(180deg,#38bdf8,#1d4ed8);
            }
            .tab-dashboard-bar:nth-child(2){height:55%;}
            .tab-dashboard-bar:nth-child(3){height:80%;}
            .tab-dashboard-bar:nth-child(4){height:40%;}
            .tab-dashboard-bar:nth-child(5){height:70%;}
            .tab-dashboard-bar:nth-child(1){height:30%;}
            .tab-dashboard-tags{
              display:flex;
              flex-wrap:wrap;
              gap:6px;
              font-size:11px;
            }
            .tab-dashboard-tags span{
              padding:3px 7px;
              border-radius:999px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            
            /* TOOLS SECTION */
            .tab-tools{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .tab-tools-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .tab-tools-inner h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .tab-tools-inner p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .tab-tools-grid{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:16px;
            }
            .tab-tools-card{
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
            .tab-tools-logo{
              max-height:36px;
              max-width:90px;
              margin-bottom:4px;
            }
            .tab-tools-card span{
              font-size:12px;
              color:#111827;
            }
            
            /* MORE DETAILS SECTION */
            .tab-more{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .tab-more-inner{
              max-width:1160px;
              margin:0 auto;
            }
            .tab-more-header{
              text-align:center;
              margin-bottom:20px;
            }
            .tab-more-header h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .tab-more-header p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .tab-more-grid{
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:18px;
            }
            .tab-more-card{
              background:#ffffff;
              border-radius:18px;
              padding:16px 14px;
              box-shadow:0 12px 30px rgba(15,23,42,.12);
              display:flex;
              flex-direction:column;
              gap:8px;
            }
            .tab-more-top{
              display:flex;
              align-items:flex-start;
              gap:8px;
            }
            .tab-more-icon{
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
            .tab-more-title{
              font-size:15px;
              font-weight:600;
              margin:0;
              color:#0f172a;
            }
            .tab-more-text{
              font-size:13px;
              color:#4b5563;
              margin:0;
            }
            .tab-tool-logos{
              margin-top:12px;
              display:flex;
              flex-wrap:wrap;
              gap:10px;
              align-items:center;
              justify-content:center;
              width:100%;
            }
            .tab-tool-logo{
              max-height:32px;
              width:auto;
              filter:drop-shadow(0 2px 4px rgba(15,23,42,.18));
            }
            .tab-tool-logos img{
              max-height:32px !important;
              width:auto !important;
              object-fit:contain;
            }
            .tab-roles-image{
              margin-top:8px;
              display:flex;
              flex-wrap:wrap;
              gap:6px;
            }
            .tab-role-tag{
              padding:4px 8px;
              border-radius:999px;
              font-size:11px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            .tab-journey{
              margin-top:8px;
              border-left:2px solid #bfdbfe;
              padding-left:10px;
            }
            .tab-journey-step{
              position:relative;
              padding-left:10px;
              margin-bottom:6px;
              font-size:12px;
              color:#4b5563;
            }
            .tab-journey-step::before{
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
              .tab-hero{padding:50px 18px;}
              .fs-hero-title{font-size:48px;}
              .tab-main-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .tab-highlights-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .tab-more-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            @media (max-width:640px){
              .tab-hero{padding:38px 16px;}
              .tab-hero-meta{flex-direction:column;}
              .tab-highlight-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            `}</style>

      <div className="tab-course" id="top">

        {/* HERO */}
        <Section className="tab-hero tab-section">
          <div className="tab-hero-content">
            <span className="tab-badge">Tableau</span>
            <h1 className="fs-hero-title">
              Tableau – Data Visualization &amp; Business Intelligence
            </h1>
            <p className="fs-hero-sub">
              Learn to connect data, build powerful dashboards and share interactive visual stories with Tableau.
              Go from first worksheet to enterprise‑style BI reporting in a single, project‑driven program.
            </p>
            <div className="tab-hero-meta">
              <span>Covers Tableau Desktop, Prep &amp; Tableau Cloud basics</span>
              <span>No prior BI experience required (Excel helpful)</span>
              <span>Capstone Tableau dashboard for your portfolio</span>
            </div>
          </div>
        </Section>

        {/* MAIN CONTENT */}
        <main className="tab-main tab-section">
          <div className="tab-main-inner">

            {/* Left side */}
            <div className="tab-left">

              {/* About */}
              <Section className="tab-card">
                <h2>About This Course</h2>
                <div className="tab-about-text">
                  <p>
                    This course teaches Tableau from the ground up. You will learn how to connect to spreadsheets
                    and databases, prepare and join data, and build insightful worksheets, dashboards and stories.
                  </p>
                  <p>
                    Along the way you will master calculations, parameters, level‑of‑detail (LOD) expressions
                    and dashboard actions that make your reports feel like interactive products. You’ll finish
                    with a polished Tableau project you can walk through in job interviews.
                  </p>
                </div>
              </Section>

              {/* Syllabus */}
              <Section className="tab-card">
                <h2>Syllabus Covered</h2>

                <div className="flex flex-col gap-4">
                  {[
                    {
                      label: "Module 1",
                      title: "Tableau Basics & Data Connections",
                      content: (
                        <ul>
                          <li>Tableau product family: Desktop, Prep, Server/Cloud</li>
                          <li>Connecting to Excel, CSV and database sources</li>
                          <li>Joins, unions & data blending concepts</li>
                          <li>Dimensions vs measures, discrete vs continuous</li>
                          <li>Building your first worksheets & simple dashboards</li>
                        </ul>
                      ),
                      icon: <Database className="w-5 h-5 text-blue-600" />
                    },
                    {
                      label: "Module 2",
                      title: "Visual Analytics & Calculations",
                      content: (
                        <ul>
                          <li>Choosing the right chart for the question</li>
                          <li>Table calculations, quick calculations & percent of total</li>
                          <li>Calculated fields, parameters & conditional formatting</li>
                          <li>Level-of-Detail (LOD) expressions (FIXED, INCLUDE, EXCLUDE)</li>
                          <li>Date, cohort & funnel style analyses in Tableau</li>
                        </ul>
                      ),
                      icon: <Calculator className="w-5 h-5 text-blue-600" />
                    },
                    {
                      label: "Module 3",
                      title: "Dashboards, Stories & Interactivity",
                      content: (
                        <ul>
                          <li>Designing dashboard layouts for different screen sizes</li>
                          <li>Filters, highlight actions & dashboard actions</li>
                          <li>Using parameters for "what-if" and scenario analysis</li>
                          <li>Building Tableau Stories for step-by-step narratives</li>
                          <li>Performance tips & dashboard UX best practices</li>
                        </ul>
                      ),
                      icon: <LayoutDashboard className="w-5 h-5 text-blue-600" />
                    },
                    {
                      label: "Module 4",
                      title: "Publishing, Sharing & Capstone Project",
                      content: (
                        <ul>
                          <li>Publishing to Tableau Public & Tableau Cloud/Server</li>
                          <li>Permissions, projects & managing data refresh</li>
                          <li>Embedding dashboards in presentations & portals</li>
                          <li>Storytelling with Tableau dashboards for executives</li>
                          <li>Capstone: full Tableau BI solution from raw data to final story</li>
                        </ul>
                      ),
                      icon: <Rocket className="w-5 h-5 text-blue-600" />
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`tab-module ${activeModule === idx ? 'open' : ''}`}
                      onClick={() => setActiveModule(activeModule === idx ? null : idx)}
                    >
                      <div className="summary">
                        <div className="tab-module-title">
                          <span className="mr-2 flex items-center">{item.icon}</span>
                          <span className="tab-module-label">{item.label}</span>
                          <span>{item.title}</span>
                        </div>
                      </div>
                      {activeModule === idx && (
                        <div className="tab-module-content">
                          {item.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* Right side */}
            <aside className="tab-right">
              <Section className="tab-card">
                <h2>Course Details</h2>
                <ul className="tab-detail-list">
                  <li className="tab-detail-item">
                    <div className="tab-detail-icon"><Clock size={20} /></div>
                    <div className="tab-detail-text">
                      <strong>Duration</strong>
                      <span>8 Weeks (45+ hours of practical Tableau training)</span>
                    </div>
                  </li>
                  <li className="tab-detail-item">
                    <div className="tab-detail-icon"><BarChart2 size={20} /></div>
                    <div className="tab-detail-text">
                      <strong>Skill Level</strong>
                      <span>Beginner to Intermediate – basic Excel/analytics helpful</span>
                    </div>
                  </li>
                  <li className="tab-detail-item">
                    <div className="tab-detail-icon"><Users size={20} /></div>
                    <div className="tab-detail-text">
                      <strong>Includes</strong>
                      <span>Live labs, project reviews, DAX‑equivalent calculations &amp; Q&amp;A</span>
                    </div>
                  </li>
                  <li className="tab-detail-item">
                    <div className="tab-detail-icon"><Calendar size={20} /></div>
                    <div className="tab-detail-text">
                      <strong>Next Batch</strong>
                      <span>Coming Soon</span>
                    </div>
                  </li>
                  <li className="tab-detail-item">
                    <div className="tab-detail-icon"><Award size={20} /></div>
                    <div className="tab-detail-text">
                      <strong>Certificate</strong>
                      <span>Completion certificate + portfolio‑ready Tableau dashboards</span>
                    </div>
                  </li>
                </ul>

                <a href="https://user.aindhin.com" target="_blank" rel="noopener noreferrer" className="tab-cta-btn">Enroll Now &amp; Start Learning</a>
              </Section>
            </aside>

          </div>
        </main>

        {/* TOP COMPANIES */}
        <Section className="tab-companies tab-section">
          <div className="tab-companies-inner">
            <h2>Top Companies Using Tableau for BI &amp; Analytics</h2>
            <p>Tableau is a leading BI tool used by data‑driven teams in technology, finance, retail and consulting.</p>
            <div className="tab-logo-row">
              <div className="tab-logo-card">
                <img src={googleLogo} alt="Google" />
              </div>
              <div className="tab-logo-card">
                <img src={microsoftLogo} alt="Microsoft" />
              </div>
              <div className="tab-logo-card">
                <img src={awsLogo} alt="AWS" />
              </div>
              <div className="tab-logo-card">
                <img src={ibmLogo} alt="IBM" />
              </div>
              <div className="tab-logo-card">
                <img src={metaLogo} alt="Meta" />
              </div>
              <div className="tab-logo-card">
                <img src={netflixLogo} alt="Netflix" />
              </div>
              <div className="tab-logo-card">
                <img src={infosysLogo} alt="Infosys" />
              </div>
              <div className="tab-logo-card">
                <img src={accentureLogo} alt="Accenture" />
              </div>
            </div>
          </div>
        </Section>

        {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
        <Section className="tab-highlights tab-section">
          <div className="tab-highlights-inner">
            <div>
              <div className="tab-highlights-heading">
                <h2>What You Will Achieve in This Tableau Program</h2>
                <p>Become confident designing, analyzing and presenting insights in Tableau Desktop and Tableau Cloud.</p>
              </div>

              <div className="tab-highlight-grid">
                <div className="tab-highlight-card">
                  <div className="tab-highlight-icon"><PieChart size={24} /></div>
                  <h3>Visual Analytics Expertise</h3>
                  <p>Understand how to visually explore data with filters, sets, groups and advanced chart types.</p>
                </div>
                <div className="tab-highlight-card">
                  <div className="tab-highlight-icon"><Calculator size={24} /></div>
                  <h3>Powerful Calculations</h3>
                  <p>Use calculated fields, table calcs and LOD expressions to answer complex business questions.</p>
                </div>
                <div className="tab-highlight-card">
                  <div className="tab-highlight-icon"><LayoutDashboard size={24} /></div>
                  <h3>Interactive Dashboards</h3>
                  <p>Design multi‑page dashboards with drill‑downs, actions and responsive layouts.</p>
                </div>
                <div className="tab-highlight-card">
                  <div className="tab-highlight-icon"><BookOpen size={24} /></div>
                  <h3>Compelling Stories</h3>
                  <p>Use Tableau Stories and presentations to walk stakeholders through your insights end‑to‑end.</p>
                </div>
                <div className="tab-highlight-card">
                  <div className="tab-highlight-icon"><Rocket size={24} /></div>
                  <h3>Deployable BI Solutions</h3>
                  <p>Publish to Tableau Public or Tableau Cloud/Server and configure scheduled refreshes.</p>
                </div>
                <div className="tab-highlight-card">
                  <div className="tab-highlight-icon"><Users size={24} /></div>
                  <h3>Mentor Support</h3>
                  <p>Get feedback on dashboard UX, performance and storytelling from BI practitioners.</p>
                </div>
              </div>
            </div>

            {/* Visual representation */}
            <div className="tab-highlights-visual">
              <div className="tab-dashboard">
                <div className="tab-dashboard-header">
                  <span>Tableau Sales Overview</span>
                  <div className="tab-dashboard-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="tab-dashboard-graph">
                  <div className="tab-dashboard-bar"></div>
                  <div className="tab-dashboard-bar"></div>
                  <div className="tab-dashboard-bar"></div>
                  <div className="tab-dashboard-bar"></div>
                  <div className="tab-dashboard-bar"></div>
                </div>
                <div className="tab-dashboard-tags">
                  <span>Revenue</span>
                  <span>Profit</span>
                  <span>Regions</span>
                  <span>Top Customers</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* TOOLS USED IN THE COURSE (LOGOS) */}
        <Section className="tab-tools tab-section">
          <div className="tab-tools-inner">
            <h2>Tools &amp; Platforms You Will Use</h2>
            <p>Focus on Tableau and the key tools commonly paired with it in modern analytics stacks.</p>

            <div className="tab-tools-grid">
              <div className="tab-tools-card">
                <img className="tab-tools-logo" src={tableauLogo} alt="Tableau" />
                <span>Tableau Desktop</span>
              </div>
              <div className="tab-tools-card">
                <img className="tab-tools-logo" src={tableauLogo} alt="Tableau Cloud" />
                <span>Tableau Cloud / Server</span>
              </div>
              <div className="tab-tools-card">
                <img className="tab-tools-logo" src={excelLogo} alt="Excel" />
                <span>Excel / CSV Sources</span>
              </div>
              <div className="tab-tools-card">
                <img className="tab-tools-logo" src={mysqlLogo} alt="MySQL" />
                <span>SQL Databases</span>
              </div>
              <div className="tab-tools-card">
                <img className="tab-tools-logo" src={pythonLogo} alt="Python" />
                <span>Python (optional data prep)</span>
              </div>
            </div>
          </div>
        </Section>

        {/* MORE COURSE DETAILS WITH ICONS + MINI IMAGES */}
        <Section className="tab-more tab-section">
          <div className="tab-more-inner">
            <div className="tab-more-header">
              <h2>Roles &amp; Learning Journey</h2>
              <p>See how this Tableau course maps to common BI roles and how your skills progress week by week.</p>
            </div>

            <div className="tab-more-grid">
              {/* Card 1: Tools overview */}
              <div className="tab-more-card">
                <div className="tab-more-top">
                  <div className="tab-more-icon"><Briefcase size={20} /></div>
                  <div>
                    <h3 className="tab-more-title">Tableau Toolset</h3>
                    <p className="tab-more-text">
                      Use Tableau Desktop for visual analytics, Tableau Cloud/Server for sharing and scheduling, and Excel/SQL for sources.
                    </p>
                  </div>
                </div>
                <div className="tab-tool-logos">
                  <img className="tab-tool-logo" src={tableauLogo} alt="Tableau" />
                  <img className="tab-tool-logo" src={excelLogo} alt="Excel" />
                  <img className="tab-tool-logo" src={mysqlLogo} alt="MySQL" />
                </div>
              </div>

              {/* Card 2: Roles */}
              <div className="tab-more-card">
                <div className="tab-more-top">
                  <div className="tab-more-icon"><Target size={20} /></div>
                  <div>
                    <h3 className="tab-more-title">Career Roles You Can Target</h3>
                    <p className="tab-more-text">
                      Position yourself for Tableau‑focused analytics and BI roles across industries.
                    </p>
                  </div>
                </div>
                <div className="tab-roles-image">
                  <span className="tab-role-tag">Tableau Developer</span>
                  <span className="tab-role-tag">BI / Reporting Analyst</span>
                  <span className="tab-role-tag">Data Visualization Specialist</span>
                  <span className="tab-role-tag">Product / Marketing Analyst</span>
                  <span className="tab-role-tag">Analytics Consultant</span>
                </div>
              </div>

              {/* Card 3: Journey */}
              <div className="tab-more-card">
                <div className="tab-more-top">
                  <div className="tab-more-icon"><BookOpen size={20} /></div>
                  <div>
                    <h3 className="tab-more-title">Your 8‑Week Learning Journey</h3>
                    <p className="tab-more-text">
                      A focused path from first Tableau worksheet to complete BI story.
                    </p>
                  </div>
                </div>
                <div className="tab-journey">
                  <div className="tab-journey-step">Weeks 1–2: Tableau basics, connections &amp; first dashboards</div>
                  <div className="tab-journey-step">Weeks 3–4: Visual analytics, calculations &amp; LOD expressions</div>
                  <div className="tab-journey-step">Weeks 5–6: Advanced dashboards, actions &amp; stories</div>
                  <div className="tab-journey-step">Weeks 7–8: Publishing, Tableau Cloud &amp; capstone project</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default TableauCourse;

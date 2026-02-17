import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, BarChart2, Users, Calendar, Award, Database, Terminal, Settings, Rocket, Briefcase, Target, BookOpen, Sigma, GitMerge, Zap } from 'lucide-react';

// Hero Image
import heroImg from '../assets/courses/sql-hero.jpg';

// Tool Logos
import mysqlLogo from '../assets/courses/logos/mysql.svg';
import postgresqlLogo from '../assets/courses/logos/postgresql.svg';
import sqlServerLogo from '../assets/courses/logos/sql-server.png';
import sqliteLogo from '../assets/courses/logos/sqlite.svg';
import oracleLogo from '../assets/courses/logos/oracle.svg';

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

const SqlCourse = () => {
  const [activeModule, setActiveModule] = useState(0);

  return (
    <div className="sql-course font-sans text-slate-900 bg-blue-50 w-full overflow-x-hidden">
      <style>{`
            /* ===== SQL COURSE PAGE (scoped) ===== */
            .sql-course{
              font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
              color:#0f172a;
              background:#e0f2fe;
              width:100%;
            }
            .sql-course *{box-sizing:border-box;}
            
            /* HERO */
            .sql-hero{
              color:#fff;
              background:
                linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.75)),
                url("${heroImg}")
                center/cover no-repeat;
              padding:70px 20px;
              display:flex;
              align-items:center;
              justify-content:center;
            }
            .sql-hero-content{
              max-width:900px;
              text-align:left;
            }
            .sql-badge{
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
            .sql-hero-meta{
              display:flex;
              flex-wrap:wrap;
              gap:10px 18px;
              font-size:13px;
              color:#e5e7eb;
            }
            .sql-hero-meta span::before{
              content:"• ";
              color:#fde68a;
              font-weight:700;
            }
            
            /* MAIN LAYOUT */
            .sql-main{padding:40px 20px 50px;}
            .sql-main-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,2fr) minmax(0,1.1fr);
              gap:24px;
            }
            .sql-left,.sql-right{
              display:flex;
              flex-direction:column;
              gap:16px;
            }
            
            /* CARDS */
            .sql-card{
              background:#ffffff;
              border-radius:18px;
              padding:20px 22px;
              box-shadow:0 10px 25px rgba(15,23,42,.08);
            }
            .sql-card h2{
              font-size:18px;
              margin:0 0 10px;
              color:#db2777;
            }
            .sql-about-text{
              font-size:14px;
              color:#4b5563;
              line-height:1.6;
            }
            
            /* SYLLABUS */
            .sql-module{
              border:1px solid #e5e7eb;
              border-radius:12px;
              background:#f9fafb;
              margin-top:8px;
              overflow:hidden;
            }
            .sql-module .summary{
              list-style:none;
              padding:10px 14px;
              cursor:pointer;
              display:flex;
              justify-content:space-between;
              align-items:center;
              font-size:14px;
              font-weight:600;
            }
            .sql-module .summary::after{
              content:"▾";
              font-size:12px;
              color:#9ca3af;
              transition:transform .2s;
            }
            .sql-module.open .summary::after{transform:rotate(-180deg);}
            .sql-module-title{
              display:flex;
              gap:8px;
              flex-wrap:wrap;
              align-items:baseline;
            }
            .sql-module-label{
              font-size:11px;
              text-transform:uppercase;
              letter-spacing:.08em;
              color:#111827;   /* dark text */
              font-weight:700; /* bold */
            }
            .sql-module-content{
              padding:0 14px 10px 24px;
              font-size:13px;
              color:#4b5563;
            }
            .sql-module-content ul{
              margin:0;
              padding-left:16px;
            }
            .sql-module-content li{margin-bottom:4px;}
            
            /* RIGHT-COLUMN DETAILS */
            .sql-detail-list{
              list-style:none;
              padding:0;
              margin:0 0 16px;
              font-size:14px;
            }
            .sql-detail-item{
              display:flex;
              gap:10px;
              margin-bottom:10px;
            }
            .sql-detail-icon{
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
            .sql-detail-text strong{
              display:block;
              font-weight:600;
              color:#111827;
            }
            .sql-detail-text span{
              font-size:13px;
              color:#4b5563;
            }
            
            /* CTA BUTTON */
            .sql-cta-btn{
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
            .sql-cta-btn:hover{
              transform:translateY(-1px);
              filter:brightness(1.04);
              box-shadow:0 18px 40px rgba(37,99,235,.55);
              color:#fff !important;
            }
            
            /* TOP COMPANIES */
            .sql-companies{
              background:#e0f2fe;
              padding:40px 20px 40px;
            }
            .sql-companies-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .sql-companies h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .sql-companies p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .sql-logo-row{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:18px;
            }
            .sql-logo-card{
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
            .sql-logo-card img{
              max-height:40px;
              max-width:100%;
            }
            .sql-logo-card:hover{
              transform:translateY(-3px);
              box-shadow:0 14px 30px rgba(15,23,42,.16);
            }
            
            /* EXTRA COURSE DETAILS SECTION */
            .sql-highlights{
              background:#e0f2fe;
              padding:10px 20px 50px;
            }
            .sql-highlights-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,1.7fr) minmax(0,1.1fr);
              gap:28px;
              align-items:center;
            }
            .sql-highlights-heading{
              margin-bottom:12px;
            }
            .sql-highlights-heading h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .sql-highlights-heading p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .sql-highlight-grid{
              margin-top:18px;
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:14px;
            }
            .sql-highlight-card{
              background:#ffffff;
              border-radius:16px;
              padding:14px 12px;
              box-shadow:0 10px 24px rgba(15,23,42,.08);
            }
            .sql-highlight-icon{
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
            .sql-highlight-card h3{
              font-size:14px;
              margin:0 0 4px;
              color:#0f172a;
            }
            .sql-highlight-card p{
              font-size:13px;
              margin:0;
              color:#4b5563;
            }
            
            /* representation "image" block */
            .sql-highlights-visual{
              display:flex;
              justify-content:center;
            }
            .sql-dashboard{
              width:100%;
              max-width:340px;
              background:#ffffff;
              border-radius:20px;
              padding:14px 14px 18px;
              box-shadow:0 18px 40px rgba(37,99,235,.25);
            }
            .sql-dashboard-header{
              display:flex;
              justify-content:space-between;
              align-items:center;
              margin-bottom:10px;
              font-size:12px;
              color:#0f172a;
            }
            .sql-dashboard-dots{
              display:flex;
              gap:4px;
            }
            .sql-dashboard-dots span{
              width:7px;
              height:7px;
              border-radius:999px;
              background:#e5e7eb;
            }
            .sql-dashboard-graph{
              display:flex;
              gap:6px;
              align-items:flex-end;
              height:90px;
              margin-bottom:12px;
            }
            .sql-dashboard-bar{
              flex:1;
              border-radius:8px 8px 2px 2px;
              background:linear-gradient(180deg,#38bdf8,#1d4ed8);
            }
            .sql-dashboard-bar:nth-child(2){height:55%;}
            .sql-dashboard-bar:nth-child(3){height:80%;}
            .sql-dashboard-bar:nth-child(4){height:40%;}
            .sql-dashboard-bar:nth-child(5){height:70%;}
            .sql-dashboard-bar:nth-child(1){height:30%;}
            .sql-dashboard-tags{
              display:flex;
              flex-wrap:wrap;
              gap:6px;
              font-size:11px;
            }
            .sql-dashboard-tags span{
              padding:3px 7px;
              border-radius:999px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            
            /* TOOLS SECTION */
            .sql-tools{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .sql-tools-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .sql-tools-inner h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .sql-tools-inner p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .sql-tools-grid{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:16px;
            }
            .sql-tools-card{
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
            .sql-tools-logo{
              max-height:36px;
              max-width:90px;
              margin-bottom:4px;
            }
            .sql-tools-card span{
              font-size:12px;
              color:#111827;
            }
            
            /* MORE DETAILS SECTION */
            .sql-more{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .sql-more-inner{
              max-width:1160px;
              margin:0 auto;
            }
            .sql-more-header{
              text-align:center;
              margin-bottom:20px;
            }
            .sql-more-header h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .sql-more-header p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .sql-more-grid{
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:18px;
            }
            .sql-more-card{
              background:#ffffff;
              border-radius:18px;
              padding:16px 14px;
              box-shadow:0 12px 30px rgba(15,23,42,.12);
              display:flex;
              flex-direction:column;
              gap:8px;
            }
            .sql-more-top{
              display:flex;
              align-items:flex-start;
              gap:8px;
            }
            .sql-more-icon{
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
            .sql-more-title{
              font-size:15px;
              font-weight:600;
              margin:0;
              color:#0f172a;
            }
            .sql-more-text{
              font-size:13px;
              color:#4b5563;
              margin:0;
            }
            .sql-tool-logos{
              margin-top:12px;
              display:flex;
              flex-wrap:wrap;
              gap:10px;
              align-items:center;
              justify-content:center;
              width:100%;
            }
            .sql-tool-logo{
              max-height:32px;
              width:auto;
              filter:drop-shadow(0 2px 4px rgba(15,23,42,.18));
            }
            .sql-tool-logos img{
              max-height:32px !important;
              width:auto !important;
              object-fit:contain;
            }
            .sql-roles-image{
              margin-top:8px;
              display:flex;
              flex-wrap:wrap;
              gap:6px;
            }
            .sql-role-tag{
              padding:4px 8px;
              border-radius:999px;
              font-size:11px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            .sql-journey{
              margin-top:8px;
              border-left:2px solid #bfdbfe;
              padding-left:10px;
            }
            .sql-journey-step{
              position:relative;
              padding-left:10px;
              margin-bottom:6px;
              font-size:12px;
              color:#4b5563;
            }
            .sql-journey-step::before{
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
              .sql-hero{padding:50px 18px;}
              .fs-hero-title{font-size:48px;}
              .sql-main-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .sql-highlights-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .sql-more-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            @media (max-width:640px){
              .sql-hero{padding:38px 16px;}
              .sql-hero-meta{flex-direction:column;}
              .sql-highlight-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            `}</style>

      <div className="sql-course" id="top">

        {/* HERO */}
        <Section className="sql-hero sql-section">
          <div className="sql-hero-content">
            <span className="sql-badge">SQL &amp; Databases</span>
            <h1 className="fs-hero-title">
              SQL – Foundations of Data Querying &amp; Databases
            </h1>
            <p className="fs-hero-sub">
              Learn how to speak the language of databases. From SELECT and JOINs to subqueries and indexing,
              this course gives you the SQL skills needed to query, analyze and manage relational data.
            </p>
            <div className="sql-hero-meta">
              <span>Beginner friendly – no prior SQL required</span>
              <span>Works with MySQL, PostgreSQL, SQL Server &amp; more</span>
              <span>Real‑world exercises with production‑style schemas</span>
            </div>
          </div>
        </Section>

        {/* MAIN CONTENT */}
        <main className="sql-main sql-section">
          <div className="sql-main-inner">

            {/* Left side */}
            <div className="sql-left">

              {/* About */}
              <Section className="sql-card">
                <h2>About This Course</h2>
                <div className="sql-about-text">
                  <p>
                    This course is your practical introduction to SQL and relational databases. You’ll learn how
                    data is stored in tables, how relationships between tables are modeled, and how to write
                    SQL queries that extract exactly the information you need.
                  </p>
                  <p>
                    We start with query basics and gradually move into joins, aggregations, subqueries, window
                    functions and performance tips. You’ll practice against realistic schemas such as e‑commerce,
                    HR and analytics databases so your skills transfer directly into the workplace.
                  </p>
                </div>
              </Section>

              {/* Syllabus */}
              <Section className="sql-card">
                <h2>Syllabus Covered</h2>

                <div className="flex flex-col gap-4">
                  {[
                    {
                      label: "Module 1",
                      title: "Relational Database Fundamentals",
                      content: (
                        <ul>
                          <li>What is a database? Tables, rows, columns & keys</li>
                          <li>Introduction to relational models & ER diagrams</li>
                          <li>Installing & using a SQL client (MySQL / PostgreSQL)</li>
                          <li>SELECT, FROM, WHERE and basic filtering</li>
                          <li>Ordering, limiting and simple calculations in queries</li>
                        </ul>
                      ),
                      icon: <Database className="w-5 h-5 text-blue-600" />
                    },
                    {
                      label: "Module 2",
                      title: "Aggregations, Grouping & Conditional Logic",
                      content: (
                        <ul>
                          <li>COUNT, SUM, AVG, MIN, MAX and derived metrics</li>
                          <li>GROUP BY and HAVING for aggregated filtering</li>
                          <li>CASE expressions for conditional columns</li>
                          <li>Date functions and working with time-series data</li>
                          <li>Hands-on KPI queries for analytics dashboards</li>
                        </ul>
                      ),
                      icon: <Sigma className="w-5 h-5 text-blue-600" />
                    },
                    {
                      label: "Module 3",
                      title: "JOINs, Subqueries & Advanced Filtering",
                      content: (
                        <ul>
                          <li>INNER, LEFT, RIGHT & FULL JOINs in practice</li>
                          <li>Understanding primary & foreign keys</li>
                          <li>Subqueries in SELECT, FROM and WHERE</li>
                          <li>EXISTS, IN and NOT IN patterns</li>
                          <li>Combining multiple tables for real-world reports</li>
                        </ul>
                      ),
                      icon: <GitMerge className="w-5 h-5 text-blue-600" />
                    },
                    {
                      label: "Module 4",
                      title: "Window Functions, Indexes & Best Practices",
                      content: (
                        <ul>
                          <li>Introduction to window functions (OVER, PARTITION BY)</li>
                          <li>Running totals, rankings and moving averages</li>
                          <li>Indexes, query plans and performance basics</li>
                          <li>Views, CTEs and re-usable query structures</li>
                          <li>Capstone: analyze a realistic business database with SQL</li>
                        </ul>
                      ),
                      icon: <Zap className="w-5 h-5 text-blue-600" />
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`sql-module ${activeModule === idx ? 'open' : ''}`}
                      onClick={() => setActiveModule(activeModule === idx ? null : idx)}
                    >
                      <div className="summary">
                        <div className="sql-module-title">
                          <span className="mr-2 flex items-center">{item.icon}</span>
                          <span className="sql-module-label">{item.label}</span>
                          <span>{item.title}</span>
                        </div>
                      </div>
                      {activeModule === idx && (
                        <div className="sql-module-content">
                          {item.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* Right side */}
            <aside className="sql-right">
              <Section className="sql-card">
                <h2>Course Details</h2>
                <ul className="sql-detail-list">
                  <li className="sql-detail-item">
                    <div className="sql-detail-icon"><Clock size={20} /></div>
                    <div className="sql-detail-text">
                      <strong>Duration</strong>
                      <span>6 Weeks (40+ hours of SQL practice and exercises)</span>
                    </div>
                  </li>
                  <li className="sql-detail-item">
                    <div className="sql-detail-icon"><BarChart2 size={20} /></div>
                    <div className="sql-detail-text">
                      <strong>Skill Level</strong>
                      <span>Beginner to Intermediate – perfect starting point for data careers</span>
                    </div>
                  </li>
                  <li className="sql-detail-item">
                    <div className="sql-detail-icon"><Users size={20} /></div>
                    <div className="sql-detail-text">
                      <strong>Includes</strong>
                      <span>Live query walkthroughs, weekly assignments &amp; doubt‑clearing sessions</span>
                    </div>
                  </li>
                  <li className="sql-detail-item">
                    <div className="sql-detail-icon"><Calendar size={20} /></div>
                    <div className="sql-detail-text">
                      <strong>Next Batch</strong>
                      <span>23 Dec 2025 (new SQL batches every month)</span>
                    </div>
                  </li>
                  <li className="sql-detail-item">
                    <div className="sql-detail-icon"><Award size={20} /></div>
                    <div className="sql-detail-text">
                      <strong>Certificate</strong>
                      <span>Completion certificate + Git repo of SQL solutions</span>
                    </div>
                  </li>
                </ul>

                <a href="#top" className="sql-cta-btn">Enroll Now &amp; Start Learning</a>
              </Section>
            </aside>

          </div>
        </main>

        {/* TOP COMPANIES */}
        <Section className="sql-companies sql-section">
          <div className="sql-companies-inner">
            <h2>Top Companies Relying on SQL Every Day</h2>
            <p>SQL is the core language of data used by analysts, engineers and BI teams across industries.</p>
            <div className="sql-logo-row">
              <div className="sql-logo-card">
                <img src={googleLogo} alt="Google" />
              </div>
              <div className="sql-logo-card">
                <img src={microsoftLogo} alt="Microsoft" />
              </div>
              <div className="sql-logo-card">
                <img src={awsLogo} alt="AWS" />
              </div>
              <div className="sql-logo-card">
                <img src={ibmLogo} alt="IBM" />
              </div>
              <div className="sql-logo-card">
                <img src={metaLogo} alt="Meta" />
              </div>
              <div className="sql-logo-card">
                <img src={netflixLogo} alt="Netflix" />
              </div>
              <div className="sql-logo-card">
                <img src={infosysLogo} alt="Infosys" />
              </div>
              <div className="sql-logo-card">
                <img src={accentureLogo} alt="Accenture" />
              </div>
            </div>
          </div>
        </Section>

        {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
        <Section className="sql-highlights sql-section">
          <div className="sql-highlights-inner">
            <div>
              <div className="sql-highlights-heading">
                <h2>What You Will Achieve in This SQL Program</h2>
                <p>Build a solid foundation in relational databases and become confident writing production‑grade SQL.</p>
              </div>

              <div className="sql-highlight-grid">
                <div className="sql-highlight-card">
                  <div className="sql-highlight-icon"><Database size={24} /></div>
                  <h3>Relational Thinking</h3>
                  <p>Understand how tables relate, how to design schemas and how to navigate complex data models.</p>
                </div>
                <div className="sql-highlight-card">
                  <div className="sql-highlight-icon"><Terminal size={24} /></div>
                  <h3>Querying Confidence</h3>
                  <p>Quickly write and debug SQL queries to answer ad‑hoc questions from product, marketing or ops teams.</p>
                </div>
                <div className="sql-highlight-card">
                  <div className="sql-highlight-icon"><BarChart2 size={24} /></div>
                  <h3>Analytics‑Ready Skills</h3>
                  <p>Produce clean result sets that feed into Excel, Power BI, Tableau or Python notebooks.</p>
                </div>
                <div className="sql-highlight-card">
                  <div className="sql-highlight-icon"><Settings size={24} /></div>
                  <h3>Performance Awareness</h3>
                  <p>Read query plans, understand indexes and avoid anti‑patterns that slow databases down.</p>
                </div>
                <div className="sql-highlight-card">
                  <div className="sql-highlight-icon"><Rocket size={24} /></div>
                  <h3>Job‑Ready Portfolio</h3>
                  <p>Finish with a collection of SQL scripts and case‑study notebooks that demonstrate your skills.</p>
                </div>
                <div className="sql-highlight-card">
                  <div className="sql-highlight-icon"><Users size={24} /></div>
                  <h3>Mentor Support</h3>
                  <p>Get help on edge‑case queries, schema understanding and translating business needs into SQL.</p>
                </div>
              </div>
            </div>

            {/* Visual representation */}
            <div className="sql-highlights-visual">
              <div className="sql-dashboard">
                <div className="sql-dashboard-header">
                  <span>SQL Query Insights</span>
                  <div className="sql-dashboard-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="sql-dashboard-graph">
                  <div className="sql-dashboard-bar"></div>
                  <div className="sql-dashboard-bar"></div>
                  <div className="sql-dashboard-bar"></div>
                  <div className="sql-dashboard-bar"></div>
                  <div className="sql-dashboard-bar"></div>
                </div>
                <div className="sql-dashboard-tags">
                  <span>Users</span>
                  <span>Orders</span>
                  <span>Revenue</span>
                  <span>Conversion</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* TOOLS USED IN THE COURSE (LOGOS) */}
        <Section className="sql-tools sql-section">
          <div className="sql-tools-inner">
            <h2>Tools &amp; Databases You Will Use</h2>
            <p>Practice SQL on popular open‑source and enterprise database systems.</p>

            <div className="sql-tools-grid">
              <div className="sql-tools-card">
                <img className="sql-tools-logo" src={mysqlLogo} alt="MySQL" />
                <span>MySQL</span>
              </div>
              <div className="sql-tools-card">
                <img className="sql-tools-logo" src={postgresqlLogo} alt="PostgreSQL" />
                <span>PostgreSQL</span>
              </div>
              <div className="sql-tools-card">
                <img className="sql-tools-logo" src={sqlServerLogo} alt="SQL Server" />
                <span>SQL Server (concepts)</span>
              </div>
              <div className="sql-tools-card">
                <img className="sql-tools-logo" src={sqliteLogo} alt="SQLite" />
                <span>SQLite (for quick labs)</span>
              </div>
              <div className="sql-tools-card">
                <img className="sql-tools-logo" src={oracleLogo} alt="Oracle" />
                <span>Oracle (syntax differences)</span>
              </div>
            </div>
          </div>
        </Section>

        {/* MORE COURSE DETAILS WITH ICONS + MINI IMAGES */}
        <Section className="sql-more sql-section">
          <div className="sql-more-inner">
            <div className="sql-more-header">
              <h2>Roles &amp; Learning Journey</h2>
              <p>See how this SQL course maps to common data roles and how your skills grow over 6 weeks.</p>
            </div>

            <div className="sql-more-grid">
              {/* Card 1: Tool ecosystem */}
              <div className="sql-more-card">
                <div className="sql-more-top">
                  <div className="sql-more-icon"><Briefcase size={20} /></div>
                  <div>
                    <h3 className="sql-more-title">SQL Ecosystem</h3>
                    <p className="sql-more-text">
                      Work across different SQL dialects so you can adapt quickly to whichever database your company uses.
                    </p>
                  </div>
                </div>
                <div className="sql-tool-logos">
                  <img className="sql-tool-logo" src={mysqlLogo} alt="MySQL" />
                  <img className="sql-tool-logo" src={postgresqlLogo} alt="PostgreSQL" />
                  <img className="sql-tool-logo" src={sqlServerLogo} alt="SQL Server" />
                </div>
              </div>

              {/* Card 2: Roles */}
              <div className="sql-more-card">
                <div className="sql-more-top">
                  <div className="sql-more-icon"><Target size={20} /></div>
                  <div>
                    <h3 className="sql-more-title">Career Roles You Can Target</h3>
                    <p className="sql-more-text">
                      SQL is a core skill for analyst and engineering roles. This course prepares you for SQL‑heavy positions.
                    </p>
                  </div>
                </div>
                <div className="sql-roles-image">
                  <span className="sql-role-tag">Junior Data Analyst</span>
                  <span className="sql-role-tag">Business Analyst</span>
                  <span className="sql-role-tag">BI / Reporting Analyst</span>
                  <span className="sql-role-tag">Data Engineer (Entry‑level)</span>
                  <span className="sql-role-tag">Database / SQL Developer</span>
                </div>
              </div>

              {/* Card 3: Journey */}
              <div className="sql-more-card">
                <div className="sql-more-top">
                  <div className="sql-more-icon"><BookOpen size={20} /></div>
                  <div>
                    <h3 className="sql-more-title">Your 6‑Week Learning Journey</h3>
                    <p className="sql-more-text">
                      A structured plan that grows your SQL skills from zero to confident practitioner.
                    </p>
                  </div>
                </div>
                <div className="sql-journey">
                  <div className="sql-journey-step">Weeks 1–2: Query basics, filtering &amp; aggregations</div>
                  <div className="sql-journey-step">Week 3: GROUP BY, HAVING, CASE &amp; date operations</div>
                  <div className="sql-journey-step">Week 4: JOINs, subqueries &amp; complex filtering</div>
                  <div className="sql-journey-step">Weeks 5–6: Window functions, indexes, views &amp; capstone project</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default SqlCourse;

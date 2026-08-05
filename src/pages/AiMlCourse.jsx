import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, BarChart2, Users, Calendar, Award, Brain, Code, Rocket, Globe, ArrowUpRight } from 'lucide-react';
import { USER_APP_URL } from '../utils/apiClient';

// Hero Image
import heroImg from '../assets/ai_ml_hero.webp';

// Tool Logos
import pythonLogo from '../assets/python_logo.svg';
import jupyterLogo from '../assets/jupyter_logo.svg';
import vscodeLogo from '../assets/vscode_logo.svg';
import gitLogo from '../assets/git_logo.svg';
import githubLogo from '../assets/github_logo.svg';
import numpyLogo from '../assets/numpy_logo.svg';
import pandasLogo from '../assets/pandas_logo.svg';
import matplotlibLogo from '../assets/matplotlib.svg';
import scikitLogo from '../assets/scikit_learn_logo.svg';
import tensorflowLogo from '../assets/tensorflow_logo.svg';

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

const AiMlCourse = () => {
  useEffect(() => {
    document.title = "Best AI and Machine Learning Course in India | Aindhin";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Learn Artificial Intelligence and Machine Learning with live projects, mentorship, certification, and placement support at Aindhin. Enroll online today.");
    }
  }, []);

  const [activeModule, setActiveModule] = useState(0);

  return (
    <div className="ai-ml-page font-sans text-slate-900 bg-blue-50 w-full">
      <style>{`
                /* ===== AI & ML Course Page (scoped) ===== */
                .ai-ml-page{
                  font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
                  color:#0f172a;
                  background:#e0f2fe; /* light blue theme */
                  width:100%;
                }
                .ai-ml-page *{box-sizing:border-box;}
                
                /* HERO */
                .ai-ml-hero{
                  color:#fff;
                  background:
                    linear-gradient(120deg,rgba(15,23,42,.95),rgba(30,64,175,.7)),
                    url(${heroImg})
                    center/cover no-repeat;
                  padding:70px 20px;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                }
                .ai-ml-hero-content{
                  max-width:900px;
                  text-align:left;
                }
                .ai-ml-badge{
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
                .ai-ml-hero-meta{
                  display:flex;
                  flex-wrap:wrap;
                  gap:10px 18px;
                  font-size:13px;
                  color:#e5e7eb;
                }
                .ai-ml-hero-meta span::before{
                  content:"• ";
                  color:#fde68a;
                  font-weight:700;
                }
                
                /* MAIN */
                .ai-ml-main{padding:40px 20px 50px;}
                .ai-ml-main-inner{
                  max-width:1160px;
                  margin:0 auto;
                  display:grid;
                  grid-template-columns:minmax(0,2fr) minmax(0,1.1fr);
                  gap:24px;
                }
                .ai-ml-left,.ai-ml-right{
                  display:flex;
                  flex-direction:column;
                  gap:16px;
                }
                
                /* CARDS */
                .ai-ml-card{
                  background:#ffffff;
                  border-radius:18px;
                  padding:20px 22px;
                  box-shadow:0 10px 25px rgba(15,23,42,.08);
                }
                .ai-ml-card h2{
                  font-size:18px;
                  margin:0 0 10px;
                  color:#db2777;
                }
                .ai-ml-about-text{
                  font-size:14px;
                  color:#4b5563;
                  line-height:1.6;
                }
                
                /* SYLLABUS */
                .ai-ml-module{
                  border:1px solid #e5e7eb;
                  border-radius:12px;
                  background:#f9fafb;
                  margin-top:8px;
                  overflow:hidden;
                }
                .ai-ml-module .summary{
                  list-style:none;
                  padding:10px 14px;
                  cursor:pointer;
                  display:flex;
                  justify-content:space-between;
                  align-items:center;
                  font-size:14px;
                  font-weight:600;
                }
                .ai-ml-module .summary::after{
                  content:"▾";
                  font-size:12px;
                  color:#9ca3af;
                  transition:transform .2s;
                }
                .ai-ml-module.open .summary::after{transform:rotate(-180deg);}
                .ai-ml-module-title{
                  display:flex;
                  gap:8px;
                  flex-wrap:wrap;
                  align-items:baseline;
                }
                .ai-ml-module-label{
                  font-size:11px;
                  text-transform:uppercase;
                  letter-spacing:.08em;
                  color:#111827;   /* dark text */
                  font-weight:700; /* bold */
                }
                .ai-ml-module-content{
                  padding:0 14px 10px 24px;
                  font-size:13px;
                  color:#4b5563;
                }
                .ai-ml-module-content ul{
                  margin:0;
                  padding-left:16px;
                }
                .ai-ml-module-content li{margin-bottom:4px;}
                
                /* RIGHT-COLUMN DETAILS */
                .ai-ml-detail-list{
                  list-style:none;
                  padding:0;
                  margin:0 0 16px;
                  font-size:14px;
                }
                .ai-ml-detail-item{
                  display:flex;
                  gap:10px;
                  margin-bottom:10px;
                }
                .ai-ml-detail-icon{
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
                .ai-ml-detail-text strong{
                  display:block;
                  font-weight:600;
                  color:#111827;
                }
                .ai-ml-detail-text span{
                  font-size:13px;
                  color:#4b5563;
                }
                
                /* CTA BUTTON */
                .ai-ml-cta-btn{
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
                .ai-ml-cta-btn:hover{
                  transform:translateY(-1px);
                  filter:brightness(1.04);
                  box-shadow:0 18px 40px rgba(37,99,235,.55);
                  color:#fff !important;
                }
                
                /* TOP COMPANIES */
                .ai-ml-companies{
                  background:#e0f2fe;
                  padding:40px 20px 40px;
                }
                .ai-ml-companies-inner{
                  max-width:1160px;
                  margin:0 auto;
                  text-align:center;
                }
                .ai-ml-companies h2{
                  font-size:20px;
                  margin:0 0 6px;
                  color:#0f172a;
                }
                .ai-ml-companies p{
                  margin:0 0 20px;
                  font-size:14px;
                  color:#4b5563;
                }
                .ai-ml-logo-row{
                  display:flex;
                  flex-wrap:wrap;
                  justify-content:center;
                  gap:18px;
                }
                .ai-ml-logo-card{
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
                .ai-ml-logo-card img{
                  max-height:40px;
                  max-width:100%;
                }
                .ai-ml-logo-card:hover{
                  transform:translateY(-3px);
                  box-shadow:0 14px 30px rgba(15,23,42,.16);
                }
                
                /* EXTRA COURSE DETAILS SECTION (ACHIEVEMENTS) */
                .ai-ml-highlights{
                  background:#e0f2fe;
                  padding:10px 20px 50px;
                }
                .ai-ml-highlights-inner{
                  max-width:1160px;
                  margin:0 auto;
                  display:grid;
                  grid-template-columns:minmax(0,1.7fr) minmax(0,1.1fr);
                  gap:28px;
                  align-items:center;
                }
                .ai-ml-highlights-heading{
                  margin-bottom:12px;
                }
                .ai-ml-highlights-heading h2{
                  font-size:20px;
                  margin:0 0 6px;
                  color:#0f172a;
                }
                .ai-ml-highlights-heading p{
                  margin:0;
                  font-size:14px;
                  color:#4b5563;
                }
                .ai-ml-highlight-grid{
                  margin-top:18px;
                  display:grid;
                  grid-template-columns:repeat(3,minmax(0,1fr));
                  gap:14px;
                }
                .ai-ml-highlight-card{
                  background:#ffffff;
                  border-radius:16px;
                  padding:14px 12px;
                  box-shadow:0 10px 24px rgba(15,23,42,.08);
                }
                .ai-ml-highlight-icon{
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
                .ai-ml-highlight-card h3{
                  font-size:14px;
                  margin:0 0 4px;
                  color:#0f172a;
                }
                .ai-ml-highlight-card p{
                  font-size:13px;
                  margin:0;
                  color:#4b5563;
                }
                
                /* representation "image" block */
                .ai-ml-highlights-visual{
                  display:flex;
                  justify-content:center;
                }
                .ai-ml-dashboard{
                  width:100%;
                  max-width:340px;
                  background:#ffffff;
                  border-radius:20px;
                  padding:14px 14px 18px;
                  box-shadow:0 18px 40px rgba(37,99,235,.25);
                  position:relative;
                  overflow:hidden;
                }
                .ai-ml-dashboard-header{
                  display:flex;
                  justify-content:space-between;
                  align-items:center;
                  margin-bottom:10px;
                  font-size:12px;
                  color:#0f172a;
                }
                .ai-ml-dashboard-dots{
                  display:flex;
                  gap:4px;
                }
                .ai-ml-dashboard-dots span{
                  width:7px;
                  height:7px;
                  border-radius:999px;
                  background:#e5e7eb;
                }
                .ai-ml-dashboard-graph{
                  display:flex;
                  gap:6px;
                  align-items:flex-end;
                  height:90px;
                  margin-bottom:12px;
                }
                .ai-ml-dashboard-bar{
                  flex:1;
                  border-radius:8px 8px 2px 2px;
                  background:linear-gradient(180deg,#38bdf8,#1d4ed8);
                }
                .ai-ml-dashboard-bar:nth-child(2){height:55%;}
                .ai-ml-dashboard-bar:nth-child(3){height:80%;}
                .ai-ml-dashboard-bar:nth-child(4){height:40%;}
                .ai-ml-dashboard-bar:nth-child(5){height:70%;}
                .ai-ml-dashboard-bar:nth-child(1){height:30%;}
                .ai-ml-dashboard-tags{
                  display:flex;
                  flex-wrap:wrap;
                  gap:6px;
                  font-size:11px;
                }
                .ai-ml-dashboard-tags span{
                  padding:3px 7px;
                  border-radius:999px;
                  background:#eff6ff;
                  color:#1d4ed8;
                }
                
                /* === TOOLS SECTION (logos of tools used) === */
                .ai-ml-tools{
                  background:#e0f2fe;
                  padding:0 20px 50px;
                }
                .ai-ml-tools-inner{
                  max-width:1160px;
                  margin:0 auto;
                  text-align:center;
                }
                .ai-ml-tools-inner h2{
                  font-size:20px;
                  margin:0 0 6px;
                  color:#0f172a;
                }
                .ai-ml-tools-inner p{
                  margin:0 0 20px;
                  font-size:14px;
                  color:#4b5563;
                }
                .ai-ml-tools-grid{
                  display:flex;
                  flex-wrap:wrap;
                  justify-content:center;
                  gap:16px;
                }
                .ai-ml-tools-card{
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
                .ai-ml-tools-logo{
                  max-height:36px;
                  max-width:90px;
                  margin-bottom:4px;
                }
                .ai-ml-tools-card span{
                  font-size:12px;
                  color:#111827;
                }
                
                /* === MORE COURSE DETAILS SECTION (roles, journey, mini-images) === */
                .ai-ml-more{
                  background:#e0f2fe;
                  padding:0 20px 50px;
                }
                .ai-ml-more-inner{
                  max-width:1160px;
                  margin:0 auto;
                }
                .ai-ml-more-header{
                  text-align:center;
                  margin-bottom:20px;
                }
                .ai-ml-more-header h2{
                  font-size:20px;
                  margin:0 0 6px;
                  color:#0f172a;
                }
                .ai-ml-more-header p{
                  margin:0;
                  font-size:14px;
                  color:#4b5563;
                }
                .ai-ml-more-grid{
                  display:grid;
                  grid-template-columns:repeat(3,minmax(0,1fr));
                  gap:18px;
                }
                .ai-ml-more-card{
                  background:#ffffff;
                  border-radius:18px;
                  padding:16px 14px;
                  box-shadow:0 12px 30px rgba(15,23,42,.12);
                  display:flex;
                  flex-direction:column;
                  gap:8px;
                }
                .ai-ml-more-top{
                  display:flex;
                  align-items:flex-start;
                  gap:8px;
                }
                .ai-ml-more-icon{
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
                .ai-ml-more-title{
                  font-size:15px;
                  font-weight:600;
                  margin:0;
                  color:#0f172a;
                }
                .ai-ml-more-text{
                  font-size:13px;
                  color:#4b5563;
                  margin:0;
                }
                
                /* Centered, small tool logos in tools card */
                .ai-ml-tool-logos{
                  margin-top:12px;
                  display:flex;
                  flex-wrap:wrap;
                  gap:10px;
                  align-items:center;
                  justify-content:center; /* center horizontally */
                  width:100%;
                }
                .ai-ml-tool-logo{
                  max-height:32px;
                  width:auto;
                  filter:drop-shadow(0 2px 4px rgba(15,23,42,.18));
                }
                .ai-ml-tool-logos img{
                  max-height:32px !important;
                  width:auto !important;
                  object-fit:contain;
                }
                
                .ai-ml-roles-image{
                  margin-top:8px;
                  display:flex;
                  flex-wrap:wrap;
                  gap:6px;
                }
                .ai-ml-role-tag{
                  padding:4px 8px;
                  border-radius:999px;
                  font-size:11px;
                  background:#eff6ff;
                  color:#1d4ed8;
                }
                .ai-ml-journey{
                  margin-top:8px;
                  border-left:2px solid #bfdbfe;
                  padding-left:10px;
                }
                .ai-ml-journey-step{
                  position:relative;
                  padding-left:10px;
                  margin-bottom:6px;
                  font-size:12px;
                  color:#4b5563;
                }
                .ai-ml-journey-step::before{
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
                .ai-ml-enquiry{
                  background:linear-gradient(135deg,#dbeafe,#e0f2fe);
                  padding:40px 20px 50px;
                }
                .ai-ml-enquiry-inner{
                  max-width:900px;
                  margin:0 auto;
                }
                .ai-ml-enquiry-card{
                  background:#ffffff;
                  border-radius:22px;
                  padding:24px 22px 18px;
                  box-shadow:0 18px 40px rgba(37,99,235,.2);
                  border-top:4px solid #38bdf8;
                }
                .ai-ml-enquiry-header{
                  display:flex;
                  align-items:flex-start;
                  gap:10px;
                  margin-bottom:10px;
                }
                .ai-ml-enquiry-icon{
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
                .ai-ml-enquiry-title{
                  font-size:18px;
                  font-weight:700;
                  margin:0;
                  color:#0f172a;
                }
                .ai-ml-enquiry-text{
                  font-size:14px;
                  color:#4b5563;
                  margin:2px 0 12px;
                }
                
                /* RESPONSIVE */
                @media (max-width:900px){
                  .ai-ml-hero{padding:50px 18px;}
                  .fs-hero-title{font-size:48px;}
                  .ai-ml-main-inner{
                    grid-template-columns:minmax(0,1fr);
                  }
                  .ai-ml-highlights-inner{
                    grid-template-columns:minmax(0,1fr);
                  }
                  .ai-ml-more-grid{
                    grid-template-columns:minmax(0,1fr);
                  }
                }
                @media (max-width:640px){
                  .ai-ml-hero{padding:38px 16px;}
                  .ai-ml-hero-meta{flex-direction:column;}
                  .ai-ml-highlight-grid{
                    grid-template-columns:minmax(0,1fr);
                  }
                }
            `}</style>

      {/* HERO */}
      <Section className="ai-ml-hero ai-ml-section">
        <div className="flex flex-col md:flex-row justify-between items-start max-w-[1200px] mx-auto w-full gap-8">
          <div className="ai-ml-hero-content">
            <span className="ai-ml-badge">Artificial Intelligence</span>
            <h1 className="fs-hero-title">
              Master AI &amp; Machine Learning: From Fundamentals to Professional Industry Applications
            </h1>
            <p className="fs-hero-sub">
              Learn the foundations of AI, master core machine learning algorithms, and build
              production‑ready models that solve real business problems. Start from the basics
              and grow into an industry‑ready AI &amp; ML engineer.
            </p>
            <div className="ai-ml-hero-meta">
              <span>No prior ML experience required</span>
              <span>Hands‑on projects with real datasets</span>
              <span>Capstone project for your portfolio</span>
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
      <main className="ai-ml-main ai-ml-section">
        <div className="ai-ml-main-inner">

          {/* Left side */}
          <div className="ai-ml-left">

            {/* About */}
            <Section className="ai-ml-card">
              <h2>About This Course</h2>
              <div className="ai-ml-about-text">
                <p className="mb-4">
                  This Artificial Intelligence and Machine Learning course takes you from Python fundamentals and essential math concepts to building real-world AI solutions. You will learn how machine learning algorithms work, how to prepare and analyze data, and how to evaluate, optimize, and improve model performance.
                </p>
                <p className="mb-6">
                  As you progress, you will work with supervised and unsupervised learning, deep learning, computer vision, and basic NLP applications. By the end of this AI and ML certification course, you will complete several end-to-end projects and be ready for industry-level Artificial Intelligence and Machine Learning roles.
                </p>
                
                <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">What You Will Achieve in This AI & ML Program</h3>
                <p className="mb-4">
                  Build strong AI and Machine Learning skills, work on live industry projects, and become job-ready for top career opportunities in Data Science and Artificial Intelligence.
                </p>

                <div className="space-y-4 mt-4">
                  <div>
                    <strong className="text-slate-800 block">Deep Conceptual Clarity</strong>
                    Understand Artificial Intelligence and Machine Learning algorithms in depth so you can analyze, optimize, and explain models with confidence in real-world projects.
                  </div>
                  
                  <div>
                    <strong className="text-slate-800 block">Hands on Coding Skills</strong>
                    Learn Python programming, use NumPy and Pandas for data analysis, and build Machine Learning models using Scikit-learn, TensorFlow, and industry-standard tools.
                  </div>
                  
                  <div>
                    <strong className="text-slate-800 block">Real-World Projects</strong>
                    Work with real-world datasets, build and evaluate Machine Learning models, deploy them as APIs, and create portfolio-ready projects that showcase your AI and Data Science skills.
                  </div>
                  
                  <div>
                    <strong className="text-slate-800 block">Industry Applications</strong>
                    Explore how Artificial Intelligence is used in healthcare, finance, e-commerce, digital marketing, automation, and modern business decision-making.
                  </div>
                  
                  <div>
                    <strong className="text-slate-800 block">Expert Mentorship and Learning Community</strong>
                    Get live mentor support, doubt-clearing sessions, career guidance, and peer learning to stay motivated and confident throughout your AI learning journey.
                  </div>
                </div>
              </div>
            </Section>

            {/* Syllabus */}
            <Section className="ai-ml-card">
              <h2>Syllabus Covered</h2>

              <div className="flex flex-col gap-4">
                {[
                  {
                    label: "Module 1",
                    title: "Foundations of AI & Python",
                    content: (
                      <ul>
                        <li>Introduction to AI, ML and industry use-cases</li>
                        <li>Python essentials for data & ML (NumPy, Pandas, Matplotlib)</li>
                        <li>Statistics & linear algebra for ML intuition</li>
                        <li>Exploratory Data Analysis (EDA) on real datasets</li>
                      </ul>
                    )
                  },
                  {
                    label: "Module 2",
                    title: "Core Machine Learning Algorithms",
                    content: (
                      <ul>
                        <li>Regression & classification models (LR, k-NN, trees, forests)</li>
                        <li>Model evaluation & cross-validation</li>
                        <li>Feature engineering, scaling and handling missing data</li>
                        <li>Unsupervised learning: clustering & dimensionality reduction</li>
                      </ul>
                    )
                  },
                  {
                    label: "Module 3",
                    title: "Deep Learning & Neural Networks",
                    content: (
                      <ul>
                        <li>Neural network basics & backpropagation</li>
                        <li>Building models with TensorFlow / Keras</li>
                        <li>Image classification with CNNs</li>
                        <li>Intro to NLP and word embeddings</li>
                      </ul>
                    )
                  },
                  {
                    label: "Module 4",
                    title: "Industry Applications & Capstone",
                    content: (
                      <ul>
                        <li>Case studies from finance, healthcare and e-commerce</li>
                        <li>End-to-end ML pipeline: data, training, deployment</li>
                        <li>Serving models via simple REST APIs & MLOps basics</li>
                        <li>Capstone project: design, build and present an AI solution</li>
                      </ul>
                    )
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`ai-ml-module ${activeModule === idx ? 'open' : ''}`}
                    onClick={() => setActiveModule(activeModule === idx ? null : idx)}
                  >
                    <div className="summary">
                      <div className="ai-ml-module-title">
                        <span className="ai-ml-module-label">{item.label}</span>
                        <span>{item.title}</span>
                      </div>
                    </div>
                    {activeModule === idx && (
                      <div className="ai-ml-module-content">
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Right side */}
          <aside className="ai-ml-right">
            <Section className="ai-ml-card">
              <h2>Course Details</h2>
              <ul className="ai-ml-detail-list">
                <li className="ai-ml-detail-item">
                  <div className="ai-ml-detail-icon"><Clock size={20} /></div>
                  <div className="ai-ml-detail-text">
                    <strong>Duration</strong>
                    <span>16 Weeks (120+ hours of guided learning)</span>
                  </div>
                </li>
                <li className="ai-ml-detail-item">
                  <div className="ai-ml-detail-icon"><BarChart2 size={20} /></div>
                  <div className="ai-ml-detail-text">
                    <strong>Skill Level</strong>
                    <span>Beginner to Intermediate (basic coding helpful)</span>
                  </div>
                </li>
                <li className="ai-ml-detail-item">
                  <div className="ai-ml-detail-icon"><Users size={20} /></div>
                  <div className="ai-ml-detail-text">
                    <strong>Includes</strong>
                    <span>Live mentorship, doubt sessions &amp; projects</span>
                  </div>
                </li>
                <li className="ai-ml-detail-item">
                  <div className="ai-ml-detail-icon"><Calendar size={20} /></div>
                  <div className="ai-ml-detail-text">
                    <strong>Next Batch</strong>
                    <span>Batch Completed - Next Batch Coming Soon</span>
                  </div>
                </li>
                <li className="ai-ml-detail-item">
                  <div className="ai-ml-detail-icon"><Award size={20} /></div>
                  <div className="ai-ml-detail-text">
                    <strong>Certificate</strong>
                    <span>Industry‑recognized completion certificate</span>
                  </div>
                </li>
              </ul>

              <a 
                href={`${USER_APP_URL}/signin`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ai-ml-cta-btn"
              >
                Enroll Now &amp; Start Learning
              </a>
            </Section>
          </aside>

        </div>
      </main>

      {/* TOP COMPANIES */}
      <Section className="ai-ml-companies ai-ml-section">
        <div className="ai-ml-companies-inner">
          <h2>Top Companies Hiring for AI &amp; ML Roles</h2>
          <p>Skills from this course are in demand across leading global technology and IT services companies.</p>
          <div className="ai-ml-logo-row">
            <div className="ai-ml-logo-card">
              <img src={googleLogo} alt="Google" />
            </div>
            <div className="ai-ml-logo-card">
              <img src={microsoftLogo} alt="Microsoft" />
            </div>
            <div className="ai-ml-logo-card">
              <img src={awsLogo} alt="Amazon Web Services" />
            </div>
            <div className="ai-ml-logo-card">
              <img src={ibmLogo} alt="IBM" />
            </div>
            <div className="ai-ml-logo-card">
              <img src={metaLogo} alt="Meta" />
            </div>
            <div className="ai-ml-logo-card">
              <img src={netflixLogo} alt="Netflix" />
            </div>
            <div className="ai-ml-logo-card">
              <img src={infosysLogo} alt="Infosys" />
            </div>
            <div className="ai-ml-logo-card">
              <img src={accentureLogo} alt="Accenture" />
            </div>
          </div>
        </div>
      </Section>

      {/* EXTRA COURSE DETAILS SECTION (ACHIEVEMENTS) */}
      <Section className="ai-ml-highlights ai-ml-section">
        <div className="ai-ml-highlights-inner">
          <div>
            <div className="ai-ml-highlights-heading">
              <h2>What You Will Achieve in This AI &amp; ML Program</h2>
              <p>Gain strong foundations, build real products, and become job‑ready for data‑driven roles.</p>
            </div>

            <div className="ai-ml-highlight-grid">
              <div className="ai-ml-highlight-card">
                <div className="ai-ml-highlight-icon"><Brain size={24} /></div>
                <h3>Deep Conceptual Clarity</h3>
                <p>Understand how algorithms work under the hood so you can debug, tune and explain your models with confidence.</p>
              </div>
              <div className="ai-ml-highlight-card">
                <div className="ai-ml-highlight-icon"><Code size={24} /></div>
                <h3>Hands‑on Coding Skills</h3>
                <p>Write clean Python, use Pandas &amp; NumPy effectively, and implement ML pipelines using Scikit‑learn &amp; TensorFlow.</p>
              </div>
              <div className="ai-ml-highlight-card">
                <div className="ai-ml-highlight-icon"><BarChart2 size={24} /></div>
                <h3>Real‑World Projects</h3>
                <p>Work with messy, real datasets, deploy models as APIs, and document projects that you can showcase in your portfolio.</p>
              </div>
              <div className="ai-ml-highlight-card">
                <div className="ai-ml-highlight-icon"><Rocket size={24} /></div>
                <h3>Career‑Ready Profile</h3>
                <p>Prepare for roles like Data Scientist, ML Engineer and AI Analyst with interview‑oriented practice and guidance.</p>
              </div>
              <div className="ai-ml-highlight-card">
                <div className="ai-ml-highlight-icon"><Globe size={24} /></div>
                <h3>Industry Applications</h3>
                <p>Explore AI use‑cases in finance, healthcare, e‑commerce, marketing and more to understand how ML is used in business.</p>
              </div>
              <div className="ai-ml-highlight-card">
                <div className="ai-ml-highlight-icon">🤝</div>
                <h3>Mentorship &amp; Community</h3>
                <p>Get mentor feedback, doubt support and peer interaction so you never feel stuck while learning.</p>
              </div>
            </div>
          </div>

          {/* Visual representation */}
          <div className="ai-ml-highlights-visual">
            <div className="ai-ml-dashboard">
              <div className="ai-ml-dashboard-header">
                <span>AI Model Performance</span>
                <div className="ai-ml-dashboard-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
              <div className="ai-ml-dashboard-graph">
                <div className="ai-ml-dashboard-bar"></div>
                <div className="ai-ml-dashboard-bar"></div>
                <div className="ai-ml-dashboard-bar"></div>
                <div className="ai-ml-dashboard-bar"></div>
                <div className="ai-ml-dashboard-bar"></div>
              </div>
              <div className="ai-ml-dashboard-tags">
                <span>Accuracy ↑</span>
                <span>Precision</span>
                <span>Recall</span>
                <span>ROC‑AUC</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* TOOLS USED IN THE COURSE (LOGOS) */}
      <Section className="ai-ml-tools ai-ml-section">
        <div className="ai-ml-tools-inner">
          <h2>Tools &amp; Platforms You Will Use</h2>
          <p>Get hands‑on experience with the most widely used tools in data science, machine learning and modern software development.</p>

          <div className="ai-ml-tools-grid">
            <div className="ai-ml-tools-card">
              <img className="ai-ml-tools-logo" src={pythonLogo} alt="Python" />
              <span>Python</span>
            </div>
            <div className="ai-ml-tools-card">
              <img className="ai-ml-tools-logo" src={jupyterLogo} alt="Jupyter Notebook" />
              <span>Jupyter Notebook</span>
            </div>
            <div className="ai-ml-tools-card">
              <img className="ai-ml-tools-logo" src={vscodeLogo} alt="VS Code" />
              <span>VS Code</span>
            </div>
            <div className="ai-ml-tools-card">
              <img className="ai-ml-tools-logo" src={gitLogo} alt="Git" />
              <span>Git</span>
            </div>
            <div className="ai-ml-tools-card">
              <img className="ai-ml-tools-logo" src={githubLogo} alt="GitHub" />
              <span>GitHub</span>
            </div>
            <div className="ai-ml-tools-card">
              <img className="ai-ml-tools-logo" src={numpyLogo} alt="NumPy" />
              <span>NumPy</span>
            </div>
            <div className="ai-ml-tools-card">
              <img className="ai-ml-tools-logo" src={pandasLogo} alt="Pandas" />
              <span>Pandas</span>
            </div>
            <div className="ai-ml-tools-card">
              <img className="ai-ml-tools-logo" src={matplotlibLogo} alt="Matplotlib" />
              <span>Matplotlib</span>
            </div>
            <div className="ai-ml-tools-card">
              <img className="ai-ml-tools-logo" src={scikitLogo} alt="Scikit-learn" />
              <span>Scikit‑learn</span>
            </div>
            <div className="ai-ml-tools-card">
              <img className="ai-ml-tools-logo" src={tensorflowLogo} alt="TensorFlow" />
              <span>TensorFlow / Keras</span>
            </div>
          </div>
        </div>
      </Section>

      {/* MORE COURSE DETAILS WITH ICONS + MINI IMAGES */}
      <Section className="ai-ml-more ai-ml-section">
        <div className="ai-ml-more-inner">
          <div className="ai-ml-more-header">
            <h2>Course Tools, Roles &amp; Learning Journey</h2>
            <p>See the ecosystem you will work with, the roles this course prepares you for, and how your learning path progresses.</p>
          </div>

          <div className="ai-ml-more-grid">
            {/* Card 1: Tools overview */}
            <div className="ai-ml-more-card">
              <div className="ai-ml-more-top">
                <div className="ai-ml-more-icon">🛠</div>
                <div>
                  <h3 className="ai-ml-more-title">Tools &amp; Libraries You Will Master</h3>
                  <p className="ai-ml-more-text">
                    Work with industry‑standard tools for data analysis, classical ML, and deep learning so you can contribute to real projects.
                  </p>
                </div>
              </div>
              <div className="ai-ml-tool-logos">
                <img className="ai-ml-tool-logo" src={pythonLogo} alt="Python" />
                <img className="ai-ml-tool-logo" src={scikitLogo} alt="Scikit-learn" />
                <img className="ai-ml-tool-logo" src={tensorflowLogo} alt="TensorFlow" />
              </div>
            </div>

            {/* Card 2: Roles */}
            <div className="ai-ml-more-card">
              <div className="ai-ml-more-top">
                <div className="ai-ml-more-icon">🎯</div>
                <div>
                  <h3 className="ai-ml-more-title">Career Roles You Can Target</h3>
                  <p className="ai-ml-more-text">
                    Build a portfolio and skill set that maps directly to high‑growth AI &amp; data‑driven job roles across industries.
                  </p>
                </div>
              </div>
              <div className="ai-ml-roles-image">
                <span className="ai-ml-role-tag">Junior Data Scientist</span>
                <span className="ai-ml-role-tag">Machine Learning Engineer</span>
                <span className="ai-ml-role-tag">AI Engineer</span>
                <span className="ai-ml-role-tag">Business Analytics Engineer</span>
                <span className="ai-ml-role-tag">ML Ops Associate</span>
              </div>
            </div>

            {/* Card 3: Journey */}
            <div className="ai-ml-more-card">
              <div className="ai-ml-more-top">
                <div className="ai-ml-more-icon">📚</div>
                <div>
                  <h3 className="ai-ml-more-title">Your Learning Journey</h3>
                  <p className="ai-ml-more-text">
                    A guided path from fundamentals to deployment, with checkpoints to track your progress and confidence.
                  </p>
                </div>
              </div>
              <div className="ai-ml-journey">
                <div className="ai-ml-journey-step">Weeks 1–4: Python, maths &amp; data handling fundamentals</div>
                <div className="ai-ml-journey-step">Weeks 5–8: Core ML algorithms, evaluation &amp; feature engineering</div>
                <div className="ai-ml-journey-step">Weeks 9–12: Deep learning, CNNs &amp; basic NLP applications</div>
                <div className="ai-ml-journey-step">Weeks 13–16: Capstone project, model deployment &amp; interview prep</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

    </div>
  );
};

export default AiMlCourse;

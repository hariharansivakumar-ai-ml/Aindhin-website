import{r as b,j as a,Z as o,h as m,B as g,U as n,m as f}from"./index-CNPlR82y.js";import{t as l,e as d}from"./tableau-BqyTYkv8.js";import{m as c}from"./mysql-7K1F7UL4.js";import{p as u}from"./python-tool-CpWvS2Y_.js";import{G as j,M as N,I as v,A as y}from"./accenture-CZDg06F8.js";import{a as w,m as T,n as k}from"./netflix-C7QiyEPS.js";import{I as z}from"./infosys-HQ5x-L0e.js";import{D as C}from"./database-D3RRRJGD.js";import{C as x}from"./calculator-DqEfp78D.js";import{R as h}from"./rocket-BDchlV3V.js";import{C as S}from"./calendar-Cy6ozri1.js";import{A as L}from"./award-CHSr1Gdt.js";import{P as D}from"./pie-chart-K6Wmf283.js";import{B as p}from"./book-open-D-vd3Fit.js";import{B as I}from"./briefcase-5bGEfUzW.js";import{T as A}from"./target-CCUJ1Ibg.js";import{u as E}from"./use-in-view-DYOJ3GBj.js";const B="/assets/tableau-hero-K7b325kK.webp",e=({children:t,className:r})=>{const s=b.useRef(null),i=E(s,{once:!0,margin:"-100px"});return a.jsx(f.div,{ref:s,initial:{opacity:0,y:24},animate:i?{opacity:1,y:0}:{opacity:0,y:24},transition:{duration:.7,ease:"easeOut"},className:r,children:t})},Z=()=>{const[t,r]=b.useState(0);return a.jsxs("div",{className:"tab-course font-sans text-slate-900 bg-blue-50 w-full overflow-x-hidden",children:[a.jsx("style",{children:`
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
                url("${B}")
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
            `}),a.jsxs("div",{className:"tab-course",id:"top",children:[a.jsx(e,{className:"tab-hero tab-section",children:a.jsxs("div",{className:"tab-hero-content",children:[a.jsx("span",{className:"tab-badge",children:"Tableau"}),a.jsx("h1",{className:"fs-hero-title",children:"Tableau – Data Visualization & Business Intelligence"}),a.jsx("p",{className:"fs-hero-sub",children:"Learn to connect data, build powerful dashboards and share interactive visual stories with Tableau. Go from first worksheet to enterprise‑style BI reporting in a single, project‑driven program."}),a.jsxs("div",{className:"tab-hero-meta",children:[a.jsx("span",{children:"Covers Tableau Desktop, Prep & Tableau Cloud basics"}),a.jsx("span",{children:"No prior BI experience required (Excel helpful)"}),a.jsx("span",{children:"Capstone Tableau dashboard for your portfolio"})]})]})}),a.jsx("main",{className:"tab-main tab-section",children:a.jsxs("div",{className:"tab-main-inner",children:[a.jsxs("div",{className:"tab-left",children:[a.jsxs(e,{className:"tab-card",children:[a.jsx("h2",{children:"About This Course"}),a.jsxs("div",{className:"tab-about-text",children:[a.jsx("p",{children:"This course teaches Tableau from the ground up. You will learn how to connect to spreadsheets and databases, prepare and join data, and build insightful worksheets, dashboards and stories."}),a.jsx("p",{children:"Along the way you will master calculations, parameters, level‑of‑detail (LOD) expressions and dashboard actions that make your reports feel like interactive products. You’ll finish with a polished Tableau project you can walk through in job interviews."})]})]}),a.jsxs(e,{className:"tab-card",children:[a.jsx("h2",{children:"Syllabus Covered"}),a.jsx("div",{className:"flex flex-col gap-4",children:[{label:"Module 1",title:"Tableau Basics & Data Connections",content:a.jsxs("ul",{children:[a.jsx("li",{children:"Tableau product family: Desktop, Prep, Server/Cloud"}),a.jsx("li",{children:"Connecting to Excel, CSV and database sources"}),a.jsx("li",{children:"Joins, unions & data blending concepts"}),a.jsx("li",{children:"Dimensions vs measures, discrete vs continuous"}),a.jsx("li",{children:"Building your first worksheets & simple dashboards"})]}),icon:a.jsx(C,{className:"w-5 h-5 text-blue-600"})},{label:"Module 2",title:"Visual Analytics & Calculations",content:a.jsxs("ul",{children:[a.jsx("li",{children:"Choosing the right chart for the question"}),a.jsx("li",{children:"Table calculations, quick calculations & percent of total"}),a.jsx("li",{children:"Calculated fields, parameters & conditional formatting"}),a.jsx("li",{children:"Level-of-Detail (LOD) expressions (FIXED, INCLUDE, EXCLUDE)"}),a.jsx("li",{children:"Date, cohort & funnel style analyses in Tableau"})]}),icon:a.jsx(x,{className:"w-5 h-5 text-blue-600"})},{label:"Module 3",title:"Dashboards, Stories & Interactivity",content:a.jsxs("ul",{children:[a.jsx("li",{children:"Designing dashboard layouts for different screen sizes"}),a.jsx("li",{children:"Filters, highlight actions & dashboard actions"}),a.jsx("li",{children:'Using parameters for "what-if" and scenario analysis'}),a.jsx("li",{children:"Building Tableau Stories for step-by-step narratives"}),a.jsx("li",{children:"Performance tips & dashboard UX best practices"})]}),icon:a.jsx(o,{className:"w-5 h-5 text-blue-600"})},{label:"Module 4",title:"Publishing, Sharing & Capstone Project",content:a.jsxs("ul",{children:[a.jsx("li",{children:"Publishing to Tableau Public & Tableau Cloud/Server"}),a.jsx("li",{children:"Permissions, projects & managing data refresh"}),a.jsx("li",{children:"Embedding dashboards in presentations & portals"}),a.jsx("li",{children:"Storytelling with Tableau dashboards for executives"}),a.jsx("li",{children:"Capstone: full Tableau BI solution from raw data to final story"})]}),icon:a.jsx(h,{className:"w-5 h-5 text-blue-600"})}].map((s,i)=>a.jsxs("div",{className:`tab-module ${t===i?"open":""}`,onClick:()=>r(t===i?null:i),children:[a.jsx("div",{className:"summary",children:a.jsxs("div",{className:"tab-module-title",children:[a.jsx("span",{className:"mr-2 flex items-center",children:s.icon}),a.jsx("span",{className:"tab-module-label",children:s.label}),a.jsx("span",{children:s.title})]})}),t===i&&a.jsx("div",{className:"tab-module-content",children:s.content})]},i))})]})]}),a.jsx("aside",{className:"tab-right",children:a.jsxs(e,{className:"tab-card",children:[a.jsx("h2",{children:"Course Details"}),a.jsxs("ul",{className:"tab-detail-list",children:[a.jsxs("li",{className:"tab-detail-item",children:[a.jsx("div",{className:"tab-detail-icon",children:a.jsx(m,{size:20})}),a.jsxs("div",{className:"tab-detail-text",children:[a.jsx("strong",{children:"Duration"}),a.jsx("span",{children:"8 Weeks (45+ hours of practical Tableau training)"})]})]}),a.jsxs("li",{className:"tab-detail-item",children:[a.jsx("div",{className:"tab-detail-icon",children:a.jsx(g,{size:20})}),a.jsxs("div",{className:"tab-detail-text",children:[a.jsx("strong",{children:"Skill Level"}),a.jsx("span",{children:"Beginner to Intermediate – basic Excel/analytics helpful"})]})]}),a.jsxs("li",{className:"tab-detail-item",children:[a.jsx("div",{className:"tab-detail-icon",children:a.jsx(n,{size:20})}),a.jsxs("div",{className:"tab-detail-text",children:[a.jsx("strong",{children:"Includes"}),a.jsx("span",{children:"Live labs, project reviews, DAX‑equivalent calculations & Q&A"})]})]}),a.jsxs("li",{className:"tab-detail-item",children:[a.jsx("div",{className:"tab-detail-icon",children:a.jsx(S,{size:20})}),a.jsxs("div",{className:"tab-detail-text",children:[a.jsx("strong",{children:"Next Batch"}),a.jsx("span",{children:"23 Dec 2025 (new Tableau batches every month)"})]})]}),a.jsxs("li",{className:"tab-detail-item",children:[a.jsx("div",{className:"tab-detail-icon",children:a.jsx(L,{size:20})}),a.jsxs("div",{className:"tab-detail-text",children:[a.jsx("strong",{children:"Certificate"}),a.jsx("span",{children:"Completion certificate + portfolio‑ready Tableau dashboards"})]})]})]}),a.jsx("a",{href:"#top",className:"tab-cta-btn",children:"Enroll Now & Start Learning"})]})})]})}),a.jsx(e,{className:"tab-companies tab-section",children:a.jsxs("div",{className:"tab-companies-inner",children:[a.jsx("h2",{children:"Top Companies Using Tableau for BI & Analytics"}),a.jsx("p",{children:"Tableau is a leading BI tool used by data‑driven teams in technology, finance, retail and consulting."}),a.jsxs("div",{className:"tab-logo-row",children:[a.jsx("div",{className:"tab-logo-card",children:a.jsx("img",{src:j,alt:"Google"})}),a.jsx("div",{className:"tab-logo-card",children:a.jsx("img",{src:N,alt:"Microsoft"})}),a.jsx("div",{className:"tab-logo-card",children:a.jsx("img",{src:w,alt:"AWS"})}),a.jsx("div",{className:"tab-logo-card",children:a.jsx("img",{src:v,alt:"IBM"})}),a.jsx("div",{className:"tab-logo-card",children:a.jsx("img",{src:T,alt:"Meta"})}),a.jsx("div",{className:"tab-logo-card",children:a.jsx("img",{src:k,alt:"Netflix"})}),a.jsx("div",{className:"tab-logo-card",children:a.jsx("img",{src:z,alt:"Infosys"})}),a.jsx("div",{className:"tab-logo-card",children:a.jsx("img",{src:y,alt:"Accenture"})})]})]})}),a.jsx(e,{className:"tab-highlights tab-section",children:a.jsxs("div",{className:"tab-highlights-inner",children:[a.jsxs("div",{children:[a.jsxs("div",{className:"tab-highlights-heading",children:[a.jsx("h2",{children:"What You Will Achieve in This Tableau Program"}),a.jsx("p",{children:"Become confident designing, analyzing and presenting insights in Tableau Desktop and Tableau Cloud."})]}),a.jsxs("div",{className:"tab-highlight-grid",children:[a.jsxs("div",{className:"tab-highlight-card",children:[a.jsx("div",{className:"tab-highlight-icon",children:a.jsx(D,{size:24})}),a.jsx("h3",{children:"Visual Analytics Expertise"}),a.jsx("p",{children:"Understand how to visually explore data with filters, sets, groups and advanced chart types."})]}),a.jsxs("div",{className:"tab-highlight-card",children:[a.jsx("div",{className:"tab-highlight-icon",children:a.jsx(x,{size:24})}),a.jsx("h3",{children:"Powerful Calculations"}),a.jsx("p",{children:"Use calculated fields, table calcs and LOD expressions to answer complex business questions."})]}),a.jsxs("div",{className:"tab-highlight-card",children:[a.jsx("div",{className:"tab-highlight-icon",children:a.jsx(o,{size:24})}),a.jsx("h3",{children:"Interactive Dashboards"}),a.jsx("p",{children:"Design multi‑page dashboards with drill‑downs, actions and responsive layouts."})]}),a.jsxs("div",{className:"tab-highlight-card",children:[a.jsx("div",{className:"tab-highlight-icon",children:a.jsx(p,{size:24})}),a.jsx("h3",{children:"Compelling Stories"}),a.jsx("p",{children:"Use Tableau Stories and presentations to walk stakeholders through your insights end‑to‑end."})]}),a.jsxs("div",{className:"tab-highlight-card",children:[a.jsx("div",{className:"tab-highlight-icon",children:a.jsx(h,{size:24})}),a.jsx("h3",{children:"Deployable BI Solutions"}),a.jsx("p",{children:"Publish to Tableau Public or Tableau Cloud/Server and configure scheduled refreshes."})]}),a.jsxs("div",{className:"tab-highlight-card",children:[a.jsx("div",{className:"tab-highlight-icon",children:a.jsx(n,{size:24})}),a.jsx("h3",{children:"Mentor Support"}),a.jsx("p",{children:"Get feedback on dashboard UX, performance and storytelling from BI practitioners."})]})]})]}),a.jsx("div",{className:"tab-highlights-visual",children:a.jsxs("div",{className:"tab-dashboard",children:[a.jsxs("div",{className:"tab-dashboard-header",children:[a.jsx("span",{children:"Tableau Sales Overview"}),a.jsxs("div",{className:"tab-dashboard-dots",children:[a.jsx("span",{}),a.jsx("span",{}),a.jsx("span",{})]})]}),a.jsxs("div",{className:"tab-dashboard-graph",children:[a.jsx("div",{className:"tab-dashboard-bar"}),a.jsx("div",{className:"tab-dashboard-bar"}),a.jsx("div",{className:"tab-dashboard-bar"}),a.jsx("div",{className:"tab-dashboard-bar"}),a.jsx("div",{className:"tab-dashboard-bar"})]}),a.jsxs("div",{className:"tab-dashboard-tags",children:[a.jsx("span",{children:"Revenue"}),a.jsx("span",{children:"Profit"}),a.jsx("span",{children:"Regions"}),a.jsx("span",{children:"Top Customers"})]})]})})]})}),a.jsx(e,{className:"tab-tools tab-section",children:a.jsxs("div",{className:"tab-tools-inner",children:[a.jsx("h2",{children:"Tools & Platforms You Will Use"}),a.jsx("p",{children:"Focus on Tableau and the key tools commonly paired with it in modern analytics stacks."}),a.jsxs("div",{className:"tab-tools-grid",children:[a.jsxs("div",{className:"tab-tools-card",children:[a.jsx("img",{className:"tab-tools-logo",src:l,alt:"Tableau"}),a.jsx("span",{children:"Tableau Desktop"})]}),a.jsxs("div",{className:"tab-tools-card",children:[a.jsx("img",{className:"tab-tools-logo",src:l,alt:"Tableau Cloud"}),a.jsx("span",{children:"Tableau Cloud / Server"})]}),a.jsxs("div",{className:"tab-tools-card",children:[a.jsx("img",{className:"tab-tools-logo",src:d,alt:"Excel"}),a.jsx("span",{children:"Excel / CSV Sources"})]}),a.jsxs("div",{className:"tab-tools-card",children:[a.jsx("img",{className:"tab-tools-logo",src:c,alt:"MySQL"}),a.jsx("span",{children:"SQL Databases"})]}),a.jsxs("div",{className:"tab-tools-card",children:[a.jsx("img",{className:"tab-tools-logo",src:u,alt:"Python"}),a.jsx("span",{children:"Python (optional data prep)"})]})]})]})}),a.jsx(e,{className:"tab-more tab-section",children:a.jsxs("div",{className:"tab-more-inner",children:[a.jsxs("div",{className:"tab-more-header",children:[a.jsx("h2",{children:"Roles & Learning Journey"}),a.jsx("p",{children:"See how this Tableau course maps to common BI roles and how your skills progress week by week."})]}),a.jsxs("div",{className:"tab-more-grid",children:[a.jsxs("div",{className:"tab-more-card",children:[a.jsxs("div",{className:"tab-more-top",children:[a.jsx("div",{className:"tab-more-icon",children:a.jsx(I,{size:20})}),a.jsxs("div",{children:[a.jsx("h3",{className:"tab-more-title",children:"Tableau Toolset"}),a.jsx("p",{className:"tab-more-text",children:"Use Tableau Desktop for visual analytics, Tableau Cloud/Server for sharing and scheduling, and Excel/SQL for sources."})]})]}),a.jsxs("div",{className:"tab-tool-logos",children:[a.jsx("img",{className:"tab-tool-logo",src:l,alt:"Tableau"}),a.jsx("img",{className:"tab-tool-logo",src:d,alt:"Excel"}),a.jsx("img",{className:"tab-tool-logo",src:c,alt:"MySQL"})]})]}),a.jsxs("div",{className:"tab-more-card",children:[a.jsxs("div",{className:"tab-more-top",children:[a.jsx("div",{className:"tab-more-icon",children:a.jsx(A,{size:20})}),a.jsxs("div",{children:[a.jsx("h3",{className:"tab-more-title",children:"Career Roles You Can Target"}),a.jsx("p",{className:"tab-more-text",children:"Position yourself for Tableau‑focused analytics and BI roles across industries."})]})]}),a.jsxs("div",{className:"tab-roles-image",children:[a.jsx("span",{className:"tab-role-tag",children:"Tableau Developer"}),a.jsx("span",{className:"tab-role-tag",children:"BI / Reporting Analyst"}),a.jsx("span",{className:"tab-role-tag",children:"Data Visualization Specialist"}),a.jsx("span",{className:"tab-role-tag",children:"Product / Marketing Analyst"}),a.jsx("span",{className:"tab-role-tag",children:"Analytics Consultant"})]})]}),a.jsxs("div",{className:"tab-more-card",children:[a.jsxs("div",{className:"tab-more-top",children:[a.jsx("div",{className:"tab-more-icon",children:a.jsx(p,{size:20})}),a.jsxs("div",{children:[a.jsx("h3",{className:"tab-more-title",children:"Your 8‑Week Learning Journey"}),a.jsx("p",{className:"tab-more-text",children:"A focused path from first Tableau worksheet to complete BI story."})]})]}),a.jsxs("div",{className:"tab-journey",children:[a.jsx("div",{className:"tab-journey-step",children:"Weeks 1–2: Tableau basics, connections & first dashboards"}),a.jsx("div",{className:"tab-journey-step",children:"Weeks 3–4: Visual analytics, calculations & LOD expressions"}),a.jsx("div",{className:"tab-journey-step",children:"Weeks 5–6: Advanced dashboards, actions & stories"}),a.jsx("div",{className:"tab-journey-step",children:"Weeks 7–8: Publishing, Tableau Cloud & capstone project"})]})]})]})]})})]})]})};export{Z as default};

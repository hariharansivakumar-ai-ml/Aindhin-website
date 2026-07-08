import DataHeroImg from '../../assets/data_analytics.webp';
import ExcelLogo from '../../assets/office_365_logo.webp';
import PowerBILogo from '../../assets/power_bi_logo.svg';
import TableauLogo from '../../assets/tableau_logo.webp';
import PythonLogo from '../../assets/python_logo.svg';
import RLogo from '../../assets/r_logo.svg';
import MySQLLogo from '../../assets/mysql_logo.svg';
import JupyterLogo from '../../assets/jupyter_logo.svg';
import PandasLogo from '../../assets/pandas_logo.svg';

import AccentureLogo from '../../assets/accenture_logo.svg';
import DeloitteLogo from '../../assets/deloitte_logo.svg';
import InfosysLogo from '../../assets/infosys_logo.svg';
import WiproLogo from '../../assets/wipro_logo.svg';
import TCSLogo from '../../assets/tcs_logo.svg';
import IBMLogo from '../../assets/ibm_logo.svg';
import GoogleLogo from '../../assets/google_logo.svg';
import AmazonLogo from '../../assets/amazon_logo.webp';

import {
    BarChart, PieChart, Database, TrendingUp, Search, FileText, Globe, Server, CheckCircle,
    Clock, Users, Target, Briefcase, Award, Map, Brain, Calendar
} from 'lucide-react';

export const dataAnalyticsData = {
    hero: {
        badge: "Data Analytics Course",
        title: "Uncover Insights: Master Data Analytics &amp; Business Intelligence",
        subtitle: "Master the art of turning raw data into actionable insights. Learn Excel, SQL, Power BI / Tableau and Python / R to analyse trends, build dashboards and drive business decisions.",
        meta: [
            "Key topics: Excel, SQL, Statistics, Python/R, Power BI / Tableau, Storytelling",
            "Professional Course · Duration as per institution (often 4–6 months)",
            "Beginner‑friendly · Ideal for students & working professionals · 4.8 / 5 learner feedback"
        ],
        bgImage: DataHeroImg,
        enrollLink: null // Based on original file which just had a "#top" link
    },
    about: [
        "This Data Analytics Course takes you from a beginner to a job‑ready analyst. You will start with the fundamentals of data handling using Excel and SQL, move into statistical analysis and programming with Python or R, and finally master data visualisation with Power BI or Tableau.",
        "The curriculum focuses on solving real business problems. You will work on case studies from retail, finance and marketing, learning how to clean data, uncover patterns and present your findings effectively to stakeholders. By the end, you’ll have a portfolio of dashboards and analysis projects.",
        "By the end of this course, learners will be able to:\n• Understand the fundamentals of data analytics.\n• Collect and organize data from different sources.\n• Perform basic data cleaning in Excel.\n• Create simple charts and visualizations.\n• Extract basic insights and make data-driven decisions."
    ],
    syllabus: {
        title: "Syllabus Overview",
        modules: [
            {
                title: "Module 1: Introduction to Data Analytics",
                icon: Search,
                topics: [
                    "Chapter 1.1: What is Data Analytics?",
                    "• Understanding data",
                    "• Importance of data analytics",
                    "• Real-world examples",
                    "Chapter 1.2: Types of Data",
                    "• Structured and unstructured data",
                    "• Quantitative and qualitative data"
                ]
            },
            {
                title: "Module 2: Data Collection and Data Sources",
                icon: Database,
                topics: [
                    "Chapter 2.1: Where Data Comes From",
                    "• Surveys, websites, applications, and business records",
                    "Chapter 2.2: Introduction to Data Formats",
                    "• Excel files & CSV files",
                    "• Databases (basic overview)"
                ]
            },
            {
                title: "Module 3: Working with Data in Excel",
                icon: FileText,
                topics: [
                    "Chapter 3.1: Excel Basics for Data Analysis",
                    "• Rows and columns",
                    "• Sorting and filtering",
                    "• Basic formulas",
                    "Chapter 3.2: Cleaning Data",
                    "• Removing duplicates",
                    "• Handling missing values",
                    "• Formatting data"
                ]
            },
            {
                title: "Module 4: Data Visualization Basics",
                icon: BarChart,
                topics: [
                    "Chapter 4.1: Understanding Charts and Graphs",
                    "• Bar charts, pie charts, and line charts",
                    "Chapter 4.2: Creating Visual Reports",
                    "• Choosing the right chart",
                    "• Presenting insights clearly"
                ]
            },
            {
                title: "Module 5: Introduction to Data-Driven Decision Making",
                icon: TrendingUp,
                topics: [
                    "Chapter 5.1: Finding Insights from Data",
                    "• Identifying trends",
                    "• Understanding patterns",
                    "Chapter 5.2: Career Opportunities in Data Analytics",
                    "• Data Analyst role & required skills",
                    "• Learning roadmap & future steps"
                ]
            }
        ]
    },
    details: [
        {
            icon: Clock,
            label: "Course Type & Duration",
            value: "Data Analytics Course · Duration as per institution (often 4–6 months, classroom / online / blended)."
        },
        {
            icon: Calendar,
            label: "Course Starts",
            value: "1 July 2026"
        },
        {
            icon: Clock,
            label: "Class Timing",
            value: "5.30 PM to 6.30 PM"
        },
        {
            icon: Users,
            label: "Eligibility",
            value: "Any graduate / final‑year student / working professional. No prior coding experience required (logic & math basics helpful)."
        },
        {
            icon: Target,
            label: "Focus Areas",
            value: "Excel for analytics, SQL querying, statistical thinking, Python/R basics and visualisation (Power BI / Tableau)."
        },
        {
            icon: Briefcase,
            label: "Ideal For",
            value: "Students and professionals wanting to become Data Analysts, Business Analysts or MI Reporting Specialists."
        },
        {
            icon: Award,
            label: "Learner Feedback",
            value: "4.8 / 5 average rating (comprehensive curriculum, hands‑on projects & practical applicability)."
        }
    ],
    companies: {
        title: "Top Companies Hiring Data Analysts",
        subtitle: "From tech giants to consulting firms, every industry needs data professionals.",
        logos: [
            { src: AccentureLogo, alt: "Accenture" },
            { src: DeloitteLogo, alt: "Deloitte" },
            { src: InfosysLogo, alt: "Infosys" },
            { src: WiproLogo, alt: "Wipro" },
            { src: IBMLogo, alt: "IBM" },
            { src: GoogleLogo, alt: "Google" },
            { src: AmazonLogo, alt: "Amazon" },
            { src: TCSLogo, alt: "TCS" }
        ]
    },
    highlights: {
        title: "What You Will Gain from This Data Analytics Course",
        subtitle: "Develop a complete toolkit to extract value from data.",
        cards: [
            {
                icon: BarChart,
                title: "Data Fluency",
                description: "Understand data types, structures and how to handle dirty or missing data."
            },
            {
                icon: Database,
                title: "SQL Skills",
                description: "Write efficient queries to extract and manipulate data from relational databases."
            },
            {
                icon: TrendingUp,
                title: "Strong Statistical Base",
                description: "Build a clear understanding of descriptive and inferential statistics for data‑driven decisions."
            },
            {
                icon: PieChart,
                title: "Visual Storytelling",
                description: "Create compelling dashboards in Power BI or Tableau that stakeholders can understand."
            },
            {
                icon: Search,
                title: "Analytical Thinking",
                description: "Learn how to approach business problems and ask the right questions of your data."
            },
            {
                icon: Briefcase,
                title: "Job Readiness",
                description: "Build a project portfolio that demonstrates your ability to deliver insights."
            }
        ],
        dashboard: {
            title: "Sales Performance Dashboard",
            tags: ["Revenue", "Units", "Growth", "Region"]
        }
    },
    tools: {
        title: "Tools & Platforms You May Work With",
        subtitle: "Become proficient in the industry‑standard stack for data analysis.",
        tools: [
            { logo: ExcelLogo, name: "Microsoft Excel (Advanced)" },
            { logo: MySQLLogo, name: "SQL (MySQL / PostgreSQL)" },
            { logo: PowerBILogo, name: "Microsoft Power BI" },
            { logo: TableauLogo, name: "Tableau" },
            { logo: PythonLogo, name: "Python" },
            { logo: PandasLogo, name: "Pandas & NumPy" },
            { logo: RLogo, name: "R Programming" },
            { logo: JupyterLogo, name: "Jupyter Notebooks" }
        ]
    },
    careers: {
        title: "Careers & Learning Journey",
        subtitle: "See how this Data Analytics Course builds your skills and prepares you for data careers.",
        cards: [
            {
                icon: Target,
                title: "From Data to Decisions",
                description: "Move from basic spreadsheets to advanced querying, programming and visualisation to solve complex business problems.",
                type: "logos",
                logos: [
                    { src: ExcelLogo, alt: "Excel" },
                    { src: MySQLLogo, alt: "SQL" },
                    { src: PowerBILogo, alt: "Power BI" }
                ]
            },
            {
                icon: Briefcase,
                title: "Career Roles You Can Target",
                description: "Use your course projects to showcase your skills for entry‑level data roles.",
                type: "tags",
                tags: [
                    "Junior Data Analyst",
                    "Business Analyst",
                    "MI / Reporting Analyst",
                    "Operations Analyst",
                    "Data Quality Associate",
                    "Pathway to Data Science roles"
                ]
            },
            {
                icon: Map,
                title: "Your Learning Journey",
                description: "A clear module‑wise roadmap from data fundamentals to advanced visualisation.",
                type: "journey",
                steps: [
                    "Module 1: Excel mastery, data cleaning & statistical basics.",
                    "Module 2: SQL querying, database concepts & data extraction.",
                    "Module 3: Visualisation (Power BI/Tableau), Python/R intro & capstone."
                ]
            }
        ]
    }
};

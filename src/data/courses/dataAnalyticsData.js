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
    Clock, Users, Target, Briefcase, Award, Map, Brain
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
        "The curriculum focuses on solving real business problems. You will work on case studies from retail, finance and marketing, learning how to clean data, uncover patterns and present your findings effectively to stakeholders. By the end, you’ll have a portfolio of dashboards and analysis projects."
    ],
    syllabus: {
        title: "Syllabus Overview",
        modules: [
            {
                title: "Module 1: Excel & Statistics Fundamentals",
                icon: BarChart,
                topics: [
                    "Introduction to Data Analytics – types of analysis, roles & tools",
                    "Advanced Excel – Pivot Tables, VLOOKUP, XLOOKUP, conditional formatting",
                    "Data Cleaning & Preparation in Excel",
                    "Descriptive Statistics – mean, median, mode, variance, standard deviation",
                    "Inferential Statistics Concepts – hypothesis testing, distributions (intro)",
                    "Hands‑on: Analysing a sales dataset using Excel"
                ]
            },
            {
                title: "Module 2: SQL & Data Management",
                icon: Database,
                topics: [
                    "Relational Database Concepts – tables, keys, relationships",
                    "SQL Basics – SELECT, FROM, WHERE, ORDER BY, LIMIT",
                    "SQL Joins – INNER, LEFT, RIGHT, FULL joins explained",
                    "Aggregations & Grouping – GROUP BY, HAVING, aggregate functions",
                    "Subqueries & Common Table Expressions (CTEs)",
                    "Hands‑on: Querying a customer database to answer business questions"
                ]
            },
            {
                title: "Module 3: Python/R & Visualisation (Power BI / Tableau)",
                icon: PieChart,
                topics: [
                    "Introduction to Python / R for Data Analysis (basics of Pandas/NumPy)",
                    "Exploratory Data Analysis (EDA) – identifying trends & outliers",
                    "Data Visualisation Principles – choosing the right chart",
                    "Introduction to Power BI or Tableau – loading data & creating visuals",
                    "Building Interactive Dashboards & Stories",
                    "Hands‑on: Creating a marketing performance dashboard"
                ],
                note: "*Tool focus (Python/R, Power BI/Tableau) may vary as per institution and curriculum."
            },
            {
                title: "Projects: Case Studies & Capstone",
                icon: Brain,
                topics: [
                    "Retail Analysis: Identifying top‑selling products and customer segments",
                    "Finance: Understanding credit risk (exploratory analysis)",
                    "Social Media: Analysing engagement metrics",
                    "Capstone Project: End‑to‑end analysis from raw data to dashboard & insights",
                    "Portfolio preparation & interview prep"
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

import CyberHeroImg from '../../assets/cyber_security_hero.webp';
import IBMLogo from '../../assets/ibm_logo.svg';
import CiscoLogo from '../../assets/cisco_logo.svg';
import PaloAltoLogo from '../../assets/palo_alto_logo.webp';
import DeloitteLogo from '../../assets/deloitte_logo.svg';
import EYLogo from '../../assets/ey_logo.svg';
import TCSLogo from '../../assets/tcs_logo.svg';
import WiproLogo from '../../assets/wipro_logo.svg';
import MicrosoftLogo from '../../assets/microsoft_logo.svg';
import LinuxLogo from '../../assets/linux_logo.svg';
import WiresharkLogo from '../../assets/wireshark_logo.webp';
import NmapLogo from '../../assets/nmap_logo.webp';
import KaliLogo from '../../assets/kali_linux_logo.svg';
import SplunkLogo from '../../assets/splunk_logo.webp';
import PythonLogo from '../../assets/python_logo.svg';
import MySQLLogo from '../../assets/mysql_logo.svg';
import GitHubLogo from '../../assets/github_logo.svg';

import {
    Shield, Lock, Eye, AlertTriangle, Terminal, FileText, Globe, Server, UserCheck,
    Clock, Users, Target, Briefcase, Award, Map, Activity, ArrowUpRight, Calendar
} from 'lucide-react';

export const cyberSecurityData = {
    hero: {
        badge: "Cyber Security Course",
        title: "Protect the Digital Frontier: Master Cyber Security &amp; Ethical Hacking",
        subtitle: "Learn how to protect systems, networks and data from cyber threats. Build skills in network security, ethical hacking basics, incident response, security operations and best practices used by modern organisations.",
        meta: [
            "Key topics: Networking, OS Concepts, Ethical Hacking, SOC, Incident Response, Tools",
            "Professional Course · Duration as per institution (often 4–6 months)",
            "Beginner‑friendly · Ideal for students & working professionals · 4.7 / 5 learner feedback"
        ],
        bgImage: CyberHeroImg,
        enrollLink: "https://user.aindhin.com/course/AD-944b67c3bbf11c6a037beb11b0c1ada8"
    },
    about: [
        "This Cyber Security Course helps you master the fundamentals of network security, ethical hacking, system protection, SOC operations, and incident response. You will learn how cyber attacks happen and how to defend systems, networks, and data using real-world security practices.",
        "The course starts with networking and operating system basics and progresses into ethical hacking basics, vulnerability assessment, secure configuration and incident response. Through hands-on labs, you will work with real security tools, analyze logs, and simulate attacks in a safe environment.",
        "By the end of this cyber security program, you will gain practical skills and a strong portfolio to apply for entry-level roles like SOC Analyst, Security Analyst, and IT Security Engineer, or pursue advanced cybersecurity certifications."
    ],
    syllabus: {
        title: "Syllabus Overview",
        modules: [
            {
                title: "Module 1: Security Fundamentals & Networking Basics",
                icon: Shield,
                topics: [
                    "Introduction to Cyber Security – CIA triad, threat landscape, terminology",
                    "Computer Networks – OSI/TCP‑IP models, IP, ports, protocols",
                    "Operating Systems Basics (Windows & Linux) for Security",
                    "Fundamentals of Cryptography – encryption, hashing, keys (concepts)",
                    "Security Policies, Access Control & Authentication Concepts",
                    "Lab: Exploring network traffic & system logs (intro with tools)"
                ]
            },
            {
                title: "Module 2: Ethical Hacking Basics & System Security",
                icon: Eye,
                topics: [
                    "Introduction to Ethical Hacking & Penetration Testing Phases",
                    "Reconnaissance & Scanning – information gathering, Nmap basics",
                    "Vulnerability Assessment – common weaknesses & misconfigurations",
                    "System & Network Hardening – secure configuration practices",
                    "Web Application Basics & Common Attacks (OWASP Top 10 – overview)",
                    "Lab: Simple vulnerability scan & reporting in a controlled environment"
                ]
            },
            {
                title: "Module 3: Security Operations, Monitoring & Incident Response",
                icon: Activity,
                topics: [
                    "Security Operations Centre (SOC) – roles, processes & tools",
                    "Log Analysis & SIEM Fundamentals – detecting suspicious activity",
                    "Incident Response Lifecycle – preparation, detection, containment, recovery",
                    "Malware & Phishing Basics – prevention and user awareness",
                    "Cloud & Endpoint Security – key considerations (overview)",
                    "Compliance & Standards – basics of ISO 27001, PCI‑DSS, GDPR (concepts)",
                ],
                note: "*Exact modules and tools may vary as per institution and curriculum."
            },
            {
                title: "Projects: Labs, Case Studies & Mini‑Projects",
                icon: Terminal,
                topics: [
                    "Hands‑on labs for network scanning, log analysis and basic hardening",
                    "Mini‑project: Secure configuration of a small network / system setup",
                    "Case study: Analysing a real‑world breach and writing an incident report",
                    "Optional mini CTF‑style exercises in a safe lab environment",
                    "Portfolio preparation – documenting your labs and mini‑projects"
                ]
            }
        ]
    },
    details: [
        {
            icon: Clock,
            label: "Course Type & Duration",
            value: "Cyber Security Course · Duration as per institution (commonly 4–6 months, classroom / online / blended)."
        },
        {
            icon: Calendar,
            label: "Course Starts",
            value: "Batch Completed - Next Batch Coming Soon"
        },
        {
            icon: Users,
            label: "Eligibility",
            value: "Any graduate / final‑year student / working professional with basic computer skills. Comfort with networking & OS concepts is helpful but not mandatory."
        },
        {
            icon: Target,
            label: "Focus Areas",
            value: "Security fundamentals, networking, ethical hacking basics, system hardening, SOC operations and incident response."
        },
        {
            icon: Briefcase,
            label: "Ideal For",
            value: "Students and professionals planning careers as security analyst, SOC analyst, penetration tester (junior) or IT security engineer."
        },
        {
            icon: Award,
            label: "Learner Feedback",
            value: "4.7 / 5 average rating (practical labs, tool exposure, instructor support & career guidance)."
        }
    ],
    companies: {
        title: "Top Sectors Hiring Cyber Security Professionals",
        subtitle: "Cyber security skills are needed across IT services, BFSI, telecom, consulting, government and startups.",
        logos: [
            { src: IBMLogo, alt: "IBM Security" },
            { src: CiscoLogo, alt: "Cisco" },
            { src: PaloAltoLogo, alt: "Palo Alto Networks" },
            { src: DeloitteLogo, alt: "Deloitte" },
            { src: EYLogo, alt: "EY" },
            { src: TCSLogo, alt: "TCS" },
            { src: WiproLogo, alt: "Wipro" },
            { src: MicrosoftLogo, alt: "Microsoft" }
        ]
    },
    highlights: {
        title: "What You Will Gain from This Cyber Security Course",
        subtitle: "Develop the mindset and skills to detect, prevent and respond to cyber threats.",
        cards: [
            {
                icon: Shield,
                title: "Security Foundations",
                description: "Get clarity on core security principles, threats, vulnerabilities and controls."
            },
            {
                icon: Globe,
                title: "Network & OS Knowledge",
                description: "Understand how networks and systems work so you can secure and monitor them."
            },
            {
                icon: Eye,
                title: "Ethical Hacking Basics",
                description: "Learn how attackers think and operate, within legal and ethical boundaries."
            },
            {
                icon: UserCheck,
                title: "Defensive Skills",
                description: "Practise hardening systems, analysing logs and responding to incidents."
            },
            {
                icon: Terminal,
                title: "Tool Literacy",
                description: "Gain hands‑on experience with widely‑used security tools and platforms."
            },
            {
                icon: Award,
                title: "Career Readiness",
                description: "Build a portfolio of labs and projects aligned with entry‑level security roles."
            }
        ],
        dashboard: {
            title: "Security Events Snapshot",
            tags: ["Alerts", "Blocked", "Incidents", "Systems"]
        }
    },
    tools: {
        title: "Tools & Platforms You May Work With",
        subtitle: "Become familiar with essential cybersecurity tools used in SOCs and security teams.",
        tools: [
            { logo: LinuxLogo, name: "Linux (Security‑focused)" },
            { logo: WiresharkLogo, name: "Wireshark (packet analysis)" },
            { logo: NmapLogo, name: "Nmap (network scanning)" },
            { logo: KaliLogo, name: "Kali Linux (toolset)" },
            { logo: SplunkLogo, name: "Splunk (SIEM / logging)" },
            { logo: PythonLogo, name: "Python (scripting)" },
            { logo: MySQLLogo, name: "Databases & Logs" },
            { logo: GitHubLogo, name: "Git & GitHub (repositories)" }
        ]
    },
    careers: {
        title: "Careers & Learning Journey",
        subtitle: "See how this Cyber Security Course builds your skills and prepares you for security careers.",
        cards: [
            {
                icon: Target,
                title: "From Fundamentals to Practical Skills",
                description: "Move from basic security concepts and networking to hands‑on labs with real tools used by security analysts and ethical hackers.",
                type: "logos",
                logos: [
                    { src: WiresharkLogo, alt: "Wireshark" },
                    { src: NmapLogo, alt: "Nmap" },
                    { src: KaliLogo, alt: "Kali Linux" }
                ]
            },
            {
                icon: Briefcase,
                title: "Career Roles You Can Target",
                description: "Use your course projects and labs to build a profile for entry‑level security roles.",
                type: "tags",
                tags: [
                    "Security Analyst / SOC Analyst (Level 1)",
                    "Information Security Associate",
                    "Junior Penetration Tester (with further practice)",
                    "Network / System Administrator (Security‑focused)",
                    "IT Support with Cyber Security Responsibilities",
                    "Pathway to Certifications (CEH, CompTIA Security+, etc.)"
                ]
            },
            {
                icon: Map,
                title: "Your Learning Journey",
                description: "A clear module‑wise roadmap from fundamentals to operations and incident response.",
                type: "journey",
                steps: [
                    "Module 1: Security & networking basics, OS concepts, threat awareness.",
                    "Module 2: Ethical hacking basics, vulnerability assessment & hardening.",
                    "Module 3: SOC operations, log analysis, incident response & mini‑projects."
                ]
            }
        ]
    }
};

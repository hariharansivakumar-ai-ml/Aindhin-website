import CloudHeroImg from '../../assets/cloud_computing.webp';
import AWSLogo from '../../assets/aws_logo.svg';
import AzureLogo from '../../assets/azure_logo.svg';
import GoogleCloudLogo from '../../assets/google_cloud_logo.svg';
import IBMLogo from '../../assets/ibm_logo.svg';
import AccentureLogo from '../../assets/accenture_logo.svg';
import DeloitteLogo from '../../assets/deloitte_logo.svg';
import TCSLogo from '../../assets/tcs_logo.svg';
import WiproLogo from '../../assets/wipro_logo.svg';
import DockerLogo from '../../assets/docker_logo.webp';
import KubernetesLogo from '../../assets/kubernetes_logo.svg';
import LinuxLogo from '../../assets/linux_logo.svg';
import MySQLLogo from '../../assets/mysql_logo.svg';
import GitHubLogo from '../../assets/github_logo.svg';

import {
    Cloud, Server, Shield, Activity, Terminal, Layers, TrendingUp,
    Clock, Users, Target, Briefcase, Award, Map, CheckCircle
} from 'lucide-react';

export const cloudComputingData = {
    hero: {
        badge: "Cloud Computing Course",
        title: "Scale Your Career in the Cloud: Master AWS, Azure &amp; Google Cloud",
        subtitle: "Learn the fundamentals of cloud computing, AWS / Azure / Google Cloud, virtualisation, networking, storage, security and DevOps basics. Build the skills to deploy and manage applications in the cloud.",
        meta: [
            "Key topics: Cloud Basics, AWS / Azure / GCP, Networking, Storage, Security, DevOps",
            "Professional Course · Duration as per institution (often 3–6 months)",
            "Beginner‑friendly · Ideal for students & working professionals · 4.6 / 5 learner feedback"
        ],
        bgImage: CloudHeroImg,
        enrollLink: "https://user.aindhin.com/course/AD-944b67c3bbf11c65037beb11b0c1ada8"
    },
    about: [
        "This Cloud Computing Course introduces you to the core concepts, services and architectures that power modern cloud platforms. You will understand how public, private and hybrid clouds work, and how leading providers like AWS, Azure and Google Cloud deliver compute, storage, networking and security services.",
        "Through hands‑on labs and guided projects, you will work with real cloud consoles, deploy virtual machines, configure networks, set up storage, manage identities and apply basic automation. By the end of the course, you’ll be comfortable reading architecture diagrams, using key cloud services and preparing for entry‑level cloud and DevOps roles or certifications."
    ],
    syllabus: {
        title: "Syllabus Overview",
        modules: [
            {
                title: "Module 1: Cloud Basics & Core Services",
                icon: Cloud,
                topics: [
                    "Introduction to Cloud Computing – concepts, models (IaaS, PaaS, SaaS)",
                    "Public, Private & Hybrid Cloud – when and why they are used",
                    "Overview of AWS, Microsoft Azure & Google Cloud Platform (GCP)",
                    "Compute Services – virtual machines, auto‑scaling, containers (intro)",
                    "Storage Services – object, block & file storage basics",
                    "Hands‑on: Creating a free‑tier account and launching your first VM"
                ]
            },
            {
                title: "Module 2: Networking, Security & Identity",
                icon: Shield,
                topics: [
                    "Cloud Networking Fundamentals – VPC / VNet, subnets, IPs & routing",
                    "Load Balancers, Gateways & Content Delivery Networks (CDN)",
                    "Cloud Security Basics – shared responsibility model",
                    "Identity & Access Management (IAM) – users, roles & policies",
                    "Monitoring, Logging & Cost Management fundamentals",
                    "Hands‑on: Secure access to instances and configure basic network rules"
                ]
            },
            {
                title: "Module 3: DevOps Basics, Automation & Cloud Architectures",
                icon: Activity,
                topics: [
                    "Introduction to DevOps & CI/CD in the Cloud",
                    "Infrastructure as Code (IaC) concepts – templates & automation",
                    "Containers & Orchestration Basics (Docker & Kubernetes overview)",
                    "Common Cloud Architectures – 3‑tier apps, serverless (concepts)",
                    "Cost Optimisation, High Availability & Scalability principles",
                    "Hands‑on: Deploy a simple web app with basic automation"
                ],
                note: "*Exact modules and cloud provider focus may vary as per institution and curriculum."
            },
            {
                title: "Projects: Hands‑on Labs & Mini‑Projects",
                icon: Terminal,
                topics: [
                    "Lab exercises to deploy and manage VMs, storage, networks and IAM",
                    "Mini‑project: Host a static / simple dynamic website on the cloud",
                    "Mini‑project: Build a basic 3‑tier cloud architecture with load balancer",
                    "Case study: Cost‑optimising an existing cloud setup",
                    "Optional: Mapping course work to entry‑level cloud certification paths"
                ]
            }
        ]
    },
    details: [
        {
            icon: Clock,
            label: "Course Type & Duration",
            value: "Cloud Computing Course · Duration as per institution (commonly 3–6 months, classroom / online / blended)."
        },
        {
            icon: Users,
            label: "Eligibility",
            value: "Any graduate / final‑year student / working professional with basic computer and networking awareness. IT / CS background is helpful but not mandatory."
        },
        {
            icon: Target,
            label: "Focus Areas",
            value: "Cloud fundamentals, AWS / Azure / GCP services, networking, security, DevOps basics and architectures."
        },
        {
            icon: Briefcase,
            label: "Ideal For",
            value: "Students and professionals aiming for cloud, DevOps, site reliability or infrastructure roles, or preparing for cloud certifications."
        },
        {
            icon: Award,
            label: "Learner Feedback",
            value: "4.6 / 5 average rating (industry‑relevant content, practical labs & certification alignment)."
        }
    ],
    companies: {
        title: "Top Sectors Using Cloud Computing",
        subtitle: "Cloud skills are in demand across IT services, product companies, startups, BFSI, healthcare and more.",
        logos: [
            { src: AWSLogo, alt: "AWS" },
            { src: AzureLogo, alt: "Microsoft Azure" },
            { src: GoogleCloudLogo, alt: "Google Cloud" },
            { src: IBMLogo, alt: "IBM Cloud" },
            { src: AccentureLogo, alt: "Accenture" },
            { src: DeloitteLogo, alt: "Deloitte" },
            { src: TCSLogo, alt: "TCS" },
            { src: WiproLogo, alt: "Wipro" }
        ]
    },
    highlights: {
        title: "What You Will Gain from This Cloud Computing Course",
        subtitle: "Develop the practical skills and confidence to work with leading cloud platforms.",
        cards: [
            {
                icon: Cloud,
                title: "Cloud Fundamentals",
                description: "Understand core cloud concepts, service models and deployment models clearly."
            },
            {
                icon: Server,
                title: "Service Knowledge",
                description: "Learn how compute, storage, networking and security services work on AWS / Azure / GCP."
            },
            {
                icon: Shield,
                title: "Networking & Security",
                description: "Configure VPC / VNet, subnets, firewalls and IAM for secure cloud setups."
            },
            {
                icon: Activity,
                title: "DevOps Basics",
                description: "Get introduced to CI/CD, containers and automation for modern cloud deployments."
            },
            {
                icon: Layers,
                title: "Architecture Thinking",
                description: "Read and design simple cloud architectures with high availability and scalability."
            },
            {
                icon: TrendingUp,
                title: "Career Readiness",
                description: "Prepare for entry‑level cloud / DevOps roles and map your path to certifications."
            }
        ],
        dashboard: {
            title: "Cloud Resource Monitoring Snapshot",
            tags: ["CPU", "Memory", "Traffic", "Cost"]
        }
    },
    tools: {
        title: "Tools & Platforms You May Work With",
        subtitle: "Become familiar with the core cloud and DevOps tools used in modern IT teams.",
        tools: [
            { logo: AWSLogo, name: "AWS (Amazon Web Services)" },
            { logo: AzureLogo, name: "Microsoft Azure" },
            { logo: GoogleCloudLogo, name: "Google Cloud Platform" },
            { logo: DockerLogo, name: "Docker (containers)" },
            { logo: KubernetesLogo, name: "Kubernetes (overview)" },
            { logo: LinuxLogo, name: "Linux & Shell Basics" },
            { logo: MySQLLogo, name: "MySQL / Cloud Databases" },
            { logo: GitHubLogo, name: "Git & GitHub" }
        ]
    },
    careers: {
        title: "Careers & Learning Journey",
        subtitle: "See how this Cloud Computing Course builds your skills and prepares you for cloud & DevOps careers.",
        cards: [
            {
                icon: Target,
                title: "Cloud Skills from Zero to Practical",
                description: "Move from basic concepts to hands‑on use of key services and simple architectures on major cloud platforms.",
                type: "logos",
                logos: [
                    { src: AWSLogo, alt: "AWS" },
                    { src: AzureLogo, alt: "Azure" },
                    { src: GoogleCloudLogo, alt: "GCP" }
                ]
            },
            {
                icon: Briefcase,
                title: "Career Roles You Can Target",
                description: "Use your course labs and mini‑projects to build a strong entry‑level cloud profile.",
                type: "tags",
                tags: [
                    "Cloud Support Associate",
                    "Cloud Operations / SysOps Engineer (Junior)",
                    "DevOps / SRE Trainee",
                    "Infrastructure / Network Engineer (Cloud)",
                    "Junior Cloud Administrator",
                    "Pathway to Cloud Architect & Consultant roles"
                ]
            },
            {
                icon: Map,
                title: "Your Learning Journey",
                description: "A clear module‑wise roadmap from basics of cloud to DevOps concepts and projects.",
                type: "journey",
                steps: [
                    "Module 1: Cloud foundations, core services & first deployments.",
                    "Module 2: Networking, security, IAM, monitoring & cost basics.",
                    "Module 3: DevOps basics, automation, architectures & mini‑projects."
                ]
            }
        ]
    }
};

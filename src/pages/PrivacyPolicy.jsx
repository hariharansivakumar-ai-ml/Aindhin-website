import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Shield, 
    Lock, 
    Eye, 
    FileText, 
    Database, 
    UserCheck, 
    Cookie, 
    Bell, 
    HelpCircle, 
    Mail, 
    Phone, 
    MapPin, 
    Printer, 
    ChevronRight,
    CheckCircle2
} from 'lucide-react';

const sections = [
    { id: 'introduction', title: '1. Introduction & Scope' },
    { id: 'information-collected', title: '2. Information We Collect' },
    { id: 'how-collected', title: '3. How We Collect Information' },
    { id: 'how-used', title: '4. How We Use Your Information' },
    { id: 'legal-basis', title: '5. Legal Basis for Processing (DPDPA 2023)' },
    { id: 'sharing-disclosure', title: '6. Information Sharing & Disclosures' },
    { id: 'cookies-tracking', title: '7. Cookies & Tracking Technologies' },
    { id: 'data-security', title: '8. Data Security & Storage' },
    { id: 'data-retention', title: '9. Data Retention Policy' },
    { id: 'user-rights', title: '10. Your Privacy Rights & Choices' },
    { id: 'children-privacy', title: "11. Children's Privacy" },
    { id: 'third-party-links', title: '12. Third-Party Platforms & Links' },
    { id: 'updates-changes', title: '13. Updates to This Policy' },
    { id: 'grievance-contact', title: '14. Grievance Officer & Contact Us' },
];

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState('introduction');

    useEffect(() => {
        document.title = "Privacy Policy | Aindhin - Master Job-Ready Skills";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute(
                "content", 
                "Read the Aindhin Privacy Policy to understand how we collect, use, store, and protect your personal information on our online learning platform."
            );
        }
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -140; // account for sticky header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-gray-800 font-inter">
            {/* Top Hero Banner */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#EEF4FF] via-[#F8FAFC] to-white pt-10 pb-14 border-b border-gray-100">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-text mb-6">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="text-primary font-medium">Privacy Policy</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
                                <Shield className="w-3.5 h-3.5" />
                                <span>Aindhin Trust & Transparency</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-secondary tracking-tight mb-4 leading-tight">
                                Privacy Policy
                            </h1>
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                We value your trust. This Privacy Policy details how <strong className="text-gray-900 font-semibold">Aindhin</strong> collects, 
                                utilizes, secures, and safeguards your personal data when you interact with our courses, digital services, and web platform.
                            </p>
                        </div>

                        {/* Policy Metadata & Print Action */}
                        <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
                            <span className="inline-block px-3 py-1 rounded-md bg-white border border-gray-200 text-xs text-gray-600 shadow-sm">
                                <strong>Effective Date:</strong> January 1, 2026
                            </span>
                            <span className="inline-block px-3 py-1 rounded-md bg-white border border-gray-200 text-xs text-gray-600 shadow-sm">
                                <strong>Last Updated:</strong> October 12, 2026
                            </span>
                            <button
                                onClick={handlePrint}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 shadow-sm transition-colors cursor-pointer"
                                title="Print or save this policy"
                            >
                                <Printer className="w-3.5 h-3.5 text-primary" />
                                <span>Print Policy</span>
                            </button>
                        </div>
                    </div>

                    {/* Key Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-3">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold text-secondary text-sm mb-1">Data Protection</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Your information is secured with high-grade SSL/TLS encryption and strict access protocols.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-lg bg-green-50 text-emerald-600 flex items-center justify-center mb-3">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold text-secondary text-sm mb-1">Never Sold</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                We never sell, rent, or trade your personal data to third-party brokers or advertisers.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                                <UserCheck className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold text-secondary text-sm mb-1">Learner Control</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                You hold rights to access, update, review, or request deletion of your stored records.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                                <FileText className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold text-secondary text-sm mb-1">DPDPA 2023 Ready</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Fully aligned with India's Digital Personal Data Protection Act & Information Technology Act.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Layout with Sticky Table of Contents */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Sticky Sidebar Navigation (Desktop) */}
                    <aside className="lg:col-span-4 xl:col-span-3">
                        <div className="lg:sticky lg:top-36 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                                <FileText className="w-4 h-4 text-primary" />
                                <h2 className="font-bold text-secondary text-sm uppercase tracking-wider">
                                    Table of Contents
                                </h2>
                            </div>
                            <nav className="flex flex-col space-y-1 text-xs">
                                {sections.map((sec) => (
                                    <button
                                        key={sec.id}
                                        onClick={() => scrollToSection(sec.id)}
                                        className={`text-left py-2 px-3 rounded-lg transition-all flex items-center justify-between group cursor-pointer ${
                                            activeSection === sec.id
                                                ? 'bg-blue-50 text-primary font-semibold border-l-2 border-primary'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <span className="truncate">{sec.title}</span>
                                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                                            activeSection === sec.id ? 'text-primary' : 'text-gray-300 group-hover:text-gray-500'
                                        }`} />
                                    </button>
                                ))}
                            </nav>

                            {/* Need assistance box */}
                            <div className="mt-6 pt-5 border-t border-gray-100 bg-slate-50 p-4 rounded-xl">
                                <div className="flex items-center gap-2 text-secondary font-semibold text-xs mb-1">
                                    <HelpCircle className="w-4 h-4 text-primary" />
                                    <span>Have Privacy Inquiries?</span>
                                </div>
                                <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
                                    Our Data Protection and Grievance Officer is here to address any queries regarding your information.
                                </p>
                                <a 
                                    href="mailto:connect@aindhin.com"
                                    className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                                >
                                    <Mail className="w-3.5 h-3.5" />
                                    <span>connect@aindhin.com</span>
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Main Legal Documentation Content */}
                    <main className="lg:col-span-8 xl:col-span-9 bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm space-y-12">

                        {/* 1. Introduction & Scope */}
                        <section id="introduction" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    1
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    Introduction & Scope
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                                <p>
                                    Welcome to <strong className="text-gray-900">Aindhin</strong> (accessible at{' '}
                                    <a href="https://aindhin.com" className="text-primary hover:underline">https://aindhin.com</a>, 
                                    together with our mobile applications, course portals, and digital services, collectively referred to as the 
                                    <em>"Platform"</em>).
                                </p>
                                <p>
                                    Aindhin is dedicated to empowering students, working professionals, and organizations with cutting-edge 
                                    career education, technology certification programs, university degree pathways, and executive leadership 
                                    masterclasses. We understand the paramount importance of your personal privacy and are steadfast in our 
                                    commitment to maintaining the confidentiality, integrity, and security of your personal data.
                                </p>
                                <p>
                                    This Privacy Policy explains what information we gather from you when you browse our website, sign up for 
                                    a course or newsletter, submit an enquiry, enroll in learning tracks, or communicate with our team, and how 
                                    that information is handled in accordance with the applicable laws of India, including the 
                                    <strong> Digital Personal Data Protection Act, 2023 (DPDPA)</strong> and the 
                                    <strong> Information Technology Act, 2000</strong> (including the Information Technology (Reasonable Security 
                                    Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011).
                                </p>
                                <div className="bg-amber-50/70 border-l-4 border-amber-400 p-4 rounded-r-lg text-xs md:text-sm text-amber-900">
                                    <strong>Important Notice:</strong> By accessing, browsing, registering on, or using our Platform, you acknowledge 
                                    that you have read, understood, and consented to the practices and terms described in this Privacy Policy. If you do not 
                                    agree with any part of this policy, please refrain from using our Platform or submitting personal information.
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 2. Information We Collect */}
                        <section id="information-collected" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    2
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    Information We Collect
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                                <p>
                                    Depending on your interaction with the Platform, we may collect the following categories of information:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                                    <div className="border border-gray-200 rounded-xl p-5 bg-slate-50/50">
                                        <h4 className="font-semibold text-secondary text-sm mb-2 flex items-center gap-2">
                                            <UserCheck className="w-4 h-4 text-primary" />
                                            A. Personal Identification Data
                                        </h4>
                                        <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
                                            <li>Full Name</li>
                                            <li>Email Address</li>
                                            <li>Phone / WhatsApp Number</li>
                                            <li>Mailing & Billing Address</li>
                                            <li>Educational qualifications & work experience (for course eligibility)</li>
                                            <li>Government Identification / Student ID (solely where mandatory for accredited certifications)</li>
                                        </ul>
                                    </div>

                                    <div className="border border-gray-200 rounded-xl p-5 bg-slate-50/50">
                                        <h4 className="font-semibold text-secondary text-sm mb-2 flex items-center gap-2">
                                            <Database className="w-4 h-4 text-primary" />
                                            B. Academic & Learning Data
                                        </h4>
                                        <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
                                            <li>Enrolled course titles and modules completed</li>
                                            <li>Attendance records and video watch metrics</li>
                                            <li>Quiz responses, assignments, and capstone project submissions</li>
                                            <li>Instructor feedback and academic performance evaluations</li>
                                            <li>Certificates of completion and credential verification IDs</li>
                                        </ul>
                                    </div>

                                    <div className="border border-gray-200 rounded-xl p-5 bg-slate-50/50">
                                        <h4 className="font-semibold text-secondary text-sm mb-2 flex items-center gap-2">
                                            <Lock className="w-4 h-4 text-primary" />
                                            C. Billing & Transaction Data
                                        </h4>
                                        <ul className="text-xs text-gray-600 space-y-1.5">
                                            <li>Payment transaction references and timestamps</li>
                                            <li>Invoicing information and GSTIN (where provided)</li>
                                            <li className="text-[11px] text-gray-500 italic mt-2">
                                                * We never store sensitive banking credentials or credit/debit card numbers. All payments are processed through RBI-authorized payment aggregators (e.g., Razorpay / Stripe).
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="border border-gray-200 rounded-xl p-5 bg-slate-50/50">
                                        <h4 className="font-semibold text-secondary text-sm mb-2 flex items-center gap-2">
                                            <Cookie className="w-4 h-4 text-primary" />
                                            D. Technical & Usage Diagnostics
                                        </h4>
                                        <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
                                            <li>Internet Protocol (IP) address</li>
                                            <li>Device type, operating system, and browser architecture</li>
                                            <li>Pages visited, navigation clicks, and time spent on pages</li>
                                            <li>Referral sources and UTM campaign parameters</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 3. How We Collect Information */}
                        <section id="how-collected" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    3
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    How We Collect Information
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-3">
                                <p>We gather data through three primary avenues:</p>
                                <ul className="space-y-2 list-none pl-0">
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                                        <span>
                                            <strong>Direct Interactions:</strong> When you complete our Course Registration Form, Contact Us form, 
                                            subscribe to our blog newsletter, participate in surveys, or message our student counsellors.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                                        <span>
                                            <strong>Automated Systems:</strong> As you navigate through our digital assets, analytics scripts 
                                            (e.g., Google Analytics 4, Meta Pixel) log anonymous diagnostic and usage telemetry via cookies.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                                        <span>
                                            <strong>Educational & Corporate Partners:</strong> If your university or corporate employer sponsors your 
                                            enrollment, they may transmit your name and institutional email to grant program access.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 4. How We Use Your Information */}
                        <section id="how-used" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    4
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    How We Use Your Information
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-3">
                                <p>Aindhin uses the gathered data strictly for legitimate educational, operational, and commercial purposes:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                                    <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50 flex items-start gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                                        <span><strong>Course Fulfillment:</strong> Providing access to lectures, study materials, live webinars, and LMS accounts.</span>
                                    </div>
                                    <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50 flex items-start gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                                        <span><strong>Credential Generation:</strong> Authenticating and issuing verifiable completion certificates and transcripts.</span>
                                    </div>
                                    <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50 flex items-start gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                                        <span><strong>Student Support:</strong> Responding to curriculum questions, technical support tickets, and career counselling requests.</span>
                                    </div>
                                    <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50 flex items-start gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                                        <span><strong>Payment Verification:</strong> Facilitating fee payments, issuing GST-compliant tax invoices, and preventing fraudulent billing.</span>
                                    </div>
                                    <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50 flex items-start gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                                        <span><strong>Platform Enhancement:</strong> Evaluating learning patterns, page performance, and course ratings to improve course curriculum.</span>
                                    </div>
                                    <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50 flex items-start gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                                        <span><strong>Relevant Communications:</strong> Sending academic schedules, exam reminders, newsletters, and promotional announcements (opt-out available anytime).</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 5. Legal Basis for Processing */}
                        <section id="legal-basis" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    5
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    Legal Basis for Processing (DPDPA 2023)
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-3">
                                <p>
                                    Under India's Digital Personal Data Protection Act, 2023, Aindhin acts as a <em>Data Fiduciary</em>. We process personal 
                                    data only under valid legal grounds:
                                </p>
                                <ul className="list-disc list-inside space-y-1.5 text-xs md:text-sm pl-2">
                                    <li><strong>Consent:</strong> When you voluntarily submit forms, opt into newsletters, or enroll in programs.</li>
                                    <li><strong>Contractual Performance:</strong> Processing necessary to provide you with the learning services, live classes, certificates, and mentoring contracted with us.</li>
                                    <li><strong>Legitimate Uses:</strong> To safeguard network integrity, prevent fraud, debug technical errors, and maintain business accounting records.</li>
                                    <li><strong>Statutory Compliance:</strong> Compliance with applicable Indian statutory tax laws, regulatory bodies, and lawful governmental orders.</li>
                                </ul>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 6. Information Sharing & Disclosures */}
                        <section id="sharing-disclosure" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    6
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    Information Sharing & Disclosures
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-3">
                                <p>
                                    <strong className="text-gray-900">We do not sell, trade, or monetize your personal data.</strong> Information is 
                                    shared strictly on a confidential need-to-know basis with:
                                </p>
                                <div className="space-y-3 text-xs md:text-sm">
                                    <div className="p-4 rounded-xl border border-gray-200">
                                        <h4 className="font-semibold text-secondary mb-1">1. Cloud Infrastructure & Service Vendors</h4>
                                        <p className="text-gray-600">
                                            Hosting providers, cloud database facilities, email delivery engines (e.g. FormSubmit / transactional SMTP), 
                                            and customer support tools bound by strict non-disclosure obligations.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-gray-200">
                                        <h4 className="font-semibold text-secondary mb-1">2. Payment Processors</h4>
                                        <p className="text-gray-600">
                                            Authorized payment gateways process transactional billing over end-to-end PCI-DSS compliant links.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-gray-200">
                                        <h4 className="font-semibold text-secondary mb-1">3. University & Accreditation Partners</h4>
                                        <p className="text-gray-600">
                                            For UGC-aligned degree pathways or joint co-branded certifications, relevant academic progress records are 
                                            shared with the issuing university solely for verification and official diploma issuance.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-gray-200">
                                        <h4 className="font-semibold text-secondary mb-1">4. Legal Mandates & Law Enforcement</h4>
                                        <p className="text-gray-600">
                                            We may disclose records if required by court orders, warrants, or governing statutory authorities within the territory of India.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 7. Cookies & Tracking Technologies */}
                        <section id="cookies-tracking" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    7
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    Cookies & Tracking Technologies
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-3">
                                <p>
                                    Cookies are compact data files placed on your device to ensure proper site functioning and remember user preferences.
                                </p>
                                <ul className="list-disc list-inside space-y-1.5 text-xs md:text-sm pl-2">
                                    <li><strong>Essential Cookies:</strong> Required to keep user sessions authenticated and secure login tokens.</li>
                                    <li><strong>Analytics Cookies:</strong> Enabled via Google Tag Manager and Google Analytics 4 (GA4) to evaluate page traffic and load speeds.</li>
                                    <li><strong>Marketing Pixels:</strong> Meta (Facebook) Pixel tags allow us to gauge campaign effectiveness and display relevant educational recommendations.</li>
                                </ul>
                                <p className="text-xs text-gray-500 mt-2">
                                    You can modify your browser settings to refuse cookies or alert you when a cookie is placed. Note that disabling essential cookies may affect LMS or portal performance.
                                </p>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 8. Data Security & Storage */}
                        <section id="data-security" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    8
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    Data Security & Storage
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-3">
                                <p>
                                    Aindhin implements comprehensive administrative, physical, and technical safeguards complying with Section 43A of 
                                    the Information Technology Act, 2000:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
                                    <div className="bg-slate-50 p-3 rounded-lg border border-gray-200">
                                        <Lock className="w-4 h-4 text-primary mb-1" />
                                        <span className="font-semibold text-secondary block">SSL/TLS 256-Bit</span>
                                        <span className="text-gray-500">All transmissions across our website and APIs are encrypted in transit.</span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-lg border border-gray-200">
                                        <Database className="w-4 h-4 text-primary mb-1" />
                                        <span className="font-semibold text-secondary block">Role-Based Access</span>
                                        <span className="text-gray-500">Only authorized academic and administration personnel access database tiers.</span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-lg border border-gray-200">
                                        <Shield className="w-4 h-4 text-primary mb-1" />
                                        <span className="font-semibold text-secondary block">Secure Cloud Hosting</span>
                                        <span className="text-gray-500">Hosted in enterprise-grade tier-3 facilities with automated vulnerability scanning.</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 9. Data Retention Policy */}
                        <section id="data-retention" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    9
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    Data Retention Policy
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-3">
                                <p>
                                    We retain personal data only for as long as needed to satisfy the educational services you enrolled in, or as mandated 
                                    by law:
                                </p>
                                <ul className="list-disc list-inside space-y-1.5 text-xs md:text-sm pl-2">
                                    <li><strong>Active Student Profiles:</strong> Kept for the duration of your course enrollment plus credential verification availability.</li>
                                    <li><strong>Certificate Credentials:</strong> Maintained permanently to enable employers and universities to verify the legitimacy of your Aindhin certificate via unique serial IDs.</li>
                                    <li><strong>Tax & Invoice Records:</strong> Maintained for a minimum of 7 years in compliance with Indian Income Tax and GST regulations.</li>
                                    <li><strong>Unconfirmed Enquiries:</strong> Deleted or anonymized after 18 months if no enrollment follows.</li>
                                </ul>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 10. Your Privacy Rights & Choices */}
                        <section id="user-rights" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    10
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    Your Privacy Rights & Choices
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-3">
                                <p>As a data principal under applicable data protection laws, you retain rights over your personal information:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                                    <div className="border border-gray-100 p-3 rounded-lg bg-gray-50/60">
                                        <strong>• Right to Access & Review:</strong> You can request a summary of the personal data held about you.
                                    </div>
                                    <div className="border border-gray-100 p-3 rounded-lg bg-gray-50/60">
                                        <strong>• Right to Correction:</strong> Update inaccurate contact details or biographical records anytime.
                                    </div>
                                    <div className="border border-gray-100 p-3 rounded-lg bg-gray-50/60">
                                        <strong>• Right to Erasure:</strong> Request deletion of your data when it is no longer required for educational or statutory duties.
                                    </div>
                                    <div className="border border-gray-100 p-3 rounded-lg bg-gray-50/60">
                                        <strong>• Right to Withdraw Consent:</strong> Unsubscribe from marketing newsletters with one click or email us to withdraw optional permissions.
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    To exercise any of these rights, please email us at <a href="mailto:connect@aindhin.com" className="text-primary font-medium hover:underline">connect@aindhin.com</a>. We respond to verified requests within thirty (30) business days.
                                </p>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 11. Children's Privacy */}
                        <section id="children-privacy" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    11
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    Children's Privacy
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-3">
                                <p>
                                    Our standard professional certification and leadership courses are designed for adult learners, college students, 
                                    and enterprise personnel. 
                                </p>
                                <p>
                                    For programs targeted at junior learners (such as our Abacus Mental Math masterclass), enrollment must be 
                                    conducted by a parent, legal guardian, or recognized educational institution. We do not knowingly harvest 
                                    identifiable data from minors without verifiable parental or guardian consent.
                                </p>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 12. Third-Party Platforms & Links */}
                        <section id="third-party-links" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    12
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    Third-Party Platforms & External Links
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-3">
                                <p>
                                    Our Platform may contain hyperlinks to third-party tools, social media channels (e.g., LinkedIn, YouTube, 
                                    Instagram, Facebook), or official reference resources (e.g., Python.org, W3C). 
                                </p>
                                <p>
                                    Aindhin exercises no oversight over the privacy practices of external web assets. We encourage you to review 
                                    the privacy notices of every outside website you choose to visit.
                                </p>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 13. Updates to This Policy */}
                        <section id="updates-changes" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    13
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    Updates to This Policy
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-3">
                                <p>
                                    We periodically review and update this Privacy Policy to mirror improvements in our technology stack, statutory 
                                    developments, or service offerings.
                                </p>
                                <p>
                                    Any amendments will take effect upon posting the revised policy on this page, accompanied by an updated 
                                    <em> "Last Updated"</em> timestamp. For substantial shifts impacting your rights, we will provide conspicuous 
                                    notice on our home screen or via email.
                                </p>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 14. Grievance Officer & Contact Us */}
                        <section id="grievance-contact" className="scroll-mt-36">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                                    14
                                </div>
                                <h2 className="text-2xl font-bold text-secondary">
                                    Grievance Redressal & Contact Us
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                                <p>
                                    In accordance with the Information Technology Act, 2000 and the Rules formulated thereunder, as well as the 
                                    Digital Personal Data Protection Act, 2023, the details of our Grievance Redressal Officer are published below:
                                </p>

                                <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4">
                                    <div>
                                        <h4 className="font-bold text-secondary text-base mb-1">Grievance & Data Protection Officer</h4>
                                        <p className="text-xs text-gray-500">Aindhin Educational Services</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
                                        <div className="flex items-start gap-2.5">
                                            <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                            <div>
                                                <span className="font-semibold text-secondary block">Email:</span>
                                                <a href="mailto:connect@aindhin.com" className="text-primary hover:underline">connect@aindhin.com</a>
                                                <span className="text-gray-400 block text-xs">cc: info.aindhin@gmail.com</span>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2.5">
                                            <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                            <div>
                                                <span className="font-semibold text-secondary block">Phone:</span>
                                                <a href="tel:+918807100669" className="text-primary hover:underline">+91 8807100669</a>
                                                <span className="text-gray-400 block text-xs">Mon – Sat, 9:30 AM – 6:30 PM IST</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-200 text-xs">
                                        <div className="flex items-start gap-2.5">
                                            <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                            <div>
                                                <strong className="text-secondary block">Bengaluru Head Office:</strong>
                                                <span className="text-gray-600 leading-relaxed">
                                                    139, Old Airport Road, Kodihalli, Bengaluru, Bengaluru Urban, Karnataka - 560 008.
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2.5">
                                            <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                            <div>
                                                <strong className="text-secondary block">Operations Office:</strong>
                                                <span className="text-gray-600 leading-relaxed">
                                                    No. 8, Manickavasagar Colony, Eraniyan Street, Karur Bypass Road, Erode, Tamil Nadu - 638002.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Bottom Action Card */}
                        <div className="mt-8 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary to-[#1A237E] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold mb-1">
                                    Have more questions regarding your training?
                                </h3>
                                <p className="text-xs md:text-sm text-blue-100 max-w-lg leading-relaxed">
                                    Our learning advisors can assist you with course registration, certifications, and educational pathways.
                                </p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <Link
                                    to="/contact-us"
                                    className="px-5 py-2.5 bg-white text-primary hover:bg-blue-50 font-semibold text-xs md:text-sm rounded-lg shadow-sm transition-colors"
                                >
                                    Contact Us
                                </Link>
                                <Link
                                    to="/our-courses"
                                    className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs md:text-sm rounded-lg border border-white/20 transition-colors"
                                >
                                    Explore Courses
                                </Link>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;

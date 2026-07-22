import { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import SubscribePopup from './components/SubscribePopup';
import Chatbot from './components/Chatbot';
import AdminSidebar from './components/AdminSidebar';
import RecoveryBoundary from './components/RecoveryBoundary';
import AbacusCourse from './pages/AbacusCourse';
import safeLazy from './utils/safeLazy';

// Lazy Load Pages
const Home = safeLazy(() => import('./pages/Home'));
const AboutUs = safeLazy(() => import('./pages/AboutUs'));
const Services = safeLazy(() => import('./pages/Services'));
const Courses = safeLazy(() => import('./pages/Courses'));
const ContactUs = safeLazy(() => import('./pages/ContactUs'));
const DownloadApp = safeLazy(() => import('./pages/DownloadApp'));
const Blogs = safeLazy(() => import('./pages/Blogs'));
const AdminLogin = safeLazy(() => import('./pages/AdminLogin'));
const AdminDashboard = safeLazy(() => import('./pages/AdminDashboard'));
const AddBlogPost = safeLazy(() => import('./pages/AddBlogPost'));
const AllBlogs = safeLazy(() => import('./pages/AllBlogs'));
const BlogDetail = safeLazy(() => import('./pages/BlogDetail'));
const AdminEditPost = safeLazy(() => import('./pages/AdminEditPost'));
const AdminTrash = safeLazy(() => import('./pages/AdminTrash'));
const AdminDrafts = safeLazy(() => import('./pages/AdminDrafts'));
const Media = safeLazy(() => import('./pages/Media'));
const AdminComments = safeLazy(() => import('./pages/AdminComments'));
const AdminSubscribers = safeLazy(() => import('./pages/AdminSubscribers'));
const AdminAnalytics = safeLazy(() => import('./pages/AdminAnalytics'));
const AdminEnquiries = safeLazy(() => import('./pages/AdminEnquiries'));

// Course Pages
const AiMlCourse = safeLazy(() => import('./pages/AiMlCourse'));
const UniversityCourses = safeLazy(() => import('./pages/UniversityCourses'));
const LeadershipCourses = safeLazy(() => import('./pages/LeadershipCourses'));
const CorporateCourses = safeLazy(() => import('./pages/CorporateCourses'));
// const DataAnalystCourse = safeLazy(() => import('./pages/DataAnalystCourse'));
const TableauCourse = safeLazy(() => import('./pages/TableauCourse'));
const SqlCourse = safeLazy(() => import('./pages/SqlCourse'));
const PowerBiCourse = safeLazy(() => import('./pages/PowerBiCourse'));
const DigitalMarketingCourse = safeLazy(() => import('./pages/DigitalMarketingCourse'));
const DigitalMarketingStrategyCourse = safeLazy(() => import('./pages/DigitalMarketingStrategyCourse'));
const PythonCertificationCourse = safeLazy(() => import('./pages/PythonCertificationCourse'));
const JavaCertificationCourse = safeLazy(() => import('./pages/JavaCertificationCourse'));
const BAEconomicsCourse = safeLazy(() => import('./pages/BAEconomicsCourse'));
const BScCSCourse = safeLazy(() => import('./pages/BScCSCourse'));
const BBACourse = safeLazy(() => import('./pages/BBACourse'));
const BComCourse = safeLazy(() => import('./pages/BComCourse'));
const CloudComputingCourse = safeLazy(() => import('./pages/CloudComputingCourse'));
const CyberSecurityCourse = safeLazy(() => import('./pages/CyberSecurityCourse'));
const DataAnalyticsCourse = safeLazy(() => import('./pages/DataAnalyticsCourse'));
const AIMachineLearningCourse = safeLazy(() => import('./pages/AIMachineLearningCourse'));
const AutomationProductivityCourse = safeLazy(() => import('./pages/AutomationProductivityCourse'));
const FullStackDevelopmentCourse = safeLazy(() => import('./pages/FullStackDevelopmentCourse'));
const DigitalTransformationCourse = safeLazy(() => import('./pages/DigitalTransformationCourse'));
const AIForBusinessCourse = safeLazy(() => import('./pages/AIForBusinessCourse'));
const FutureSkillsCourse = safeLazy(() => import('./pages/FutureSkillsCourse'));
const InnovationStrategyCourse = safeLazy(() => import('./pages/InnovationStrategyCourse'));
const PeopleManagerCourse = safeLazy(() => import('./pages/PeopleManagerCourse'));
const StrategicDecisionMakerCourse = safeLazy(() => import('./pages/StrategicDecisionMakerCourse'));
const TeamBuilderCourse = safeLazy(() => import('./pages/TeamBuilderCourse'));
const VisionaryLeaderCourse = safeLazy(() => import('./pages/VisionaryLeaderCourse'));
const FinanciallySavvyLeaderCourse = safeLazy(() => import('./pages/FinanciallySavvyLeaderCourse'));
const EffectiveCommunicatorCourse = safeLazy(() => import('./pages/EffectiveCommunicatorCourse'));
const OperationsOptimizerCourse = safeLazy(() => import('./pages/OperationsOptimizerCourse'));
const DesignThinkingCourse = safeLazy(() => import('./pages/DesignThinkingCourse'));
const NotFound = safeLazy(() => import('./pages/NotFound'));

function Layout() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/wp-admin');
    const isAdminLogin = location.pathname === '/wp-admin';

    const getFallback = () => {
        if (!isAdminRoute) return <Preloader />;
        if (isAdminLogin) return <Preloader />;
        return (
            <div className="flex h-screen w-full bg-slate-50 font-inter overflow-hidden">
                <AdminSidebar userEmail="Loading..." />
                <main className="flex-1 min-w-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-[3px] border-violet-500/30 border-t-violet-600 rounded-full animate-spin"></div>
                </main>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white flex flex-col w-full overflow-x-hidden">
            <ScrollToTop />
            {!isAdminRoute && <Header />}
            <main className={`flex-grow w-full ${!isAdminRoute ? 'pt-[120px]' : ''}`}>
                <RecoveryBoundary key={location.pathname}>
                    <Suspense fallback={getFallback()}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                        <Route path="/download-app" element={<DownloadApp />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/service" element={<Services />} />
                        <Route path="/blog" element={<Blogs />} />
                        <Route path="/blog/:slug" element={<BlogDetail />} />
                        <Route path="/wp-admin" element={<AdminLogin />} />
                        <Route path="/wp-admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/wp-admin/add-new" element={<AddBlogPost />} />
                        <Route path="/wp-admin/all-blogs" element={<AllBlogs />} />
                        <Route path="/wp-admin/edit/:id" element={<AdminEditPost />} />
                        <Route path="/wp-admin/trash" element={<AdminTrash />} />
                        <Route path="/wp-admin/drafts" element={<AdminDrafts />} />
                        <Route path="/wp-admin/media" element={<Media />} />
                        <Route path="/wp-admin/comments" element={<AdminComments />} />
                        <Route path="/wp-admin/subscribers" element={<AdminSubscribers />} />
                        <Route path="/wp-admin/enquiries" element={<AdminEnquiries />} />
                        <Route path="/wp-admin/analytics" element={<AdminAnalytics />} />
                        <Route path="/our-courses" element={<Courses />} />
                        <Route path="/university-courses" element={<UniversityCourses />} />
                        <Route path="/corporate-courses" element={<CorporateCourses />} />
                        <Route path="/leadership-courses" element={<LeadershipCourses />} />
                        <Route path="/ai-machine-learning-from-basics-to-industry-applications" element={<AiMlCourse />} />
{/* <Route path="/data-analyst-from-fundamentals-to-job‑ready-skills" element={<DataAnalystCourse />} /> */}
                        <Route path="/tableau-data-visualization-business-intelligence" element={<TableauCourse />} />
                        <Route path="/sql-foundations-of-data-querying-databases" element={<SqlCourse />} />
                        <Route path="/power-bi-data-visualization-business-intelligence" element={<PowerBiCourse />} />
                        <Route path="/digital-marketing-from-basics-to-growth-campaigns" element={<DigitalMarketingCourse />} />
                        <Route path="/digital-marketing-strategy-ads-analytics" element={<DigitalMarketingStrategyCourse />} />
                        <Route path="/python-certification" element={<PythonCertificationCourse />} />
                        <Route path="/java-certification" element={<JavaCertificationCourse />} />
                        <Route path="/b-a-economics-with-data-analytics" element={<BAEconomicsCourse />} />
                        <Route path="/b-sc-computer-science-with-ai-data-science" element={<BScCSCourse />} />
                        <Route path="/bba-bachelor-of-business-administration" element={<BBACourse />} />
                        <Route path="/b-com-computer-applications" element={<BComCourse />} />
                        <Route path="/cloud-computing" element={<CloudComputingCourse />} />
                        <Route path="/cyber-security" element={<CyberSecurityCourse />} />
                        <Route path="/data-analytics" element={<DataAnalyticsCourse />} />
                        <Route path="/ai-and-machine-learning" element={<AIMachineLearningCourse />} />
                        <Route path="/automation-and-productivity-tools" element={<AutomationProductivityCourse />} />
                        <Route path="/full-stack-development" element={<FullStackDevelopmentCourse />} />
                        <Route path="/digital-transformation" element={<DigitalTransformationCourse />} />
                        <Route path="/ai-for-business" element={<AIForBusinessCourse />} />
                        <Route path="/future-skills-and-automation" element={<FutureSkillsCourse />} />
                        <Route path="/innovation-strategy" element={<InnovationStrategyCourse />} />
                        <Route path="/the-people-manager" element={<PeopleManagerCourse />} />
                        <Route path="/strategic-decision-maker" element={<StrategicDecisionMakerCourse />} />
                        <Route path="/the-team-builder" element={<TeamBuilderCourse />} />
                        <Route path="/the-visionary-leader" element={<VisionaryLeaderCourse />} />
                        <Route path="/financially-savvy-leader" element={<FinanciallySavvyLeaderCourse />} />
                        <Route path="/the-effective-communicator" element={<EffectiveCommunicatorCourse />} />
                        <Route path="/the-operations-optimizer" element={<OperationsOptimizerCourse />} />
                        <Route path="/design-thinking" element={<DesignThinkingCourse />} />
                        <Route path="/abacus-mental-math-masterclass" element={<AbacusCourse />} />
                        <Route path="/contact-us" element={<ContactUs />} />

                        {/* Catch-all 404 Route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
                </RecoveryBoundary>
            </main>
            {!isAdminRoute && <Footer />}
            {!isAdminRoute && <SubscribePopup />}
            {/* {!isAdminRoute && import.meta.env.VITE_SHOW_CHATBOT === 'true' && <Chatbot />} */}
        </div>
    );
}

function App() {
    return <Layout />;
}

export default App;

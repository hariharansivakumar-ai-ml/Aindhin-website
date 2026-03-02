import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import SubscribePopup from './components/SubscribePopup';
import AdminSidebar from './components/AdminSidebar';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Services = lazy(() => import('./pages/Services'));
const Courses = lazy(() => import('./pages/Courses'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const DownloadApp = lazy(() => import('./pages/DownloadApp'));
const Blogs = lazy(() => import('./pages/Blogs'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AddBlogPost = lazy(() => import('./pages/AddBlogPost'));
const AllBlogs = lazy(() => import('./pages/AllBlogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const AdminEditPost = lazy(() => import('./pages/AdminEditPost'));
const AdminTrash = lazy(() => import('./pages/AdminTrash'));
const AdminDrafts = lazy(() => import('./pages/AdminDrafts'));
const Media = lazy(() => import('./pages/Media'));
const AdminComments = lazy(() => import('./pages/AdminComments'));
const AdminSubscribers = lazy(() => import('./pages/AdminSubscribers'));
const AdminAnalytics = lazy(() => import('./pages/AdminAnalytics'));

// Course Pages
const AiMlCourse = lazy(() => import('./pages/AiMlCourse'));
const UniversityCourses = lazy(() => import('./pages/UniversityCourses'));
const LeadershipCourses = lazy(() => import('./pages/LeadershipCourses'));
const CorporateCourses = lazy(() => import('./pages/CorporateCourses'));
const DataAnalystCourse = lazy(() => import('./pages/DataAnalystCourse'));
const TableauCourse = lazy(() => import('./pages/TableauCourse'));
const SqlCourse = lazy(() => import('./pages/SqlCourse'));
const PowerBiCourse = lazy(() => import('./pages/PowerBiCourse'));
const DigitalMarketingCourse = lazy(() => import('./pages/DigitalMarketingCourse'));
const DigitalMarketingStrategyCourse = lazy(() => import('./pages/DigitalMarketingStrategyCourse'));
const PythonCertificationCourse = lazy(() => import('./pages/PythonCertificationCourse'));
const JavaCertificationCourse = lazy(() => import('./pages/JavaCertificationCourse'));
const BAEconomicsCourse = lazy(() => import('./pages/BAEconomicsCourse'));
const BScCSCourse = lazy(() => import('./pages/BScCSCourse'));
const BBACourse = lazy(() => import('./pages/BBACourse'));
const BComCourse = lazy(() => import('./pages/BComCourse'));
const CloudComputingCourse = lazy(() => import('./pages/CloudComputingCourse'));
const CyberSecurityCourse = lazy(() => import('./pages/CyberSecurityCourse'));
const DataAnalyticsCourse = lazy(() => import('./pages/DataAnalyticsCourse'));
const AIMachineLearningCourse = lazy(() => import('./pages/AIMachineLearningCourse'));
const AutomationProductivityCourse = lazy(() => import('./pages/AutomationProductivityCourse'));
const FullStackDevelopmentCourse = lazy(() => import('./pages/FullStackDevelopmentCourse'));
const DigitalTransformationCourse = lazy(() => import('./pages/DigitalTransformationCourse'));
const AIForBusinessCourse = lazy(() => import('./pages/AIForBusinessCourse'));
const FutureSkillsCourse = lazy(() => import('./pages/FutureSkillsCourse'));
const InnovationStrategyCourse = lazy(() => import('./pages/InnovationStrategyCourse'));
const PeopleManagerCourse = lazy(() => import('./pages/PeopleManagerCourse'));
const StrategicDecisionMakerCourse = lazy(() => import('./pages/StrategicDecisionMakerCourse'));
const TeamBuilderCourse = lazy(() => import('./pages/TeamBuilderCourse'));
const VisionaryLeaderCourse = lazy(() => import('./pages/VisionaryLeaderCourse'));
const FinanciallySavvyLeaderCourse = lazy(() => import('./pages/FinanciallySavvyLeaderCourse'));
const EffectiveCommunicatorCourse = lazy(() => import('./pages/EffectiveCommunicatorCourse'));
const BusinessStrategistCourse = lazy(() => import('./pages/BusinessStrategistCourse'));
const OperationsOptimizerCourse = lazy(() => import('./pages/OperationsOptimizerCourse'));
const DesignThinkingCourse = lazy(() => import('./pages/DesignThinkingCourse'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
        <div className="min-h-screen bg-white flex flex-col w-full">
            <ScrollToTop />
            {!isAdminRoute && <Preloader />}
            {!isAdminRoute && <Header />}
            <main className={`flex-grow w-full ${!isAdminRoute ? 'pt-[80px]' : ''}`}>
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
                        <Route path="/wp-admin/analytics" element={<AdminAnalytics />} />
                        <Route path="/our-courses" element={<Courses />} />
                        <Route path="/university-courses" element={<UniversityCourses />} />
                        <Route path="/corporate-courses" element={<CorporateCourses />} />
                        <Route path="/leadership-courses" element={<LeadershipCourses />} />
                        <Route path="/ai-machine-learning-from-basics-to-industry-applications" element={<AiMlCourse />} />
                        <Route path="/data-analyst-from-fundamentals-to-job‑ready-skills" element={<DataAnalystCourse />} />
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
                        <Route path="/the-business-strategist" element={<BusinessStrategistCourse />} />
                        <Route path="/the-operations-optimizer" element={<OperationsOptimizerCourse />} />
                        <Route path="/design-thinking" element={<DesignThinkingCourse />} />
                        <Route path="/contact-us" element={<ContactUs />} />

                        {/* Catch-all 404 Route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>
            {!isAdminRoute && <Footer />}
            {!isAdminRoute && <SubscribePopup />}
        </div>
    );
}

function App() {
    return <Layout />;
}

export default App;

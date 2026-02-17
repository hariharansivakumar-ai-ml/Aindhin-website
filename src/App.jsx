import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Services = lazy(() => import('./pages/Services'));
const Courses = lazy(() => import('./pages/Courses'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const DownloadApp = lazy(() => import('./pages/DownloadApp'));

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

function App() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <ScrollToTop />
            <Preloader />
            <Header />
            <main className="flex-grow pt-[80px]">
                <Suspense fallback={<Preloader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/download-app" element={<DownloadApp />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/service" element={<Services />} />
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
                    </Routes>
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}

export default App;
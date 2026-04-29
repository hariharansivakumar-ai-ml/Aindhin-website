import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Award, BookOpen, Target, Brain, ArrowUpRight } from 'lucide-react';
import AbacusHeroImg from '../assets/abacus_course.webp';

const Section = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const AbacusCourse = () => {
  useEffect(() => {
    document.title = "Abacus & Mental Math Masterclass | Aindhin";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Master mental calculation, concentration, and speed math with our Abacus course.");
    }
  }, []);

  return (
    <div className="font-sans text-slate-900 bg-blue-50 w-full pt-[80px]">
      <style>{`
        .abacus-badge {
          display:inline-block;
          padding:4px 12px;
          border-radius:999px;
          background:rgba(15,23,42,.7);
          border:1px solid rgba(248,250,252,.4);
          font-size:12px;
          color:#fff;
          letter-spacing:.08em;
          text-transform:uppercase;
          margin-bottom:10px;
        }
      `}</style>
      
      {/* HERO */}
      <Section className="relative py-20 px-6 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/40 z-0"></div>
        <div className="absolute inset-0 z-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url(${AbacusHeroImg})` }}></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start max-w-[1200px] mx-auto w-full gap-8">
          <div className="text-left text-white max-w-3xl">
            <span className="abacus-badge">Kids Programs</span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Abacus &amp; Mental Math Masterclass
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl">
              Unlock your child's brain potential with ancient abacus techniques. Build lightning-fast mental calculation skills, enhance memory, and improve overall concentration.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-2"><Clock size={16} /> 12 Weeks</span>
              <span className="flex items-center gap-2"><Target size={16} /> Beginner Friendly</span>
              <span className="flex items-center gap-2"><Users size={16} /> Interactive Sessions</span>
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto mt-6 md:mt-12">
            <a 
                href="https://user.aindhin.com/course/AD-abacus-mental-math" 
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
      <main className="py-20 px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <Section className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">About This Course</h2>
              <div className="prose prose-lg text-slate-600">
                <p className="mb-4">
                  The Abacus is a centuries-old calculation tool that is proven to stimulate brain development in children. This comprehensive masterclass teaches students how to visualize the abacus to perform complex mental math operations at incredible speeds.
                </p>
                <p>
                  Beyond just mathematics, abacus training enhances photographic memory, sharpens listening skills, and boosts self-confidence. Students will progress through structured levels, starting from basic bead movements to advanced multi-digit mental calculations.
                </p>
              </div>
            </Section>
            
            <Section className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100">
              <h2 className="text-3xl font-bold mb-8 text-slate-900">What You Will Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: <Brain />, title: "Mental Calculation", desc: "Perform addition, subtraction, multiplication and division entirely in your head." },
                  { icon: <Target />, title: "Laser Focus", desc: "Develop the ability to concentrate deeply on tasks without getting easily distracted." },
                  { icon: <Award />, title: "Photographic Memory", desc: "Enhance visual memory by visualizing the abacus beads during mental math." },
                  { icon: <BookOpen />, title: "Academic Confidence", desc: "Overcome math anxiety and approach academic challenges with self-assurance." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-blue-50/50">
                    <div className="text-blue-600 flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
          
          {/* Right Sidebar */}
          <div className="space-y-6">
            <Section className="bg-slate-900 rounded-[32px] p-8 shadow-xl text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-6">Course Features</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Level: Beginner to Advanced
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Duration: 12 Weeks
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Live Instructor Sessions
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Certificate of Completion
                </li>
              </ul>
              <a 
                href="https://user.aindhin.com/course/AD-abacus-mental-math" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-4 text-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
              >
                Join Masterclass
              </a>
            </Section>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default AbacusCourse;

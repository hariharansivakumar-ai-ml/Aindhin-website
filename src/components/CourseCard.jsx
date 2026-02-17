import { Star, Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CourseCard = ({ title, sub, icon, tag, students, rating }) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all duration-500 border border-gray-100 flex flex-col h-full"
        >
            {/* Card Header */}
            <div className="relative h-52 bg-gradient-to-br from-blue-50/50 to-purple-50/50 flex items-center justify-center overflow-hidden">
                <div className="text-7xl transform group-hover:scale-110 transition-transform duration-700 ease-out">{icon}</div>
                {tag && (
                    <div className="absolute top-5 left-5 px-3 py-1 bg-white rounded-full text-[11px] font-bold text-blue-700 shadow-sm border border-blue-50">
                        {tag}
                    </div>
                )}
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500" />
            </div>

            {/* Card Content */}
            <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-50 rounded-full">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-yellow-700">{rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-semibold">{students} students</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 mb-2 leading-tight">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-6">
                    {sub}
                </p>

                <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-blue-700 font-bold text-sm tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                        View Course Details
                    </span>
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;

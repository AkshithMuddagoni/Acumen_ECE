'use client';

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getCoreTeamMembers, getDevTeamMembers } from "../constants/team-data";
import Navbar from "../components/Navbar_Prim";
import { X } from "lucide-react";

const CoreTeam = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-dvh bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  const coreTeamMembers = getCoreTeamMembers();
  const devTeamMembers = getDevTeamMembers();
  const allMembers = [...coreTeamMembers, ...devTeamMembers];

  return (
    <div className="w-full bg-black">
      <Navbar />
      <div className="w-full min-h-dvh bg-black p-4 md:p-6 pt-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-8">Core Team ({allMembers.length} members)</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
            {allMembers.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMember(member)}
                className="group cursor-pointer"
              >
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-3 md:p-4 text-center hover:from-gray-700 hover:to-gray-800 transition-all border border-gray-700 hover:border-[#00ffaa]/50">
                  <div className="w-full aspect-square bg-gray-700 rounded mb-2 md:mb-3 flex items-center justify-center overflow-hidden relative group">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 text-xs md:text-sm font-semibold transition-opacity">👁️ View</span>
                    </div>
                  </div>
                  <p className="text-white font-semibold text-xs md:text-sm line-clamp-2">{member.name}</p>
                  <p className="text-gray-400 text-[10px] md:text-xs mt-1 line-clamp-2">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Expansion Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>
              <div className="rounded-xl overflow-hidden">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedMember.name}</h2>
                <p className="text-[#00ffaa] font-semibold text-lg">{selectedMember.role}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoreTeam;

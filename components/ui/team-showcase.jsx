'use client';

import { useState } from 'react';
import { cn } from '../../lib/utils';

export const DEFAULT_MEMBERS = [
  {
    id: '1',
    name: 'Chadrack',
    role: 'director of photography',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQFnmLdpZW78yA/profile-displayphoto-scale_200_200/B4DZvM8NB2JMAY-/0/1768669895649?e=2147483647&v=beta&t=5VGAB-2gYupLNaHvJHECollR25THd-3oR5wngGlQiY4',
    social: { twitter: '#', linkedin: '#', behance: '#' },
  },
  {
    id: '2',
    name: 'Mak VieSAinte',
    role: 'FOUNDER',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2vnSxNNVGZV2MXRjlGELl-NgLl5kXdpDR6A&s',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '3',
    name: 'Osiris Balonga',
    role: 'LEAD FRONT-END',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQGVqrPPAGHtoQ/profile-displayphoto-scale_200_200/B4DZwhAkjaHwAY-/0/1770080338529?e=2147483647&v=beta&t=q-_6p1VCJ8NN8eHj9zUFwJZds_XpKez9Hy14SAIDp4M',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '4',
    name: 'Jacques',
    role: 'PRODUCT OWNER',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQE-Z7-S1LSYNQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724143166545?e=2147483647&v=beta&t=6IPCwgOzblGt4p2fEdnY74gMbLyRHii5Ite3A39qQsY',
    social: { linkedin: '#' },
  },
  {
    id: '5',
    name: 'Riche Makso',
    role: 'CTO - PRODUCT DESIGNER',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQEkTAbZLlSrLg/profile-displayphoto-scale_200_200/B4DZoHdu8BGgAY-/0/1761061833315?e=2147483647&v=beta&t=Rg1dBTvq9X2heyhuhBwG2DsEkG65v0vQ35hF2FSeYns',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '6',
    name: 'Jemima',
    role: 'MAKE-UP ARTISTE',
    image: 'https://i.pravatar.cc/400?img=16',
    social: { instagram: '#' },
  },
];

export default function TeamShowcase({ members = DEFAULT_MEMBERS }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [previewMember, setPreviewMember] = useState(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col items-center justify-center select-none w-full py-8 px-2 md:px-4 font-sans relative">
      {/* ── Desktop: Full-width photo grid ── */}
      <div className="hidden md:flex gap-4 md:gap-6 lg:gap-8 flex-shrink-0 w-full justify-center px-2 overflow-visible relative z-10" style={{ perspective: '1000px' }}>
        {/* Column 1 */}
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
          {col1.map((member) => (
            <PhotoCardWithLabel
              key={member.id}
              member={member}
              className="w-[200px] h-[220px] lg:w-[260px] lg:h-[300px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
              onPreview={setPreviewMember}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 mt-[70px] lg:mt-[100px]">
          {col2.map((member) => (
            <PhotoCardWithLabel
              key={member.id}
              member={member}
              className="w-[220px] h-[240px] lg:w-[280px] lg:h-[320px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
              onPreview={setPreviewMember}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 mt-[40px] lg:mt-[60px]">
          {col3.map((member) => (
            <PhotoCardWithLabel
              key={member.id}
              member={member}
              className="w-[210px] h-[230px] lg:w-[270px] lg:h-[310px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
              onPreview={setPreviewMember}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile: Names below photos ── */}
      <div className="md:hidden w-full flex flex-col gap-4 max-w-md mx-auto">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <div
              className="relative w-20 h-24 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-300"
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-all duration-300"
                style={{
                  filter: hoveredId === member.id ? 'grayscale(0) brightness(1.1)' : 'grayscale(1) brightness(0.8)',
                }}
              />
            </div>
            <div
              className={cn(
                'transition-all duration-300 flex-1',
                hoveredId === member.id ? 'opacity-100 translate-x-0' : 'opacity-70 -translate-x-2',
              )}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <h3
                className={cn(
                  'text-sm font-semibold transition-colors duration-300',
                  hoveredId === member.id ? 'text-white text-base' : 'text-white/80',
                )}
              >
                {member.name}
              </h3>
              <p className={cn(
                'text-[10px] font-medium uppercase tracking-wider transition-all duration-300',
                hoveredId === member.id ? 'text-primary font-bold text-[11px]' : 'text-white/60',
              )}>
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop Modal Preview (center screen) ── */}
      {previewMember && (
        <>
          <div
            className="hidden md:fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setPreviewMember(null)}
          />
          <div className="fixed inset-0 z-50 hidden md:flex items-center justify-center" onClick={() => setPreviewMember(null)}>
            <div 
              className="relative w-72 h-80 md:w-96 md:h-[500px] lg:w-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/30 animate-in fade-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={previewMember.image}
                alt={previewMember.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-2">{previewMember.name}</h3>
                <p className="text-primary text-sm font-semibold uppercase tracking-widest">{previewMember.role}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card with label (desktop)
───────────────────────────────────────── */

function PhotoCardWithLabel({
  member,
  className,
  hoveredId,
  onHover,
  onPreview,
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'relative cursor-pointer flex-shrink-0 transition-all duration-300 group',
        isDimmed ? 'opacity-60' : 'opacity-100',
      )}
      style={{
        transform: isActive ? 'scale(3) z-50' : 'scale(1)',
        transformOrigin: 'center',
        zIndex: isActive ? 50 : 10,
      }}
      onMouseEnter={() => {
        onHover(member.id);
        onPreview(member);
      }}
      onMouseLeave={() => {
        onHover(null);
        onPreview(null);
      }}
    >
      <div className={cn(
        'overflow-hidden rounded-2xl transition-all duration-300',
        className,
      )}>
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-all duration-300"
          style={{
            filter: isActive ? 'grayscale(0) brightness(1.15) saturate(1.2)' : 'grayscale(1) brightness(0.85)',
          }}
        />
      </div>

      {/* Hover overlay with name and role */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-4 transition-all duration-300',
          isActive ? 'opacity-100' : 'opacity-0',
        )}
      >
        <h3 className={cn(
          'text-white font-bold transition-all duration-300',
          isActive ? 'translate-y-0 opacity-100 text-lg' : 'translate-y-2 opacity-0',
        )}>
          {member.name}
        </h3>
        <p className={cn(
          'text-primary font-semibold uppercase text-xs tracking-wider transition-all duration-300',
          isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        )}>
          {member.role}
        </p>
      </div>
    </div>
  );
}

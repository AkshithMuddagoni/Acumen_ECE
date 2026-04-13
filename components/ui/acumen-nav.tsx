'use client';

import React from 'react';
import { LimelightNav, type NavItem } from './limelight-nav';
import { Home, Zap, ImageGallery, Users, Award, Mail } from 'lucide-react';

interface AcumenNavProps {
  className?: string;
  onNavigate?: (section: string) => void;
  defaultActive?: number;
}

export const AcumenNav: React.FC<AcumenNavProps> = ({ 
  className, 
  onNavigate,
  defaultActive = 0 
}) => {
  const navItems: NavItem[] = [
    { 
      id: 'home', 
      icon: <Home />, 
      label: 'Home',
      onClick: () => onNavigate?.('home')
    },
    { 
      id: 'events', 
      icon: <Zap />, 
      label: 'Events',
      onClick: () => onNavigate?.('events')
    },
    { 
      id: 'gallery', 
      icon: <ImageGallery />, 
      label: 'Gallery',
      onClick: () => onNavigate?.('gallery')
    },
    { 
      id: 'team', 
      icon: <Users />, 
      label: 'Team',
      onClick: () => onNavigate?.('team')
    },
    { 
      id: 'sponsors', 
      icon: <Award />, 
      label: 'Sponsors',
      onClick: () => onNavigate?.('sponsors')
    },
    { 
      id: 'contact', 
      icon: <Mail />, 
      label: 'Contact',
      onClick: () => onNavigate?.('contact')
    },
  ];

  return (
    <div className={`flex justify-center items-center py-6 ${className}`}>
      <LimelightNav 
        items={navItems}
        defaultActiveIndex={defaultActive}
        onTabChange={() => {}}
        className="bg-slate-900/80 dark:bg-slate-950/90 border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
        limelightClassName="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 shadow-[0_0_30px_rgba(34,211,238,0.7)]"
        iconClassName="text-cyan-300 hover:text-cyan-100"
      />
    </div>
  );
};

export default AcumenNav;

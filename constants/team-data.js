/**
 * Team members data formatted for TeamShowcase component
 * Combines coreTeam and devsTeam into a single array
 */

// Import existing team data
import { coreTeam, devsTeam } from './index';

/**
 * Transform coreTeam data into TeamShowcase format
 */
export const getCoreTeamMembers = () => {
  const members = [];
  
  coreTeam.forEach((dept) => {
    dept.members.forEach((member, idx) => {
      members.push({
        id: `core-${members.length}`,
        name: member.name,
        role: dept.department,
        image: member.imgUrl,
        social: {
          // You can add social links here if needed
        },
      });
    });
  });
  
  return members;
};

/**
 * Transform devsTeam data into TeamShowcase format
 */
export const getDevTeamMembers = () => {
  const members = [];
  
  devsTeam.forEach((dept) => {
    dept.members.forEach((member, idx) => {
      members.push({
        id: `dev-${members.length}`,
        name: member.name,
        role: member.role || dept.department,
        image: member.imgUrl,
        social: {
          // You can add social links here if needed
        },
      });
    });
  });
  
  return members;
};

/**
 * Get all team members combined
 */
export const getAllTeamMembers = () => {
  return [...getCoreTeamMembers(), ...getDevTeamMembers()];
};


import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  icon: LucideIcon;
  className?: string;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({ icon: Icon, className }) => {
  return <Icon className={className || "w-5 h-5"} />;
};

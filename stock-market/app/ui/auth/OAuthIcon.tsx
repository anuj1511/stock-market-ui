import React from 'react';
import { Avatar } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

type SocialIconProps = {
  icon: React.ComponentType<SvgIconProps>;
  onClick?: () => void;
  color?: string;
}

const SocialIcon = ({ icon: Icon, onClick, color }: SocialIconProps) => {
  return (
    <Avatar
      sx={{ m: 1, bgcolor: color }}
      onClick={onClick}
    >
      <Icon />
    </Avatar>
  );
};

export default SocialIcon;

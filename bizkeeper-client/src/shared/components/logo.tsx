import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

interface BizKeeperLogoProps extends Omit<SvgIconProps, 'children'> {
  size?: number;
}

const BizKeeperLogo: React.FC<BizKeeperLogoProps> = ({ 
  size = 24, 
  sx = {},
  ...props 
}) => {
  return (
    <SvgIcon
      {...props}
      sx={{
        fontSize: size,
        ...sx
      }}
      viewBox="0 0 24 24"
    >
      {/* Location Pin Outline */}
      <path
        d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.866-3.134-7-7-7z"
        fill="currentColor"
        opacity="1"
      />
      
      {/* White "B" Character Inside Pin */}
      <text
        x="12"
        y="9.8"
        fill="white"
        fontSize="7"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        B
      </text>
    </SvgIcon>
  );
};

export default BizKeeperLogo;


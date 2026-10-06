import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export interface AgentAction {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface AgentPageTemplateProps {
  agentName: string;
  agentIcon: React.ReactNode;
  agentColor: string;
  description: string;
  actions: AgentAction[];
  children?: React.ReactNode;
}

/**
 * AgentPageTemplate - Shared template for all Bizkeeper agent pages
 * Provides consistent layout with agent header, action cards, and optional content area
 */
const AgentPageTemplate: React.FC<AgentPageTemplateProps> = ({
  agentName,
  agentIcon,
  agentColor,
  description,
  actions,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2, sm: 4 },
        backgroundColor: '#f7f7f8',
      }}
    >
      {/* Back Button */}
      <Box sx={{ mb: 2 }}>
        <IconButton
          onClick={() => navigate('/app/keeper')}
          sx={{
            color: '#6e7781',
            '&:hover': {
              backgroundColor: '#f0f0f0',
              color: '#2d333a',
            },
          }}
        >
          <ArrowBack />
        </IconButton>
      </Box>

      {/* Agent Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '12px',
            backgroundColor: agentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            '& svg': {
              fontSize: 28,
            },
          }}
        >
          {agentIcon}
        </Box>
        <Box>
          <Typography
            variant="h4"
            fontWeight={600}
            sx={{ color: '#2d333a', mb: 0.5 }}
          >
            {agentName}
          </Typography>
          <Typography variant="body1" sx={{ color: '#6e7781' }}>
            {description}
          </Typography>
        </Box>
      </Box>

      {/* Action Cards */}
      {actions.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#2d333a',
              fontWeight: 600,
              mb: 2,
            }}
          >
            Quick Actions
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 2,
            }}
          >
            {actions.map((action) => (
              <Box
                key={action.id}
                onClick={action.disabled ? undefined : action.onClick}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 2,
                  border: '1px solid #e5e5e5',
                  p: 3,
                  cursor: action.disabled ? 'not-allowed' : 'pointer',
                  opacity: action.disabled ? 0.6 : 1,
                  transition: 'all 0.2s ease',
                  '&:hover': action.disabled
                    ? {}
                    : {
                        borderColor: agentColor,
                        boxShadow: `0 4px 12px ${agentColor}20`,
                        transform: 'translateY(-2px)',
                      },
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}
                >
                  <Box sx={{ color: agentColor, '& svg': { fontSize: 24 } }}>
                    {action.icon}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: '#2d333a',
                    }}
                  >
                    {action.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6e7781',
                    lineHeight: 1.4,
                  }}
                >
                  {action.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Custom Content Area */}
      {children && <Box sx={{ flex: 1 }}>{children}</Box>}
    </Box>
  );
};

export default AgentPageTemplate;


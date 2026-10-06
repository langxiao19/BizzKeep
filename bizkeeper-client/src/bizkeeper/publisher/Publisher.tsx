import React from 'react';
import { Publish, Edit, Add, Article } from '@mui/icons-material';
import AgentPageTemplate, { AgentAction } from '../shared/AgentPageTemplate';

/**
 * Publisher - Content publishing agent for menu and blog
 */
const Publisher: React.FC = () => {
  const actions: AgentAction[] = [
    {
      id: 'update-dish',
      icon: <Edit />,
      title: 'Update Dish',
      description: 'Edit existing menu items and update details',
      onClick: () => console.log('Update dish clicked'),
      disabled: true,
    },
    {
      id: 'add-dish',
      icon: <Add />,
      title: 'Add Dish',
      description: 'Add new dishes to your menu',
      onClick: () => console.log('Add dish clicked'),
      disabled: true,
    },
    {
      id: 'add-blog',
      icon: <Article />,
      title: 'Add Blog',
      description: 'Create and publish new blog posts',
      onClick: () => console.log('Add blog clicked'),
      disabled: true,
    },
  ];

  return (
    <AgentPageTemplate
      agentName="Publisher"
      agentIcon={<Publish />}
      agentColor="#8B5CF6"
      description="Publish and manage your content"
      actions={actions}
    />
  );
};

export default Publisher;


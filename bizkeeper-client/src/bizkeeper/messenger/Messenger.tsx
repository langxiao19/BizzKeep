import React from 'react';
import { Forum, Receipt } from '@mui/icons-material';
import AgentPageTemplate, { AgentAction } from '../shared/AgentPageTemplate';

/**
 * Messenger - Customer communication and messaging agent
 */
const Messenger: React.FC = () => {
  const actions: AgentAction[] = [
    {
      id: 'send-invoice',
      icon: <Receipt />,
      title: 'Send Invoice',
      description: 'Send invoices and payment reminders',
      onClick: () => console.log('Send invoice clicked'),
      disabled: true,
    },
  ];

  return (
    <AgentPageTemplate
      agentName="Messenger"
      agentIcon={<Forum />}
      agentColor="#F59E0B"
      description="Customer communication and messaging"
      actions={actions}
    />
  );
};

export default Messenger;


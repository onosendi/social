import React from 'react';

// Material UI
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Local
import AuthLayout from '../../components/AuthLayout';
import BackButton from '../../components/BackButton';
import Heading from '../../components/Heading';
import PageTitle from '../../components/PageTitle';
import SettingsAccount from '../../components/SettingsAccount';
import SettingsPassword from '../../components/SettingsPassword';

const Settings = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <PageTitle title="Settings" />

      <AuthLayout>
        <Heading>
          <BackButton />
          <div>
            <Typography variant="h6">
              Settings
            </Typography>
          </div>
        </Heading>
        <Accordion
          expanded={expanded === 'account'}
          onChange={handleChange('account')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="account-header"
          >
            <Typography>Account</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SettingsAccount />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'password'}
          onChange={handleChange('password')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="password-header"
          >
            <Typography>Password</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SettingsPassword />
          </AccordionDetails>
        </Accordion>
      </AuthLayout>
    </>
  );
};

export default Settings;

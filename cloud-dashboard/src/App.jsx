import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Navigation from './components/Navigation.jsx';
import ProvisioningTab from './components/Provisioning/ProvisioningTab.jsx';
import GovernanceTab from './components/Governance/GovernanceTab.jsx';
import MonitoringTab from './components/Monitoring/MonitoringTab.jsx';
import { TabTypes } from './types/index.js';

function App() {
  const [activeTab, setActiveTab] = useState(TabTypes.PROVISIONING);

  const renderActiveTab = () => {
    switch (activeTab) {
      case TabTypes.PROVISIONING:
        return <ProvisioningTab />;
      case TabTypes.GOVERNANCE:
        return <GovernanceTab />;
      case TabTypes.MONITORING:
        return <MonitoringTab />;
      default:
        return <ProvisioningTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        {renderActiveTab()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
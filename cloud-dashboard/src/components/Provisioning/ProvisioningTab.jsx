
import React, { useState } from 'react';
import { ProvisioningSubTabs } from '../../types/index.js';
import VMProvisioning from './VMProvisioning.jsx';
import ClusterProvisioning from './ClusterProvisioning.jsx';
import TeamRegistration from './TeamRegistration.jsx';

const ProvisioningTab = () => {
    const [activeSubTab, setActiveSubTab] = useState(ProvisioningSubTabs.VM);

    const subTabs = [
        { id: ProvisioningSubTabs.TEAM, label: 'Team Registration' },
        { id: ProvisioningSubTabs.VM, label: 'VM Provisioning' },
        { id: ProvisioningSubTabs.CLUSTER, label: 'Cluster Provisioning' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Infrastructure Provisioning</h2>
                <p className="text-gray-600">Create and configure virtual machines and clusters</p>
            </div>

            <div className="mb-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {subTabs.map((subTab) => (
                            <button
                                key={subTab.id}
                                onClick={() => setActiveSubTab(subTab.id)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                    activeSubTab === subTab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {subTab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {activeSubTab === ProvisioningSubTabs.TEAM && <TeamRegistration />}
                {activeSubTab === ProvisioningSubTabs.VM && <VMProvisioning />}
                {activeSubTab === ProvisioningSubTabs.CLUSTER && <ClusterProvisioning />}
            </div>
        </div>
    );
};

export default ProvisioningTab;
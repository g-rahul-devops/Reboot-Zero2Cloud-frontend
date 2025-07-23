import React, { useState } from 'react';
import { Server, Cloud } from 'lucide-react';
import VMProvisioning from './VMProvisioning.jsx';
import ClusterProvisioning from './ClusterProvisioning.jsx';

const ProvisioningTab = () => {
    const [activeSubTab, setActiveSubTab] = useState('vm');

    const subTabs = [
        {
            id: 'vm',
            label: 'VM Provisioning',
            icon: Server,
            component: VMProvisioning
        },
        {
            id: 'cluster',
            label: 'Cluster Provisioning',
            icon: Cloud,
            component: ClusterProvisioning
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Infrastructure Provisioning</h2>
                <p className="text-gray-600">Create and manage your virtual machines and clusters</p>
            </div>

            <div className="mb-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Provisioning Options">
                        {subTabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveSubTab(tab.id)}
                                    className={`
                                        group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                                        ${activeSubTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                        transition-colors duration-200
                                    `}
                                    aria-current={activeSubTab === tab.id ? 'page' : undefined}
                                >
                                    <Icon
                                        className={`
                                            -ml-0.5 mr-2 h-4 w-4
                                            ${activeSubTab === tab.id
                                            ? 'text-blue-600'
                                            : 'text-gray-400 group-hover:text-gray-500'
                                        }
                                        `}
                                        aria-hidden="true"
                                    />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {subTabs.map((tab) => (
                    activeSubTab === tab.id && (
                        <div key={tab.id} className="animate-fadeIn">
                            <tab.component />
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default ProvisioningTab;
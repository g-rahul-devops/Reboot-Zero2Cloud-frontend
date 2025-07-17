
import React, { useState } from 'react';
import { Shield, Search, Filter } from 'lucide-react';
import ResourceList from './ResourceList.jsx';
import BillingInfo from './BillingInfo.jsx';
import { mockVMs, mockClusters } from '../../data/mockData.js';

const GovernanceTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [resourceType, setResourceType] = useState('all');
  const [activeView, setActiveView] = useState('resources'); // 'resources' or 'billing'

  const filteredVMs = mockVMs.filter(vm => {
    const matchesSearch = vm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vm.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vm.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredClusters = mockClusters.filter(cluster => {
    const matchesSearch = cluster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cluster.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cluster.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Infrastructure Governance</h2>
          </div>
          <p className="text-gray-600">Monitor and manage your cloud resources</p>
        </div>

        {/* View Toggle */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                  onClick={() => setActiveView('resources')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeView === 'resources'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Resources
              </button>
              <button
                  onClick={() => setActiveView('billing')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeView === 'billing'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Billing
              </button>
            </nav>
          </div>
        </div>

        {activeView === 'billing' ? (
            <BillingInfo />
        ) : (
            <>
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                      Search Resources
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                          type="text"
                          id="search"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Search by name or region..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="resourceType" className="block text-sm font-medium text-gray-700 mb-2">
                      Resource Type
                    </label>
                    <select
                        id="resourceType"
                        value={resourceType}
                        onChange={(e) => setResourceType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Resources</option>
                      <option value="vms">Virtual Machines</option>
                      <option value="clusters">Clusters</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                      Status Filter
                    </label>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                          id="status"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="all">All Statuses</option>
                        <option value="running">Running</option>
                        <option value="stopped">Stopped</option>
                        <option value="pending">Pending</option>
                        <option value="healthy">Healthy</option>
                        <option value="unhealthy">Unhealthy</option>
                        <option value="scaling">Scaling</option>
                        <option value="error">Error</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource Lists */}
              <div className="space-y-8">
                {(resourceType === 'all' || resourceType === 'vms') && (
                    <ResourceList
                        title="Virtual Machines"
                        type="vm"
                        resources={filteredVMs}
                    />
                )}

                {(resourceType === 'all' || resourceType === 'clusters') && (
                    <ResourceList
                        title="Kubernetes Clusters"
                        type="cluster"
                        resources={filteredClusters}
                    />
                )}
              </div>
            </>
        )}
      </div>
  );
};

export default GovernanceTab;
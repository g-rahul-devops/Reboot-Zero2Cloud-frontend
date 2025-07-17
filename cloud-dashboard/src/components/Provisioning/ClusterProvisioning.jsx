import React, { useState } from 'react';
import { Layers, Plus } from 'lucide-react';

const ClusterProvisioning = () => {
  const [formData, setFormData] = useState({
    name: '',
    nodeCount: '3',
    nodeSize: 't3.medium',
    region: 'us-east-1',
    kubernetesVersion: '1.28',
    autoScaling: true,
    minNodes: '1',
    maxNodes: '10'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Provisioning Cluster:', formData);
    alert('Cluster provisioning request submitted!');
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Layers className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Create Kubernetes Cluster</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Cluster Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., prod-k8s-cluster"
            />
          </div>

          <div>
            <label htmlFor="kubernetesVersion" className="block text-sm font-medium text-gray-700 mb-2">
              Kubernetes Version
            </label>
            <select
              id="kubernetesVersion"
              name="kubernetesVersion"
              value={formData.kubernetesVersion}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1.28">1.28 (Latest)</option>
              <option value="1.27">1.27</option>
              <option value="1.26">1.26</option>
              <option value="1.25">1.25</option>
            </select>
          </div>

          <div>
            <label htmlFor="nodeCount" className="block text-sm font-medium text-gray-700 mb-2">
              Initial Node Count
            </label>
            <input
              type="number"
              id="nodeCount"
              name="nodeCount"
              value={formData.nodeCount}
              onChange={handleChange}
              min="1"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="nodeSize" className="block text-sm font-medium text-gray-700 mb-2">
              Node Instance Size
            </label>
            <select
              id="nodeSize"
              name="nodeSize"
              value={formData.nodeSize}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="t3.small">t3.small (1 vCPU, 2 GB RAM)</option>
              <option value="t3.medium">t3.medium (2 vCPU, 4 GB RAM)</option>
              <option value="t3.large">t3.large (2 vCPU, 8 GB RAM)</option>
              <option value="m5.large">m5.large (2 vCPU, 8 GB RAM)</option>
              <option value="m5.xlarge">m5.xlarge (4 vCPU, 16 GB RAM)</option>
              <option value="c5.large">c5.large (2 vCPU, 4 GB RAM)</option>
            </select>
          </div>

          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
              Region
            </label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="us-east-1">US East (N. Virginia)</option>
              <option value="us-west-2">US West (Oregon)</option>
              <option value="eu-west-1">Europe (Ireland)</option>
              <option value="eu-central-1">Europe (Frankfurt)</option>
              <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
              <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="autoScaling"
                name="autoScaling"
                checked={formData.autoScaling}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="autoScaling" className="text-sm font-medium text-gray-700">
                Enable Auto Scaling
              </label>
            </div>
          </div>

          {formData.autoScaling && (
            <>
              <div>
                <label htmlFor="minNodes" className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Nodes
                </label>
                <input
                  type="number"
                  id="minNodes"
                  name="minNodes"
                  value={formData.minNodes}
                  onChange={handleChange}
                  min="1"
                  max="50"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="maxNodes" className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Nodes
                </label>
                <input
                  type="number"
                  id="maxNodes"
                  name="maxNodes"
                  value={formData.maxNodes}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Cluster</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClusterProvisioning;
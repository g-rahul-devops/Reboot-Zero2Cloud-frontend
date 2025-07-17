import React, { useState } from 'react';
import { Server, Plus } from 'lucide-react';

const VMProvisioning = () => {
  const [formData, setFormData] = useState({
    name: '',
    os: 'ubuntu-22.04',
    size: 't3.medium',
    region: 'us-east-1',
    storage: '20'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle VM provisioning
    console.log('Provisioning VM:', formData);
    alert('VM provisioning request submitted!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Server className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Create Virtual Machine</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              VM Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., web-server-01"
            />
          </div>

          <div>
            <label htmlFor="os" className="block text-sm font-medium text-gray-700 mb-2">
              Operating System
            </label>
            <select
              id="os"
              name="os"
              value={formData.os}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ubuntu-22.04">Ubuntu 22.04 LTS</option>
              <option value="ubuntu-20.04">Ubuntu 20.04 LTS</option>
              <option value="centos-8">CentOS 8</option>
              <option value="rhel-8">Red Hat Enterprise Linux 8</option>
              <option value="windows-2022">Windows Server 2022</option>
              <option value="windows-2019">Windows Server 2019</option>
            </select>
          </div>

          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
              Instance Size
            </label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="t3.micro">t3.micro (1 vCPU, 1 GB RAM)</option>
              <option value="t3.small">t3.small (1 vCPU, 2 GB RAM)</option>
              <option value="t3.medium">t3.medium (2 vCPU, 4 GB RAM)</option>
              <option value="t3.large">t3.large (2 vCPU, 8 GB RAM)</option>
              <option value="t3.xlarge">t3.xlarge (4 vCPU, 16 GB RAM)</option>
              <option value="m5.large">m5.large (2 vCPU, 8 GB RAM)</option>
              <option value="m5.xlarge">m5.xlarge (4 vCPU, 16 GB RAM)</option>
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
            <label htmlFor="storage" className="block text-sm font-medium text-gray-700 mb-2">
              Storage (GB)
            </label>
            <input
              type="number"
              id="storage"
              name="storage"
              value={formData.storage}
              onChange={handleChange}
              min="10"
              max="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
            <span>Create VM</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default VMProvisioning;
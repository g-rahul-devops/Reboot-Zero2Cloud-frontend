import React, { useState } from 'react';
import { Server, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VMProvisioning = () => {
  const [formData, setFormData] = useState({
    projectId: '',
    zone: 'us-central1-a',
    instanceName: '',
    machineType: 'e2-medium',
    tags: '',
    disks: 'pd-standard'
  });

  const [isLoading, setIsLoading] = useState(false);

  const zones = [
    'us-central1-a',
    'us-central1-b',
    'us-central1-c',
    'us-east1-b',
    'us-west1-a',
    'europe-west1-b',
    'asia-east1-a'
  ];

  const machineTypes = [
    'e2-micro',
    'e2-small',
    'e2-medium',
    'e2-standard-2',
    'e2-standard-4',
    'e2-standard-8'
  ];

  const diskTypes = [
    'pd-standard',
    'pd-balanced',
    'pd-ssd'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:9000/provisioning/vm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to provision VM');
      }


      const data = await response.text();
      toast.success(data);

      // Reset form
      setFormData({
        projectId: '',
        zone: 'us-central1-a',
        instanceName: '',
        machineType: 'e2-medium',
        tags: '',
        disks: 'pd-standard'
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Error creating VM: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center space-x-3 mb-6">
          <Server className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Create Virtual Machine</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-2">
                Project ID *
              </label>
              <input
                  type="text"
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., my-project-id"
              />
            </div>

            <div>
              <label htmlFor="instanceName" className="block text-sm font-medium text-gray-700 mb-2">
                Instance Name *
              </label>
              <input
                  type="text"
                  id="instanceName"
                  name="instanceName"
                  value={formData.instanceName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., my-vm-instance"
              />
            </div>

            <div>
              <label htmlFor="zone" className="block text-sm font-medium text-gray-700 mb-2">
                Zone *
              </label>
              <select
                  id="zone"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {zones.map((zone) => (
                    <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="machineType" className="block text-sm font-medium text-gray-700 mb-2">
                Machine Type *
              </label>
              <select
                  id="machineType"
                  name="machineType"
                  value={formData.machineType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {machineTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., web-server"
              />
              <p className="mt-1 text-sm text-gray-500">Separate multiple tags with commas</p>
            </div>

            <div>
              <label htmlFor="disks" className="block text-sm font-medium text-gray-700 mb-2">
                Disk Type *
              </label>
              <select
                  id="disks"
                  name="disks"
                  value={formData.disks}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {diskTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
                type="button"
                onClick={() => setFormData({
                  projectId: '',
                  zone: 'us-central1-a',
                  instanceName: '',
                  machineType: 'e2-medium',
                  tags: '',
                  disks: 'pd-standard'
                })}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Reset
            </button>
            <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 flex items-center space-x-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Plus className="h-4 w-4" />
              <span>{isLoading ? 'Creating...' : 'Create VM'}</span>
            </button>
          </div>
        </form>
      </div>
  );
};

export default VMProvisioning;
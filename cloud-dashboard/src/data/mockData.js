export const mockVMs = [
  {
    id: 'vm-001',
    name: 'web-server-01',
    os: 'Ubuntu 22.04',
    size: 't3.medium',
    region: 'us-east-1',
    status: 'running',
    createdAt: '2025-01-01T10:00:00Z',
    cpuUsage: 45,
    memoryUsage: 62
  },
  {
    id: 'vm-002',
    name: 'database-01',
    os: 'CentOS 8',
    size: 't3.large',
    region: 'us-west-2',
    status: 'running',
    createdAt: '2024-12-28T14:30:00Z',
    cpuUsage: 78,
    memoryUsage: 84
  },
  {
    id: 'vm-003',
    name: 'app-server-01',
    os: 'Windows Server 2022',
    size: 't3.small',
    region: 'eu-west-1',
    status: 'stopped',
    createdAt: '2024-12-30T09:15:00Z',
    cpuUsage: 0,
    memoryUsage: 0
  }
];

export const mockClusters = [
  {
    id: 'cluster-001',
    name: 'prod-k8s-cluster',
    nodeCount: 3,
    nodeSize: 't3.medium',
    region: 'us-east-1',
    status: 'healthy',
    createdAt: '2024-12-25T12:00:00Z',
    cpuUsage: 56,
    memoryUsage: 71
  },
  {
    id: 'cluster-002',
    name: 'dev-k8s-cluster',
    nodeCount: 2,
    nodeSize: 't3.small',
    region: 'us-west-2',
    status: 'scaling',
    createdAt: '2024-12-29T16:45:00Z',
    cpuUsage: 34,
    memoryUsage: 48
  }
];

export const generateChartData = (hours) => {
  const data = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      timestamp: timestamp.toISOString(),
      cpu: Math.random() * 80 + 10,
      memory: Math.random() * 70 + 15
    });
  }
  
  return data;
};
import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TimeFilters } from '../../types/index.js';
import { generateChartData } from '../../data/mockData.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Charts = ({ timeFilter, customRange }) => {
  const chartData = useMemo(() => {
    let hours = 24;
    
    if (timeFilter === TimeFilters.CUSTOM && customRange.from && customRange.to) {
      const fromDate = new Date(customRange.from);
      const toDate = new Date(customRange.to);
      const diffInMs = toDate.getTime() - fromDate.getTime();
      hours = Math.ceil(diffInMs / (1000 * 60 * 60)); // Convert to hours
      hours = Math.max(1, hours); // Ensure at least 1 hour
    } else {
      switch (timeFilter) {
        case TimeFilters.ONE_HOUR:
          hours = 1;
          break;
        case TimeFilters.ONE_DAY:
          hours = 24;
          break;
        case TimeFilters.ONE_WEEK:
          hours = 168; // 7 days * 24 hours
          break;
        default:
          hours = 24;
      }
    }
    
    return generateChartData(hours);
  }, [timeFilter, customRange]);

  const labels = chartData.map(data => {
    const date = new Date(data.timestamp);
    if (timeFilter === TimeFilters.ONE_HOUR || (timeFilter === TimeFilters.CUSTOM && customRange.from && customRange.to && 
        new Date(customRange.to).getTime() - new Date(customRange.from).getTime() <= 3600000)) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (timeFilter === TimeFilters.ONE_DAY || (timeFilter === TimeFilters.CUSTOM && customRange.from && customRange.to && 
             new Date(customRange.to).getTime() - new Date(customRange.from).getTime() <= 86400000)) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  });

  const cpuData = {
    labels,
    datasets: [
      {
        label: 'CPU Utilization',
        data: chartData.map(data => data.cpu),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const memoryData = {
    labels,
    datasets: [
      {
        label: 'Memory Utilization',
        data: chartData.map(data => data.memory),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Percentage (%)'
        },
        min: 0,
        max: 100
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const averageCpu = chartData.reduce((sum, data) => sum + data.cpu, 0) / chartData.length;
  const averageMemory = chartData.reduce((sum, data) => sum + data.memory, 0) / chartData.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg CPU Usage</p>
              <p className="text-2xl font-bold text-blue-600">{averageCpu.toFixed(1)}%</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Memory Usage</p>
              <p className="text-2xl font-bold text-green-600">{averageMemory.toFixed(1)}%</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="h-4 w-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Resources</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="h-8 w-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className="text-2xl font-bold text-green-600">Good</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="h-4 w-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">CPU Utilization</h3>
          <div className="h-80">
            <Line data={cpuData} options={options} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Memory Utilization</h3>
          <div className="h-80">
            <Line data={memoryData} options={options} />
          </div>
        </div>
      </div>

      {/* Combined Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Combined Resource Utilization</h3>
        <div className="h-96">
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: 'CPU Utilization',
                  data: chartData.map(data => data.cpu),
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  fill: false,
                  tension: 0.4,
                },
                {
                  label: 'Memory Utilization',
                  data: chartData.map(data => data.memory),
                  borderColor: 'rgb(16, 185, 129)',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  fill: false,
                  tension: 0.4,
                }
              ]
            }}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default Charts;
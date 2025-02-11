import React, { Suspense, lazy } from 'react';
import { Layout } from '../components/Layout';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  TooltipItem,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Lazy load chart components
const Line = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Line })));
const Chart = lazy(() => import('react-chartjs-2').then(mod => ({ default: mod.Chart })));

interface InvestmentCardProps {
  icon: string;
  title: string;
  value: string;
  subtitle?: string;
}

const weeklyActivityData = [
  { name: 'Sat', deposit: 450, withdraw: 200 },
  { name: 'Sun', deposit: 350, withdraw: 120 },
  { name: 'Mon', deposit: 320, withdraw: 250 },
  { name: 'Tue', deposit: 480, withdraw: 350 },
  { name: 'Wed', deposit: 150, withdraw: 280 },
  { name: 'Thu', deposit: 380, withdraw: 220 },
  { name: 'Fri', deposit: 400, withdraw: 300 },
];

const expenseData = [
  { name: 'Stocks', value: 45, color: '#2F2E5F' },
  { name: 'Bonds', value: 25, color: '#FF8042' },
  { name: 'ETFs', value: 20, color: '#FF00FF' },
  { name: 'Cash', value: 10, color: '#3B3BF9' },
];

const balanceHistoryData = [
  { name: 'Jul', value: 20.5 },
  { name: 'Aug', value: 35.2 },
  { name: 'Sep', value: 45.8 },
  { name: 'Oct', value: 75.3 },
  { name: 'Nov', value: 25.9 },
  { name: 'Dec', value: 58.4 },
  { name: 'Jan', value: 65.7 }
];

const InvestmentCard: React.FC<InvestmentCardProps> = ({ icon, title, value, subtitle }) => (
  <div className="bg-white rounded-xl p-4 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
      icon === '💼' ? 'bg-cyan-100' : 
      icon === '📈' ? 'bg-pink-100' : 
      'bg-blue-100'
    }`}>
      <span className="text-2xl">{icon}</span>
    </div>
    <div>
      <p className="text-gray-600 text-sm">{title}</p>
      <h3 className="text-xl font-semibold">{value}</h3>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  </div>
);

const InvestmentPortfolioItem: React.FC<{
  sector: string;
  name: string;
  category: string;
  value: string;
  allocation: string;
  performance: string;
  isPositive: boolean;
}> = ({ sector, name, category, value, allocation, performance, isPositive }) => (
  <div className="bg-white rounded-xl p-4 mb-4 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center font-semibold text-lg">
        {sector}
      </div>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold">{value}</p>
      <p className="text-sm text-gray-500">Allocation: {allocation}</p>
      <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {performance}
      </p>
    </div>
  </div>
);

const MarketAnalysisTable: React.FC = () => (
  <div className="bg-white rounded-xl p-4">
    <table className="w-full">
      <thead>
        <tr className="text-left text-gray-600">
          <th className="py-2">Investment type</th>
          <th>Value</th>
          <th>YTD return</th>
          <th>Risk level</th>
        </tr>
      </thead>
      <tbody>
        {[
          { sector: 'US stocks', marketCap: '$28,500', return: '+15%', risk: 'Medium' },
          { sector: 'Bonds', marketCap: '$15,200', return: '+4.2%', risk: 'Low' },
          { sector: 'International', marketCap: '$21,300', return: '+9.8%', risk: 'Medium' },
          { sector: 'Crypto', marketCap: '$9,800', return: '-12%', risk: 'High' },
          { sector: 'Real estate', marketCap: '$7,500', return: '+6.5%', risk: 'Medium' },
        ].map((sector, index) => (
          <tr key={index} className="border-t">
            <td className="py-3 font-medium">{sector.sector}</td>
            <td>{sector.marketCap}</td>
            <td className={sector.return.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {sector.return}
            </td>
            <td>
              <span className={`px-2 py-1 rounded-full text-xs ${
                sector.risk === 'High' ? 'bg-red-100 text-red-600' :
                sector.risk === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              }`}>
                {sector.risk}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Investments: React.FC = () => {
  const portfolioPerformance: ChartData<'bar' | 'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        type: 'bar' as const,
        label: 'Monthly investment',
        data: [1.2, 1.5, 1.8, 1.4, 2.0, 2.2, 1.8, 2.5, 2.8, 3.0, 2.7, 3.2],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 0.8)',
        borderWidth: 1,
        borderRadius: 4,
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: 'Portfolio value',
        data: [15.2, 16.8, 18.1, 17.9, 19.5, 21.8, 23.2, 25.5, 27.8, 29.1, 31.4, 33.8],
        borderColor: '#EA580C',
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#EA580C',
        yAxisID: 'y1',
      }
    ],
  };

  const sectorAllocation: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Portfolio Growth',
        data: [25.5, 28.2, 32.4, 35.8, 38.2, 42.5, 45.8, 48.2, 52.5, 55.8, 58.4, 62.5],
        borderColor: '#8B5CF6',
        tension: 0.4,
        pointBackgroundColor: '#8B5CF6',
      },
    ],
  };

  const performanceChartOptions: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          color: '#4B5563',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'bar' | 'line'>) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `$${context.parsed.y}B`;
            }
            return label;
          }
        },
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Monthly investment (Billions $)',
          color: '#22C55E',
          font: {
            weight: 'bold',
          },
        },
        ticks: {
          callback: (value: number) => `$${value}B`,
          color: '#4B5563',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Cumulative Return (Billions $)',
          color: '#EA580C',
          font: {
            weight: 'bold',
          },
        },
        ticks: {
          callback: (value: number) => `$${value}B`,
          color: '#4B5563',
        },
        grid: {
          drawOnChartArea: false,
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
      x: {
        ticks: {
          color: '#4B5563',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
    },
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value}B`,
        },
      },
    },
  };

  return (
    <Layout title="Investment portfolio">
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <InvestmentCard
            icon="��"
            title="Total portfolio value"
            value="$82,500"
            subtitle="+12.5% YTD"
          />
          <InvestmentCard
            icon="📈"
            title="Total returns"
            value="$12,300"
            subtitle="+8.3% YTD"
          />
          <InvestmentCard
            icon="📊"
            title="Portfolio performance"
            value="+15.80%"
            subtitle="Annual Return"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Investment portfolio</h3>
            <div className="space-y-4">
              <InvestmentPortfolioItem
                sector="STK"
                name="US stock market"
                category="Index funds"
                value="$37,125"
                allocation="45%"
                performance="+16.5% YTD"
                isPositive={true}
              />
              <InvestmentPortfolioItem
                sector="BND"
                name="Bond portfolio"
                category="Fixed income"
                value="$20,625"
                allocation="25%"
                performance="+4.2% YTD"
                isPositive={true}
              />
              <InvestmentPortfolioItem
                sector="INT"
                name="International stocks"
                category="Emerging markets"
                value="$16,500"
                allocation="20%"
                performance="+9.8% YTD"
                isPositive={true}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Market analysis</h3>
            <div className="overflow-x-auto">
              <MarketAnalysisTable />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 mt-6">
          <div className="bg-white rounded-xl p-0 sm:p-4">
            <h3 className="text-lg font-semibold mb-2 sm:mb-4 px-4 sm:px-0 pt-4 sm:pt-0">Portfolio performance</h3>
            <div className="w-full h-[250px] sm:h-[300px]">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading chart...</div>}>
                <Chart type="bar" data={portfolioPerformance} options={performanceChartOptions} />
              </Suspense>
            </div>
          </div>
          <div className="bg-white rounded-xl p-0 sm:p-4">
            <h3 className="text-lg font-semibold mb-2 sm:mb-4 px-4 sm:px-0 pt-4 sm:pt-0">Portfolio growth</h3>
            <div className="w-full h-[250px] sm:h-[300px]">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading chart...</div>}>
                <Line data={sectorAllocation} options={chartOptions} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Investments; 
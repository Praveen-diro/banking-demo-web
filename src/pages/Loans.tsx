import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { 
  Building2, 
  TrendingUp, 
  AlertCircle, 
  DollarSign,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

const loanPortfolioData = [
  { 
    category: 'Equipment loans ', 
    value: 45, 
    amount: '450,000', 
    color: '#2563EB',
    details: {
      rate: '4.5%',
      term: '240 months',
      monthlyPayment: '2,850'
    }
  },
  { 
    category: 'Overdraft ', 
    value: 25, 
    amount: '25,000', 
    color: '#7C3AED',
    details: {
      rate: '5.2%',
      term: '48 months',
      monthlyPayment: '580'
    }
  },
  { 
    category: 'SBA loans ', 
    value: 20, 
    amount: '20,000', 
    color: '#EC4899',
    details: {
      rate: '7.5%',
      term: '36 months',
      monthlyPayment: '620'
    }
  },
  { 
    category: 'Merchant cash advance ', 
    value: 10, 
    amount: '10,000', 
    color: '#F59E0B',
    details: {
      rate: '3.5%',
      term: '60 months',
      monthlyPayment: '182'
    }
  },
];

const monthlyLoanData = [
  { month: 'Jan', payment: 2850, interest: 720, principal: 2130, total: 2850 },
  { month: 'Feb', payment: 2850, interest: 710, principal: 2140, total: 2850 },
  { month: 'Mar', payment: 2850, interest: 700, principal: 2150, total: 2850 },
  { month: 'Apr', payment: 2850, interest: 690, principal: 2160, total: 2850 },
  { month: 'May', payment: 2850, interest: 680, principal: 2170, total: 2850 },
  { month: 'Jun', payment: 2850, interest: 670, principal: 2180, total: 2850 },
];

const activeLoans = [
  {
    id: 'HL-2023',
    type: 'Equipment loans ',
    amount: 450000,
    remaining: 425000,
    term: '240 months',
    rate: 4.5,
    status: 'Active',
    nextPayment: '2024-04-15',
    monthlyPayment: 2850
  },
  {
    id: 'CL-2024',
    type: 'Overdraft ',
    amount: 25000,
    remaining: 22000,
    term: '48 months',
    rate: 5.2,
    status: 'Active',
    nextPayment: '2024-04-10',
    monthlyPayment: 580
  },
  {
    id: 'PL-2024',
    type: 'SBA loans ',
    amount: 20000,
    remaining: 18500,
    term: '36 months',
    rate: 7.5,
    status: 'Active',
    nextPayment: '2024-04-05',
    monthlyPayment: 620
  },
  {
    id: 'EL-2023',
    type: 'Merchant cash advance ',
    amount: 10000,
    remaining: 8000,
    term: '60 months',
    rate: 3.5,
    status: 'Active',
    nextPayment: '2024-04-20',
    monthlyPayment: 182
  }
];

// Add new data for loan trends
const loanTrendsData = [
  { 
    month: 'Jan 2024', 
    homeLoan: 425000, 
    carLoan: 22000, 
    personalLoan: 18500, 
    educationLoan: 8000 
  },
  { 
    month: 'Feb 2024', 
    homeLoan: 428000, 
    carLoan: 21500, 
    personalLoan: 19000, 
    educationLoan: 7800 
  },
  { 
    month: 'Mar 2024', 
    homeLoan: 422000, 
    carLoan: 22500, 
    personalLoan: 17500, 
    educationLoan: 8200 
  },
  { 
    month: 'Apr 2024', 
    homeLoan: 426000, 
    carLoan: 20800, 
    personalLoan: 18200, 
    educationLoan: 7600 
  },
  { 
    month: 'May 2024', 
    homeLoan: 420000, 
    carLoan: 21200, 
    personalLoan: 16800, 
    educationLoan: 8400 
  },
  { 
    month: 'Jun 2024', 
    homeLoan: 423000, 
    carLoan: 19500, 
    personalLoan: 17800, 
    educationLoan: 7900 
  }
];

const Loans = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [chartData, setChartData] = useState({ pieChart: null, barChart: null });
  const chartRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const renderPieChart = () => {
    try {
      return (
        <div className="w-full h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={loanPortfolioData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name} (${value}%)`}
              >
                {loanPortfolioData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [`${value}%`, name]}
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    } catch (error) {
      console.error('Error rendering pie chart:', error);
      return (
        <div className="w-full h-[300px] flex items-center justify-center">
          <p className="text-red-500">Error loading chart. Please refresh the page.</p>
        </div>
      );
    }
  };

  const renderBarChart = () => (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyLoanData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280' }}
          />
          <YAxis 
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280' }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-900 mb-2">{label}</p>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        Total Payment: <span className="font-medium text-gray-900">${payload[0].payload.total.toLocaleString()}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Principal: <span className="font-medium text-blue-600">${payload[0].value.toLocaleString()}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Interest: <span className="font-medium text-amber-500">${payload[1].value.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend 
            formatter={(value) => value === 'principal' ? 'Principal Payment' : 'Interest Payment'}
            iconType="circle"
            wrapperStyle={{
              paddingTop: '8px'
            }}
          />
          <Bar 
            dataKey="principal" 
            name="principal" 
            fill="#2563EB" 
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
          />
          <Bar 
            dataKey="interest" 
            name="interest" 
            fill="#F59E0B" 
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  if (error) {
    return (
      <Layout title="My Loans">
        <div className="p-6">
          <Card className="p-4">
            <div className="text-red-600">
              Error loading loan data. Please try refreshing the page.
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout title="My Loans">
        <div className="p-6">
          <Card className="p-4">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="My Loans">
      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total loan amount</p>
                <p className="text-2xl font-semibold">$505,000</p>
                <p className="text-xs text-gray-600">Across all active loans</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly payment</p>
                <p className="text-2xl font-semibold">$4,232</p>
                <p className="text-xs text-gray-600">Total monthly installments</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment score</p>
                <p className="text-2xl font-semibold">100%</p>
                <p className="text-xs text-green-600">All payments on time</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Next payment</p>
                <p className="text-2xl font-semibold">$2,850</p>
                <p className="text-xs text-yellow-600">Due on Apr 5, 2024</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Loan Portfolio Distribution */}
        <div className="w-full">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Loan distribution</h3>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                {renderPieChart()}
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {loanPortfolioData.map((loan) => (
                  <div 
                    key={loan.category}
                    className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: loan.color }}
                      />
                      <h4 className="font-medium">{loan.category}</h4>
                    </div>
                    <p className="font-semibold text-lg mb-2">${loan.amount}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Rate: {loan.details.rate}</p>
                      <p>Term: {loan.details.term}</p>
                      <p>Monthly: ${loan.details.monthlyPayment}</p>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full" 
                          style={{ 
                            width: `${loan.value}%`,
                            backgroundColor: loan.color 
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{loan.value}% of total</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Loan Balance Trends */}
        <div className="w-full">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Loan balance trends</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={loanTrendsData}>
                  <defs>
                    <linearGradient id="homeLoan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="carLoan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="personalLoan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="educationLoan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => `$${value.toLocaleString()}`}
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '8px'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="homeLoan" 
                    name="Equipment loans "
                    stroke="#2563EB" 
                    fillOpacity={1} 
                    fill="url(#homeLoan)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="carLoan" 
                    name="Overdraft "
                    stroke="#7C3AED" 
                    fillOpacity={1} 
                    fill="url(#carLoan)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="personalLoan" 
                    name="SBA loans "
                    stroke="#EC4899" 
                    fillOpacity={1} 
                    fill="url(#personalLoan)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="educationLoan" 
                    name="Merchant cash advance "
                    stroke="#F59E0B" 
                    fillOpacity={1} 
                    fill="url(#educationLoan)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Loans;
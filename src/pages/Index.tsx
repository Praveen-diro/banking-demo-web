import { Layout } from "@/components/Layout";
import { CreditAccount, CreditAccount2, CreditCard, CreditCardBack } from "@/components/CreditCard";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import { ArrowDown, ArrowUp } from "lucide-react";

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
  { name: 'Entertainment', value: 30, color: '#2F2E5F' },
  { name: 'Bill expense', value: 15, color: '#FF8042' },
  { name: 'Investment', value: 20, color: '#FF00FF' },
  { name: 'Others', value: 35, color: '#3B3BF9' },
];

const recentTransactions = [
  {
    icon: "💳",
    name: "Deposit From My Card",
    date: "28 January 2021",
    amount: -85000,
    type: "card"
  },
  {
    icon: "🅿️",
    name: "Deposit PayPal",
    date: "25 January 2021",
    amount: 250003,
    type: "paypal"
  },
  {
    icon: "👤",
    name: "Jemi Wilson",
    date: "21 January 2021",
    amount: 540032,
    type: "transfer"
  }
];

const quickTransferUsers = [
  { name: "Livia Bator", role: "CEO", image: "https://ui-avatars.com/api/?name=Livia+Bator" },
  { name: "Randy Press", role: "Director", image: "https://ui-avatars.com/api/?name=Randy+Press" },
  { name: "Workman", role: "Designer", image: "https://ui-avatars.com/api/?name=Workman" },
];

const balanceHistoryData = [
  { name: 'Jul', value: 200 },
  { name: 'Aug', value: 350 },
  { name: 'Sep', value: 450 },
  { name: 'Oct', value: 750 },
  { name: 'Nov', value: 250 },
  { name: 'Dec', value: 580 },
  { name: 'Jan', value: 650 }
];

const recentTransactionsByType = {
  Escrow: [
    {
      id: "TX-001",
      description: "Escrow payment",
      amount: 25000000,
      date: "2024-03-15",
      type: "credit",
      accountNumber: "3778232389"
    },
    {
      id: "TX-002",
      description: "Escrow deposit",
      amount: 18000000,
      date: "2024-03-12",
      type: "debit",
      accountNumber: "3778232389"
    }
  ],
  "Foreign account": [
    {
      id: "TX-003",
      description: "International transfer",
      amount: 32000000,
      date: "2024-03-14",
      type: "credit",
      accountNumber: "8712083309"
    },
    {
      id: "TX-004",
      description: "Foreign exchange",
      amount: 15000000,
      date: "2024-03-11",
      type: "debit",
      accountNumber: "8712083309"
    }
  ],
  "Checking account": [
    {
      id: "TX-005",
      description: "Direct deposit",
      amount: 45000000,
      date: "2024-03-13",
      type: "credit",
      accountNumber: "8712434432"
    },
    {
      id: "TX-006",
      description: "Atm withdrawal",
      amount: 7500000,
      date: "2024-03-10",
      type: "debit",
      accountNumber: "8712434432"
    }
  ]
};

const Index = () => {
  const navigate = useNavigate();

  const handleCardClick = (accountType: string) => {
    navigate('/transactions', { state: { selectedAccount: accountType } });
  };

  return (
    <Layout title="Overview">
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-8">
          {/* First Card */}
          <div className="w-full cursor-pointer transition-transform hover:scale-[1.02]" 
               onClick={() => handleCardClick("Escrow")}>
            <h2 className="text-xl font-semibold mb-4">Accounts</h2>
            <CreditAccount
              balance={18003443}
              cardHolder="Coforge Inc"
              cardNumber="3778232389"
              expiryDate="12/22"
              CardType="Checking account"
            />
          </div>

          {/* Second Card */}
          <div className="w-full mt-11 cursor-pointer transition-transform hover:scale-[1.02]"
               onClick={() => handleCardClick("Foreign account")}>
            <CreditAccount2
              balance={21434342}
              cardHolder="Coforge Inc"
              cardNumber="8712083309"
              expiryDate="12/22"
              CardType="Escrow account"
            />
          </div>

          {/* Third Card */}
          <div className="w-full mt-11 cursor-pointer transition-transform hover:scale-[1.02]"
               onClick={() => handleCardClick("Checking account")}>
            <CreditAccount2
              balance={70005673}
              cardHolder="Coforge Inc"
              cardNumber="8712434432"
              expiryDate="12/22"
              CardType="Foreign currency "
              currency="£"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-[#1d1E9C] to-blue-500 bg-clip-text text-transparent">
                Recent transactions
              </h2>
            </div>
            <div className="space-y-4">
              {[
                ...recentTransactionsByType.Escrow,
                ...recentTransactionsByType["Foreign account"],
                ...recentTransactionsByType["Checking account"]
              ]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 6)
                .map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {transaction.type === 'credit' ? 
                        <ArrowDown className="w-4 h-4 text-green-600" /> : 
                        <ArrowUp className="w-4 h-4 text-red-600" />
                      }
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">#{transaction.accountNumber}</span>
                      </div>
                      <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'credit' ? '+' : '-'}${(transaction.amount / 100).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Weekly Activity Chart */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-[#1d1E9C] to-blue-500 bg-clip-text text-transparent">
                Weekly activity
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivityData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="deposit" fill="#4C49ED" name="Deposits" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="withdraw" fill="#FF6B6B" name="Withdrawals" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Balance Trend */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-[#1d1E9C] to-blue-500 bg-clip-text text-transparent">
                Balance trend
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceHistoryData}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4C49ED" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4C49ED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4C49ED" 
                    fillOpacity={1} 
                    fill="url(#colorBalance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Expense Distribution */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-[#1d1E9C] to-blue-500 bg-clip-text text-transparent">
                Expense distribution
              </h2>
            </div>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-[#1d1E9C] to-blue-500 bg-clip-text text-transparent">
                Quick stats
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Total balance</p>
                <p className="text-2xl font-semibold">
                  ${((5100344 + 2143434 + 2100567) / 100).toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Monthly transactions</p>
                <p className="text-2xl font-semibold">
                  {Object.values(recentTransactionsByType).flat().length}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Total credits</p>
                <p className="text-2xl font-semibold text-green-600">
                  ${(Object.values(recentTransactionsByType)
                    .flat()
                    .filter(t => t.type === 'credit')
                    .reduce((sum, t) => sum + t.amount, 0) / 100).toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Total debits</p>
                <p className="text-2xl font-semibold text-red-600">
                  ${(Object.values(recentTransactionsByType)
                    .flat()
                    .filter(t => t.type === 'debit')
                    .reduce((sum, t) => sum + t.amount, 0) / 100).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CreditAccount } from "@/components/CreditCard";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend, AreaChart, Area } from "recharts";
import { DollarSign, CreditCard as CardIcon, ArrowUpRight, Wallet, ArrowDown, ArrowUp, TrendingUp, PieChart as PieChartIcon } from "lucide-react";
import { Layout } from "@/components/Layout";

// Updated card accounts to match Index.tsx
const cardAccounts = [
  {
    type: "Checking account",
    balance: 18003443,
    cardHolder: "Coforge Inc",
    cardNumber: "8712434432",
    expiryDate: "12/22",
    Active: "active"
  },
  {
    type: "Escrow account",
    balance: 21434342,
    cardHolder: "Coforge Inc",
    cardNumber: "3778232389",
    expiryDate: "12/22",
    Active: "Active"
  },
  {
    type: "Foreign currency account",
    balance: 70005673,
    cardHolder: "Coforge Inc",
    cardNumber: "8712083309",
    expiryDate: "12/22",
    Active: "active"
  }
];

// Updated transactions data structure to include person/institution names
const transactionsByType = {
  "Escrow account": [
    {
      id: "TX-001",
      person: "Tata goods Inc",
      description: "Escrow payment",
      amount: 250000,
      date: "2024-03-15",
      type: "credit",
      accountNumber: "3778232389",
      accountName: "Escrow account"
    },
    {
      id: "TX-002",
      person: "Real estate corp",
      description: "Escrow Deposit",
      amount: 180000,
      date: "2024-03-12",
      type: "debit",
      accountNumber: "3778232389",
      accountName: "Escrow account"
    },
    {
      id: "TX-007",
      person: "Property management LLC",
      description: "Monthly Escrow",
      amount: 320000,
      date: "2024-03-08",
      type: "credit",
      accountNumber: "3778232389",
      accountName: "Escrow account"
    },
    {
      id: "TX-008",
      person: "City housing authority",
      description: "Property Tax Payment",
      amount: 150000,
      date: "2024-03-05",
      type: "debit",
      accountNumber: "3778232389",
      accountName: "Escrow account"
    },
    {
      id: "TX-009",
      person: "Home insurance Co",
      description: "Insurance Payment",
      amount: 75000,
      date: "2024-03-01",
      type: "debit",
      accountNumber: "3778232389",
      accountName: "Escrow account"
    }
  ],
  "Foreign currency account": [
    {
      id: "TX-003",
      person: "Global trading Ltd",
      description: "International transfer",
      amount: 320000,
      date: "2024-03-14",
      type: "credit",
      accountNumber: "8712083309",
      accountName: "Foreign currency account"
    },
    {
      id: "TX-004",
      person: "Euro exchange Inc",
      description: "Foreign exchange",
      amount: 150000,
      date: "2024-03-11",
      type: "debit",
      accountNumber: "8712083309",
      accountName: "Foreign currency account"
    },
    {
      id: "TX-010",
      person: "Asian markets Corp",
      description: "Import payment",
      amount: 450000,
      date: "2024-03-07",
      type: "debit",
      accountNumber: "8712083309",
      accountName: "Foreign currency account"
    },
    {
      id: "TX-011",
      person: "Deutsche bank AG",
      description: "SWIFT transfer",
      amount: 680000,
      date: "2024-03-04",
      type: "credit",
      accountNumber: "8712083309",
      accountName: "Foreign currency account"
    },
    {
      id: "TX-012",
      person: "HSBC holdings",
      description: "Forex settlement",
      amount: 290000,
      date: "2024-03-02",
      type: "credit",
      accountNumber: "8712083309",
      accountName: "Foreign currency account"
    }
  ],
  "Checking account": [
    {
      id: "TX-005",
      person: "Payroll services",
      description: "Direct deposit",
      amount: 450000,
      date: "2024-03-13",
      type: "credit",
      accountNumber: "8712434432",
      accountName: "Checking account"
    },
    {
      id: "TX-006",
      person: "ATM withdrawal",
      description: "Cash withdrawal",
      amount: 75000,
      date: "2024-03-10",
      type: "debit",
      accountNumber: "8712434432",
      accountName: "Checking account"
    },
    {
      id: "TX-013",
      person: "Amazon.com",
      description: "Online purchase",
      amount: 12500,
      date: "2024-03-06",
      type: "debit",
      accountNumber: "8712434432",
      accountName: "Checking account"
    },
    {
      id: "TX-014",
      person: "Walmart stores",
      description: "POS purchase",
      amount: 8500,
      date: "2024-03-03",
      type: "debit",
      accountNumber: "8712434432",
      accountName: "Checking account"
    },
    {
      id: "TX-015",
      person: "Utility company",
      description: "Bill payment",
      amount: 25000,
      date: "2024-03-01",
      type: "debit",
      accountNumber: "8712434432",
      accountName: "Checking account"
    }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Accounts = () => {
  const [selectedCard, setSelectedCard] = useState(cardAccounts[0]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  // Calculate totals based on selected card's transactions
  const totals = useMemo(() => {
    const transactions = transactionsByType[selectedCard.type] || [];
    return transactions.reduce((acc, curr) => {
      if (curr.type === 'credit') {
        acc.income += curr.amount;
      } else {
        acc.expense += curr.amount;
      }
      return acc;
    }, { income: 0, expense: 0 });
  }, [selectedCard.type]);

  // Get filtered transactions for selected card
  const filteredTransactions = useMemo(() => {
    return transactionsByType[selectedCard.type] || [];
  }, [selectedCard.type]);

  // Calculate chart data based on selected account's transactions
  const chartData = useMemo(() => {
    const transactions = transactionsByType[selectedCard.type] || [];
    
    // Create a map to store daily totals
    const dailyTotals = new Map();
    
    // Initialize the last 7 days with 0 values
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyTotals.set(dateStr, { debit: 0, credit: 0 });
    }

    // Sum up transactions by date
    transactions.forEach(transaction => {
      const dateStr = transaction.date;
      if (dailyTotals.has(dateStr)) {
        const current = dailyTotals.get(dateStr);
        if (transaction.type === 'credit') {
          current.credit += transaction.amount;
        } else {
          current.debit += transaction.amount;
        }
        dailyTotals.set(dateStr, current);
      }
    });

    // Convert to chart data format and ensure values are numbers
    return Array.from(dailyTotals.entries()).map(([date, values]) => ({
      name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      debit: values.debit / 100,
      credit: values.credit / 100
    }));
  }, [selectedCard.type]);

  // Calculate spending by category
  const spendingByCategory = useMemo(() => {
    const transactions = transactionsByType[selectedCard.type] || [];
    const categories = transactions.reduce((acc, curr) => {
      if (curr.type === 'debit') {
        const category = curr.description.split(' ')[0];
        acc[category] = (acc[category] || 0) + Number(curr.amount);
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value: Number(value) / 100
    }));
  }, [selectedCard.type]);

  // Calculate balance trend data
  const balanceTrendData = useMemo(() => {
    const transactions = transactionsByType[selectedCard.type] || [];
    let balance: number = Number(selectedCard.balance) / 100;
    const trend = [];
    
    // Sort transactions by date in ascending order
    const sortedTransactions = [...transactions].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    sortedTransactions.forEach(transaction => {
      const amount = Number(transaction.amount) / 100;
      if (transaction.type === 'credit') {
        balance += amount;
      } else {
        balance -= amount;
      }
      trend.push({
        date: new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        balance: Number(balance.toFixed(2))
      });
    });

    return trend;
  }, [selectedCard.type, selectedCard.balance]);

  return (
    <Layout title="Accounts">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 sm:p-6 flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Wallet className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted">Balance</p>
                <p className="text-xl font-semibold">${48095700}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <ArrowUpRight className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted">Deposite</p>
                <p className="text-xl font-semibold">${(totals.income / 100).toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6 flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted">Withdrawal</p>
                <p className="text-xl font-semibold">${(totals.expense / 100).toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6 flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CardIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted">Total saving</p>
                <p className="text-xl font-semibold">${((totals.income - totals.expense) / 100).toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardContent className="p-6">
                <select
                  value={selectedCard.type}
                  onChange={(e) => {
                    const selected = cardAccounts.find(card => card.type === e.target.value);
                    if (selected) setSelectedCard(selected);
                  }}
                  className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {cardAccounts.map((card) => (
                    <option key={card.type} value={card.type}>
                      {card.type}
                    </option>
                  ))}
                </select>
                <CreditAccount
                  balance={selectedCard.balance}
                  cardHolder={selectedCard.cardHolder}
                  cardNumber={selectedCard.cardNumber}
                  expiryDate={selectedCard.expiryDate}
                  Active={selectedCard.Active}
                  CardType={selectedCard.type}
                  currency={selectedCard.type === "Foreign currency account" ? "£" : "$"}
                />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-8">
            <Card className="lg:w-full mb-6 h-[370px]">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Transaction history</h2>
                </div>
                <div className="space-y-4 h-[250px] overflow-y-auto">
                  {filteredTransactions.map((transaction) => (
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
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{transaction.person}</p>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{transaction.description}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs font-medium text-blue-600">{transaction.accountName}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">#{transaction.accountNumber}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'credit' ? '+' : '-'}${(transaction.amount / 100).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="w-full mt-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Balance trend</h2>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="p-2 border rounded-lg text-sm"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceTrendData}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1d1E9C" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1d1E9C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#1d1E9C" 
                    fillOpacity={1} 
                    fill="url(#colorBalance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Accounts;
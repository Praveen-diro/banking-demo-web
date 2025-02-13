import React, { useState, useMemo } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { CreditAccount, CreditCard, CreditCardBack, DummyCard } from "@/components/CreditCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  Download, 
  FileDown, 
  FileText,
  Printer,
  Filter,
  Search,
  Calendar as CalendarIcon,
  Loader2
} from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import autoTable, { FontStyle } from 'jspdf-autotable';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const statements = [
  // Checking Account Statements - 2024
  {
    id: "STMT-2024-03-CHK",
    description: "March 2024 - Checking account monthly statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2024-03-20",
    amount: 1250000,
    downloadUrl: "statements/mar-2024.pdf"
  },
  {
    id: "STMT-2024-02-CHK",
    description: "February 2024 - Checking account monthly statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2024-02-20",
    amount: 980000,
    downloadUrl: "statements/feb-2024.pdf"
  },
  {
    id: "STMT-2024-01-CHK",
    description: "January 2024 - Checking account monthly statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2024-01-20",
    amount: 1750000,
    downloadUrl: "statements/jan-2024.pdf"
  },
  // Checking Account Statements - 2023
  {
    id: "STMT-2023-12-CHK",
    description: "December 2023 - Checking account monthly statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2023-12-20",
    amount: 890000,
    downloadUrl: "/statements/dec-2023.pdf"
  },
  {
    id: "STMT-2023-11-CHK",
    description: "November 2023 - Checking account monthly statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2023-11-20",
    amount: 1120000,
    downloadUrl: "/statements/nov-2023.pdf"
  },
  {
    id: "STMT-2023-10-CHK",
    description: "October 2023 - Checking account monthly statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2023-10-20",
    amount: 2250000,
    downloadUrl: "/statements/oct-2023.pdf"
  },
  {
    id: "STMT-2023-09-CHK",
    description: "September 2023 - Checking account monthly statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2023-09-20",
    amount: 1575000,
    downloadUrl: "/statements/sep-2023.pdf"
  },
  {
    id: "STMT-2023-08-CHK",
    description: "August 2023 - Checking account monthly statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2023-08-20",
    amount: 2100000,
    downloadUrl: "/statements/aug-2023.pdf"
  },
  {
    id: "STMT-2023-07-CHK",
    description: "July 2023 - Checking account monthly statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2023-07-20",
    amount: 1890000,
    downloadUrl: "/statements/jul-2023.pdf"
  },
  {
    id: "STMT-2023-06-CHK",
    description: "June 2023 - Checking account monthly statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2023-06-20",
    amount: 1650000,
    downloadUrl: "/statements/jun-2023.pdf"
  },
  {
    id: "STMT-2023-05-CHK",
    description: "May 2023 - Checking account monthly statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2023-05-20",
    amount: 1950000,
    downloadUrl: "/statements/may-2023.pdf"
  },
  {
    id: "STMT-2023-04-CHK",
    description: "April 2023 - Checking account monthly statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2023-04-20",
    amount: 2450000,
    downloadUrl: "/statements/apr-2023.pdf"
  },

  // Foreign Currency Account Statements - 2024
  {
    id: "STMT-2024-03-FX",
    description: "March 2024 - Foreign Currency account monthly statement",
    type: " Foreign Currency account monthly statementncy account",
    accountNumber: "8712083309",
    date: "2024-03-20",
    amount: 1350000,
    downloadUrl: "statements/mar-2024-fx.pdf"
  },
  {
    id: "STMT-2024-02-FX",
    description: "February 2024 - Foreign Currency account monthly statement",
    type: "Foreign currency account",
    accountNumber: "8712083309",
    date: "2024-02-20",
    amount: 1180000,
    downloadUrl: "statements/feb-2024-fx.pdf"
  },
  {
    id: "STMT-2024-01-FX",
    description: "January 2024 - Foreign Currency account monthly statement",
    type: "Foreign currency account",
    accountNumber: "8712083309",
    date: "2024-01-20",
    amount: 1950000,
    downloadUrl: "statements/jan-2024-fx.pdf"
  },
  // Foreign Currency Account Statements - 2023
  {
    id: "STMT-2023-12-FX",
    description: "December 2023 - Foreign Currency account monthly statement",
    type: "Foreign currency account",
    accountNumber: "8712083309",
    date: "2023-12-20",
    amount: 990000,
    downloadUrl: "/statements/dec-2023-fx.pdf"
  },
  {
    id: "STMT-2023-11-FX",
    description: "November 2023 - Foreign Currency account monthly statement",
    type: "Foreign currency account",
    accountNumber: "8712083309",
    date: "2023-11-20",
    amount: 1220000,
    downloadUrl: "/statements/nov-2023-fx.pdf"
  },
  {
    id: "STMT-2023-10-FX",
    description: "October 2023 - Foreign Currency account monthly statement",
    type: "Foreign currency account",
    accountNumber: "8712083309",
    date: "2023-10-20",
    amount: 2350000,
    downloadUrl: "/statements/oct-2023-fx.pdf"
  },
  {
    id: "STMT-2023-09-FX",
    description: "September 2023 - Foreign Currency account monthly statement",
    type: "Foreign currency account",
    accountNumber: "8712083309",
    date: "2023-09-20",
    amount: 1675000,
    downloadUrl: "/statements/sep-2023-fx.pdf"
  },
  {
    id: "STMT-2023-08-FX",
    description: "August 2023 - Foreign Currency account monthly statement",
    type: "Foreign currency account",
    accountNumber: "8712083309",
    date: "2023-08-20",
    amount: 2200000,
    downloadUrl: "/statements/aug-2023-fx.pdf"
  },
  {
    id: "STMT-2023-07-FX",
    description: "July 2023 - Foreign Currency account monthly statement",
    type: "Foreign currency account",
    accountNumber: "8712083309",
    date: "2023-07-20",
    amount: 1990000,
    downloadUrl: "/statements/jul-2023-fx.pdf"
  },
  {
    id: "STMT-2023-06-FX",
    description: "June 2023 - Foreign Currency account monthly statement",
    type: "Foreign currency account",
    accountNumber: "8712083309",
    date: "2023-06-20",
    amount: 1750000,
    downloadUrl: "/statements/jun-2023-fx.pdf"
  },
  {
    id: "STMT-2023-05-FX",
    description: "May 2023 - Foreign Currency account monthly statement",
    type: "Foreign currency account",
    accountNumber: "8712083309",
    date: "2023-05-20",
    amount: 2050000,
    downloadUrl: "/statements/may-2023-fx.pdf"
  },
  {
    id: "STMT-2023-04-FX",
    description: "April 2023 - Foreign Currency account monthly statement",
    type: "Foreign currency account",
    accountNumber: "8712083309",
    date: "2023-04-20",
    amount: 2550000,
    downloadUrl: "/statements/apr-2023-fx.pdf"
  },

  // Escrow Account Statements - 2024
  {
    id: "STMT-2024-03-ESC",
    description: "March 2024 - Escrow account monthly statement",
    type: "Escrow account",
    accountNumber: "3778232389",
    date: "2024-03-20",
    amount: 1450000,
    downloadUrl: "statements/mar-2024-esc.pdf"
  },
  {
    id: "STMT-2024-02-ESC",
    description: "February 2024 - Escrow account monthly statement",
    type: "Escrow account",
    accountNumber: "3778232389",
    date: "2024-02-20",
    amount: 1280000,
    downloadUrl: "statements/feb-2024-esc.pdf"
  },
  {
    id: "STMT-2024-01-ESC",
    description: "January 2024 - Escrow account monthly statement",
    type: "Escrow account",
    accountNumber: "3778232389",
    date: "2024-01-20",
    amount: 2050000,
    downloadUrl: "statements/jan-2024-esc.pdf"
  },
  // Escrow Account Statements - 2023
  {
    id: "STMT-2023-12-ESC",
    description: "December 2023 - Escrow account monthly statement",
    type: "Escrow account",
    accountNumber: "3778232389",
    date: "2023-12-20",
    amount: 1090000,
    downloadUrl: "/statements/dec-2023-esc.pdf"
  },
  {
    id: "STMT-2023-11-ESC",
    description: "November 2023 - Escrow account monthly statement",
    type: "Escrow account",
    accountNumber: "3778232389",
    date: "2023-11-20",
    amount: 1320000,
    downloadUrl: "/statements/nov-2023-esc.pdf"
  },
  {
    id: "STMT-2023-10-ESC",
    description: "October 2023 - Escrow account monthly statement",
    type: "Escrow account",
    accountNumber: "3778232389",
    date: "2023-10-20",
    amount: 2450000,
    downloadUrl: "/statements/oct-2023-esc.pdf"
  },
  {
    id: "STMT-2023-09-ESC",
    description: "September 2023 - Escrow account monthly statement",
    type: "Escrow account",
    accountNumber: "3778232389",
    date: "2023-09-20",
    amount: 1775000,
    downloadUrl: "/statements/sep-2023-esc.pdf"
  },
  {
    id: "STMT-2023-08-ESC",
    description: "August 2023 - Escrow account monthly statement",
    type: "Escrow account",
    accountNumber: "3778232389",
    date: "2023-08-20",
    amount: 2300000,
    downloadUrl: "/statements/aug-2023-esc.pdf"
  },
  {
    id: "STMT-2023-07-ESC",
    description: "July 2023 - Escrow account monthly statement",
    type: "Escrow account",
    accountNumber: "3778232389",
    date: "2023-07-20",
    amount: 2090000,
    downloadUrl: "/statements/jul-2023-esc.pdf"
  },
  {
    id: "STMT-2023-06-ESC",
    description: "June 2023 - Escrow account monthly statement",
    type: "Escrow account",
    accountNumber: "3778232389",
    date: "2023-06-20",
    amount: 1850000,
    downloadUrl: "/statements/jun-2023-esc.pdf"
  },
  {
    id: "STMT-2023-05-ESC",
    description: "May 2023 - Escrow account monthly statement",
    type: "Escrow account",
    accountNumber: "3778232389",
    date: "2023-05-20",
    amount: 2150000,
    downloadUrl: "/statements/may-2023-esc.pdf"
  },
  {
    id: "STMT-2023-04-ESC",
    description: "April 2023 - Escrow account monthly statement",
    type: "Escrow account",
    accountNumber: "3778232389",
    date: "2023-04-20",
    amount: 2650000,
    downloadUrl: "/statements/apr-2023-esc.pdf"
  }
];

const transactionData = [
  { month: "09:00", amount: 5000000, volume: 234 },
  { month: "10:00", amount: 8500000, volume: 345 },
  { month: "11:00", amount: 5500000, volume: 456 },
  { month: "12:00", amount: 12500000, volume: 567 },
  { month: "13:00", amount: 7500000, volume: 678 },
  { month: "14:00", amount: 9500000, volume: 789 },
];

const downloadTransactionReport = (type: string, startDate?: Date, endDate?: Date) => {
  const doc = new jsPDF()
  autoTable(doc, {
    head: [['Statement ID', 'Description', 'Type', 'Account Number', 'Date', 'Amount']],
    body: generateRandomTransactions(statements[0]).map(t => [
      t.id,
      t.description,
      t.type,
      t.accountNumber,
      t.date,
      `$${t.amount.toLocaleString()}`
    ]),
    styles: { font: 'helvetica' as FontStyle },
  })

  const currentDate = format(new Date(), 'yyyy-MM-dd')
  const fileName = `${type.replace(/\s+/g, '_')}_Statement_${currentDate}.pdf`
  doc.save(fileName)
}

const transactionTypes = [
  'All Types',
  'International',
  'Domestic',
  'Investment',
  'Settlement',
  'Treasury',
  'Trade Finance',
  'Loan',
  'Corporate'
];

// Add transaction data for each statement
const transactionsByStatement = {
  "STMT-2024-03": [
    { date: "2024-03-15", description: "Salary Deposit", amount: 450000, type: "credit" },
    { date: "2024-03-12", description: "Utility Payment", amount: -85000, type: "debit" },
    { date: "2024-03-10", description: "Online Transfer", amount: -120000, type: "debit" },
    { date: "2024-03-05", description: "Investment Return", amount: 250000, type: "credit" },
    { date: "2024-03-01", description: "ATM Withdrawal", amount: -50000, type: "debit" }
  ],
  "STMT-2024-02": [
    { date: "2024-02-25", description: "International Wire", amount: 780000, type: "credit" },
    { date: "2024-02-20", description: "Foreign Exchange", amount: -320000, type: "debit" },
    { date: "2024-02-15", description: "Service Charge", amount: -15000, type: "debit" },
    { date: "2024-02-10", description: "Trade Settlement", amount: 450000, type: "credit" },
    { date: "2024-02-05", description: "Currency Exchange", amount: -180000, type: "debit" }
  ],
  "STMT-2024-01": [
    { date: "2024-01-28", description: "Escrow account Payment", amount: 850000, type: "credit" },
    { date: "2024-01-25", description: "Property Tax", amount: -420000, type: "debit" },
    { date: "2024-01-20", description: "Insurance Premium", amount: -180000, type: "debit" },
    { date: "2024-01-15", description: "Maintenance Fee", amount: -75000, type: "debit" },
    { date: "2024-01-10", description: "Rental Income", amount: 650000, type: "credit" }
  ],
  "STMT-2023-12": [
    { date: "2023-12-30", description: "Year-End Bonus", amount: 550000, type: "credit" },
    { date: "2023-12-25", description: "Holiday Shopping", amount: -180000, type: "debit" },
    { date: "2023-12-20", description: "Direct Deposit", amount: 420000, type: "credit" },
    { date: "2023-12-15", description: "Credit Card Payment", amount: -250000, type: "debit" },
    { date: "2023-12-10", description: "Investment Dividend", amount: 150000, type: "credit" }
  ],
  "STMT-2023-11": [
    { date: "2023-11-28", description: "Wire Transfer", amount: 680000, type: "credit" },
    { date: "2023-11-25", description: "Currency Trade", amount: -320000, type: "debit" },
    { date: "2023-11-20", description: "Commission Fee", amount: -45000, type: "debit" },
    { date: "2023-11-15", description: "FX Settlement", amount: 550000, type: "credit" },
    { date: "2023-11-10", description: "Trading Fee", amount: -85000, type: "debit" }
  ],
  "STMT-2023-10": [
    { date: "2023-10-30", description: "Property Sale", amount: 1500000, type: "credit" },
    { date: "2023-10-25", description: "Legal Fee", amount: -250000, type: "debit" },
    { date: "2023-10-20", description: "Escrow account Deposit", amount: 850000, type: "credit" },
    { date: "2023-10-15", description: "Title Insurance", amount: -180000, type: "debit" },
    { date: "2023-10-10", description: "Processing Fee", amount: -45000, type: "debit" }
  ],
  "STMT-2023-09": [
    { date: "2023-09-28", description: "Payroll Deposit", amount: 480000, type: "credit" },
    { date: "2023-09-25", description: "Mortgage Payment", amount: -320000, type: "debit" },
    { date: "2023-09-20", description: "ATM Withdrawal", amount: -60000, type: "debit" },
    { date: "2023-09-15", description: "Interest Credit", amount: 85000, type: "credit" },
    { date: "2023-09-10", description: "Service Charge", amount: -25000, type: "debit" }
  ],
  "STMT-2023-08": [
    { date: "2023-08-30", description: "FX Trading Profit", amount: 950000, type: "credit" },
    { date: "2023-08-25", description: "Wire Fee", amount: -45000, type: "debit" },
    { date: "2023-08-20", description: "Currency Purchase", amount: -580000, type: "debit" },
    { date: "2023-08-15", description: "Trading Income", amount: 750000, type: "credit" },
    { date: "2023-08-10", description: "Account Fee", amount: -35000, type: "debit" }
  ],
  "STMT-2023-07": [
    { date: "2023-07-28", description: "Trust Deposit", amount: 1200000, type: "credit" },
    { date: "2023-07-25", description: "Property Tax", amount: -450000, type: "debit" },
    { date: "2023-07-20", description: "Insurance Payment", amount: -180000, type: "debit" },
    { date: "2023-07-15", description: "Escrow account Credit", amount: 580000, type: "credit" },
    { date: "2023-07-10", description: "Management Fee", amount: -75000, type: "debit" }
  ],
  "STMT-2023-06": [
    { date: "2023-06-30", description: "Quarterly Bonus", amount: 850000, type: "credit" },
    { date: "2023-06-25", description: "Utility Bill", amount: -120000, type: "debit" },
    { date: "2023-06-20", description: "Salary Credit", amount: 450000, type: "credit" },
    { date: "2023-06-15", description: "Card Payment", amount: -280000, type: "debit" },
    { date: "2023-06-10", description: "Dividend Income", amount: 180000, type: "credit" }
  ],
  "STMT-2023-05": [
    { date: "2023-05-28", description: "FX Settlement", amount: 880000, type: "credit" },
    { date: "2023-05-25", description: "Trading Cost", amount: -250000, type: "debit" },
    { date: "2023-05-20", description: "Wire Transfer", amount: 650000, type: "credit" },
    { date: "2023-05-15", description: "Service Fee", amount: -45000, type: "debit" },
    { date: "2023-05-10", description: "Exchange Rate Gain", amount: 420000, type: "credit" }
  ],
  "STMT-2023-04": [
    { date: "2023-04-30", description: "Escrow account Settlement", amount: 1500000, type: "credit" },
    { date: "2023-04-25", description: "Legal Services", amount: -350000, type: "debit" },
    { date: "2023-04-20", description: "Property Deposit", amount: 950000, type: "credit" },
    { date: "2023-04-15", description: "Insurance Premium", amount: -220000, type: "debit" },
    { date: "2023-04-10", description: "Processing Charge", amount: -65000, type: "debit" }
  ]
};

// Function to generate random transactions
const generateRandomTransactions = (statement: typeof statements[0]) => {
  const descriptions = [
    "Salary Deposit", "Utility Payment", "Online Transfer", "Investment Return", 
    "ATM Withdrawal", "Wire Transfer", "Service Charge", "Interest Credit",
    "Insurance Premium", "Rental Income", "Dividend Payment", "Loan Payment",
    "Tax Refund", "Commission", "Trading Profit", "Subscription Fee"
  ];

  const generateRandomAmount = () => Math.floor(Math.random() * 1000000) + 50000;
  const generateRandomDate = (statementDate: string) => {
    const date = new Date(statementDate);
    date.setDate(Math.floor(Math.random() * 28) + 1);
    return date.toISOString().split('T')[0];
  };

  return Array.from({ length: 8 }, (_, index) => ({
    id: `TX-${statement.id}-${index + 1}`,
    date: generateRandomDate(statement.date),
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    amount: generateRandomAmount(),
    type: Math.random() > 0.5 ? "credit" : "debit",
    accountNumber: statement.accountNumber
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Add All Accounts option to cardAccounts array at the top
const cardAccounts = [
  {
    type: "Checking account",
    balance: 18003443,
    cardHolder: "FluxPay Inc",
    cardNumber: "8712434432",
    expiryDate: "12/22",
    Active: "active"
  },
  {
    type: "Escrow account",
    balance: 21434342,
    cardHolder: "FluxPay Inc",
    cardNumber: "3778232389",
    expiryDate: "12/22",
    Active: "Active"
  },
  {
    type: "Foreign currency account",
    balance: 70005673,
    cardHolder: "FluxPay Inc",
    cardNumber: "8712083309",
    expiryDate: "12/22",
    Active: "active"
  }
];

const Transactions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(
    cardAccounts.find(card => card.type === location.state?.selectedAccount) || cardAccounts[0]
  );
  
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('Custom Period');
  const [showCustomPeriod, setShowCustomPeriod] = useState(true);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [dateError, setDateError] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState(selectedCard.type);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const formatDisplayDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else if (diffDays <= 14) {
      return "2 weeks ago";
    } else if (diffDays <= 31) {
      return "1 month ago";
    } else if (diffDays <= 62) {
      return "2 months ago";
    } else {
      return date.toLocaleDateString();
    }
  };

  const validateDateRange = (start: string, end: string): boolean => {
    if (!start || !end) return false;
    const startDate = new Date(start);
    const endDate = new Date(end);
    return startDate <= endDate;
  };

  const isWithinDateRange = (dateStr: string, filterType: string): boolean => {
    const transactionDate = new Date(dateStr);
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    
    if (filterType === 'Custom Period') {
      if (!startDate && !endDate) return true;
      
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      
      if (start && end) {
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        
        const txDate = new Date(dateStr);
        txDate.setHours(0, 0, 0, 0);
        
        return txDate >= start && txDate <= end;
      } else if (start) {
        const txDate = new Date(dateStr);
        txDate.setHours(0, 0, 0, 0);
        return txDate >= start;
      } else if (end) {
        const txDate = new Date(dateStr);
        txDate.setHours(23, 59, 59, 999);
        return txDate <= end;
      }
      return true;
    }
    
    switch (filterType) {
      case 'Last 7 days': {
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);
        return transactionDate >= sevenDaysAgo && transactionDate <= now;
      }
      case 'Last month': {
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        monthAgo.setHours(0, 0, 0, 0);
        return transactionDate >= monthAgo && transactionDate <= now;
      }
      case 'Last year': {
        const yearAgo = new Date(now);
        yearAgo.setFullYear(now.getFullYear() - 1);
        yearAgo.setHours(0, 0, 0, 0);
        return transactionDate >= yearAgo && transactionDate <= now;
      }
      case 'All time':
      default:
        return true;
    }
  };

  // Update handleTypeFilterChange
  const handleTypeFilterChange = (type: string) => {
    const card = cardAccounts.find(card => card.type === type) || cardAccounts[0];
    setSelectedCard(card);
    setTypeFilter(card.type);
    navigate('.', { 
      state: { selectedAccount: card.type },
      replace: true 
    });
  };

  // Update filteredStatements to group by month
  const filteredStatements = useMemo(() => {
    // First filter statements based on search and date range
    const filtered = statements.filter(statement => {
      const matchesSearch = 
        statement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        statement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        statement.accountNumber.includes(searchTerm);

      const matchesDate = isWithinDateRange(statement.date, dateFilter);
      
      const matchesType = statement.type === typeFilter;

      return matchesSearch && matchesDate && matchesType;
    });

    // Sort statements by date in descending order and group by month
    return filtered.sort((a, b) => {
      // First sort by date in descending order
      const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
      
      if (dateComparison === 0) {
        // If dates are the same, sort by account type in a specific order
        const typeOrder = {
          "Checking account": 1,
          " Foreign Currency account monthly statementncy account": 2,
          "Escrow account": 3
        };
        return (typeOrder[a.type] || 0) - (typeOrder[b.type] || 0);
      }
      
      return dateComparison;
    });
  }, [searchTerm, dateFilter, typeFilter, startDate, endDate]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredStatements.length / itemsPerPage);
  const paginatedStatements = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStatements.slice(start, start + itemsPerPage);
  }, [filteredStatements, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    setShowCustomPeriod(value === 'Custom Period');
    if (value !== 'Custom Period') {
      setStartDate(undefined);
      setEndDate(undefined);
      setDateError('');
    }
    setCurrentPage(1);
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (endDate && date && date > endDate) {
      setDateError('Start date must be before or equal to end date');
    } else {
      setDateError('');
    }
    setCurrentPage(1);
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    if (startDate && date && startDate > date) {
      setDateError('End date must be after or equal to start date');
    } else {
      setDateError('');
    }
    setCurrentPage(1);
  };

  // Update the handleDownloadStatement function
  const handleDownloadStatement = async (statement: typeof statements[0]) => {
    try {
      setDownloadingId(statement.id);
      
      // Create new PDF document
      const doc = new jsPDF();
      
      // Bank Information (Left Column)
      doc.setFontSize(16);
      doc.text('Bank of Little Rock', 15, 20);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('123 Main Street', 15, 30);
      doc.text('Little Rock, AR 72201', 15, 35);
      doc.text('United States', 15, 40);

      // Account Statement Title
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Account Statement', 15, 55);

      // Customer Information
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('FluxPay Inc', 15, 65);
      doc.text('456 Corporate Drive', 15, 70);
      doc.text('New York, NY 10001', 15, 75);
      doc.text('United States', 15, 80);

      // Statement Period and Generation Date
      doc.setTextColor(0, 0, 0);
      const startPeriod = statement.id.startsWith('STMT-CUSTOM-')
        ? format(startDate, "MMMM d, yyyy")
        : format(new Date(statement.date), "MMMM d, yyyy");
      const endPeriod = statement.id.startsWith('STMT-CUSTOM-')
        ? format(endDate, "MMMM d, yyyy")
        : format(new Date(statement.date), "MMMM d, yyyy");
      
      doc.text(`Statement Period: ${startPeriod} - ${endPeriod}`, 15, 95);
      doc.text(`Generated on: ${format(new Date(), "MMMM d, yyyy")}`, 120, 95);

      // Account Details and Balance Summary
      doc.text(statement.type, 15, 110);
      doc.text(`Opening Balance: $${(statement.amount / 100).toFixed(2)}`, 120, 110);
      doc.text(statement.accountNumber, 15, 115);
      doc.text(`Closing Balance: $${((statement.amount + 50000) / 100).toFixed(2)}`, 120, 115);

      // Get transactions
      const transactions = generateRandomTransactions(statement);

      // Add transactions table using autoTable
      autoTable(doc, {
        startY: 130,
        head: [['Date', 'Description', 'Amount', 'Type', 'Balance']],
        body: transactions.map((tx, index) => {
          let runningBalance = statement.amount;
          if (index > 0) {
            runningBalance = transactions
              .slice(0, index)
              .reduce((balance, t) => 
                t.type === 'credit' ? balance + t.amount : balance - t.amount, 
                statement.amount
              );
          }
          
          return [
            format(new Date(tx.date), "MM/dd/yyyy"),
            tx.description,
            tx.type === 'credit' ? 
              `+$${(tx.amount / 100).toFixed(2)}` : 
              `-$${(tx.amount / 100).toFixed(2)}`,
            tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
            `$${(runningBalance / 100).toFixed(2)}`
          ];
        }),
        styles: { 
          fontSize: 9,
          cellPadding: 5,
          overflow: 'linebreak',
          cellWidth: 'wrap'
        },
        headStyles: {
          fillColor: [29, 30, 156],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        columnStyles: {
          0: { cellWidth: 30 }, // Date
          1: { cellWidth: 55 }, // Description
          2: { cellWidth: 35, halign: 'right' }, // Amount
          3: { cellWidth: 25, halign: 'center' }, // Type
          4: { cellWidth: 35, halign: 'right' } // Balance
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250]
        },
        didDrawPage: function(data) {
          // Add footer on each page
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          const text = 'This is an official bank statement from Bank of Little Rock. For questions, please contact us at 1-800-555-0123.';
          const pageHeight = doc.internal.pageSize.height;
          doc.text(text, 20, pageHeight - 20);
          doc.text(`Page ${doc.getCurrentPageInfo().pageNumber} of ${doc.getNumberOfPages()}`, 180, pageHeight - 20);
        }
      });
      
      // Save the PDF
      const fileName = statement.id.startsWith('STMT-CUSTOM-')
        ? `Statement_${format(startDate, 'yyyy-MM-dd')}_to_${format(endDate, 'yyyy-MM-dd')}.pdf`
        : `Statement_${statement.date}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Error generating statement:', error);
      alert('Failed to generate statement. Please try again later.');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Layout title="Statements">
      <div className="p-8">
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          {/* Account Selection */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/3">
              <select
                value={selectedCard.type}
                onChange={(e) => handleTypeFilterChange(e.target.value)}
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
                CardType={selectedCard.type}
                Active={selectedCard.Active}
                currency={selectedCard.type === " Foreign Currency account monthly statementncy account" ? "£" : "$"}
              />
          </div>

            {/* Search and Date Filter Section */}
            <div className="flex-1 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search statements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-4">
                <select
                  value={dateFilter}
                  onChange={(e) => handleDateFilterChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All time">All time</option>
                  <option value="Last 7 days">Last 7 days</option>
                  <option value="Last month">Last month</option>
                  <option value="Last year">Last year</option>
                  <option value="Custom Period">Custom period</option>
                </select>

                {/* Custom Period Section */}
                {showCustomPeriod && (
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !startDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? format(startDate, "PPP") : "Select start date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-white border rounded-md shadow-md z-50" align="start">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={(date) => {
                                handleStartDateChange(date);
                                setStartDateOpen(false);
                              }}
                              initialFocus
                              className="bg-white rounded-md"
                            />
                          </PopoverContent>
                        </Popover>
                    </div>
                      <div className="flex-1 relative">
                        <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !endDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? format(endDate, "PPP") : "Select end date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-white border rounded-md shadow-md z-50" align="start">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={(date) => {
                                handleEndDateChange(date);
                                setEndDateOpen(false);
                              }}
                              initialFocus
                              className="bg-white rounded-md"
                            />
                          </PopoverContent>
                        </Popover>
                    </div>
                  </div>
                    <Button
                      onClick={() => {
                        if (!startDate || !endDate) {
                          alert('Please select both start and end dates')
                          return
                        }
                        const customStatement = {
                          id: `STMT-CUSTOM-${new Date().getTime()}`,
                          description: `Custom Statement (${format(startDate, "PPP")} to ${format(endDate, "PPP")})`,
                          type: selectedCard.type,
                          accountNumber: selectedCard.cardNumber,
                          date: new Date().toISOString().split('T')[0],
                          amount: 0,
                          downloadUrl: ''
                        }
                        handleDownloadStatement(customStatement)
                      }}
                      disabled={!startDate || !endDate || downloadingId !== null}
                      className="w-full sm:w-auto bg-[#1d1E9C] text-white hover:bg-[#1d1E9C]/90 disabled:bg-[#1d1E9C]/50"
                    >
                      {downloadingId === 'custom' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Generate statement
                        </>
                      )}
                    </Button>
              </div>
              )}
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Statement ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Account number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStatements.map((statement) => (
                <TableRow key={statement.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{statement.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      {statement.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                      {statement.type}
                    </span>
                  </TableCell>
                  <TableCell>{statement.accountNumber}</TableCell>
                  <TableCell>{formatDisplayDate(statement.date)}</TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => handleDownloadStatement(statement)}
                      disabled={downloadingId === statement.id}
                      className="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {downloadingId === statement.id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <FileDown className="w-5 h-5" />
                      )}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">
                Showing {paginatedStatements.length} of {filteredStatements.length} statements
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === i + 1 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Transactions;
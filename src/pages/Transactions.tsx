import React, { useState, useMemo } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { CreditAccount, CreditCard, CreditCardBack } from "@/components/CreditCard";
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
  Calendar,
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

const statements = [
  {
    id: "STMT-2024-03",
    description: "March 2024 Statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2024-03-20",
    amount: 1250000,
    downloadUrl: "statements/mar-2024.pdf"
  },
  {
    id: "STMT-2024-02",
    description: "February 2024 Statement",
    type: "Foreign account",
    accountNumber: "3778232389",
    date: "2024-02-20",
    amount: 980000,
    downloadUrl: "statements/feb-2024.pdf"
  },
  {
    id: "STMT-2024-01",
    description: "January 2024 Statement",
    type: "Escrow",
    accountNumber: "8712083309",
    date: "2024-01-20",
    amount: 1750000,
    downloadUrl: "statements/jan-2024.pdf"
  },
  {
    id: "STMT-2023-12",
    description: "December 2023 Statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2023-12-20",
    amount: 890000,
    downloadUrl: "/statements/dec-2023.pdf"
  },
  {
    id: "STMT-2023-11",
    description: "November 2023 Statement",
    type: "Foreign account",
    accountNumber: "3778232389",
    date: "2023-11-20",
    amount: 1120000,
    downloadUrl: "/statements/nov-2023.pdf"
  },
  {
    id: "STMT-2023-10",
    description: "October 2023 Statement",
    type: "Escrow",
    accountNumber: "8712083309",
    date: "2023-10-20",
    amount: 2250000,
    downloadUrl: "/statements/oct-2023.pdf"
  },
  {
    id: "STMT-2023-09",
    description: "September 2023 Statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2023-09-20",
    amount: 1575000,
    downloadUrl: "/statements/sep-2023.pdf"
  },
  {
    id: "STMT-2023-08",
    description: "August 2023 Statement",
    type: "Foreign account",
    accountNumber: "3778232389",
    date: "2023-08-20",
    amount: 2100000,
    downloadUrl: "/statements/aug-2023.pdf"
  },
  {
    id: "STMT-2023-07",
    description: "July 2023 Statement",
    type: "Escrow",
    accountNumber: "8712083309",
    date: "2023-07-20",
    amount: 1890000,
    downloadUrl: "/statements/jul-2023.pdf"
  },
  {
    id: "STMT-2023-06",
    description: "June 2023 Statement",
    type: "Checking account",
    accountNumber: "8712434432",
    date: "2023-06-20",
    amount: 1650000,
    downloadUrl: "/statements/jun-2023.pdf"
  },
  {
    id: "STMT-2023-05",
    description: "May 2023 Statement",
    type: "Foreign account",
    accountNumber: "3778232389",
    date: "2023-05-20",
    amount: 1950000,
    downloadUrl: "/statements/may-2023.pdf"
  },
  {
    id: "STMT-2023-04",
    description: "April 2023 Statement",
    type: "Escrow",
    accountNumber: "8712083309",
    date: "2023-04-20",
    amount: 2450000,
    downloadUrl: "/statements/apr-2023.pdf"
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
  // This is a placeholder function - in a real app, this would generate and download a PDF
  console.log(`Downloading ${type} transaction report...`);
  if (startDate && endDate) {
    console.log(`For period: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
  }
};

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
    { date: "2024-01-28", description: "Escrow Payment", amount: 850000, type: "credit" },
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
    { date: "2023-10-20", description: "Escrow Deposit", amount: 850000, type: "credit" },
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
    { date: "2023-07-15", description: "Escrow Credit", amount: 580000, type: "credit" },
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
    { date: "2023-04-30", description: "Escrow Settlement", amount: 1500000, type: "credit" },
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
    date: generateRandomDate(statement.date),
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    amount: generateRandomAmount(),
    type: Math.random() > 0.5 ? "credit" : "debit"
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const Transactions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedAccountType, setSelectedAccountType] = useState(location.state?.selectedAccount || 'All Types');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('Custom Period');
  const [typeFilter, setTypeFilter] = useState(location.state?.selectedAccount || 'All Types');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCustomPeriod, setShowCustomPeriod] = useState(true);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');
  const itemsPerPage = 5;

  // Add loading state for downloads
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

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
      case 'Last 7 Days': {
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);
        return transactionDate >= sevenDaysAgo && transactionDate <= now;
      }
      case 'Last Month': {
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        monthAgo.setHours(0, 0, 0, 0);
        return transactionDate >= monthAgo && transactionDate <= now;
      }
      case 'Last Year': {
        const yearAgo = new Date(now);
        yearAgo.setFullYear(now.getFullYear() - 1);
        yearAgo.setHours(0, 0, 0, 0);
        return transactionDate >= yearAgo && transactionDate <= now;
      }
      case 'All Time':
      default:
        return true;
    }
  };

  // Add handler for type filter changes
  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
    setSelectedAccountType(value);
    // Update the URL state without redirecting
    navigate('.', { 
      state: { selectedAccount: value !== 'All Types' ? value : null },
      replace: true 
    });
  };

  // Filter transactions based on selected criteria and account type
  const filteredStatements = useMemo(() => {
    return statements.filter(statement => {
      const matchesSearch = 
        statement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        statement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        statement.accountNumber.includes(searchTerm);

      const matchesDate = isWithinDateRange(statement.date, dateFilter);
      
      const matchesType = typeFilter === 'All Types' || statement.type === typeFilter;

      return matchesSearch && matchesDate && matchesType;
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
      setStartDate('');
      setEndDate('');
      setDateError('');
    }
    setCurrentPage(1);
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    if (endDate && !validateDateRange(value, endDate)) {
      setDateError('Start date must be before or equal to end date');
    } else {
      setDateError('');
    }
    setCurrentPage(1);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    if (startDate && !validateDateRange(startDate, value)) {
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
      
      // Add light header background
      doc.setFillColor(240, 242, 245);
      doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F');
      doc.setFillColor(220, 222, 225);
      doc.rect(0, 40, doc.internal.pageSize.width, 2, 'F');

      // Add bank logo
      doc.addImage('/bank_logo.png', 'PNG', 20, 10, 45, 25);
      
      // Add subtitle
      doc.setTextColor(75, 85, 99);
      doc.setFontSize(12);
      doc.setFont("helvetica", "italic");
      doc.text("Your Community Banking Partner", 70, 25);

      // Add statement details
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.setFont("helvetica", "bold");
      doc.text("STATEMENT DETAILS", 20, 60);
      
      doc.setDrawColor(29, 30, 156);
      doc.setLineWidth(0.5);
      doc.line(20, 62, 90, 62);

      // Add statement info
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      
      const detailsY = 75;
      const col1X = 20;
      const col2X = 120;
      
      doc.text("Statement ID:", col1X, detailsY);
      doc.text("Account Type:", col1X, detailsY + 10);
      doc.text("Account Number:", col1X, detailsY + 20);
      doc.text("Period:", col1X, detailsY + 30);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text(statement.id, col2X, detailsY);
      doc.text(statement.type, col2X, detailsY + 10);
      doc.text(statement.accountNumber, col2X, detailsY + 20);

      // Format and display the date range for custom period
      const periodText = statement.id.startsWith('STMT-CUSTOM-')
        ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
        : new Date(statement.date).toLocaleDateString();
      doc.text(periodText, col2X, detailsY + 30);

      // Generate transactions based on date range for custom period
      let transactions;
      if (statement.id.startsWith('STMT-CUSTOM-')) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        // Generate transactions within the selected date range
        transactions = Array.from({ length: 8 }, () => {
          const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
          return {
            date: randomDate.toISOString().split('T')[0],
            description: [
              "Salary Deposit", "Utility Payment", "Online Transfer", "Investment Return", 
              "ATM Withdrawal", "Wire Transfer", "Service Charge", "Interest Credit"
            ][Math.floor(Math.random() * 8)],
            amount: Math.floor(Math.random() * 1000000) + 50000,
            type: Math.random() > 0.5 ? "credit" : "debit"
          };
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else {
        transactions = generateRandomTransactions(statement);
      }
      
      // Calculate totals
      const totals = transactions.reduce(
        (acc, tx) => {
          if (tx.type === 'credit') {
            acc.credits += tx.amount;
          } else {
            acc.debits += Math.abs(tx.amount);
          }
          return acc;
        },
        { credits: 0, debits: 0 }
      );
      
      // Calculate balances
      const openingBalance = Math.floor(Math.random() * 1000000) + 500000;
      const closingBalance = openingBalance + totals.credits - totals.debits;
      
      // Add balance summary
      doc.setFillColor(245, 247, 250);
      doc.rect(20, 115, 170, 45, 'F');
      doc.setDrawColor(29, 30, 156);
      doc.setLineWidth(0.5);
      doc.rect(20, 115, 170, 45, 'S');
      
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(29, 30, 156);
      doc.text("BALANCE SUMMARY", 25, 127);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      
      doc.text("Opening Balance:", 25, 140);
      doc.text("Total Credits:", 25, 150);
      doc.text("Closing Balance:", 110, 140);
      doc.text("Total Debits:", 110, 150);
      
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text(`$${(openingBalance / 100).toLocaleString()}`, 85, 140);
      doc.setTextColor(46, 124, 46);
      doc.text(`+$${(totals.credits / 100).toLocaleString()}`, 85, 150);
      doc.setTextColor(40, 40, 40);
      doc.text(`$${(closingBalance / 100).toLocaleString()}`, 170, 140);
      doc.setTextColor(180, 40, 40);
      doc.text(`-$${(totals.debits / 100).toLocaleString()}`, 170, 150);
      
      // Add transactions table
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(29, 30, 156);
      doc.text("TRANSACTION DETAILS", 20, 180);
      doc.setDrawColor(29, 30, 156);
      doc.line(20, 182, 120, 182);

      // Generate table data
      const tableData = transactions.map(tx => {
        const uniqueAccountNo = `${Math.floor(Math.random() * 9) + 1}${Math.random().toString().slice(2, 11)}`;
        
        return [
          new Date(tx.date).toLocaleDateString(),
          tx.description,
          uniqueAccountNo,
          tx.type === 'credit' 
            ? { content: `+$${(tx.amount / 100).toLocaleString()}`, styles: { textColor: [46, 124, 46] } }
            : { content: `-$${(Math.abs(tx.amount) / 100).toLocaleString()}`, styles: { textColor: [180, 40, 40] } },
          { content: tx.type.toUpperCase(), styles: { fontStyle: 'bold' } }
        ];
      });
      
      // Add table
      autoTable(doc, {
        startY: 190,
        head: [['Date', 'Description', 'Account No.', 'Amount', 'Type']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [29, 30, 156],
          textColor: 255,
          fontSize: 12,
          fontStyle: 'bold',
          halign: 'center'
        },
        styles: {
          fontSize: 10,
          cellPadding: 5,
          lineColor: [220, 220, 220],
          lineWidth: 0.5
        },
        columnStyles: {
          0: { cellWidth: 30, halign: 'center' },
          1: { cellWidth: 55 },
          2: { cellWidth: 40, halign: 'center' },
          3: { cellWidth: 30, halign: 'right' },
          4: { cellWidth: 25, halign: 'center' }
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250]
        }
      });
      
      // Add footer
      const pageCount = doc.getNumberOfPages();
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        doc.setDrawColor(220, 220, 220);
        doc.line(20, doc.internal.pageSize.height - 20, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20);
        
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
        
        const timestamp = new Date().toLocaleString();
        doc.text(
          `Generated on: ${timestamp}`,
          20,
          doc.internal.pageSize.height - 10
        );
        
        doc.text(
          'CONFIDENTIAL',
          doc.internal.pageSize.width - 20,
          doc.internal.pageSize.height - 10,
          { align: 'right' }
        );
      }
      
      // Save the PDF
      const timestamp = new Date().getTime();
      const fileName = statement.id.startsWith('STMT-CUSTOM-')
        ? `Custom_Statement_${startDate}_to_${endDate}_${timestamp}.pdf`
        : `${statement.type}_${statement.date}_statement_${timestamp}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Error generating statement:', error);
      alert('Failed to generate statement. Please try again later.');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Layout title={selectedAccountType !== 'All Types' ? `${selectedAccountType} Statements` : "All Statements"}>
      <div className="p-8">
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          {selectedAccountType !== 'All Types' && (
            <div className="mb-4">
              <h3 className="text-lg text-blue-600 font-medium">
                Viewing statements for: {selectedAccountType}
              </h3>
            </div>
          )}

          {/* Filter Section */}
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
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
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <select
                  value={typeFilter}
                  onChange={(e) => handleTypeFilterChange(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All Types">All Types</option>
                  <option value="Escrow">Escrow</option>
                  <option value="Foreign account">Foreign account</option>
                  <option value="Checking account">Checking account</option>
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) => handleDateFilterChange(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All Time">All Time</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last Month">Last Month</option>
                  <option value="Last Year">Last Year</option>
                  <option value="Custom Period">Custom Period</option>
                </select>

                {showCustomPeriod && (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        max={endDate || undefined}
                        className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <span className="text-gray-500">to</span>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        min={startDate || undefined}
                        className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (!startDate || !endDate) {
                          alert('Please select both start and end dates');
                          return;
                        }
                        const customStatement = {
                          id: `STMT-CUSTOM-${new Date().getTime()}`,
                          description: `Custom Statement (${startDate} to ${endDate})`,
                          type: typeFilter === 'All Types' ? 'All Accounts' : typeFilter,
                          accountNumber: 'ALL',
                          date: new Date().toISOString().split('T')[0],
                          amount: 0,
                          downloadUrl: ''
                        };
                        handleDownloadStatement(customStatement);
                      }}
                      disabled={!startDate || !endDate || downloadingId !== null}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {downloadingId ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <FileDown className="w-4 h-4" />
                      )}
                      Generate PDF
                    </button>
                  </div>
                )}
              </div>
              {dateError && (
                <p className="text-sm text-red-500">{dateError}</p>
              )}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Statement ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Account Number</TableHead>
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
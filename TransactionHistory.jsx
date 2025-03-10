import React, { useState } from 'react';
import './TransactionHistory.css';

const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const transactions = [
    { id: 1, type: 'Send', amount: 500, date: '2025-02-20', status: 'Completed', accountName: 'Kiran' },
    { id: 2, type: 'Receive', amount: 1000, date: '2025-03-02', status: 'Completed', accountName: 'Raghul' },
    { id: 3, type: 'Send', amount: 200, date: '2025-01-15', status: 'Pending', accountName: 'Rajesh' },
    { id: 4, type: 'Receive', amount: 300, date: '2025-03-04', status: 'Completed', accountName: 'Maya' },
  ];

  const getDateRange = (filter) => {
    const today = new Date();
    switch (filter) {
      case 'Today':
        return today.toISOString().split('T')[0]; // YYYY-MM-DD
      case 'This Week':
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const endOfWeek = new Date(today.setDate(today.getDate() + 6));
        return { start: startOfWeek.toISOString().split('T')[0], end: endOfWeek.toISOString().split('T')[0] };
      case 'This Month':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return { start: startOfMonth.toISOString().split('T')[0], end: endOfMonth.toISOString().split('T')[0] };
      default:
        return null;
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchSearch = transaction.amount.toString().includes(searchTerm) || 
                        transaction.accountName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = transactionType ? 
                      (transaction.type === transactionType || 
                       (transactionType === 'Pending' && transaction.status === 'Pending')) : true;

    const dateRange = getDateRange(dateFilter);
    let matchDate = true;
    if (dateRange) {
      if (typeof dateRange === 'string') {
        matchDate = transaction.date === dateRange;
      } else {
        matchDate = transaction.date >= dateRange.start && transaction.date <= dateRange.end;
      }
    }

    return matchSearch && matchType && matchDate;
  });

  return (
    <div className="transaction-history-container">
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search by Amount or Account Name" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        
        <div className="filter-options">
          <select 
            onChange={(e) => setTransactionType(e.target.value)} 
            value={transactionType}
            aria-label="Filter by transaction type"
          >
            <option value="">All Types</option>
            <option value="Send">Sent</option>
            <option value="Receive">Received</option>
            <option value="Pending">Pending</option>
          </select>
          
          <select 
            onChange={(e) => setDateFilter(e.target.value)} 
            value={dateFilter}
            aria-label="Filter by date"
          >
            <option value="">All Dates</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
        </div>
      </div>

      <div className="transaction-list">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`transaction-card ${transaction.type.toLowerCase()}`}
          >
            <div className="transaction-type">{transaction.type}</div>
            <div className="transaction-account">Account: {transaction.accountName}</div>
            <div className="transaction-amount">₹{transaction.amount}</div>
            <div className="transaction-date">{formatDate(transaction.date)}</div>
            <div className={`transaction-status ${transaction.status.toLowerCase()}`}>
              {transaction.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
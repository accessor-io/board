// Terminal Utility Functions
export const getTimeAgo = (date) => {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
};

// Date Parsing and Filtering Utilities
export const dateUtils = {
  // Parse various date formats
  parseDate: (dateStr) => {
    if (!dateStr) return null;
    const lowerStr = dateStr.toLowerCase().trim();

    // Handle MMMDDYY format (e.g., "mar0125" = March 1, 2025)
    const mmmddyyRegex = /^([a-z]{3})(\d{1,2})(\d{2,4})$/;
    const mmmddyyMatch = lowerStr.match(mmmddyyRegex);
    if (mmmddyyMatch) {
      const [, month, day, year] = mmmddyyMatch;
      const monthNames = {
        jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
      };
      const monthNum = monthNames[month];
      if (monthNum === undefined) return null;
      const fullYear = year.length === 2 ? 2000 + parseInt(year) : parseInt(year);
      return new Date(fullYear, monthNum, parseInt(day));
    }

    // Handle YYYY-MM-DD format
    const isoRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const isoMatch = lowerStr.match(isoRegex);
    if (isoMatch) {
      const [, year, month, day] = isoMatch;
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    // Handle relative dates
    const now = new Date();
    switch (lowerStr) {
      case 'today':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      case 'yesterday':
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        return new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
      case 'last7days':
        const last7Days = new Date(now);
        last7Days.setDate(now.getDate() - 7);
        return last7Days;
      case 'last30days':
        const last30Days = new Date(now);
        last30Days.setDate(now.getDate() - 30);
        return last30Days;
      case 'last90days':
        const last90Days = new Date(now);
        last90Days.setDate(now.getDate() - 90);
        return last90Days;
      case 'thisweek':
        const thisWeek = new Date(now);
        thisWeek.setDate(now.getDate() - now.getDay());
        return new Date(thisWeek.getFullYear(), thisWeek.getMonth(), thisWeek.getDate());
      case 'lastweek':
        const lastWeek = new Date(now);
        lastWeek.setDate(now.getDate() - now.getDay() - 7);
        return new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate());
      case 'thismonth':
        return new Date(now.getFullYear(), now.getMonth(), 1);
      case 'lastmonth':
        const lastMonth = new Date(now);
        lastMonth.setMonth(now.getMonth() - 1, 1);
        return lastMonth;
      case 'thisyear':
        return new Date(now.getFullYear(), 0, 1);
      case 'lastyear':
        return new Date(now.getFullYear() - 1, 0, 1);
      default:
        return null;
    }
  },

  parseDateRange: (rangeStr) => {
    if (!rangeStr) return null;
    const parts = rangeStr.split('-');
    if (parts.length !== 4) return null;

    const startDate = dateUtils.parseDate(`${parts[0]}-${parts[1]}-${parts[2]}`);
    const endDate = dateUtils.parseDate(`${parts[1]}-${parts[2]}-${parts[3]}`);

    if (!startDate || !endDate) return null;

    return {
      start: startDate,
      end: endDate
    };
  },

  filterTransactionsByDate: (transactions, dateFilter) => {
    if (!dateFilter) return transactions;
    return transactions.filter(tx => {
      const txDate = new Date(tx.timestamp);
      return txDate >= dateFilter.start && txDate <= dateFilter.end;
    });
  },

  formatDateForDisplay: (date) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  getDateFilterDescription: (dateFilter) => {
    if (!dateFilter) return '';
    const start = dateFilter.start.toLocaleDateString();
    const end = dateFilter.end.toLocaleDateString();
    return `${start} to ${end}`;
  }
};

import React from 'react';
import { componentClasses } from '../../styles/designSystem';

const StandardTable = ({ 
  headers, 
  data, 
  className = '',
  onRowClick,
  sortable = false,
  onSort,
  sortColumn,
  sortDirection = 'asc',
  ...props 
}) => {
  const handleSort = (column) => {
    if (sortable && onSort) {
      const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(column, newDirection);
    }
  };

  const getSortIcon = (column) => {
    if (!sortable || sortColumn !== column) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`} {...props}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th 
                  key={index}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide ${
                    sortable ? 'cursor-pointer hover:text-gray-900' : ''
                  }`}
                  onClick={() => handleSort(header.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{header.label}</span>
                    {getSortIcon(header.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={`hover:bg-gray-50 ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {headers.map((header, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {header.render ? header.render(row[header.key], row) : row[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandardTable; 
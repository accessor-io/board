// Standardized Data Transformers for ENS DAO Finance Board
// This module provides uniform data parsing and formatting for all API responses

export const ETHERSCAN_DATA_SCHEMAS = {
  TRANSACTION: {
    hash: 'string',
    from: 'address',
    to: 'address',
    value: 'wei',
    gas: 'number',
    gasPrice: 'wei',
    gasUsed: 'number',
    timestamp: 'timestamp',
    blockNumber: 'number',
    confirmations: 'number',
    isError: 'boolean',
    contractAddress: 'address',
    tokenName: 'string',
    tokenSymbol: 'string',
    tokenDecimal: 'number'
  },
  BALANCE: {
    address: 'address',
    balance: 'wei',
    timestamp: 'timestamp'
  },
  TOKEN_TRANSFER: {
    hash: 'string',
    from: 'address',
    to: 'address',
    contractAddress: 'address',
    tokenName: 'string',
    tokenSymbol: 'string',
    tokenDecimal: 'number',
    value: 'wei',
    timestamp: 'timestamp',
    blockNumber: 'number'
  }
};

// Standardized transformers
export const etherscanTransformers = {
  // Transform transaction data to uniform format
  transformTransaction: (tx, source = 'etherscan') => ({
    hash: tx.hash,
    from: formatAddress(tx.from),
    to: formatAddress(tx.to),
    value: formatWeiValue(tx.value),
    gas: parseInt(tx.gas) || 0,
    gasPrice: formatWeiValue(tx.gasPrice, 9), // Convert gwei
    gasUsed: parseInt(tx.gasUsed) || 0,
    timestamp: formatTimestamp(tx.timeStamp || tx.timestamp),
    blockNumber: parseInt(tx.blockNumber) || 0,
    confirmations: parseInt(tx.confirmations) || 0,
    isError: tx.isError === '1' || tx.isError === true,
    contractAddress: tx.contractAddress ? formatAddress(tx.contractAddress) : null,
    tokenName: tx.tokenName || null,
    tokenSymbol: tx.tokenSymbol || null,
    tokenDecimal: parseInt(tx.tokenDecimal) || 18,
    source,
    transformedAt: new Date().toISOString()
  }),

  // Transform balance data to uniform format
  transformBalance: (balance, source = 'etherscan') => ({
    address: formatAddress(balance.address),
    balance: formatWeiValue(balance.balance),
    timestamp: formatTimestamp(balance.timestamp),
    source,
    transformedAt: new Date().toISOString()
  }),

  // Transform token transfer data to uniform format
  transformTokenTransfer: (transfer, source = 'etherscan') => ({
    hash: transfer.hash,
    from: formatAddress(transfer.from),
    to: formatAddress(transfer.to),
    contractAddress: formatAddress(transfer.contractAddress),
    tokenName: transfer.tokenName,
    tokenSymbol: transfer.tokenSymbol,
    tokenDecimal: parseInt(transfer.tokenDecimal) || 18,
    value: formatWeiValue(transfer.value, parseInt(transfer.tokenDecimal) || 18),
    timestamp: formatTimestamp(transfer.timeStamp || transfer.timestamp),
    blockNumber: parseInt(transfer.blockNumber) || 0,
    source,
    transformedAt: new Date().toISOString()
  }),

  // Transform gas price data to uniform format
  transformGasPrice: (gasData, source = 'etherscan') => ({
    safeLow: parseInt(gasData.safeLow || gasData.SafeLow) || 0,
    standard: parseInt(gasData.standard || gasData.ProposeGasPrice) || 0,
    fast: parseInt(gasData.fast || gasData.FastGasPrice) || 0,
    timestamp: formatTimestamp(gasData.timestamp),
    source,
    transformedAt: new Date().toISOString()
  })
};

// Utility functions for consistent formatting
export const formatAddress = (address) => {
  if (!address || typeof address !== 'string') return null;
  return address.toLowerCase();
};

export const formatWeiValue = (value, decimals = 18) => {
  if (!value) return '0';
  try {
    const numValue = typeof value === 'string' ? parseInt(value) : value;
    return (numValue / Math.pow(10, decimals)).toString();
  } catch (error) {
    console.warn('Error formatting wei value:', value, error);
    return '0';
  }
};

export const formatTimestamp = (timestamp) => {
  if (!timestamp) return new Date().toISOString();

  // Handle both unix timestamp and ISO string
  if (typeof timestamp === 'number' || /^\d+$/.test(timestamp)) {
    return new Date(parseInt(timestamp) * 1000).toISOString();
  }

  // Already an ISO string
  if (typeof timestamp === 'string' && timestamp.includes('T')) {
    return timestamp;
  }

  // Fallback
  return new Date(timestamp).toISOString();
};

// Validation functions
export const validateTransformedData = (data, schema) => {
  const errors = [];
  const schemaKeys = Object.keys(schema);

  for (const key of schemaKeys) {
    if (!(key in data)) {
      errors.push(`Missing required field: ${key}`);
      continue;
    }

    const expectedType = schema[key];
    const actualValue = data[key];

    // Type validation
    switch (expectedType) {
      case 'string':
        if (typeof actualValue !== 'string') {
          errors.push(`${key}: expected string, got ${typeof actualValue}`);
        }
        break;
      case 'number':
        if (typeof actualValue !== 'number' && isNaN(parseInt(actualValue))) {
          errors.push(`${key}: expected number, got ${typeof actualValue}`);
        }
        break;
      case 'boolean':
        if (typeof actualValue !== 'boolean') {
          errors.push(`${key}: expected boolean, got ${typeof actualValue}`);
        }
        break;
      case 'address':
        if (actualValue && (typeof actualValue !== 'string' || !actualValue.startsWith('0x'))) {
          errors.push(`${key}: expected address string, got ${typeof actualValue}`);
        }
        break;
      case 'wei':
        if (typeof actualValue !== 'string') {
          errors.push(`${key}: expected wei string, got ${typeof actualValue}`);
        }
        break;
      case 'timestamp':
        if (typeof actualValue !== 'string' || !actualValue.includes('T')) {
          errors.push(`${key}: expected ISO timestamp string, got ${typeof actualValue}`);
        }
        break;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    validatedAt: new Date().toISOString()
  };
};

// Batch transformation with validation
export const transformBatchData = (dataArray, transformer, schema) => {
  const results = {
    transformed: [],
    errors: [],
    stats: {
      total: dataArray.length,
      successful: 0,
      failed: 0
    }
  };

  dataArray.forEach((item, index) => {
    try {
      const transformed = transformer(item);
      const validation = validateTransformedData(transformed, schema);

      if (validation.isValid) {
        results.transformed.push(transformed);
        results.stats.successful++;
      } else {
        results.errors.push({
          index,
          item,
          validationErrors: validation.errors
        });
        results.stats.failed++;
      }
    } catch (error) {
      results.errors.push({
        index,
        item,
        transformError: error.message
      });
      results.stats.failed++;
    }
  });

  return results;
};

export default {
  ETHERSCAN_DATA_SCHEMAS,
  etherscanTransformers,
  formatAddress,
  formatWeiValue,
  formatTimestamp,
  validateTransformedData,
  transformBatchData
};

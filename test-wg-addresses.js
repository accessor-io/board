const API_KEY = 'IPBRSM3CCP2GKYECIPMZQZTDNPM1FJTHTX';

const wgAddresses = {
  meta: '0x91c32893216dE3eA0a55ABb9851f581d4503d39b',
  pg: '0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d',
  eco: '0x2686A8919Df194aA7673244549E68D42C1685d03'
};

console.log('Working Group Address Validation:');
console.log('API Key configured:', !!API_KEY);

Object.entries(wgAddresses).forEach(([wg, address]) => {
  const isValid = address.startsWith('0x') && address.length === 42;
  console.log(`${wg}: ${address} - ${isValid ? 'VALID' : 'INVALID'}`);
});

// Test API call for one address
const testAddress = wgAddresses.meta;
console.log(`\nTesting API call for Meta-Governance (${testAddress}):`);

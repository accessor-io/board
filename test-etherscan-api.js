#!/usr/bin/env node

/**
 * Etherscan API Test Script
 *
 * Tests the Etherscan API integration with proper error handling and fallbacks
 */

// Mock browser environment for Node.js testing
global.navigator = {
  onLine: true
};

global.import = {
  meta: {
    env: {
      VITE_ETHERSCAN_API_KEY: 'demo' // Using demo key for testing
    }
  }
};

// Import the API services
import { etherscanAPI } from './src/services/api.js';

async function testEtherscanAPI() {
  console.log('🔍 Testing Etherscan API Integration\n');
  console.log('=' .repeat(60));

  const testResults = {
    passed: 0,
    failed: 0,
    total: 0,
    errors: []
  };

  // Test helper function
  function runTest(description, testFn) {
    testResults.total++;

    try {
      console.log(`🧪 Testing: ${description}`);
      const result = testFn();

      if (result) {
        console.log(`✅ PASSED: ${description}`);
        testResults.passed++;
        return true;
      } else {
        const error = `❌ FAILED: ${description}`;
        console.log(error);
        testResults.errors.push(error);
        testResults.failed++;
        return false;
      }
    } catch (error) {
      const errorMsg = `❌ ERROR: ${description} - ${error.message}`;
      console.log(errorMsg);
      testResults.errors.push(errorMsg);
      testResults.failed++;
      return false;
    }
  }

  // Test API structure
  console.log('\n🔧 TESTING API STRUCTURE');
  console.log('-'.repeat(30));

  runTest('Etherscan API object exists', () => {
    return typeof etherscanAPI === 'object' && etherscanAPI !== null;
  });

  runTest('getAccountBalance method exists', () => {
    return typeof etherscanAPI.getAccountBalance === 'function';
  });

  runTest('getTransactionHistory method exists', () => {
    return typeof etherscanAPI.getTransactionHistory === 'function';
  });

  runTest('getTokenTransfers method exists', () => {
    return typeof etherscanAPI.getTokenTransfers === 'function';
  });

  runTest('getGasPrice method exists', () => {
    return typeof etherscanAPI.getGasPrice === 'function';
  });

  // Test mock data functionality
  console.log('\n📊 TESTING MOCK DATA FUNCTIONALITY');
  console.log('-'.repeat(30));

  // Test account balance with mock data
  try {
    console.log('\n🧪 Testing: getAccountBalance (mock mode)');
    testResults.total++;
    const balance = await etherscanAPI.getAccountBalance('0xfe89cc7aBB2C4183683ab71653C4cdc9B02D44b7');
    if (balance && balance.address && balance.balance && balance.timestamp) {
      console.log(`✅ PASSED: Mock balance returned - ${balance.balance} ETH`);
      testResults.passed++;
    } else {
      throw new Error('Invalid balance response');
    }
  } catch (error) {
    const errorMsg = `❌ ERROR: Mock balance failed: ${error.message}`;
    console.log(errorMsg);
    testResults.errors.push(errorMsg);
    testResults.failed++;
  }

  // Test transaction history with mock data
  try {
    console.log('\n🧪 Testing: getTransactionHistory (mock mode)');
    testResults.total++;
    const transactions = await etherscanAPI.getTransactionHistory('0xfe89cc7aBB2C4183683ab71653C4cdc9B02D44b7');
    if (Array.isArray(transactions) && transactions.length > 0) {
      console.log(`✅ PASSED: Mock transactions returned - ${transactions.length} transactions`);
      console.log(`   Sample transaction hash: ${transactions[0].hash}`);
      testResults.passed++;
    } else {
      throw new Error('Invalid transactions response');
    }
  } catch (error) {
    const errorMsg = `❌ ERROR: Mock transactions failed: ${error.message}`;
    console.log(errorMsg);
    testResults.errors.push(errorMsg);
    testResults.failed++;
  }

  // Test gas price with mock data
  try {
    console.log('\n🧪 Testing: getGasPrice (mock mode)');
    testResults.total++;
    const gasPrice = await etherscanAPI.getGasPrice();
    if (gasPrice && gasPrice.safeLow && gasPrice.standard && gasPrice.fast) {
      console.log(`✅ PASSED: Mock gas prices returned - Safe: ${gasPrice.safeLow} Gwei, Standard: ${gasPrice.standard} Gwei`);
      testResults.passed++;
    } else {
      throw new Error('Invalid gas price response');
    }
  } catch (error) {
    const errorMsg = `❌ ERROR: Mock gas price failed: ${error.message}`;
    console.log(errorMsg);
    testResults.errors.push(errorMsg);
    testResults.failed++;
  }

  // Test token transfers with mock data
  try {
    console.log('\n🧪 Testing: getTokenTransfers (mock mode)');
    testResults.total++;
    const tokenTransfers = await etherscanAPI.getTokenTransfers('0xfe89cc7aBB2C4183683ab71653C4cdc9B02D44b7');
    if (Array.isArray(tokenTransfers)) {
      console.log(`✅ PASSED: Mock token transfers returned - ${tokenTransfers.length} transfers`);
      testResults.passed++;
    } else {
      throw new Error('Invalid token transfers response');
    }
  } catch (error) {
    const errorMsg = `❌ ERROR: Mock token transfers failed: ${error.message}`;
    console.log(errorMsg);
    testResults.errors.push(errorMsg);
    testResults.failed++;
  }

  // API Configuration Info
  console.log('\n⚙️  API CONFIGURATION STATUS');
  console.log('-'.repeat(30));

  console.log('Current API Key Status:');
  console.log(`• Etherscan API Key: ${global.import.meta.env.VITE_ETHERSCAN_API_KEY === 'demo' ? 'DEMO MODE (using mock data)' : 'CONFIGURED'}`);
  console.log(`• Network Status: ${global.navigator.onLine ? 'ONLINE' : 'OFFLINE'}`);
  console.log(`• Fallback Mode: ENABLED (will use mock data when API fails)`);

  console.log('\n📝 API ENDPOINTS:');
  console.log('• Base URL: https://api.etherscan.io/api');
  console.log('• Rate Limits: 5 calls/second, 100,000 calls/day (free tier)');
  console.log('• Supported Networks: Ethereum Mainnet');

  console.log('\n🔑 GETTING AN API KEY:');
  console.log('1. Visit: https://etherscan.io/apis');
  console.log('2. Sign up for a free account');
  console.log('3. Get your API key from the dashboard');
  console.log('4. Add to .env: VITE_ETHERSCAN_API_KEY=your_key_here');

  // Results Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 ETHERSCAN API TEST RESULTS');
  console.log('='.repeat(60));

  console.log(`Total Tests: ${testResults.total}`);
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📈 Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`);

  if (testResults.errors.length > 0) {
    console.log('\n🚨 ERRORS ENCOUNTERED:');
    testResults.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }

  console.log('\n' + '='.repeat(60));
  if (testResults.failed === 0) {
    console.log('🎉 ALL API TESTS PASSED!');
    console.log('💡 The Etherscan API integration is working correctly in mock mode.');
    console.log('💡 Add a real API key to enable live data fetching.');
  } else {
    console.log('⚠️  Some API tests failed. Check the errors above.');
  }
  console.log('='.repeat(60));

  return testResults.failed === 0;
}

// Run the test suite
testEtherscanAPI().catch(error => {
  console.error('💥 API test suite failed to run:', error);
  process.exit(1);
});

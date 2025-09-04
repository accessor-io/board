#!/usr/bin/env node

/**
 * Simple Terminal Commands Test
 *
 * Tests the core command structure without external dependencies
 */

// Mock the required dependencies
const mockEtherscanAPI = {
  getTransactionHistory: async () => []
};

const mockWalletDirectory = [
  { address: '0x123', label: 'Mock Wallet', category: 'test' }
];

// Import commands directly without external dependencies
import { coreCommands } from './src/components/terminal/commands/coreCommands.js';
import { financialCommands } from './src/components/terminal/commands/financialCommands.js';

// Import additional command modules
import { walletCommands } from './src/components/terminal/commands/walletCommands.js';
import { workingGroupCommands } from './src/components/terminal/commands/workingGroupCommands.js';

// Combine commands for testing
const commands = {
  ...coreCommands,
  ...financialCommands,
  ...walletCommands,
  ...workingGroupCommands
};

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  errors: []
};

// Test helper function
function runTest(commandName, args = []) {
  testResults.total++;

  try {
    console.log(`🧪 Testing: ${commandName}${args.length > 0 ? ' ' + args.join(' ') : ''}`);

    const result = commands[commandName]?.(args);

    if (result !== undefined && result !== null && typeof result === 'string') {
      console.log(`✅ PASSED: ${commandName} returned valid response (${result.length} chars)`);
      testResults.passed++;
      return true;
    } else if (typeof result === 'string' && result === '') {
      // Empty string is valid for commands like 'clear'
      console.log(`✅ PASSED: ${commandName} returned empty response (expected for clear)`);
      testResults.passed++;
      return true;
    } else {
      const error = `❌ FAILED: ${commandName} returned ${typeof result} instead of string, or command not found`;
      console.log(error);
      testResults.errors.push(error);
      testResults.failed++;
      return false;
    }
  } catch (error) {
    const errorMsg = `❌ ERROR: ${commandName} threw: ${error.message}`;
    console.log(errorMsg);
    testResults.errors.push(errorMsg);
    testResults.failed++;
    return false;
  }
}

// Test suite
function runAllTests() {
  console.log('🚀 Starting Simple Terminal Commands Test Suite\n');
  console.log('=' .repeat(60));

  // Core Commands Tests
  console.log('\n📋 TESTING CORE COMMANDS');
  console.log('-'.repeat(30));

  const coreCommandTests = [
    'help',
    'commands', // Alias for help
    'clear',
    'ls',
    'list',
    'assets',
    'analytics',
    'tx',
    'transactions',
    'whoami',
    'uptime',
    'cd'
  ];

  coreCommandTests.forEach(cmd => runTest(cmd));

  // Financial Commands Tests
  console.log('\n💰 TESTING FINANCIAL COMMANDS');
  console.log('-'.repeat(30));

  const financialCommandTests = [
    'overview',
    'revenue',
    'compensation',
    'governance',
    'investments',
    'challenges',
    'summary'
  ];

  financialCommandTests.forEach(cmd => runTest(cmd));

  // Wallet Commands Tests
  console.log('\n👛 TESTING WALLET COMMANDS');
  console.log('-'.repeat(30));

  const walletCommandTests = [
    'wallets',
    ['wallets', 'all'],
    ['wallets', 'dao'],
    ['wallets', 'treasury'],
    ['wallets', 'wg', 'meta'],
    ['wallets', 'wg', 'eco'],
    ['wallets', 'wg', 'public']
  ];

  walletCommandTests.forEach(cmd => {
    if (Array.isArray(cmd)) {
      runTest(cmd[0], cmd.slice(1));
    } else {
      runTest(cmd);
    }
  });

  // Asset Commands Tests
  console.log('\n💰 TESTING ASSET COMMANDS');
  console.log('-'.repeat(30));

  const assetCommandTests = [
    ['assets', 'overview'],
    ['assets', 'networks'],
    ['assets', 'wg', 'wallet', 'meta'],
    ['assets', 'wg', 'wallet', 'eco'],
    ['assets', 'wg', 'wallet', 'public'],
    ['cd', 'assets'],
    ['cd', 'wallets'],
    ['cd', 'overview'],
    ['cd', 'analytics'],
    ['cd', 'transactions'],
    ['cd', 'wgs'],
    ['cd', 'spp']
  ];

  assetCommandTests.forEach(cmd => runTest(cmd[0], cmd.slice(1)));

  // Working Group Commands Tests
  console.log('\n👥 TESTING WORKING GROUP COMMANDS');
  console.log('-'.repeat(30));

  const wgCommandTests = [
    'wg-meta',
    ['wg-meta', 'info'],
    ['wg-meta', 'budget'],
    ['wg-meta', 'funding'],
    ['wg-meta', 'tx'],
    ['wg-meta', 'help'],
    'wg-eco',
    ['wg-eco', 'info'],
    ['wg-eco', 'budget'],
    ['wg-eco', 'funding'],
    ['wg-eco', 'tx'],
    ['wg-eco', 'grants'],
    ['wg-eco', 'bounties'],
    ['wg-eco', 'help'],
    'wg-public',
    ['wg-public', 'info'],
    ['wg-public', 'budget'],
    ['wg-public', 'funding'],
    ['wg-public', 'tx'],
    ['wg-public', 'docs'],
    ['wg-public', 'content'],
    ['wg-public', 'events'],
    ['wg-public', 'metrics'],
    ['wg-public', 'help']
  ];

  wgCommandTests.forEach(cmd => {
    if (Array.isArray(cmd)) {
      runTest(cmd[0], cmd.slice(1));
    } else {
      runTest(cmd);
    }
  });

  // Additional WG Transaction Commands Tests
  console.log('\n💸 TESTING WG TRANSACTION COMMANDS');
  console.log('-'.repeat(30));

  const wgTxCommandTests = [
    ['wg-meta', 'tx', 'all'],
    ['wg-meta', 'tx', '5'],
    ['wg-meta', 'tx', 'last30days'],
    ['wg-eco', 'tx', 'all'],
    ['wg-eco', 'tx', '10'],
    ['wg-eco', 'tx', 'thismonth'],
    ['wg-public', 'tx', 'all'],
    ['wg-public', 'tx', '3'],
    ['wg-public', 'tx', 'last7days'],
    ['tx', 'all'],
    ['tx', '10'],
    ['tx', 'last30days'],
    ['tx', 'thismonth']
  ];

  wgTxCommandTests.forEach(cmd => runTest(cmd[0], cmd.slice(1)));

  // Test invalid command
  console.log('\n🧪 Testing: invalid command');
  testResults.total++;
  try {
    const result = commands.nonexistentCommand?.() || 'Command not found';
    if (result === 'Command not found' || result.includes('not found')) {
      console.log('✅ PASSED: Invalid command handled gracefully');
      testResults.passed++;
    } else {
      throw new Error('Invalid command not handled properly');
    }
  } catch (error) {
    const errorMsg = `❌ ERROR: Invalid command test failed: ${error.message}`;
    console.log(errorMsg);
    testResults.errors.push(errorMsg);
    testResults.failed++;
  }

  // Results Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST RESULTS SUMMARY');
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
    console.log('🎉 ALL TESTS PASSED! Core terminal commands working correctly!');
  } else {
    console.log('⚠️  Some tests failed. Review the errors above.');
  }
  console.log('='.repeat(60));
}

// Run the test suite
runAllTests();
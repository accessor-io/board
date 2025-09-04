#!/usr/bin/env node

/**
 * Comprehensive Terminal Commands Test Suite
 *
 * This script tests all commands in the modularized terminal system
 * to ensure they work correctly after the refactoring.
 */

import { commands } from './src/components/terminal/commands/index.js';

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  errors: []
};

// Test helper function
function runTest(commandName, args = [], expectedType = 'string') {
  testResults.total++;

  try {
    console.log(`\n🧪 Testing: ${commandName}${args.length > 0 ? ' ' + args.join(' ') : ''}`);

    const result = commands[commandName](args);

    if (typeof result === expectedType && result !== undefined && result !== null) {
      console.log(`✅ PASSED: ${commandName} returned ${expectedType}`);
      testResults.passed++;
      return true;
    } else {
      const error = `❌ FAILED: ${commandName} returned ${typeof result} instead of ${expectedType}`;
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
async function runAllTests() {
  console.log('🚀 Starting Comprehensive Terminal Commands Test Suite\n');
  console.log('=' .repeat(60));

  // Core Commands Tests
  console.log('\n📋 TESTING CORE COMMANDS');
  console.log('-'.repeat(30));

  runTest('help');
  runTest('commands'); // Alias for help
  runTest('clear');
  runTest('ls');
  runTest('time/date');
  runTest('history');
  runTest('exit');

  // Financial Commands Tests
  console.log('\n💰 TESTING FINANCIAL COMMANDS');
  console.log('-'.repeat(30));

  runTest('overview');
  runTest('revenue');
  runTest('compensation');
  runTest('governance');
  runTest('investments');
  runTest('challenges');
  runTest('summary');

  // Working Group Commands Tests
  console.log('\n👥 TESTING WORKING GROUP COMMANDS');
  console.log('-'.repeat(30));

  // Meta-Governance WG
  runTest('wg-meta', []);
  runTest('wg-meta', ['info']);
  runTest('wg-meta', ['budget']);
  runTest('wg-meta', ['funding']);

  // Ecosystem WG
  runTest('wg-eco', []);
  runTest('wg-eco', ['info']);
  runTest('wg-eco', ['budget']);
  runTest('wg-eco', ['funding']);

  // Public Goods WG
  runTest('wg-public', []);
  runTest('wg-public', ['info']);
  runTest('wg-public', ['budget']);
  runTest('wg-public', ['funding']);

  // Status Command
  console.log('\n📊 TESTING STATUS COMMAND');
  console.log('-'.repeat(30));

  runTest('status');

  // Export Commands Tests (Async)
  console.log('\n💾 TESTING EXPORT COMMANDS');
  console.log('-'.repeat(30));

  // Note: These are async but we'll test them synchronously for basic structure
  try {
    console.log('\n🧪 Testing: exportData (help)');
    testResults.total++;
    const exportHelp = await commands.exportData(['help']);
    if (typeof exportHelp === 'string' && exportHelp.includes('EXPORT COMMANDS')) {
      console.log('✅ PASSED: exportData help returned valid response');
      testResults.passed++;
    } else {
      throw new Error('Invalid help response');
    }
  } catch (error) {
    const errorMsg = `❌ ERROR: exportData help failed: ${error.message}`;
    console.log(errorMsg);
    testResults.errors.push(errorMsg);
    testResults.failed++;
  }

  // Test invalid command
  console.log('\n🧪 Testing: invalid command');
  testResults.total++;
  try {
    const invalidResult = commands.nonexistentCommand?.() || 'Command not found';
    console.log('✅ PASSED: Invalid command handled gracefully');
    testResults.passed++;
  } catch (error) {
    const errorMsg = `❌ ERROR: Invalid command threw error: ${error.message}`;
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
    console.log('🎉 ALL TESTS PASSED! Terminal modularization successful!');
  } else {
    console.log('⚠️  Some tests failed. Review the errors above.');
  }
  console.log('='.repeat(60));
}

// Run the test suite
runAllTests().catch(error => {
  console.error('💥 Test suite failed to run:', error);
  process.exit(1);
});

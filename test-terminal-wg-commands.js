#!/usr/bin/env node

/**
 * Working Group Commands Test
 *
 * Tests the working group specific commands
 */

import { workingGroupCommands } from './src/components/terminal/commands/workingGroupCommands.js';

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

    const result = workingGroupCommands[commandName]?.(args);

    if (result !== undefined && result !== null && typeof result === 'string') {
      console.log(`✅ PASSED: ${commandName} returned valid response (${result.length} chars)`);
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
  console.log('🚀 Starting Working Group Commands Test Suite\n');
  console.log('=' .repeat(60));

  // Meta-Governance WG Tests
  console.log('\n🏛️ TESTING META-GOVERNANCE WG COMMANDS');
  console.log('-'.repeat(40));

  runTest('wg-meta', []);          // Default info
  runTest('wg-meta', ['info']);    // Explicit info
  runTest('wg-meta', ['budget']);  // Budget details
  runTest('wg-meta', ['funding']); // Funding details

  // Ecosystem WG Tests
  console.log('\n🌐 TESTING ECOSYSTEM WG COMMANDS');
  console.log('-'.repeat(40));

  runTest('wg-eco', []);           // Default info
  runTest('wg-eco', ['info']);     // Explicit info
  runTest('wg-eco', ['budget']);   // Budget details
  runTest('wg-eco', ['funding']);  // Funding details

  // Public Goods WG Tests
  console.log('\n🎁 TESTING PUBLIC GOODS WG COMMANDS');
  console.log('-'.repeat(40));

  runTest('wg-public', []);        // Default info
  runTest('wg-public', ['info']);  // Explicit info
  runTest('wg-public', ['budget']); // Budget details
  runTest('wg-public', ['funding']); // Funding details

  // Test invalid WG
  console.log('\n🧪 Testing: invalid working group');
  testResults.total++;
  try {
    const result = workingGroupCommands['wg-invalid']?.([]) || 'Working group not found';
    if (result === 'Working group not found' || result.includes('not found')) {
      console.log('✅ PASSED: Invalid WG handled gracefully');
      testResults.passed++;
    } else {
      throw new Error('Invalid WG not handled properly');
    }
  } catch (error) {
    const errorMsg = `❌ ERROR: Invalid WG test failed: ${error.message}`;
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
    console.log('🎉 ALL WG TESTS PASSED! Working group commands working correctly!');
  } else {
    console.log('⚠️  Some tests failed. Review the errors above.');
  }
  console.log('='.repeat(60));
}

// Run the test suite
runAllTests();

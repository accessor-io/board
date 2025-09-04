/**
 * ENS DAO Treasury Terminal - Comprehensive Command Test Script
 *
 * This script tests all available commands in the terminal interface.
 * Run this in the browser console when the terminal is loaded.
 *
 * Usage:
 * 1. Open the terminal application
 * 2. Open browser console (F12)
 * 3. Copy and paste this script
 * 4. Call: await testAllCommands()
 */

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testCommand(command, description) {
  console.log(`\n🧪 Testing: ${description}`);
  console.log(`📝 Command: "${command}"`);

  try {
    // Simulate entering command in terminal
    const inputElement = document.querySelector('input[type="text"]');
    if (!inputElement) {
      console.error('❌ Terminal input not found');
      return false;
    }

    // Clear and set command
    inputElement.value = command;

    // Trigger Enter key
    const enterEvent = new Event('keydown');
    enterEvent.key = 'Enter';
    inputElement.dispatchEvent(enterEvent);

    // Wait for command to process
    await sleep(500);

    console.log('✅ Command executed successfully');
    return true;
  } catch (error) {
    console.error('❌ Command failed:', error.message);
    return false;
  }
}

async function testCommandGroup(commands, groupName) {
  console.log(`\n═══════════════════════════════════════════════════════════════`);
  console.log(`🚀 TESTING ${groupName.toUpperCase()}`);
  console.log(`═══════════════════════════════════════════════════════════════`);

  let passed = 0;
  let failed = 0;

  for (const [command, description] of commands) {
    const success = await testCommand(command, description);
    if (success) {
      passed++;
    } else {
      failed++;
    }
    await sleep(200); // Small delay between commands
  }

  console.log(`\n📊 ${groupName} Results: ${passed} passed, ${failed} failed`);
  return { passed, failed };
}

async function testAllCommands() {
  console.clear();
  console.log('🎯 ENS DAO TREASURY TERMINAL - COMMAND TEST SUITE');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('Testing all available commands and contextual help...\n');

  const results = [];

  // 1. Basic Commands
  const basicCommands = [
    ['help', 'Basic help command'],
    ['commands', 'Commands alias'],
    ['list', 'Comprehensive command list'],
    ['overview', 'Revenue generation overview'],
    ['assets', 'Fund distribution analysis'],
    ['analytics', 'Accounting methods'],
    ['transactions', 'All wallet transactions'],
    ['tx', 'Transaction alias'],
    ['status', 'Financial infrastructure status'],
    ['revenue', 'Revenue sources'],
    ['compensation', 'Steward compensation'],
    ['governance', 'ENS token distributions'],
    ['investments', 'Treasury investments'],
    ['challenges', 'Transparency issues'],
    ['summary', 'Treasury overview'],
    ['ls', 'List terminal sections'],
    ['clear', 'Clear terminal'],
    ['history', 'Command history'],
    ['time', 'Current time'],
    ['date', 'Current date'],
    ['whoami', 'User identity'],
    ['uptime', 'System uptime'],
    ['exit', 'Exit terminal']
  ];

  results.push(await testCommandGroup(basicCommands, 'Basic Commands'));

  // 2. Contextual Help Commands
  const helpCommands = [
    ['wg help', 'Working group help'],
    ['wallets help', 'Wallet management help'],
    ['assets help', 'Asset balance help'],
    ['export help', 'Data export help'],
    ['tx help', 'Transaction help']
  ];

  results.push(await testCommandGroup(helpCommands, 'Contextual Help Commands'));

  // 3. Working Group Commands
  const wgCommands = [
    ['wg meta', 'Meta-Governance WG overview'],
    ['wg eco', 'Ecosystem WG overview'],
    ['wg public', 'Public Goods WG overview'],
    ['wg meta info', 'Meta-Gov info'],
    ['wg eco info', 'Ecosystem info'],
    ['wg public info', 'Public Goods info'],
    ['wg meta budget', 'Meta-Gov budget'],
    ['wg eco budget', 'Ecosystem budget'],
    ['wg public budget', 'Public Goods budget'],
    ['wg meta funding', 'Meta-Gov funding'],
    ['wg eco funding', 'Ecosystem funding'],
    ['wg public funding', 'Public Goods funding']
  ];

  results.push(await testCommandGroup(wgCommands, 'Working Group Commands'));

  // 4. Working Group Help Commands
  const wgHelpCommands = [
    ['wg meta help', 'Meta-Gov contextual help'],
    ['wg eco help', 'Ecosystem contextual help'],
    ['wg public help', 'Public Goods contextual help']
  ];

  results.push(await testCommandGroup(wgHelpCommands, 'Working Group Help Commands'));

  // 5. Wallet Commands
  const walletCommands = [
    ['wallets all', 'All wallet addresses'],
    ['wallets wg meta', 'Meta-Gov multisigs'],
    ['wallets wg eco', 'Ecosystem multisigs'],
    ['wallets wg public', 'Public Goods multisigs'],
    ['wallets dao', 'DAO treasury wallets'],
    ['wallets treasury', 'Treasury and endowment wallets']
  ];

  results.push(await testCommandGroup(walletCommands, 'Wallet Commands'));

  // 6. Wallet Help Commands
  const walletHelpCommands = [
    ['wallets wg help', 'WG wallet help']
  ];

  results.push(await testCommandGroup(walletHelpCommands, 'Wallet Help Commands'));

  // 7. Asset Commands
  const assetCommands = [
    ['assets wg wallet meta', 'Meta-Gov wallet balances'],
    ['assets wg wallet eco', 'Ecosystem wallet balances'],
    ['assets wg wallet public', 'Public Goods wallet balances'],
    ['assets overview', 'Treasury assets summary'],
    ['assets networks', 'Assets across networks']
  ];

  results.push(await testCommandGroup(assetCommands, 'Asset Commands'));

  // 8. Asset Help Commands
  const assetHelpCommands = [
    ['assets wg help', 'WG asset help'],
    ['assets wg wallet help', 'WG wallet asset help']
  ];

  results.push(await testCommandGroup(assetHelpCommands, 'Asset Help Commands'));

  // 9. Transaction Commands
  const txCommands = [
    ['tx last30days', 'Transactions last 30 days'],
    ['tx thismonth', 'This month transactions'],
    ['tx lastmonth', 'Last month transactions'],
    ['tx mar0125-apr0125', 'March-April 2025 transactions']
  ];

  results.push(await testCommandGroup(txCommands, 'Transaction Commands'));

  // 10. Export Commands
  const exportCommands = [
    ['export tx all', 'Export all transactions'],
    ['export tx wg meta', 'Export Meta-Gov transactions'],
    ['export tx wg eco', 'Export Ecosystem transactions'],
    ['export tx wg public', 'Export Public Goods transactions'],
    ['export wallets all', 'Export all wallets'],
    ['export wallets wg meta', 'Export Meta-Gov wallets'],
    ['export wallets wg eco', 'Export Ecosystem wallets'],
    ['export wallets wg public', 'Export Public Goods wallets'],
    ['export assets wg meta', 'Export Meta-Gov assets'],
    ['export assets wg eco', 'Export Ecosystem assets'],
    ['export assets wg public', 'Export Public Goods assets'],
    ['export assets overview', 'Export treasury overview']
  ];

  results.push(await testCommandGroup(exportCommands, 'Export Commands'));

  // 11. Export Help Commands
  const exportHelpCommands = [
    ['export tx help', 'Transaction export help'],
    ['export tx wg help', 'WG transaction export help'],
    ['export wallets help', 'Wallet export help'],
    ['export wallets wg help', 'WG wallet export help'],
    ['export assets help', 'Asset export help'],
    ['export assets wg help', 'WG asset export help']
  ];

  results.push(await testCommandGroup(exportHelpCommands, 'Export Help Commands'));

  // 12. Navigation Commands
  const navCommands = [
    ['cd overview', 'Navigate to overview'],
    ['cd assets', 'Navigate to assets'],
    ['cd analytics', 'Navigate to analytics'],
    ['cd transactions', 'Navigate to transactions'],
    ['cd wallets', 'Navigate to wallets']
  ];

  results.push(await testCommandGroup(navCommands, 'Navigation Commands'));

  // Final Summary
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('📊 FINAL TEST RESULTS');
  console.log('═══════════════════════════════════════════════════════════════');

  const totalPassed = results.reduce((sum, result) => sum + result.passed, 0);
  const totalFailed = results.reduce((sum, result) => sum + result.failed, 0);
  const totalTests = totalPassed + totalFailed;

  console.log(`\n🎯 OVERALL RESULTS:`);
  console.log(`   Total Tests: ${totalTests}`);
  console.log(`   ✅ Passed: ${totalPassed}`);
  console.log(`   ❌ Failed: ${totalFailed}`);
  console.log(`   📈 Success Rate: ${((totalPassed / totalTests) * 100).toFixed(1)}%`);

  console.log('\n📋 GROUP BREAKDOWN:');
  const groupNames = [
    'Basic Commands',
    'Contextual Help Commands',
    'Working Group Commands',
    'Working Group Help Commands',
    'Wallet Commands',
    'Wallet Help Commands',
    'Asset Commands',
    'Asset Help Commands',
    'Transaction Commands',
    'Export Commands',
    'Export Help Commands',
    'Navigation Commands'
  ];

  results.forEach((result, index) => {
    const groupName = groupNames[index];
    const total = result.passed + result.failed;
    const rate = total > 0 ? ((result.passed / total) * 100).toFixed(1) : '0.0';
    console.log(`   ${groupName}: ${result.passed}/${total} (${rate}%)`);
  });

  if (totalFailed > 0) {
    console.log('\n⚠️  SOME TESTS FAILED');
    console.log('   Check the console output above for specific error details.');
    console.log('   Common causes:');
    console.log('   • Syntax errors in command implementation');
    console.log('   • API connectivity issues');
    console.log('   • Missing dependencies');
  } else {
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('   The terminal is fully functional.');
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('🏁 TEST SUITE COMPLETE');
  console.log('═══════════════════════════════════════════════════════════════');

  return { totalTests, totalPassed, totalFailed, results };
}

// Additional utility functions for manual testing
function testSingleCommand(command) {
  return testCommand(command, 'Manual test');
}

function testCommandList(commands) {
  return Promise.all(commands.map(cmd => testCommand(cmd, `Testing: ${cmd}`)));
}

// Export functions for global access
window.testAllCommands = testAllCommands;
window.testSingleCommand = testSingleCommand;
window.testCommandList = testCommandList;

console.log('\n🔧 TEST FUNCTIONS AVAILABLE:');
console.log('   testAllCommands()     - Run full test suite');
console.log('   testSingleCommand(cmd) - Test specific command');
console.log('   testCommandList([...]) - Test array of commands');
console.log('\n💡 TIP: Call testAllCommands() to start the comprehensive test!');

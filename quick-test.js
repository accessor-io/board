// Quick Terminal Command Test - Copy and paste into browser console
async function testTerminal() {
  console.clear();
  console.log('🎯 Testing ENS DAO Terminal...\n');

  const commands = [
    'help', 'list', 'overview', 'status', 'summary',
    'wg help', 'wallets help', 'assets help', 'export help',
    'wg meta', 'wg eco', 'wg public',
    'wallets all', 'assets overview',
    'tx last30days', 'export tx all'
  ];

  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    console.log(`Testing ${i + 1}/${commands.length}: "${cmd}"`);

    try {
      const input = document.querySelector('input[type="text"]');
      if (input) {
        input.value = cmd;
        const event = new Event('keydown');
        event.key = 'Enter';
        input.dispatchEvent(event);
        console.log('✅ OK');
      } else {
        console.log('❌ Input not found');
      }
    } catch (error) {
      console.log('❌ Error:', error.message);
    }

    await new Promise(r => setTimeout(r, 300));
  }

  console.log('\n🏁 Test complete!');
}

// Test single command
window.testCmd = (cmd) => {
  const input = document.querySelector('input[type="text"]');
  if (input) {
    input.value = cmd;
    const event = new Event('keydown');
    event.key = 'Enter';
    input.dispatchEvent(event);
    console.log(`Executed: ${cmd}`);
  }
};

// Run test
testTerminal();

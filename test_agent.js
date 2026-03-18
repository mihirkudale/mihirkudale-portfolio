import handler from './api/chat.js';

async function runTest() {
  console.log('--- TEST 1: First Question ---');
  let firstReply = '';
  let streamComplete = false;
  
  const req1 = {
    method: 'POST',
    headers: { 'x-forwarded-for': '127.0.0.1' },
    body: {
      message: 'What are your skills?',
      conversationHistory: [],
      stream: true
    }
  };

  const res1 = {
    setHeader: () => {},
    status: (code) => { console.log('Status:', code); return res1; },
    json: (data) => console.log('JSON Output:', data),
    write: (data) => {
      const parts = data.split('\n');
      for(const p of parts) {
        if(p.startsWith('data: ')) {
          const parsed = JSON.parse(p.slice(6));
          if(parsed.content) firstReply += parsed.content;
          if(parsed.error) console.log('Error:', parsed.error);
        }
      }
    },
    end: () => { streamComplete = true; }
  };

  await handler(req1, res1);
  console.log('\\nAgent Reply 1:\\n', firstReply);
  
  console.log('\\n--- TEST 2: Follow-up Question (Context Persistence) ---');
  let secondReply = '';
  
  const history = [
    { role: 'user', content: 'What are your skills?' },
    { role: 'assistant', content: firstReply }
  ];

  const req2 = {
    method: 'POST',
    headers: { 'x-forwarded-for': '127.0.0.1' },
    body: {
      message: 'Tell me more about the first one.',
      conversationHistory: history,
      stream: true
    }
  };

  const res2 = {
    setHeader: () => {},
    status: () => res2,
    json: () => {},
    write: (data) => {
      const parts = data.split('\n');
      for(const p of parts) {
        if(p.startsWith('data: ')) {
          const parsed = JSON.parse(p.slice(6));
          if(parsed.content) secondReply += parsed.content;
        }
      }
    },
    end: () => {}
  };

  await handler(req2, res2);
  console.log('\\nAgent Reply 2:\\n', secondReply);
}

runTest().catch(console.error);

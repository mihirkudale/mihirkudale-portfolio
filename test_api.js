import handler from './api/chat.js';

const mockReq = {
    method: 'POST',
    headers: {
        'x-forwarded-for': '127.0.0.1'
    },
    body: {
        message: 'Are you available for an interview next week?'
    }
};

const mockRes = {
    setHeader: () => { },
    status: function (code) {
        this.statusCode = code;
        return this;
    },
    json: function (data) {
        console.log(`Status: ${this.statusCode}`);
        console.log(`Response:`, data);
    }
};

console.log('Testing the LangGraph API...');
handler(mockReq, mockRes).catch(console.error);

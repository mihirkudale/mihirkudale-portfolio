
const fs = require('fs');
const path = require('path');

const files = [
    'test-chatbot.mjs',
    'src/utils/chatbotLogic.test.js'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted: ${file}`);
        } else {
            console.log(`File not found: ${file}`);
        }
    } catch (error) {
        console.error(`Error deleting ${file}:`, error.message);
    }
});

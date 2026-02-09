
const fs = require('fs');
const path = require('path');
const files = [
    'test-chatbot.mjs',
    'src/utils/chatbotLogic.test.js',
    'delete_files.bat',
    'delete_files.js',
    'del_me_1.txt',
    'src/utils/del_me_2.txt'
];

console.log('Starting deletion...');

files.forEach(f => {
    try {
        const p = path.resolve(__dirname, f);
        if (fs.existsSync(p)) {
            fs.unlinkSync(p);
            console.log('Deleted: ' + f);
        } else {
            console.log('Not found: ' + f);
        }
    } catch (e) {
        console.error('Failed to delete ' + f + ': ' + e.message);
    }
});

try {
    fs.unlinkSync(__filename);
    console.log('Deleted self: ' + path.basename(__filename));
} catch (e) {
    console.error('Failed to delete self: ' + e.message);
}

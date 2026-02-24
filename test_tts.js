import handler from './api/tts.js';
import fs from 'fs';

async function test() {
    const req = {
        method: 'POST',
        body: { text: "Hello, this is a test" }
    };

    const chunks = [];
    const res = {
        setHeader: (k, v) => console.log(`Set header: ${k} = ${v}`),
        status: (s) => {
            console.log('Status set to:', s);
            return {
                json: (obj) => console.log('JSON returned:', obj),
                end: () => console.log('Response ended via status()')
            }
        },
        write: (chunk) => chunks.push(chunk),
        end: () => {
            console.log('Response ended');
            const buffer = Buffer.concat(chunks);
            fs.writeFileSync('./test_audio.mp3', buffer);
            console.log('Wrote', buffer.length, 'bytes to test_audio.mp3');
        },
        on: (event, handler) => {
            console.log('Bound event on res:', event);
        },
        once: (event, handler) => {
            console.log('Bound once event on res:', event);
        },
        emit: (event, data) => {
            console.log('Emitted event on res:', event);
        }
    };

    try {
        await handler(req, res);
        console.log('Handler executed.');
    } catch (e) {
        console.error('Error in test:', e);
    }
}

test();

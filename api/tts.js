/**
 * Vercel Serverless Function: Text-to-Speech (TTS) using gTTS
 *
 * This endpoint accepts a POST request with a text payload
 * and returns an MP3 audio stream of the spoken text.
 */

import gTTS from 'gtts';

// CommonJS style export which works better for local development via Vite/Vercel proxy
export default async function handler(req, res) {
    // CORS Configuration
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { text } = req.body;

        if (!text || typeof text !== 'string') {
            res.status(400).json({ error: 'Invalid text provided' });
            return;
        }

        // Limit text length to prevent abuse or timeout
        const sanitizedText = text.trim().slice(0, 4000);

        // Set appropriate headers for streaming audio
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'close'); // Not SSE, just a single stream

        // Create a new gTTS instance
        // We use English ('en')
        const gtts = new gTTS(sanitizedText, 'en');

        // Stream the audio directly to the Vercel response object
        gtts.stream().pipe(res);

        // Handle potential streaming errors
        gtts.stream().on('error', (err) => {
            console.error('[TTS] Streaming error:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Failed to generate audio stream' });
            }
        });

    } catch (error) {
        console.error('[TTS] Handler error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message || 'Internal server error during TTS payload processing' });
        }
    }
}

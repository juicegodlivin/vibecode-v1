// Vercel Serverless Function for AI Image Generation with Replicate
// Rate limiting: 5 images per minute per IP

const rateLimit = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60000; // 1 minute

function checkRateLimit(ip) {
    const now = Date.now();
    
    if (!rateLimit.has(ip)) {
        rateLimit.set(ip, []);
    }
    
    const requests = rateLimit.get(ip);
    // Clean old requests
    const validRequests = requests.filter(time => now - time < RATE_WINDOW);
    
    if (validRequests.length >= RATE_LIMIT) {
        return false;
    }
    
    validRequests.push(now);
    rateLimit.set(ip, validRequests);
    return true;
}

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    // Get IP address
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
        return res.status(429).json({ 
            success: false, 
            error: 'Rate limit exceeded. Maximum 5 images per minute.' 
        });
    }
    
    try {
        const { prompt } = req.body;
        
        if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid prompt' 
            });
        }
        
        // Call Replicate API
        const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;
        
        if (!REPLICATE_API_KEY) {
            return res.status(500).json({ 
                success: false, 
                error: 'API key not configured' 
            });
        }
        
        // Using Black Forest Labs Flux Dev model
        const response = await fetch('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${REPLICATE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                version: "black-forest-labs/flux-dev",
                input: {
                    prompt: prompt,
                    guidance: 3.5,
                    num_outputs: 1,
                    aspect_ratio: "1:1",
                    output_format: "png",
                    output_quality: 90,
                    num_inference_steps: 28
                }
            })
        });
        
        const prediction = await response.json();
        
        if (response.status !== 201) {
            console.error('Replicate API error:', prediction);
            return res.status(500).json({ 
                success: false, 
                error: 'Failed to generate image' 
            });
        }
        
        // Poll for result
        let result = prediction;
        let attempts = 0;
        const maxAttempts = 60; // 60 seconds max wait
        
        while (result.status !== 'succeeded' && result.status !== 'failed' && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
                headers: {
                    'Authorization': `Token ${REPLICATE_API_KEY}`,
                }
            });
            
            result = await pollResponse.json();
            attempts++;
        }
        
        if (result.status === 'succeeded' && result.output && result.output.length > 0) {
            return res.status(200).json({
                success: true,
                imageUrl: result.output[0],
                prompt: prompt
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Image generation failed or timed out'
            });
        }
        
    } catch (error) {
        console.error('Error generating image:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}


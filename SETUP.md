# AI Image Generator Setup Guide

## 🔑 Getting Your Replicate API Key

1. Go to [https://replicate.com](https://replicate.com)
2. Sign up for a free account
3. Navigate to [Account Settings → API Tokens](https://replicate.com/account/api-tokens)
4. Copy your API token

## 🚀 Deployment to Vercel

### Step 1: Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add a new variable:
   - **Name**: `REPLICATE_API_KEY`
   - **Value**: Your Replicate API token
   - **Environment**: Production, Preview, Development (select all)
3. Click **Save**

### Step 2: Deploy

```bash
# If using Vercel CLI
vercel --prod

# Or push to GitHub and it will auto-deploy
git push origin main
```

## 📊 Rate Limiting

The image generator has built-in rate limiting:
- **Limit**: 5 images per minute per IP address
- **Window**: Rolling 60-second window
- **Storage**: In-memory (resets on serverless function cold starts)

## 💰 Costs

Replicate charges per API call:
- **Stable Diffusion XL**: ~$0.003-0.005 per image
- **Free tier**: $10 credit for new accounts
- Monitor your usage at [https://replicate.com/account/billing](https://replicate.com/account/billing)

## 🔧 Troubleshooting

### API Key Not Working
- Make sure the environment variable is named exactly `REPLICATE_API_KEY`
- Redeploy after adding environment variables
- Check Vercel deployment logs for errors

### Images Not Generating
- Check browser console for errors
- Verify the API endpoint is accessible at `/api/generate-image`
- Ensure rate limit hasn't been exceeded (wait 60 seconds)

### CORS Errors
- The API function already includes CORS headers
- If issues persist, check Vercel function logs

## 🎨 Customizing the Model

To use a different AI model, edit `api/generate-image.js`:

```javascript
// Change the version to a different model
version: "your-model-version-hash-here"
```

Browse models at [https://replicate.com/explore](https://replicate.com/explore)

## 📝 Local Development

For local testing:

1. Install Vercel CLI: `npm i -g vercel`
2. Create `.env` file with your API key
3. Run: `vercel dev`
4. Visit: `http://localhost:3000`


# ENS DAO Finance Board - Deployment Guide

## Vercel Deployment

This project is configured for easy deployment to Vercel. Follow these steps to deploy your ENS DAO Finance Board.

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. **Node.js**: Version 18 or higher (Vercel will handle this automatically)

### Deployment Steps

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect Repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository
   - Vercel will automatically detect it's a Vite React project

2. **Configure Project**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (or `pnpm build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install` (or `pnpm install`)

3. **Environment Variables** (if needed):
   - Add any API keys or environment variables in the Vercel dashboard
   - Common variables:
     ```
     VITE_ETHERSCAN_API_KEY=your_etherscan_key
     VITE_COINGECKO_API_KEY=your_coingecko_key
     ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a URL like: `https://your-project.vercel.app`

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm build settings
   - Deploy

### Build Configuration

The project is pre-configured with:

- **Vite Build**: Optimized for production
- **Static Assets**: Properly served with caching headers
- **SPA Routing**: All routes redirect to index.html
- **Security Headers**: XSS protection, content type options, etc.

### Custom Domain (Optional)

1. **Add Domain**:
   - Go to your project settings in Vercel
   - Navigate to "Domains"
   - Add your custom domain

2. **DNS Configuration**:
   - Follow Vercel's DNS instructions
   - Add the required records to your domain provider

### Environment Variables

Create a `.env` file locally for development:

```env
# API Keys (optional - the app works without them)
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key
VITE_COINGECKO_API_KEY=your_coingecko_api_key

# Feature Flags
VITE_ENABLE_REAL_TIME_DATA=true
VITE_ENABLE_LIVE_PRICES=true
```

### Performance Optimization

The deployment includes:

- **Code Splitting**: Vendor chunks separated
- **Asset Optimization**: Images and static files optimized
- **Caching**: Long-term caching for static assets
- **CDN**: Global content delivery network

### Monitoring

After deployment:

1. **Check Build Logs**: Ensure no build errors
2. **Test Functionality**: Verify all features work
3. **Performance**: Use Vercel Analytics to monitor performance
4. **Uptime**: Monitor application availability

### Troubleshooting

#### Common Issues:

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check for TypeScript errors

2. **Environment Variables**:
   - Ensure all required env vars are set in Vercel
   - Check variable naming (must start with VITE_)

3. **Routing Issues**:
   - Verify vercel.json configuration
   - Check that all routes redirect to index.html

4. **Asset Loading**:
   - Check that all assets are in the public folder
   - Verify import paths are correct

### Support

For deployment issues:

1. **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
2. **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
3. **Project Issues**: Check the project repository

### Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] All navigation tabs work
- [ ] Charts and data visualizations render
- [ ] Responsive design works on mobile
- [ ] Performance is acceptable
- [ ] Custom domain is configured (if applicable)
- [ ] Analytics are set up (optional)
- [ ] Monitoring is configured

Your ENS DAO Finance Board should now be live and accessible worldwide! 🚀

# 🚀 Netlify Deployment Guide

This guide will help you deploy your EduCRM application to Netlify.

## 📋 Prerequisites

- GitHub account
- Netlify account (free)
- Node.js 18+ installed locally

## 🔧 Step-by-Step Deployment

### Method 1: Deploy via Netlify UI (Recommended)

#### Step 1: Prepare Your Repository

1. **Ensure all changes are committed**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Verify your repository structure**
   ```
   educrm/
   ├── app/
   ├── public/
   ├── package.json
   ├── next.config.js
   ├── netlify.toml
   └── README.md
   ```

#### Step 2: Connect to Netlify

1. **Go to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Sign up/Login with your account

2. **Create New Site**
   - Click "New site from Git"
   - Choose "GitHub" as your Git provider
   - Authorize Netlify to access your GitHub account

3. **Select Repository**
   - Choose your `educrm` repository
   - Select the branch (usually `main`)

#### Step 3: Configure Build Settings

Configure these settings in Netlify:

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** 18

#### Step 4: Environment Variables (Optional)

Add these environment variables in Netlify:

```
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
NODE_ENV=production
```

#### Step 5: Deploy

1. Click "Deploy site"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at `https://your-site-name.netlify.app`

### Method 2: Deploy via Netlify CLI

#### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify

```bash
netlify login
```

#### Step 3: Initialize Netlify

```bash
netlify init
```

#### Step 4: Deploy

```bash
netlify deploy --prod
```

## 🔧 Configuration Files

### netlify.toml

This file is already configured for optimal performance:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### next.config.js

Optimized for static export:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Fails

**Error:** `Module not found`
**Solution:** Ensure all dependencies are in `package.json`

```bash
npm install
```

#### 2. 404 Errors

**Error:** Pages not found after deployment
**Solution:** Check `netlify.toml` redirects configuration

#### 3. Environment Variables

**Error:** `NEXT_PUBLIC_*` variables not working
**Solution:** Add them in Netlify dashboard under Site settings > Environment variables

#### 4. Node Version Issues

**Error:** Build fails due to Node version
**Solution:** Set Node version to 18 in Netlify build settings

### Build Logs

Check build logs in Netlify dashboard:
1. Go to your site in Netlify
2. Click "Deploys" tab
3. Click on the latest deploy
4. Check "Build log" for errors

## 🔄 Continuous Deployment

### Automatic Deploys

Once connected, Netlify will automatically deploy when you:
- Push to the main branch
- Create a pull request
- Merge a pull request

### Manual Deploys

Trigger manual deploys from:
- Netlify dashboard
- Netlify CLI: `netlify deploy --prod`

## 📊 Performance Optimization

### Build Optimization

1. **Enable Build Caching**
   - Go to Site settings > Build & deploy
   - Enable "Build cache"

2. **Optimize Images**
   - Use WebP format
   - Compress images before upload

3. **Code Splitting**
   - Next.js automatically handles this
   - Ensure proper dynamic imports

### Performance Monitoring

Monitor your site performance:
1. **Lighthouse Score**: Check in browser dev tools
2. **Netlify Analytics**: Available in dashboard
3. **Core Web Vitals**: Monitor in Google Search Console

## 🔒 Security

### HTTPS

Netlify automatically provides:
- SSL certificates
- HTTPS redirects
- Security headers

### Environment Variables

Keep sensitive data in environment variables:
- API keys
- Database URLs
- Secret tokens

## 📱 Custom Domain

### Add Custom Domain

1. Go to Site settings > Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

### SSL Certificate

Netlify automatically provides SSL certificates for custom domains.

## 🔄 Updates and Maintenance

### Updating Your Site

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. Netlify automatically deploys

### Rollback

If something goes wrong:
1. Go to Deploys tab
2. Find a working version
3. Click "Publish deploy"

## 📞 Support

### Netlify Support

- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community](https://community.netlify.com)
- [Netlify Status](https://status.netlify.com)

### Project Support

- Check [README.md](README.md) for project-specific issues
- Create an issue in the GitHub repository

## 🎉 Success!

Once deployed, your EduCRM will be live at:
`https://your-site-name.netlify.app`

Share this URL with your team and start managing your educational institution efficiently!

---

**Happy Deploying! 🚀**


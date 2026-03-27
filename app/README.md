# NEMESIS MERCHANT

![NEMESIS MERCHANT](https://img.shields.io/badge/NEMESIS-MERCHANT-0B0B0D?style=for-the-badge&logo=biohazard&logoColor=D7FF3B)

A premium gaming software marketplace with Apple-inspired design, featuring smooth scroll animations, shopping cart functionality, and a sleek dark UI.

![Preview](public/fortnite_keyboard.jpg)

## Features

- **11 Game Software Products** - Fortnite, Sea of Thieves, Overwatch 2, Spoofers, Marvel Rivals, Accounts, Apex Legends, Call of Duty, FiveM, Rust, GTA V
- **Server Infrastructure** - Dedicated Servers, VPS, and VDS plans
- **Shopping Cart** - Full add/remove/update quantity functionality
- **Checkout System** - Email-based order placement
- **Smooth Animations** - GSAP ScrollTrigger pinned sections
- **Responsive Design** - Mobile and desktop optimized
- **Dark Theme** - Premium neon lime & violet accent colors

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** GSAP + ScrollTrigger
- **Icons:** Lucide React

---

## Local Installation

### Prerequisites

- **Node.js** 18+ (Download from [nodejs.org](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Git** (Download from [git-scm.com](https://git-scm.com/))

### Step 1: Clone or Download the Project

```bash
# If using Git
git clone <your-repository-url>
cd nemesis-merchant

# Or download and extract the ZIP file, then navigate to the folder
cd nemesis-merchant
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- GSAP
- shadcn/ui components
- Lucide icons

### Step 3: Start Development Server

```bash
npm run dev
```

The development server will start at `http://localhost:5173`

Open your browser and navigate to this URL to see the website.

### Step 4: Build for Production (Optional)

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Step 5: Preview Production Build (Optional)

```bash
npm run preview
```

This serves the production build locally at `http://localhost:4173`

---

## Project Structure

```
nemesis-merchant/
├── src/
│   ├── App.tsx           # Main application component
│   ├── App.css           # Custom styles
│   ├── index.css         # Global styles & Tailwind
│   ├── main.tsx          # Entry point
│   ├── components/       # UI components
│   │   └── ui/          # shadcn/ui components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript types
├── public/              # Static assets (images)
├── dist/               # Production build output
├── index.html          # HTML entry point
├── package.json        # Dependencies & scripts
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

---

## Upload to GitHub

### Step 1: Create a GitHub Account

If you don't have one, sign up at [github.com](https://github.com)

### Step 2: Install Git (if not already installed)

```bash
# macOS
brew install git

# Windows - Download from git-scm.com
# Linux (Ubuntu/Debian)
sudo apt-get install git
```

### Step 3: Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 4: Initialize Git Repository

Navigate to your project folder and initialize Git:

```bash
cd nemesis-merchant
git init
```

### Step 5: Create a .gitignore File

Create a `.gitignore` file in the root directory:

```bash
# Create the file
touch .gitignore
```

Add this content to `.gitignore`:

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Build output
dist/
dist-ssr/
*.local

# Environment files
.env
.env.local
.env.*.local

# IDE
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS files
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Cache
.cache/
.temp/
```

### Step 6: Stage and Commit Files

```bash
# Add all files to staging
git add .

# Commit with a message
git commit -m "Initial commit: NEMESIS MERCHANT website"
```

### Step 7: Create a Repository on GitHub

1. Go to [github.com](https://github.com) and log in
2. Click the **+** icon in the top right → **New repository**
3. Enter repository name: `nemesis-merchant`
4. Choose **Public** or **Private**
5. Do NOT initialize with README (you already have one)
6. Click **Create repository**

### Step 8: Connect Local Repository to GitHub

Copy the commands from GitHub (they'll look like this):

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/nemesis-merchant.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 9: Verify Upload

Refresh your GitHub repository page - you should see all your files uploaded.

---

## Deploy on Render.com

### Option 1: Deploy Static Site (Recommended)

This is the easiest method for a Vite React app.

#### Step 1: Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended) or email
3. Verify your email if required

#### Step 2: Connect GitHub Repository

1. From the Render Dashboard, click **New +**
2. Select **Static Site**
3. Click **Connect GitHub**
4. Authorize Render to access your repositories
5. Search for and select `nemesis-merchant`
6. Click **Connect**

#### Step 3: Configure Build Settings

Fill in the following:

| Field | Value |
|-------|-------|
| **Name** | nemesis-merchant |
| **Branch** | main |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

#### Step 4: Environment Variables (Optional)

If your app needs environment variables:

1. Click **Advanced** to expand
2. Click **Add Environment Variable**
3. Add your variables (e.g., API keys)

#### Step 5: Deploy

1. Click **Create Static Site**
2. Render will automatically build and deploy your site
3. Wait for the build to complete (usually 2-5 minutes)
4. Your site will be live at `https://nemesis-merchant.onrender.com`

---

### Option 2: Deploy as Web Service

Use this if you need server-side functionality.

#### Step 1: Create a Web Service

1. From Render Dashboard, click **New +**
2. Select **Web Service**
3. Connect your GitHub repository

#### Step 2: Configure Settings

| Field | Value |
|-------|-------|
| **Name** | nemesis-merchant |
| **Branch** | main |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run preview` |

#### Step 3: Deploy

1. Click **Create Web Service**
2. Wait for deployment to complete

---

### Option 3: Deploy via Render Blueprint (render.yaml)

Create a `render.yaml` file in your project root:

```yaml
services:
  - type: static
    name: nemesis-merchant
    runtime: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

Commit and push this file:

```bash
git add render.yaml
git commit -m "Add Render deployment configuration"
git push
```

Then on Render:

1. Click **New +** → **Blueprint**
2. Connect your repository
3. Render will automatically detect the `render.yaml`
4. Click **Apply**

---

## Custom Domain Setup (Optional)

### On Render:

1. Go to your Static Site dashboard
2. Click **Settings**
3. Scroll to **Custom Domain**
4. Click **Add Custom Domain**
5. Enter your domain (e.g., `nemesismerchant.com`)
6. Follow the DNS configuration instructions

### Common DNS Records:

**For root domain (apex):**
```
Type: A
Name: @
Value: 216.24.57.1 (Render's IP - check your dashboard for exact value)
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: nemesis-merchant.onrender.com
```

---

## Troubleshooting

### Build Fails on Render

**Problem:** `npm install` fails or build errors

**Solution:**
1. Check that `package.json` is committed to GitHub
2. Verify Node.js version in Render settings (should be 18+)
3. Check build logs for specific errors

### Images Not Loading

**Problem:** Images return 404 errors

**Solution:**
1. Ensure images are in the `public/` folder
2. Reference them with `/image-name.jpg` (not relative paths)
3. Check that images are committed to GitHub

### Animations Not Working

**Problem:** GSAP animations don't play

**Solution:**
1. Check browser console for errors
2. Verify GSAP is installed: `npm list gsap`
3. Ensure ScrollTrigger is registered

### Git Push Rejected

**Problem:** `git push` fails with rejection

**Solution:**
```bash
# Pull latest changes first
git pull origin main --rebase

# Then push again
git push origin main
```

---

## Updating Your Website

### Make Changes Locally

1. Edit files in your local project
2. Test with `npm run dev`
3. Build with `npm run build`

### Push Updates to GitHub

```bash
# Stage changes
git add .

# Commit
git commit -m "Description of changes"

# Push
git push origin main
```

### Auto-Deploy on Render

Render automatically deploys when you push to GitHub. Just:

1. Push to GitHub
2. Wait for Render to detect the change
3. Watch the build progress in Render dashboard
4. Your site updates automatically!

---

## Environment Variables

If you need to add API keys or secrets:

### Local Development

Create a `.env` file in the project root:

```env
VITE_API_KEY=your_api_key_here
VITE_API_URL=https://api.example.com
```

Access in code:
```typescript
const apiKey = import.meta.env.VITE_API_KEY;
```

### On Render

1. Go to your service dashboard
2. Click **Environment**
3. Add key-value pairs
4. Redeploy if necessary

---

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new package
npm install package-name

# Update all packages
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [GSAP Documentation](https://greensock.com/gsap/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Render Documentation](https://render.com/docs)
- [GitHub Documentation](https://docs.github.com/)

---

## License

This project is private and proprietary. All rights reserved.

---

## Support

For support, contact:
- Telegram: [@nemesismerchant](https://t.me/nemesismerchant)
- Email: support@nemesismerchant.io

---

Built with React + Vite + Tailwind CSS + GSAP
#!/bin/bash

# 🚀 EduCRM Netlify Deployment Script
# This script helps you deploy your EduCRM application to Netlify

echo "🚀 Starting EduCRM deployment to Netlify..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version check passed: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "npm is installed: $(npm -v)"

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

print_success "Git is installed: $(git --version)"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository. Please initialize git first."
    exit 1
fi

print_success "Git repository found"

# Check if all files are committed
if ! git diff-index --quiet HEAD --; then
    print_warning "You have uncommitted changes. Please commit them first:"
    echo "  git add ."
    echo "  git commit -m 'Ready for deployment'"
    exit 1
fi

print_success "All changes are committed"

# Install dependencies
print_status "Installing dependencies..."
if npm install; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Run linting
print_status "Running linting..."
if npm run lint; then
    print_success "Linting passed"
else
    print_warning "Linting failed, but continuing with deployment"
fi

# Build the project
print_status "Building the project..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    print_warning "Netlify CLI is not installed. Installing now..."
    if npm install -g netlify-cli; then
        print_success "Netlify CLI installed successfully"
    else
        print_error "Failed to install Netlify CLI"
        exit 1
    fi
fi

print_success "Netlify CLI is installed: $(netlify --version)"

# Check if user is logged in to Netlify
if ! netlify status &> /dev/null; then
    print_warning "You are not logged in to Netlify. Please login:"
    echo "  netlify login"
    exit 1
fi

print_success "Logged in to Netlify"

# Deploy to Netlify
print_status "Deploying to Netlify..."
if netlify deploy --prod; then
    print_success "Deployment completed successfully!"
    print_success "Your EduCRM is now live on Netlify!"
else
    print_error "Deployment failed"
    exit 1
fi

echo ""
echo "🎉 Deployment Summary:"
echo "======================"
echo "✅ Node.js version check passed"
echo "✅ npm is installed"
echo "✅ Git repository found"
echo "✅ All changes committed"
echo "✅ Dependencies installed"
echo "✅ Build completed"
echo "✅ Netlify CLI installed"
echo "✅ Netlify login verified"
echo "✅ Deployment successful"
echo ""
echo "🌐 Your site is now live!"
echo "📊 Check your Netlify dashboard for the URL"
echo "🔄 Future updates will auto-deploy when you push to main branch"
echo ""
echo "Happy managing your educational institution! 🎓"


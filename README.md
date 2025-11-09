# EduCRM - Educational Customer Relationship Management

A modern, comprehensive CRM solution designed specifically for educational institutions. Built with Next.js 15, React 19, and Tailwind CSS 4.

![EduCRM Dashboard](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=for-the-badge&logo=typescript)

## 🎯 Overview

EduCRM is a powerful Customer Relationship Management system tailored for educational institutions including schools, colleges, coaching centers, and training institutes. It provides comprehensive tools for student management, fee collection, analytics, and institutional growth.

## ✨ Features

### 🎓 Student Management
- **Comprehensive Student Database**: Store and manage student information, enrollment details, and academic records
- **Attendance Tracking**: Monitor student attendance with detailed reports
- **Performance Analytics**: Track academic progress and generate performance reports
- **Student Portal**: Individual student dashboards with progress tracking

### 💰 Fee Management
- **Automated Fee Collection**: Multiple payment gateway integrations (Razorpay, Paytm, UPI)
- **Payment Tracking**: Real-time payment status and history
- **Outstanding Dues Management**: Automated reminders and payment scheduling
- **Financial Reports**: Detailed revenue analytics and financial insights

### 📊 Analytics & Reporting
- **Real-time Dashboard**: Live insights into institutional performance
- **Revenue Analytics**: Track income, growth trends, and payment patterns
- **Student Performance Reports**: Academic progress and attendance analytics
- **Custom Reports**: Generate tailored reports for different stakeholders

### 🔐 Security & Compliance
- **Enterprise-grade Security**: Data encryption and secure authentication
- **Role-based Access Control**: Different permission levels for staff and administrators
- **Data Backup**: Automated backup and recovery systems
- **GDPR Compliance**: Educational data protection standards

### 📱 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Intuitive Interface**: User-friendly design with modern interactions
- **Accessibility**: WCAG compliant design for inclusive access

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/educrm.git
   cd educrm
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
educrm/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── login/             # Authentication pages
│   ├── onboarding/        # User onboarding flow
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── public/               # Static assets
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Lucide React**: Modern icon library

### Charts & Visualization
- **Recharts**: Composable charting library for React
- **Custom Charts**: Area charts, bar charts, and pie charts

### UI/UX
- **Headless UI**: Unstyled, accessible UI components
- **Custom Components**: Tailored components for educational use cases
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Theme switching capability

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) - Trust and professionalism
- **Success**: Green (#10b981) - Growth and achievement
- **Warning**: Yellow (#f59e0b) - Attention and alerts
- **Destructive**: Red (#ef4444) - Errors and critical actions

### Typography
- **Font**: Geist Sans - Modern, readable font family
- **Hierarchy**: Clear typographic scale for better readability
- **Accessibility**: High contrast ratios and proper font sizes

### Components
- **Cards**: Consistent card design with hover effects
- **Buttons**: Multiple button variants with proper states
- **Forms**: Accessible form components with validation
- **Navigation**: Intuitive navigation with active states

## 📊 Key Metrics

The dashboard displays essential metrics for educational institutions:

- **Total Revenue**: Overall institutional income
- **Active Students**: Current enrolled students
- **Outstanding Dues**: Pending fee payments
- **Conversion Rate**: Lead to enrollment ratio
- **Course Performance**: Revenue by course analysis
- **Payment Methods**: Gateway-wise payment distribution

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=your-api-url
```

### Customization
- **Branding**: Update colors in `app/globals.css`
- **Content**: Modify text content in respective components
- **Features**: Enable/disable features through configuration

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured dashboard experience
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly mobile interface

## 🌙 Dark Mode

EduCRM supports both light and dark themes:
- **Automatic**: Follows system preference
- **Manual**: User-controlled theme switching
- **Persistent**: Remembers user preference

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
- **Netlify**: Static site deployment
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.educrm.com](https://docs.educrm.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/educrm/issues)
- **Email**: support@educrm.com
- **Discord**: [Join our community](https://discord.gg/educrm)

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon library
- **Recharts**: For the charting capabilities

---

**Built with ❤️ for Educational Institutions Worldwide**

diff --git a/next.config.js b/next.config.js
index 267877b..ebfa9f5 100644
--- a/next.config.js
+++ b/next.config.js
@@ -4,9 +4,6 @@ const nextConfig = {
   trailingSlash: true,
   images: {
     unoptimized: true
-  },
-  experimental: {
-    appDir: true
   }
 }

Rebuild :
mvn clean package -DskipTests

Run :
java -jar target/gym-crm-backend-1.0.0.jar

Make Backend Run in Background (Recommended for EC2)
sudo nano /etc/systemd/system/gym-backend.service

paste : 
[Unit]
Description=Gym CRM Spring Boot Backend
After=network.target

[Service]
User=root
WorkingDirectory=/home/gym-backend
ExecStart=/usr/bin/java -jar /home/gym-backend/target/gym-crm-backend-1.0.0.jar
SuccessExitStatus=143
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target

Enable:
sudo systemctl daemon-reload
sudo systemctl start gym-backend
sudo systemctl enable gym-backend

check logs :
sudo journalctl -u gym-backend -f

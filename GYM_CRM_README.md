# 🏋️ Gym CRM System

A comprehensive Customer Relationship Management system designed specifically for gyms and fitness centers. This system provides complete management of members, trainers, attendance, payments, and progress tracking.

## ✨ Features

### 🔑 Core Features

#### Member Management
- **Member Registration**: Complete member profiles with personal information, contact details, and emergency contacts
- **Membership Plans**: Support for monthly, quarterly, and yearly memberships
- **Membership Expiry Alerts**: Automated notifications for renewals
- **Member Search & Filtering**: Advanced search and filtering capabilities

#### Attendance Tracking
- **QR Code Scanning**: Members can scan QR codes for quick check-in/check-out
- **Biometric Integration**: Fingerprint scanning support
- **Manual Entry**: Staff can manually record attendance
- **Attendance History**: Complete attendance records with timestamps

#### Progress Tracking
- **Weight & BMI Tracking**: Monitor member fitness progress
- **Body Measurements**: Track chest, waist, hips, biceps, and thighs
- **Body Composition**: Body fat percentage and muscle mass tracking
- **Progress Charts**: Visual representation of member progress over time
- **Goal Setting**: Set and track fitness goals

#### Trainer Management
- **Trainer Profiles**: Complete trainer information with specializations
- **Certifications**: Track trainer qualifications and certifications
- **Schedule Management**: Manage trainer availability and schedules
- **Member Assignment**: Assign members to specific trainers
- **Performance Ratings**: Member feedback and trainer ratings

#### Payment Management
- **Multiple Payment Methods**: Cash, UPI, Card, Online Gateway support
- **Automated Reminders**: WhatsApp, Email, and SMS notifications
- **Receipt Generation**: PDF receipts for all transactions
- **Pending Dues Tracker**: Monitor outstanding payments
- **Payment History**: Complete payment records

#### Staff Management
- **Staff Profiles**: Employee information and roles
- **Attendance Tracking**: Monitor staff attendance
- **Salary & Commission**: Track compensation and performance-based pay
- **Role-based Access**: Different access levels for different staff members

### 🎯 Advanced Features

- **Real-time Dashboard**: Live statistics and metrics
- **Automated Notifications**: Membership expiry, payment due, and progress updates
- **Reporting & Analytics**: Comprehensive reports and insights
- **Mobile Responsive**: Works seamlessly on all devices
- **Multi-language Support**: Ready for international deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd educrm-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000/gym-crm`

### Building for Production

```bash
npm run build
npm start
```

## 📱 Usage

### Dashboard
- View key metrics and statistics
- Quick access to all major functions
- Real-time updates and alerts

### Member Management
1. **Add New Member**: Complete registration form with all required information
2. **Search Members**: Find members by name, ID, or contact details
3. **Edit Profiles**: Update member information and preferences
4. **View History**: Check attendance, payments, and progress

### Attendance Tracking
1. **QR Code Scanner**: Members scan QR codes for entry/exit
2. **Manual Entry**: Staff can manually record attendance
3. **Biometric**: Fingerprint scanning for quick identification
4. **Reports**: Generate attendance reports and analytics

### Payment Processing
1. **Record Payments**: Multiple payment method support
2. **Send Reminders**: Automated payment due notifications
3. **Generate Receipts**: PDF receipts for all transactions
4. **Track Dues**: Monitor outstanding payments

### Progress Monitoring
1. **Add Measurements**: Record weight, BMI, and body measurements
2. **Set Goals**: Define fitness targets and milestones
3. **Track Progress**: Visual progress charts and reports
4. **Share Results**: Export and share progress with members

## 🏗️ Architecture

### Frontend
- **Next.js 15**: React framework with server-side rendering
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Framer Motion**: Smooth animations and transitions

### State Management
- React hooks for local state
- Context API for global state (if needed)
- Form handling with react-hook-form

### Data Structure
- JSON-based data storage (can be easily connected to backend)
- Responsive design for all screen sizes
- Optimized for performance

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_NAME=Gym CRM
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Customization
- **Colors**: Modify Tailwind CSS configuration
- **Layouts**: Customize page layouts and components
- **Features**: Enable/disable specific features
- **Branding**: Add your gym's logo and branding

## 📊 Data Models

### Member
```typescript
interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  membershipType: string;
  startDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
}
```

### Attendance
```typescript
interface Attendance {
  id: number;
  memberId: number;
  checkIn: string;
  checkOut?: string;
  method: 'QR' | 'Biometric' | 'Manual';
  status: 'checked-in' | 'completed' | 'late';
}
```

### Payment
```typescript
interface Payment {
  id: number;
  memberId: number;
  amount: number;
  method: 'Cash' | 'UPI' | 'Card' | 'Online';
  status: 'completed' | 'pending' | 'overdue';
  dueDate: string;
  transactionId?: string;
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site hosting
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

## 🔒 Security Features

- **Input Validation**: All forms include validation
- **XSS Protection**: Built-in security measures
- **Role-based Access**: Different permission levels
- **Data Encryption**: Secure data transmission

## 📈 Performance

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js image optimization
- **Lazy Loading**: Components load on demand
- **Caching**: Efficient caching strategies

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Mobile App**: Native iOS and Android applications
- **AI Integration**: Smart recommendations and insights
- **Wearable Integration**: Connect with fitness trackers
- **Advanced Analytics**: Machine learning-powered insights
- **Multi-location Support**: Manage multiple gym locations
- **Integration APIs**: Connect with other fitness platforms

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Built with ❤️ for the fitness community**

*Transform your gym management with this comprehensive CRM solution!*

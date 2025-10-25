// =====================================================
// GYM CRM MONGODB SCHEMA
// =====================================================

// Users Collection
const usersSchema = {
  _id: ObjectId,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'manager', 'trainer', 'receptionist'], 
    required: true 
  },
  phone: String,
  profileImage: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

// Members Collection
const membersSchema = {
  _id: ObjectId,
  memberCode: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: String,
  phone: { type: String, required: true },
  dateOfBirth: Date,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  healthInfo: {
    medicalConditions: [String],
    allergies: [String],
    fitnessGoals: [String]
  },
  profileImage: String,
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'suspended', 'expired'], 
    default: 'active' 
  },
  joinDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

// Membership Plans Collection
const membershipPlansSchema = {
  _id: ObjectId,
  name: { type: String, required: true },
  description: String,
  durationMonths: { type: Number, required: true },
  price: { type: Number, required: true },
  features: [String],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
};

// Member Memberships Collection
const memberMembershipsSchema = {
  _id: ObjectId,
  memberId: { type: ObjectId, ref: 'members', required: true },
  planId: { type: ObjectId, ref: 'membershipPlans', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  amountPaid: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['active', 'expired', 'cancelled', 'suspended'], 
    default: 'active' 
  },
  autoRenewal: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
};

// Trainers Collection
const trainersSchema = {
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'users' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  specialization: String,
  experienceYears: Number,
  hourlyRate: Number,
  certifications: [String],
  bio: String,
  schedule: {
    monday: { start: String, end: String, isAvailable: Boolean },
    tuesday: { start: String, end: String, isAvailable: Boolean },
    wednesday: { start: String, end: String, isAvailable: Boolean },
    thursday: { start: String, end: String, isAvailable: Boolean },
    friday: { start: String, end: String, isAvailable: Boolean },
    saturday: { start: String, end: String, isAvailable: Boolean },
    sunday: { start: String, end: String, isAvailable: Boolean }
  },
  location: String,
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

// Trainer Assignments Collection
const trainerAssignmentsSchema = {
  _id: ObjectId,
  trainerId: { type: ObjectId, ref: 'trainers', required: true },
  memberId: { type: ObjectId, ref: 'members', required: true },
  assignedDate: { type: Date, required: true },
  endDate: Date,
  status: { 
    type: String, 
    enum: ['active', 'completed', 'cancelled'], 
    default: 'active' 
  },
  notes: String,
  createdAt: { type: Date, default: Date.now }
};

// Attendance Collection
const attendanceSchema = {
  _id: ObjectId,
  memberId: { type: ObjectId, ref: 'members', required: true },
  checkIn: { type: Date, required: true },
  checkOut: Date,
  durationMinutes: Number,
  method: { 
    type: String, 
    enum: ['qr_code', 'manual', 'biometric'], 
    required: true 
  },
  notes: String,
  createdAt: { type: Date, default: Date.now }
};

// Payments Collection
const paymentsSchema = {
  _id: ObjectId,
  memberId: { type: ObjectId, ref: 'members', required: true },
  membershipId: { type: ObjectId, ref: 'memberMemberships' },
  amount: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    enum: ['cash', 'card', 'upi', 'online', 'bank_transfer'], 
    required: true 
  },
  transactionId: String,
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed', 'refunded'], 
    default: 'pending' 
  },
  paymentDate: Date,
  dueDate: Date,
  notes: String,
  createdAt: { type: Date, default: Date.now }
};

// Progress Tracking Collection
const progressTrackingSchema = {
  _id: ObjectId,
  memberId: { type: ObjectId, ref: 'members', required: true },
  measurementDate: { type: Date, required: true },
  measurements: {
    weight: Number,
    height: Number,
    bmi: Number,
    bodyFatPercentage: Number,
    muscleMass: Number,
    chest: Number,
    waist: Number,
    hips: Number,
    biceps: Number,
    thighs: Number
  },
  notes: String,
  createdAt: { type: Date, default: Date.now }
};

// Workout Sessions Collection
const workoutSessionsSchema = {
  _id: ObjectId,
  memberId: { type: ObjectId, ref: 'members', required: true },
  trainerId: { type: ObjectId, ref: 'trainers' },
  sessionDate: { type: Date, required: true },
  startTime: String,
  endTime: String,
  durationMinutes: Number,
  workoutType: String,
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    duration: Number
  }],
  caloriesBurned: Number,
  notes: String,
  createdAt: { type: Date, default: Date.now }
};

// Equipment Collection
const equipmentSchema = {
  _id: ObjectId,
  name: { type: String, required: true },
  description: String,
  category: String,
  location: String,
  purchaseDate: Date,
  warrantyExpiry: Date,
  maintenanceIntervalDays: Number,
  lastMaintenanceDate: Date,
  status: { 
    type: String, 
    enum: ['active', 'maintenance', 'out_of_order', 'retired'], 
    default: 'active' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

// Equipment Maintenance Collection
const equipmentMaintenanceSchema = {
  _id: ObjectId,
  equipmentId: { type: ObjectId, ref: 'equipment', required: true },
  maintenanceDate: { type: Date, required: true },
  maintenanceType: { 
    type: String, 
    enum: ['routine', 'repair', 'inspection'], 
    required: true 
  },
  description: String,
  cost: Number,
  performedBy: String,
  nextMaintenanceDate: Date,
  createdAt: { type: Date, default: Date.now }
};

// Notifications Collection
const notificationsSchema = {
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'users' },
  memberId: { type: ObjectId, ref: 'members' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['info', 'success', 'warning', 'error'], 
    default: 'info' 
  },
  isRead: { type: Boolean, default: false },
  sentAt: { type: Date, default: Date.now }
};

// Settings Collection
const settingsSchema = {
  _id: ObjectId,
  settingKey: { type: String, required: true, unique: true },
  settingValue: String,
  description: String,
  updatedAt: { type: Date, default: Date.now }
};

// =====================================================
// MONGODB INDEXES
// =====================================================

// Create indexes for better performance
db.members.createIndex({ "email": 1 });
db.members.createIndex({ "phone": 1 });
db.members.createIndex({ "status": 1 });
db.members.createIndex({ "joinDate": 1 });

db.attendance.createIndex({ "memberId": 1, "checkIn": 1 });
db.attendance.createIndex({ "checkIn": 1 });

db.payments.createIndex({ "memberId": 1, "status": 1 });
db.payments.createIndex({ "dueDate": 1 });

db.progressTracking.createIndex({ "memberId": 1, "measurementDate": 1 });

db.trainerAssignments.createIndex({ "memberId": 1 });
db.trainerAssignments.createIndex({ "trainerId": 1 });




-- =====================================================
-- GYM CRM DATABASE SCHEMA
-- =====================================================

-- Users/Staff Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role ENUM('admin', 'manager', 'trainer', 'receptionist') NOT NULL,
    phone VARCHAR(20),
    profile_image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Members Table
CREATE TABLE members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_code VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relation VARCHAR(50),
    medical_conditions TEXT,
    allergies TEXT,
    fitness_goals TEXT,
    profile_image VARCHAR(255),
    status ENUM('active', 'inactive', 'suspended', 'expired') DEFAULT 'active',
    join_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Membership Plans Table
CREATE TABLE membership_plans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration_months INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    features JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Member Memberships Table
CREATE TABLE member_memberships (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    amount_paid DECIMAL(10,2) NOT NULL,
    status ENUM('active', 'expired', 'cancelled', 'suspended') DEFAULT 'active',
    auto_renewal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES membership_plans(id) ON DELETE CASCADE
);

-- Trainers Table
CREATE TABLE trainers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    specialization VARCHAR(100),
    experience_years INT,
    hourly_rate DECIMAL(8,2),
    certifications JSON,
    bio TEXT,
    schedule JSON,
    location VARCHAR(100),
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_ratings INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Trainer Assignments Table
CREATE TABLE trainer_assignments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trainer_id INT NOT NULL,
    member_id INT NOT NULL,
    assigned_date DATE NOT NULL,
    end_date DATE,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- Attendance Table
CREATE TABLE attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    check_in DATETIME NOT NULL,
    check_out DATETIME,
    duration_minutes INT,
    method ENUM('qr_code', 'manual', 'biometric') NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- Payments Table
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    membership_id INT,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('cash', 'card', 'upi', 'online', 'bank_transfer') NOT NULL,
    transaction_id VARCHAR(100),
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    payment_date DATETIME,
    due_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    FOREIGN KEY (membership_id) REFERENCES member_memberships(id) ON DELETE SET NULL
);

-- Progress Tracking Table
CREATE TABLE progress_tracking (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    measurement_date DATE NOT NULL,
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    bmi DECIMAL(4,2),
    body_fat_percentage DECIMAL(4,2),
    muscle_mass DECIMAL(5,2),
    chest_cm DECIMAL(5,2),
    waist_cm DECIMAL(5,2),
    hips_cm DECIMAL(5,2),
    biceps_cm DECIMAL(5,2),
    thighs_cm DECIMAL(5,2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- Workout Sessions Table
CREATE TABLE workout_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    trainer_id INT,
    session_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    duration_minutes INT,
    workout_type VARCHAR(100),
    exercises JSON,
    calories_burned INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE SET NULL
);

-- Equipment Table
CREATE TABLE equipment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    location VARCHAR(100),
    purchase_date DATE,
    warranty_expiry DATE,
    maintenance_interval_days INT,
    last_maintenance_date DATE,
    status ENUM('active', 'maintenance', 'out_of_order', 'retired') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Equipment Maintenance Table
CREATE TABLE equipment_maintenance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    equipment_id INT NOT NULL,
    maintenance_date DATE NOT NULL,
    maintenance_type ENUM('routine', 'repair', 'inspection') NOT NULL,
    description TEXT,
    cost DECIMAL(10,2),
    performed_by VARCHAR(100),
    next_maintenance_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE
);

-- Notifications Table
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    member_id INT,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- Settings Table
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_phone ON members(phone);
CREATE INDEX idx_members_status ON members(status);
CREATE INDEX idx_members_join_date ON members(join_date);

CREATE INDEX idx_attendance_member_date ON attendance(member_id, check_in);
CREATE INDEX idx_attendance_check_in ON attendance(check_in);

CREATE INDEX idx_payments_member_status ON payments(member_id, status);
CREATE INDEX idx_payments_due_date ON payments(due_date);

CREATE INDEX idx_progress_member_date ON progress_tracking(member_id, measurement_date);

CREATE INDEX idx_trainer_assignments_member ON trainer_assignments(member_id);
CREATE INDEX idx_trainer_assignments_trainer ON trainer_assignments(trainer_id);

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert sample membership plans
INSERT INTO membership_plans (name, description, duration_months, price, features) VALUES
('Basic', 'Access to gym floor and basic equipment', 1, 999.00, '["Gym Access", "Basic Equipment", "Locker Room"]'),
('Standard', 'Includes group classes and personal training sessions', 3, 1499.00, '["Gym Access", "Group Classes", "Personal Training", "Locker Room"]'),
('Premium', 'Full access to all facilities and premium services', 6, 2499.00, '["Gym Access", "All Classes", "Personal Training", "Spa Access", "Nutrition Consultation"]');

-- Insert sample settings
INSERT INTO settings (setting_key, setting_value, description) VALUES
('gym_name', 'FitLife Gym', 'Name of the gym'),
('gym_address', '123 Fitness Street, Mumbai', 'Gym address'),
('gym_phone', '+91 98765 43210', 'Gym contact number'),
('gym_email', 'info@fitlifegym.com', 'Gym email address'),
('auto_renewal_days', '7', 'Days before expiry to send renewal reminder'),
('max_members', '1000', 'Maximum number of members allowed');






//Some Changes In Table
ALTER TABLE members
ADD COLUMN user_id BIGINT NULL;

ALTER TABLE members
ADD CONSTRAINT FK_member_user FOREIGN KEY (user_id) REFERENCES users(id);

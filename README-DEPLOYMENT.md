# Aqua Alert - Deployment Guide

## 🌐 Live Deployment
**Primary URL:** https://aqua-alert-chi.vercel.app

## 🗄️ Supabase Database Setup

### 1. Access Supabase Dashboard
Go to: https://rxxtdlfzgbffuzbhsboe.supabase.co

### 2. Run Database Setup
1. Navigate to **SQL Editor** in your Supabase dashboard
2. Create a new query
3. Copy and paste the contents of `supabase-setup.sql`
4. Click **Run** to execute the setup

### 3. Verify Tables
Check that these tables were created:
- `profiles` - User profile information
- `hazard_reports` - Ocean hazard reports

### 4. Environment Variables (Already Configured)
```
NEXT_PUBLIC_SUPABASE_URL=https://rxxtdlfzgbffuzbhsboe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🌍 Multilingual Support
The platform supports all 23 Indian languages:
- Hindi, Bengali, Tamil, Telugu, Gujarati, Kannada, Malayalam, Marathi
- Punjabi, Urdu, Assamese, Odia, Kashmiri, Konkani, Manipuri
- Nepali, Santali, Sindhi, Tibetan, Maithili, Dogri, Sanskrit
- Plus English and international languages

## 🚀 Features Live
✅ Ocean hazard reporting system
✅ Real-time dashboard with analytics
✅ Community features and user profiles
✅ Multilingual interface (23+ languages)
✅ Mobile-responsive design
✅ Authentication and user management

## 🔧 Technical Stack
- **Frontend:** Next.js 14, React 18, TypeScript
- **Backend:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI

## 📱 Usage
1. Visit https://aqua-alert-chi.vercel.app
2. Sign up for an account
3. Select your preferred language
4. Start reporting ocean hazards
5. View community reports on the dashboard
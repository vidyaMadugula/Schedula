# 🩺 Doctor Appointment Scheduling App

A modern, responsive web app for booking doctor appointments — built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Includes features like login, doctor selection, time slot booking, appointment confirmation, and patient details form.

---

## 🚀 Features

- 🔐 **Login with Email and password**
- 🧑‍⚕️ **Doctor Listing** with images, specialties, bios
- 📅 **Date Picker** (Next 20 days)
- ⏰ **Time Slot Selection** with 15-min intervals
- ✅ **Booking Confirmation Screen** with token
- 🧍 **Patient Details Entry** (gender, symptoms, etc.)
- 💡 **Responsive UI** using Tailwind CSS

---

## 🧰 Tech Stack

| Technology    | Purpose                         |
|---------------|----------------------------------|
| Next.js       | React-based framework with App Router |
| TypeScript    | Type safety for better developer experience |
| Tailwind CSS  | Utility-first CSS framework for fast styling |
| React Hook Form | Lightweight form management |
| Lucide Icons  | Icons for UI elements |
| Static JSON   | For doctor and user data |


---

## 🗂️ Folder Structure



## 🗂️ Folder Structure

```bash
doctor-appointment-ui/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── appointments/
│   │   │   │   └── route.ts
│   │   │   ├── auth/
│   │   │   │   └── login/
│   │   │   │       └── route.ts
│   │   │   └── doctors/
│   │   │       └── [[...params]]/
│   │   │           └── route.ts
│   │   ├── book/
│   │   ├── confirmation/
│   │   │   └── page.tsx
│   │   ├── doctors/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── otp/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── records/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── BottomNav.tsx
│   │   ├── ConfirmationCard.tsx
│   │   ├── DoctorList.tsx
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── SlotPicker.tsx
│   │   └── UserDetails.tsx
│   ├── data/
│   │   ├── appointments.json
│   │   └── doctors.json
│   ├── types/
│   │   └── index.ts
│   ├── globals.css
│   └── ClientLayout.tsx
├── .env.local
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json

```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/doctor-appointment-ui.git
cd doctor-appointment-ui
```
 
### 2. Install Dependencies
```bash
npm install
# or
yarn install
```
### 3. Run the App
```bash
npm run dev
```
## 🔐 Demo Login Credentials

To access the application, use the following test credentials:

**Email:** `vidya@email.com`  
**Password:** `12345`

These credentials can be used on the login page to explore the appointment booking flow.



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
├── app/ # Next.js App Router pages
│ ├── login/ 
│ ├── appointment/ # Doctor selection page
│ ├── book/ # Date & time slot picker
│ ├── confirmation/ # Success token page
│ └── patient-details/ # Add patient information
├── components/ # UI components (LoginForm, DoctorList, etc.)
├── data/ # Static JSON for doctors & users
├── services/ # API handlers (e.g., getDoctors)
├── types/ # TypeScript interfaces
├── utils/ # Validators, helpers
├── public/ # Static assets (images, success badge)
├── styles/ # Global Tailwind setup
├── README.md
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


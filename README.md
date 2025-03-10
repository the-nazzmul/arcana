# ![Arcana Banner](https://ghks3sgigz.ufs.sh/f/sJdwCCpG4fmUbetG0h9ut0vYLDmjlJFTPMEUngkHsK6S2eic)

# Arcana 🎓✨

**AI-powered learning companion to simplify your learning journey.**

## 🌐 https://arcana-nazz.vercel.app

## 📖 Overview

Arcana is an AI-powered learning companion that curates and organizes the best free learning resources into structured courses. It eliminates **option paralysis** by using **Google Gemini API** to generate course outlines and fetching relevant video resources via **YouTube API**.

**Key Highlights:**  
✅ Create structured courses with AI  
✅ Fetch relevant video resources automatically  
✅ Manage course chapters seamlessly  
✅ Free and Pro-tier access for content generation

## 🚀 Features

- **AI-Powered Course Creation** – Users can generate courses based on topic, difficulty, and duration.
- **YouTube Video Integration** – Fetches relevant videos for each chapter.
- **Dynamic Content Generation** – One-click chapter content generation using AI.
- **User Authentication** – Secure sign-in and sign-up using Clerk.
- **Free & Pro User Tiers** – Free users can generate 5 chapters, while Pro users can create 30 courses per month.
- **Customizable Course Banner** – Users can personalize their course appearance.

## 🛠️ Tech Stack

Arcana is built using modern technologies to ensure a seamless user experience.

### **Frontend & Frameworks**

- Next.js (14.2.5) – React framework for fast and scalable web apps.
- Tailwind CSS (3.4.1) – Utility-first CSS framework.

### **Backend & APIs**

- Google Gemini API – AI-powered content generation.
- YouTube API – Fetching relevant video resources.
- Clerk Authentication – User authentication and session management.
- PostgreSQL – Database for storing user and course data.
- Drizzle ORM – TypeScript ORM for PostgreSQL.

### **Utilities & Tools**

- Axios – HTTP client for API calls.
- Radix UI – Accessible UI components.
- UploadThing – File uploads.
- Lucide React – Icon set for a modern UI.

## 🏗️ Running Arcana Locally

Follow these steps to set up and run Arcana on your local machine.

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/yourusername/arcana.git
cd arcana
```

### **2️⃣ Install Dependencies**

Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:

```bash
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the root directory and add the following variables:

```plaintext
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_database_url
UPLOADTHING_TOKEN=your_uploadthing_token
YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_BASE_URL=
```

### **4️⃣ Start the Development Server**

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser. 🎉

---

## 🔗 Live Demo

🌍 Check out the live version of Arcana here:
👉 **[Arcana Live](https://arcana-nazz.vercel.app/)**

---

## 📜 License

This project is licensed under the **MIT License**.

---

🚀 Happy Learning with Arcana! 🚀

```

```

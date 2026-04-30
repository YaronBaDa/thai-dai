# Firebase Setup for Thai Dai (Super Simple)

Follow these steps in order. Each step has a copy-paste box.

---

## Step 1: Create a Firebase Project

1. Go to **[console.firebase.google.com](https://console.firebase.google.com)**
2. Click **"Create a project"**
3. Type a name: `thai-dai-app` (or anything you like)
4. When it asks about Google Analytics, **turn it OFF** (simpler)
5. Click **"Create project"** and wait ~30 seconds

---

## Step 2: Add a Web App

1. On your project page, look for a **"</>"** icon ("Add app")
2. Click it and choose **"Web"**
3. Give it a nickname: `thai-dai-web`
4. **Do NOT** check the "Firebase Hosting" box
5. Click **"Register app"**

---

## Step 3: Copy Your API Keys

After registering, you will see a block of code that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyABC123...",
  authDomain: "thai-dai-app.firebaseapp.com",
  projectId: "thai-dai-app",
  storageBucket: "thai-dai-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

**Copy this block.** You need the 5 values inside.

---

## Step 4: Paste into Thai Dai

Open `learn.html` in your code editor and find this section (near the top, inside `<script>`):

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**Replace** the placeholder values with the real ones from Step 3.

---

## Step 5: Turn On Authentication

1. In the left sidebar of Firebase Console, click **"Authentication"**
2. Click **"Get started"**
3. Click **"Email/Password"** and **toggle it to "Enabled"**
4. Click **"Save"**
5. Go back, click **"Anonymous"** and **toggle it to "Enabled"**
6. Click **"Save"**

---

## Step 6: Turn On Database

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Choose a location close to your users (e.g. `asia-southeast1` for Thailand)
5. Click **"Enable"**

---

## Step 7: Set Database Rules

1. In Firestore Database, click the **"Rules"** tab
2. Replace the text with this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

This means: "Only the logged-in user can read/write their own data."

---

## Step 8: Push to GitHub

After editing `learn.html`, commit and push:

```bash
git add learn.html
git commit -m "Add real Firebase config"
git push origin main
```

Done! The app now has real user accounts and cloud sync.

---

## Is This Free?

Yes. Firebase Spark plan is free and includes:
- 50,000 database reads per day
- 20,000 writes per day
- 10,000 authenticated users per month

Thai Dai will not hit these limits unless you have thousands of daily users.

# 📂 Personal File Uploader

A full-stack file management application built as part of **The Odin Project** curriculum. This app allows users to create folders, upload files to the cloud, and share folders via temporary public links.

## 🚀 Features

- **User Authentication**: Secure signup and login using Passport.js.
- **Folder Management**: Create, edit, and delete folders with **Cascade Delete** logic.
- **Cloud Upload**: File storage integrated with **Cloudinary**.
- **File Details**: View metadata (size, upload time) and download files.
- **Shareable Links**: Generate public links for folders with custom expiration dates (UUID-based).

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL with Prisma ORM  
- **Authentication**: Passport.js & express-session  
- **Storage**: Cloudinary API  
- **View Engine**: EJS (Embedded JavaScript)  

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/username/file-uploader.git
cd file-uploader
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root directory:

```env
DATABASE_URL="your_postgresql_url"
SESSION_SECRET="your_secret"
CLOUDINARY_CLOUD_NAME="your_name"
CLOUDINARY_API_KEY="your_key"
CLOUDINARY_API_SECRET="your_secret"
```

### 4. Setup database
```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Run the application
```bash
npm run dev
```

App will run at:
```
http://localhost:3000
```

---

## 📂 Project Structure

```plaintext
.
├── controllers/    # Business logic
├── models/         # Database schema / queries
├── routes/         # Application routes
├── views/          # EJS templates
├── public/         # Static files
├── db/             # Database configuration
├── app.js          # Entry point
├── package.json
└── .gitignore
```

---

## ⚠️ Important Notes

Make sure you **do not upload sensitive files** to GitHub.

Create a `.gitignore` file in your root directory:

```text
node_modules
.env
generated
```

---

## 🧠 What I Learned

- Implementing file uploads with cloud storage (Cloudinary)
- Managing relational data using Prisma ORM
- Building authentication systems with Passport.js
- Handling folder structures and cascade delete logic
- Creating shareable links with expiration logic (UUID)

---

## 🚧 Future Improvements

- Add file preview (images, PDFs)
- Improve UI/UX design
- Add drag-and-drop upload
- Implement role-based access control
- Deploy to cloud (Render / Railway)

---

## 📄 License

This project is for educational purposes as part of **The Odin Project** curriculum.
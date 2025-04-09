
# 🍽️ Restaurant Admin Panel - MERN Stack

**Restaurant Admin Panel** is a web-based application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It provides a complete management solution for restaurant operations and leverages **WebSocket (Socket.io)** technology for real-time communication between the server and admin panel.

---

## ✨ Features

- **Menu Management** – Add, edit, and delete menu items with name, description, price, and category.
- **Order Management** – View, process, and update orders with full order history tracking.
- **User Management** – Manage staff accounts, assign roles, and configure permissions.
- **Analytics Dashboard** – View sales, revenue, and other metrics with interactive charts and graphs.
- **Settings & Configurations** – Set restaurant details, opening hours, payment options, etc.
- **Real-Time Notifications** – Receive instant alerts for new orders, status changes, and key events via WebSocket.

---

## 🛠️ Technologies Used

- **Frontend:** React.js, React Router  
- **Backend:** Node.js, Express.js, Socket.io  
- **Database:** MongoDB  
- **Authentication:** JSON Web Tokens (JWT)  
- **UI Frameworks:** Bootstrap, Material-UI  
- **Architecture:** RESTful API

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ezaanamin1/Resturant-Admin-Panel.git
```

### 2. Navigate to the Project Directory

```bash
cd Resturant-Admin-Panel
```

### 3. Install Dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Before running the project, set up the environment variables required by the backend.

### 📝 Steps:

1. Create a `.env` file in the root directory.
2. Use the following format:

```env
PORT=your_port_number
MONGO_URL=your_mongodb_connection_uri
SERECT=your_secret_key_for_encryption
TOKEN_KEY=your_token_key_for_jwt
```

> ✅ **Tip:** Use the `.env.example` file (if included) as a reference.  
> ⚠️ **Important:** Never commit your `.env` file to source control.

---

### 4. Start the Development Server

```bash
npm start
```

The server will start on `http://localhost:<PORT>`.

---

## 📖 API Documentation

For detailed API usage and endpoints, view the [API documentation on Postman](https://documenter.getpostman.com/view/18099618/2s9YJW5Rgs).

---

## 🤝 Contributions

Contributions are welcome! If you encounter issues or have ideas for improvement:

- Fork the repository
- Create a feature branch
- Submit a pull request  
Or simply open an [issue](https://github.com/ezaanamin1/Resturant-Admin-Panel/issues).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---



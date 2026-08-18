# 🍔 FoodieHub

> **Your favorite restaurants, delicious food, and a seamless ordering experience — all in one place.**

FoodieHub is a full-stack food ordering web application where users can explore restaurants, browse menus, add food items to their cart, place orders, and track their order status.

The project includes a responsive frontend built with **HTML, CSS, and JavaScript**, along with a backend powered by **Node.js, Express.js, and MongoDB** for user authentication and data management.

---

## ✨ Features

* 🍽️ Browse restaurants and food menus
* 🔐 User registration and login
* 🔑 JWT-based authentication
* 🔒 Secure password hashing using bcrypt
* 🛒 Add and remove items from the cart
* ➕ Update food item quantities
* 💰 Automatic cart total calculation
* 📦 Checkout functionality
* 🚚 Standard and express delivery options
* 📍 Delivery address support
* 💳 Multiple payment options
* 📱 Order tracking
* 🔄 Responsive user interface
* 💾 Cart and order data persistence using local storage

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Token (JWT)
* bcryptjs
* dotenv

---

## 📁 Project Structure

```text
FoodieHub/
│
├── FrontEnd/
│   ├── index.html
│   ├── restaurant.html
│   ├── cart.html
│   ├── checkout.html
│   ├── tracking.html
│   ├── login.html
│   ├── register.html
│   │
│   ├── css/
│   │   ├── style.css
│   │   ├── home.css
│   │   ├── restaurant.css
│   │   ├── cart.css
│   │   ├── checkout.css
│   │   ├── tracking.css
│   │   └── auth.css
│   │
│   └── js/
│       ├── app.js
│       ├── auth.js
│       ├── data.js
│       ├── home.js
│       ├── restaurant.js
│       ├── cart.js
│       ├── checkout.js
│       └── tracking.js
│
├── BackEnd/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── auth.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/FoodieHub.git
```

### 2. Navigate to the Project

```bash
cd FoodieHub
```

---

# ⚙️ Backend Setup

Navigate to the backend folder:

```bash
cd BackEnd
```

Install the required dependencies:

```bash
npm install
```

Create a `.env` file inside the `BackEnd` folder and add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

Start the backend server:

```bash
npm start
```

The backend server will run on:

```text
http://localhost:5000
```

You can verify that the API is running by opening the root endpoint.

---

# 💻 Frontend Setup

Navigate to the frontend folder:

```bash
cd FrontEnd
```

You can run the frontend using **Live Server** in VS Code.

Alternatively, open:

```text
index.html
```

in your browser.

---

## 🔐 Authentication

FoodieHub includes user authentication with:

* User Registration
* User Login
* Protected Routes
* JWT Token Generation
* Password Hashing with bcrypt

User information is stored securely in MongoDB.

---

## 🛒 Food Ordering Flow

The application follows this flow:

```text
Browse Restaurants
        ↓
Select Restaurant
        ↓
Browse Menu
        ↓
Add Items to Cart
        ↓
Review Cart
        ↓
Checkout
        ↓
Place Order
        ↓
Track Order
```

---

## 📦 API Endpoints

### Authentication

| Method | Endpoint                   | Description                |
| ------ | -------------------------- | -------------------------- |
| POST   | `/api/auth/register`       | Register a new user        |
| POST   | `/api/auth/login`          | Login user                 |
| GET    | `/api/auth/me`             | Get logged-in user details |
| PUT    | `/api/auth/updatedetails`  | Update user details        |
| PUT    | `/api/auth/updatepassword` | Update user password       |

---

## 🗄️ Database

The project uses **MongoDB** with **Mongoose** as the ODM.

The current user model includes:

* Name
* Email
* Password
* Phone Number
* Address
* Password Reset Token
* Password Reset Expiry
* Created At
* Updated At

---

## 📱 Main Pages

### 🏠 Home

Browse available restaurants and discover food options.

### 🍽️ Restaurant

View restaurant details and available menu items.

### 🛒 Cart

Add, remove, and update food items before checkout.

### 💳 Checkout

Select delivery and payment options and provide the delivery address.

### 🚚 Order Tracking

Track the progress of your order through different stages:

```text
✓ Order Confirmed
        ↓
👨‍🍳 Preparing
        ↓
🚚 Out for Delivery
        ↓
🎉 Delivered
```

### 🔐 Authentication

Users can create an account, log in, and manage their profile securely.

---

## 🔮 Future Improvements

* [ ] Online payment gateway integration
* [ ] Real-time order tracking
* [ ] Restaurant dashboard
* [ ] Admin panel
* [ ] Order history
* [ ] Food search and filtering
* [ ] Restaurant ratings and reviews
* [ ] Favorites and wishlist
* [ ] Email notifications
* [ ] Push notifications
* [ ] Cloud image storage
* [ ] Mobile application

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/YourFeature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add new feature"
```

5. Push to your branch.

```bash
git push origin feature/YourFeature
```

6. Create a Pull Request.

---

## 👨‍💻 Author

**Praveen Kumar**

---

## ⭐ Support

If you like this project, consider giving it a **star ⭐** on GitHub!

---

<div align="center">

### 🍔 Made with ❤️ for food lovers

**FoodieHub — Delicious food, delivered simply.**

</div>

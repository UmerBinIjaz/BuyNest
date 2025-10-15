# 🛍️ BuyNest — Full-Stack Multi-Vendor Marketplace

**Live Demo:** [https://buy-nest-yxiu.vercel.app/](https://buy-nest-yxiu.vercel.app/)

BuyNest is a **full-stack, production-ready multi-vendor marketplace** built using **Next.js 15**, **Prisma**, **Stripe**, **Inngest**, and **Clerk**.
It provides a complete eCommerce experience where sellers can create stores, manage products and orders, while buyers can shop, checkout, and track their purchases securely.

---

## 🚀 Features

### 🏪 Storefront

* Browse stores and products
* Add products to cart
* Checkout securely with **Stripe**
* Track order history

### 🧑‍💼 Seller Dashboard

* Create and manage your store
* Add, edit, and delete products
* Track sales and order analytics
* Toggle product stock availability

### 🧑‍💻 Admin Dashboard

* Approve and manage stores
* Create and manage discount coupons
* Monitor platform statistics

### 💡 Additional Highlights

* Authentication via **Clerk**
* Secure payments using **Stripe**
* Asynchronous workflows powered by **Inngest**
* Product ratings & reviews with moderation
* Background tasks for order notifications
* Fully responsive UI using **Tailwind CSS**
* Image optimization with **ImageKit**

---

## ⚙️ Tech Stack

| Category             | Technology                                        |
| -------------------- | ------------------------------------------------- |
| **Frontend**         | Next.js 15 (App Router), React, Tailwind CSS      |
| **Backend**          | Next.js API Routes, Prisma ORM                    |
| **Database**         | Neon (Serverless PostgreSQL)                      |
| **Authentication**   | Clerk                                             |
| **Payments**         | Stripe                                            |
| **Workflows**        | Inngest                                           |
| **Image Handling**   | ImageKit                                          |
| **State Management** | Redux Toolkit                                     |
| **Analytics**        | Recharts                                          |
| **Utilities**        | Axios, date-fns, react-hot-toast                  |
| **AI Integration**   | OpenAI (for store/product description assistance) |

---

## 🧩 Architecture Overview

```
📦 BuyNest
├── app/               # Page layouts for admin, store, and public views
├── components/        # Reusable UI components
├── features/          # Redux slices (cart, product, rating, address)
├── prisma/            # Schema, migrations, and database setup
├── configs/           # Third-party configurations (Stripe, Clerk, OpenAI, etc.)
├── lib/               # Helper utilities (prisma.js, store.js)
├── public/            # Static assets
└── api/               # Server logic organized by feature (store, orders, products)
```

---

## 🧠 Core Concepts

* **Role-Based Access Control (RBAC):**
  Admin, Seller, and Buyer routes are protected using Clerk authentication middleware.

* **Serverless Database with Prisma + Neon:**
  Optimized connections for smooth serverless operations.

* **Stripe Checkout Flow:**
  Handles secure payment processing and post-payment order management.

* **Background Workflows with Inngest:**
  Runs async tasks (like order notifications) outside the request path.

* **Clean State Management:**
  Uses Redux Toolkit feature slices for isolated, efficient state updates.

---

## 💻 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/UmerBinIjaz/BuyNest.git
cd BuyNest
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the project root and add your credentials:

```
NEXT_PUBLIC_CURRENCY_SYMBOL = '$'  //You can change it to Any Currency
ADMIN_EMAIL = your_admin_email  //Signup as a new account and write email of that account to make it as an admin
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publisher_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_neon_connection_string
DIRECT_URL=your_neon_connection_string
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_event_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_Key
OPENAI_API_KEY=your_openai_api_key
OPENAI_BASE_URL=your_openai_base_url
OPENAI_MODEL=your_openai_model

```

### 4️⃣ Generate Prisma Client

```bash
npx prisma generate
```

### 5️⃣ Run the Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌍 Deployment

BuyNest is fully **serverless-ready** and deployed on **Vercel**.
You can view the live demo here:
🔗 **[https://buy-nest-yxiu.vercel.app/](https://buy-nest-yxiu.vercel.app/)**

---

## 🧱 Challenges & Learnings

* Implementing **multi-role authentication** for sellers, buyers, and admins.
* Managing **serverless database connections** efficiently with Prisma & Neon.
* Handling **real-world payment flows** with Stripe webhooks.
* Coordinating **async operations** using Inngest for reliability.
* Building **modular architecture** for scalability and clean code separation.

---

## 🌟 What’s Next

* 💸 Multi-vendor payouts
* 📊 Enhanced analytics dashboards
* 📱 Mobile-optimized version

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome!
If you find any bugs or have ideas for improvement, feel free to:

* ⭐ Star the repo
* 🐛 Open an issue
* 🔧 Submit a pull request

---

## 📬 Contact

👨‍💻 **Developer:** Umer Bin Ijaz
📧 **Email:** [uk302269@gmail.com](mailto:uk302269@gmail.com)
🌍 **Location:** Islamabad, Pakistan
🔗 **GitHub:** [UmerBinIjaz](https://github.com/UmerBinIjaz)
🔗 **Live Demo:** [https://buy-nest-yxiu.vercel.app/](https://buy-nest-yxiu.vercel.app/)

---

### 🏁 Final Note

Building **BuyNest** was an amazing experience that brought together backend logic, UI design, and deployment challenges into a single project.
I hope it helps other developers exploring **Next.js**, **Prisma**, and **Stripe** integration in full-stack applications.

---

Would you like me to include **screenshots** or **GIF previews** sections in this README (e.g., "🖼️ Preview" with homepage, dashboard, checkout, etc.)?
It makes the repo look much more professional on GitHub.

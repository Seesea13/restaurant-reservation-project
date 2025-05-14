# 餐厅预订系统

这是一个基于移动和分布式系统开发理念的全栈项目，允许用户通过移动设备预订餐厅座位，并支持管理员进行餐厅和预订的管理。

## 后端 – Node.js 与 Express

后端是一个 RESTful API 服务，使用 Sequelize 管理数据库，采用 JWT 认证，支持角色权限管理（RBAC）。

### 技术栈

* Express.js – Web 框架
* MariaDB – 数据库
* Sequelize – ORM
* JWT – 用户认证
* bcryptjs – 密码加密
* dotenv – 环境配置
* Postman – API 测试

### 配置 baseURL（前后端通信）

* baseURL: `'http://你的本地IP地址:3000/'`

### 安装与运行

```bash
npm install
```

配置 `.env` 文件：

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=restaurant_reservation
JWT_SECRET=your_jwt_secret
```

运行服务器前确保有数据库：`restaurant_reservation`

启动服务器：

```bash
node server.js
```

### 项目结构

```
backend/
├── controllers/
├── routes/
├── middleware/
├── models/
├── config/
└── server.js
```

### API 示例

| 方法   | 路径                    | 功能        |
| ---- | --------------------- | --------- |
| POST | `/auth/register`      | 注册用户      |
| POST | `/auth/login`         | 登录        |
| GET  | `/restaurants`        | 获取餐厅列表    |
| POST | `/reservations`       | 提交预订      |
| GET  | `/admin/reservations` | 管理员查看所有预订 |

---

# Restaurant Reservation System

This is a full-stack project based on Mobile & Distributed Systems, allowing users to book restaurant tables via mobile devices and enabling administrators to manage reservations and restaurant data.

## Backend – Node.js with Express

The backend is a RESTful API service using Sequelize ORM and JWT for authentication, supporting RBAC (Role-Based Access Control).

### Tech Stack

* Express.js – Web framework
* MariaDB – Database
* Sequelize – ORM
* JWT – Authentication
* bcryptjs – Password hashing
* dotenv – Environment configuration
* Postman – API testing

### Configuring baseURL in Frontend

* baseURL: `'http://your local IP:3000/'`

### Setup & Run

```bash
npm install
```

Configure your `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=restaurant_reservation
JWT_SECRET=your_jwt_secret
```

Make sure there is a database named `restaurant_reservation` before running the server.

Start the server:

```bash
node server.js
```

### Project Structure

```
backend/
├── controllers/
├── routes/
├── middleware/
├── models/
├── config/
└── server.js
```

### Sample APIs

| Method | Path                  | Description                   |
| ------ | --------------------- | ----------------------------- |
| POST   | `/auth/register`      | Register new user             |
| POST   | `/auth/login`         | Login user & get JWT          |
| GET    | `/restaurants`        | Get list of restaurants       |
| POST   | `/reservations`       | Make a reservation (auth)     |
| GET    | `/admin/reservations` | View all reservations (admin) |

---

# Σύστημα Κρατήσεων Εστιατορίου

Πρόκειται για μια πλήρη εφαρμογή βασισμένη στα Mobile & Distributed Systems, επιτρέποντας στους χρήστες να κάνουν κρατήσεις και στους διαχειριστές να διαχειρίζονται τα δεδομένα.

## Backend – Node.js με Express

Το backend είναι RESTful API που χρησιμοποιεί Sequelize ORM και JWT για αυθεντικοποίηση με υποστήριξη RBAC.

### Τεχνολογίες

* Express.js – Πλαίσιο Web
* MariaDB – Βάση δεδομένων
* Sequelize – ORM
* JWT – Αυθεντικοποίηση
* bcryptjs – Κρυπτογράφηση κωδικών
* dotenv – Διαχείριση περιβάλλοντος
* Postman – Έλεγχος API

### Ρύθμιση του baseURL στο Frontend

* baseURL: `'http://η-τοπική-σας-IP:3000/'`

### Εγκατάσταση & Εκκίνηση

```bash
npm install
```

Ρυθμίστε τις μεταβλητές περιβάλλοντος στο `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=restaurant_reservation
JWT_SECRET=your_jwt_secret
```

Βεβαιωθείτε ότι υπάρχει μια βάση δεδομένων: `restaurant_reservation` πριν την εκκίνηση.

Εκκινήστε τον server:

```bash
node server.js
```

### Δομή Έργου

```
backend/
├── controllers/
├── routes/
├── middleware/
├── models/
├── config/
└── server.js
```

### Παραδείγματα API

| Μέθοδος | Διαδρομή              | Περιγραφή                        |
| ------- | --------------------- | -------------------------------- |
| POST    | `/auth/register`      | Εγγραφή νέου χρήστη              |
| POST    | `/auth/login`         | Σύνδεση χρήστη & λήψη JWT        |
| GET     | `/restaurants`        | Λίστα εστιατορίων                |
| POST    | `/reservations`       | Κάντε κράτηση (auth)             |
| GET     | `/admin/reservations` | Όλες οι κρατήσεις (διαχειριστής) |

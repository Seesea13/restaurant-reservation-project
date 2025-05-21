## 📺 Βίντεο Παρουσίασης | Project Demo Video | 项目演示视频

[▶️ Δείτε την παρουσίαση | Watch the demo | 点击观看演示](https://youtu.be/Qy93bL6iH4c)

![Demo Preview](https://img.youtube.com/vi/Qy93bL6iH4c/hqdefault.jpg)





**Επιλέξτε γλώσσα | Choose your language | 选择你的语言**

- 🇬🇷 [Ελληνικά](#σύστημα-κρατήσεων-εστιατορίου)
- 🇨🇳 [中文](#餐厅预订系统)
- 🇺🇸 [English](#restaurant-reservation-system)

---

# Σύστημα Κρατήσεων Εστιατορίου

## 🧾 Λειτουργίες Χρήστη

### Πρόσβαση Λογαριασμού

Οι χρήστες μπορούν να δημιουργήσουν νέο λογαριασμό με email και κωδικό ή να συνδεθούν σε υπάρχοντα. Όλοι οι νέοι λογαριασμοί είναι απλοί χρήστες από προεπιλογή.

### Περιήγηση Εστιατορίων

- Προβολή λίστας διαθέσιμων εστιατορίων
- Κάθε εστιατόριο περιλαμβάνει όνομα, διεύθυνση, περιγραφή και μέση τιμή ανά άτομο
- Υποστηρίζεται φίλτρο εύρους τιμής (ελάχιστη – μέγιστη)

### Διαχείριση Κρατήσεων

- Δημιουργία νέας κράτησης επιλέγοντας εστιατόριο, ημερομηνία, ώρα και αριθμό ατόμων
- Οι κρατήσεις συνδέονται με τον συνδεδεμένο χρήστη
- Δυνατότητα επεξεργασίας υπάρχουσας κράτησης
- Δυνατότητα διαγραφής κράτησης (ακύρωση)

### Ρυθμίσεις Λογαριασμού

- Αλλαγή κωδικού πρόσβασης
- Ασφαλής αποσύνδεση και εκκαθάριση στοιχείων σύνδεσης

## 🛠️ Λειτουργίες Διαχειριστή

### Σύνδεση

Οι διαχειριστές συνδέονται με ειδικά διαπιστευτήρια.  
Όλοι οι χρήστες είναι απλοί χρήστες από προεπιλογή.  
Τα δικαιώματα διαχειριστή αποδίδονται μόνο μέσω του διακομιστή τροποποιώντας το πεδίο `role` στη βάση δεδομένων.

### Διαχείριση Εστιατορίων

- Προσθήκη νέου εστιατορίου με όνομα, τοποθεσία, περιγραφή και μέση τιμή ανά άτομο
- Επεξεργασία στοιχείων υπάρχοντος εστιατορίου
- Διαγραφή εστιατορίων που δεν λειτουργούν πλέον


---

## Backend – Node.js με Express

Πρόκειται για μια πλήρη εφαρμογή βασισμένη στα Mobile & Distributed Systems, επιτρέποντας στους χρήστες να κάνουν κρατήσεις και στους διαχειριστές να διαχειρίζονται τα δεδομένα.
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

---

# 餐厅预订系统
## 🧾 用户功能介绍

### 账户管理

用户可通过邮箱和密码注册新账户或登录已有账户。系统默认将所有新注册用户设为普通用户。

### 餐厅浏览

- 浏览所有可预约餐厅的信息
- 每家餐厅包括名称、地址、描述、人均消费价格
- 支持按照人均消费价格进行筛选（可输入最低与最高值）

### 预约管理

- 用户可选择餐厅并填写预约日期、时间和人数进行预约
- 所有预约记录与当前登录用户绑定
- 支持编辑已提交的预约（修改日期、时间或人数）
- 支持删除预约（取消）

### 账户设置

- 用户可修改密码
- 可安全退出登录，清除会话与身份信息

## 🛠️ 管理员功能

### 登录

管理员使用专属账号登录系统。  
所有用户默认是普通用户。  
管理员权限只能通过服务器手动修改数据库中的 `role` 字段赋予。

### 餐厅管理

- 添加新餐厅（填写名称、地址、描述和人均消费）
- 编辑现有餐厅信息
- 删除不再营业的餐厅


---

## 后端 – Node.js 与 Express

这是一个基于移动和分布式系统开发理念的全栈项目，允许用户通过移动设备预订餐厅座位，并支持管理员进行餐厅和预订的管理。
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
## 🧾 User Features

### Account Access

Users can register a new account using their email and password, or log in to an existing account. All new accounts are regular users by default.

### Restaurant Browsing

- View a list of all available restaurants
- Each restaurant displays name, address, description, and average price per person
- Supports filtering restaurants by price range (minimum and maximum values)

### Reservation Management

- Users can create a new reservation by selecting a restaurant, date, time, and number of guests
- All reservations are linked to the currently logged-in user
- Existing reservations can be edited (e.g., change date or guest count)
- Reservations can also be deleted (cancelled) at any time

### Account Settings

- Users can change their account password from the settings menu
- Supports secure logout, clearing session and user role

## 🛠️ Administrator Features

### Login

Admins log in using dedicated credentials.  
All users are regular users by default.  
Admin privileges must be manually assigned on the server by updating the `role` field in the database.

### Restaurant Management

- Add new restaurants by providing name, location, description, and average price per person
- Edit existing restaurant information
- Delete restaurants that are no longer in service


---

## Backend – Node.js with Express

This is a full-stack project based on Mobile & Distributed Systems, allowing users to book restaurant tables via mobile devices and enabling administrators to manage reservations and restaurant data.
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


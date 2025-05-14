
#  Restaurant Reservation System | Σύστημα Κρατήσεων Εστιατορίου

这是一个基于 Mobile & Distributed Systems 理念开发的全栈项目，允许用户通过移动设备预订餐厅座位，并支持管理员进行餐厅和预订的管理。  
> This is a full-stack project based on Mobile & Distributed Systems, allowing users to book restaurant tables via mobile devices and enabling administrators to manage reservations and restaurant data.  
> Πρόκειται για μια πλήρη εφαρμογή βασισμένη στα Mobile & Distributed Systems, επιτρέποντας στους χρήστες να κάνουν κρατήσεις και στους διαχειριστές να διαχειρίζονται τα δεδομένα.

项目包含 React Native 前端 与 Node.js/Express 后端，使用 MariaDB 数据库和 JWT 认证。  
> The project includes a React Native frontend and Node.js/Express backend, using MariaDB and JWT for authentication.  
> Το έργο περιλαμβάνει frontend σε React Native και backend με Node.js/Express, με MariaDB και JWT για αυθεντικοποίηση.

---

##  Backend – Node.js with Express | Πίσω μέρος

后端是一个 RESTful API 服务，使用 Sequelize 管理数据库，采用 JWT 认证，支持角色权限管理（RBAC）。  
> Backend is a RESTful API service using Sequelize ORM and JWT for authentication, supporting RBAC (Role-Based Access Control).  
> Το backend είναι RESTful API που χρησιμοποιεί Sequelize ORM και JWT για αυθεντικοποίηση με υποστήριξη RBAC.

### 技术栈 | Tech Stack | Τεχνολογίες

- Express.js – Web 框架 | Web framework | Πλαίσιο Web
- MariaDB – 数据库 | Database | Βάση δεδομένων
- Sequelize – ORM | ORM | ORM
- JWT – 用户认证 | Authentication | Αυθεντικοποίηση
- bcryptjs – 密码加密 | Password hashing | Κρυπτογράφηση κωδικών
- dotenv – 环境配置 | Env config | Διαχείριση περιβάλλοντος
- Postman – API 测试 | API testing | Έλεγχος API

### 注意：配置 baseURL（前后端通信）
 - baseURL: 'http://你的本地IP地址:3000/', //
### Attention: Configuring baseURL in Frontend
 -baseURL: 'http://your local IP:3000/', //
### Προσοχή: Ρύθμιση του baseURL στο Frontend
 -baseURL: 'http://η-τοπική-σας-IP地址:3000/', //


### 安装与运行 | Setup & Run | Εγκατάσταση & Εκκίνηση

```bash
npm install
```

配置 `.env` 文件:  
> Configure your environment variables  
> Ρυθμίστε τις μεταβλητές περιβάλλοντος:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=restaurant_reservation
JWT_SECRET=your_jwt_secret
```
### 运行服务器前要确保有数据库:restaurant_reservation
>Before running the server, make sure there is a database:restaurant_reservation
>Πριν εκτελέσετε τον διακομιστή, βεβαιωθείτε ότι υπάρχει μια βάση δεδομένων:restaurant_reservation


运行服务器：  
> Start the server  
> Εκκινήστε τον server:

```bash
node server.js
```

### 项目结构 | Project Structure | Δομή Έργου

```
backend/
├── controllers/
├── routes/
├── middleware/
├── models/
├── config/
└── server.js
```

### API 示例 | Sample APIs | Παραδείγματα API

| 方法/method/μέθοδος | 路径/path | 功能 | Description | Περιγραφή |
|------|------|------|-------------|-----------|
| POST | `/auth/register` | 注册用户 | Register new user | Εγγραφή |
| POST | `/auth/login` | 登录 | Login user & get JWT | Σύνδεση |
| GET | `/restaurants` | 获取餐厅列表 | Get list of restaurants | Λίστα εστιατορίων |
| POST | `/reservations` | 提交预订 | Make a reservation (auth) | Κάντε κράτηση |
| GET | `/admin/reservations` | 管理员查看所有预订 | View all reservations (admin) | Όλες οι κρατήσεις |

---

##  Frontend – React Native App | Εφαρμογή Κινητού

前端是一个跨平台移动应用，提供注册、登录、查看餐厅、筛选、创建预订、管理等功能。  
> The frontend is a cross-platform app with registration, login, browsing, filtering, and management features.  
> Η frontend εφαρμογή παρέχει λειτουργίες όπως εγγραφή, σύνδεση, προβολή και διαχείριση κρατήσεων.

### 技术栈 | Tech Stack | Τεχνολογίες

- React Native + Expo
- Axios – 网络请求 | HTTP requests | Αιτήματα HTTP
- AsyncStorage – 本地存储 JWT | Local JWT storage | Τοπική αποθήκευση JWT
- React Navigation – 页面导航 | Navigation | Πλοήγηση
- Vector Icons – 图标支持 | Icons | Εικονίδια
- DateTimePicker – 日期/时间选择器 | Date/time selector | Επιλογή ημερομηνίας/ώρας

### 页面结构 | Screens | Οθόνες

| 页面/Screens/Οθόνες | 功能 | Description | Περιγραφή |
|------|------|-------------|-----------|
| LoginScreen | 登录 | User login | Σύνδεση |
| RegisterScreen | 注册 | User registration | Εγγραφή |
| RestaurantListScreen | 餐厅列表 + 筛选 | View & filter restaurants | Λίστα εστιατορίων |
| CreateReservationScreen | 创建预订 | Create a new reservation | Δημιουργία κράτησης |
| MyReservationsScreen | 我的预订 | View my reservations | Οι κρατήσεις μου |
| AdminReservationsScreen | 管理所有预订 | Admin reservation management | Διαχείριση κρατήσεων |
| CreateRestaurantScreen | 添加餐厅 | Admin adds restaurant | Προσθήκη εστιατορίου |
| EditRestaurantScreen | 编辑餐厅 | Edit restaurant info | Επεξεργασία εστιατορίου |
| SettingsScreen | 密码更改 / 退出 | Password change / Logout | Αλλαγή κωδικού / Έξοδος |

---

##  功能亮点 | Features | Δυνατότητες

-  JWT 自动注入请求头 | Auto-inject JWT in requests | Αυτόματη εισαγωγή JWT
-  基于角色的页面跳转 | Role-based navigation | Πλοήγηση βάσει ρόλου
-  餐厅筛选器（按价格）| Restaurant filter (price) | Φίλτρα ανά τιμή
-  移动端美观界面 | Mobile-friendly UI | Φιλικό UI για κινητά

---



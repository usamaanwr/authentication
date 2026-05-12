# 🛠️ Backend (Server) Engineering Architecture

This workspace (`server/`) serves as the core RESTful API service for the application. It is engineered using Node.js and Express, following a secure MVC (Model-View-Controller) design pattern, and connects to MongoDB using Mongoose ODM.

---

## 📦 Dependencies & Technical Purpose

* **`express` (^5.2.1)**: The foundational HTTP routing framework used to create robust endpoint routes and listen to frontend client requests.
* **`mongoose` (^9.5.0)**: Object Data Modeling (ODM) library for MongoDB. It enforces strict validation schemas and structures data records into organized collections.
* **`joi` (^18.1.2)**: A powerful data validation middleware. It acts as a gatekeeper to intercept and validate incoming request payloads (like body parameters) before they hit the controller logic.
* **`bcryptjs` (^3.0.3)**: A secure password-hashing function. It automatically salts and hashes plain-text user passwords before saving them, rendering them unreadable to database intruders.
* **`cors` (^2.8.6)**: Cross-Origin Resource Sharing middleware used to grant explicit security clearances, allowing the React frontend (`localhost:5173`) to exchange data with this server.
* **`cookie-parser` (^1.4.7)**: Decodes incoming HTTP request cookie headers, allowing the server to safely read tokens stored inside client cookies.
* **`multer` (^2.1.1)**: A multipart/form-data handling library that intercepts binary file uploads (like user avatar pictures) and holds them temporarily in server memory buffers.
* **`streamifier` (^0.1.1)**: Converts raw image buffers held by Multer into readable stream channels so they can be securely piped over the network.
* **`cloudinary` (^2.9.0)**: A cloud-based media storage service. It catches data streams from streamifier, stores the images permanently on its CDN network, and passes a fast URL back to the server to be mapped to the user document.
* **`dotenv` (^17.4.2)**: Injects system environment configurations (Database URIs, API tokens, cryptographic secrets) safely into the application runtime.
* **`nodemon` (^3.1.14)**: A development utility that monitors the codebase and automatically reboots the server application instantly upon any file updates.
* **`prettier` (^3.8.3)**: Enforces clean, production-ready code formatting and uniform indentation across all server script sheets.

---

## 🔑 Token Architecture: Why JWT & httpOnly Cookies?

To achieve bank-grade session security and eliminate risks like **XSS (Cross-Site Scripting)** data mining, this server completely skips vulnerable localStorage approaches and relies on a cryptographically signed **Dual-Token System**:

1. **Access Token**: A short-lived, highly volatile session token signed using `jsonwebtoken`. It carries user identification signatures used to grant instant pre-authorization to protected controller paths.
2. **Refresh Token**: A long-lived, secure token stored in the database. Its sole purpose is to act as a security validator to issue brand-new Access Tokens once they expire, keeping the user logged in seamlessly.
3. **httpOnly Implementation**: Both tokens are dispatched from the server packaged securely inside browser cookies flagged with `httpOnly: true` and `secure: true`. This hides the tokens completely from client-side JavaScript execution scripts, ensuring malicious browser extensions cannot access or steal user sessions.

---

## 🚀 Public REST API Endpoints Reference

### 1. Account Setup
* **Route**: `POST /api/v1/user/register`
* **Authorization Required**: ❌ No
* **Mechanics**: Runs raw request entries through Joi schema validations. If valid, it hashes the password text via bcrypt, routes the binary avatar file through the Multer-Cloudinary pipeline, and registers a fresh user document inside MongoDB.

### 2. User Authentication
* **Route**: `POST /api/v1/user/login`
* **Authorization Required**: ❌ No
* **Mechanics**: Verifies user records, compares plain-text inputs with saved database hashes via bcrypt, signs a fresh pair of Access and Refresh tokens, and injects them directly into the browser's secure `httpOnly` cookie containers.

### 3. Token Rotation (Silent Persist)
* **Route**: `POST /api/v1/user/refresh-token`
* **Authorization Required**: ❌ No
* **Mechanics**: Intercepts silent token rotation signals sent by the client. It decodes the browser's long-lived Refresh cookie, cross-checks it, and hooks up a brand-new short-lived Access Token cookie without forcing the user to re-type credentials.

### 4. Session Validation
* **Route**: `GET /api/v1/user/current-user`
* **Authorization Required**: 🔑 Yes (Auth Middleware)
* **Mechanics**: Monitored by custom security middleware layers. It strips down incoming cookies via cookie-parser, checks the signature using `jwt.verify()`, and outputs the live profile metadata context back to the frontend application.

### 5. Session Termination
* **Route**: `POST /api/v1/user/logout`
* **Authorization Required**: 🔑 Yes
* **Mechanics**: Commands the incoming browser client to clear out all active authentication cookie variables and forces immediate expiration parameters on system session tokens.

---

# 💻 Frontend (Client) Engineering Architecture

This workspace (`client/`) contains the complete User Interface and client-side application logic. It is engineered using **React** powered by **Vite** for ultra-fast compilation and optimal rendering workflows. The visual layout is crafted using **Tailwind CSS** alongside semantic UI components from **daisyUI**.

---

## 📁 Modular Folder Structure

The frontend code follows a highly scalable, decoupled directory design to isolate corporate logic from visual component renderers:

* **`src/api/axiosInstance.js`**: Centralized HTTP client setup using Axios. It injects global base URLs and is explicitly pre-configured with `withCredentials: true` to handle automatic, secure transmission of `httpOnly` authentication cookies during server cycles.
* **`src/components/`**: 
    * `Navbar.jsx`: The universal global navigation structure layout managing dynamic button visibility based on the user's active session state.
    * `ProtectedRoute.jsx`: A strict client route guard that shields private panels (like the Dashboard) from unauthorized guest users, automatically bouncing anonymous traffic back to the login page.
* **`src/context/AuthContext.jsx`**: The core brain of client session tracking. It wraps the DOM tree inside an authentication provider, triggering automatic backend pings to verify cookies and hydrate the state instantly upon page hard-refreshes.
* **`src/pages/`**:
    * `Register.jsx`: Multi-part profile deployment screen handling text values and binary media streaming (user avatars) smoothly via reactive states.
    * `Login.jsx`: Secure access gateway utilizing manual UX state components to provide structural features like password visibility toggles.
    * `Dashboard.jsx`: A protected space only visible to authorized members once token validations pass.
* **`src/validations/`**:
    * `registerSchema.js`: Strict structural rule guidelines written via **Yup** to parse registration syntax limits (email constraints, required properties) before dispatching requests.
    * `loginSchema.js`: Form submission blueprint mapping input constraints tailored for login forms.

---

## 🛠️ Advanced Functional Mechanics

### 1. Unified Form Validation via Yup
Instead of utilizing messy, inline conditional statements inside components, all input tracking routes fields directly into standalone **Yup Schemas**. The schemas test matching field specifications (such as formatting regular expressions for emails and explicit boundaries for passwords) prior to triggering Axios. If specifications fail, form cycles break immediately, preventing redundant and expensive network hits to the production API.

### 2. State-of-the-Art Error Interception
The application features structural try-catch flows wrapped around API dispatches. In the event of backend validation issues or database collisions (e.g., an email already taken or an incorrect password), the frontend intercepts the explicit backend payload (`err.response.data.message`). Instead of crashing or showing generic errors, it neatly isolates the server exception text and maps it onto corresponding input placeholders dynamically.

### 3. Interactive UX Visibility Controls
To maintain standard application benchmarks, password inputs utilize secure visibility states. By binding toggles (Eye Icon buttons) explicitly marked as `type="button"`, users can swap input render settings between `password` and `text` layouts instantly, optimizing user data inputs without throwing or resetting Yup schema tracking states.

---

## ⚙️ Local Development Environment Setup

Navigate into the server folder directory workspace and run package installations:
```bash
cd server
npm install

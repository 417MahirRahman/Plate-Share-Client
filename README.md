# Plate Share & Request App

A full-stack web application for managing food donations and requests. Donors can list available food, and recipients can request food. Donors can accept or reject requests and track status.

**Live Site:** [https://plate-share-777.netlify.app/](https://yourapp.netlify.app)

---

## Features
- User authentication (Login/Register)
- Add, view, and request food
- Donors can accept or reject requests
- Real-time status updates
- Error handling for invalid URLs

---

## Tech Stack
- **Frontend:** React, React Router, React Hook Form, React Toastify, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** Firebase (Google & Email/Password)

---

## Project Structure
```bash
client/
├── src/
│   ├── pages/          # Home, FoodDetails, AddFood, MyFoods, etc.
│   ├── components/     # Navbar, Footer
│   ├── Provider/       # AuthProvider & PrivateRoute
│   └── utilities/      # Loader, Dropdown, Validity
server/
├── index.js            # Express server
```

---

## Clone the repository:
```bash
git clone https://github.com/417MahirRahman/Plate-Share-Client.git

```
---

## Install dependencies and start the development server:
```bash
npm install
npm run dev




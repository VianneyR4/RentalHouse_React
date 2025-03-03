
# Property Management System

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Overview
This project is a Property Management System built using React and TypeScript. It allows users to manage properties, including adding, editing, and deleting properties, as well as managing bookings.

## Features
- User authentication and session management.
- Property management functionalities:
  - Add new properties.
  - Edit existing properties.
  - Delete properties.
  - View a list of properties.
- Booking management functionalities:
  - View bookings associated with the user.
  - Confirm or cancel bookings.

## Technologies Used
- **Frontend**: React, TypeScript, Axios, React Router
- **Backend**: Node.js, Express (assumed based on API endpoints)
- **Database**: (Specify your database here, e.g., PostgreSQL, MongoDB)

## Project Structure
- **`App.tsx`**: The main entry point of the application.
- **`pages/`**: Contains all the page components for the application.
  - `Home.tsx`: The home page of the application.
  - `Properties.tsx`: Displays a list of properties.
  - `PropertyDetails.tsx`: Shows detailed information about a specific property.
  - `PropertyManagement.tsx`: Allows users to manage properties (e.g., add, edit, delete).
- **`components/`**: Contains reusable components used across the application.
  - `layout/`: Includes layout-related components like the `Navbar`.
- **`assets/`**: Stores static assets such as images and styles.
- **`types/`**: Contains TypeScript type definitions for the project.

---


## Getting Started
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

## API Endpoints
- **Authentication**:
  - `GET /auth/login/success`: Check user login status.

- **Properties**:
  - `GET /api/v1/properties/all/`: Fetch all properties.
  - `POST /api/v1/property/create/`: Create a new property.
  - `PUT /api/v1/property/update/:propertyId`: Update an existing property.
  - `DELETE /api/v1/property/delete/:propertyId`: Delete a property.

- **Bookings**:
  - `GET /api/v1/booking/mine/`: Fetch bookings for the logged-in user.
  - `PUT /api/v1/booking/confirm/:bookingId`: Confirm a booking.
  - `PUT /api/v1/booking/cancel/:bookingId`: Cancel a booking.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.




## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

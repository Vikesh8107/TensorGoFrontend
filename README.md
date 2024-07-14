# TensorGo Frontend

This is the frontend for the TensorGo application. It is built using React, Vite, and TypeScript. The project includes a beautiful and responsive UI, API interactions, and various modern web development practices.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [Available Scripts](#available-scripts)
7. [Development](#development)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (version 6.x or higher)
- [Vite](https://vitejs.dev/) (installed globally for ease of use)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Vikesh8107/TensorGoFrontend.git
    cd TensorGoFrontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Configuration

1. **Environment Variables**: Create a `.env` file in the root of the project and add any necessary environment variables:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

2. **Update Configuration Files**: Ensure any configuration files (like `vite.config.ts`) are set up correctly for your environment.

## Running the Application

To start the application in development mode, run:
```bash
npm run dev
```

The application will start on the port specified in the Vite configuration (default is 3000). You can access it at `http://localhost:3000`.

## Project Structure

```
tensorgo-frontend/
├── node_modules/                   # Node.js modules
├── public/                         # Public assets
│   ├── favicon.ico
│   └── index.html
├── assets/                         # Static assets
│   └── auth/google-signin/
├── components/                     # Reusable components
│   ├── InvoiceList.tsx
│   ├── Login.tsx
│   └── Navbar.tsx
├── firebase/                       # Firebase related files
│   └── connection.js
├── pages/                          # Page components
│   ├── Dashboard.tsx
│   └── Home.tsx
├── services/                       # API service functions
├── styles/                         # Global and component-specific styles
│   ├── App.css
│   └── index.css
├── src/                            # Source files
│   ├── App.tsx
│   ├── firebaseConfig.ts
│   ├── main.tsx
│   ├── privateRoute.tsx
│   └── vite-env.d.ts
├── .eslintrc.cjs                   # ESLint configuration
├── .gitignore                      # Git ignore file
├── index.html                      # Main HTML file
├── package-lock.json               # NPM lock file
├── package.json                    # NPM package file
├── README.md                       # Project documentation
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.app.json               # TypeScript application configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.node.json              # TypeScript Node configuration
└── vite.config.ts                  # Vite configuration
```

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run serve`: Serves the production build locally.
- `npm run lint`: Runs the linter for code quality checks.
- `npm run format`: Formats the code using Prettier.

## Development

For development, Vite provides a fast and modern development server with HMR (Hot Module Replacement). To start the development server, run:
```bash
npm run dev
```

You can then access the application at `http://localhost:5173`.

## Deployment

### Building for Production

To create a production build, run:
```bash
npm run build
```

The build output will be in the `dist` directory. You can then serve this directory using any static site hosting service.

### Deploying to Vercel

1. Install the Vercel CLI:
    ```bash
    npm install -g vercel
    ```

2. Deploy the project:
    ```bash
    vercel
    ```

Follow the prompts to configure your project for deployment.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

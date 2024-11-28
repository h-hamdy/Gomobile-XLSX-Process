<div style="text-align: center;">
<img src="./frontend/src/assets/logo.png" alt="Project Screenshot" title="Project UI Screenshot" width="600">
</div>


# File Upload and Display Project

This project is a web-based tool that allows users to upload Excel files, process the data, and dynamically display the information in a tabular format. It provides a streamlined interface for parsing and rendering data, using modern frontend and backend technologies to ensure a robust and responsive application.

## Features

- **File Upload**: Supports Excel file uploads using the `xlsx` library.
- **Data Processing**: Extracts and processes specific rows and columns from the uploaded files.
- **Dynamic Table Rendering**: Automatically renders data in a responsive table with customizable headers and rows.
- **File History**: A dedicated feature to store the history of files that have been processed.
- **State Management**: Efficiently manages state using `useContext` to share data across components.
- **Backend API**: Built with NestJS for handling server-side operations and data persistence.
- **SQL Database**: Stores and retrieves processed data using a structured SQL database.

---

## Tech Stack

### Frontend
- **React with TypeScript**: Ensures type safety and scalability for building dynamic UI components.
- **TailwindCSS**: Provides utility-first styling for rapid and responsive design.
- **Chakra UI**: Supplies pre-designed, accessible components for UI consistency.
- **useContext API**: Manages global state across the application without external libraries.

### Backend
- **NestJS**: Framework for creating scalable, maintainable server-side logic.
- **SQL Database**: Stores processed Excel data for persistence and retrieval.

---


# Project Structure

## Frontend
The frontend structure is organized as follows:
- **`components/`**: Contains reusable React components used throughout the application.
- **`contexts/`**: Manages global state using React's `useContext` hook.
- **`App.tsx`**: The main entry point of the React application.

---

## Backend
The backend structure is organized as follows:
- **`controllers/`**: Contains the API endpoints and request handling logic.
- **`services/`**: Implements business logic and database interaction.
- **`entities/`**: Defines database models for interacting with the SQL database.
- **`main.ts`**: The entry point that bootstraps the backend application.
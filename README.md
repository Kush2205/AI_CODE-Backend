# AI Code Assistant Backend

A backend for a AI Coding agent

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Express.js server with JSON API
- Google Gemini AI integration for chat-based assistance
- Maintains conversation history and enforces structured JSON responses
- Parses AI responses and executes Linux commands for `linux` step
- Simple React components (`TodoForm`, `TodoItem`, `TodoList`) for potential front-end usage

## Prerequisites
- Node.js v16 or later
- npm or yarn
- Google Cloud API key with access to Gemini AI

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd AI_CODE-Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Build the TypeScript code (if needed):
   ```bash
   npm run build
   ```

## Environment Variables
Create a `.env` file in the project root with the following variables:

```env
PORT=3000                        # Server port (default: 8080)
GEMINI_API_KEY=<your-api-key>     # Google Gemini AI API key
SYSTEM_PROMPT="Your system prompt text"  # AI system instruction schema
```

> **Note:** Do not commit your `.env` file or sensitive keys. It is included in `.gitignore`.

## Usage
Start the server in development mode:
```bash
npm run dev
# or
node dist/index.js
```
The server will listen on the port specified in your `.env` (default `3000` or `8080`).

## API Endpoints

### POST /generate
Send a user message to the AI assistant.

- **URL:** `/generate`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  { "message": "Hello, AI assistant!" }
  ```
- **Response:**
  - Streams AI chat interactions internally,
  - Logs AI responses and executes Linux commands when `step` is `linux`.  

## Project Structure
```
AI_CODE-Backend/
├── dist/                      # Compiled JavaScript output
├── src/                       # React component examples
│   └── components/
│       ├── TodoForm.jsx
│       ├── TodoItem.jsx
│       └── TodoList.jsx
├── types/                     # TypeScript type definitions
│   ├── index.ts
│   └── types.ts
├── index.ts                   # Express server entry point
├── package.json               # Project metadata & scripts
├── tsconfig.json              # TypeScript configuration
├── .env                       # Environment variables (ignored)
└── README.md                  # Project documentation
```

## Contributing
Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

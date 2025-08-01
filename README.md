# QuranTracker

## Project Overview
QuranTracker is a full stack application for tracking Quran reading progress. The project is split into separate parts for the user interface and server, with Quran text stored in a Git submodule.

### Directory Structure
- `client/` – React-based frontend.
- `server/` – Express server and API.
- `Quran/` – Git submodule containing Quran text. Run `git submodule update --init --recursive` after cloning.

## Prerequisites
- Node.js 18+
- npm
- PostgreSQL database
- Git (for cloning and submodule support)

## Installation
1. Clone this repository.
2. Initialize the Quran submodule:
   ```bash
   git submodule update --init --recursive
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup
Create a `.env` file in the project root and define required variables:
```
DATABASE_URL=<PostgreSQL connection string>
SESSION_SECRET=<random session secret>
```

## Build and Run
- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Production**: `npm start`

## Contribution Guidelines
1. Fork the repository and create your feature branch.
2. Make changes and include appropriate tests.
3. Run `npm test` and ensure all checks pass.
4. Submit a pull request with a clear description of your changes.

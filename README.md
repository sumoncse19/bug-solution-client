# AI-Enhanced Feedback System (Frontend)

A modern feedback system powered by AI that helps users get instant solutions for their bug reports and allows them to submit various types of feedback.

## Features

- 🤖 AI-powered bug solution generator
- 📸 Image upload support for bug reports
- 💡 Multiple feedback types (Bug/Idea/Other)
- 📱 Responsive design
- ⚡ Real-time AI responses
- 📋 Feedback history view
- 📄 Pagination for feedback lists

## Live Preview and GitHub URL

[Live Preview Frontend](https://bug-solution.vercel.app/)
[Live Preview Backend](https://bug-solution.onrender.com/)
[GitHub Repository Frontend](https://github.com/sumoncse19/bug-solution-client)
[GitHub Repository Backend](https://github.com/sumoncse19/bug-solution-with-ai)

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Language:** TypeScript
- **Icons:** react-icons
- **Image Handling:** Next.js Image Optimization
- **Husky:** Git hooks automation for code quality checks
- **Commitizen:** CLI tool for creating standardized commit messages

## Prerequisites

Before you begin, ensure you have installed:

- Node.js 18+
- npm/yarn/pnpm

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/sumoncse19/bug-solution-client.git
cd bug-solution-client
```

2. Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

3. Create a .env.local file in the root directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
# or
pnpm dev
```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:300)

6. You can now interact with the application.

## Project Structure
```bash
bug-solution-client/
├── src/
│ ├── app/
│ │ └── [locale]/
│ │ └── (unauth)/
│ │ └── page.tsx
│ ├── components/
│ │ ├── ui/
│ │ └── Feedback/
│ └── lib/
├── public/
└── config/
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Environment Variables

|       Variable        |   Description   | Required |         Default         |
| --------------------- | --------------- | -------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL |   Yes    | `http://localhost:5000` |

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

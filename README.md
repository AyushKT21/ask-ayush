# Ayush AI

An **AI-first portfolio** where conversation is the main interface—not a traditional static site with a chatbot bolted on. Visitors ask questions in natural language; Ayush AI answers with streaming replies and updates a live **context panel** with the right portfolio slice (about, projects, skills, experience, resume, contact).

Built as a showcase of modern React, Next.js App Router, and the Vercel AI SDK with optional OpenAI tool calling.

## Highlights

- **Conversational UX** — Hero landing with suggestion chips; chat mode after the first message; no pre-filled right panel until the user engages.
- **Structured AI responses** — NDJSON streaming (`message` + `context`) from `POST /api/chat`; portfolio data stays in `src/constants/portfolio.ts`.
- **Tool calling (OpenAI)** — Model can call portfolio tools and `setContextPanel` to sync the UI panel with the answer.
- **Dev fallback** — Without `OPENAI_API_KEY`, a local mock routes intents and streams template answers (dev-only).
- **Recent chats** — Sessions in `localStorage` with persisted panel context, delete with confirmation.
- **Responsive layout** — Collapsible sidebar on mobile, context panel below chat on small screens.
- **Theming** — Light/dark via `next-themes`; glass panels and premium hero polish.

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, CSS variables design system |
| AI | Vercel AI SDK (`ai`, `@ai-sdk/openai`), Zod, streaming NDJSON |
| UI | Lucide, `react-icons`, `react-markdown`, CVA |

## Getting started

### Prerequisites

- Node.js 20+
- npm (or pnpm/yarn)

### Install and run

```bash
git clone <your-repo-url>
cd ask-ai
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### OpenAI (optional but recommended)

Create `.env.local`:

```env
OPENAI_API_KEY=sk-...
```

Restart the dev server after changing env vars. Without a key, the app uses the local mock responder.

Check mode: `GET /api/chat/status` → `source: "openai" | "mock"`.

## Project structure (overview)

```
src/
  app/              # Pages and API routes (`/api/chat`, `/api/chat/status`)
  components/       # Chat, context panels, layout, portfolio UI
  constants/        # Portfolio source of truth + tech icons
  lib/chat/         # Streaming, tools, mock, recent chats, intent inference
  services/chat/    # Client stream helper
  types/            # Chat and context types
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |

## Deploy

Deploy on [Vercel](https://vercel.com) (or any Node host). Set `OPENAI_API_KEY` in the project environment variables.

## Customization

- Edit portfolio content in `src/constants/portfolio.ts`.
- Adjust system prompt and tools in `src/lib/chat/`.
- Replace placeholder links, resume URL, and project thumbnails with your assets.

## Author

Ayush — AI-first portfolio experiment. Replace this section with your links (GitHub, LinkedIn, site).

## License

MIT (or your choice—update this line if you use another license).

# Client application

This Next.js App Router application is the starting point for the Innogram user interface. It currently renders a placeholder home page. Authentication, profiles, posts, and chat will be added in later feature PRs.

From the repository root, run `npm ci` and then `npm run dev --workspace client_app`. Open `http://localhost:3000`.

Check the client with `npm run lint --workspace client_app`, `npm run typecheck --workspace client_app`, and `npm run build --workspace client_app`. Run the production build with `npm run start --workspace client_app`.

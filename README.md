# URL Shortener Application

**Demo:** https://url-shortener-tan-kappa.vercel.app/

This is a simple URL shortener built with Remix, React, and TypeScript. It allows users to input a
URL and receive a shortened version. When someone visits the shortened URL, they are redirected to
the original URL.

## Design Goals & Data Model

It follows a functional Domain-Driven Design (DDD) approach to keep business logic separate from
persistence concerns. Here’s how the codebase is organized:

- **Domain Layer:** Contains types, interfaces, and pure functions to handle URL validation,
  generation of short codes, and business rules.
- **Infrastructure Layer:** Implements the repository interface using Redis. Keys are namespaced
  (e.g., `url:<shortCode>`) to avoid collisions.
- **Presentation Layer:** Uses Remix routes and React components to provide the UI and handle
  routing/redirects.

**Data Model:**  
We use a simple mapping where each URL is represented by:

- A `shortCode` (which serves as the unique identifier)
- The `originalUrl` (the full URL provided by the user)

This minimal data model is stored in a key–value store, making it efficient and easy to scale.

## Running the Code Locally

To get this code running on your machine:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Kurocado-Studio/url-shortener.git
   cd url-shortener
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:** Create a `.env` file at the root of the project with:

   ```env
   VITE_REDIS_URL=your_redis_connection_string
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

## Testing

It uses Vitest and React Testing Library for unit tests. To run the tests:

```bash
npm run test
```

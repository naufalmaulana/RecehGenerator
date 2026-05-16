import { Link } from "react-router";

// Later, you can pass props here like { errorCode = "404", errorMessage = "Page not found" }
export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12 transition-colors duration-300">
      <div className="text-center">
        {/* Error Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-500/10 mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-12 w-12 text-rose-600 dark:text-rose-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        {/* Error Number */}
        <h1 className="text-9xl font-black text-zinc-900 dark:text-white tracking-widest drop-shadow-sm">
          404
        </h1>
        
        {/* Error Message */}
        <p className="mt-4 text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
          Page not found
        </p>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        
        {/* Action Button */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/home"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

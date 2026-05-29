import { useState, useEffect } from "react";
import Card, { type Joke } from "../components/Card";
import apiClient from "../api/axios";

export default function Home() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchJokes = async () => {
    try {
      const res = await apiClient.get("/jokes");
      setJokes(res.data);
      if (res.data.length > 0) {
        const randomIndex = Math.floor(Math.random() * res.data.length);
        setCurrentJoke(res.data[randomIndex]);
      }
    } catch (error) {
      console.error("Failed to fetch jokes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  const randomizeJoke = () => {
    if (jokes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * jokes.length);
    setCurrentJoke(jokes[randomIndex]);
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-3.5rem)] mt-14 items-center justify-center bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 px-4">
        <div className="flex justify-center items-center flex-col w-full">
          {loading ? (
            <Card joke={null} />
          ) : jokes.length === 0 ? (
            <div className="dark:text-zinc-400 text-zinc-600">No jokes available yet.</div>
          ) : (
            <Card joke={currentJoke} />
          )}
          
          <button
            type="button"
            onClick={randomizeJoke}
            disabled={loading || jokes.length === 0}
            className="mt-6 group relative flex justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200 shadow-sm disabled:opacity-50"
          >
            Tell me a joke!
          </button>
        </div>
      </div>
    </>
  );
}

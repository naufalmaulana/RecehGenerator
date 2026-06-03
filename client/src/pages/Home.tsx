import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Card, { type Joke } from "../components/Card";
import apiClient from "../api/axios";

export default function Home() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [isCycling, setIsCycling] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const fetchJokes = async () => {
    try {
      const res = await apiClient.get("/jokes");
      setJokes(res.data);
    } catch (error) {
      console.error("Failed to fetch jokes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  const randomizeJoke = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.add("mb-6");
    if (jokes.length === 0 || isCycling) return;
    
    setShowCard(true);
    setIsCycling(true);
    
    let intervalCount = 0;
    const maxIntervals = 20; // 20 intervals of 100ms = 2 seconds
    
    const interval = setInterval(() => {
      const randomDisplay = Math.floor(Math.random() * jokes.length);
      setCurrentJoke(jokes[randomDisplay]);
      intervalCount++;
      
      if (intervalCount >= maxIntervals) {
        clearInterval(interval);
        // Final random selection
        const finalRandomIndex = Math.floor(Math.random() * jokes.length);
        setCurrentJoke(jokes[finalRandomIndex]);
        setIsCycling(false);
      }
    }, 100);
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-3.5rem)] mt-14 items-center justify-center bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 px-4">
        <div className="flex justify-center items-center flex-col w-full">
        {loading ? null : jokes.length === 0 ? (
          <div className="dark:text-zinc-400 text-zinc-600 h-64 flex items-center justify-center">
            No jokes available yet.
          </div>
        ) : showCard ? (
          <div className={`transition-all duration-300 ${isCycling ? 'scale-95 opacity-75' : 'scale-100 opacity-100'}`}>
            <Card joke={currentJoke} />
          </div>
        ) : null}
          
          <button
            type="button"
            onClick={randomizeJoke}
            disabled={loading || jokes.length === 0 || isCycling}
            className="group relative flex justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200 shadow-sm disabled:opacity-50"
          >
            {isCycling ? "Generating..." : "Tell me a joke!"}
          </button>
        </div>
      </div>
    </>
  );
}

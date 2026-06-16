import { useState, useEffect } from "react";
import apiClient from "../api/axios";
import Swal from "sweetalert2";
import Card, { type Joke } from "../components/Card";

interface FavoriteItem {
  id: number;
  joke: Joke;
}

export default function Favorite() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await apiClient.get("/favorites");
      setFavorites(response.data);
    } catch (error) {
      console.error("Failed to fetch favorites", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (jokeId: number) => {
    const result = await Swal.fire({
      title: 'Remove Favorite?',
      text: "Do you want to remove this joke from your favorites?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, remove it!'
    });

    if (result.isConfirmed) {
      try {
        await apiClient.delete(`/favorites/${jokeId}`);
        setFavorites(favorites.filter(fav => fav.joke.id !== jokeId));
        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove favorite.'
        });
      }
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] mt-14 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-6xl w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-rose-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            Your Favorites
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Jokes you've saved for later.</p>
        </div>

        {loading ? (
          <div className="text-center py-10 dark:text-zinc-300">Loading favorites...</div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-zinc-500 dark:text-zinc-400">You haven't added any jokes to your favorites yet.</p>
          </div>
        ) : (
          <div className="flex flex-wrap items-stretch justify-start -mx-2">
            {favorites.map((fav) => (
              <Card 
                key={fav.id} 
                joke={fav.joke} 
                onRemoveFavorite={() => handleRemoveFavorite(fav.joke.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

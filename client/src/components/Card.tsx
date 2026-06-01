import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import apiClient from "../api/axios";
import Swal from "sweetalert2";

export interface Joke {
  id: number;
  text: string;
  category: string;
}

interface CardProps {
  joke: Joke | null;
  favoriteId?: number;
  onRemoveFavorite?: () => void;
}

export default function Card({ joke, favoriteId, onRemoveFavorite }: CardProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleAction = async () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    
    if (!joke) return;

    if (onRemoveFavorite) {
      onRemoveFavorite();
    } else {
      try {
        await apiClient.post("/favorites", { jokeId: joke.id });
        Swal.fire({
          icon: "success",
          title: "Added to Favorites!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error: any) {
        Swal.fire({
          icon: "info",
          title: "Already Favorited",
          text: "You have already favorited this joke.",
          confirmButtonColor: "#3b82f6",
        });
      }
    }
  };

  if (!joke) {
    return (
      <div className="w-full md:w-1/2 lg:w-1/3 p-2 mx-auto">
        <div className="dark:bg-white bg-zinc-900 block p-6 border dark:border-zinc-100 border-zinc-800 rounded-2xl relative flex justify-center items-center min-h-[150px] w-full transition-colors duration-300">
          <p className="dark:text-zinc-700 text-zinc-300 text-center font-medium">
            Loading jokes...
          </p>
        </div>
      </div>
    );
  }

  const isFavoritedView = !!onRemoveFavorite;

  return (
    <div className="w-full md:w-[500px] p-2">
      <div className="dark:bg-white bg-zinc-900 block p-6 border dark:border-zinc-100 border-zinc-800 rounded-2xl relative flex flex-col justify-center items-center min-h-[150px] w-full transition-colors duration-300">
        <p className="dark:text-zinc-700 text-zinc-300 text-center font-medium mb-4">
          {joke.text}
        </p>
        <button
          className="absolute top-3 right-3 cursor-pointer group bg-transparent border-none p-0 focus:outline-none"
          onClick={handleAction}
          aria-label={isFavoritedView ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavoritedView ? (
             <svg viewBox="0 0 24 24" fill="#ef4444" className="w-6 h-6 hover:fill-zinc-400 transition-colors">
               <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
             </svg>
          ) : (
             <svg viewBox="0 0 24 24" fill="#9CA3AF" className="w-6 h-6 hover:fill-red-400 transition-colors">
               <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
             </svg>
          )}
        </button>
      </div>
    </div>
  );
}

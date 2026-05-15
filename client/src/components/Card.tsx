import { useNavigate } from "react-router";

export default function Card() {
  const navigate = useNavigate();
  function addToFavorite() {
    navigate("/favorite");
  }
  return (
    <>
      <div className="max-w-[90%] lg:max-w-1/3 p-2">
        <div className="bg-sky-600 block p-4 border border-default border-white rounded-xl shadow-xs relative flex justify-center items-center min-h-[150px] w-full">
          <p className="text-white">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Necessitatibus architecto quisquam amet eligendi ab est quia quam
            nihil quaerat commodi.
          </p>
          <button
            className="absolute top-1 right-1 cursor-pointer"
            onClick={addToFavorite}
          >
            <svg
              viewBox="0 0 24 24"
              fill="#9CA3AF"
              className="w-6 h-6 hover:fill-red-400 transition"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

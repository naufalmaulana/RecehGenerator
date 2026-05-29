import { useState } from "react";
import apiClient from "../../api/axios";
import Swal from "sweetalert2";

export default function AddJoke() {
  const [text, setText] = useState("");
  const [isNsfw, setIsNsfw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.post("/jokes", {
        text,
        category: isNsfw ? "NSFW" : "SFW"
      });
      
      Swal.fire({
        icon: "success",
        title: "Joke Submitted!",
        text: "Your joke has been submitted for review. You can track its status in your Inbox.",
        confirmButtonColor: "#3b82f6",
      });
      
      setText("");
      setIsNsfw(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Could not submit your joke.",
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 transition-colors duration-300 max-w-2xl">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">Submit a New Joke</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="joke" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Joke Content
          </label>
          <textarea
            id="joke"
            rows={5}
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="block w-full rounded-lg border-0 py-3 px-4 text-zinc-900 dark:text-white ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 bg-zinc-50 dark:bg-zinc-800 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-colors duration-200 resize-none"
            placeholder="Why did the chicken cross the road?..."
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="nsfw"
            type="checkbox"
            checked={isNsfw}
            onChange={(e) => setIsNsfw(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-600 bg-white dark:bg-zinc-800 dark:border-zinc-700 dark:checked:bg-blue-500"
          />
          <label htmlFor="nsfw" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            This joke is NSFW (Not Safe For Work)
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200 shadow-sm disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Joke"}
        </button>
      </form>
    </div>
  );
}

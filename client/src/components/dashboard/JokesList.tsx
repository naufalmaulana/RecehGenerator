import { useState } from "react";

type Joke = {
  id: number;
  text: string;
  category: string;
  dateAdded: string;
};

const mockJokes: Joke[] = [
  { id: 1, text: "Why don't scientists trust atoms? Because they make up everything.", category: "SFW", dateAdded: "2023-10-01" },
  { id: 2, text: "Dark humor is like food. Not everyone gets it.", category: "NSFW", dateAdded: "2023-10-05" },
  { id: 3, text: "Why did the scarecrow win an award? Because he was outstanding in his field.", category: "SFW", dateAdded: "2023-10-10" },
  { id: 4, text: "Political joke placeholder.", category: "NSFW", dateAdded: "2023-10-12" },
  { id: 5, text: "Another SFW joke here.", category: "SFW", dateAdded: "2023-10-15" },
  { id: 6, text: "Religious joke placeholder.", category: "NSFW", dateAdded: "2023-10-16" },
  { id: 7, text: "NSFW joke placeholder (disclaimer: for dev test only).", category: "NSFW", dateAdded: "2023-10-18" },
  { id: 8, text: "Sex joke placeholder.", category: "NSFW", dateAdded: "2023-10-20" },
  { id: 9, text: "Why did the bicycle fall over? It was two tired.", category: "SFW", dateAdded: "2023-10-21" },
  { id: 10, text: "What do you call a fake noodle? An impasta.", category: "SFW", dateAdded: "2023-10-22" },
  { id: 11, text: "What do you call an alligator in a vest? An investigator.", category: "SFW", dateAdded: "2023-10-23" },
  { id: 12, text: "How does a penguin build its house? Igloos it together.", category: "SFW", dateAdded: "2023-10-24" },
];

export default function JokesList() {
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  let filteredJokes = mockJokes.filter((joke) => {
    if (filter === "All") return true;
    return joke.category === filter;
  });

  filteredJokes = filteredJokes.sort((a, b) => {
    const dateA = new Date(a.dateAdded).getTime();
    const dateB = new Date(b.dateAdded).getTime();
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(filteredJokes.length / itemsPerPage);
  const displayedJokes = filteredJokes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Jokes Directory</h2>
        
        <div className="flex gap-2">
          <select 
            value={filter} 
            onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
            className="rounded-lg border-0 py-1.5 pl-3 pr-8 text-zinc-900 dark:text-white ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-600 sm:text-sm transition-colors"
          >
            <option value="All">All Categories</option>
            <option value="SFW">SFW Only</option>
            <option value="NSFW">NSFW Only</option>
          </select>

          <button 
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="flex items-center gap-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Sort Date {sortOrder === "desc" ? "↓" : "↑"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700 text-sm text-left text-zinc-600 dark:text-zinc-400">
          <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-xs uppercase text-zinc-700 dark:text-zinc-300">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Joke</th>
              <th scope="col" className="px-4 py-3 font-medium">Category</th>
              <th scope="col" className="px-4 py-3 font-medium">Date Added</th>
              <th scope="col" className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {displayedJokes.length > 0 ? (
              displayedJokes.map((joke) => (
                <tr key={joke.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-4 py-3 max-w-xs truncate" title={joke.text}>{joke.text}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      joke.category === "SFW" 
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                    }`}>
                      {joke.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">{joke.dateAdded}</td>
                  <td className="px-4 py-3 flex justify-end gap-2">
                    <button className="p-1.5 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                    </button>
                    <button className="p-1.5 text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors" aria-label="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center">No jokes found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          Showing page {currentPage} of {Math.max(1, totalPages)}
        </span>
        <div className="flex gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(c => c - 1)}
            className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 disabled:opacity-50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Prev
          </button>
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(c => c + 1)}
            className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 disabled:opacity-50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

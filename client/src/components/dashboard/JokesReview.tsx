import { useState } from "react";

type ReviewJoke = {
  id: number;
  text: string;
  category: string;
  dateAdded: string;
};

const reviewData: ReviewJoke[] = [
  { id: 101, text: "Why do programmers prefer dark mode? Because light attracts bugs.", category: "SFW", dateAdded: "2023-11-01" },
  { id: 102, text: "A SQL query goes into a bar, walks up to two tables and asks... 'Can I join you?'", category: "SFW", dateAdded: "2023-11-02" },
  { id: 103, text: "NSFW joke pending review...", category: "NSFW", dateAdded: "2023-11-03" },
  { id: 104, text: "Another pending SFW joke.", category: "SFW", dateAdded: "2023-11-04" },
  { id: 105, text: "Pending joke 5.", category: "NSFW", dateAdded: "2023-11-05" },
  { id: 106, text: "Pending joke 6.", category: "SFW", dateAdded: "2023-11-06" },
  { id: 107, text: "Pending joke 7.", category: "NSFW", dateAdded: "2023-11-07" },
  { id: 108, text: "Pending joke 8.", category: "SFW", dateAdded: "2023-11-08" },
  { id: 109, text: "Pending joke 9.", category: "NSFW", dateAdded: "2023-11-09" },
  { id: 110, text: "Pending joke 10.", category: "SFW", dateAdded: "2023-11-10" },
  { id: 111, text: "Pending joke 11.", category: "NSFW", dateAdded: "2023-11-11" },
  { id: 112, text: "Pending joke 12.", category: "SFW", dateAdded: "2023-11-12" },
];

export default function JokesReview() {
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  let filteredJokes = reviewData.filter((joke) => {
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
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Pending Review</h2>
        
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
              <th scope="col" className="px-4 py-3 font-medium">Date</th>
              <th scope="col" className="px-4 py-3 font-medium">Category</th>
              <th scope="col" className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {displayedJokes.length > 0 ? (
              displayedJokes.map((joke) => (
                <tr key={joke.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-4 py-4 max-w-md" title={joke.text}>{joke.text}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{joke.dateAdded}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      joke.category === "SFW" 
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                    }`}>
                      {joke.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 flex justify-end gap-2">
                    <button className="flex items-center gap-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      Approve
                    </button>
                    <button className="flex items-center gap-1 rounded-md bg-rose-50 dark:bg-rose-500/10 px-2.5 py-1.5 text-xs font-medium text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      Reject
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

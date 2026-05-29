import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import JokesList from "../components/dashboard/JokesList";
import AddJoke from "../components/dashboard/AddJoke";
import JokesReview from "../components/dashboard/JokesReview";

type Tab = "list" | "add" | "review";

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  
  // If user is ADMIN, default to list. If USER, force to add
  const [activeTab, setActiveTab] = useState<Tab>(user?.role === 'ADMIN' ? "list" : "add");

  // Prevent users from accidentally switching tabs if somehow they got past UI
  useEffect(() => {
    if (user?.role !== 'ADMIN') {
      setActiveTab("add");
    }
  }, [user]);

  if (user?.role !== 'ADMIN') {
    // Normal User View
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] mt-14 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Submit a Joke</h1>
            <AddJoke />
          </div>
        </div>
      </div>
    );
  }

  // Admin View
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] mt-14 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      
      {/* Sidebar Menu */}
      <div className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 hidden md:block transition-colors duration-300">
        <div className="p-6">
          <h1 className="text-lg font-bold text-zinc-900 dark:text-white">CMS Dashboard</h1>
        </div>
        <nav className="flex flex-col gap-1 px-4">
          <button 
            onClick={() => setActiveTab("list")}
            className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "list" 
                ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" 
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            Jokes Directory
          </button>
          <button 
            onClick={() => setActiveTab("add")}
            className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "add" 
                ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" 
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            Add Joke
          </button>
          <button 
            onClick={() => setActiveTab("review")}
            className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex justify-between items-center ${
              activeTab === "review" 
                ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" 
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            Jokes Review
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Mobile menu dropdown */}
        <div className="md:hidden mb-6">
          <select 
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as Tab)}
            className="w-full rounded-lg border-0 py-2.5 pl-4 pr-10 text-zinc-900 dark:text-white ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-600 transition-colors"
          >
            <option value="list">Jokes Directory</option>
            <option value="add">Add Joke</option>
            <option value="review">Jokes Review</option>
          </select>
        </div>

        {activeTab === "list" && <JokesList />}
        {activeTab === "add" && <div className="max-w-4xl mx-auto"><AddJoke /></div>}
        {activeTab === "review" && <JokesReview />}
      </div>
    </div>
  );
}

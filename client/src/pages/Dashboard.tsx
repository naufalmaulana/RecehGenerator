import { useState } from "react";
import JokesList from "../components/dashboard/JokesList";
import AddJoke from "../components/dashboard/AddJoke";
import JokesReview from "../components/dashboard/JokesReview";

type Tab = "list" | "add" | "review";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("list");

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
            Jokes List
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
            <span className="bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 py-0.5 px-2 rounded-full text-xs">3</span>
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
            <option value="list">Jokes List</option>
            <option value="add">Add Joke</option>
            <option value="review">Jokes Review (3)</option>
          </select>
        </div>

        {activeTab === "list" && <JokesList />}
        {activeTab === "add" && <AddJoke />}
        {activeTab === "review" && <JokesReview />}
      </div>
    </div>
  );
}

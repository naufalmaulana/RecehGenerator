import { useState } from "react";

type Message = {
  id: number;
  title: string;
  body: string;
  date: string;
  isRead: boolean;
  type: "system" | "approval" | "rejection";
};

const mockMessages: Message[] = [
  {
    id: 1,
    title: "Joke Approved! 🎉",
    body: "Congratulations! Your joke 'Why don't scientists trust atoms?' has been approved by the admin and is now live on the homepage.",
    date: "2023-11-16 10:00 AM",
    isRead: false,
    type: "approval",
  },
  {
    id: 2,
    title: "Joke Submission Received",
    body: "Your joke has been successfully submitted and is waiting for admin review. We'll notify you once a decision is made.",
    date: "2023-11-15 02:30 PM",
    isRead: true,
    type: "system",
  },
  {
    id: 3,
    title: "Joke Rejected 😔",
    body: "Unfortunately, your joke 'Why did the chicken cross the road?' did not meet our quality guidelines and was rejected.",
    date: "2023-11-10 09:15 AM",
    isRead: true,
    type: "rejection",
  },
];

export default function Inbox() {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const markAsRead = (id: number) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
    setSelectedMessage(messages.find(m => m.id === id) || null);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "approval":
        return (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-emerald-600 dark:text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        );
      case "rejection":
        return (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-rose-600 dark:text-rose-400"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] mt-14 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            System Inbox
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Check updates on your submitted jokes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="md:col-span-1 space-y-3">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => markAsRead(msg.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex gap-3 ${
                  selectedMessage?.id === msg.id 
                    ? "bg-white dark:bg-zinc-800 border-blue-500 shadow-md dark:border-blue-500" 
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm"
                }`}
              >
                {getIcon(msg.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm truncate ${msg.isRead ? "font-medium text-zinc-700 dark:text-zinc-300" : "font-bold text-zinc-900 dark:text-white"}`}>
                      {msg.title}
                    </p>
                    {!msg.isRead && <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-1.5"></span>}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{msg.date}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Message Detail View */}
          <div className="md:col-span-2">
            {selectedMessage ? (
              <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 min-h-[300px] transition-colors duration-300">
                <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6 mb-6">
                  {getIcon(selectedMessage.type)}
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{selectedMessage.title}</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{selectedMessage.date}</p>
                  </div>
                </div>
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  <p>{selectedMessage.body}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 min-h-[300px] flex flex-col items-center justify-center text-center transition-colors duration-300">
                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-zinc-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white">Select a message</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">Click on a message from the list to read it.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

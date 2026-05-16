import Card from "../components/Card";

export default function Home() {
  return (
    <>
      <div className="flex min-h-[calc(100vh-3.5rem)] mt-14 items-center justify-center bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 px-4">
        <div className="flex justify-center items-center flex-col">
          <Card />
          <button
            type="button"
            className="mt-6 group relative flex justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200 shadow-sm"
          >
            Tell me a joke!
          </button>
        </div>
      </div>
    </>
  );
}

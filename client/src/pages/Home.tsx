import Card from "../components/Card";

export default function Home() {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-slate-200 dark:bg-slate-900">
        <div className="flex justify-center items-center flex-col">
          <Card />
          <button
            type="button"
            className="text-black bg-white box-border border border-black rounded-lg hover:bg-rose-400 hover:text-white hover:border-white focus:ring-4 focus:ring-white shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 my-2 mx-auto block focus:outline-none cursor-pointer transition"
          >
            Tell me a joke!
          </button>
        </div>
      </div>
    </>
  );
}

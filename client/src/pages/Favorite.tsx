import Card from "../components/Card";

export default function Favorite() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-start mt-[calc(56px+50px)] px-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} />
        ))}
      </div>
    </>
  );
}

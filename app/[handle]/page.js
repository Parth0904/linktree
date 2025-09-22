import clientPromise from "@/lib/mongodb";
import Image from "next/image";

// Fetch data for this handle
async function getUserData(handle) {
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  const user = await collection.findOne({ handle });
  return JSON.parse(JSON.stringify(user)); // serialize MongoDB ObjectId
}

export default async function HandlePage({ params }) {
  const { handle } = params;
  const user = await getUserData(handle);

  if (!user) {
    return (
      <main className="flex items-center justify-center h-screen bg-red-100">
        <h1 className="text-3xl font-bold text-red-600">
          Handle "{handle}" not found ❌
        </h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 p-6">
      {/* Profile Section */}
      <section className="flex flex-col items-center ">
        <img
          src=" https://wallpapercave.com/wp/wp5435684.jpg"
          alt={`${handle}'s profile`}
          width={120}
          height={120}
          className="rounded-full border-4 border-white shadow-lg  mt-[20vh]"
        />
        <h1 className="text-3xl font-bold text-white">@{user.handle}</h1>
      </section>

      {/* Links Section */}
      <section className="flex flex-col gap-4 w-full max-w-md mt-8">
        {user.links?.map((link, i) => (
          <a
            key={i}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-center font-semibold text-blue-700 py-4 rounded-xl shadow-md hover:scale-105 hover:bg-blue-50 transition"
          >
            {link.linktext || link.link}
          </a>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-auto text-sm text-white opacity-70 py-6">
        Made with ❤️ using Bittree
      </footer>
    </main>
  );
}

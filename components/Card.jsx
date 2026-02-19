import axios from "axios";
import React, { useEffect, useState } from "react";

const Card = () => {
  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=20`,
      );
      setUserData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [index]);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 via-slate-900 to-black text-white">
      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
          Modern Image Gallery
        </h1>
        <p className="text-gray-400 mt-3 text-sm tracking-wide">
          Explore curated high-resolution visuals
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {userData.map((data) => (
              <div
                key={data.id}
                className="backdrop-blur-lg bg-white/10 border border-white/10 
                rounded-2xl overflow-hidden shadow-xl hover:shadow-cyan-500/20 
                transition duration-300 hover:-translate-y-2"
              >
                <a href={data.url} target="_blank" rel="noopener noreferrer">
                  <img
                    className="h-56 w-full object-cover hover:scale-110 transition duration-500"
                    src={data.download_url}
                    alt={data.author}
                    loading="lazy"
                  />
                </a>

                <div className="p-5">
                  <h2 className="text-lg font-semibold text-cyan-300 truncate">
                    {data.author}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-8 mt-16">
          <button
            disabled={index === 1}
            onClick={() => index > 1 && setIndex(index - 1)}
            className="px-6 py-2 rounded-xl font-semibold 
            bg-linear-to-r from-cyan-400 to-indigo-500 
            text-black hover:opacity-90 active:scale-95 
            disabled:opacity-40 disabled:cursor-not-allowed 
            transition"
          >
            Prev
          </button>

          <span className="text-xl font-medium text-cyan-300">
            Page {index}
          </span>

          <button
            onClick={() => setIndex(index + 1)}
            className="px-6 py-2 rounded-xl font-semibold 
            bg-linear-to-r from-cyan-400 to-indigo-500 
            text-black hover:opacity-90 active:scale-95 
            transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

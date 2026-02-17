import { X } from "lucide-react";
import React, { useState } from "react";

const App = () => {
  const [tittle, setTittle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);

  const submitHandler = (e) => {
    console.log(tittle);
    console.log(task);
    e.preventDefault();

    const copyTask = [...task];
    copyTask.push({ tittle, details });
    setTask(copyTask);

    setTittle("");
    setDetails("");
  };

  const deleteNote = (idx) => {
    const copyTask = [...task];
    copyTask.splice(idx, 1);
    setTask(copyTask);
  };

  return (
  <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white p-10">
    
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* Left Side - Form */}
      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/10">
        <h1 className="text-4xl font-bold mb-6">Add New Note</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          
          <input
            value={tittle}
            onChange={(e) => setTittle(e.target.value)}
            className="px-4 py-3 bg-black/40 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            type="text"
            placeholder="Enter note title"
            required
          />

          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="px-4 py-3 h-40 bg-black/40 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            placeholder="Enter note details"
            required
          />

          <button className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 py-3 rounded-xl font-semibold active:scale-95">
            Add Note
          </button>

        </form>
      </div>

      {/* Right Side - Notes */}
      <div>
        <h1 className="text-3xl font-bold mb-6">Your Notes</h1>

        {task.length === 0 && (
          <p className="text-gray-400">No notes added yet...</p>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          {task.map((elem, idx) => (
            <div
              key={idx}
              className="relative bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/10 hover:scale-105 transition duration-300"
            >
              
              <button
                onClick={() => deleteNote(idx)}
                className="absolute top-3 right-3 text-red-500 hover:scale-110 transition"
              >
                <X size={22} />
              </button>

              <h2 className="text-xl font-semibold mb-2">
                {elem.tittle}
              </h2>

              <p className="text-gray-300 text-sm leading-relaxed">
                {elem.details}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);
};

export default App;

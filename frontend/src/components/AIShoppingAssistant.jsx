import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { BsStars } from "react-icons/bs";

const AIShoppingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    if (!message.trim()) return;

    console.log("User Query:", message);

    // Future API Call Here

    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-all duration-300 z-50 max-w-[90vw]"
        >
          <BsStars size={26} className="text-yellow-300 shrink" />

          <span className="font-bold hidden sm:block">
            Hi, I'm your AI Shopping Assistant
          </span>
        </button>
      )}

      {/* Popup */}
      {isOpen && (
        <div
          className="
            fixed
            bottom-4
            left-4
            right-4
            sm:left-auto
            sm:right-6
            sm:bottom-24
            sm:w-[380px]
            h-[500px]
            bg-white
            rounded-2xl
            shadow-2xl
            border
            z-50
            flex
            flex-col
            overflow-hidden
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
            <div className="flex items-center gap-2">
              <BsStars size={20} className="text-yellow-500" />

              <h3 className="font-semibold">
                AI Shopping Assistant
              </h3>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-red-500 transition"
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="bg-gray-100 rounded-xl p-3 text-sm text-gray-700 w-fit max-w-[90%]">
              👋 Hi! Tell me what product you're looking for.
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSearch()
              }
              placeholder="e.g. Sugess me black shoes under 5000"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={handleSearch}
              disabled={!message.trim()}
              className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Suggest Products
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIShoppingAssistant;
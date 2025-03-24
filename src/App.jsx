import React, { useState } from "react";
import { geminiApiKey } from "./constants";
import Answers from "./components/Answers";
import { formatDateTime } from "./helper";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [emptyMsg, setEmptyMsg] = useState(true);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("chatHistory"))
  );
  const payload = {
    contents: [
      {
        parts: [{ text: question }],
      },
    ],
  };

  async function askQuestion() {
     setEmptyMsg(false);
    //storing the chat-history in localStorage
    if (localStorage.getItem("chatHistory")) {
      let chatHistory = JSON.parse(localStorage.getItem("chatHistory"));
      chatHistory = [question, ...chatHistory];
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
      setRecentHistory(chatHistory);
    } else {
      localStorage.setItem("chatHistory", JSON.stringify([question]));
      setRecentHistory([question]);
    }
    const response = await fetch(geminiApiKey, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    let resString = data.candidates[0].content.parts[0].text;
    resString = resString.split("* ");
    resString = resString.map((str) => str.trim()); // Removing spaces
    setResult([
      ...result,
      { type: "q", text: question },
      { type: "a", text: resString },
    ]);
    setQuestion("");
  }

  function clearChatHistory() {
    localStorage.clear();
    setRecentHistory([]);
    setEmptyMsg(true);
  }

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      {/* LEFT SIDE_BAR */}
      <div className="col-span-1 bg-zinc-800 pt-5">
        <h1 className="text-xl text-white flex justify-center">
          <span>Recent Queries </span>
          {/* {recentHistory.length() < 1 && <div>No Recent Searches</div>} */}
          <button
            onClick={clearChatHistory}
            title="Delete history?"
            className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#e3e3e3">
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>
        </h1>

        <ul className="text-left overflow-auto mt-2">
          <>
            {recentHistory &&
              recentHistory.map((item) => (
                <li
                  key={Math.random()}
                  className="px-5 pl-5 truncate text-zinc-400 cursor-pointer hover:bg-zinc-700 mb-2 hover:text-zinc-200">
                  {item}
                  <div className="text-sm italic text-amber-100">
                    - {formatDateTime(new Date())}
                  </div>
                </li>
              ))}
            {emptyMsg && (
              <h2 className="text-sm hover:text-amber-100 pl-5 text-amber-200 italic">
                NO CHAT-HISTORY🌵
              </h2>
            )}
          </>
        </ul>
      </div>
      {/* MAIN_AREA */}
      <div className="col-span-4 p-10">
        <div className="container h-110 overflow-scroll">
          <div className="text-zinc-300">
            <ul>
              {result.map((item, idx) => (
                <div
                  key={idx + Math.random()}
                  className={item.type === "q" ? "flex justify-end" : ""}>
                  {item.type === "q" ? (
                    <li
                      className="text-right p-1 border-8 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit"
                      key={idx + Math.random()}>
                      <Answers
                        ans={item.text}
                        idx={idx}
                        totalResults={1}
                        type={item.type}
                      />
                      <div className="text-sm italic text-amber-100">
                        {formatDateTime(new Date())}
                      </div>
                    </li>
                  ) : (
                    item.text.map((ansItem, ansIdx) => (
                      <li
                        className="text-left p-1"
                        key={ansIdx + Math.random()}>
                        <Answers
                          ans={ansItem}
                          idx={ansIdx}
                          totalResults={item.length}
                          type={item.type}
                        />
                      </li>
                    ))
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-zinc-800 p-1 pr-5 w-1/2 text-white m-auto rounded-4xl border-zinc-700 border flex h-16">
          <input
            type="text"
            className="w-full h-full p-3 outline-none"
            placeholder="Ask me anything"
            onChange={(evt) => setQuestion(evt.target.value)}
            value={question}
          />
          <button className="cursor-pointer" onClick={askQuestion}>
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

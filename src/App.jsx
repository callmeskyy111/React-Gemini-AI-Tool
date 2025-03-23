import React, { useState } from "react";
import { geminiApiKey } from "./constants";
import Answers from "./components/Answers";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const payload = {
    contents: [
      {
        parts: [{ text: question }],
      },
    ],
  };
  async function askQuestion() {
    console.log("❓Question: ", question);
    console.log("🔑Gemini API KEY:", geminiApiKey);
    const response = await fetch(geminiApiKey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    let resString = data.candidates[0].content.parts[0].text;
    resString = resString.split("* ");
    resString = resString.map((str) => str.trim()); //removing spaces
    setResult(resString);
    setQuestion("");
    console.log("✨RESPONSE: ", resString);
  }
  return (
    <div className="grid grid-cols-5 h-screen text-center">
      {/* LEFT SIDE_BAR */}
      <div className="col-span-1 bg-zinc-800"></div>
      {/* MAIN_AREA */}
      <div className="col-span-4 p-10">
        <div className="container h-110 overflow-scroll">
          <div className="text-white">
            <ul>
              {result &&
                result.map((item, idx) => {
                  return (
                    <li className="text-left p-1">
                      <Answers ans={item} key={idx} />
                    </li>
                  );
                })}
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

//6

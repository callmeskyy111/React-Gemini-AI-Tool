import React from "react";

function RecentSearch({
  recentHistory,
  setRecentHistory,
  setSelectedHistory,
  setEmptyMsg,
  emptyMsg,
}) {
  function clearChatHistory() {
    localStorage.clear();
    setRecentHistory([]);
    setEmptyMsg(true);
  }
  return (
    <>
      <div className="col-span-1 bg-zinc-800 pt-5">
        <h1 className="text-xl text-white flex justify-center">
          <span>Recent Queries </span>
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
                  title={item}
                  key={Math.random()}
                  onClick={() => setSelectedHistory(item)}
                  className="px-5 pl-5 truncate text-zinc-400 cursor-pointer hover:bg-zinc-700 mb-2 hover:text-zinc-200">
                  {item}
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
    </>
  );
}

export default RecentSearch;

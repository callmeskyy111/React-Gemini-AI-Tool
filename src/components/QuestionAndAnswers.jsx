import React from 'react'
import Answers from './Answers';

function QuestionAndAnswers({item,idx}) {
  return (
    <>
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
          </li>
        ) : (
          item.text.map((ansItem, ansIdx) => (
            <li className="text-left p-1" key={ansIdx + Math.random()}>
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
    </>
  );
}

export default QuestionAndAnswers
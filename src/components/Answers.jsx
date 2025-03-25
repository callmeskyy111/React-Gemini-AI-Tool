import React, { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStars } from "../helper";

function Answers({ ans, idx, totalResults, type }) {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStars(ans)); // Fixed
      //console.log("Index: ", idx);
    }
  }, [ans, idx]); // Fixed Dependencies

  return (
    <>
      {idx === 0 && totalResults > 1 ? (
        <span className="pt-2 text-xl block text-white">{answer}</span>
      ) : heading ? (
        <span className="pt-2 text-lg block text-white">{answer}</span>
      ) : (
        <span className={type==='q'?'pl-1':'pl-5'}>{answer}</span>
      )}
    </>
  );
}

export default Answers;

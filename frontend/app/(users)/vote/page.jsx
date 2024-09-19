"use client";

import React, { useState } from "react";
import {
  FaStarOfDavid,
  FaStudiovinari,
  FaStaffSnake,
  FaStarAndCrescent,
} from "react-icons/fa6";
import Accordion from "./Accordion";

const Vote = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  return (
    <div className="h-screen p-4 w-[80%] mx-auto rounded-md bg-white/30 border-[0.5px]  backdrop-blur-sm">
      {candidates.map((candidate) => (
        <Accordion
          candidate={candidate.name}
          party={candidate.party}
          age={candidate.age}
          education={candidate.education}
          regNumber={candidate.regNumber}
          partySymbol={candidate.symbol}
          setSelectedCandidate={setSelectedCandidate}
        />
      ))}
      <div className="">
        <input
          type="checkbox"
          id="confirm"
          name="fav_language"
          value="HTML"
          className="w-5 h-5"
          disabled={!selectedCandidate} // Disable checkbox if no candidate selected
        />
        <label htmlFor="confirm" className="ml-4 text-xl">
          {selectedCandidate
            ? `I have selected "${selectedCandidate.name}" from "${selectedCandidate.party}" as my candidate.`
            : "Please select a candidate"}
        </label>
      </div>
    </div>
  );
};

const candidates = [
  {
    regNumber: "1",
    name: "Steve Sang",
    party: "KMPF",
    symbol: <FaStarOfDavid className="w-10 h-10" />,
    age: "34",
    education: "BA (English)",
  },
  {
    regNumber: "2",
    name: "John Doe",
    party: "RRR",
    symbol: <FaStudiovinari className="w-10 h-10" />,
    age: "34",
    Education: "BA (English)",
  },
  {
    regNumber: "3",
    name: "Peter Song",
    party: "KMPF",
    symbol: <FaStaffSnake className="w-10 h-10" />,
    age: "34",
    Education: "BA (English)",
  },
  {
    regNumber: "4",
    name: "David Donald",
    party: "KMPF",
    symbol: <FaStarAndCrescent className="w-10 h-10" />,
    age: "34",
    Education: "BA (English)",
  },
];

export default Vote;

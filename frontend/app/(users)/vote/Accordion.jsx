"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Accordion = ({
  candidate,
  party,
  age,
  education,
  partySymbol,
  regNumber,
  setSelectedCandidate,
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="py-2 ">
      <div className="flex items-center">
        <button
          htmlFor={regNumber}
          onClick={() => setAccordionOpen(!accordionOpen)}
          className="flex justify-between w-full p-3 mt-2 text-white bg-gray-900 rounded-lg"
        >
          <input
            type="radio"
            id={`candidate-${regNumber}`}
            name="candidate"
            className="w-10 h-10"
            value={candidate}
            onChange={() => setSelectedCandidate({ name: candidate, party })}
          />
          <div className="flex justify-between w-[80%]">
            <div>{candidate}</div>
            <div>{partySymbol}</div>
            <div>{party}</div>
          </div>
          <FaChevronDown />
        </button>
      </div>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out w-[95%] p-4 rounded-b-md bg-white/30 border-[0.5px]  backdrop-blur-sm mx-auto text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p>Name: {candidate}</p>
          <p>Age: {age}</p>
          <p>Party: {party}</p>
          <p>Education: {education}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;

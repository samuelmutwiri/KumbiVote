"use client";
import { MdLock } from "react-icons/md";
import {
  FaEthereum,
  FaCircleDollarToSlot,
  FaStopwatch20,
} from "react-icons/fa6";
import { FaLaptopCode, FaHandPointer } from "react-icons/fa";

const features = [
  {
    name: "Secured by 256 bit encryption",
    description:
      "A powerful method for securing data, using a complex key of 256 bits to encrypt and decrypt information. This means there are 2^256 possible combinations for the key, making it incredibly difficult for unauthorized individuals to break through.",
    icon: MdLock,
  },
  {
    name: "Backed by ethereum based technology",
    description:
      "Ethereum is a decentralized, open-source blockchain platform that features smart contract functionality. This means it allows developers to build applications that run exactly as programmed without any possibility of fraud or third-party interference.",
    icon: FaEthereum,
  },
  {
    name: "Verifiable transactions",
    description:
      "are records of events or exchanges that can be independently confirmed as accurate and authentic. They are essential for building trust and transparency in various systems.",
    icon: FaLaptopCode,
  },
  {
    name: "Faster voting process",
    description:
      "By automating vote tallying, we eliminate the need for labor-intensive manual efforts, reducing operational costs significantly making KumbiVote your altimate solution ",
    icon: FaStopwatch20,
  },
  {
    name: "Easy to use",
    description:
      "Designed with the user in mind, KumbiVote is incredibly easy to navigate. Its intuitive interface and clear on-screen guidance ensure a smooth user experience from the outset. Whether you're a tech-savvy individual or a first-time user, you'll find KumbiVote simple to pick up and start using right away.",
    icon: FaHandPointer,
  },
  {
    name: "Cheaper than ballot voting system",
    description:
      "We eliminate the need for labor-intensive manual efforts, reducing operational costs significantly. With no more paperwork, human errors, or wasted time, you can achieve substantial savings while increasing efficiency and productivity.",
    icon: FaCircleDollarToSlot,
  },
];

const Features = () => {
  return (
    <div className="mb-4 ">
      <div className="py-12 bg-white/30 backdrop-blur-sm sm:py-32 md:border-[0.5px] px-12  rounded-md">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Features
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We pride ourselves on our cutting-edge technology, which ensures
              accuracy, transparency, security, and system integrity.
            </p>
          </div>
          <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute top-0 left-0 flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
                      <feature.icon
                        aria-hidden="true"
                        className="w-6 h-6 text-white"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

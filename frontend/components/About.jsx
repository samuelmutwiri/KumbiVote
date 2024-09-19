import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="flex items-center  py-16 rounded-md bg-white/30 border-[0.5px] mb-4 px-12">
      <div className="flex flex-col items-center mx-auto">
        <h2 className="flex justify-center w-full text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          About Us
        </h2>
        <div className="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light sm:text-lg ">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              KumbiVote:
            </h2>
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
              The People&apos;s Baraza
            </h2>
            <p className="my-4">
              An online voting system that will replace the old ballot system or
              paper system. Over the time we have utilized the required
              technology in every sector to improve efficiency and save the
              extra resources. But the voting system is still very expensive and
              requires a bigger workforce The system is slower and still not
              completely tamper proof. We bring the system that is safe,
              reliable and solve the modern issues like higher reachability of
              the booth, crowd free voting, inexpensive, faster results and
              others.
            </p>
            <p className="font-semibold">
              We are strategists, designers and developers. Innovators and
              problem solvers. Small enough to be simple and quick.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Image
              className="w-full rounded-lg"
              src="/1.jpg"
              width={200}
              height={400}
              priority
              alt="office content 1"
            />
            <Image
              className="w-full mt-4 rounded-lg lg:mt-10"
              src="/2.jpg"
              width={200}
              height={400}
              priority
              alt="office content 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

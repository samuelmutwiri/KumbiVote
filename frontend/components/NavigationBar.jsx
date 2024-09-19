"use client";

import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const NavigationBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // start mobile first plus facile
  return (
    <header className="fixed inset-x-0  border-b-[0.5px] m  top-0 z-50 bg-gradient-to-r from-white/10 to-white/60 backdrop-blur-sm mb-4">
      <nav
        aria-label="Global"
        className="flex items-center justify-between xs:w-[95%] sm:w-[90%] p-6 lg:px-8 md:w-[80%] mx-auto"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">KumbiVote</span>
            <Image
              src="/KumbiVote.svg"
              width={48}
              height={48}
              alt="Kumbi Logo"
            />
          </a>
        </div>
        {/* <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="w-6 h-6" />
          </button>
        </div> */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:underline"
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/signin"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Sign in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      {/* <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                src="/KumbiVote.svg"
                width={48}
                height={48}
                alt="Kumbi Logo"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="w-6 h-6" />
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                {navigation.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block px-3 py-2 -mx-3 text-xl font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="/signin"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog> */}
    </header>
  );
};

export const navigation = [
  {
    title: "Home",
    href: "/",
    cname:
      "border-t font-medium w-full flex justify-center p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto",
  },
  {
    title: "Features",
    href: "#features",
    cname:
      "border-t font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto",
  },
  {
    title: "About",
    href: "#about",
    cname:
      "border-t font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto",
  },
  {
    title: "Steps",
    href: "#steps",
    cname:
      "border-t font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto",
  },
];

export default NavigationBar;

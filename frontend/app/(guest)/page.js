import { IoIosArrowDropupCircle } from "react-icons/io";
import NavigationBar from "@/components/NavigationBar";

import About from "@/components/About";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Steps from "@/components/Steps";

const Home = () => {
  return (
    <main>
      <div className="w-[95%] sm:w-[90%] md:w-[80%] mx-auto">
        <NavigationBar />
        <section id="hero">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="steps">
          <Steps />
        </section>
        <section id="contact">
          <Footer />
        </section>
      </div>
      <a href="#hero" className="sticky flex justify-end bottom-10 right-20 ">
        <IoIosArrowDropupCircle className="w-12 h-12 " />
      </a>
    </main>
  );
};

export default Home;

import React from "react";
import Footer from "../widgets/Footer";
import Header from "../widgets/Header";
import Hero from "../widgets/Hero";
import Todolist from "../widgets/Todolist";

function Index() {
  return (
    <div className="container mx-auto p-4">
      <Header />
      <main className="mt-10">
        <Hero />
        <Todolist />
        {/* <Solutions /> 
          <section className="mt-20">
          <HowItWorks />
         </section> */}
      </main>
      <Footer />
    </div>
  );
}

export default Index;

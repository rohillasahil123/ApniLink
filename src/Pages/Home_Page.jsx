// ✅ Final Updated Home_Page.jsx

import React from "react";
import HeroImage from "../assets/Hero.png";
import UpgradeProButton from "../Components/UpgradeProButton";
import {useNavigate } from "react-router-dom";

const Home_Page = () => {
  const navigate = useNavigate()

  const handleSend = ()=>{
    console.log("1")
    navigate("/dashboard")

  }


  return (
    <>
      <main className="bg-white text-gray-900">

      
        <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-purple-100 via-white to-indigo-100">
          <div className="grid md:grid-cols-2 items-center gap-12">
        
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
                Your Entire Digital Life<br />
                <span className="text-purple-600">One Link</span> Away
              </h1>
              <p className="text-lg text-gray-700">
                Share your bio link, social links, YouTube, and more in one beautiful, customizable landing page.
              </p>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-700 transition" onClick={handleSend} >
               
                Get Started Free
               
              </button>
              <p className="text-sm text-gray-500">No credit card needed 💳</p>
            </div>

            {/* RIGHT */}
            <div className="flex justify-center">
              <img
                src={HeroImage}
                alt="Hero"
                className="max-w-[400px] w-full drop-shadow-xl rounded-xl"
              />
            </div>
          </div>
        </section>

   
      

        {/* ✅ TRUST BAR */}
        <section className="bg-white py-8 px-6 md:px-20 text-center border-y">
          <p className="text-gray-600 mb-4">Trusted by creators at</p>
          <div className="flex justify-center flex-wrap gap-6 text-gray-500 font-semibold text-sm">
            <span>Google</span>
            <span>YouTube</span>
            <span>Instagram</span>
            <span>LinkedIn</span>
            <span>X (Twitter)</span>
          </div>
        </section>

        {/* 💡 FEATURES */}
        <section className="py-20 px-6 md:px-20 bg-gray-50">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-purple-600">ApniLink?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="All Links, One Page"
              desc="Share all your content, from YouTube to Instagram to blogs, in a single bio link."
              emoji="🔗"
            />
            <FeatureCard
              title="Track Your Audience"
              desc="See who's clicking, from where, and when — all in real-time."
              emoji="📊"
            />
            <FeatureCard
              title="Your Brand, Your Style"
              desc="Customize your page with themes, colors, profile image, and custom domain."
              emoji="🎨"
            />
          </div>
        </section>

        {/* 💸 PRICING */}
        <section className="py-20 px-6 md:px-20 bg-white">
          <h2 className="text-4xl font-bold text-center mb-12">
            Simple & Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <PricingCard
              plan="Free"
              price="₹0"
              features={["1 Bio Link Page", "Basic Themes", "Social Icons", "Profile Image"]}
              highlight={false}
            />
            <PricingCard
              plan="Pro"
              price="₹99/yr"
              features={[
                "All Free Features",
                "Click Analytics",
                "Remove Branding",
                "Custom Domains",
                "Priority Support"
              ]}
              highlight={true}
            />
          </div>
        </section>

        {/* 🖚 FOOTER */}
        <footer className="py-6 text-center text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} ApniLink — Built with 💜 for creators.
        </footer>
      </main>
    </>
  );
};

const FeatureCard = ({ title, desc, emoji }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center">
    <div className="text-5xl mb-4">{emoji}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const PricingCard = ({ plan, price, features, highlight }) => (
  <div
    className={`rounded-2xl border p-8 shadow-lg transition-all duration-300 ${
      highlight ? "border-purple-600 bg-purple-50" : "border-gray-200"
    }`}
  >
    <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan}</h3>
    <p className="text-3xl font-semibold mb-6 text-gray-900">{price}</p>
    <ul className="text-gray-700 space-y-2 mb-8">
      {features.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          ✅ <span>{item}</span>
        </li>
      ))}
    </ul>
    
 {plan === "Free" ? (
  <button
    className="w-full py-3 rounded-full font-semibold transition bg-gray-200 text-gray-800 hover:bg-gray-300"
  >
    Get Started
  </button>
) : (
  <UpgradeProButton />
)}

  </div>
);

export default Home_Page;

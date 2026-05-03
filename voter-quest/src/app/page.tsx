"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#000000] text-white font-sans selection:bg-[#FFFF00] selection:text-black">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center py-24 px-6 border-b-8 border-[#FFFF00]">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-[#FFFF00] tracking-tight uppercase">
          {t.hero.title}
        </h1>
        <p className="text-2xl md:text-3xl max-w-4xl mb-12 font-bold leading-relaxed">
          {t.hero.subtitle}
        </p>
        <button className="bg-[#FFFF00] text-[#000000] text-2xl font-black py-4 px-12 rounded-none hover:bg-white hover:text-black transition-colors focus:outline-none focus:ring-8 focus:ring-[#0000FF] uppercase tracking-widest border-4 border-black">
          {t.hero.cta}
        </button>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12 py-24 px-6">
        <div className="bg-[#0000FF] p-8 border-4 border-white">
          <h2 className="text-3xl font-bold mb-4 text-[#FFFF00] uppercase">
            {t.features.feature1_title}
          </h2>
          <p className="text-xl font-medium leading-relaxed text-white">
            {t.features.feature1_desc}
          </p>
        </div>
        <div className="bg-[#0000FF] p-8 border-4 border-white">
          <h2 className="text-3xl font-bold mb-4 text-[#FFFF00] uppercase">
            {t.features.feature2_title}
          </h2>
          <p className="text-xl font-medium leading-relaxed text-white">
            {t.features.feature2_desc}
          </p>
        </div>
        <div className="bg-[#0000FF] p-8 border-4 border-white">
          <h2 className="text-3xl font-bold mb-4 text-[#FFFF00] uppercase">
            {t.features.feature3_title}
          </h2>
          <p className="text-xl font-medium leading-relaxed text-white">
            {t.features.feature3_desc}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-12 mt-auto border-t-4 border-white bg-[#000000]">
        <p className="text-xl font-bold text-[#FFFF00]">
          {t.footer.text}
        </p>
      </footer>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, Calculator, Globe, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Immigration Navigator
        </p>
      </div>

      <div className="flex flex-col items-center justify-center text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Your Path to Permanent Residency
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          AI-powered guidance to navigate your immigration journey with personalized recommendations and insights.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <Calculator className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">CRS Calculator</h2>
            <p className="text-gray-600 mb-4">Calculate your Comprehensive Ranking System score with our accurate tool.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <Globe className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Pathway Finder</h2>
            <p className="text-gray-600 mb-4">Discover the top 5 immigration pathways tailored to your profile.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <MessageSquare className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">AI Assistant</h2>
            <p className="text-gray-600 mb-4">Get answers to your immigration questions from our intelligent assistant.</p>
          </div>
        </div>
        
        <Link 
          href="/calculator" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full flex items-center transition-all"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4">
          <h2 className="mb-3 text-2xl font-semibold">
            Express Entry
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Federal Skilled Worker, Canadian Experience Class, and Federal Skilled Trades programs.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4">
          <h2 className="mb-3 text-2xl font-semibold">
            Provincial Nominees
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Programs tailored to the specific needs of provinces and territories.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4">
          <h2 className="mb-3 text-2xl font-semibold">
            Score Improvement
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Actionable insights to boost your CRS score and improve eligibility.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4">
          <h2 className="mb-3 text-2xl font-semibold">
            Draw Alerts
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Stay informed about new draws that match your eligibility criteria.
          </p>
        </div>
      </div>
    </main>
  );
}

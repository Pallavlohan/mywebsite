import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CRS Eligibility Advisor</h3>
            <p className="text-neutral-400 text-sm">
              Comprehensive tool for calculating your CRS score and providing personalized immigration recommendations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-neutral-400 hover:text-white">
                  CRS Calculator
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-neutral-400 hover:text-white">
                  Provincial Programs
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-neutral-400 hover:text-white">
                  NOC Codes
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-neutral-400 hover:text-white">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Disclaimer</h3>
            <p className="text-neutral-400 text-sm">
              This tool provides estimates based on publicly available information. Results should not be considered as immigration advice. Always consult with a licensed immigration consultant or lawyer.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-neutral-700 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CRS Eligibility Advisor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

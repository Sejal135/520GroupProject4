import React from 'react'

export function Footer() {
  return (
    <footer className="bg-navy-blue text-white py-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About JetSetGo</h3>
            <p className="text-slate-300">Discover, plan, and share your travel adventures with JetSetGo. Your journey begins here.</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-navy-blue text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} JetSetGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
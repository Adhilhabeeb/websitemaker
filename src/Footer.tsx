import React from 'react'

function Footer() {
  return (
    <div>

         <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2026 SiteCraft. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400">About</a>
            <a href="#" className="hover:text-blue-400">Contact</a>
            <a href="#" className="hover:text-blue-400">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
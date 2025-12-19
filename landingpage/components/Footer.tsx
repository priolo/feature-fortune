
import { Mail } from 'lucide-react';
import React from 'react';
import discordLogo from './discord_logo.svg';



const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f172a] border-t border-gray-900 py-12">
        <div className="max-w-7xl mx-auto flex justify-between px-4 items-center">

          <div className="text-gray-600 text-xs">
            <p>{new Date().getFullYear()} PUCE. Built with love for the Open Source Community.</p>
          </div>

          <div className="flex space-x-4">

            <a className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 hover:border-puce-pink"
              href="https://discord.com/channels/1451503961470275649/1451503962347012200"
              target="_blank" rel="noopener noreferrer"
              style={{ color: "red" }}
            ><img src={discordLogo} alt="Discord" className="w-5 h-5" /></a>

            <a href="mailto:support@puce.app" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800">
              <Mail size={20} className="text-gray-400" />
            </a>

          </div>
        </div>
    </footer>
  )
}

export default Footer

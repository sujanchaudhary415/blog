import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-lg font-semibold">Marvel Universe</p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://twitter.com/"
              className="hover:text-gray-400 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com/"
              className="hover:text-gray-400 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com/"
              className="hover:text-gray-400 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="text-center mt-6 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Marvel Universe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

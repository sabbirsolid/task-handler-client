const Footer = () => {
    return (
      <footer className="bg-gray-900 shadow-md mt-auto">
        <div className="container mx-auto px-4 py-6">
          {/* Links Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left Section: Links */}
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-sm"
              >
                Contact Us
              </a>
            </div>
  
            {/* Right Section: Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.56v14.91c0 .97-.79 1.76-1.76 1.76H1.76C.79 21.23 0 20.44 0 19.47V4.56C0 3.59.79 2.8 1.76 2.8h20.48c.97 0 1.76.79 1.76 1.76zM9.6 18.24V9.6H7.2v8.64h2.4zm-1.2-9.84c.84 0 1.44-.6 1.44-1.44-.02-.84-.6-1.44-1.44-1.44-.84 0-1.44.6-1.44 1.44 0 .84.6 1.44 1.44 1.44zm10.08 9.84v-4.8c0-2.52-1.44-3.6-3.36-3.6-1.56 0-2.28.84-2.64 1.44v-1.2H10.8v8.64h2.4v-4.32c0-1.2.24-2.4 1.68-2.4 1.44 0 1.44 1.32 1.44 2.4v4.32h2.4z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.23 5.924c-.806.358-1.67.6-2.577.708a4.515 4.515 0 001.98-2.49 9.02 9.02 0 01-2.86 1.09 4.51 4.51 0 00-7.69 4.11 12.81 12.81 0 01-9.3-4.71 4.51 4.51 0 001.39 6.02 4.49 4.49 0 01-2.04-.56v.06a4.51 4.51 0 003.62 4.42 4.52 4.52 0 01-2.04.08 4.51 4.51 0 004.21 3.13 9.05 9.05 0 01-5.6 1.93c-.36 0-.72-.02-1.08-.06a12.78 12.78 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84 0-.2 0-.39-.01-.58a9.17 9.17 0 002.26-2.34z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.61 8.09 8.2 9.36v-6.61h-2.47v-2.75h2.47v-2.1c0-2.45 1.5-3.78 3.67-3.78 1.06 0 2.17.19 2.17.19v2.38h-1.22c-1.2 0-1.57.75-1.57 1.52v1.79h2.68l-.43 2.75h-2.25v6.61c4.59-1.27 8.2-4.95 8.2-9.36 0-5.5-4.46-9.96-9.96-9.96z" />
                </svg>
              </a>
            </div>
          </div>
  
          {/* Copyright Section */}
          <div className="text-center mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
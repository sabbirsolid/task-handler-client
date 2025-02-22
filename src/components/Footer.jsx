const Footer = () => {
  return (
    <footer className="bg-gray-900 shadow-md mt-auto py-6">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Left Section: Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-white font-semibold text-lg">Task Handler</h2>
          <p className="text-gray-400 text-sm mt-2">
            Streamline your workflow and boost productivity effortlessly.
          </p>
        </div>

        {/* Middle Section: Links */}
        <div className="flex flex-col items-center">
          <a
            href="#"
            className="text-gray-400 hover:text-blue-400 transition-all text-sm mb-2"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-blue-400 transition-all text-sm mb-2"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-blue-400 transition-all text-sm"
          >
            Contact Us
          </a>
        </div>

        {/* Right Section: Social Media */}
        <div className="flex justify-center md:justify-end space-x-4">
          <a
            href="https://www.linkedin.com"
            className="text-gray-400 hover:text-blue-400 transition-all"
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
            href="https://www.x.com"
            className="text-gray-400 hover:text-blue-400 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com"
            className="text-gray-400 hover:text-blue-400 transition-all"
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
      <div className="text-center mt-6 border-t border-gray-700 pt-4">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">Task Handler</span> | All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

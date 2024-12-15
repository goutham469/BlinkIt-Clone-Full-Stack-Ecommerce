import React from 'react';

function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="issue" className="block text-sm font-medium text-gray-700">Issue</label>
            <textarea
              id="issue"
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Describe your issue"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-3">Follow us on:</p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-700"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-red-600 hover:text-red-800"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;

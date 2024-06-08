import Link from "next/link";

// pages/success.js
export default function Success() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center my-auto">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800">Payment Successful</h1>
        <p className="mt-4 text-gray-600">
          Thank you for your payment! Your transaction was successful.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-primary rounded-md hover:bg-primary-dark"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

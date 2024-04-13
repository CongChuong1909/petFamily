import React from "react";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/path/to/error-image.png" alt="Error" className="w-48 h-48 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h1>
      <p className="text-gray-600">We're sorry, but an error occurred while processing your request.</p>
    </div>
  );
}

export default ErrorPage;

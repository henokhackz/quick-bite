"use client";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md max-w-lg w-full">
        <div className="flex items-center space-x-3">
          {/* Error Icon */}
          <svg
            className="w-6 h-6 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 9V5.25m0 9v3.75M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z"
            />
          </svg>
          {/* Error Message */}
          <span className="text-base font-semibold">{message}</span>
        </div>
      </div>
    </div>
  );
};

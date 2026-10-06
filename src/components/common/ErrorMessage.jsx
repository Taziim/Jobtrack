import { AlertCircle, RefreshCw } from "lucide-react";

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex min-h-[400] items-center justify-center">
      <div className="max-w-md rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
        <AlertCircle size={40} className="mx-auto text-red-500" />

        <h2 className="mt-4 text-lg font-semibold text-slate-800">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-slate-500">{message}</p>

        <button
          onClick={onRetry}
          className="mt-6 flex mx-auto items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;

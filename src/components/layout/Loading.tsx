const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#E3ECF5]">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-12 w-12 text-blue-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l1.5-1.5c.58.35 1.2.65 1.8 1.001L6 17.291z"
          ></path>
        </svg>
        <p className="text-blue-500 text-xl font-semibold">Chargement...</p>
      </div>
    </div>
  );
};

export default Loading;

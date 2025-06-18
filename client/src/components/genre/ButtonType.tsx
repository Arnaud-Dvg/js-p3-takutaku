function ButtonType() {
  return (
    <div>
      <button
        type="button"
        className="relative group transition-all duration-200 focus:overflow-visible w-[150px] py-2 overflow-hidden flex flex-row items-center justify-center bg-secondary gap-2 rounded-full font-semibold text-sm"
      >
        <span>TYPE</span>
        <svg
          className="rotate-90 group-focus:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <title>Expand genre options</title>
          <path
            fill="currentColor"
            d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
          />
        </svg>
        <div className="absolute -bottom-10 left-0 w-full h-max p-2 bg-secondary rounded-lg flex flex-col gap-2" />
      </button>
    </div>
  );
}

export default ButtonType;

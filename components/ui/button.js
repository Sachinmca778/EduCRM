export function Button({ children, className = "", variant = "primary", size = "base" }) {
  const base = "rounded-lg px-4 py-2 font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };
  const sizes = {
    base: "text-base",
    sm: "text-sm px-3 py-1.5",
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
}

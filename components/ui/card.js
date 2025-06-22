export function Card({ className = "", children }) {
  return (
    <div className={`rounded-2xl bg-white/70 backdrop-blur shadow-xl border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

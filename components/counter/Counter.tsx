function Counter() {
  const count = 0;
  return (
    <nav className="bg-slate-300 py-2 text-center text-xl text-black">
      <div>
        All-time Visitors:{` `}
        <span className="font-semibold">{count}</span>
      </div>
    </nav>
  );
}

export default Counter;

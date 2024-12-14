async function Counter() {
  try {
    const visitorCount = await fetch(
      'https://api.awsjameslo.com/getCounter?website_name=awsjameslo&website_id=0',
      { cache: 'no-store' }
    );
    const count = await visitorCount.json();

    const res = await fetch('https://api.awsjameslo.com/incrementCounter', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({
        website_name: 'awsjameslo',
        website_id: 0,
        total_visitors: count,
      }),
    });
    const data = await res.json();
    const { total_visitors } = data.Item;

    return (
      <nav className="bg-slate-300 py-2 text-center text-xl text-black">
        <div>
          All-time Visitors:{` `}
          <span className="font-semibold">
            {total_visitors ? total_visitors : count}
          </span>
        </div>
      </nav>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Counter;

'use client';
import React, { useState, useEffect } from 'react';

async function fetchVisitorCount(rds: boolean) {
  const query = rds
    ? 'https://api.awsjameslo.com/rdsGetCounter?website_name=awsjameslo&website_id=0'
    : 'https://api.awsjameslo.com/getCounter?website_name=awsjameslo&website_id=0';
  const response = await fetch(`${query}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  const data = await response.json();
  console.log(data);
  return data;
}

async function incrementVisitorCount(count: number, rds: boolean) {
  const query = rds
    ? 'https://api.awsjameslo.com/rdsIncrementCounter'
    : 'https://api.awsjameslo.com/incrementCounter';
  const response = await fetch(`${query}`, {
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

  const data = await response.json();
  return rds ? data : data.total_visitors;
}

function Counter() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function updateCount() {
      try {
        const currentCount = await fetchVisitorCount(false);
        if (currentCount !== count) {
          const updatedCount = await incrementVisitorCount(currentCount, false);
          setCount(updatedCount || count);
        }
      } catch (err) {
        console.error(err);
        setError('Unable to load visitor count');
      }
    }
    if (count === null) {
      updateCount();
    }
  }, [count]);

  return (
    <nav className="bg-slate-300 py-2 text-center text-xl text-black">
      <div>
        {error ? (
          <span className="font-semibold text-red-500">{error}</span>
        ) : (
          <>
            All-Time Visitors:{` `}
            <span className="font-semibold">
              {count ? count : 'Loading...'}
            </span>
          </>
        )}
      </div>
    </nav>
  );
}

export default Counter;

// Server-side
// async function Counter() {
//   try {
//     const visitorCount = await fetch(
//       'https://api.awsjameslo.com/getCounter?website_name=awsjameslo&website_id=0',
//       { cache: 'no-store' }
//     );
//     const count = await visitorCount.json();

//     const res = await fetch('https://api.awsjameslo.com/incrementCounter', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       cache: 'no-store',
//       body: JSON.stringify({
//         website_name: 'awsjameslo',
//         website_id: 0,
//         total_visitors: count,
//       }),
//     });
//     const data = await res.json();
//     const { total_visitors } = data.Item;

//     return (
//       <nav className="bg-slate-300 py-2 text-center text-xl text-black">
//         <div>
//           All-time Visitors:{` `}
//           <span className="font-semibold">
//             {total_visitors ? total_visitors : count}
//           </span>
//         </div>
//       </nav>
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }

// export default Counter;

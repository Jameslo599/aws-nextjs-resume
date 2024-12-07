export default function Home() {
  return (
    <div className="h-full flex flex-col justify-center">
      <main className="max-w-[45rem] bg-slate-50 mx-auto p-8 my-8 md:rounded text-black">
        <header className="text-center">
          <h1 className="text-3xl mb-2">James Lo</h1>
          <div className="flex flex-wrap justify-center align-middle text-base">
            <a href="mailto:jameslo599@gmail.com">
              <span className="hover:text-blue-700">Jameslo599@gmail.com</span>{' '}
              |
            </a>
            <a href="jameshlo.com" target="_blank">
              &nbsp;<span className="hover:text-blue-700">Portfolio</span> |
            </a>
            <a href="tel:+2149010531">
              &nbsp;
              <span className="hover:text-blue-700">(214)-901-0531</span> |{' '}
            </a>
            <a href="http://linkedin.com/in/james-h-lo" target="_blank">
              &nbsp;<span className="hover:text-blue-700">LinkedIn</span> |
            </a>
            <a href="https://github.com/Jameslo599" target="_blank">
              &nbsp;<span className="hover:text-blue-700">GitHub</span>
            </a>
          </div>
        </header>
        <section className="pt-2 text-sm">
          <h2 className="text-lg">Skills</h2>
          <div className="after:content-[''] border-t-[1px] border-black"></div>
          <div className="pt-1">
            <span className="font-bold">Languages:&nbsp;</span>
            JavaScript, TypeScript, Python, Java, Sass, Tailwind, CSS, HTML,
            SQL, Bash
          </div>
          <div>
            <span className="font-bold">Technologies:&nbsp;</span>
            React, Next.js, Node.js, Express.js, MongoDB NoSQL, PostgreSQL,
            MySQL, Git, Linux
          </div>
          <div>
            <span className="font-bold">Certifications:&nbsp;</span>
            Amazon Web Services Certified Cloud Practitioner
          </div>
        </section>
        <section className="pt-2 text-sm">
          <h2 className="text-lg">Experience</h2>
          <div className="after:content-[''] border-t-[1px] border-black"></div>
          <div className="relative pt-1">
            <span className="font-bold">Software Developer,&nbsp;</span>
            Universal Associates - Dallas, Texas&nbsp;
            <span className="sm:absolute right-0">Jan 2023 - Present</span>
          </div>
          <ul className="list-disc ml-5">
            <li>
              Increase client revenue by 10% from optimizing and debugging
              websites built with React and Express.
            </li>
            <li>
              Deploy 20+ custom websites across various industries, achieving
              100% client satisfaction.
            </li>
            <li>
              Boost SEO rankings for a 25% increase in organic traffic using
              technical best practices and web architecture.
            </li>
            <li>
              Manage full stack and frontend development using modern frameworks
              such as React and Express.
            </li>
            <li>
              Manage E2E deployment and maintain database with SQL and
              PostgreSQL.
            </li>
          </ul>
          <div className="relative pt-1">
            <span className="font-bold">Network Administrator,&nbsp;</span>
            Zen Sushi & Grill – McKinney, Texas&nbsp;
            <span className="sm:absolute right-0">Jan 2022 – Jan 2023</span>
          </div>
          <ul className="list-disc ml-5">
            <li>
              Developed website front-end using JavaScript and improved overall
              network performance by 30%.
            </li>
            <li>
              Reduced IT costs by 20% through better vendor contracts and
              consolidating internet and phone services.
            </li>
            <li>
              Streamlined orders by 25% after implementing networked POS systems
              and cloud-based management tools.
            </li>
            <li>
              Trained and mentored 5+ staff members on network troubleshooting
              and basic IT tasks.
            </li>
          </ul>
        </section>
        <section className="pt-2 text-sm">
          <h2 className="text-lg">Projects</h2>
          <div className="after:content-[''] border-t-[1px] border-black"></div>
          <div className="relative pt-1">
            <span className="font-bold">Banking Pentest Environment&nbsp;</span>
            <a
              className="sm:absolute right-0"
              href="resilientcoda.com"
              target="_blank"
            >
              resilientcoda.com
            </a>
          </div>
          <ul className="list-disc ml-5">
            <li>
              Developed a robust testing environment to train application
              security and threat hunting.
            </li>
            <li>
              Strengthened application security through server-side validation
              for frontend forms.
            </li>
            <li>
              Developed RESTful API using Node.js and cloud-based MongoDB for
              efficient data communication.
            </li>
            <li>
              Followed MVC principles to separate concerns and improve
              maintainability for React and Express frameworks
            </li>
            <li>
              Integrated a React chatbot for future machine learning projects.
            </li>
            <li>
              Added a secure password reset feature that writes to database.
            </li>
            <li>
              Media uploads are handled by Cloudinary’s artificial intelligence
              architecture.
            </li>
          </ul>
          <div className="relative pt-1">
            <span className="font-bold">Tarot Reader&nbsp;</span>
            <a
              className="absolute right-0"
              href="tarot-api.up.railway.app"
              target="_blank"
            >
              tarot-api.up.railway.app
            </a>
          </div>
          <ul className="list-disc ml-5">
            <li>
              Efficiently handled CRUD operations using Express framework and
              NoSQL MongoDB.
            </li>
            <li>
              Utilized JavaScript and client-side rendering to achieve
              asynchronous updates and faster load times.
            </li>
            <li>
              Implemented encrypted cloud-based session-storage for secure
              authentication.
            </li>
            <li>
              Designed an intuitive and seamless UI with Tailwind to reduce
              bounce rates.
            </li>
            <li>
              Developed feature for writing tarot readings onto MongoDB for long
              term access.
            </li>
          </ul>
        </section>
        <section className="pt-2 text-sm">
          <h2 className="text-lg">Education</h2>
          <div className="after:content-[''] border-t-[1px] border-black"></div>
          <div className="relative">
            <span className="font-bold">
              University of Texas at Austin&nbsp;
            </span>
            – Bachelor of Science in Biochemistry; Minor in Chinese
          </div>
        </section>
      </main>
    </div>
  );
}

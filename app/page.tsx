export default function Home() {
  return (
    <div className="h-full flex flex-col justify-center">
      <main className="max-w-[45rem] bg-slate-50 mx-auto p-8 my-8 md:rounded text-black">
        <header className="text-center">
          <h1 className="text-3xl mb-2">James Lo</h1>
          <div className="flex flex-wrap justify-center align-middle text-base">
            <a href="mailto:jameslo599@gmail.com">
              <span className="hover:text-blue-700">Email</span> |
            </a>
            <a href="https://jameshlo.com" target="_blank">
              &nbsp;<span className="hover:text-blue-700">Portfolio</span> |
            </a>
            <a href="tel:+2149010531">
              &nbsp;
              <span className="hover:text-blue-700">Phone</span> |{' '}
            </a>
            <a href="https://linkedin.com/in/james-h-lo" target="_blank">
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
            React, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, MySQL,
            Git, Linux
          </div>
          <div>
            <span className="font-bold">Certifications:&nbsp;</span>
            AWS Solutions Architect Associate, AWS Certified Cloud Practitioner
          </div>
        </section>
        <section className="pt-2 text-sm">
          <h2 className="text-lg">Experience</h2>
          <div className="after:content-[''] border-t-[1px] border-black"></div>
          <div className="relative pt-1">
            <span className="font-bold">Software Developer,&nbsp;</span>
            Universal Associates - Dallas, Texas&nbsp;
            <span className="sm:absolute right-0">April 2023 - Present</span>
          </div>
          <ul className="list-disc ml-5">
            <li>
              Deployed 20+ custom websites built on serverless AWS architecture
              that are highly scalable and resilient.
            </li>
            <li>
              Achieved 0 incidents of app downtime from DDoS and common attacks
              with AWS Shield Adv. and WAF.
            </li>
            <li>
              Reduced monthly client expenses by 40% with AWS Cost Explorer and
              CloudWatch metrics.
            </li>
            <li>
              Managed full stack and frontend development using modern
              frameworks such as Next,js, React and Express.
            </li>
            <li>
              Implemented CI/CD pipelines with Terraform and used E2E testing
              with Cypress for 20% faster development.
            </li>
          </ul>
        </section>
        <section className="pt-2 text-sm">
          <h2 className="text-lg">Projects</h2>
          <div className="after:content-[''] border-t-[1px] border-black"></div>
          <div className="relative pt-1">
            <span className="font-bold">
              Capture-the-Flag Bank Platform&nbsp;
            </span>
            <a
              className="sm:absolute right-0 hover:text-blue-700"
              href="https://resilientcoda.com"
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
              className="absolute right-0 hover:text-blue-700"
              href="https://tarot-api.up.railway.app"
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
              Western Governors University&nbsp;
            </span>
            – Bachelor of Science in Computer Science
            <span className="absolute right-0">Exp. Graduation: Dec. 2025</span>
          </div>
        </section>
      </main>
    </div>
  );
}

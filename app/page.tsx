export default function Home() {
  return (
    <main className="min-w-64 w-[45rem] bg-slate-50 mx-auto p-8 my-8 rounded">
      <header className="text-center">
        <h1 className="text-3xl mb-2">James Lo</h1>
        <div className="flex justify-center align-middle text-sm">
          <a href="mailto:jameslo599@gmail.com">
            <span className="hover:text-blue-700">Jameslo599@gmail.com</span> |
          </a>
          <a href="jameshlo.com" target="_blank">
            &nbsp;<span className="hover:text-blue-700">Portfolio</span> |
          </a>
          <a href="tel:+2149010531">
            &nbsp;
            <span className="hover:text-blue-700">
              (214) - 901 - 0531
            </span> |{' '}
          </a>
          <a href="http://linkedin.com/in/james-h-lo" target="_blank">
            &nbsp;<span className="hover:text-blue-700">LinkedIn</span> |
          </a>
          <a href="https://github.com/Jameslo599" target="_blank">
            &nbsp;<span className="hover:text-blue-700">GitHub</span>
          </a>
        </div>
      </header>
      <section className="py-2 text-sm">
        <h2 className="text-lg">Skills</h2>
        <div className="after:content-[''] border-t-[1px] border-black"></div>
        <div>
          <span className="font-bold">Languages:&nbsp;</span>
          JavaScript, TypeScript, Python, Java, Sass, Tailwind, CSS, HTML, SQL,
          Bash
        </div>
        <div>
          <span className="font-bold">Technologies:&nbsp;</span>
          React, Next.js, Node.js, Express.js, MongoDB NoSQL, PostgreSQL, MySQL,
          Git, Linux
        </div>
        <div>
          <span className="font-bold">Certifications:&nbsp;</span>
          Amazon Web Services Certified Cloud Practitioner
        </div>
      </section>
      <section className="py-2 text-sm">
        <h2 className="text-lg">Experience</h2>
        <div className="after:content-[''] border-t-[1px] border-black"></div>
        <div className="relative">
          <span className="font-bold">Software Developer,&nbsp;</span>
          Universal Associates - Dallas, Texas
          <span className="absolute right-0">Jan 2023 - Present</span>
        </div>
        <ul className="list-disc ml-5">
          <li>fe</li>
          <li>fe</li>
          <li>fe</li>
          <li>fe</li>
          <li>fe</li>
        </ul>
      </section>
      <section className="py-2 text-sm">
        <h2 className="text-lg">Projects</h2>
        <div className="after:content-[''] border-t-[1px] border-black"></div>
        <div className="relative">
          <span className="font-bold">Banking Pentest Environment&nbsp;</span>
          <a
            className="absolute right-0"
            href="resilientcoda.com"
            target="_blank"
          >
            resilientcoda.com
          </a>
        </div>
        <ul className="list-disc ml-5">
          <li>fe</li>
          <li>fe</li>
          <li>fe</li>
          <li>fe</li>
          <li>fe</li>
        </ul>
      </section>
      <section className="py-2 text-sm">
        <h2 className="text-lg">Education</h2>
        <div className="after:content-[''] border-t-[1px] border-black"></div>
        <div className="relative">
          <span className="font-bold">University of Texas at Austin&nbsp;</span>
          – Bachelor of Science in Biochemistry; Minor in Chinese
        </div>
      </section>
    </main>
  );
}

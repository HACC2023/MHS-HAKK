
<h1 align="center">HelpCare by MHS-HAKK

<h3 align="center">
<img src="https://img.shields.io/badge/vercel_build-success-light_green?logo=vercel
" alt="vercel build"/>
<img src="https://img.shields.io/badge/node.js-20.9.0-026e00?logo=nodedotjs
" alt="node.js version"/>
<img src="https://img.shields.io/badge/next.js-14.0.2-000?logo=nextdotjs
" alt="next.js version"/>
<a href="https://mhs-hakk.vercel.app"><img src="https://img.shields.io/badge/mhs--hakk.vercel.app-blue
" alt="website"/></a>

## Why HelpCare?

HelpCare compiles Hawaii’s affordable healthcare options so you can find the care you need. Accessible on both desktop and mobile. **We advise your system theme to be on light mode as a dark mode is being developed for our app.**

### Search Filters

- Insurance type:
  - Med-QUEST insured (covered healthcare for Med-QUEST eligible) &mdash; Has doctor information
  - FQHC (has “sliding fee scale”) &mdash; Has sliding scale description
- Hospital name/address
- Procedure type

### Features

- Centers appear on our search page map
- Each result has a link for specific center information
- Information compiled on over 100 clinics on Oahu
- Each review page contains tags of supported procedures
- Tagging system is crowdsourced and will grow based on user needs and input
- Clicking on clinic brings up more information and directions
- Med-QUEST eligibility button takes you to Med-QUEST Eligibility page

### Services and Tools

- **MongoDB**, a NoSQL document database, served as our primary data storage solution. We used it to store and manage data about healthcare services, including details about the service providers and their locations. It allowed us to handle diverse data types and efficiently query large volumes of data which are present in any healthcare application.
- **Node.js**, a JavaScript runtime environment, was used for building the server-side part of our application. It allowed us to write JavaScript that the client would not see, and preemptively manage packages and their dependencies, which was crucial for interacting with MongoDB to fetch and update healthcare services data.
- We used **Vercel** as our web server platform. It provided a seamless deployment experience with a focus on frontend frameworks like Next.js and serverless functions such as tRPC. Because of the fast-paced nature of this competition, Vercel was instrumental in ensuring that continuous integration and deployment principles were adhered to.
- **Tailwind CSS**, a CSS framework, was used for styling our website. It allowed us to rapidly build modern designs directly in our markup as well as ensured consistency throughout our application. **DaisyUI**, which is based on Tailwind, was used for creating intuitive user interface components for our users. These components of our UI additionally ensure maintainability in the event that we extend the functionality of the app.
- **Next.js**, a React-based framework, was used for both server-rendered and static applications. It provided features like hybrid static and server rendering, TypeScript support, site pre-fetching, creation of API routes for fetching data from MongoDB, and more. It was instrumental in building HelpCare, as the time it takes to access a healthcare service is critical.
- We leveraged **tRPC** as our end-to-end typesafe API toolkit, which was used in conjunction with Next.js for creating APIs. It established type safety when passing data between the frontend and our MongoDB database, making our development process more robust and secure.
- **Prisma**, an open-source database toolkit, was used as the database API. It served as an Object-Relational Mapping (ORM) layer, allowing us to interact in a structured and intuitive manner with our MongoDB database using JavaScript.

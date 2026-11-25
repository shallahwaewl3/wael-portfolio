export const navLinks = ['Home', 'About', 'Services', 'Projects', 'Contact'];

export const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Completed' },
  { value: '10+', label: 'Happy Clients' },
  { value: '100%', label: 'Client Satisfaction' },
];

export const socials = [
  { label: 'GitHub', icon: 'GH' },
  { label: 'LinkedIn', icon: 'in' },
  { label: 'Twitter', icon: 'X' },
  { label: 'Email', icon: '@' },
];

export const techStack = [
  { title: 'Next.js' },
  { title: 'React' },
  { title: 'TypeScript' },
  { title: 'Tailwind CSS' },
  { title: 'Responsive Design' },
  { title: 'SEO' },
];

export const services = [
  {
    title: 'Web Development',
    icon: 'code',
    text: 'Custom websites and web applications using Next.js, React, and modern technologies.',
    details: 'From landing pages to full dashboards, I build clean, scalable interfaces with reusable components and production-ready structure.',
  },
  {
    title: 'UI/UX Implementation',
    icon: 'ui',
    text: 'Pixel-perfect implementation of responsive, accessible, and polished interfaces.',
    details: 'I turn designs into smooth interfaces with strong spacing, responsive states, accessibility, and careful visual polish.',
  },
  {
    title: 'Performance Optimization',
    icon: 'speed',
    text: 'Speed up your website for better Core Web Vitals, SEO ranking, and user experience.',
    details: 'I optimize rendering, images, bundles, caching, and page structure so the experience feels fast on real devices.',
  },
  {
    title: 'Deployment & Hosting',
    icon: 'cloud',
    text: 'Deploy and manage applications on Vercel, Netlify, or your preferred hosting.',
    details: 'I set up production deploys, domains, environment variables, previews, and the details that keep releases stable.',
  },
  {
    title: 'E-Commerce Websites',
    icon: 'shop',
    text: 'Online stores with product pages, carts, checkout flows, and clean shopping experiences.',
    details: 'I build store experiences that make browsing, filtering, cart updates, and checkout feel simple and trustworthy.',
  },
  {
    title: 'API Integration',
    icon: 'api',
    text: 'Connect websites to payments, CRMs, dashboards, forms, maps, and third-party services.',
    details: 'I wire frontend experiences to reliable data flows, handle loading states, validation, errors, and secure configuration.',
  },
  {
    title: 'Landing Pages',
    icon: 'rocket',
    text: 'High-impact pages for services, products, launches, and personal brands.',
    details: 'I create sharp first screens, focused sections, clear calls to action, and responsive layouts built for conversion.',
  },
  {
    title: 'Maintenance & Support',
    icon: 'tools',
    text: 'Fix bugs, improve layouts, update content, and keep websites fresh and stable.',
    details: 'I help keep existing sites healthy through improvements, cleanup, small features, and dependable technical support.',
  },
];

export const courses = [
  {
    title: 'MySQL',
    provider: 'IUST University',
    icon: 'SQL',
    text: 'Database fundamentals, queries, relational structure, and practical MySQL work at IUST.',
    level: 'University Course',
    image: '/image/my sql.png',
    certificate: null,
  },
  {
    title: 'Web Developer',
    provider: 'IUST University',
    icon: 'WEB',
    text: 'Web development training focused on building structured, responsive, and usable websites.',
    level: 'University Course',
    image: '/image/web.png',
    certificate: null,
  },
  {
    title: 'Machine Learning',
    provider: 'New Horizons',
    icon: 'ML',
    text: 'Machine learning concepts, models, data workflows, and applied AI fundamentals.',
    level: 'Training Course',
    image: '/image/maching learing.png',
    certificate: null,
  },
  {
    title: 'Website Design & Developer',
    provider: 'Tamkeen',
    icon: 'UX',
    text: 'Website design and development training covering layouts, frontend structure, and implementation.',
    level: 'Certified Course',
    image: '/image/Attendance Frontend Wael Al Shallah.png',
    certificate: null,
  },
  {
    title: 'Web Design',
    provider: 'Informatics Association - Syria',
    icon: 'DES',
    text: 'Web design training focused on interface structure, visual layout, and responsive page design.',
    level: 'Certified Course',
    image: '/image/web.png',
    certificate: null,
  },
];

// data/portfolio.js

export const projects = [
  {
    title: 'Motion  Zone',
    text: 'A modern web platform with polished pages, responsive UI, and smooth user-focused interactions.',
    tags: ['Next.js', 'React', 'Responsive UI'],
    type: 'mozing',
    video: '/video/movie.webm',
    sections: ['Landing', 'Services', 'Contact'],
  },
  {
    title: 'Driving Training Platform',
    text: 'A full driving training system divided into students, offices, and super admin dashboards.',
    tags: ['Dashboard', 'Roles', 'Admin Panel'],
    type: 'driving',
    video: '/video/driver.webm',
    // هذا المشروع ليس له فيديو، سيظهر الـ Fallback تلقائياً
    sections: ['Students', 'Offices', 'Super Admin'],
  },
  {
    title: 'Hotel Management Project',
    text: 'A hotel project experience for rooms, reservations, listings, and clean management flows.',
    tags: ['Booking', 'Rooms', 'Management'],
    type: 'hotels',
    // ⬇️ ضع هنا الرابط المباشر الخارجي للفيديو الثاني ⬇️
    video: '/video/hotel.webm',
    sections: ['Rooms', 'Reservations', 'Dashboard'],
  },
];


export const contactInfo = [
  { title: 'Email', text: 'waelshalah1@gmail.com', icon: 'email' },
  { title: 'Phone', text: '0984194546', icon: 'phone' },
];

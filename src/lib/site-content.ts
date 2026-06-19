import type {
  NavEntry,
  UseCaseCard,
  Testimonial,
  IntegrationLogo,
  FooterColumn,
} from "@/types";

const IMG = "/images";

// ── Navigation ──────────────────────────────────────────────────────────────

export const NAV_LEFT: NavEntry[] = [
  {
    kind: "link",
    label: "About Us",
    href: "/about",
  },

  // ── Our Solutions — PlatformPanel (featured + product grid + sidebar + CTA) ──
  {
    kind: "dropdown",
    label: "Our Solutions",
    featured: [
      {
        title: "One cloud partner for everything Microsoft",
        desc: "Azure, Dynamics 365, M365 & Power BI — delivered and managed end-to-end by certified experts.",
        href: "/solutions/azure",
        cta: "Explore all solutions",
        image: `${IMG}/67ab3c4021d804a41524c47a_Find-out-why.avif`,
      },
    ],
    columns: [
      {
        style: "cards",
        links: [
          { label: "Microsoft Azure", href: "/solutions/azure", desc: "Cloud infrastructure, migration, VDI, and managed Azure services" },
          { label: "Dynamics 365", href: "/solutions/dynamics-365", desc: "ERP & CRM applications, implemented and supported end-to-end" },
        ],
      },
      {
        style: "cards",
        links: [
          { label: "Microsoft 365 (M365)", href: "/solutions/m365", desc: "Modern Workplace — Teams, SharePoint, Exchange, and security" },
          { label: "Power BI", href: "/solutions/power-bi", desc: "Business intelligence, dashboards, and AI-powered analytics" },
        ],
      },
    ],
    sidebar: {
      heading: "Quick links",
      style: "arrows",
      links: [
        { label: "About CloudSwift", href: "/about" },
        { label: "All services", href: "/services" },
        { label: "Managed Cloud", href: "/managed-cloud" },
        { label: "Contact us", href: "/contact" },
      ],
    },
    sideCta: {
      heading: "ISO 9001-2015 certified",
      desc: "Quality-assured delivery and continuous improvement across every engagement.",
      href: "/about",
      cta: "About us",
      image: `${IMG}/69b7b61dea50cceb16ee6859_Cube.svg`,
    },
  },

  // ── Our Services — SolutionPanel (2 featured cards + sidebar) ────────────────
  {
    kind: "dropdown",
    label: "Our Services",
    featured: [
      {
        title: "End-user & systems support",
        desc: "Help desk, deskside, collaboration, servers, storage, and database management",
        href: "/services",
        cta: "View services",
      },
      {
        title: "Advisory & project services",
        desc: "Security assessments, infrastructure design, migrations, and system integration",
        href: "/services",
        cta: "View services",
      },
    ],
    sidebar: {
      heading: "Service areas",
      style: "arrows",
      links: [
        { label: "Network support", href: "/services#network" },
        { label: "Business uptime", href: "/services#uptime" },
        { label: "Advisory services", href: "/services#advisory" },
        { label: "Project services", href: "/services#projects" },
        { label: "All services", href: "/services" },
      ],
    },
  },

  // ── Managed Cloud — SolutionPanel (2 featured cards + sidebar) ───────────────
  {
    kind: "dropdown",
    label: "Managed Cloud",
    featured: [
      {
        title: "Public, Private & Hybrid Cloud",
        desc: "AWS, Azure, Google Cloud, VMware, HyperV, and OpenStack — all managed by certified engineers",
        href: "/managed-cloud",
        cta: "Explore",
      },
      {
        title: "Cloud Security & Oracle Cloud",
        desc: "Network security, backup & DR, compliance monitoring, and full Oracle Cloud managed services",
        href: "/managed-cloud",
        cta: "Explore",
      },
    ],
    sidebar: {
      heading: "Our plans",
      headingDesc: "Simple, transparent pricing",
      style: "arrows",
      links: [
        { label: "Silver — $29.99/mo", href: "/managed-cloud" },
        { label: "Gold — $39.99/mo", href: "/managed-cloud" },
        { label: "Platinum — $79.99/mo", href: "/managed-cloud" },
        { label: "Compare all plans", href: "/managed-cloud" },
      ],
    },
  },
];

export const NAV_RIGHT: NavEntry[] = [
  {
    kind: "link",
    label: "Contact Us",
    href: "/contact",
  },
];

// ── Hero ─────────────────────────────────────────────────────────────────────

export const HERO = {
  eyebrow: "ISO 9001-2015 Certified · Microsoft Azure Partner",
  title: ["Expert Cloud & IT", "Managed Services"],
  body: "CloudSwift helps businesses across India build the commercial and technical foundation for a secure, cloud-first digital transformation — from Azure migration and Microsoft 365 to 24/7 managed cloud support.",
  cta: "Book Your Free Assessment",
  bgPattern: `${IMG}/69b24769f54646d072d97675_bg-img-rd.svg`,
  creasePattern: `${IMG}/69b00e92c91512818f044bb4_Crease-pattern.svg`,
  hexStack: `${IMG}/hero-hexstack.svg`,
};

// ── Partner / customer logos ──────────────────────────────────────────────────

export const LOGOS_HEADING = "Our technology partnerships";

export const CUSTOMER_LOGOS: IntegrationLogo[] = [
  { name: "Microsoft Azure", src: `${IMG}/67af50186dd95e39e500397d_Azure.avif` },
  { name: "AWS", src: `${IMG}/67af515166af75041ff49c3a_AWS.avif` },
  { name: "Google Cloud", src: `${IMG}/67af50187402157c6e133dc4_Google-cloud.avif` },
  { name: "VMware", src: `${IMG}/67af5019fcd4580eb3c45e05_VMware-cloud.avif` },
  { name: "vSphere", src: `${IMG}/67af5019264a42cf76611a87_vSphere.avif` },
  { name: "Kubernetes", src: `${IMG}/67af501938bae48e91bd3d25_Kubernetes.avif` },
  { name: "AKS", src: `${IMG}/67af515101a9968ad9f0e13c_AKS.avif` },
  { name: "AWS EKS", src: `${IMG}/67af51514560f09e1fe50d9b_AWS-EKS.avif` },
  { name: "Grafana", src: `${IMG}/67af5151a967ed79e69b5343_Grafana.avif` },
  { name: "Prometheus", src: `${IMG}/67af50185cd9ca6c522a65e7_Prometheus.avif` },
];

// ── ISO certification / consulting highlight ──────────────────────────────────

export const MIGRATION = {
  title: "ISO 9001-2015 certified cloud partner",
  body: "CloudSwift holds ISO 9001-2015 certification — reflecting our commitment to quality management, consistent service delivery, and continuous improvement across every engagement.",
  cta: "Learn about our approach",
  image: `${IMG}/67ab3c4021d804a41524c47a_Find-out-why.avif`,
};

// ── What we do ───────────────────────────────────────────────────────────────

export const WHAT_WE_DO = {
  heading: "What we do",
  paragraphs: [
    "Cloud adoption is accelerating across India — but without the right expertise, complexity and cost can spiral quickly. Many organisations struggle to align their cloud strategy with measurable business outcomes.",
    "CloudSwift provides end-to-end cloud and IT infrastructure services: from planning and migration to ongoing managed support. With a team of accredited experts, we assist clients to plan, right-size, optimize, manage, and innovate their IT infrastructure throughout the entire lifecycle.",
    "Whether you're migrating workloads to Microsoft Azure, modernizing with Microsoft 365, rolling out Dynamics 365 ERP, deploying Power BI dashboards, or protecting your business with a robust BCP & DR strategy — we're your certified partner for every step of the journey.",
  ],
};

// ── Why we're different — 4 service capability tabs ──────────────────────────

export const WHY_DIFFERENT = {
  eyebrow: "Our capabilities",
  heading: "Trusted across every layer of your cloud",
  features: [
    {
      title: "Cloud Managed Services — 95%",
      body: "Multi-cloud management, service desk with ticket management, security & policy enforcement, backup & restore, database management, and proactive services — all under one roof.",
      image: `${IMG}/69afea9e8753425cb9f5798a_ai-overview-img.svg`,
    },
    {
      title: "Cloud Security — 92%",
      body: "M365 Advanced Threat Protection, Data Loss Prevention & Endpoint Security, Cloud Apps Security, and Identity & Access Management to keep your business safe.",
      image: `${IMG}/69afea9edb6d1239cfc6fc0f_why-for-ai.svg`,
    },
    {
      title: "Cloud Migration — 95%",
      body: "Lift & Shift services for apps and databases, Firewall as a Service, Elastic Load Balancers, and Simple, Elastic & Hybrid Storage — seamless migration with minimal disruption.",
      image: `${IMG}/69afea9e8753425cb9f5798a_ai-overview-img.svg`,
    },
    {
      title: "Data & Analytics — 85%",
      body: "Azure DB Services, Power BI dashboards, intelligent company reporting, and AI-powered self-service BI — turning your data into decisions.",
      image: `${IMG}/69afea9edb6d1239cfc6fc0f_why-for-ai.svg`,
    },
  ],
  cta: "Book Your Free Assessment",
  bg: `${IMG}/67aca000f44356b8986ce49f_introducing-palette-bg.svg`,
};

// ── Where can we help ─────────────────────────────────────────────────────────

export const WHERE_HEADING = "Where can we help you today?";
export const WHERE_CARDS: UseCaseCard[] = [
  {
    variant: 1,
    title: "Cloud Managed Services",
    bullets: [
      "Multi-cloud management across AWS, Azure, and Google Cloud",
      "24/7 service desk with full ticket management",
      "Proactive monitoring, backup, and database management",
    ],
    linkLabel: "Explore managed services",
    linkHref: "/managed-cloud",
  },
  {
    variant: 2,
    title: "Microsoft Solutions",
    bullets: [
      "Azure infrastructure, Dynamics 365 ERP/CRM, and M365 Modern Workplace",
      "Power BI dashboards and self-service analytics",
      "Microsoft licensing optimization and support",
    ],
    linkLabel: "Explore Microsoft solutions",
    linkHref: "/solutions/azure",
  },
  {
    variant: 4,
    title: "Cloud Security",
    bullets: [
      "M365 Advanced Threat Protection and DLP",
      "Identity & Access Management and Zero Trust",
      "Cloud Apps Security and compliance monitoring",
    ],
    linkLabel: "Strengthen your security posture",
    linkHref: "/managed-cloud#security",
  },
  {
    variant: 3,
    title: "Cloud Migration & Advisory",
    bullets: [
      "Lift & Shift migration for apps and databases",
      "Security and infrastructure assessments",
      "Design, architecture, and integration services",
    ],
    linkLabel: "Start your migration journey",
    linkHref: "/services",
  },
];

// ── Cloud modernization banner ────────────────────────────────────────────────

export const VM_BANNER = {
  title: "Ready to modernize your IT infrastructure?",
  body: "Whether you're planning your first Azure migration, rolling out Microsoft 365, or looking for a reliable managed cloud partner — CloudSwift's certified experts are ready to help.",
  cta: "Book Your Free Assessment",
};

// ── Cloud partner ecosystem ───────────────────────────────────────────────────

export const INTEGRATIONS = {
  heading: "Multi-cloud coverage, Microsoft expertise",
  body: "CloudSwift supports the full cloud ecosystem: Public Cloud (AWS, Azure, Office 365, Google), Private Cloud (VMware, HyperV, OpenStack), and Hybrid Cloud architectures. Our deepest expertise sits in the Microsoft stack — Azure, Dynamics 365, M365, and Power BI — where we hold certified partner status.",
  ctas: [
    { label: "Explore managed cloud", href: "/managed-cloud", primary: true },
    { label: "Talk to an expert", href: "/contact", primary: false },
  ],
};

export const INTEGRATION_LOGOS: IntegrationLogo[] = [
  { name: "Microsoft Azure", src: `${IMG}/67af50186dd95e39e500397d_Azure.avif` },
  { name: "AWS", src: `${IMG}/67af515166af75041ff49c3a_AWS.avif` },
  { name: "AWS EKS", src: `${IMG}/67af51514560f09e1fe50d9b_AWS-EKS.avif` },
  { name: "Google Cloud", src: `${IMG}/67af50187402157c6e133dc4_Google-cloud.avif` },
  { name: "AKS", src: `${IMG}/67af515101a9968ad9f0e13c_AKS.avif` },
  { name: "VMware Cloud", src: `${IMG}/67af5019fcd4580eb3c45e05_VMware-cloud.avif` },
  { name: "vSphere", src: `${IMG}/67af5019264a42cf76611a87_vSphere.avif` },
  { name: "Kubernetes", src: `${IMG}/67af501938bae48e91bd3d25_Kubernetes.avif` },
  { name: "Grafana", src: `${IMG}/67af5151a967ed79e69b5343_Grafana.avif` },
  { name: "Prometheus", src: `${IMG}/67af50185cd9ca6c522a65e7_Prometheus.avif` },
  { name: "Vault", src: `${IMG}/67af51513b82fe64b16bddb9_Vault.avif` },
  { name: "Rancher", src: `${IMG}/67af5018b2570b1dfff92eda_Rancher.avif` },
];

// ── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "CloudSwift helped us migrate our entire on-premise workload to Azure in a matter of weeks, with zero business disruption. Their team's expertise and communication throughout the process was exceptional.",
    author: "Rajesh Kumar",
    role: "IT Director, Financial Services",
    storyHref: "/contact",
  },
  {
    quote: "The managed services support we receive from CloudSwift has transformed how our IT team operates. Response times are fast, issues are resolved proactively, and we can focus on our business instead of infrastructure.",
    author: "Priya Nair",
    role: "Head of Technology, Healthcare Group",
    storyHref: "/contact",
  },
  {
    quote: "CloudSwift's Power BI implementation gave our leadership real-time visibility into operations for the first time. The dashboards are intuitive, accurate, and have changed how we make decisions.",
    author: "Anand Sharma",
    role: "CFO, Manufacturing Enterprise",
    storyHref: "/contact",
  },
  {
    quote: "We chose CloudSwift for our Dynamics 365 rollout because of their deep Microsoft expertise. The implementation was smooth, on time, and our team was fully trained and confident from day one.",
    author: "Meena Iyer",
    role: "Operations Manager, Retail Chain",
    storyHref: "/contact",
  },
];

// ── Main CTA ─────────────────────────────────────────────────────────────────

export const MAIN_CTA = {
  heading: "Start your cloud transformation today",
  body: "Talk to a CloudSwift expert about your infrastructure challenges. Azure migration, Microsoft 365 deployment, managed cloud, or Power BI — we'll find the right path for your business.",
  cta: "Book Your Free Assessment",
};

// ── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "G-Suite Migration", href: "/services" },
      { label: "On-Prem to Cloud", href: "/services" },
      { label: "Tenant Migration", href: "/services" },
      { label: "Data Security Implementation", href: "/managed-cloud#security" },
      { label: "D365 Implementation", href: "/solutions/dynamics-365" },
      { label: "Microsoft SharePoint", href: "/solutions/m365" },
      { label: "Managed Support", href: "/managed-cloud" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Microsoft Azure", href: "/solutions/azure" },
      { label: "Dynamics 365", href: "/solutions/dynamics-365" },
      { label: "Microsoft 365", href: "/solutions/m365" },
      { label: "Power BI", href: "/solutions/power-bi" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Managed Cloud", href: "/managed-cloud" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "+91-9606246099", href: "tel:+919606246099" },
      { label: "+91-9071416809", href: "tel:+919071416809" },
      { label: "support@oncloudswift.com", href: "mailto:support@oncloudswift.com" },
      { label: "Bengaluru, Karnataka", href: "/contact" },
      { label: "Mumbai, Maharashtra", href: "/contact" },
    ],
  },
];

import { parseProjectRecords } from "../lib/projects";
import { flagshipCaseStudies } from "./case-studies";

const checkedAt = "2026-08-18";

const projectSource = [
  {
    slug: "slatedesk",
    canonicalName: "SlateDesk",
    tier: "flagship",
    projectTypes: ["full-stack", "backend", "frontend"],
    repositoryUrl: "https://github.com/abarman079/slatedesk",
    status: "repository",
    shortSummary:
      "Assignment and submission management across Admin, Teacher, and Student workflows.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Lucide",
      "Recharts",
      ".NET 10",
      "ASP.NET Core",
      "PostgreSQL",
      "xUnit",
    ],
    functionality: [
      "Academic setup and role-specific workspaces",
      "Assignment, submission, review, grading, and results workflows",
      "Backend-enforced role and ownership authorization",
    ],
    architectureFacts: [
      "Modular monolith with separate Domain, Application, Infrastructure, and API layers",
      "Short-lived JWT access with HttpOnly refresh-token rotation",
      "PostgreSQL optimistic concurrency using xmin",
      "Background deadline processing and targeted automated tests",
    ],
    presentation: {
      variant: "architecture",
      technologyLimit: 5,
    },
    caseStudy: flagshipCaseStudies.slatedesk,
    media: [
      {
        src: "/projects/slatedesk/admin-operations-overview.webp",
        width: 1440,
        height: 837,
        alt: "SlateDesk admin workspace showing academic operations, people, classes, assignments, and submissions at a glance.",
        kind: "screenshot",
        source:
          "SlateDesk repository docs/screenshots/02-admin-dashboard.png at commit 296cd7a; demo identity sidebar cropped for privacy.",
        licenseOrPermission: "owned",
        privacyReviewed: true,
        caption: "Admin operations overview",
      },
      {
        src: "/projects/slatedesk/teacher-assignment-ledger.webp",
        width: 1440,
        height: 823,
        alt: "SlateDesk teacher assignment ledger showing a published assignment, submission count, and workflow controls.",
        kind: "screenshot",
        source:
          "SlateDesk repository docs/screenshots/04-teacher-assignment-ledger.png at commit 296cd7a; demo identity sidebar cropped for privacy.",
        licenseOrPermission: "owned",
        privacyReviewed: true,
        caption: "Teacher assignment workflow",
      },
    ],
    evidence: [
      {
        id: "slatedesk-readme",
        sourceType: "readme",
        urlOrPath: "https://github.com/abarman079/slatedesk#readme",
        supports: "Technology, functionality, security, and testing summary",
        checkedAt,
      },
      {
        id: "slatedesk-architecture",
        sourceType: "source",
        urlOrPath:
          "https://github.com/abarman079/slatedesk/blob/main/docs/architecture.md",
        supports: "Modular-monolith architecture and system boundaries",
        checkedAt,
      },
    ],
  },
  {
    slug: "framesignal",
    canonicalName: "FrameSignal",
    tier: "flagship",
    projectTypes: ["full-stack", "frontend", "backend"],
    repositoryUrl: "https://github.com/abarman079/FrameSignal",
    liveUrl: "https://frame-signal.vercel.app/",
    status: "live",
    shortSummary:
      "Decision-first movie guidance with explicit spoiler boundaries and protected editorial workflows.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Supabase Auth",
      "Row Level Security",
      "Supabase Storage",
      "Vercel",
    ],
    functionality: [
      "Verdict-first reviews and explicit spoiler boundaries",
      "Ending guides, evidence-aware theories, and mood-led discovery",
      "Watch Signal Generator and legal viewing guidance",
      "Protected editorial and administration workflows",
    ],
    architectureFacts: [
      "Separate public and administration route groups",
      "Primarily server-rendered public content with local fallback content",
      "Supabase authentication, database authorization, and managed media metadata",
    ],
    presentation: {
      variant: "editorial",
      technologyLimit: 5,
    },
    caseStudy: flagshipCaseStudies.framesignal,
    media: [
      {
        src: "/projects/framesignal/signal-card-decision-anatomy.webp",
        width: 1425,
        height: 900,
        alt: "FrameSignal decision interface showing a spoiler-aware Signal Card beside its decision anatomy.",
        kind: "screenshot",
        source:
          "Captured from the verified FrameSignal deployment at https://frame-signal.vercel.app/ on 2026-08-18 at a 1440 by 900 desktop viewport.",
        licenseOrPermission: "owned",
        privacyReviewed: true,
        caption: "Signal Card and decision anatomy",
      },
      {
        src: "/projects/framesignal/decision-first-home.webp",
        width: 1425,
        height: 900,
        alt: "FrameSignal homepage introducing verdict-first movie guidance, spoiler boundaries, and legal viewing guidance.",
        kind: "screenshot",
        source:
          "Captured from the verified FrameSignal deployment at https://frame-signal.vercel.app/ on 2026-08-18 at a 1440 by 900 desktop viewport.",
        licenseOrPermission: "owned",
        privacyReviewed: true,
        caption: "Decision-first public experience",
      },
    ],
    evidence: [
      {
        id: "framesignal-readme",
        sourceType: "readme",
        urlOrPath: "https://github.com/abarman079/FrameSignal#readme",
        supports: "Product scope, technology, and route architecture",
        checkedAt,
      },
      {
        id: "framesignal-case-study",
        sourceType: "source",
        urlOrPath:
          "https://github.com/abarman079/FrameSignal/blob/master/docs/project-case-study.md",
        supports: "Product and engineering architecture details",
        checkedAt,
      },
      {
        id: "framesignal-deployment",
        sourceType: "deployment",
        urlOrPath: "https://frame-signal.vercel.app/",
        supports: "Verified public deployment",
        checkedAt,
      },
    ],
  },
  {
    slug: "arctic-daze",
    canonicalName: "Arctic Daze",
    tier: "flagship",
    projectTypes: ["frontend"],
    repositoryUrl: "https://github.com/abarman079/arctic-daze",
    liveUrl: "https://arctic-daze-kappa.vercel.app/",
    status: "live",
    shortSummary:
      "A responsive product and editorial experience for men’s fashion and lifestyle sourcing from Malaysia to Bangladesh.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Motion",
      "GSAP",
      "Lenis",
      "Supabase",
      "Lucide React",
    ],
    functionality: [
      "Product browsing and category-led editorial presentation",
      "Account and saved-product surfaces in the source application",
      "Facebook-guided ordering workflow",
    ],
    architectureFacts: [
      "Next.js App Router application with reusable components and Supabase integration",
    ],
    presentation: {
      variant: "commerce",
      technologyLimit: 5,
    },
    caseStudy: flagshipCaseStudies["arctic-daze"],
    media: [
      {
        src: "/projects/arctic-daze/editorial-home-desktop.webp",
        width: 735,
        height: 900,
        alt: "Arctic Daze desktop interface showing its editorial navigation, typography, and Malaysia-to-Bangladesh product positioning.",
        kind: "screenshot",
        source:
          "Interface-only crop captured from the verified Arctic Daze deployment at https://arctic-daze-kappa.vercel.app/ on 2026-08-18; third-party editorial photography excluded.",
        licenseOrPermission: "owned",
        privacyReviewed: true,
        caption: "Editorial desktop composition",
      },
      {
        src: "/projects/arctic-daze/editorial-home-mobile.webp",
        width: 375,
        height: 844,
        alt: "Arctic Daze mobile homepage showing responsive navigation, editorial type, and product actions.",
        kind: "screenshot",
        source:
          "Captured from the verified Arctic Daze deployment at https://arctic-daze-kappa.vercel.app/ on 2026-08-18 at a 390 by 844 mobile viewport; no third-party photography is visible.",
        licenseOrPermission: "owned",
        privacyReviewed: true,
        caption: "Responsive mobile experience",
      },
    ],
    evidence: [
      {
        id: "arctic-package",
        sourceType: "source",
        urlOrPath:
          "https://github.com/abarman079/arctic-daze/blob/main/package.json",
        supports: "Verified application dependencies",
        checkedAt,
      },
      {
        id: "arctic-repository",
        sourceType: "repository",
        urlOrPath: "https://github.com/abarman079/arctic-daze",
        supports: "Application structure and product surfaces",
        checkedAt,
      },
      {
        id: "arctic-deployment",
        sourceType: "deployment",
        urlOrPath: "https://arctic-daze-kappa.vercel.app/",
        supports: "Verified public deployment and public product framing",
        checkedAt,
      },
      {
        id: "arctic-collections",
        sourceType: "source",
        urlOrPath:
          "https://github.com/abarman079/arctic-daze/blob/main/app/collections/page.tsx",
        supports:
          "URL-driven search and filters, responsive product grid, and server-side product discovery flow",
        checkedAt,
      },
    ],
  },
  {
    slug: "cctv-violence-detection",
    canonicalName: "CCTV Violence Anomaly Detection",
    tier: "flagship",
    projectTypes: ["ml-cv"],
    repositoryUrl:
      "https://github.com/abarman079/cctv-violence-anomaly-detection",
    status: "research",
    shortSummary:
      "An offline research pipeline comparing classical and deep-learning models for binary violence classification.",
    technologies: [
      "Python",
      "Jupyter Notebook",
      "TensorFlow",
      "Keras",
      "MobileNetV2",
      "scikit-learn",
    ],
    functionality: [
      "Binary violence and non-violence image classification",
      "Comparison of eight classical and deep-learning approaches",
      "Reproducible result tables, evaluation figures, and alert demonstrations",
    ],
    architectureFacts: [
      "Balanced 5,000-image working subset with 2,500 samples per class",
      "Frozen train, validation, and test split of 3,500, 750, and 750 images",
      "Images processed at 160 by 160 pixels",
    ],
    metrics: [
      {
        label: "F1 score",
        value: 94.97,
        unit: "%",
        modelOrSubject: "Multilayer perceptron",
        datasetContext:
          "Balanced 5,000-image working subset with 2,500 violence and 2,500 non-violence samples",
        splitOrEvaluationContext:
          "Documented 750-image frozen test split after 3,500/750/750 train/validation/test partitioning",
        limitations:
          "Offline experiment result; it does not establish production CCTV performance or real-time deployment behavior.",
        evidenceIds: ["cctv-results", "cctv-split"],
      },
      {
        label: "ROC-AUC",
        value: 99.1,
        unit: "%",
        modelOrSubject: "Multilayer perceptron",
        datasetContext:
          "Balanced 5,000-image working subset with 2,500 violence and 2,500 non-violence samples",
        splitOrEvaluationContext:
          "Documented 750-image frozen test split after 3,500/750/750 train/validation/test partitioning",
        limitations:
          "Offline experiment result; it does not establish production CCTV performance or real-time deployment behavior.",
        evidenceIds: ["cctv-results", "cctv-split"],
      },
    ],
    presentation: {
      variant: "research",
      technologyLimit: 5,
    },
    caseStudy: flagshipCaseStudies["cctv-violence-detection"],
    media: [
      {
        src: "/projects/cctv-violence-detection/research-system-architecture.webp",
        width: 1430,
        height: 782,
        alt: "Research pipeline from CCTV frame input through preprocessing, model comparison, anomaly detection, evaluation, and offline alert output.",
        kind: "diagram",
        source:
          "CCTV Violence Anomaly Detection repository results/figures/figure_14_system_architecture.png at commit b8df1af.",
        licenseOrPermission: "owned",
        privacyReviewed: true,
        caption: "Offline research and evaluation pipeline",
      },
      {
        src: "/projects/cctv-violence-detection/mobilenetv2-test-confusion-matrix.webp",
        width: 1200,
        height: 960,
        alt: "MobileNetV2 transfer-learning confusion matrix on the documented 750-image frozen test split: 342 normal and 363 anomaly samples classified correctly, with 45 errors.",
        kind: "chart",
        source:
          "CCTV Violence Anomaly Detection repository results/figures/mobilenetv2_transfer_confusion_matrix.png at commit b8df1af.",
        licenseOrPermission: "owned",
        privacyReviewed: true,
        caption: "MobileNetV2 evaluation on the frozen test split",
      },
    ],
    evidence: [
      {
        id: "cctv-readme",
        sourceType: "readme",
        urlOrPath:
          "https://github.com/abarman079/cctv-violence-anomaly-detection#readme",
        supports: "Research scope, models, preprocessing, and limitations",
        checkedAt,
      },
      {
        id: "cctv-results",
        sourceType: "result",
        urlOrPath:
          "https://github.com/abarman079/cctv-violence-anomaly-detection/blob/main/results/tables/final_model_comparison.csv",
        supports: "Final model-comparison metrics",
        checkedAt,
      },
      {
        id: "cctv-split",
        sourceType: "result",
        urlOrPath:
          "https://github.com/abarman079/cctv-violence-anomaly-detection/blob/main/results/tables/split_summary.csv",
        supports: "Dataset and frozen split context",
        checkedAt,
      },
    ],
  },
  {
    slug: "face-based-anomaly-detection",
    canonicalName: "Face-Based Anomaly Detection",
    tier: "archive",
    archiveGroup: "featured",
    projectTypes: ["ml-cv"],
    repositoryUrl:
      "https://github.com/abarman079/Face-based-anomaly-detection",
    status: "research",
    shortSummary:
      "A research comparison of supervised and anomaly-detection approaches using LFW and FaceNet embeddings.",
    technologies: [
      "Python",
      "Jupyter Notebook",
      "LFW",
      "FaceNet",
      "KNN",
      "Isolation Forest",
      "MLP",
      "Convolutional Autoencoder",
    ],
    functionality: [
      "FaceNet embedding extraction and dataset analysis",
      "Model and threshold comparison across four approaches",
      "Reconstruction, curve, and architecture diagnostics",
    ],
    architectureFacts: [
      "Uses 512-dimensional FaceNet embeddings in the documented research pipeline",
    ],
    evidence: [
      {
        id: "face-readme",
        sourceType: "readme",
        urlOrPath:
          "https://github.com/abarman079/Face-based-anomaly-detection#readme",
        supports: "Dataset, models, methodology, and limitations",
        checkedAt,
      },
      {
        id: "face-results",
        sourceType: "result",
        urlOrPath:
          "https://github.com/abarman079/Face-based-anomaly-detection/blob/main/results/tables/tables/24_final_all_four_model_results.csv",
        supports: "Final model comparison",
        checkedAt,
      },
    ],
  },
  {
    slug: "retail-data-warehouse-bi",
    canonicalName: "Retail Data Warehouse & BI",
    tier: "archive",
    archiveGroup: "featured",
    projectTypes: ["data-bi"],
    repositoryUrl: "https://github.com/abarman079/Data-Warehousing",
    status: "repository",
    shortSummary:
      "A dimensional retail warehouse and Power BI reporting project built from the Online Retail II dataset.",
    technologies: ["SQL Server", "SSMS", "Power BI", "Power Query", "DAX"],
    functionality: [
      "Data profiling, cleaning, and transformation",
      "Dimensional modeling for retail sales analysis",
      "KPI dashboards and report views",
    ],
    architectureFacts: [
      "Sales fact with date, time, customer, product, category, invoice, and country dimensions",
    ],
    evidence: [
      {
        id: "retail-readme",
        sourceType: "readme",
        urlOrPath: "https://github.com/abarman079/Data-Warehousing#readme",
        supports: "Dataset, technology, model, and report scope",
        checkedAt,
      },
      {
        id: "retail-figures",
        sourceType: "source",
        urlOrPath:
          "https://github.com/abarman079/Data-Warehousing/tree/main/docs/figures",
        supports: "Dimensional-model and transformation evidence",
        checkedAt,
      },
    ],
  },
  {
    slug: "wall-crack-detection",
    canonicalName: "Wall Crack Detection",
    tier: "archive",
    archiveGroup: "featured",
    projectTypes: ["ml-cv"],
    repositoryUrl: "https://github.com/abarman079/wallCrackWith2datasets",
    status: "research",
    shortSummary:
      "Multidataset wall-crack segmentation research comparing three encoder-based model families.",
    technologies: [
      "Python",
      "U-Net",
      "DeepLabV3+",
      "U-Net++",
      "EfficientNet-B3",
    ],
    functionality: [
      "Semantic wall-crack segmentation",
      "Empty-mask-aware and crack-only evaluation",
      "False-positive diagnostics, threshold tuning, and overlay analysis",
    ],
    architectureFacts: [
      "Compares U-Net, DeepLabV3+, and U-Net++ with EfficientNet-B3 encoders",
      "Uses frozen-split evaluation and resolution/threshold sensitivity analysis",
    ],
    evidence: [
      {
        id: "wall-readme",
        sourceType: "readme",
        urlOrPath:
          "https://github.com/abarman079/wallCrackWith2datasets#readme",
        supports: "Research design, model families, and evaluation method",
        checkedAt,
      },
      {
        id: "wall-results",
        sourceType: "result",
        urlOrPath:
          "https://github.com/abarman079/wallCrackWith2datasets/tree/main/Phase-5%20comapre",
        supports: "Final comparison artifacts",
        checkedAt,
      },
    ],
  },
  {
    slug: "travelease",
    canonicalName: "TravelEase",
    tier: "archive",
    archiveGroup: "additional",
    projectTypes: ["full-stack", "backend"],
    repositoryUrl: "https://github.com/abarman079/travelease-webApp",
    status: "repository",
    shortSummary:
      "A role-based server-rendered travel platform covering discovery, booking, demo payment, itineraries, and support.",
    technologies: [
      "PHP",
      "MySQL",
      "PDO",
      "Bootstrap",
      "JavaScript",
      "PHPMailer",
    ],
    functionality: [
      "Traveler, Agent, and Admin workflows",
      "Trip discovery, booking, demo payment, and itinerary management",
      "Notifications, support, and SMTP email workflows",
    ],
    architectureFacts: [
      "Traditional PHP server-rendered application with session authentication and role-specific areas",
    ],
    evidence: [
      {
        id: "travelease-readme",
        sourceType: "readme",
        urlOrPath:
          "https://github.com/abarman079/travelease-webApp#readme",
        supports: "Technology, role, workflow, and demo-payment scope",
        checkedAt,
      },
    ],
  },
  {
    slug: "roleboard-rbac",
    canonicalName: "RoleBoard RBAC",
    tier: "archive",
    archiveGroup: "additional",
    projectTypes: ["full-stack", "backend"],
    repositoryUrl: "https://github.com/abarman079/roleboard-rbac-task",
    status: "repository",
    shortSummary:
      "A post and comment management demonstration with role-aware server-side permission checks.",
    technologies: [
      "Next.js",
      "React",
      "JavaScript",
      "Prisma",
      "SQLite",
      "Tabler Icons",
    ],
    functionality: [
      "Post and comment management",
      "Permission demonstrations for Super Admin, Moderator, Regular User, and Guest roles",
      "Server-side API authorization checks",
    ],
    architectureFacts: [
      "The role switcher is a demonstration and not a real authentication system",
    ],
    evidence: [
      {
        id: "roleboard-readme",
        sourceType: "readme",
        urlOrPath:
          "https://github.com/abarman079/roleboard-rbac-task#readme",
        supports: "Technology, permission model, and authentication limitation",
        checkedAt,
      },
    ],
  },
  {
    slug: "pulseflow",
    canonicalName: "PulseFlow",
    tier: "archive",
    archiveGroup: "additional",
    projectTypes: ["full-stack", "backend"],
    repositoryUrl:
      "https://github.com/abarman079/PulseFlow-emergency-hospital-management-",
    status: "repository",
    shortSummary:
      "A PHP emergency-hospital application organized around patient, nurse, doctor, and administration modules.",
    technologies: ["PHP", "HTML", "CSS", "JavaScript"],
    functionality: [
      "Patient, nurse, doctor, and administration modules",
      "Authentication, dashboards, database, and AJAX areas in the repository",
    ],
    evidence: [
      {
        id: "pulseflow-repository",
        sourceType: "repository",
        urlOrPath:
          "https://github.com/abarman079/PulseFlow-emergency-hospital-management-",
        supports: "Repository technology and module structure",
        checkedAt,
        notes: "The repository does not provide enough documentation for deeper public claims.",
      },
    ],
  },
  {
    slug: "ewu-fub-energy-monitor",
    canonicalName: "EWU FUB Energy Monitor",
    tier: "archive",
    archiveGroup: "additional",
    projectTypes: ["full-stack"],
    repositoryUrl: "https://github.com/abarman079/EWU_FUB_EnergyMonitor",
    status: "repository",
    shortSummary:
      "A Flask dashboard for schedule-aware simulated building-energy telemetry and monitoring controls.",
    technologies: [
      "Python",
      "Flask",
      "SQLite",
      "APScheduler",
      "HTML",
      "CSS",
      "JavaScript",
      "Chart.js",
    ],
    functionality: [
      "Schedule-aware simulated energy telemetry",
      "Room and status views with monitoring controls",
      "API endpoints, dashboards, and background data collection",
    ],
    architectureFacts: [
      "Uses simulated telemetry and is not verified as a physical IoT deployment",
    ],
    evidence: [
      {
        id: "energy-readme",
        sourceType: "readme",
        urlOrPath:
          "https://github.com/abarman079/EWU_FUB_EnergyMonitor#readme",
        supports: "Technology, simulation status, and monitoring architecture",
        checkedAt,
      },
    ],
  },
  {
    slug: "educonsult-pro",
    canonicalName: "EduConsult Pro",
    tier: "archive",
    archiveGroup: "additional",
    projectTypes: ["full-stack"],
    repositoryUrl: "https://github.com/abarman079/EduConsult-Pro",
    status: "local",
    shortSummary:
      "A local WordPress/PHP project containing education-consultancy custom theme and plugin work.",
    technologies: ["WordPress", "PHP", "Astra child theme"],
    functionality: [
      "Custom theme and plugin structure for an education-consultancy project",
    ],
    architectureFacts: [
      "The repository contains both custom work and vendored Astra material; vendor capabilities are not attributed as custom features",
    ],
    evidence: [
      {
        id: "educonsult-repository",
        sourceType: "repository",
        urlOrPath: "https://github.com/abarman079/EduConsult-Pro",
        supports: "Local WordPress/PHP and theme/plugin repository structure",
        checkedAt,
      },
    ],
  },
] as const;

export const projects = parseProjectRecords(projectSource);

export const flagshipProjects = projects.filter(
  (project) => project.tier === "flagship",
);

export const featuredArchiveProjects = projects.filter(
  (project) => project.archiveGroup === "featured",
);

export const additionalArchiveProjects = projects.filter(
  (project) => project.archiveGroup === "additional",
);

import type { ProjectCaseStudy } from "@/types/project";

export const flagshipCaseStudies = {
  slatedesk: {
    overview:
      "SlateDesk is a full-stack assignment and submission management system with distinct Admin, Teacher, and Student workspaces. The repository keeps authorization and academic business rules authoritative in the ASP.NET Core backend.",
    evidenceIds: ["slatedesk-readme", "slatedesk-architecture"],
    blocks: [
      {
        type: "architecture",
        heading: "A modular monolith with explicit boundaries",
        introduction:
          "The repository separates the browser experience, HTTP boundary, application contracts, domain concepts, and infrastructure while keeping deployment within one application system.",
        nodes: [
          {
            label: "Next.js frontend",
            detail: "Role-specific Admin, Teacher, and Student workspaces",
          },
          {
            label: "ASP.NET Core API",
            detail: "Versioned routes, authentication, authorization, and Problem Details",
          },
          {
            label: "Application layer",
            detail: "DTOs, service interfaces, request models, and use-case contracts",
          },
          {
            label: "Domain layer",
            detail: "Entities, enums, role constants, and academic concepts",
          },
          {
            label: "Infrastructure layer",
            detail: "EF Core, Identity, workflow services, and background workers",
          },
          {
            label: "PostgreSQL",
            detail: "Migrated persistence, indexes, query filters, and xmin row versions",
          },
        ],
        relationships: [
          "The browser uses the Next.js application, which calls the versioned ASP.NET Core API.",
          "The API invokes application contracts; the application layer coordinates domain concepts and infrastructure implementations.",
          "The infrastructure layer connects persistence, authentication, and background processing to PostgreSQL.",
        ],
        evidenceIds: ["slatedesk-architecture"],
      },
      {
        type: "features",
        heading: "One academic workflow, three permission contexts",
        introduction:
          "The interface changes by role, while the API remains the authority for what each account may read or change.",
        items: [
          {
            title: "Administration",
            description:
              "Academic setup, Teacher and Student accounts, class and subject allocation, enrollment, settings, and cross-workflow visibility.",
          },
          {
            title: "Teaching",
            description:
              "Draft, publish, close, archive, review, mark, and feedback workflows for assignments owned by the Teacher.",
          },
          {
            title: "Student work",
            description:
              "Published-assignment discovery, draft answers, submission and allowed resubmission, status, marks, and feedback.",
          },
        ],
        evidenceIds: ["slatedesk-readme", "slatedesk-architecture"],
      },
      {
        type: "decisions",
        heading: "Correctness at the backend boundary",
        items: [
          "The API verifies role, resource ownership, Teacher allocations, Student enrollment, assignment visibility, and submission ownership; frontend guards remain a user-experience layer only.",
          "A background worker synchronizes expired Published assignments to Closed, while each submission command independently evaluates the UTC deadline and late/resubmission rules.",
          "Submission and grading updates map PostgreSQL xmin as a row version. A stale update returns 409 Conflict instead of overwriting newer work.",
          "Short-lived access tokens are paired with HttpOnly refresh cookies, hashed refresh-token storage, rotation, replay detection, and token-family revocation.",
        ],
        evidenceIds: ["slatedesk-readme", "slatedesk-architecture"],
      },
      {
        type: "media",
        heading: "Assignment lifecycle evidence",
        introduction:
          "The Teacher ledger exposes assignment state, submission volume, and the controls that move work through the documented workflow.",
        mediaIndexes: [1],
        evidenceIds: ["slatedesk-readme"],
      },
      {
        type: "prose",
        heading: "Testing the rules that carry risk",
        paragraphs: [
          "The backend test projects target authentication replay, assignment ownership, deadline policy, closing behavior, submission rules, grading concurrency, query filters, and exception handling. The repository uses xUnit with isolated EF Core test support for these rule-focused checks.",
        ],
        evidenceIds: ["slatedesk-readme"],
      },
    ],
  },
  framesignal: {
    overview:
      "FrameSignal is a spoiler-safe movie guidance product organized around a decision layer before deeper editorial reading. Its public experience is backed by protected content-management workflows and database authorization.",
    evidenceIds: [
      "framesignal-readme",
      "framesignal-case-study",
      "framesignal-deployment",
    ],
    blocks: [
      {
        type: "features",
        heading: "Decision architecture before deep reading",
        introduction:
          "The content model surfaces practical signals first, then lets a visitor choose whether to continue into spoiler-sensitive explanation.",
        items: [
          {
            title: "Signal Card",
            description:
              "A compact decision surface for the final verdict, score, mood, runtime feel, family-safety context, and spoiler risk.",
          },
          {
            title: "Explicit spoiler boundaries",
            description:
              "Reviews, ending explanations, and theories are separated so deeper analysis is an intentional choice rather than an accidental reveal.",
          },
          {
            title: "Discovery tools",
            description:
              "Mood-led discovery, movie profiles, a Watch Signal Generator, and legal viewing guidance extend the decision system beyond article browsing.",
          },
        ],
        evidenceIds: ["framesignal-readme", "framesignal-case-study"],
      },
      {
        type: "architecture",
        heading: "Public product and protected editorial system",
        introduction:
          "FrameSignal separates public reading surfaces from authenticated administration while using Supabase and PostgreSQL for content, identity, and row-level authorization.",
        nodes: [
          {
            label: "Public Next.js routes",
            detail: "Server-rendered reviews, movie pages, guides, theories, and discovery tools",
          },
          {
            label: "Content access layer",
            detail: "Published-content reads with documented local fallback content",
          },
          {
            label: "Supabase / PostgreSQL",
            detail: "Content schema, authentication, migrations, and Row Level Security",
          },
          {
            label: "Protected admin routes",
            detail: "Authenticated editorial create, edit, review, and settings workflows",
          },
          {
            label: "Vercel deployment",
            detail: "Verified public application deployment",
          },
        ],
        relationships: [
          "Public routes read published content through server-side helpers and fall back to local content where documented.",
          "Protected administration is separated from the public layout and checked through authentication, route protection, and database policies.",
          "The deployed Next.js application connects the public and administrative surfaces to the Supabase-backed content system.",
        ],
        evidenceIds: [
          "framesignal-readme",
          "framesignal-case-study",
          "framesignal-deployment",
        ],
      },
      {
        type: "decisions",
        heading: "Content boundaries are also system boundaries",
        items: [
          "Public content is primarily server-rendered, while protected administration is isolated in a separate route group and layout.",
          "Row Level Security participates in the authorization model rather than relying only on interface-level access checks.",
          "Public content helpers filter to published material, and robots and sitemap behavior keep administration routes outside the public discovery surface.",
          "Media records retain structured metadata and credit context so interface presentation can preserve source information.",
        ],
        evidenceIds: ["framesignal-readme", "framesignal-case-study"],
      },
      {
        type: "media",
        heading: "The public promise",
        introduction:
          "The homepage establishes the same order used by the product model: verdict first, visible spoiler boundaries, and deeper reading by choice.",
        mediaIndexes: [1],
        evidenceIds: ["framesignal-deployment"],
      },
    ],
  },
  "arctic-daze": {
    overview:
      "Arctic Daze is a responsive product and editorial interface for browsing men’s fashion and lifestyle sourcing from Malaysia to Bangladesh. The source application connects discovery, account tools, and product-request workflows through a Next.js and Supabase foundation.",
    evidenceIds: [
      "arctic-package",
      "arctic-repository",
      "arctic-deployment",
      "arctic-collections",
    ],
    blocks: [
      {
        type: "features",
        heading: "A product journey built around discovery and request",
        introduction:
          "The repository supports a wider product journey than the editorial homepage alone shows.",
        items: [
          {
            title: "Editorial entry",
            description:
              "Large-format typography, category-led storytelling, featured groupings, and a clear Malaysia-to-Bangladesh sourcing proposition.",
          },
          {
            title: "Product discovery",
            description:
              "A collection route with product search, category and status filters, responsive product grids, and links into product details.",
          },
          {
            title: "Account surfaces",
            description:
              "Source routes cover profiles, wishlists, saved items, restock alerts, and preorder requests.",
          },
          {
            title: "Guided ordering",
            description:
              "The documented flow starts with a product link, post, or screenshot and routes the request through Facebook or WhatsApp before order confirmation.",
          },
        ],
        evidenceIds: ["arctic-repository", "arctic-collections", "arctic-deployment"],
      },
      {
        type: "decisions",
        heading: "Interface implementation",
        items: [
          "The application uses Next.js App Router pages and reusable product components rather than keeping the experience inside one landing-page component.",
          "Public product reads and category data are implemented through server-side Supabase helpers.",
          "Collection filters use URL query parameters, preserving navigable search and filter state without requiring a client-only catalog shell.",
          "The responsive product grid progresses from one column to two, three, four, and five columns as space becomes available.",
        ],
        evidenceIds: ["arctic-repository", "arctic-collections"],
      },
      {
        type: "media",
        heading: "Responsive product identity",
        introduction:
          "The mobile capture preserves the editorial hierarchy and core actions in a layout composed for a narrow viewport rather than a scaled-down desktop frame.",
        mediaIndexes: [1],
        evidenceIds: ["arctic-deployment"],
      },
    ],
  },
  "cctv-violence-detection": {
    overview:
      "This offline research project compares classical machine-learning and deep-learning approaches for binary violence and non-violence image classification. Its repository retains the frozen data splits, result tables, figures, notebook, and saved model artifacts used in the documented experiment.",
    evidenceIds: ["cctv-readme", "cctv-results", "cctv-split"],
    blocks: [
      {
        type: "architecture",
        heading: "From balanced image subset to offline evaluation",
        introduction:
          "The workflow prepares a fixed image dataset, trains several model families, and compares them on one documented test partition.",
        nodes: [
          {
            label: "Dataset preparation",
            detail: "Balanced 5,000-image subset: 2,500 images per class",
          },
          {
            label: "Image processing",
            detail: "160 × 160 pixel inputs and frozen train, validation, and test partitions",
          },
          {
            label: "Classical features",
            detail: "MLP, KNN, Random Forest, Logistic Regression, Linear SVM, and Isolation Forest",
          },
          {
            label: "Deep learning",
            detail: "Small custom CNN and MobileNetV2 transfer learning",
          },
          {
            label: "Evaluation",
            detail: "Accuracy, precision, recall, F1, ROC-AUC, and average precision",
          },
          {
            label: "Offline outputs",
            detail: "Comparison tables, curves, confusion matrices, and alert demonstrations",
          },
        ],
        relationships: [
          "The balanced working subset is split into 3,500 training, 750 validation, and 750 test images.",
          "Classical and deep-learning model families are trained and compared using the same documented evaluation outputs.",
          "The result is an offline experiment record, not a deployed surveillance decision system.",
        ],
        evidenceIds: ["cctv-readme", "cctv-split"],
      },
      {
        type: "features",
        heading: "Eight approaches compared",
        items: [
          {
            title: "Feature-based supervised models",
            description:
              "MLP, KNN, Random Forest, Logistic Regression, and Linear SVM establish classical comparison points.",
          },
          {
            title: "Unsupervised baseline",
            description:
              "Isolation Forest provides an anomaly-detection comparison within the same binary experiment.",
          },
          {
            title: "Deep-learning baselines",
            description:
              "A small custom CNN and a MobileNetV2 transfer-learning model provide two image-model comparisons.",
          },
        ],
        evidenceIds: ["cctv-readme", "cctv-results"],
      },
      {
        type: "metrics",
        heading: "Reported MLP evaluation",
        introduction:
          "The repository reports the MLP as the strongest model by F1 score in this experiment. Each figure below belongs to the balanced working subset and frozen 750-image test split.",
        metricIndexes: [0, 1],
        evidenceIds: ["cctv-results", "cctv-split"],
      },
      {
        type: "media",
        heading: "A second model’s error distribution",
        introduction:
          "The MobileNetV2 confusion matrix provides class-level context for a separate transfer-learning result on the same frozen test split.",
        mediaIndexes: [1],
        evidenceIds: ["cctv-results", "cctv-split"],
      },
      {
        type: "limitations",
        heading: "Research limits remain part of the result",
        items: [
          "The repository defines this as academic and research work, not a real-world surveillance, policing, or security decision system.",
          "The models were evaluated on a limited image dataset; real CCTV analysis would require video-level temporal modeling and evaluation across unseen cameras and scene variation.",
          "Any real deployment would require additional testing, fairness evaluation, privacy review, and human oversight.",
          "The reported metrics do not establish real-time behavior or production CCTV performance.",
        ],
        evidenceIds: ["cctv-readme", "cctv-results", "cctv-split"],
      },
    ],
  },
} satisfies Record<string, ProjectCaseStudy>;

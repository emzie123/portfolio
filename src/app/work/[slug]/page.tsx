import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { reader } from "@/lib/reader";
import ScrollReveal from "@/components/ScrollReveal";
import MarkdocRenderer from "@/components/MarkdocRenderer";
import DeviceFrame, { type ScreenItem } from "@/components/DeviceFrame";
import FlowGallery, { type FlowStep } from "@/components/FlowGallery";
import styles from "./caseStudy.module.css";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projects = await reader.collections.projects.all();
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const project = await reader.collections.projects.read(slug);
    if (!project) return { title: "Project Not Found" };

    return {
      title: `${project.title} — UI/UX Case Study`,
      description: project.summary,
    };
  } catch {
    return { title: "Project Not Found" };
  }
}

// Interactive Screen Data for BusWatch
const buswatchScreens: ScreenItem[] = [
  {
    id: "parent-dashboard",
    title: "Parent Home Dashboard",
    src: "/images/projects/buswatch/routes-list.png",
    caption: "Parent dashboard showing live real-time status of each child ('On The Bus', 'At School', 'At Home') with quick transit alerts.",
  },
  {
    id: "live-tracking",
    title: "Live GPS Tracking",
    src: "/images/projects/buswatch/live-tracking.png",
    caption: "Real-time interactive route map showing driver details (Mike Johnson), calibrated 10-minute ETA, and live vehicle telemetry.",
  },
  {
    id: "pickup-details",
    title: "Driver & Pickup Details",
    src: "/images/projects/buswatch/bus-details.png",
    caption: "Driver verified profile, scheduled morning pickup time, home pickup location, and instant 'Notify me when 5 mins away' reminder trigger.",
  },
  {
    id: "onboarding",
    title: "Onboarding Flow",
    src: "/images/projects/buswatch/onboarding-1.png",
    caption: "Warm, illustrative 3-step onboarding explaining GPS tracking accuracy and peace of mind for parents.",
  },
  {
    id: "signup-safety",
    title: "Safety & Medical Registration",
    src: "/images/projects/buswatch/home-map.png",
    caption: "Dedicated safety registration form capturing blood type, allergies, medical conditions, and dual emergency contact information.",
  },
];

const buswatchFlowSteps: FlowStep[] = [
  {
    step: "Step 01",
    title: "Onboarding & Trust Building",
    description: "Parents are introduced to real-time tracking, safety notifications, and predictable schedule updates.",
    src: "/images/projects/buswatch/onboarding-1.png",
  },
  {
    step: "Step 02",
    title: "Parent Home Dashboard",
    description: "Glanceable overview of all children with live status tags ('On the Bus', 'At School', 'At Home').",
    src: "/images/projects/buswatch/routes-list.png",
  },
  {
    step: "Step 03",
    title: "Live Route & Driver Telemetry",
    description: "Map view with GPS pin, live traffic route line, ETA countdown, and verified driver credentials.",
    src: "/images/projects/buswatch/live-tracking.png",
  },
  {
    step: "Step 04",
    title: "Driver Contact & Stop Reminders",
    description: "Direct contact line with bus driver and automated alerts 5 minutes prior to bus arrival.",
    src: "/images/projects/buswatch/bus-details.png",
  },
];

// Interactive Screen Data for Verae
const veraeScreens: ScreenItem[] = [
  {
    id: "orders",
    title: "Order Management",
    src: "/images/projects/verae/orders.png",
    caption: "Executive order ledger displaying real-time order status counts, payment methods (GCash, Maya, PayPal), and quick action controls.",
  },
  {
    id: "order-details",
    title: "Order Details & Modal",
    src: "/images/projects/verae/order-details.png",
    caption: "Detailed modal overlay showing purchased jewelry items, transaction totals, and 1-click invoice/label printing.",
  },
  {
    id: "content-cms",
    title: "Content & Banner CMS",
    src: "/images/projects/verae/content-cms.png",
    caption: "Visual banner manager allowing store managers to publish seasonal promotions and update policy copy without code.",
  },
  {
    id: "customers",
    title: "Customer Directory",
    src: "/images/projects/verae/customers.png",
    caption: "Customer intelligence module showing lifetime value, order frequency, and verified contact profiles.",
  },
  {
    id: "products",
    title: "Product Catalog",
    src: "/images/projects/verae/products.png",
    caption: "Inventory and SKU management with category filtering, stock alerts, and high-res jewelry photography support.",
  },
];

const veraeFlowSteps: FlowStep[] = [
  {
    step: "Stage 01",
    title: "Order Intake & Triage",
    description: "High-value orders are ingested with multi-gateway payment tags and categorized into real-time status queues.",
    src: "/images/projects/verae/orders.png",
  },
  {
    step: "Stage 02",
    title: "Fulfillment & Invoicing",
    description: "Admins inspect line items, verify luxury packaging requirements, and print official invoices in a single modal.",
    src: "/images/projects/verae/order-details.png",
  },
  {
    step: "Stage 03",
    title: "Promotional Banner Deployment",
    description: "Marketing teams deploy luxury hero banners directly to the storefront with custom CTA buttons and scheduling.",
    src: "/images/projects/verae/content-cms.png",
  },
  {
    step: "Stage 04",
    title: "Customer Retention & History",
    description: "Detailed client profiles enable personalized concierge customer service for repeat high-value jewelry buyers.",
    src: "/images/projects/verae/customers.png",
  },
];

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  let project;
  let allSlugs: string[] = [];

  try {
    project = await reader.collections.projects.read(slug);
    const allProjects = await reader.collections.projects.all();
    allSlugs = allProjects.map((p) => p.slug);
  } catch {
    notFound();
  }

  if (!project) {
    notFound();
  }

  const currentIndex = allSlugs.indexOf(slug);
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug =
    currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  // Render content from markdoc
  const contentDocument = await project.content();

  // Screen selection based on slug
  const isBusWatch = slug === "buswatch";
  const screens = isBusWatch ? buswatchScreens : veraeScreens;
  const flowSteps = isBusWatch ? buswatchFlowSteps : veraeFlowSteps;
  const deviceType = isBusWatch ? "phone" : "desktop";
  const themeColor = isBusWatch ? "#F59E0B" : "#0F3830";

  return (
    <article id={`case-study-${slug}`}>
      {/* Hero */}
      <section className={styles.caseHero}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.caseHeroInner}>
              <div className={styles.caseMeta}>
                <span
                  className={styles.caseCategory}
                  style={{ color: themeColor }}
                >
                  {project.category}
                </span>
                <span className={styles.caseDot} />
                <span className={styles.caseYear}>{project.year}</span>
              </div>
              <h1 className={styles.caseTitle}>{project.title}</h1>
              <p className={styles.caseSummary}>{project.summary}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="container">
        {/* Interactive Device Showcase */}
        <ScrollReveal direction="scale">
          <DeviceFrame
            type={deviceType}
            screens={screens}
            projectName={project.title}
            themeColor={themeColor}
          />
        </ScrollReveal>

        {/* Info Bar */}
        <ScrollReveal>
          <div className={styles.infoBar}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Role</span>
              <span className={styles.infoValue}>{project.role}</span>
            </div>
            {project.client && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Client</span>
                <span className={styles.infoValue}>{project.client}</span>
              </div>
            )}
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Year</span>
              <span className={styles.infoValue}>{project.year}</span>
            </div>
            {project.techStack && project.techStack.length > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Tech & Tools</span>
                <div className={styles.techTags}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {project.liveUrl && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Live Site</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveLink}
                  style={{ color: themeColor }}
                >
                  Visit ↗
                </a>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Case Study Narrative */}
        <ScrollReveal>
          <div className={styles.contentBody}>
            {contentDocument?.node && (
              <MarkdocRenderer node={contentDocument.node} />
            )}
          </div>
        </ScrollReveal>

        {/* Apple-Style User Flow Responsive Grid */}
        <ScrollReveal>
          <FlowGallery
            steps={flowSteps}
            title={`${project.title} — Experience Architecture & User Journey`}
            subtitle="Step-by-step design breakdown illustrating the user interaction flow and usability decisions."
            aspectRatio={isBusWatch ? "phone" : "desktop"}
          />
        </ScrollReveal>

        {/* Navigation */}
        <nav className={styles.caseNav}>
          {prevSlug ? (
            <Link href={`/work/${prevSlug}`} className={styles.caseNavLink}>
              <span className={styles.caseNavLabel}>← Previous</span>
              <span className={styles.caseNavTitle}>Previous Project</span>
            </Link>
          ) : (
            <div />
          )}
          {nextSlug ? (
            <Link
              href={`/work/${nextSlug}`}
              className={`${styles.caseNavLink} ${styles.caseNavRight}`}
            >
              <span className={styles.caseNavLabel}>Next →</span>
              <span className={styles.caseNavTitle}>Next Project</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </article>
  );
}

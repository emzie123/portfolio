import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { reader } from "@/lib/reader";
import ScrollReveal from "@/components/ScrollReveal";
import MarkdocRenderer from "@/components/MarkdocRenderer";
import DeviceFrame, { type ScreenItem } from "@/components/DeviceFrame";
import FlowGallery, { type FlowStep } from "@/components/FlowGallery";
import BerryGuardShowcase from "@/components/BerryGuardShowcase";
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

// -------------------------------------------------------------
// BUSWATCH DATA (Mobile App)
// -------------------------------------------------------------
const buswatchScreens: ScreenItem[] = [
  {
    id: "splash-screen",
    title: "Brand Splash Screen",
    src: "/images/projects/buswatch/splash.png",
    caption: "Official BusWatch brand launch screen featuring the signature school bus yellow identity, navigation pin, and wireless signal indicator.",
  },
  {
    id: "onboarding-tracking",
    title: "Live GPS & Tracking",
    src: "/images/projects/buswatch/onboarding-1.png",
    caption: "First onboarding step educating parents on accurate live GPS route updates and arrival predictability.",
  },
  {
    id: "onboarding-security",
    title: "Secure & Private",
    src: "/images/projects/buswatch/onboarding-2.png",
    caption: "Security and data protection overview ensuring student location and personal details remain confidential.",
  },
  {
    id: "sign-in",
    title: "Parent Account Sign In",
    src: "/images/projects/buswatch/signin.png",
    caption: "Secure authentication interface for parents and guardians to access real-time student transit data.",
  },
  {
    id: "register-parent",
    title: "Registration: Parent Info",
    src: "/images/projects/buswatch/register-parent.png",
    caption: "Step 1 of family registration capturing verified parent name, contact phone, credentials, and language preference.",
  },
  {
    id: "register-child",
    title: "Registration: Child Info",
    src: "/images/projects/buswatch/register-child.png",
    caption: "Step 2 student enrollment capturing student photo, class grade, school name, and official school enrollment form.",
  },
  {
    id: "register-medical",
    title: "Registration: Medical Form",
    src: "/images/projects/buswatch/register-medical.png",
    caption: "Step 3 safety profile detailing blood type, allergies, medications, and dual emergency contacts for transit emergencies.",
  },
  {
    id: "location-permission",
    title: "Location Permission",
    src: "/images/projects/buswatch/location-permission.png",
    caption: "System geolocation authorization dialogue enabling precise proximity alerts when the school bus is approaching.",
  },
  {
    id: "parent-dashboard",
    title: "Parent Home Dashboard",
    src: "/images/projects/buswatch/parent-dashboard.png",
    caption: "Parent dashboard showing real-time status of each child (Justin: 'AT HOME', Kylie: 'ON THE BUS', 'AT SCHOOL') with glanceable route alerts.",
  },
  {
    id: "live-tracking",
    title: "Live GPS & Route Telemetry",
    src: "/images/projects/buswatch/live-tracking.png",
    caption: "Interactive real-time map displaying calibrated 10-minute ETA, vehicle navigation path, and verified driver credentials.",
  },
  {
    id: "driver-pickup",
    title: "Driver Profile & Pickup Alert",
    src: "/images/projects/buswatch/driver-pickup.png",
    caption: "Driver verified profile (Mike Johnson), scheduled morning pickup location, and instant 'Notify me when 5 mins away' alert trigger.",
  },
];

const buswatchFlowSteps: FlowStep[] = [
  {
    step: "Step 01",
    title: "Brand Launch & Identity",
    description: "Signature warm amber splash screen introducing the BusWatch connected transit brand mark.",
    src: "/images/projects/buswatch/splash.png",
  },
  {
    step: "Step 02",
    title: "Onboarding & Predictability",
    description: "Clear introductory onboarding educating parents on real-time arrival predictability and route safety.",
    src: "/images/projects/buswatch/onboarding-1.png",
  },
  {
    step: "Step 03",
    title: "Parent Home Dashboard",
    description: "Glanceable overview of all children with live status tags ('At Home', 'On the Bus', 'At School').",
    src: "/images/projects/buswatch/parent-dashboard.png",
  },
  {
    step: "Step 04",
    title: "Live Telemetry & Driver Alerts",
    description: "Map telemetry with real-time GPS path, 10-min ETA, and driver pickup notification triggers.",
    src: "/images/projects/buswatch/driver-pickup.png",
  },
];

const buswatchAdditionalGallery: FlowStep[] = [
  {
    step: "Step 01",
    title: "Account Security & Login",
    description: "Secure authentication interface for parents and guardians to access real-time transit data.",
    src: "/images/projects/buswatch/signin.png",
  },
  {
    step: "Step 02",
    title: "Guardian Profile Setup",
    description: "Guardian registration capturing verified contact details, language preferences, and secure credentials.",
    src: "/images/projects/buswatch/register-parent.png",
  },
  {
    step: "Step 03",
    title: "Student Enrollment",
    description: "Detailed student profile with photo capture, school name, class grade, and official enrollment forms.",
    src: "/images/projects/buswatch/register-child.png",
  },
  {
    step: "Step 04",
    title: "Medical & Safety Profile",
    description: "Critical emergency triage capturing blood type, active allergies, medications, and emergency contacts.",
    src: "/images/projects/buswatch/register-medical.png",
  },
];

// -------------------------------------------------------------
// VERAE DATA (Luxury E-Commerce Dashboard)
// -------------------------------------------------------------
const veraeScreens: ScreenItem[] = [
  {
    id: "orders-ledger",
    title: "Order Management Ledger",
    src: "/images/projects/verae/orders-ledger.png",
    caption: "Executive order ledger displaying real-time order status counts (Pending, Processing, Shipped, Delivered, Cancelled), multi-payment method tags (GCash, Maya, PayPal), and action controls.",
  },
  {
    id: "order-details-modal",
    title: "Order Details & Modal Invoice",
    src: "/images/projects/verae/order-details-modal.png",
    caption: "Focused modal overlay showing purchased luxury items (Diamond Solitaire Ring ₱125k, Pearl Pendant ₱13k), total calculation (₱151,000), status updater, and 1-click invoice/label printing.",
  },
  {
    id: "add-banner-modal",
    title: "Promotional Banner Creator",
    src: "/images/projects/verae/add-banner-modal.png",
    caption: "Visual marketing CMS modal allowing store managers to upload hero campaign photography, set headline copy, assign destination URLs, and choose display positions.",
  },
  {
    id: "edit-banner-modal",
    title: "Edit Featured Banner",
    src: "/images/projects/verae/edit-banner-modal.png",
    caption: "Edit modal for existing seasonal banners (Lustré Diamond Ring collection) with real-time thumbnail preview and active position ordering.",
  },
  {
    id: "reviews-list",
    title: "Customer Reviews Ledger",
    src: "/images/projects/verae/reviews-list.png",
    caption: "Customer feedback management with verified 5-star ratings, response statuses ('Replied' / 'No Reply'), and direct inquiry escalation.",
  },
  {
    id: "review-modal",
    title: "Review Response Modal",
    src: "/images/projects/verae/review-modal.png",
    caption: "Detailed modal review interface showing customer feedback for Diamond Solitaire Ring, purchase date, and official verified admin response.",
  },
  {
    id: "ratings-analytics",
    title: "Product Ratings Analytics",
    src: "/images/projects/verae/ratings-analytics.png",
    caption: "Aggregated rating scorecard tracking average star ratings and approval rates across key jewelry SKUs (Gold Chain, Ruby Pendant, Pearl Earrings, Emerald Bracelet).",
  },
  {
    id: "refund-modal",
    title: "Refund Triage Modal",
    src: "/images/projects/verae/refund-modal.png",
    caption: "Refund request inspection modal showing transaction ID, payment gateway, defective claim reason, and quick 'Reject' / 'Approved' action buttons.",
  },
];

const veraeFlowSteps: FlowStep[] = [
  {
    step: "Stage 01",
    title: "Order Intake & Triage Ledger",
    description: "High-value orders are ingested with multi-gateway payment tags and categorized into real-time status queues.",
    src: "/images/projects/verae/orders-ledger.png",
  },
  {
    step: "Stage 02",
    title: "Modal Fulfillment & Invoicing",
    description: "Admins inspect line items, verify luxury packaging requirements, and print official invoices in a single focused modal.",
    src: "/images/projects/verae/order-details-modal.png",
  },
  {
    step: "Stage 03",
    title: "Promotional Banner Deployment",
    description: "Marketing teams deploy luxury hero banners directly to the storefront with custom CTA buttons and scheduling.",
    src: "/images/projects/verae/add-banner-modal.png",
  },
  {
    step: "Stage 04",
    title: "Review & Quality Governance",
    description: "Concierge review response system maintaining brand trust and customer satisfaction for high-ticket jewelry.",
    src: "/images/projects/verae/review-modal.png",
  },
];

const veraeAdditionalGallery: FlowStep[] = [
  {
    step: "CMS Module",
    title: "About & Contact Us Editor",
    description: "Back-office copy editor for company mission, support email, phone numbers, and showroom business hours.",
    src: "/images/projects/verae/about-cms.png",
  },
  {
    step: "CMS Module",
    title: "FAQs Knowledge Base",
    description: "Frequently asked questions editor covering diamond certification, appraisal, and bespoke customization.",
    src: "/images/projects/verae/faqs-cms.png",
  },
  {
    step: "CMS Module",
    title: "Return Policy Governance",
    description: "Fine jewelry 7-day return policy and inspection terms editor.",
    src: "/images/projects/verae/returns-cms.png",
  },
  {
    step: "CMS Module",
    title: "Privacy & Data Compliance",
    description: "Customer data protection and secure checkout compliance policy editor.",
    src: "/images/projects/verae/privacy-cms.png",
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
  const isBerryGuard = slug === "berryguard";
  const screens = isBusWatch ? buswatchScreens : veraeScreens;
  const flowSteps = isBusWatch ? buswatchFlowSteps : veraeFlowSteps;
  const additionalGallery = isBusWatch
    ? buswatchAdditionalGallery
    : veraeAdditionalGallery;
  const deviceType = isBusWatch ? "phone" : "desktop";
  const themeColor = isBusWatch ? "#F59E0B" : isBerryGuard ? "#C0392B" : "#0F3830";

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
        {/* Showcase for BerryGuard */}
        {isBerryGuard && (
          <ScrollReveal direction="scale">
            <BerryGuardShowcase themeColor={themeColor} />
          </ScrollReveal>
        )}

        {/* Interactive Device Showcase with Clean Single-Screen Tabs */}
        {!isBerryGuard && (
          <ScrollReveal direction="scale">
            <DeviceFrame
              type={deviceType}
              screens={screens}
              projectName={project.title}
              themeColor={themeColor}
            />
          </ScrollReveal>
        )}

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

        {/* Primary Experience Architecture Flow (4-Card Responsive Grid) */}
        {!isBerryGuard && (
          <ScrollReveal>
            <FlowGallery
              steps={flowSteps}
              title={`${project.title} — Experience Architecture & User Journey`}
              subtitle="Step-by-step design breakdown illustrating key user touchpoints and interface decisions."
              aspectRatio={isBusWatch ? "phone" : "desktop"}
            />
          </ScrollReveal>
        )}

        {/* Additional Screens & UI Kit Catalog (4-Card Responsive Grid) */}
        {!isBerryGuard && additionalGallery.length > 0 && (
          <ScrollReveal>
            <FlowGallery
              steps={additionalGallery}
              title={`${project.title} — Extended Design Modules & UI Catalog`}
              subtitle="Additional interface screens, modals, and management systems designed for this platform."
              aspectRatio={isBusWatch ? "phone" : "desktop"}
            />
          </ScrollReveal>
        )}

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

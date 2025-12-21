import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardBody } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { Snippet } from "@heroui/snippet";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-8 py-16 md:py-24">
        {/* Main Heading */}
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
            The healthcare platform that keeps{" "}
            <span className="text-primary">your data</span> in{" "}
            <span className="text-primary">sync</span>
          </h1>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button
            as={Link}
            href="/signup"
            color="primary"
            size="lg"
            className="font-semibold px-8"
          >
            Start building
          </Button>
          
          <Snippet
            symbol=""
            variant="bordered"
            className="bg-default-100 border-default-200"
          >
            <span className="text-default-600">npx create-healthstack</span>
          </Snippet>
        </div>

        {/* Feature Tabs */}
        <div className="w-full max-w-5xl mt-12">
          <Tabs 
            aria-label="Features" 
            color="primary"
            variant="underlined"
            classNames={{
              tabList: "gap-6 w-full justify-center border-b border-divider pb-0",
              cursor: "bg-primary",
              tab: "px-4 h-12 text-default-500 data-[selected=true]:text-primary font-medium",
              tabContent: "group-data-[selected=true]:text-primary",
            }}
          >
            <Tab key="realtime" title="Real-time sync">
              <FeatureCard
                title="Always in sync"
                description="Patient records, appointments, and medical data sync instantly across all devices. No manual refresh needed."
                code={`// Real-time patient updates
const patients = useQuery(api.patients.list);

// Updates automatically when data changes
patients.map(patient => (
  <PatientCard key={patient._id} {...patient} />
));`}
              />
            </Tab>
            
            <Tab key="typesafe" title="Type-safe">
              <FeatureCard
                title="Everything is typed"
                description="End-to-end TypeScript support. Your schema, queries, and mutations are fully typed from database to UI."
                code={`// Fully typed schema
import { defineSchema, defineTable } from "healthstack";
import { v } from "convex/values";

export default defineSchema({
  patients: defineTable({
    name: v.string(),
    dateOfBirth: v.string(),
    conditions: v.array(v.string()),
  }),
});`}
              />
            </Tab>
            
            <Tab key="backend" title="Backend built-in">
              <FeatureCard
                title="No backend setup"
                description="Authentication, database, file storage, and scheduled jobs — all included. Focus on building features, not infrastructure."
                code={`// Automatic CRUD operations
export const createAppointment = mutation({
  args: {
    patientId: v.id("patients"),
    doctorId: v.id("doctors"),
    dateTime: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("appointments", args);
  },
});`}
              />
            </Tab>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-divider">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          <StatItem value="99.9%" label="Uptime SLA" />
          <StatItem value="<50ms" label="Query latency" />
          <StatItem value="10M+" label="Records synced" />
          <StatItem value="HIPAA" label="Compliant" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 border-t border-divider">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built for healthcare
          </h2>
          <p className="text-default-500 text-lg max-w-2xl mx-auto">
            Everything you need to build modern healthcare applications
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureGridCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            title="HIPAA Compliant"
            description="End-to-end encryption and audit logs for all patient data access."
          />
          <FeatureGridCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Real-time Updates"
            description="Instant sync across all devices. No polling, no stale data."
          />
          <FeatureGridCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
            title="Role-based Access"
            description="Fine-grained permissions for doctors, nurses, and staff."
          />
          <FeatureGridCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            title="Analytics Dashboard"
            description="Built-in analytics for patient outcomes and operational metrics."
          />
          <FeatureGridCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            title="Scheduling"
            description="Appointment booking with automatic reminders and waitlist."
          />
          <FeatureGridCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            }
            title="File Storage"
            description="Secure storage for medical images, documents, and reports."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-divider">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-default-500 text-lg mb-8">
            Build your healthcare application in minutes, not months.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              as={Link}
              href="/signup"
              color="primary"
              size="lg"
              className="font-semibold px-8"
            >
              Start building for free
            </Button>
            <Button
              as={Link}
              href="/docs"
              variant="bordered"
              size="lg"
              className="font-semibold px-8"
            >
              Read the docs
            </Button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

// Feature Card Component
function FeatureCard({ 
  title, 
  description, 
  code 
}: { 
  title: string; 
  description: string; 
  code: string;
}) {
  return (
    <Card className="mt-6 bg-default-50 border border-divider">
      <CardBody className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-default-500">{description}</p>
          </div>
          <div className="bg-default-100 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-default-700 font-mono whitespace-pre-wrap">
              {code}
            </pre>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// Stat Item Component
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-bold text-primary">{value}</div>
      <div className="text-default-500 mt-1">{label}</div>
    </div>
  );
}

// Feature Grid Card Component
function FeatureGridCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <Card className="bg-default-50 border border-divider hover:border-primary transition-colors">
      <CardBody className="p-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-default-500 text-sm">{description}</p>
      </CardBody>
    </Card>
  );
}

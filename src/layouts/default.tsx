import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-8">
        {children}
      </main>
      <footer className="w-full border-t border-divider mt-16">
        <div className="container mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </div>
                <span className="font-bold text-foreground">HealthStack</span>
              </div>
              <p className="text-default-500 text-sm">
                The healthcare platform that keeps your data in sync.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-default-500 text-sm hover:text-primary">Features</Link></li>
                <li><Link href="/pricing" className="text-default-500 text-sm hover:text-primary">Pricing</Link></li>
                <li><Link href="/security" className="text-default-500 text-sm hover:text-primary">Security</Link></li>
                <li><Link href="/changelog" className="text-default-500 text-sm hover:text-primary">Changelog</Link></li>
              </ul>
            </div>

            {/* Developers */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Developers</h4>
              <ul className="space-y-2">
                <li><Link href="/docs" className="text-default-500 text-sm hover:text-primary">Documentation</Link></li>
                <li><Link href="/api" className="text-default-500 text-sm hover:text-primary">API Reference</Link></li>
                <li><Link href="/examples" className="text-default-500 text-sm hover:text-primary">Examples</Link></li>
                <li><Link href="/status" className="text-default-500 text-sm hover:text-primary">Status</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-default-500 text-sm hover:text-primary">About</Link></li>
                <li><Link href="/blog" className="text-default-500 text-sm hover:text-primary">Blog</Link></li>
                <li><Link href="/careers" className="text-default-500 text-sm hover:text-primary">Careers</Link></li>
                <li><Link href="/contact" className="text-default-500 text-sm hover:text-primary">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-divider mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-default-500 text-sm">
              © 2024 HealthStack. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-default-500 text-sm hover:text-primary">Privacy</Link>
              <Link href="/terms" className="text-default-500 text-sm hover:text-primary">Terms</Link>
              <Link href="/hipaa" className="text-default-500 text-sm hover:text-primary">HIPAA</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon, Search } from 'lucide-react';
import { Button } from '@/common/@atoms/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      {/* Animated 404 */}
      <div className="relative">
        <h1 className="text-[150px] font-bold text-muted-foreground/20 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="size-16 rounded-full bg-linear-to-br from-chart-1 to-chart-2 flex items-center justify-center shadow-lg animate-bounce">
              <Search color="white"/>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you may have mistyped the URL.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button asChild variant="default">
          <Link to="/dashboard">
            <HomeIcon className="mr-2 size-4" />
            Go to Dashboard
          </Link>
        </Button>
        <Button asChild variant="outlined" onClick={() => window.history.back()}>
          <Link to="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
            <ArrowLeftIcon className="mr-2 size-4" />
            Go Back
          </Link>
        </Button>
      </div>
    </div>
  );
}

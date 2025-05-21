import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect } from "react";

export default function NotFound() {
  // Set page title for 404 page
  useEffect(() => {
    document.title = "Page Not Found - MyQuran";
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md mx-4 shadow-lg animate-fadeIn">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 pt-2">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="btn-tap-effect"
          >
            Go Back
          </Button>
          <Link href="/">
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white btn-tap-effect"
            >
              Return Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

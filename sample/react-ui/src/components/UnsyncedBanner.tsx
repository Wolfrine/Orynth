import { Button } from "@/components/ui/button";

const UnsyncedBanner = () => {
  return (
    <div className="bg-warning-light border-l-4 border-warning px-4 py-3 mx-6 my-4 rounded-lg animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-gray-900">
          You're using a temporary account. Sign in to save progress across devices.
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="shrink-0 border-warning text-warning hover:bg-warning hover:text-white"
        >
          Sign In Now
        </Button>
      </div>
    </div>
  );
};

export default UnsyncedBanner;

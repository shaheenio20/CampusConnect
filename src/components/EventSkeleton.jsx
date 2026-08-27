import React from "react";

const EventSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-lg border border-base-200 rounded-2xl overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-base-300 relative">
        <div className="absolute top-3 left-3 w-20 h-6 bg-base-200 rounded-full" />
        <div className="absolute top-3 right-3 w-16 h-6 bg-base-200 rounded-full" />
        <div className="absolute bottom-3 left-3 w-32 h-6 bg-base-200 rounded-full" />
      </div>

      {/* Body Skeleton */}
      <div className="p-5 space-y-4">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-base-300 rounded-md w-4/5" />
          <div className="h-5 bg-base-300 rounded-md w-3/5" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-base-200 rounded w-full" />
          <div className="h-3 bg-base-200 rounded w-5/6" />
        </div>

        {/* Details Skeleton */}
        <div className="space-y-2 pt-3 border-t border-base-200">
          <div className="h-4 bg-base-200 rounded w-2/3" />
          <div className="h-4 bg-base-200 rounded w-1/2" />

          {/* Footer Action Skeleton */}
          <div className="flex items-center justify-between mt-4 pt-2">
            <div className="h-4 bg-base-300 rounded w-24" />
            <div className="h-9 bg-primary/30 rounded-xl w-28" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSkeleton;

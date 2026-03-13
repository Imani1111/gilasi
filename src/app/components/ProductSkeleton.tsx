import React from "react";

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-emerald-100 flex flex-col">
      <div className="h-52 bg-emerald-100 animate-pulse w-full"></div>
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="h-5 bg-emerald-100 animate-pulse rounded-md w-3/4"></div>
        <div className="h-4 bg-emerald-100 animate-pulse rounded-md w-full"></div>
        <div className="h-4 bg-emerald-100 animate-pulse rounded-md w-5/6"></div>
        
        <div className="flex items-center justify-between mt-1 mb-2">
          <div className="h-8 bg-emerald-50 animate-pulse rounded-lg w-full"></div>
        </div>
        
        <div className="h-6 bg-emerald-100 animate-pulse rounded-md w-1/3 mb-2"></div>

        <div className="flex gap-2 mt-auto">
          <div className="h-10 bg-emerald-100 animate-pulse rounded-xl w-1/2"></div>
          <div className="h-10 bg-emerald-100 animate-pulse rounded-xl w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

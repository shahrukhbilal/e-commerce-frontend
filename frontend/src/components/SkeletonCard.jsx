import React from "react";

export const ProductCardSkeleton = () => (
  <div className="animate-pulse bg-white p-4 rounded-lg shadow">
    <div className="w-full h-48 bg-gray-200 rounded mb-3" />
    <div className="h-5 bg-gray-200 rounded mb-2 w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
    <div className="h-9 bg-gray-200 rounded-full w-2/3" />
  </div>
);

export const CategoryCardSkeleton = () => (
  <div className="animate-pulse bg-white p-4 rounded-lg shadow">
    <div className="w-full h-32 bg-gray-200 rounded mb-2" />
    <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto" />
  </div>
);

export const HeroSkeleton = () => (
  <div className="w-full mt-20 bg-green-700 py-10 px-4 md:px-10 animate-pulse">
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <div className="h-6 w-24 bg-green-600 rounded-full mb-8" />
        <div className="h-10 bg-green-600 rounded w-4/5 mb-3" />
        <div className="h-10 bg-green-600 rounded w-3/5 mb-6" />
        <div className="h-4 bg-green-600 rounded w-full mb-2" />
        <div className="h-4 bg-green-600 rounded w-5/6 mb-8" />
        <div className="flex gap-4">
          <div className="h-12 w-32 bg-green-600 rounded-full" />
          <div className="h-12 w-28 bg-green-600 rounded-full" />
        </div>
      </div>
      <div className="h-[280px] md:h-[420px] bg-green-600 rounded-2xl" />
    </div>
    <div className="flex flex-wrap gap-3 mt-10 justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-10 w-24 bg-green-600 rounded-full" />
      ))}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white/20 p-3 rounded-xl">
          <div className="w-full h-32 bg-green-600 rounded" />
          <div className="h-4 bg-green-600 rounded mt-3 w-3/4" />
          <div className="h-3 bg-green-600 rounded mt-2 w-1/2" />
        </div>
      ))}
    </div>
  </div>
);

const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-12 animate-pulse">
      
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Image Skeleton */}
        <div className="h-[400px] md:h-[600px] bg-gray-200 rounded-2xl w-full"></div>

        {/* Right Column: Info Skeleton */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-10 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>

          <div className="flex gap-4">
            <div className="h-8 bg-gray-200 rounded-full w-32"></div>
            <div className="h-8 bg-gray-200 rounded-full w-32"></div>
          </div>

          <div className="p-6 bg-gray-100 rounded-2xl h-32"></div>

          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-300 rounded-2xl"></div>
            <div className="h-12 bg-gray-300 rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* Description & Q&A Skeleton */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="h-80 bg-gray-100 rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-16 bg-gray-100 rounded-2xl"></div>
            <div className="h-16 bg-gray-100 rounded-2xl"></div>
          </div>
        </div>
        <div className="h-64 bg-gray-200 rounded-3xl"></div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
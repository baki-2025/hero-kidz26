
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";

const Loading = () => {
  return (
    <div className="p-5">
      
      {/* Title Skeleton */}
      <div className="skeleton h-6 w-48 mb-6"></div>

      {/* Grid Skeleton */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[...Array(8)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>

    </div>
  );
};

export default Loading;
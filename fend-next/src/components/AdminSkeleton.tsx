export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, i) => (
          <li key={i} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between animate-pulse">
              <div className="flex items-center flex-1">
                <div className="h-12 w-12 rounded-lg bg-gray-200 mr-4" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
                <div className="h-8 w-16 bg-gray-200 rounded-md" />
                <div className="h-8 w-16 bg-gray-200 rounded-md" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="animate-pulse md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-8 bg-gray-200 rounded w-48" />
            <div className="h-4 bg-gray-200 rounded w-72" />
          </div>
          <div className="mt-4 md:mt-0 md:ml-4">
            <div className="h-10 w-32 bg-gray-200 rounded-md" />
          </div>
        </div>
        {/* Table skeleton */}
        <div className="mt-8">
          <TableSkeleton />
        </div>
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="py-6 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
        <div className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-32 bg-gray-200 rounded w-full" />
          </div>
          <div className="h-10 bg-gray-200 rounded w-32" />
        </div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="py-6 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-gray-200 rounded-md" />
                  </div>
                  <div className="ml-5 w-0 flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-6 bg-gray-200 rounded w-12" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Recent posts skeleton */}
        <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white shadow overflow-hidden sm:rounded-md p-4">
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

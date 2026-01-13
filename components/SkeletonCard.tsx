export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
      <div className="aspect-square bg-slate-100" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-20 bg-slate-100 rounded" />
        <div className="h-6 w-full bg-slate-100 rounded" />
        <div className="h-6 w-2/3 bg-slate-100 rounded" />
        <div className="flex justify-between pt-2">
          <div className="h-6 w-16 bg-slate-100 rounded" />
          <div className="h-6 w-10 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}

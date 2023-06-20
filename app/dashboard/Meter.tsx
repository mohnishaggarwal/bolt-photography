'use client';

export default function Meter({ fillAmount }: { fillAmount: string }) {
  return (
    <div className="w-4/5 h-4 relative mt-2">
      <div className="w-full h-2 absolute rounded bg-white">
        <div
          className="h-2 absolute rounded bg-highlight"
          style={{ width: `${fillAmount}%` }}
        />
      </div>
      <p className="mt-4 text-xs">{fillAmount}% of memory used</p>
    </div>
  );
}

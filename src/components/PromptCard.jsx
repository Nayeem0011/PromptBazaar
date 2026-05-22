const GRADIENTS = [
  "from-green-900 via-emerald-900 to-teal-900",
  "from-violet-900 via-purple-900 to-indigo-900",
  "from-amber-900 via-yellow-900 to-orange-900",
  "from-pink-900 via-rose-900 to-red-900",
  "from-blue-900 via-cyan-900 to-sky-900",
  "from-fuchsia-900 via-purple-900 to-violet-900",
];

export default function PromptCard({ prompt, onClick }) {
  const gradient = GRADIENTS[prompt.id % GRADIENTS.length];

  return (
    <div className="prompt-card" onClick={onClick}>
      {/* Preview */}
      <div className={`w-full aspect-[4/3] bg-gradient-to-br ${gradient} flex items-center justify-center text-5xl relative overflow-hidden`}>
        <span className="relative z-10 drop-shadow-lg">{prompt.preview}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2 gap-2">
          <span className="font-semibold text-sm leading-snug line-clamp-2">
            {prompt.title}
          </span>
          <span className="font-bold text-brand-400 text-base shrink-0">৳1</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">by {prompt.seller}</span>
          <div className="flex items-center gap-2">
            {prompt.rating > 0 && (
              <span className="text-xs text-amber-400">★ {prompt.rating}</span>
            )}
            <span className="badge badge-purple">{prompt.category}</span>
          </div>
        </div>

        {prompt.downloads > 0 && (
          <div className="mt-2 text-xs text-text-muted">
            {prompt.downloads.toLocaleString()} downloads
          </div>
        )}
      </div>
    </div>
  );
}

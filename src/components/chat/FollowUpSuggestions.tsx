import { SuggestionChip } from "@/components/chat/SuggestionChip";

type FollowUpSuggestionsProps = {
  suggestions: string[];
  onSelect: (text: string) => void;
};

export function FollowUpSuggestions({
  suggestions,
  onSelect,
}: FollowUpSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="flex w-full flex-wrap gap-2 pl-11 pt-1">
      {suggestions.map((label) => (
        <SuggestionChip
          key={label}
          className="h-auto min-h-9 px-3 py-2 text-xs shadow-sm transition-transform hover:-translate-y-0.5"
          onClick={() => onSelect(label)}
        >
          {label}
        </SuggestionChip>
      ))}
    </div>
  );
}

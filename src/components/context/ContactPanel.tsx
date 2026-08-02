import { ConnectLinks } from "./ConnectLinks";
import { PanelHeading } from "./PanelHeading";

export function ContactPanel() {
  return (
    <div className="space-y-4">
      <PanelHeading
        title="Contact"
        description="Open to internships, full-time roles, freelance, and interesting collaborations."
      />

      <ConnectLinks layout="stack" />
    </div>
  );
}

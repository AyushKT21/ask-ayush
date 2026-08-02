import { SiGithub, SiX } from "react-icons/si";
import { Link2, Mail } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";
import { CONTACT_LINKS, type ContactLink } from "@/constants/portfolio";
import { cn } from "@/utils/cn";

const brandColor: Partial<Record<ContactLink["kind"], string>> = {
  github: "#181717",
  linkedin: "#0A66C2",
  twitter: "#1DA1F2",
};

type ConnectLinksProps = {
  layout?: "grid" | "stack";
};

function ContactIcon({ kind }: { kind: ContactLink["kind"] }) {
  switch (kind) {
    case "github":
      return <SiGithub className="h-4 w-4" style={{ color: brandColor.github }} />;
    case "linkedin":
      return (
        <Link2 className="h-4 w-4" style={{ color: brandColor.linkedin }} />
      );
    case "twitter":
      return <SiX className="h-4 w-4" style={{ color: brandColor.twitter }} />;
    case "email":
      return <Mail className="h-4 w-4 text-[var(--primary)]" />;
    default:
      return null;
  }
}

export function ConnectLinks({ layout = "grid" }: ConnectLinksProps) {
  return (
    <div
      className={
        layout === "grid"
          ? "grid grid-cols-2 gap-2"
          : "flex flex-col gap-2"
      }
    >
      {CONTACT_LINKS.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "justify-start gap-3",
          )}
        >
          <ContactIcon kind={link.kind} />
          {link.label}
        </Link>
      ))}
    </div>
  );
}

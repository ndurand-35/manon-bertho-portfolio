import { Instagram, Linkedin } from "iconoir-react";
import { SOCIAL } from "../../lib/site";

const LINKS = [
  { href: SOCIAL.instagram, label: "Instagram", Icon: Instagram, hover: "hover:text-pink-600" },
  { href: SOCIAL.linkedin, label: "LinkedIn", Icon: Linkedin, hover: "hover:text-blue-600" },
];

export const SocialLinks = ({ className = "" }: { className?: string }) => (
  <ul className={`flex space-x-4 ${className}`}>
    {LINKS.map(({ href, label, Icon, hover }) => (
      <li key={href}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`transition ease-in-out ${hover}`}
        >
          <Icon />
        </a>
      </li>
    ))}
  </ul>
);

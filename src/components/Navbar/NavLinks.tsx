// components/Navbar/NavLinks.tsx
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = () => {
  const pathname = usePathname();

  const links = [
    { href: '/users', label: 'Talents' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      {links.map(({ href, label }, i) => (
        <Link 
          key={href} 
          href={href}
          className={`text-sm ${pathname === href ? 'text-[#3C65F5]' : ''}`}
          style={{ '--i': i + 1 } as React.CSSProperties}>
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
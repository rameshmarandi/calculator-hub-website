import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Calculator Hub
      </Link>

      <nav className="space-x-4">
        <Link href="/finance">Finance</Link>
        <Link href="/health">Health</Link>
      </nav>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";

interface RoutesProps {
  href: string;
  title: string;
}

const Routes = ({ href, title }: RoutesProps) => {
  return (
    <li>
      <Link href={href} className="py-2 px-4 bg-white rounded font-semibold">
        {title}
      </Link>
    </li>
  );
};

export const Header = () => {
  const routes = [
    { title: "Entrar", href: "login" },
    { title: "Cadastrar-se", href: "register" },
    { title: "Dashboard", href: "dashboard" },
  ];

  return (
    <header className="flex items-center justify-between w-screen px-4 py-2 bg-background-600">
      <Image src="/img/logo.png" alt="" width={112} height={112} />

      <ul className="flex gap-3">
        {routes.map((route) => (
          <Routes href={route.href} title={route.title} key={route.title} />
        ))}
      </ul>
    </header>
  );
};

import { Link } from "@tanstack/react-router";
import { NAVIGATION } from "../../../lib/constants";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Auction House
        </Link>
        <ul className="flex space-x-4">
          {NAVIGATION.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="text-white hover:text-blue-300 transition duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
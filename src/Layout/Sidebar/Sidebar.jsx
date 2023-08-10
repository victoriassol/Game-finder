import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ clearResults }) {
  return (
    <div className="hidden md:block">
      <nav className="p-10">
        <ul>
          <div>
            <li className="py-3">
              <Link to="/" onClick={clearResults}>Home</Link>
            </li>
            <li className="py-3">
              <Link to="/reviews" onClick={clearResults}>Reviews</Link>
            </li>
            <li className="py-3">
              <Link to="/new" onClick={clearResults}>This week</Link>
            </li>
          </div>
          <div>
            <li className="py-3">
              <Link to="/last-searches" onClick={clearResults}>Last searches</Link>
            </li>
            <li className="py-3">
              <Link to="/best-of-the-year" onClick={clearResults}>Best of the year</Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

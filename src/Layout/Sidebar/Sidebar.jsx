import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ clearResults, fromHeader }) {
  return (
    <div className={`${fromHeader ? "" : "hidden"} md:block text-white`}>
      <nav className="p-10">
        <ul className="w-max">
          <div>
            <li className="py-3 font-title font-bold text-xl">
              <Link to="/" onClick={clearResults}>
                Home
              </Link>
            </li>
            <li className="star py-3 font-title font-normal text-xl">
              <Link to="/reviews" onClick={clearResults}>
                Reviews
              </Link>
            </li>
            <li className="calendar py-3 font-title font-normal text-xl">
              <Link to="/new" onClick={clearResults}>
                This week
              </Link>
            </li>
          </div>
          <div>
            <li className="glass py-3 font-title font-normal text-xl">
              <Link to="/last-searches" onClick={clearResults}>
                Last searches
              </Link>
            </li>
            <li className="thumbs py-3 font-title font-normal text-xl">
              <Link to="/best-of-the-year" onClick={clearResults}>
                Best of the year
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

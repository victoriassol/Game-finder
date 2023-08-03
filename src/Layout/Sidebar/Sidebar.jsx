import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="hidden md:block">
      <nav className="p-10">
        <ul>
          <div>
            <li className="py-3">
              <Link to="/">Home</Link>
            </li>
            <li className="py-3">
              <Link to="/reviews">Reviews</Link>
            </li>
            <li className="py-3">
              <Link to="/new">This week</Link>
            </li>
          </div>
          <div>
            <li className="py-3">
              <Link to="/popular">Popular</Link>
            </li>
            <li className="py-3">
              <Link to="/last-searches">Last searches</Link>
            </li>
            <li className="py-3">
              <Link to="/best-of-the-year">Best of the year</Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

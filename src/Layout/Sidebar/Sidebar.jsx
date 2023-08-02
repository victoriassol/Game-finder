import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="hidden md:block">
      <nav className="p-10">
        <ul>
          <div class="nav1">
            <li class="py-3">
              <Link to="/">Home</Link>
            </li>
            <li class="py-3">
              <Link to="/reviews">Reviews</Link>
            </li>
            <li class="py-3">
              <Link to="/new">New Releases</Link>
            </li>
          </div>
          <div class="nav3">
            <li class="py-3">
              <Link to="/popular">Popular</Link>
            </li>
            <li class="glass">
              <Link to="/last-searches">Last searches</Link>
            </li>
            <li class="thumbs">
              <Link to="/best-of-the-year">Best of the year</Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

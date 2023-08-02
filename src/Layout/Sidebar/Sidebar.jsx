import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="hidden md:block">
      <nav className="p-10">
        <ul>
          <div class="nav1">
            <li class="py-3">Home</li>
            <li class="py-3">Reviews</li>
            <li class="py-3">New Releases</li>
          </div>
          <div class="nav3">
            <li class="py-3">Popular</li>
            <li class="glass">Last searches</li>
            <li class="thumbs">Best of the year</li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

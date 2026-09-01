import Icon from "./Icon";
import NewPostButton from "./NewPostButton";

export default function NavBar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="/" className="brand" aria-label="Spotted home">
          <span className="brand-icon">
            <Icon name="pin" size={23} />
          </span>
          spotted<span className="brand-dot">.</span>
        </a>
        <div className="header-actions">
          <NewPostButton compact />
        </div>
      </div>
    </header>
  );
}

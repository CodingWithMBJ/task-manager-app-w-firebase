import { signOut, type User } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useState } from "react";

type NavMenuProps = {
  user: User | null;
  showMenu: boolean;
  handleMenuToggle: () => void;
};

const NavBar = ({ user, showMenu, handleMenuToggle }: NavMenuProps) => {
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const handleClick = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
    } catch (err: any) {
      console.error("Logout error", err.message);
    }
  };

  const iconName = user?.email?.slice(0, 1).toUpperCase() || "";
  const menuStatus = showMenu ? "opened" : "";
  const logStatus = showLogout ? "show" : "";

  return (
    <nav className={`nav ${menuStatus}`}>
      <button className="menuBtn" onClick={handleMenuToggle}>
        <img
          src="/sidebar-svgrepo-com.svg"
          alt="menu-btn"
          className="menuBtn-icon"
        />
      </button>

      {user && (
        <div className="user-menu">
          <button className="user-icon" onClick={handleClick}>
            <span>{iconName}</span>
          </button>

          <button onClick={handleLogout} className={`logout-btn ${logStatus}`}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

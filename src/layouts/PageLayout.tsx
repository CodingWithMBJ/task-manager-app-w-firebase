import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import type { User } from "firebase/auth";
import { useState } from "react";

type PageLayoutProps = {
  user: User | null;
};

const PageLayout = ({ user }: PageLayoutProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleMenuToggle = (): void => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="wrapper">
      <NavBar
        user={user}
        handleMenuToggle={handleMenuToggle}
        showMenu={showMenu}
      />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;

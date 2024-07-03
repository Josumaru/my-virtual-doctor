import { auth } from "@/auth";
import { NextPage } from "next";
import ProfileButton from "./profile-button";
import SignInButton from "./sign-in-button";
import NavbarNavigationMenu from "./navbar-navigation-menu";
import Sidebar from "./sidebar";

interface Props {}

const Navbar: NextPage<Props> = async ({}) => {
  const session = await auth();
  const user = session?.user;
  return (
    <nav className="absolute w-full z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-25 border-b">
      <div className={"flex flex-row items-center justify-between p-5 px-5 lg:px-52"}>
        <Sidebar/>
        <NavbarNavigationMenu/>
        <div>{user ? <ProfileButton user={user} options={{showDashboardButton: true}}/> : <SignInButton />}</div>
      </div>
    </nav>
  );
};

export default Navbar;

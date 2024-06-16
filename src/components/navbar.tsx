import { auth } from "@/auth";
import { NextPage } from "next";
import ProfileButton from "./profile-button";
import SignInButton from "./sign-in-button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import NavbarNavigationMenu from "./navbar-navigation-menu";

interface Props {}

const Navbar: NextPage<Props> = async ({}) => {
  const session = await auth();
  const user = session?.user;
  return (
    <nav>
      <div className={"flex flex-row justify-between p-5"}>
        <NavbarNavigationMenu></NavbarNavigationMenu>
        {/* <div>
          <a
            href="#"
            className={
              "py-2 mx-2 hover:border-b-2 text-center align-middle w-1"
            }
          >
            Home
          </a>
          <a
            href="#"
            className={
              "py-2 mx-2 hover:border-b-2 text-center align-middle w-1 border-b-2 border-blue-400"
            }
          >
            Article
          </a>
          <a
            href="#"
            className={
              "py-2 mx-2 hover:border-b-2 text-center align-middle w-1"
            }
          >
            Doctor
          </a>
          <a
            href="#"
            className={
              "py-2 mx-2 hover:border-b-2 text-center align-middle w-1"
            }
          >
            About Us
          </a>
        </div> */}

        <div>{user ? <ProfileButton user={user} /> : <SignInButton />}</div>
      </div>
    </nav>
  );
};

export default Navbar;

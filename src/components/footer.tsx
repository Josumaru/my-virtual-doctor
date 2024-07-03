import { NextPage } from "next";
import OverlogicLogo from "@/assets/svgs/logo.svg";
import Image from "next/image";
import Link from "next/link";

interface Props {}

const Footer: NextPage<Props> = ({}) => {
  return (
    <footer className="bg-white dark:bg-gray-900 border">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link
              href="https://www.instagram.com/overlogic.id/"
              className="flex items-center bg-primary blur-bg"
              target="_blank"
            >
                <Image src={OverlogicLogo} alt="OVERLOGIC" className="w-28 hidden md:block"/>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Company
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <Link href="https://www.instagram.com/overlogic.id/" className="hover:underline text-sm">
                    Overlogic
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <Link
                    href="https://github.com/overlogic-universe/"
                    className="hover:underline text-sm"
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/overlogic.id/"
                    className="hover:underline text-sm"
                  >
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                More
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <Link href="/about" target="_blank" className="hover:underline text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/Josumaru/my-virtual-doctor/blob/main/README.md" target="_blank" className="hover:underline text-sm">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Connect
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <Link href="https://www.instagram.com/josutomaru/" target="_blank" className="hover:underline text-sm">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/Josumaru/" target="_blank" className="hover:underline text-sm">
                    Github
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/in/josumaru/" target="_blank" className="hover:underline text-sm">
                    Linkedin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link href="https://www.instagram.com/overlogic.id/" target="_blank" className="hover:underline text-sm">
              Overlogic™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/auth";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Create a separate LoginButton component
const LoginButton = () => {
  return (
    <a
      className="hidden rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 lg:block"
      href="/auth/login"
    >
      Login
    </a>
  );
};

// Create a separate RegisterButton component
const RegisterButton = () => {
  return (
    <a
      className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 lg:block"
      href="/auth/register"
    >
      Register
    </a>
  );
};

// Navbar component
export const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, username } = useSelector(
    (state: RootState) => state.auth
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const onLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="bg-gray-100 px-4 py-5 w-full">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center mr-8"
          >
            <h2 className="text-3xl font-bold ml-10">EduNex</h2>
          </a>
        </div>
        <div className="hidden lg:block">
          <Navbar className="bg-gray-100">
            <NavbarContent
              className="sm:flex gap-4 bg-gray-100"
              justify="center"
            >
              <NavbarItem>
                <Link color="foreground" href="/blog" className=" text-lg">
                  Blog
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  href="/contact-us"
                  color="foreground"
                  className=" text-lg"
                >
                  Contact-us
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/about-us" className=" text-lg">
                  About Us
                </Link>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
        </div>
        {isAuthenticated ? (
          <div className="px-5 py-2.5 mr-10 lg:block hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <p className="font-bold">Signed as</p>
                <p>{username}</p>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <button
                  onClick={() => {
                    onLogout();
                  }}
                >
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="sm:flex sm:gap-4 mr-8 hidden md:hidden lg:flex lg:gap-4">
            <LoginButton />
            <RegisterButton />
          </div>
        )}
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={openMenu}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <a
                      href="/"
                      aria-label="Company"
                      title="Company"
                      className="inline-flex items-center mr-8"
                    >
                      <h2 className="text-2xl">EduNex</h2>
                    </a>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={closeMenu}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3 c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="/blog"
                        aria-label="Your Learning"
                        title="Your Learning"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact-us"
                        aria-label="Features"
                        title="Features"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Contact-Us
                      </a>
                    </li>

                    <li>
                      <a
                        href="/about-us"
                        aria-label="About Us"
                        title="About Us"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        About Us
                      </a>
                    </li>
                    {isAuthenticated ? (
                      <li>
                        <a
                          aria-label="Sign in"
                          title="Sign in"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          <button
                            onClick={() => {
                              onLogout();
                            }}
                          >
                            Logout
                          </button>
                        </a>
                      </li>
                    ) : (
                      <>
                        <li>
                          <a
                            href="/auth/login"
                            aria-label="Sign in"
                            title="Sign in"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Sign in
                          </a>
                        </li>
                        <li>
                          <a
                            href="/auth/register"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            aria-label="Sign up"
                            title="Sign up"
                          >
                            Sign up
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

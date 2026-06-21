"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  DocumentTextIcon,
  TagIcon,
  Bars3Icon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
  WrenchScrewdriverIcon,
  EnvelopeIcon,
  CircleStackIcon,
  CodeBracketSquareIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface NavGroup {
  name: string;
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    name: "Main",
    items: [{ name: "Dashboard", href: "/admin", icon: HomeIcon }],
  },
  {
    name: "Content",
    items: [
      { name: "Posts", href: "/admin/posts/list", icon: DocumentTextIcon },
      { name: "Categories", href: "/admin/categories/list", icon: TagIcon },
      { name: "Projects", href: "/admin/projects", icon: CodeBracketSquareIcon },
      {
        name: "Project Categories",
        href: "/admin/project-categories/list",
        icon: Squares2X2Icon,
      },
      {
        name: "Service Types",
        href: "/admin/service-types/list",
        icon: WrenchScrewdriverIcon,
      },
      { name: "Logos", href: "/admin/logos", icon: CircleStackIcon },
    ],
  },
  {
    name: "Inbox",
    items: [
      {
        name: "Contact Messages",
        href: "/admin/contact-messages/list",
        icon: EnvelopeIcon,
      },
    ],
  },
];

function NavLink({
  item,
  pathname,
  onClick,
}: {
  item: NavItem;
  pathname: string;
  onClick?: () => void;
}) {
  const isActive = pathname === item.href;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`${
        isActive
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
    >
      <item.icon
        className={`${
          isActive
            ? "text-gray-300"
            : "text-gray-400 group-hover:text-gray-300"
        } mr-3 flex-shrink-0 h-6 w-6`}
        aria-hidden="true"
      />
      {item.name}
    </Link>
  );
}

function NavSection({
  groups,
  pathname,
  onClick,
}: {
  groups: NavGroup[];
  pathname: string;
  onClick?: () => void;
}) {
  return (
    <>
      {groups.map((group) => (
        <div key={group.name} className="mb-4">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
            {group.name}
          </p>
          {group.items.map((item) => (
            <NavLink
              key={item.name}
              item={item}
              pathname={pathname}
              onClick={onClick}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  // Don't render sidebar if not authenticated or still loading
  if (isLoading || !user) {
    return null;
  }

  const userNavigation: NavItem[] = [
    {
      name: "Change Password",
      href: "/admin/auth/change-password",
      icon: CogIcon,
    },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 flex w-full max-w-xs">
            <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
              <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <h1 className="text-xl font-bold text-white">Blog Admin</h1>
                </div>

                {/* User info */}
                <div className="mt-6 px-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-gray-300" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </div>

                <nav className="mt-6 flex-1 px-2">
                  <NavSection
                    groups={navigationGroups}
                    pathname={pathname}
                    onClick={() => setSidebarOpen(false)}
                  />
                </nav>

                {/* User navigation */}
                <div className="px-2 mb-4">
                  <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Account
                  </p>
                  {userNavigation.map((item) => (
                    <NavLink
                      key={item.name}
                      item={item}
                      pathname={pathname}
                      onClick={() => setSidebarOpen(false)}
                    />
                  ))}

                  <button
                    onClick={() => {
                      logout();
                      setSidebarOpen(false);
                    }}
                    className="w-full text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
          <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-white">Blog Admin</h1>
            </div>

            {/* User info */}
            <div className="mt-6 px-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-gray-300" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>

            <nav className="mt-6 flex-1 px-2">
              <NavSection groups={navigationGroups} pathname={pathname} />
            </nav>

            {/* User navigation */}
            <div className="px-2">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Account
              </p>
              {userNavigation.map((item) => (
                <NavLink key={item.name} item={item} pathname={pathname} />
              ))}

              <button
                onClick={logout}
                className="w-full text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"
              >
                <ArrowRightOnRectangleIcon className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}

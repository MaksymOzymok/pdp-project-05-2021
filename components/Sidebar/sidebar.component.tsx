import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./sidebar.module.scss";
import clsx from "clsx";

const Sidebar = () => {
  const router = useRouter();

  const navItems = [
    { caption: "Клієнти", base: "/" },
    { caption: "Замовлення", base: "/orders" },
  ];

  return (
    <aside className={styles.asside}>
      <div>
        <p className={styles.caption}>CRM admin</p>
      </div>

      <nav className={styles.nav}>
        {navItems.map(({ caption, base }) => (
          <li
            key={caption}
            className={clsx(styles.navItem, {
              [styles.navItemActive]: router.pathname.includes(base),
            })}
          >
            <Link href={base}>
              <a>{caption}</a>
            </Link>
          </li>
        ))}
      </nav>
    </aside>
  );
};

export { Sidebar };

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./sidebar.module.scss";
import clsx from "clsx";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className={styles.asside}>
      <div>
        <p className={styles.caption}>CRM admin</p>
      </div>

      <nav className={styles.nav}>
        <li
          key={"/"}
          className={clsx(styles.navItem, {
            [styles.navItemActive]:
              router.pathname == "/" ||
              router.pathname.includes("/editclient") ||
              router.pathname.includes("/newclient"),
          })}
        >
          <Link href={"/"}>
            <a>Клієнти</a>
          </Link>
        </li>
        <li
          key={"/orders"}
          className={clsx(styles.navItem, {
            [styles.navItemActive]:
              router.pathname == "/orders" ||
              router.pathname.includes("/new-order"),
          })}
        >
          <Link href={"/orders"}>
            <a>Замовлення</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export { Sidebar };

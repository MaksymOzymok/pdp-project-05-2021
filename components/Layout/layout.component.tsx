import React from "react";
import Head from "next/head";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import { useRouter } from "next/router";
import styles from "./layout.module.scss";

const Layout = (props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>PDP CRM</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        />
      </Head>
      {router.pathname === "/login" || router.pathname === "/nuevacuenta" ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>{props.children}</div>
        </div>
      ) : (
        <div className={styles.content}>
          <Sidebar />

          <main className={styles.main}>
            <Header />
            {props.children}
          </main>
        </div>
      )}
    </>
  );
};

export { Layout };

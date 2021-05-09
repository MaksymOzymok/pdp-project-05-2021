import React from "react";
import Head from "next/head";
import { Sidebar } from "../Sidebar";
import { useRouter } from "next/router";
import styles from "./layout.module.scss";

const Layout = (props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>PDP CRM</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
          crossOrigin="anonymous"
        />
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        />
      </Head>
      {router.pathname === "/login" ? (
        <div className={styles.container}>
          <div>{props.children}</div>
        </div>
      ) : (
        <div className={styles.content}>
          <Sidebar />

          <main className={styles.main}>{props.children}</main>
        </div>
      )}
    </>
  );
};

export { Layout };

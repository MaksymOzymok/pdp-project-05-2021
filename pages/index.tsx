import React, { useState, useEffect } from "react";
import { Layout } from "../components";
import { useRouter } from "next/router";
import Link from "next/link";
import { Client } from "../components/Client";
import { getCurrentSeller, getClients } from "../helpers";
import styles from "../styles/index.module.scss";

function Home() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const isAuth = JSON.parse(localStorage.getItem("isAuth"));
    if (!isAuth) {
      router.push("/login");
    } else {
      const seller = getCurrentSeller();
      getClients(seller.id).then((res) => setClients(res.data));
    }
  }, []);
  return (
    <Layout>
      <h1 className={styles.header}>Клієнти</h1>
      <Link href="/newclient">
        <a className={styles.newClient}>Новий клієнт</a>
      </Link>

      <div>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
              <th className={styles.tableCell}>Ім'я</th>
              <th className={styles.tableCell}>Компанія</th>
              <th className={styles.tableCell}>Email</th>
              <th className={styles.tableCell}>Дії</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {clients.map((client) => (
              <Client
                key={client.id}
                data={client}
                clients={clients}
                setClients={setClients}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Home;

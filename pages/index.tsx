import React, { useState, useEffect } from "react";
import { Layout } from "../components";
import { useRouter } from "next/router";
import Link from "next/link";
import { Client } from "../components/Client";
import { getCurrentSeller, getClients } from "../helpers";
import styles from "./index.module.scss";

function Home() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const isAuth = JSON.parse(localStorage.getItem("isAuth"));
    if (!isAuth) {
      // router.push("/login");
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

      <div className="overflow-x-scroll">
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Ім'я</th>
              <th className="w-1/5 py-2">Компанія</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
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

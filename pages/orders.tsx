import React, { useState, useEffect } from "react";
import { Layout, Order } from "../components";
import Link from "next/link";
import axiosClient from "../config/axios";
import styles from "../styles/orders.module.scss";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosClient.get("orders").then((res) => {
      setOrders(res.data);
    });
  }, []);
  return (
    <Layout>
      <h1 className={styles.header}>Замовлення</h1>
      <Link href="/new-order">
        <a className={styles.newOrder}>Нове замовлення</a>
      </Link>
      <div className={styles.orders}>
        {orders.map((order) => (
          <Order key={order.id} data={order} />
        ))}
      </div>
    </Layout>
  );
}

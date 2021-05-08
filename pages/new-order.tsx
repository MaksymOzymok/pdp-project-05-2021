import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import axiosClient from "../config/axios";
import Swal from "sweetalert2";
import { getCurrentSeller, getClients, statusOptions } from "../helpers";
import styles from "../styles/new-order.module.scss";
import Select from "react-select";

const NewClient = () => {
  const router = useRouter();

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState<{
    productsId: any[];
    total: any;
    client: any;
    status: any;
  }>(null);

  const clientOptions = clients.map((client) => ({
    label: client.name,
    value: client.name,
  }));
  const productOpstions = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  const onBackClick = () => {
    router.push("/orders");
  };

  useEffect(() => {
    const seller = getCurrentSeller();
    getClients(seller.id).then((res) => setClients(res.data));
    axiosClient.get("products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let productsSubmit = [];
      data?.productsId.map((id) => {
        productsSubmit.push(
          products.filter((product) => product.id === id.value)[0]
        );
      });
      const order = {
        id: uuidv4(),
        products: productsSubmit,
        total: data?.total,
        clientName: data?.client.value,
        status: data?.status,
      };
      await axiosClient.post("orders", order);
      Swal.fire("Успіх!", "Додано нове замовлення", "success").then((res) => {
        if (res.value) router.push("/orders");
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Упс", "Щось пішло не так", "error");
    }
  };
  return (
    <Layout>
      <h1 className={styles.caption}>Нове замовлення</h1>

      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.label}>Клієнт:</div>
          <Select
            options={clientOptions}
            onChange={(e) => setData((prev) => ({ ...prev, client: e }))}
          />

          <div className={styles.label}>Продукти:</div>
          <Select
            isMulti
            options={productOpstions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => setData((prev) => ({ ...prev, productsId: e }))}
          />

          <div>
            <label className={styles.label} htmlFor="total">
              Загальна сума
            </label>
            <input
              className={styles.input}
              id="total"
              type="text"
              placeholder="Total"
              onChange={(e) => {
                const total = e.target.value;
                setData((prev) => ({ ...prev, total }));
              }}
            />
          </div>
          <div className={styles.label}>Статус:</div>
          <Select
            options={statusOptions}
            onChange={(e) => setData((prev) => ({ ...prev, status: e }))}
          />

          <button type="submit" className={styles.create}>
            Створити замовлення
          </button>
          <button type="button" className={styles.back} onClick={onBackClick}>
            Назад
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default NewClient;

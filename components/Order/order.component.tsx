import React, { useState } from "react";
import Select from "react-select";
import { statusOptions } from "../../helpers";
import styles from "./order.module.scss";
import clsx from "clsx";
import axiosClient from "../../config/axios";

const Order = ({ data }) => {
  const { products, clientName, status, total, id } = data;

  const [orderStatus, setOrderStatus] = useState(status);

  const handleChange = async (value) => {
    setOrderStatus(value);
    try {
      const response = await axiosClient.put(`orders/${id}`, {
        ...data,
        status: value,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (value) => {
    try {
      const response = await axiosClient.delete(`orders/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={clsx(
        styles.order,
        { [styles.green]: orderStatus?.value === "completed" },
        { [styles.red]: orderStatus?.value === "canceled" },
        { [styles.yellow]: orderStatus?.value === "pending" }
      )}
    >
      <div className={styles.delete} onClick={handleDelete}>
        Видалити
      </div>
      <div className={styles.container}>
        <div className={styles.caption}>Продукти:</div>
        {products.map((product, index) => (
          <div className={styles.item}>{product?.name}</div>
        ))}
        <div className={styles.client}>
          Клієнт:
          <span>{" " + clientName}</span>
        </div>
        <div>Статус:</div>

        <Select
          defaultValue={orderStatus}
          options={statusOptions}
          onChange={(e) => handleChange(e)}
        />
        <div className={styles.amount}>Total: {total}</div>
      </div>
    </div>
  );
};
export { Order };

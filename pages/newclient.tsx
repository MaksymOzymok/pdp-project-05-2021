import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import axiosClient from "../config/axios";
import Swal from "sweetalert2";
import { getCurrentSeller } from "../helpers";
import styles from "../styles/newclient.module.scss";

const NewClient = () => {
  const router = useRouter();

  const onBackClick = () => {
    router.push("/");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      company: "",
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const seller = getCurrentSeller();

        const client = {
          ...values,
          id: uuidv4(),
          role: "client",
          sellerId: seller.id,
        };
        const respose = await axiosClient.post("users", client);
        console.log(respose);
        Swal.fire("Успіх!", "Додано нового клієнта", "success").then((res) => {
          if (res.value) router.push("/");
        });
      } catch (error) {
        console.log(error);
        Swal.fire("Упс...", "Щось пішло не так!", "error");
      }
    },
  });

  return (
    <Layout>
      <h1 className={styles.caption}>Новий клієнт</h1>
      <div className={styles.container}>
        <div>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.item}>
              <label className={styles.label} htmlFor="name">
                Ім'я
              </label>
              <input
                className={styles.input}
                id="name"
                type="text"
                placeholder="Ім'я"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>

            <div className={styles.item}>
              <label className={styles.label} htmlFor="company">
                Компанія
              </label>
              <input
                className={styles.input}
                id="company"
                type="text"
                placeholder="Компанія"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.company}
              />
            </div>

            <div className={styles.item}>
              <label className={styles.label} htmlFor="email">
                Електронна пошта
              </label>
              <input
                className={styles.input}
                id="email"
                type="text"
                placeholder="Електронна пошта"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            <div className={styles.item}>
              <label className={styles.label} htmlFor="password">
                Пароль
              </label>

              <input
                className={styles.input}
                id="password"
                type="password"
                placeholder="Пароль"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            <button type="submit" className={styles.create}>
              Створити клієнта
            </button>
            <button onClick={onBackClick} className={styles.back}>
              Назад
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewClient;

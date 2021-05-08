import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axiosClient from "../../config/axios";
import Swal from "sweetalert2";
import styles from "../../styles/newclient.module.scss";

const EditClient = () => {
  const [client, setClient] = useState<{
    id: string;
    name: string;
    company: string;
    email: string;
    password: string;
  }>(null);

  const router = useRouter();
  const {
    query: { id },
  } = router;

  useEffect(() => {
    axiosClient.get(`users?id=${id}`).then((res) => {
      console.log(res.data);
      setClient(res.data[0]);
    });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: client?.name,
      company: client?.company,
      email: client?.email,
      password: client?.password,
    },
    onSubmit: async (data) => {
      try {
        const updatedClient = { ...client, ...data };
        const respose = await axiosClient.put(
          `users/${client?.id}`,
          updatedClient
        );
        Swal.fire("Успіх", "Інформація клієнта оновлено ", "success").then(
          (res) => {
            if (res.value) router.push("/");
          }
        );
      } catch (error) {
        console.log(error);
        Swal.fire("Упс...", "Щось пішло не так", "error");
      }
    },
  });

  const onBackClick = () => {
    router.push("/");
  };

  return (
    <Layout>
      <h1 className={styles.caption}>Оновити інформацію по клієнту</h1>
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
              Підтвердити
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
export default EditClient;

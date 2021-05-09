import React from "react";
import { Layout } from "../components/Layout";
import { useFormik } from "formik";
import axiosClient from "../config/axios";
import { useRouter } from "next/router";
import styles from "../styles/login.module.scss";

export default function Home() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async () => {
      const { data } = await axiosClient.get("users");
      console.log(data);
      localStorage.setItem("isAuth", "true");
      const { email, name, id } = data[0];
      const userAuth = {
        email,
        name,
        id,
      };
      localStorage.setItem("userData", JSON.stringify(userAuth));
      router.push("/");
    },
  });
  return (
    <Layout>
      <h1 className={styles.caption}>Увійти</h1>
      <div className={styles.container}>
        <div>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div>
              <label className={styles.label} htmlFor="email">
                Електронна пошта
              </label>

              <input
                className={styles.input}
                id="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="password">
                Пароль
              </label>

              <input
                className={styles.input}
                id="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>

            <input
              type="submit"
              className={styles.login}
              value="Авторизуватись"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}

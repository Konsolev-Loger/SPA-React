import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../entities/user/UserStore";
import styles from "./LoginForm.module.css";

const loginSchema = z.object({
  name: z.string().min(4, "Имя должно быть длиннее 3 символов"),
  email: z
    .string()
    .email("Неверный формат email")
    .endsWith("@gmail.com", "Email должен заканчиваться на @gmail.com"),
  password: z
    .string()
    .min(6, "Пароль должен быть минимум 6 символов")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Пароль должен содержать хотя бы один специальный символ"),
});

type RegisterFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setUser({
      name: data.name,
      email: data.email,
      status: true,
    });

    navigate("/profile", { replace: true });
  };


  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Login to Your Account</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              disabled={isSubmitting}
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              {...register("name")}
            />
            {errors.name && (
              <span className={styles.errorMessage}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              disabled={isSubmitting}
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.errorMessage}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              disabled={isSubmitting}
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              {...register("password")}
            />
            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`${styles.button} ${isSubmitting ? styles.buttonDisabled : ""}`}
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

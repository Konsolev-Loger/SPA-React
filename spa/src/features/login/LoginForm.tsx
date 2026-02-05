import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../entities/user/UserStore";
import styles from "./LoginForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  name: z
    .string({ message: "Имя обязательно" })
    .min(4, { message: "Имя должно быть длиннее 3 символов" }),

  email: z
    .string({ message: "Email обязателен" })
    .email({ message: "Неверный формат email" })
    .endsWith("@gmail.com", {
      message: "Email должен заканчиваться на @gmail.com",
    }),

  password: z
    .string({ message: "Пароль обязателен" })
    .min(6, { message: "Пароль должен быть минимум 6 символов" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Пароль должен содержать хотя бы один специальный символ",
    }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  // ===========================================================================
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // Валидация при изменении
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  // ===========================================================================
  const onSubmit = async (data: RegisterFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setUser({
      name: data.name,
      email: data.email,
    });
    navigate("/profile");
  };
  // ===========================================================================
  const isButtonDisabled = !isValid || !isDirty || isSubmitting;

  return (
    <>
      <div>Login to Your Account</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <div className={styles.field}>
          Name
          <input
            type="text"
            placeholder="Enter your name"
            disabled={isSubmitting}
            className={styles.input}
            {...register("name")}
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>

        <div className={styles.field}>
          Email
          <input
            type="email"
            placeholder="Enter your email"
            disabled={isSubmitting}
            className={styles.input}
            {...register("email")}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.field}>
          Password
          <input
            type="password"
            placeholder="Enter your password"
            disabled={isSubmitting}
            className={styles.input}
            {...register("password")}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isButtonDisabled}
          className={styles.button}
        >
          {isSubmitting ? "Loading" : "Login"}
        </button>
      </form>
    </>
  );
}

import { useUserStore } from "../../entities/user/UserStore";
import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <div className={styles.page}>No user data</div>;
  }

  return (
    <div className={styles.page}>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

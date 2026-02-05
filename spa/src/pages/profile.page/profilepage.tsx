import { useUserStore } from "../../entities/user/UserStore";
import { useNavigate } from "react-router";
import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  if (!user) {
    return <div className={styles.page}>NotFound</div>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Your profile</h1>

      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.profileItem}>
            <p className={styles.label}>Name</p>
            <h2 className={styles.value}>{user.name}</h2>
          </div>

          <div className={styles.profileItem}>
            <p className={styles.label}>Email</p>
            <h2 className={styles.value}>{user.email}</h2>
          </div>
        </div>
      </div>

      <button type="button" className={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

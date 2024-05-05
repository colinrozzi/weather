import styles from './weatherApp.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.box}>
          <a href='/'>weather.io</a>
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.box}>
          <a href='/help'>help</a>
        </div>
        <div className={styles.box}>
          <a href='/sign-out'>sign out</a>
        </div>
      </div>
    </div>
  );
}
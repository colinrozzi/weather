import styles from "./weatherApp.module.css";
import Header from "./Header";
import ContentArea from "./ContentArea";

export default function WeatherApp() {
  return (
    <div className={styles.top}>
      <Header />
      <ContentArea />
    </div>
  )
}
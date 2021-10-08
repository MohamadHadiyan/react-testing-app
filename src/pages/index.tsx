import Counter from "../components/counter/Counter";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Counter defaultCount={0} description="My Counter" />
    </div>
  );
}

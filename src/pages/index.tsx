import Counter from "../components/counter/Counter";
import RightDrawer from "../components/moking_examples/drawer/RightDrawer";
import GiveMoney from "../components/moking_examples/mock_with_mui/TableData";
import styles from "../styles/Home.module.css";

export default function Home() {
  const onMoney = (num: number) => {
    console.log(num);
  };

  return (
    <div className={styles.container}>
      {/* <Counter defaultCount={10} description="My Counter" /> */}
      {/* <GiveMoney onMoney={onMoney} /> */}
      <RightDrawer />
    </div>
  );
}

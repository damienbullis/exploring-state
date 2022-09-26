import styles from "./App.module.sass";
import AppSpread from "./App.spread";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.info}></div>
      <div className={styles.wrap}>
        <div className={styles._controller}></div>
        <AppSpread />
      </div>
    </div>
  );
}

export default App;

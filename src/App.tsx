import styles from "./App.module.sass";
import AppSpread from "./App.spread";
// import AppPrev from "./App.prev";
import useMarkdowns from "./hooks/useMarkdowns";

function App() {
  const [spreadMarkdown] = useMarkdowns();
  return (
    <div className={styles.app}>
      <div className={styles.info}></div>
      <div className={styles.wrap}>
        <div className={styles._controller}>
          <button>left</button>
          <button>right</button>
        </div>
        <AppSpread md={spreadMarkdown} />
      </div>
    </div>
  );
}

export default App;

import styles from "./App.module.sass";
import AppSpread from "./App.spread";
// import AppPrev from "./App.prev";
import useMarkdowns from "./hooks/useMarkdowns";

function App() {
  const [spreadMarkdown] = useMarkdowns();
  return (
    <div className={styles.app}>
      <div className={styles._controller}>
        {/* 
            TODO: turn this into a component carousel
            that can be used to switch between the different
            implementations of the set state card components
            <Carousel tabs={["Spread", "Prev"]}>
            and internally controls the state of the active tab
            with buttons to switch between the tabs
          */}
        <button>left</button>
        <button>right</button>
      </div>
      <AppSpread md={spreadMarkdown} />
    </div>
  );
}

export default App;

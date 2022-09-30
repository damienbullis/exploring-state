import styles from "./App.module.sass";
import AppSpread from "./App.spread";
import Carousel from "./components/Carousel/Carousel";
// import AppPrev from "./App.prev";
import useMarkdowns from "./hooks/useMarkdowns";

function App() {
  const [spreadMarkdown] = useMarkdowns();
  return (
    <div className={styles.app}>
      <Carousel>
        <AppSpread md={spreadMarkdown} />
      </Carousel>
    </div>
  );
}

export default App;

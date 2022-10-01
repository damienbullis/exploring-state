import styles from "./App.module.sass";
import AppPrev from "./App.prev";
import AppSpread from "./App.spread";
import Carousel from "./components/Carousel/Carousel";
import useMarkdowns from "./hooks/useMarkdowns";

function App() {
  const [spreadMarkdown, prevState] = useMarkdowns();
  return (
    <div className={styles.app}>
      <Carousel>
        <AppSpread md={spreadMarkdown} />
        <AppPrev md={prevState} />
      </Carousel>
    </div>
  );
}

export default App;

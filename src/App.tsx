import styles from "./App.module.sass";
import AppPrev from "./App.prev";
import AppSpread from "./App.spread";
import AppPubSub from "./App.pubSub";
import Carousel from "./components/Carousel/Carousel";
import useMarkdowns from "./hooks/useMarkdowns";

function App() {
  const [spreadMarkdown, prevState, reducer, pubSub] = useMarkdowns();
  return (
    <div className={styles.app}>
      <Carousel>
        <AppSpread md={spreadMarkdown} />
        <AppPrev md={prevState} />
        <AppPubSub md={pubSub} />
      </Carousel>
    </div>
  );
}

export default App;

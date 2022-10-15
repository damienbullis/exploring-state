import styles from "./App.module.sass";
import AppSingle from "./App.single";
import AppPrev from "./App.prev";
import AppSpread from "./App.spread";
import AppPubSub from "./App.pubSub";
import Carousel from "./components/Carousel/Carousel";
import useMarkdowns from "./hooks/useMarkdowns";

function App() {
  const [single, spread, prevState, reducer, pubSub] = useMarkdowns();
  return (
    <div className={styles.app}>
      <Carousel>
        <AppSingle md={single} />
        <AppSpread md={spread} />
        <AppPrev md={prevState} />
        <AppPubSub md={pubSub} />
      </Carousel>
    </div>
  );
}

export default App;

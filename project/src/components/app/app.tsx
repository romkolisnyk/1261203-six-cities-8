import MainPage from '../main-page/main-page';

type AppScreenProps = {
  offersCount: number;
}

function App({ offersCount }: AppScreenProps): JSX.Element {
  return <MainPage offersCount={offersCount} />;
}

export default App;

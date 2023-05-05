import './App.css';
import Pokemones from './componentes/Pokemones';
import { Provider } from 'react-redux';
import generateStore from './redux/store';

function App() {

  const store = generateStore()

  return (
    <Provider store={store}>
      <Pokemones/>
    </Provider>
  );
}

export default App;

import Install from './components/Install';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  


  if (window.ethereum) {
    return <Home/>;
  } else {
    return <Install />
  }
}

export default App;
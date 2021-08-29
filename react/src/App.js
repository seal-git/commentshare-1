import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
    const onclickevent = () => {
       axios.post('/api/api_test', {data: "test"})
                           .then(result => {
                               console.log('success')
                           })
                           .catch(error => {
                               console.log('error')
                           })
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <button className="App-link"
                        onClick={onclickevent}>
                    api
                </button>
            </header>
        </div>
    );
}

export default App;

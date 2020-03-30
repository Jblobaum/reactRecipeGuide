import React, { component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import home from './Pages/home';
import signUp from './Pages/signUp';
import login from './Pages/login';
import navBar from './Components/navBar';




class App extends Component {
    render() {
        return (
            <div className="App">
             <Router>
                 <navBar />
                 <Switch>
                     <Route exact path="/" component= {home} />
                     <Route exact path="signup" component= {signUp} />
                     <Route exact path="login" component= {login} /> 
                 </Switch>
             </Router>
            </div>
        )
    }
}


export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Affected from './Affected';
import Vaccinated from './Vaccinated';
import NeighboringCountries from './NeighboringCountries';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/affected">Affected</Link></li>
          <li><Link to="/vaccinated">Vaccinated</Link></li>
          <li><Link to="/neighboring-countries">Neighboring Countries</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/affected" component={Affected} />
        <Route path="/vaccinated" component={Vaccinated} />
        <Route path="/neighboring-countries" component={NeighboringCountries} />
      </Switch>
    </Router>
  );
};

export default App;

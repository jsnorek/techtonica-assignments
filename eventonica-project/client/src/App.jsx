import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/routes/Navbar";
import ListEvents from "./components/ListEvents";
import { useState } from "react";

function App() {

  const [searchString, setSearchString] = useState('');

  return (
    <div className="App">
      <MyNavBar {...{searchString, setSearchString}}/>
      <ListEvents {...{searchString}}/>
    </div>
  );
}

export default App;
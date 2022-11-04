import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import Home from "./Home/Home";
import ChatRoom from "./ChatRoom/ChatRoom";

function App() {
  const [username, setUsername] = React.useState("");

  const handleEnterUsername = (name) => {
    setUsername(name);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home handleEnterUsername={handleEnterUsername} />
        </Route>
        <Route exact path="/room">
          <ChatRoom username={username} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

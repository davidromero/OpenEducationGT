import React from "react";
import NavBar from "./NavBar";
import {Dashboard} from "./Dashboard";
import {Error404} from "./Error404";
import {Route, Switch} from "react-router-dom";


const Home = () => {

  return (
    <div style={{display: "flex"}}>
      <NavBar/>
      <main className={"home-frame"}>
        <div className={"home-content"}>
          <Switch>
            <Route exact path={"/"} component={Dashboard}/>
            <Route path='*' exact={true} component={Error404}/>
          </Switch>
        </div>
      </main>
    </div>
  );
};


export {Home};
import React = require("react");

(window as any).$ = (window as any).JQuery = require('jquery');
(window as any).moment = require("moment");

import "./App.less"

import { action, observable } from "mobx";
import { Header } from "./components/Header/Header";
import { Content } from "./components/Content/Content";
import { observer } from "mobx-react";

export const THEMES = {
  light: "Светлая тема",
  dark: "Темная тема",
}

@observer
export class App extends React.Component {
  
  // TODO
  @observable
  themeClass: string = "light";
  
  @action
  toggleTheme() {
    this.themeClass = this.themeClass === "light" ? "dark" : "light"; 
  }

  render() {
    return (
      <div className={`app ${this.themeClass}`}>
        <Header theme={this.themeClass} themeChange={this.toggleTheme.bind(this)}/>
        <Content />
      </div>
    );

  }
}

export default App;

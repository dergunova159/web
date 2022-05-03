import { action, observable } from "mobx";
import { observer } from "mobx-react";
import React = require("react");
import { Button } from "../Controls/Button";
import "./Content.less";


@observer
export class Content extends React.Component<{}, {}> {
  @observable
  calendarMode: boolean = false;

  @observable
  action: "new" | "edit" = "new";

  componentDidMount() {
    this.loadData();
  }

  @action
  loadData() {
    // TODO
  }

  @action
  changeMode() {
    this.calendarMode = !this.calendarMode;
  }

  @action
  reload() {
    this.loadData();
  }

  @action
  newClick() {
    this.action = "new";
  }

  render() {
    return (
      <div className="content">
        <div className="content-actions">
          <div className="action-btn-group">
            <div className="action-btn">
              <Button onClick={this.reload.bind(this)} content={"Обновить"} />
            </div>
            <div className="action-btn">
              <Button onClick={this.newClick.bind(this)} content={"Создать"} />
            </div>
          </div>
          <div className="action-btn-group">
            <div className="action-btn" style={{ float: "right" }}>
              <Button onClick={this.changeMode.bind(this)} content={this.calendarMode ? "Табличный режим" : "Календарный режим"} />
            </div>
          </div>
        </div>
        <div className="content-data"></div>
      </div>
    )
  }
}
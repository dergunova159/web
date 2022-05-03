import { action, observable } from "mobx";
import { observer } from "mobx-react";
import React = require("react");
import { GetIssues, IData } from "../../api/SysApi";
import { Calendar } from "../Calendar/Calendar";
import { Button } from "../Controls/Button";
import { Modal } from "../Modal/Modal";
import { RegisterTable } from "../RegisterTable/RegisterTable";
import "./Content.less";


@observer
export class Content extends React.Component<{}, {}> {
  @observable
  calendarMode: boolean = false;

  @observable
  modalOpen: boolean = false;
  
  @observable
  data: Array<IData> = [];

  @observable
  lastObject: IData = null;

  @observable
  action: "new" | "edit" = "new";

  componentDidMount() {
    this.loadData();
  }

  @action
  loadData() {
    GetIssues().then(res => (this.data = res));
  }

  @action
  changeMode() {
    this.calendarMode = !this.calendarMode;
  }

  @action
  onModalClose() {
    this.modalOpen = false;
    this.lastObject = null;
  }

  @action
  objectClick(id: number) {
    this.modalOpen = true;
    this.lastObject = { ...this.data.find(el => el.id === id) };
    this.action = "edit";
  }

  objectContent() {
    if (!this.modalOpen) {
      return null;
    }
    return (
      <Modal
        open={this.modalOpen}
        onClose={this.onModalClose.bind(this)}
        width={400}
        title={"Информация о задаче"}
      >
        Test modal
      </Modal>
    )
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
        <div className="content-data">
          {this.calendarMode ? (
            <Calendar
              data={this.data}
              onObjectClick={null}
            />
          ) : (
            <RegisterTable
              data={this.data}
              onObjectClick={null}
            />
          )}
        </div>
      </div>
    )
  }
}
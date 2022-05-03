import { action, observable } from "mobx";
import { observer } from "mobx-react";
import React = require("react");
import { DeleteIssue, EditIssue, GetIssues, IData, NewIssue } from "../../api/SysApi";
import { Calendar } from "../Calendar/Calendar";
import { Button } from "../Controls/Button";
import { TextControl } from "../Controls/TextControl";
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

  @action
  onSave() {
    if (this.action === "new") {
      NewIssue(this.lastObject).then(res => {
        this.loadData();
      });
    }
    else if (this.action === "edit") {
      EditIssue(this.lastObject).then(res => {
        this.loadData();
      })
    }
    this.onModalClose();
  }

  @action
  onDelete() {
    DeleteIssue(this.lastObject).then(res => {
      this.loadData();
    })
    this.onModalClose();
  }

  @action
  changeOption(option: string, value: any) {
    this.lastObject[option] = value;
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
        <div className="object-content container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <TextControl label={"Наименование"} value={this.lastObject.name} onChange={val => this.changeOption("name", val)} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <TextControl label={"Дата начала"} value={this.lastObject.start} onChange={val => this.changeOption("start", val)} />
            </div>
            <div className="col-xs-6">
              <TextControl label={"Дата конца"} value={this.lastObject.end} onChange={val => this.changeOption("end", val)} />
            </div>
          </div>
          <div className="row object-content-footer">
            <div className="col-xs-12">
              {this.action === "edit" ? (
                <Button
                  onClick={this.onDelete.bind(this)}
                  content={"Удалить"}
                  primary={true}
                />
              ) : null}
              <Button
                onClick={this.onSave.bind(this)}
                content={"Сохранить"}
                primary={true}
                style={{ float: "right" }}
              />
            </div>
          </div>
        </div>
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
    this.modalOpen = true;
    this.lastObject = {};
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
              onObjectClick={this.objectClick.bind(this)}
            />
          ) : (
            <RegisterTable
              data={this.data}
              onObjectClick={this.objectClick.bind(this)}
            />
          )}
        </div>
        {this.objectContent()}
      </div>
    )
  }
}
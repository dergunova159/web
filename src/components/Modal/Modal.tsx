import { action, observable } from "mobx";
import { observer } from "mobx-react";
import React = require("react");
import { Button } from "../components/Controls/Button";
import "./Modal.less";

export interface ModalProps {
  open: boolean;
  width?: number;
  height?: number;
  full?: boolean;
  onClose?: () => void;
  title?: string;
}

@observer
export class Modal extends React.Component<ModalProps, {}> {

  @observable
  afterContentClick: boolean = false;

  @action
  backColor(e) {
    if (!this.afterContentClick) {
      this.props.onClose && this.props.onClose();
    }
    this.afterContentClick = false;
  }

  @action
  contentClick(e) {
    this.afterContentClick = true;
  }

  render() {
    if (!this.props.open) {
      return null;
    }
    let style = {
      width: this.props.width,
      height: this.props.height,
    }
    return (
      <div className="custom-modal" onClick={e => this.backColor(e)}>
        <div className="custom-modal-container" style={style} onClick={e => this.contentClick(e)}>
          <div className="custom-modal-header">
            <div className="custom-modal-title">
              {this.props.title}
            </div>
            <div className="custom-modal-actions">
              <Button
                onClick={this.props.onClose}
                content={<span className="glyphicon glyphicon-remove"></span>}
                withoutBorder={true}
                passive={true}
              />
            </div>
          </div>
          <div className="custom-modal-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
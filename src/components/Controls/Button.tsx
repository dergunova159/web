import { action } from "mobx";
import { observer } from "mobx-react";
import React = require("react");
import "./Control.less";

export interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onClick: (e) => void;
  content: string | JSX.Element;
  withoutBorder?: boolean;
  passive?: boolean;
  primary?: boolean;
}

@observer
export class Button extends React.Component<ButtonProps, {}> {

  @action
  onClick(e) {
    this.props.onClick && this.props.onClick(e);
  }

  render() {
    let {className, style, withoutBorder, primary, passive} = this.props;
    return (
      <button
        className={`button-control ${className} ${withoutBorder && "without-border"} ${passive && "passive"} ${primary && "primary"}`}
        onClick={e => this.onClick(e)}
        style={style}
      >
        {this.props.content}
      </button>
    )
  }
}
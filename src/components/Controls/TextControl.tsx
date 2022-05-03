import { action } from "mobx";
import { observer } from "mobx-react";
import React = require("react");
import "./Control.less";

export interface TextControlProps {
  value?: string;
  onChange?: (val: string) => void;
  label?: string;
  realTime?: boolean;
}

@observer
export class TextControl extends React.Component<TextControlProps, {}> {

  control: HTMLInputElement;

  @action
  onChange(e) {
    if(this.props.realTime) {
      this.props.onChange && this.props.onChange(this.control.value);
    }
  }

  @action
  onBlur() {
    if(!this.props.realTime) {
      this.props.onChange && this.props.onChange(this.control.value);
    }
  }

  render() {
    let valueProps = {
      value: this.props.realTime && this.props.value || null,
      defaultValue: this.props.value,
    }
    return (
      <div className="text-control">
        {this.props.label ? <label>{this.props.label}</label> : null}
        <input type="text" ref={ref => (this.control = ref)} {...valueProps} onBlur={this.onBlur.bind(this)} onChange={this.onChange.bind(this)} />
        </div>
    )
  }
}
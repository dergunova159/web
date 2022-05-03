import { action, computed } from "mobx";
import { observer } from "mobx-react";
import React = require("react");

import "fullcalendar/dist/fullcalendar.min.css";
import "fullcalendar/dist/fullcalendar";
import "fullcalendar/dist/locale-all";

import * as FullCalendar from "fullcalendar";

import "./Calendar.less";
import { IData } from "../../api/SysApi";

export interface CalendarProps {
  data: Array<IData>;
  onObjectClick: (id: number) => void;
}

@observer
export class Calendar extends React.Component<CalendarProps> {

  calendar: FullCalendar.Calendar;
  calendarContainer: HTMLDivElement;

  componentDidMount() {
    this.calendar = new FullCalendar.Calendar($(this.calendarContainer), {
      header: {
        left: 'title',
        center: '',
        right: 'today prev,next'
      },
      themeSystem: "bootstrap3",
      height: "100vh",
      defaultView: "month",
      locale: "ru",
      nowIndicator: true,
      selectable: true,
      eventClick: this.eventClick.bind(this),
    } as any);
    this.calendar.initialRender();
    this.refreshData(this.props)
  }

  componentWillReceiveProps(nextProps: CalendarProps, nextContext) {
    this.refreshData(nextProps);
  }

  @action
  refreshData(props: CalendarProps) {
    if(this.calendar) {
      let elems = (props.data || []).map(el => {
        return {
          id: el.id,
          title: el.name,
          start: el.start,
          end: el.end,
          url: "#",
        };
      })

      this.calendar.removeEventSources(null);
      this.calendar.addEventSource(elems);
    }
  }

  @action
  eventClick(event, jsEvent, view) {
    this.props.onObjectClick && this.props.onObjectClick(event.id);
    return false;
  }

  render() {
    return (
      <div ref={ref => (this.calendarContainer = ref)}></div>
    )
  }
}
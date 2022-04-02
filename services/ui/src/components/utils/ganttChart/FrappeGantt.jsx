import React, { Component, createRef } from "react";
import Gantt from "frappe-gantt";
import Task from "./Task";
import "./FrappeGantt.scss";

export default class FrappeGantt extends Component {
  constructor(props) {
    super(props);
    this._target = createRef();
    this._svg = createRef();
    this._gantt = null;

    this.state = {
      viewMode: null,
      tasks: [],
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      viewMode: "Day",
      tasks: nextProps.tasks.map(t => new Task(t)),
    };
  }

  componentDidUpdate() {
    if (this._gantt) {
      this._gantt.refresh(this.state.tasks);
      this._gantt.change_view_mode(this.state.viewMode);
      this._gantt.$svg.setAttribute(
        "height",
        this._gantt.$svg.clientHeight - 135
      );
    }
  }

  componentDidMount() {
    this._gantt = new Gantt(this._svg.current, this.state.tasks, {
      header_height: 50,
      padding: 20,
      on_click: this.props.onClick,
      on_view_change: this.props.onViewChange,
      on_progress_change: (task, progress) => {
        this.props.onProgressChange(task, progress);
        this.props.onTasksChange(this.props.tasks);
      },
      on_date_change: (task, start, end) => {
        this.props.onDateChange(task, start, end);
        this.props.onTasksChange(this.props.tasks);
      },
    });

    if (this._gantt) {
      this._gantt.change_view_mode(this.state.viewMode);
      this._gantt.$svg.setAttribute(
        "height",
        this._gantt.$svg.clientHeight - 135
      );
    }

    const midOfSvg = this._svg.current.clientWidth * 0.5;
    this._target.current.scrollLeft = midOfSvg;
  }

  render() {
    return (
      <div ref={this._target}>
        <svg
          ref={this._svg}
          width="30%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        />
      </div>
    );
  }
}

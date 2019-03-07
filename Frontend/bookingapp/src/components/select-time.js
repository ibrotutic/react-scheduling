import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SelectTime extends Component {
  state = {
    times: [],
    selectedIndex: -1
  };

  componentDidMount() {
    this.getTimes();
  }

  /**
   * This will eventually be populated by the employees availability settings.
   */
  getTimes = () => {
    return new Promise((resolve, reject) => {
      var times = [];
      var beginTime = 540; // 9 am - in minutes
      var endTime = 1020; // 5 pm - in minutes
      var minuteDelta = 30;

      while (beginTime <= endTime) {
        times.push({
          startTime: beginTime,
          endTime: beginTime + minuteDelta
        });

        beginTime += minuteDelta;
      }

      this.setState({ times: times }, resolve());
    });
  };

  getTimeString = time => {
    var timeString = "";

    timeString +=
      Math.floor(time.startTime / 60).toString(10) +
      ":" +
      (time.startTime % 60).toString(10) +
      (!(time.startTime % 60) ? "0" : "") +
      " - ";
    timeString +=
      Math.floor(time.endTime / 60).toString(10) +
      ":" +
      (time.endTime % 60).toString(10) +
      (!(time.endTime % 60) ? "0" : "") +
      (time.endTime < 720 ? "am" : "pm");

    return timeString;
  };

  getSelections = () => {
    var comps;
    comps = this.state.times.map((time, index) => {
      return (
        <MenuItem value={index} key={index}>
          {this.getTimeString(time)}
        </MenuItem>
      );
    });

    return comps;
  };

  handleChange = e => {
    this.setState({ selectedIndex: e.target.value }, () => {
      if (this.props.onChange)
        this.props.onChange(this.state.times[this.state.selectedIndex]);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="time-simple">Time</InputLabel>
          <Select value={this.state.selectedIndex} onChange={this.handleChange}>
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>
            {this.state.times.length && this.getSelections()}
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(SelectTime);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    width: 400
  },
  left: {
    textAlign: "left"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class AppointmentCard extends Component {
  constructor(props) {
    //console.log(props);
    super(props);
    this.state = {
      appt: props.props,
      name: props.props.name,
      org: props.props.org
    };
  }

  componentDidMount() {
    this.createDates();
  }

  createDates = () => {
    let appt = this.state.appt;
    let startTime = new Date(appt.startTime * 1000);
    let endTime = new Date(appt.endTime * 1000);
    let date = startTime.toLocaleString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    let timeBox =
      startTime.toLocaleString("en-us", {
        hour: "numeric",
        minute: "numeric"
      }) +
      " to " +
      endTime.toLocaleString("en-us", {
        hour: "numeric",
        minute: "numeric"
      });
    this.setState({
      timeBox: timeBox,
      date: date
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {this.state.date}
          </Typography>
          <Typography variant="h6" component="h6" style={styles.left}>
            {this.state.org && this.state.org.name
              ? this.state.org.name + " - " + this.state.org.serviceType
              : ""}
          </Typography>
          <Typography variant="h6" component="h6" style={styles.left}>
            {this.state.timeBox}
          </Typography>
          <Typography variant="h6" component="h6" style={styles.left}>
            With: {this.state.name ? this.state.name : ""}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

AppointmentCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppointmentCard);

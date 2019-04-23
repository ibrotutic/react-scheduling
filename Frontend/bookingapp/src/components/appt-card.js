import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AppointmentManager from "../utilities/appointment-management-utility";
import DirectionIcon from "@material-ui/icons/Directions"
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined"
import Button from "@material-ui/core/Button";

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
    super(props);
    this.state = {
      appt: props.props.appt,
      name: props.props.appt.name,
      org: props.props.appt.org,
      currentTime: (new Date()).getTime()/1000
    };
    this.mapsSelector= this.mapsSelector.bind(this);
    this.delete = this.delete.bind(this);
    this.review = this.review.bind(this);
  }

  componentDidMount() {
    this.createDates();
  }

  delete() {
    this.props.props.deleteAppointment(this.state.appt.id);
  }

  review() {
    this.props.props.clickReview(this.state.appt);
  }

  createDates = () => {
    let { appt } = this.state;
    let startTime = AppointmentManager.parseAppointmentTime(appt.startTime);
    let endTime = AppointmentManager.parseAppointmentTime(appt.endTime);
    let date = AppointmentManager.parseAppointmentDate(appt.startTime);

    let timeBox = startTime + " to " + endTime;

    this.setState({
      timeBox: timeBox,
      date: date
    });
  };

  mapsSelector() {
    let lat = this.state.org.cLat;
    let long = this.state.org.cLong;

    window.open("https://maps.google.com/maps?daddr="+lat+","+long+"&saddr=My+Location");
  }

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
          {this.state.org.cLat !== 0 && this.state.cLong !== 0 ?
              <Button onClick={this.mapsSelector}><DirectionIcon fontSize={"large"}/></Button>
              :
              null
          }
          <Button onClick={this.delete}><DeleteForeverOutlinedIcon fontSize={"large"} /></Button>
          {
            ((this.state.appt.endTime < this.state.currentTime) && !this.state.appt.isReviewed) ? <Button onClick={this.review}>Review</Button> : ""
          }
        </CardContent>
      </Card>
    );
  }
}

AppointmentCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppointmentCard);

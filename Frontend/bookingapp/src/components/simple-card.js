import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const styles = {
  card: {
    width: "100%",
    height: 200
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  }
};

class SimpleCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orgInfo: {
        name: props.props.name,
        service: props.props.service,
        description: props.props.description,
        orgId: props.props.orgId,
        address: props.props.address + ", " + props.props.city +  ", " + props.props.state,
        tags: props.props.tags,
        lat: props.props.cLat,
        long: props.props.cLong,
      }
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.populateOrgInfo(this.state.orgInfo);
    //dispatch action.
  }

  getDistance() {
    if (this.props.location) {
      let userLat = this.props.location.latitude;
      let userLong = this.props.location.longitude;
      let serviceLat = this.state.orgInfo.lat;
      let serviceLong = this.state.orgInfo.long;
      if (userLat && userLong && serviceLat && serviceLong) {
        return this.calcHaversine(userLat, userLong, serviceLat, serviceLong);
      }
    }
    return null;
  }

  calcHaversine(lat1, lon1, lat2, lon2)
  {
    let R = 6371; // km
    let dLat = this.toRadians(lat2-lat1);
    let dLon = this.toRadians(lon2-lon1);
    let lat1rad = this.toRadians(lat1);
    let lat2rad = this.toRadians(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1rad) * Math.cos(lat2rad);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d;
  }

  toRadians(value)
  {
    return value * Math.PI / 180;
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{ maxWidth: "100%" }}>
        <Card className={classes.card}>
          <CardActionArea className={classes.card} onClick={this.onClick}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.state.orgInfo.name}
              </Typography>
              <Typography component="p">
                {this.state.orgInfo.service}
              </Typography>
              <Typography component="p">
                {this.state.orgInfo.description}
              </Typography>
              <Typography component="p">
                {this.state.orgInfo.address}
              </Typography>
              <Typography component="p">
                Distance: {this.getDistance()}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

function updateOrgInfo(orgInfo) {
  return {
    type: "SHOW_MODAL",
    modalType: "ORG_SELECT",
    orgInfo: orgInfo
  };
}

const mapDispatchToProps = dispatch => {
  return {
    populateOrgInfo: orgInfo => {
      dispatch(updateOrgInfo(orgInfo));
    }
  };
};

function mapStateToProps(state) {
  return {location: state.user.location};
}

export default withStyles(styles)(
  connect(
      mapStateToProps,
    mapDispatchToProps
  )(SimpleCard)
);
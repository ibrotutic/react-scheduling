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
        serviceType: props.props.serviceType,
        description: props.props.description,
        orgId: props.props.orgId,
        address: props.props.address + ", " + props.props.city +  ", " + props.props.state,
        tags: props.props.tags,
        lat: props.props.cLat,
        long: props.props.cLong,
        distance: props.props.distance
      }
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.populateOrgInfo(this.state.orgInfo);
    //dispatch action.
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
                {this.state.orgInfo.serviceType}
              </Typography>
              <Typography component="p">
                {this.state.orgInfo.description}
              </Typography>
              <Typography component="p">
                {this.state.orgInfo.address}
              </Typography>
              <Typography component="p">
                Distance: {this.state.orgInfo.distance}
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

export default withStyles(styles)(
  connect(
      null,
    mapDispatchToProps
  )(SimpleCard)
);
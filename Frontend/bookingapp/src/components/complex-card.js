import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import hackyApiUtility from "../utilities/hacky-api-utility";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        maxWidth: "65%",
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

class ComplexCard extends Component{
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
                distance: props.props.distance,
                averageRating: props.props.averageRating
            }
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.populateOrgInfo(this.state.orgInfo);
    }

    componentDidMount() {
        hackyApiUtility.getAverageRatingForOrg(this.state.orgInfo.orgId).then(averageRating => {
            let orgInfo = this.state.orgInfo;
            orgInfo.averageRating = averageRating;
            this.setState({orgInfo:orgInfo});
        }).catch(rejected => {
            console.log("No data for org" + rejected);
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={16}>
                        <Grid item className={classes.image}>
                            <img className={classes.img} alt={"org"} src={require('../isu.png')} />
                            {this.state.orgInfo.averageRating ? "Rating: "+ this.state.orgInfo.averageRating : ""}
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={16}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                       {this.state.orgInfo.name} - {this.state.orgInfo.serviceType}
                                    </Typography>
                                    <Typography gutterBottom>{this.state.orgInfo.description}</Typography>
                                    <Typography color="textSecondary">{this.state.orgInfo.address}</Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.onClick}
                                    >
                                        More Info
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">{Number(this.state.orgInfo.distance).toFixed(3) + " Miles"}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

ComplexCard.propTypes = {
    classes: PropTypes.object.isRequired,
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
    )(ComplexCard)
);
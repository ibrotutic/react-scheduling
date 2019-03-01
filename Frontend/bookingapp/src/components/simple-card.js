import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";

const styles = {
    card: {
        maxWidth: 500,
        width: 400,
        height: 200,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
};

class SimpleCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            orgInfo : {
                name: props.props.name,
                service: props.props.service,
                description: props.props.description,
                orgId: props.props.orgId,
                address: props.props.address,
                tags: props.props.tags
            }
        };

        this.onClick = this.onClick.bind(this);
    };

    onClick(){
        this.props.populateOrgInfo(this.state.orgInfo);
        //dispatch action.
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Card className={classes.card}>
                    <CardActionArea className={classes.card}>
                        <CardContent onClick = {this.onClick}>
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
                                {this.state.orgInfo.orgId}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

function updateOrgInfo(orgInfo) {
    return {
        type: 'SHOW_MODAL',
        modalType: 'ORG_SELECT',
        orgInfo: orgInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        populateOrgInfo: (orgInfo) => {
            dispatch(updateOrgInfo(orgInfo))
        }
    }
};

export default withStyles(styles)(
    connect(null,
        mapDispatchToProps
    )(SimpleCard)
);
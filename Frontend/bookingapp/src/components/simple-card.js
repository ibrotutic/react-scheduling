import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 350,
        width: 330,
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
            name: props.props.name,
            service: props.props.service,
            description: props.props.description,
            orgId: props.props.orgId,
            address: props.props.address,
            tags: props.props.tags
        };

        this.onClick = this.onClick.bind();
    };

    onClick(){
        console.log("popup modal....")
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Card className={classes.card}>
                    <CardActionArea className={classes.card}>
                        <CardContent onClick = {this.onClick}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.state.name}
                            </Typography>
                            <Typography component="p">
                                {this.state.service}
                            </Typography>
                            <Typography component="p">
                                {this.state.description}
                            </Typography>
                            <Typography component="p">
                                {this.state.orgId}
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

export default withStyles(styles)(SimpleCard);
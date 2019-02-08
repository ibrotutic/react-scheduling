import React from 'react';
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

function ImgMediaCard(props) {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.props.name}
                    </Typography>
                    <Typography component="p">
                        {props.props.service}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);
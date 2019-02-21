import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
    div: {
        display: 'flex',
        justifyContent: 'center'
    }
});

function LoadingIndicator(props) {
    const { classes } = props;
    return (
        <div className={classes.div}>
            <CircularProgress className={classes.progress} />
        </div>
    );
}

LoadingIndicator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingIndicator);
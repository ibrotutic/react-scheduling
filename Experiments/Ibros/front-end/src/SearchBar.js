import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    cssLabel: {
        color: 'white',
        '&$cssFocused': {
            color: 'white',
        },
    },
    cssFocused: {
    },
    cssUnderline: {
        color: 'white',
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: 'white',
        },
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'white !important'
    },
});

function Search(props) {
    const { classes } = props;

    return (
        <div className={classes.container}>
            <TextField
                onKeyPress={(ev) => {
                    console.log(`Pressed keyCode ${ev.key}`);
                    if (ev.key === 'Enter') {
                        console.log();
                        ev.preventDefault();
                    }
                }}
                fullWidth={true}
                className={classes.margin}
                InputLabelProps={{
                    classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                    },
                }}
                InputProps={{
                    classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                    },
                }}
                label="Service search"
                variant="outlined"
                id="custom-css-outlined-input"
            />
        </div>
    );
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
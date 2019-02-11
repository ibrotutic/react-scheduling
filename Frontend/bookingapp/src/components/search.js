import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import elasticsearchUtility from "../utilities/elastic-search-utility";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'row',
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

class Search extends Component{
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            results: []
        };

        elasticsearchUtility.startClient();
    }

    searchCluster(query) {
        elasticsearchUtility.searchFor(query).then((result) =>{
                let parsedResults = elasticsearchUtility.parseResults(result);
                if (parsedResults) {
                    this.props.updateResults(parsedResults);
                }
            }
        ).catch(() => {
            console.error("Failed to search cluster");
        });
    }

    onChange = event => {
        this.searchCluster(event.target.value)
    };

    render() {
        const {searchQuery, classes} = this.props;

        return (
            <div className={this.props.classes.container}>
                <TextField
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
                    onChange={this.onChange}
                    label="Service search"
                    variant="outlined"
                    id="custom-css-outlined-input"
                    value={searchQuery}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        results: state.results
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateResults: (results) => {
            dispatch(setResults(results))
        }
    }
};

function setResults(results) {
    return {type: "SETRESULT", results};
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Search)
);
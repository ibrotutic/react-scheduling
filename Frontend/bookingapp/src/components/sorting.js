import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        width: "100px",
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        alignContent: 'center',
        color: theme.palette.text.secondary,
    }
});

class Sorting extends Component {
    displaySortOptions(){
        return (
            <Paper className={styles.paper}>
                Sort Options
            <Grid container spacing={24}>
                <Grid item xs>
                    <Paper className={styles.paper}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                        Distance
                        <Button onClick={() => this.sort("Distance", "asc")}>Ascending</Button>
                        <Button onClick={() => this.sort("Distance", "des")}>Descending</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={styles.paper}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                        Name
                            <Button onClick={() => this.sort("Name", "asc")}>Ascending</Button>
                            <Button onClick={() => this.sort("Name", "des")}>Descending</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={styles.paper}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            Rating
                            <Button onClick={() => this.sort("averageRating", "asc")}>Ascending</Button>
                            <Button onClick={() => this.sort("averageRating", "des")}>Descending</Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
                <Button onClick={this.openSorting}>Cancel</Button>
            </Paper>
        )
    }

    constructor(props){
        super(props);

        this.state = {
            open: false,
        };

        this.openSorting = this.openSorting.bind(this);
        this.sort = this.sort.bind(this);
    }

    openSorting () {
        this.setState(prevState => ({
            open: !prevState.open
        }));
    }

    sort (field, direction) {
        this.setState(prevState => ({
            open: !prevState.open
        }));
        this.props.sortBy(field, direction);
    }

    render() {
        return (
            <div>
                {this.state.open ? this.displaySortOptions() :
                    <Button
                    onClick={this.openSorting}
                    variant="contained">
                        Open Sort Options
                    </Button>}
            </div>
        );
    }
}

export default Sorting;
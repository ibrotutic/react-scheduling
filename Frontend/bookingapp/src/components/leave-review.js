import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from 'react-rating';
import FullStar from 'react-ionicons/lib/MdStar'
import EmptyStar from 'react-ionicons/lib/MdStarOutline'

class LeaveReview extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            open: false,
            validRating: false,
            appointment: "",
            rating: 0,
            description: ""
        };
    }

    handleClose = () => {
        this.setState({
            validRating: false,
            appointment: "",
            rating: 0,
            description: "",
            open: false
        })
    };

    handleRatingChange(event) {
        if (event) {
            this.setState({rating: event, validRating: true});
        }
    }

    onClickLeaveReview = () => {
        if (this.state.description && this.state.validRating) {
            console.log(this.state);
            this.handleClose();
        }
        else {
            alert("Please make sure you have a valid rating and description")
        }
    };

    handleDescriptionChange(event) {
        this.setState({description: event.target.value})
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(this.props !== nextProps) {
            this.setState(
                {open : nextProps.props.open, appointment: nextProps.props.appointment}
            );
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                >
                    <DialogTitle id="form-dialog-title">Leave a Review {this.state.appointment ? "- " + this.state.appointment.org.name
                    : ""} </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Leave a star rating
                        </DialogContentText>
                        <Rating
                            emptySymbol={<EmptyStar/>}
                            fullSymbol={<FullStar/>}
                            initialRating={this.state.rating}
                            onClick={(rate) => this.handleRatingChange(rate)}
                        />
                        <p></p>
                        <DialogContentText>
                            Leave a short description
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Description"
                            type="description"
                            onChange={(value) => this.handleDescriptionChange(value)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.onClickLeaveReview} color="primary">
                            Leave a Review
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default LeaveReview;
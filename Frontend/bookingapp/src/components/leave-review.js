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
import hackyApiUtility from "../utilities/hacky-api-utility";

class LeaveReview extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            open: false,
            validRating: false,
            appointment: "",
            reviewerName: "",
            rating: 0,
            description: "",
        };
    }

    handleClose = () => {
        this.setState({
            validRating: false,
            appointment: "",
            reviewerName: "",
            rating: 0,
            description: "",
            open: false
        })
    };

    handleRatingChange(event) {
        if (event) {
            this.setState({rating:event, validRating: true});
        }
    }

    onClickLeaveReview = () => {
        if (this.state.description && this.state.validRating && this.state.reviewerName) {
            let review = {
                appointmentId: this.state.appointment.id,
                rating: this.state.rating,
                description: this.state.description,
                reviewerName: this.state.reviewerName
            };
            hackyApiUtility.leaveAReview(review).then((response) => {
                alert("Review posted successfully, thanks!");
                this.props.props.success(this.state.appointment);
                console.log("Successful review" + response);
            }).catch((error) => {
                alert("Something went wrong...try again later");
                console.log("Review failed" + error);
            });
            this.handleClose();
        }
        else {
            alert("Please make sure you have a entered something in all the fields")
        }
    };

    handleDescriptionChange(event) {
        this.setState({description: event.target.value})
    }

    handleReviewerNameChange(event) {
        this.setState({reviewerName: event.target.value})
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
                        <DialogContentText >
                            Your Name
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="reviewerName"
                            label="Your Name"
                            type="reviewerName"
                            onChange={(value) => this.handleReviewerNameChange(value)}
                            fullWidth
                        />
                        <p></p>
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
                            id="description"
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
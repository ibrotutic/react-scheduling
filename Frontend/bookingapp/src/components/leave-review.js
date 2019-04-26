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
import LoadingIndicator from "./loading-indicator";
import SuccessIndicator from "react-success-indicator";

class LeaveReview extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            open: false,
            validRating: false,
            loading: false,
            appointment: "",
            success: false,
            reviewerName: "",
            rating: 0,
            description: "",
        };
    }

    handleClose = () => {
        this.props.props.close();
    };

    handleRatingChange(event) {
        if (event) {
            this.setState({rating:event, validRating: true});
        }
    }

    onClickLeaveReview = () => {
        if (this.state.description && this.state.validRating && this.state.reviewerName) {
            this.setState({loading : true});
            let review = {
                appointmentId: this.state.appointment.id,
                rating: this.state.rating,
                description: this.state.description,
                reviewerName: this.state.reviewerName
            };
            hackyApiUtility.leaveAReview(review).then((response) => {
                this.props.props.success(response.data.appointmentId);
                console.log("Successful review" + response);
                this.setState({loading: false, success:true})
            }).catch((error) => {
                this.handleClose();
                alert("Something went wrong...try again later");
                console.log("Review failed" + error);
            });
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
            if(nextProps.props.open) {
                    this.setState({
                        validRating: false,
                        loading: false,
                        success: false,
                        appointment: "",
                        reviewerName: "",
                        rating: 0,
                        description: "",
                    })
            }
            this.setState(
                {open : nextProps.props.open, appointment: nextProps.props.appointment}
            );
        }
    }

    getForm = () => {
        if (this.state.success) {
            return (
                <div style={{margin:"auto"}}>
                    <p></p>
                    <div>
                        <SuccessIndicator color="green"/>
                    </div>
                    <div>
                        <Button style={{alignSelf: "center"}} onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </div>
                </div>
            )
        } else if(this.state.loading) {
            return (
                <div style={{height:"100px"}}>
                    <LoadingIndicator/>
                </div>
            )
        }
        else {
            return this.getReviewForm()
        }
    };

    getReviewForm = () => {
        return (
            <div>
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
            </div>
        )
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
                    {
                        this.getForm()
                    }
                </Dialog>
            </div>
        );
    }
}

export default LeaveReview;
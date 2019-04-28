import React, { Component } from "react";
import { hackyApiUtility } from "../../utilities/hacky-api-utility";
import {
  Paper,
  Button,
  Dialog,
  TextField,
  DialogTitle
} from "@material-ui/core";

const PhotoComponent = props => {
  return (
    <Paper style={{ padding: "25px", width: "500px", margin: "30px" }}>
      <img src={props.url} alt="" style={{ height: "300px", width: "500px" }} />
      <Button
        variant="contained"
        onClick={() => props.handleDeletePhoto(props.url)}
      >
        Delete
      </Button>
    </Paper>
  );
};

class ManageGallery extends Component {
  state = {
    photos: [],
    addPhoto: false,
    url: ""
  };

  componentDidMount() {
    const { orgId } = this.props;
    hackyApiUtility
      .getPhotosForOrg(orgId)
      .then(photos => {
        console.log(photos);
        this.setState({ photos });
      })
      .catch(err => alert(err));
  }

  getPictures = () => {
    return this.state.photos.map(p => {
      return (
        <PhotoComponent
          url={p}
          key={p}
          handleDeletePhoto={this.handleDeletePhoto}
        />
      );
    });
  };

  handleAddPhoto = () => {
    this.setState({ addPhoto: !this.state.addPhoto });
  };

  addPhoto = () => {
    const { url } = this.state;
    if (url) {
      hackyApiUtility
        .addPhoto(this.props.orgId, url)
        .then(resp => {
          var { photos } = this.state;
          photos.push(resp.url);
          this.setState({ photos });
        })
        .catch(err => err => alert("Unable to delete photo"));

      this.handleAddPhoto();
    }
  };

  handleDeletePhoto = url => {
    const { orgId } = this.props;
    if (url) {
      hackyApiUtility
        .deletePhoto(orgId, url)
        .then(resp => {
          var { photos } = this.state;
          photos = photos.filter(p => p !== url);
          this.setState({ photos });
        })
        .catch(err => alert("Unable to delete photo"));
    }
  };

  handleURLChange = e => {
    this.setState({
      url: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItem: "center",
            justifyContent: "center"
          }}
        >
          {this.getPictures()}
        </div>
        <Button variant="contained" onClick={this.handleAddPhoto}>
          Add Photo
        </Button>
        <Dialog open={this.state.addPhoto} onClose={this.handleAddPhoto}>
          <Paper>
            <DialogTitle>Add New Photo</DialogTitle>
            <div style={{ textAlign: "center" }}>
              <TextField
                type="text"
                id="outlined-email"
                label="Photo URL"
                // className={classes.textField}
                value={this.state.url}
                onChange={e => this.handleURLChange(e)}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div style={{ margin: "10px", textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={this.addPhoto}
                style={{ marginRight: "10px" }}
              >
                Add Photo
              </Button>
              <Button variant="contained" onClick={this.handleAddPhoto}>
                Cancel
              </Button>
            </div>
          </Paper>
        </Dialog>
      </div>
    );
  }
}

export default ManageGallery;

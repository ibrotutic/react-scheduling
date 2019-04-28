import React, { Component } from "react";
import { hackyApiUtility } from "../../utilities/hacky-api-utility";
import { Paper } from "@material-ui/core";

const PhotoComponent = props => {
  return (
    <Paper style={{ padding: "25px", width: "500px", margin: "30px" }}>
      <img src={props.url} alt="" style={{ height: "300px", width: "500px" }} />
    </Paper>
  );
};

class ManageGallery extends Component {
  state = {
    photos: []
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
      return <PhotoComponent url={p} key={p} />;
    });
  };

  render() {
    return <div>{this.getPictures()}</div>;
  }
}

export default ManageGallery;

import React from "react";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const PageNotFound = () => (
    <div>
        <h4>Page not found</h4>
        <Button color="inherit" component={Link} to="/">Go Home</Button>
    </div>
)

export default PageNotFound
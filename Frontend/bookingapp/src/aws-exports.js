import Amplify from "aws-amplify";

Amplify.configure({
  Auth: {
    userPoolId: "us-east-2_CsFlQSDrx",
    userPoolWebClientId: "2hsh11vnmjr6ud0q1hocum363k",
    region: "us-east-2",
    mandatorySignIn: true
  }
});

const awsmobile = {
  aws_project_region: "us-east-2",
  aws_content_delivery_bucket: "",
  aws_content_delivery_bucket_region: "us-east-2",
  aws_content_delivery_url: ""
};

export default awsmobile;

import React, { Fragment, useContext, useEffect, useState } from "react";
import FileUploadLoader from "../FileUploadBarComponent/FileUploadBar";
import { UserContext } from "../../Context/UserContext";
import firebase, { firestore, storage } from "../../Firebase/firebase";

const PictureUpload = () => {
  const { userContext, setUserContext } = useContext(UserContext);

  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log("image", image);
    }
    if (e.target.files[0] === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
  };

  const [progress, setProgress] = useState(0);

  const handleFileUpload = () => {
    console.log("start of upload");
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        const progress = Math.round(
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        );
        setProgress(progress);
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setUserContext({ ...userContext, profilePic: fireBaseUrl });

            console.log(fireBaseUrl);
          });
      }
    );
  };
  console.log("image", image);
  console.log("uc", userContext);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}></button>
      <FileUploadLoader val={progress} />
      {userContext ? userContext.profilePic : null}
    </div>
  );
};

export default PictureUpload;

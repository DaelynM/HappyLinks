import FileUploadLoader from "../FileUploadBarComponent/FileUploadBar";
import { UserContext } from "../../Context/UserContext";
import firebase, { firestore, storage } from "../../Firebase/firebase";

import SaveIcon from "@material-ui/icons/Save";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { makeStyles, Button } from "@material-ui/core";

// Setting a high pixel ratio avoids blurriness in the canvas crop preview.
const pixelRatio = 4;

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext("2d");
  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight
  );

  return tmpCanvas;
}

function generateDownload(previewCanvas, crop, imageName, handleFileUpload) {
  if (!crop || !previewCanvas) {
    return;
  }

  const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

  console.log("canvas", canvas);
  const anchor = document.createElement("a");

  canvas.toBlob(
    (blob) => {
      console.log("blob", blob);
      // const previewUrl = window.URL.createObjectURL(blob);

      // anchor.href = URL.createObjectURL(blob);
      // anchor.click();

      // window.URL.revokeObjectURL(previewUrl);

      var file = new File([blob], imageName);
      console.log("file", file);
      handleFileUpload(file);
    },
    "image/png",
    1
  );
  console.log("anchor.downlaod", anchor.downlaod);
}

// LSFz4jwT.sMfiYQ

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const PictureUpload2 = () => {
  const classes = useStyles();

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 60, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const { userContext, setUserContext } = useContext(UserContext);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    console.log(completedCrop);
  }, [completedCrop]);

  const handleFileUpload = async (file) => {
    console.log("start of upload");

    console.log("start of upload image", image);
    console.log("start of upload file", file);

    const uploadTask = storage
      .ref(`/images/${userContext.id}/${image.name}`)
      .put(file);

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
        console("bitch");
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref(`images/${userContext.id}`)
          .child(file.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setUserContext({ ...userContext, profilePic: fireBaseUrl });

            const userReference = firestore.doc(`/users/${userContext.id}`);
            console.log("fireBaseUrl", fireBaseUrl);

            userReference.update({
              profilePic: fireBaseUrl,
            });

            console.log(fireBaseUrl);
          });
      }
    );
  };
  console.log("image", image);
  console.log("uc", userContext);

  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={onSelectFile}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload Profile Pic
        </Button>
      </label>

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<SaveIcon />}
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() =>
          generateDownload(
            previewCanvasRef.current,
            completedCrop,
            image.name,
            handleFileUpload
          )
        }
      >
        Save Image
      </Button>
      <ReactCrop
        circularCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <div>
        <canvas
          ref={previewCanvasRef}
          style={{
            width: completedCrop?.width ?? 0,
            height: completedCrop?.height ?? 0,
          }}
        />
      </div>
      <FileUploadLoader val={progress} />
    </div>
  );
};

export default PictureUpload2;

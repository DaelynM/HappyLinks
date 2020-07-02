import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
    // minHeight: "60vh",

    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "50px",
  },

  footer: {
    padding: theme.spacing(1, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            My sticky footer can be found here.
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}

// import React from "react";
// import Typography from "@material-ui/core/Typography";
// import Link from "@material-ui/core/Link";
// import Box from "@material-ui/core/Box";
// import { Divider } from "@material-ui/core";

// const CopyRight = () => {
//   return (
//     <Box>
//       <Typography
//         component="p"
//         align="center"
//         style={{ marginTop: "10px", fontSize: ".75rem" }}
//       >
//         Built with{" "}
//         <span role="img" aria-label="Emojis">
//           ❤️
//         </span>{" "}
//         by the{" "}
//         <a href="https://gkstyle.net/" title="GK STYLE">
//           {" "}
//           GK STYLE{" "}
//         </a>
//         team.
//       </Typography>
//     </Box>
//   );
// };

// export default CopyRight;

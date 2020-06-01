import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

const CopyRight = () => {
  return (
    <Box mt={8}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Happy Links
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>

      <Divider style={{ marginTop: 100 }} />
      <Typography
        component="p"
        align="center"
        style={{ margin: "10px 0", fontSize: ".75rem" }}
      >
        Built with{" "}
        <span role="img" aria-label="Emojis">
          ❤️
        </span>{" "}
        by the{" "}
        <a href="https://gkstyle.net/" title="GK STYLE">
          {" "}
          GK STYLE{" "}
        </a>
        team.
      </Typography>
    </Box>
  );
};

export default CopyRight;

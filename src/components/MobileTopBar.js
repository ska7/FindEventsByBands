import React from "react";
import { Link } from "react-router-dom";

import { Container, createStyles, IconButton } from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { Search } from "./Search/Search";
import { Favorites } from "./Favorites/Favorites";
import { makeStyles } from "@material-ui/styles";

const useCustomStyles = () => {
  return makeStyles((theme) =>
    createStyles({
      mobileTopContainer: {
        background: "rgba(0,0,0,0.7)",
        boxShadow: "0px 0px 30px 10px black",
        zIndex: "15",
        position: "absolute",
        top: "0px",
      },
      homeBtnWrapper: {
        position: "absolute",
        width: "auto",
        height: "auto",
        zIndex: "14",
        top: "15px",
        left: "15px",
        color: "white",
      },
      homeBtn: {
        borderRadius: "50%",
        background: "#676563",
        height: "40px",
        width: "40px",
        padding: "5px",
      },
      link: {
        color: "white",
        textDecoration: "none",
      },
    })
  );
};

export const MobileTopBar = () => {
  const classes = useCustomStyles()();

  return (
    <Container
      disableGutters
      className={classes.mobileTopContainer}
      id="mobile-top-bar"
    >
      <IconButton className={classes.homeBtnWrapper}>
        <Link to={`/`} className={classes.link}>
          <HomeOutlinedIcon className={classes.homeBtn} />
        </Link>
      </IconButton>
      <Search />
      <Favorites />
    </Container>
  );
};

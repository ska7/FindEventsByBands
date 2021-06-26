import React, { useState, useEffect, useContext } from "react";

import { Grid, List, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import Fade from "@material-ui/core/Fade";
import { FavoritesContext } from "components/context/favoritesContext";
import { FavoriteList } from "./FavoriteList";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      gridArea: "favorites",
      background: `radial-gradient(circle, rgba(143,9,14,1) 0%, rgba(105,0,4,1) 0%, rgba(135,8,8,1) 100%)`,
      boxShadow: "1px 0px 10px 5px black",
      overflowY: "auto",
      height: "100vh",
      padding: 0,
      [theme.breakpoints.down("xs")]: {
        position: "absolute",
        height: "100vh",
        width: "100vw",
        zIndex: "25",
        gridArea: "event",
        top: 0,
        right: 0,
      },
      [theme.breakpoints.up("xs")]: {},
    },
    title: {
      width: "100%",
      height: "50px",
      color: "white",
      margin: "10px auto",
      padding: "10px",
      fontWeight: "500",
      textAlign: "center",
      margin: "35px 0px",
      [theme.breakpoints.down("xs")]: {
        margin: 0,
        background: "rgba(0, 0, 0, 0.8)",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "900",
        boxShadow: "0px 0px 20px 5px rgba(0, 0, 0, 0.8)",
      },
    },
    list: {
      width: "100%",
      color: "white",
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        marginTop: "50px",
      },
    },
    listItem: {
      fontFamily: "Inconsolata, monospace",
      transition: "all 0.5s ease",
      padding: "20px",
      height: "auto",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
      },
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        margin: "10px 0px",
      },
    },
    link: {
      ...theme.links,
    },
    // Mobile
    mobileOpenFavoritesBtn: {
      position: "absolute",
      zIndex: "30",
      top: "15px",
      right: "15px",
      color: "white",
    },
    hidden: {
      display: "none",
    },
    icon: {
      borderRadius: "50%",
      background: "#676563",
      height: "40px",
      width: "40px",
      padding: "5px",
    },
  })
);

export const Favorites = () => {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const isXsScreen = useMediaQuery("(max-width: 550px)");

  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    isXsScreen ? setOpen(false) : setOpen(true);
  }, [isXsScreen]);

  const classes = useStyles();
  return (
    <>
      {isOpen && (
        <Fade in={isOpen} timeout={500}>
          <Grid className={classes.container}>
            <Typography variant="h5" className={classes.title}>
              FAVORITE EVENTS
            </Typography>
            <List className={classes.list}>
              <FavoriteList isXsScreen={isXsScreen} favorites={favorites} />
            </List>
          </Grid>
        </Fade>
      )}

      <IconButton
        className={isXsScreen ? classes.mobileOpenFavoritesBtn : classes.hidden}
        size="medium"
      >
        <MenuBookOutlinedIcon
          className={classes.icon}
          onClick={() => setOpen(!isOpen)}
          fontSize="large"
        />
      </IconButton>
    </>
  );
};

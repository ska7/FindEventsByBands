import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "./context/favoritesContext";
import {
  getSavedFavorites,
  updateFavorites,
  useFavorites,
} from "./hooks/useFavorites";

import {
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      gridArea: "favorites",
      background: `radial-gradient(circle, rgba(143,9,14,1) 0%, rgba(105,0,4,1) 0%, rgba(92,0,0,1) 47%, rgba(135,8,8,1) 100%)`,
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
    },
    list: {
      width: "100%",
      color: "white",
      flexDirection: "column",
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
  const classes = useStyles();
  const xsScreen = useMediaQuery("(max-width: 450px)");

  const [isOpen, setOpen] = useState(true);

  const { favorites, setFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    xsScreen ? setOpen(false) : setOpen(true);
  }, [xsScreen]);

  return (
    <>
      {isOpen && (
        <Grid className={classes.container}>
          <Typography variant="h5" className={classes.title}>
            FAVORITE EVENTS
          </Typography>
          <List className={classes.list}>
            {favorites.map((event) => {
              return (
                <ListItem className={classes.listItem} key={event.id}>
                  <Link to={`/event/${event.id}`} className={classes.link}>
                    {event.displayName}
                  </Link>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    size="small"
                  >
                    <HighlightOffIcon
                      onClick={() =>
                        updateFavorites(event, favorites, setFavorites)
                      }
                      fontSize="inherit"
                      style={{ color: "white" }}
                    />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      )}

      <IconButton
        className={xsScreen ? classes.mobileOpenFavoritesBtn : classes.hidden}
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

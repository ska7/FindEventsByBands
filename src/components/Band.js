import React, { useState, useEffect } from "react";
import axios from "axios";

import { fetchBandImage, useSpotify } from "./hooks/useSpotify";
import {
  Card,
  CardContent,
  Container,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Loader } from "./Loader";
import { Events } from "./Events";

// const customStyles = (image) => {
//   return makeStyles((theme) =>
//     createStyles({
//       mainContainer: {
//         [theme.breakpoints.up("sm")]: {
//           ...theme.card,
//           height: "100px",
//         },
//         [theme.breakpoints.up("lg")]: {
//           ...theme.card,
//           padding: 0,
//           position: "relative",
//           background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%)`,
//         },
//       },
//       bandWrapper: {
//         // height: "100%",
//         // background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%) ,url(
//         //   "${image}"
//         // )`,
//         [theme.breakpoints.up("sm")]: {
//           backgroundSize: "cover",
//           background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%) ,url(
//             "${image}"
//           )`,
//         },
//       },
//       header: {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "rgba(0,0,0,0.6)",
//         boxShadow: "0px 0px 25px 10px black",
//         color: "white",
//         textAlign: "center",
//         fontSize: "30px",
//         height: "70px",
//       },
//       subHeader: {
//         background: "rgba(0,0,0,0.8)",
//         color: "white",
//         textAlign: "center",
//         paddingBottom: "20px",
//         fontSize: "20px",
//       },
//       input: {
//         background: "white",
//         padding: "0px 5px",
//       },
//     })
//   );
// };

const useCustomStyles = (
  artistImage,
  widthAbove1025,
  widthBetween1024and960,
  widthBetween959and600,
  widthBelow600
) => {
  return makeStyles((theme) => {
    // Tablets and big laptops
    if (widthAbove1025) {
      return createStyles({
        mainContainer: {
          gridArea: "event",
          ...theme.card,
          padding: 0,
          position: "relative",
          background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%)`,
        },
        bandWrapper: {
          height: "100%",
          background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%) ,url("${artistImage}")`,
        },
        header: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0,0,0,0.6)",
          boxShadow: "0px 0px 25px 10px black",
          color: "white",
          textAlign: "center",
          fontSize: "30px",
          height: "70px",
        },
        subHeader: {
          background: "rgba(0,0,0,0.8)",
          color: "white",
          textAlign: "center",
          paddingBottom: "20px",
          fontSize: "20px",
        },
        input: {
          background: "white",
          padding: "0px 5px",
        },
      });
    }
    // Tablets and small laptops
    else if (widthBetween1024and960) {
      return createStyles({
        mainContainer: {
          gridArea: "event",
          ...theme.card,
          height: "1000px",
          padding: 0,
          position: "relative",
          background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%)`,
        },
        bandWrapper: {
          background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%) ,url(
              "${artistImage}"
            )`,
          backgroundSize: "cover",
          height: "100%",
        },
        header: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0,0,0,0.6)",
          boxShadow: "0px 0px 25px 10px black",
          color: "white",
          textAlign: "center",
          fontSize: "30px",
          height: "70px",
        },
        subHeader: {
          background: "rgba(0,0,0,0.8)",
          color: "white",
          textAlign: "center",
          paddingBottom: "20px",
          fontSize: "20px",
        },
        input: {
          background: "white",
          padding: "0px 5px",
        },
      });
    } else if (widthBetween959and600) {
      return createStyles({});
    } else if (widthBelow600) {
      return createStyles({});
    }
  });
};

export const Band = (props) => {
  const { match, location } = props;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const widthAbove1025 = useMediaQuery("(min-width: 1025px)");
  const widthBetween1024and960 = useMediaQuery(
    "(min-width: 960px) and (max-width: 1024px)"
  );
  const widthBetween959and600 = useMediaQuery(
    "(min-width: 600px) and (max-width: 959px)"
  );
  const widthBelow600 = useMediaQuery("min-width: 599px");

  const [artistImage, setArtistImage] = useSpotify(match.params.bandName);

  useEffect(() => {
    const bandID = new URLSearchParams(location.search).get("bandID");
    setLoading(true);
    // setArtistImage("");
    console.log(artistImage);

    const init = async () => {
      await axios
        .get(
          `https://api.songkick.com/api/3.0/artists/${bandID}/calendar.json?apikey=${process.env.REACT_APP_SONGKICK_API_KEY}`
        )
        .then((res) => {
          const events = res.data.resultsPage.results.event;
          if (events !== undefined) {
            setEvents(events);
          }
        })
        .catch((e) => console.log("error", e))
        .finally(() => {
          setLoading(false);
        });
    };

    init();
  }, [location]);

  const classes = useCustomStyles(
    artistImage,
    widthAbove1025,
    widthBetween1024and960,
    widthBetween959and600,
    widthBelow600
  )();
  return (
    <Container className={classes.mainContainer} disableGutters>
      {loading ? (
        <Loader
          customPosition={{
            margin: "auto",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        />
      ) : (
        <Card className={classes.bandWrapper}>
          <Typography className={classes.header}>
            {match.params.bandName}
          </Typography>
          <Events events={events} {...props} />
        </Card>
      )}
    </Container>
  );
};

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import "./ComponentsStyles.css";
import CardHeader from '@material-ui/core/CardHeader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles(shape => {
  return {
    Card: {
      margin: 10,
      transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",

      "&:hover": {
        transform: "scale(1.04)",
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
      }
    },
    Flex: {
      display: "flex",
      flexDirection: "column"
    },
    Fill: {
      flexGrow: 2
    },
    Cont: {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      position: "relative"
    },
    Imag: {
      maxWidth: "none",
      minWidth: "auto",
      minHeight: "auto",
      height: "100%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    },
    Delete: {
      position: "absolute",
      padding: "0px",
      paddingTop: "10px",
      zIndex: 1
    }
  };
});

const GalerryContainer = ({ ConcreteIcon, ConcreteContainer, isOwner, shape, imgComponent, view, imgSrc, onClick, onAction}) => {
  const classes = useStyles(shape);

  const onActionHandle = (event) => {
    onAction(event, {view});
  }

  return (
    <div
      style={{
        width: shape.width - 10,
        height: shape.height - 10,
        marginBottom: 20
      }}
    >
      {/* {imgComponent} */}
      <Card className={classes.Card}>
      {isOwner ? 
        <CardHeader className={classes.Delete} style={{ width: shape.width - 40 }}
          action={
            <IconButton size="small" onClick={onActionHandle}>
              {/*<img src={DeleteIcon} alt="del"/>*/}
              <ConcreteIcon fontSize="large" color="action"/>
            </IconButton>
          }
        /> : null}

        <CardActionArea onClick={onClick}>
          <div className={classes.Flex} style={{ height: shape.height }}>
            <div className={classes.Fill}>
              <div className={classes.Cont}>
                <CardMedia
                  className={classes.Imag}
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={imgSrc}
                  title="Contemplative Reptile"
                />
              </div>
            </div>

            {ConcreteContainer}

          </div>
        </CardActionArea>
        {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
      </Card>
    </div>
  );
};

export default GalerryContainer;

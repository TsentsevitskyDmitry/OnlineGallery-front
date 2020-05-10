import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const imgWithClick = { cursor: "pointer" };

const Photo = ({
  index,
  onClick,
  photo,
  margin,
  direction,
  top,
  left,
  key,
  Container,
  onAction, 
  isOwner
}) => {
  const imgStyle = { margin: margin, display: "block" };
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const handleClick = event => {
    onClick(event, { index });
  };

  const imgComponent = (
    <img
      key={key}
      style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
      {...photo}
      onClick={onClick ? handleClick : null}
    />
  );
  const shape = { width: photo.width, height: photo.height };

  return (
    <div>
      <Container
        view={photo}
        shape={shape}
        imgComponent={imgComponent}
        imgSrc={photo.src}
        onClick={handleClick}
        onAction={onAction}
        isOwner={isOwner}
      />
    </div>
  );
};

export const photoPropType = PropTypes.shape({
  key: PropTypes.string,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  srcSet: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sizes: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
});

Photo.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  photo: photoPropType.isRequired,
  margin: PropTypes.number,
  top: props => {
    if (props.direction === "column" && typeof props.top !== "number") {
      return new Error(
        "top is a required number when direction is set to `column`"
      );
    }
  },
  left: props => {
    if (props.direction === "column" && typeof props.left !== "number") {
      return new Error(
        "left is a required number when direction is set to `column`"
      );
    }
  },
  direction: PropTypes.string
};

export default Photo;

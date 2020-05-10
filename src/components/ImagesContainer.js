import React from "react";
import GalerryContainer from './GalerryContainer';
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

const ImagesContainer = ({ isOwner, shape, imgComponent, view, imgSrc, onClick, onAction}) => {

  const ConcreteContainer = (
              <div style={{ paddingLeft: 10}}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {view.name} 
                    {view.private ? <span style={{color: 'grey'}}> [private]</span> : null}
                  </Typography>
                </CardContent>
              </div>
    );

  return <GalerryContainer 
            ConcreteIcon={MenuOpenIcon}
            ConcreteContainer={ConcreteContainer} 
            isOwner={isOwner} 
            shape={shape} 
            imgComponent={imgComponent} 
            view={view} 
            imgSrc={imgSrc} 
            onClick={onClick} 
            onAction={onAction}/>;
};

export default ImagesContainer;
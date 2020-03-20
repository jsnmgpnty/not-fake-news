import React from 'react';
import { Typography } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import homeSplash from '../../assets/home-splash.jpg';
import './Splash.scss';

const Splash = () => {
  const getBgImgStyle = () => {
    return {
      backgroundImage: `url(${homeSplash})`,
    };
  }

  return (
    <div className="splash">
      <div className="splash--img">
        <div className="splash--img-bg" style={getBgImgStyle()}></div>
        <div className="splash--img-text">
          <Hidden xsDown implementation="js">
            <Typography variant="h2">Not Fake News Site</Typography>
          </Hidden>
          <Hidden smUp implementation="js">
            <Typography variant="h2">NFNS</Typography>
          </Hidden>
          <Typography variant="h6">
            I'm baby health goth retro mumblecore gastropub put a bird on it,
            flexitarian pop-up venmo lomo pork belly kale chips YOLO subway tile af.
            Edison bulb direct trade lomo swag tote bag synth.
          </Typography>
          <Typography variant="h6">
            Cronut sustainable organic, lo-fi cloud bread disrupt microdosing
            banjo literally gastropub tilde portland selvage. Butcher jianbing
            vaporware truffaut salvia, raw denim roof party kickstarter taiyaki
            migas blue bottle tacos shaman asymmetrical plaid.
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Splash;

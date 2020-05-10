import React from "react";
import { render } from "react-dom";
import Typography from "@material-ui/core/Typography";

const Footer = () => (
  <footer className="footer">
  <div className="footer-style">
    <p>
      Contact us: <a href=""> online.gallery@yandex.by </a>
      <br />
      &copy; {new Date().getFullYear()} Copyright
    </p>
  </div>
  </footer>
);

export default Footer;
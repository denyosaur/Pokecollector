import React from "react";

import FooterCreatedBy from "./FooterCreatedBy";
import FooterSocialMedia from "./FooterSocialMedia";
import FooterLegal from "./FooterLegal";

import "../../css/footer/Footer.css";

const Footer = () => {

    return (
        <footer className="Footer">
            <div className="Footer-container">
                <FooterCreatedBy />
                <FooterSocialMedia />
                <FooterLegal />
            </div>
        </footer>
    )
};

export default Footer;
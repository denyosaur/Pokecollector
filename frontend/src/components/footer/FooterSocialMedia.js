import React from "react";

import "../../css/footer/FooterSocialMedia.css";

const FooterSocialMedia = () => {

    return (
        <div className="FooterSocialMedia">
            <div className="FooterSocialMedia-items">
                <a href="https://www.linkedin.com/in/danielkim1989/"><i className="bi bi-linkedin"></i></a>
            </div>
            <div className="FooterSocialMedia-items">
                <a href="https://github.com/denyosaur"><i className="bi bi-github"></i></a>
            </div>
            <div className="FooterSocialMedia-items">
                <a href="https://www.facebook.com"><i className="bi bi-facebook"></i></a>
            </div>
            <div className="FooterSocialMedia-items">
                <a href="https://www.instagram.com"><i className="bi bi-instagram"></i></a>
            </div>
            <div className="FooterSocialMedia-items">
                <a href="https://www.twitter.com"><i className="bi bi-twitter"></i></a>
            </div>
        </div>
    )
};

export default FooterSocialMedia;
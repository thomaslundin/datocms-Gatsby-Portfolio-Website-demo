/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { BrowserRouter as Router, Route } from "react-router-dom";


import "../styles/index.sass";


const TemplateWrapper = ({ children }) => {
  
  const [showMenu, setShowMenu] = useState(false);
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
          }
          datoCmsHome {
            
            introTextNode {
              childMarkdownRemark {
                html
              }
            }
            copyright
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />
          {/* <header>
            <nav className={`container ${showMenu ? "is-open" : ""}`}>
              <ul className="sidebar__menu">
                <li>
                  <Link to="/" activeClassName="active">Home</Link>
                </li>
                <li>
                  <Link to="/prosjekt/tradgardivastnorsk" activeClassName="active">About</Link>
                </li>
              </ul>     
              </nav>


              <div className="mobile-header show-mobile">
                <div className="mobile-header__logo">
                  <Link to="/">LOGO</Link>
                </div>

                <div className={`icon-one ${showMenu ? "active-one" : ""}`} >
                  <button className={`hamburger ${showMenu ? "is-open" : ""}`}
                    onClick={e => {
                      e.preventDefault();
                      setShowMenu(!showMenu);
                    }}
                  />
                </div>


              </div>
          </header> */}
          
          <main id="main">{children}</main>
          <footer>ajhbasd</footer>  
  
          </>

      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

// // ACCESSIBILITY HACK
// function handleFirstTab(e) {
//   if (e.keyCode === 9) { // the "I am a keyboard user" key
//       document.body.classList.add('user-is-tabbing');
//       window.removeEventListener('keydown', handleFirstTab);
//   }
// }

// window.addEventListener('keydown', handleFirstTab);


export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

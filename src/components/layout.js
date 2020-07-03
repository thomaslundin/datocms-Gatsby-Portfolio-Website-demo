/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import SimpleReactLightbox from "simple-react-lightbox";
import Footer from "../components/footer"

import "../styles/index.scss";



let state = {
    isMenuVisible:false
  };

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
          <SimpleReactLightbox>
          <main id="main">{children}</main>
          </SimpleReactLightbox>


          <Footer></Footer> 
  
          </>

      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/



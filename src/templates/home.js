import React from "react";
import Link from "gatsby-link";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import { IntlProvider, addLocaleData, FormattedMessage } from "react-intl";
import svMessages from "../locales/sv.js";
import noMessages from "../locales/no.js";

// addLocaleData([...sv, ...no]);
var _no = require('react-intl/locale-data/no');
var _sv = require('react-intl/locale-data/sv');

const messages = {
  sv: svMessages,
  no: noMessages
};
const locales = ["no", "sv"];

class Home extends React.Component {
  renderNav(prefix) {
    return (
      <ul className="sidebar__menu">
        <li>
          <Link to={`${prefix}/`} onClick={() => this.toggleSidebar()}>
            <FormattedMessage id={"menu.home"} /> 
            
          </Link>
        </li>
        <li>
          <Link to={`${prefix}/portfolio`} onClick={() => this.toggleSidebar()}>
            <FormattedMessage id={"menu.portfolio"} />
          </Link>
        </li>
        <li>
          <Link to={`${prefix}/about`} onClick={() => this.toggleSidebar()}>
            <FormattedMessage id={"menu.about"} />
          </Link>
        </li>
        <li>
          <Link to={`${prefix}/contact`} onClick={() => this.toggleSidebar()}>
            <FormattedMessage id={"menu.contact"} />
          </Link>
        </li>
      </ul>
    );
  }

  toggleSidebar() {
    this.setState({ is_open: !this.state.is_open });
  }
  closeSidebar() {
    this.setState({ is_open: false });
  }




  render() {
    let path_splits = this.props.location.pathname.split("/");
    let locale = "no";
    let incipit = path_splits[1];
    if (locales.indexOf(incipit) > -1) {
      locale = incipit;
    }
    let prefix = locale === "no" ? "" : locale;

    let { home, contact } = this.props.data;

    let { data } = this.props;
    
    const divStyle = {
        margin: '40px',
        border: '5px solid pink',
        maxWidth: '300px'
      };


    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
      <article className="sheet">
        <HelmetDatoCms seo={home.seoMetaTags} />

        <h1>{prefix}</h1>

        <div className="sheet__inner">
          <div className="sheet__body">
            
            <div
              dangerouslySetInnerHTML={{
                __html: home.introTextNode.childMarkdownRemark.html
              }}
            />
            <div>
              
              <p>{home.copyright}</p>

              {this.renderNav(locale)}

            </div>
          </div>
        </div>





        {data.allDatoCmsWork.edges.map(({ node: work }) => (
          <div key={work.id} className="showcase__item" style={divStyle}>
            <figure className="card">
              <Link to={`/prosjekt/${work.slug}`} className="card__image">
                <Img sizes={work.coverImage.sizes} />
              </Link>
              <figcaption className="card__caption">
                <h6 className="card__title">
                  <Link to={`/prosjekt/${work.slug}`}>{work.title}</Link>
                </h6>
                <div className="card__description">
                  <p>{work.excerpt}</p>
                </div>
              </figcaption>
            </figure>
          </div>
        ))} 


        





      </article>
      </IntlProvider>
    );
  }
}

export default Home;

export const query = graphql`
  query HomeQuery($locale: String!) {
    allDatoCmsWork(
        filter: { locale: { eq: $locale } }
        sort: { fields: [position], order: ASC }
      ) {
        edges {
          node {
            id
            title
            slug
            locale
            excerpt
            coverImage {
              sizes(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
                ...GatsbyDatoCmsSizes
              }
            }
          }
        }
      }

    home: datoCmsHome(locale: { eq: $locale }) {

      introTextNode {
        childMarkdownRemark {
          html
        }
      }
      copyright
    }
  }
`;
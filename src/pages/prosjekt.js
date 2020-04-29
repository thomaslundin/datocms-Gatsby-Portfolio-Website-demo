import React from "react";
import Link from "gatsby-link";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import { injectIntl, IntlProvider } from "react-intl";

class IndexPage extends React.Component {
  render() {
    let { data } = this.props;
    
    const divStyle = {
        margin: '40px',
        border: '5px solid pink',
        maxWidth: '300px'
      };

      
    return (
        <>
            <h1>LOL</h1>


        <div>
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
        </div>
      </>
    );
  }
}

export default IndexPage;

export const query = graphql`
  query IndexProjectsNoQuery{
    allDatoCmsWork(
      filter: { locale: { eq: "no" } }
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
  }
`;
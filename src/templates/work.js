import React from "react";
import Slider from "react-slick";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import Layout from "../components/layout"




export default ({ data }) => (
  
  <Layout>
  <article className="sheet">
    <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
    <div className="sheet__inner">
      <h1 className="sheet__title">{data.datoCmsWork.title}</h1>
      <p className="sheet__lead">{data.datoCmsWork.excerpt}</p>

      <div
        className="sheet__body"
        dangerouslySetInnerHTML={{
          __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html
        }}
      />
      <div className="sheet__gallery">
        <Img sizes={data.datoCmsWork.coverImage.sizes} />
      </div>
    </div>
  </article>
  </Layout>
);

export const query = graphql`
  query WorkOLDQuery($slug: String!, $locale: String!) {
    datoCmsWork(slug: { eq: $slug }, locale: { eq: $locale }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      
    
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        sizes(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
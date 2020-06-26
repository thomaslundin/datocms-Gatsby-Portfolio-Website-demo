const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const locales = ["sv", "no"];

  locales.forEach(locale => {
    const prefix = locale === "no" ? "" : `/${locale}`;
    // createPage({
    //   path: `${prefix}/portfolio`,
    //   component: path.resolve(`./src/templates/index.js`),
    //   context: { locale }
    // });
  });

  Promise.all(
    locales.map(locale => {
      graphql(`
        {
          home: datoCmsHome(locale: { eq: "${locale}" }) {
            locale
            slug
          }
          about: datoCmsAboutPage(locale: { eq: "${locale}" }) {
            locale
            slug
          }
          service: datoCmsService(locale: { eq: "${locale}" }) {
            locale
            slug
          }
          project: datoCmsProject(locale: { eq: "${locale}" }) {
            locale
            slug
          }
          hagedesign: datoCmsHagedesign(locale: { eq: "${locale}" }) {
            locale
            slug
          }
          works: allDatoCmsWork(filter: {locale: { eq: "${locale}" } }) {
            edges {
              node {
                locale
                slug
              }
            }
          }
        }
      `).then(result => {
        console.log(result);

        ["home", "about", "service", "hagedesign", "project"].forEach(template => {
          let page = result.data[template];
          const prefix = page.locale === "no" ? "" : `/${page.locale}`;
          let slug = template === "home" ? "" : page.slug;
          createPage({
            path: `${prefix}/${slug}`,
            component: path.resolve(`./src/templates/${template}.js`),
            context: { locale: page.locale }
          });
        });

        result.data.works.edges.forEach(item => {
          const prefix = locale === "no" ? "" : `/${locale}`;
          let langpath = locale === "no" ? "prosjekter" : "projekt";
          let p = `${prefix}/${langpath}/${item.node.slug}`;
          createPage({
            path: p,
            component: path.resolve(`./src/templates/work2.js`),
            context: {
              slug: item.node.slug,
              locale
            }
          });
        });
      });
    })
  );
};
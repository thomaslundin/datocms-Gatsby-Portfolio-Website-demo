import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { IntlProvider, addLocaleData, FormattedMessage } from "react-intl";
import no from "react-intl/locale-data/no";
import sv from "react-intl/locale-data/sv";
import svMessages from "../locales/sv.js";
import noMessages from "../locales/no.js";
import "../styles/index.sass";
import Img from "gatsby-image";

addLocaleData([...sv, ...no]);

const messages = {
  sv: svMessages,
  no: noMessages
};
const locales = ["no", "sv"];

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      is_open: false
    };
  }

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

  renderLang(locale) {
    let list = locales.filter(l => l != locale);
    return (
      <div className="sidebar__langs">
        <span className="sidebar__langs__item" key="current">
          <FormattedMessage id={`lang_${locale}`} />
        </span>
        {list.map(l => (
          <span className="sidebar__langs__item" key={l}>
            <Link
              to={`${l == "en" ? "" : l}/`}
              onClick={() => this.toggleSidebar()}
            >
              <FormattedMessage id={`lang_${l}`} />
            </Link>
          </span>
        ))}
      </div>
    );
  }
  render() {


    //const locale = this.props.location.pathname.startsWith("/it") ? "it" : "en";
    let path_splits = this.props.location.pathname.split("/");
    let locale = "no";
    let incipit = path_splits[1];
    if (locales.indexOf(incipit) > -1) {
      locale = incipit;
    }
    let prefix = locale === "no" ? "" : locale;
    let { children, data } = this.props;
    let cn = this.state.is_open ? "container is-open" : "container";
    return (

      <IntlProvider locale={locale} messages={messages[locale]}>
        
        <div className={cn}>
          <div className="container__sidebar">
            <div className="sidebar">
              <h6 className="sidebar__title">
                asdasdasdas
                <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
              </h6>

              <div className="sidebar__logo">
                <img
                  className="sidebar__logo__img"
                  src={data.datoCmsGlobalInfo.logo.sizes.src}
                />
              </div>

              <h6 className="sidebar__section">
                <FormattedMessage id={"menu"} />
              </h6>
              {this.renderNav(prefix)}
            
              <div className="sidebar__section">asdasdasdasd{this.renderLang(locale)}</div>
            </div>
          </div>
          <div className="container__body">
            <div className="container__mobile-header">
              <div className="mobile-header">
                <div className="mobile-header__menu">
                  <a onClick={() => this.toggleSidebar()} />
                </div>
                <div className="mobile-header__logo">
                  <Link to="/" onClick={() => this.toggleSidebar()}>
                    {data.datoCmsSite.globalSeo.siteName}
                  </Link>
                </div>
              </div>
            </div>
            ***
            {children()}
          </div>
        </div>
      </IntlProvider>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;


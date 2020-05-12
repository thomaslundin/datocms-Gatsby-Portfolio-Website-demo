import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { IntlProvider, FormattedMessage } from "react-intl";
import svMessages from "../locales/sv.js";
import noMessages from "../locales/no.js";
import { withRouter, BrowserRouter } from 'react-router-dom';


class Header extends React.Component {


    
    constructor(props){
      super(props);
        this.state = {
          path_splits : this.props.location.pathname.split("/"),
          locale : "no"
        }
       let incipit = this.state.path_splits[1];
    }

    render(){
        const messages = {
            sv: svMessages,
            no: noMessages
          };
        
        const locales = ["no", "sv"];

        let locale = "no";
        let incipit = this.state.path_splits[1];
        if (locales.indexOf(incipit) > -1) {
            locale = incipit;
        }
        let prefix = locale === "no" ? "" : locale;

        let langpath = locale === "no" ? "prosjekt/" : `${locale}/projekt`;
        let curlang = locale;

        let state = {
            isMenuVisible:false
        };

        return(
            <>
            <h1>LOL{window.location.pathname}IPOP</h1>
            
            {this.renderNav()}
            </>
        )
    }
  
    renderNav = () => {
        console.log("this");
        console.log(this.incipit);
        // this.setState({
            
            
        //     answers: this.state.answers.concat("hello")
        // });
    }
}
export default withRouter(Header);
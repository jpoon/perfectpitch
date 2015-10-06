'use strict';

import React from 'react/addons';

const Footer = React.createClass({

  render() {
    return (
      <footer className="panel-footer text-center">
		<a title="GitHub" href="https://github.com/jpoon/pitchperfect">
	    	<i className="fa fa-fw fa-lg fa-github-square"></i>
		</a>
		<a title="Twitter" href="http://twitter.com/jasonthepoon">
	    	<i className="fa fa-fw fa-lg fa-twitter-square"></i>
		</a>
		<a title="Webpage" href="http://jasonpoon.ca">
	    	<i className="fa fa-fw fa-lg fa-globe"></i>
		</a>
      </footer>
    );
  }

});

export default Footer;
'use strict';

import React from 'react/addons';

const Header = React.createClass({

  render() {
    return (
      <header>
      	<div className="navbar navbar-default">
      		<div className="navbar-header">
      			<a className="navbar-brand">
      				PitchPerfect
      			</a>
	        </div>
	    </div>
      </header>
    );
  }

});

export default Header;
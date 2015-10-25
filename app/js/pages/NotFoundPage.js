'use strict';

import React         from 'react';
import DocumentTitle from 'react-document-title';

const NotFoundPage = React.createClass({

  propTypes: {
  },

  render() {
    return (
      <DocumentTitle title="404: Not Found">
        <section className="not-found-page">

          Page Not Found

        </section>
      </DocumentTitle>
    );
  }

});

export default NotFoundPage;

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import './index.css'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
       /* <!-- jquery script --> */
      script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"
  
      /* <!-- snipcart scripts --> */
      script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"
      script src="https://cdn.snipcart.com/scripts/2.0/snipcart.js" data-api-key="MmQwNDIwOTctYjliYy00NzM0LWI3OGEtMDI4NWY3ZjY3NGQ4NjM2Njk5NzAwNTkxNTcxNjIy" id="snipcart"
      link href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css" rel="stylesheet" type="text/css"
  
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <div
      style={{
        margin: '0 auto',
        width: '100%',
      }}
    >
      {children()}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

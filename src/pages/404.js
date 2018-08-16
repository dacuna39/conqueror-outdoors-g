/*
import React from 'react'

const NotFoundPage = () => (
  <div>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </div>
)

export default NotFoundPage
*/

/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import styled from 'styled-components';

import H from '../components/H';
import SiteBackground from '../components/SiteBackground';

import Link from '../components/Link';

const PageContainer = styled.div`
  padding: 1em 10%;
  padding-top: 9em;
  color: #eee;
  text-align: center;
  margin-top: 10%;
`;

class NotFoundPage extends React.Component {


  render() {
    return (
      <article>

        <SiteBackground style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>

          <PageContainer>
            <div> 
              <H> Page Not Found </H>
              <Link to='/'> Return Home </Link>
            </div>
          </PageContainer>

        </SiteBackground>
      </article>
    );
  }
}

export default NotFoundPage;

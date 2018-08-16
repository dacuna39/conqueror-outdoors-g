import React from 'react';
//import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Wrapper from './Wrapper';

//images
import ConquerorFooterLogo from '../../images/conqueror-logo-text-only.png';

const FooterContainer = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: #eee;
`;

function Footer() {
  return (
    <FooterContainer>
      {/*}
      <Wrapper>
        <section>
          <LocaleToggle />
       </section>
      </Wrapper>
      */}
    <Wrapper style={{ flexWrap: 'wrap', alignItems: 'center' }}>

      <img src={ConquerorFooterLogo} alt='Conqueror Outdoors Logo' height='108px' />
      
      <p> Tel: 1-562-524-2002 <br /> <a style={{color: '#eee'}} href='mailto:Ecommerce.Conqueror@gmail.com'> Ecommerce.Conqueror@gmail.com </a> </p>
      <p>  721 West Whittier Blvd, Suite S <br /> La Habra, CA 90631, USA </p>
      <p> © 2018 Conqueror Outdoors. All Rights Reserved. </p>
    </Wrapper>
    </FooterContainer>
  );
}

export default Footer;

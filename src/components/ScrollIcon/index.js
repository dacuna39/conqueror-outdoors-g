import React from 'react';
import styled from 'styled-components';

import Icon from '../../components/Icon';

const Fixed = styled.div`
    position: fixed;
    bottom: 2em;
    right: 2em;
    z-index: 1100;
`;

const ScrollIcon = () => (
    <Fixed onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'}) }}>
        <Icon className='w-icon-arrow-up' />
    </Fixed>
);

export default ScrollIcon;

/*
 * Header, the Nav bar at the top of the page
 * 
 */

import React from 'react';
import styled from 'styled-components';
import Link from '../../components/Link';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from 'styled-dropdown-component';

import MiniWrapper from './MiniWrapper';
import Button from '../../components/Button';
import Modal from './Modal';
import Icon from '../../components/Icon';

import SingleInput from './SingleInput';
import Img from './Img';
import Section from './Section';
import OuterSection from './OuterSection';
import Wrapper from './Wrapper';

//actions
import { UpdateSearchTerms } from '../../actions/UpdateSearchTerms';

// images
import cartIcon from '../../images/cart-icon.png';
import Conqueror_Outdoors from '../../images/conqueror-logo.png';

//const InputButton = styled.button`${buttonStyles}`;

const HeaderContainer = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  height: 10m;
  background: linear-gradient( rgba(0,0,0,1), rgba(0,0,0,0.9), rgba(0,0,0,0.8), rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0));
  color: #eee;
`;

const HeaderText = styled.div`
  font-family: Times-New-Roman;
  font-size: 1.7em;
  color: #fff;
`;

const NavItem = styled.div`
  margin: 0.5em;
  background: rgba(200,200,200,0.5);
`;

const DropNav = styled.div`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  color: #eee;

  &:hover {
    text-decoration: none;
    color: #00a1ec;
  }
`;

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      showSignInModal: false,
      showMenuModal: false,

      hideDropdown: true,
      hideAboutUsDropdown: true,

      username: '',
      password: '',

      viewportWidth: window.innerWidth,
    };
  }

  toggleDropdown() {
    this.setState({
      hideDropdown: !this.state.hideDropdown,
    });
  }

  toggleAboutUsDropdown() {
    this.setState({
      hideAboutUsDropdown: !this.state.hideAboutUsDropdown,
    });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    this.setState({ viewportWidth: window.innerWidth });
  }

  toggleSignInModal = () => this.setState({ showSignInModal: !this.state.showSignInModal })
  toggleMenuModal = () => this.setState({ showMenuModal: !this.state.showMenuModal })


  handleSearchInput = (e) => { this.setState({ searchInput: e.target.value }) };
  handleUsernameInput = (e) => { this.setState({ username: e.target.value }) };
  handlePasswordInput = (e) => { this.setState({ password: e.target.value }) };

  handleKeyPress = (e) => {

    if (e.key === 'Enter' && this.state.searchInput.length !== 0) {
      this.props.UpdateSearchTerms(this.state.searchInput, 'All', 'All');
      this.props.history.push('/refresh');
    }
  }

  render() {

    if (this.state.viewportWidth > 1375) { //return fullsize header
      return (
        <div>

          <Modal show={this.state.showSignInModal} onClose={this.toggleSignInModal} >
            <h1> Sign In </h1>
            <hr />
            <SingleInput
              inputType={'text'}
              title={' '}
              name={'username'}
              controlFunc={this.handleUsernameInput}
              content={this.state.username}
              placeholder={'UserName'}
            />
            <SingleInput
              inputType={'password'}
              title={' '}
              name={'password'}
              controlFunc={this.handlePasswordInput}
              content={this.state.password}
              placeholder={'password'}
            />
            <br />
            <Button> Sign In </Button>
            <section> <Link to='#'> <p> Forgot Password? </p> </Link> </section>
            <section> <Link to='#'> <p> Create an Account </p> </Link> </section>

          </Modal>

          <HeaderContainer>
            <Wrapper style={{ justifyContent: 'space-between' }}>
              <section className='headerleft'>
                <HeaderText>
                  <Wrapper style={{ justifyContent: 'flex-start' }}>
                    {/*<Link to='/'> <Img src={Conqueror_Outdoors} alt="" height='164' /></Link> */}
                    <section style={{ width: '350px', cursor: 'pointer' }} onClick={() => this.props.history.push('/')}>
                      <img src={Conqueror_Outdoors} alt='Conqueror Outdoors Logo' width='100%' />
                    </section>

                    <Section>
                      <Dropdown>
                        <Link to='/shop'>
                          <DropNav onMouseOver={() => this.toggleDropdown()} onClick={() => this.toggleDropdown()}>
                            SHOP
                        </DropNav>
                        </Link>

                        <DropdownMenu hidden={this.state.hideDropdown} style={{ background: 'rgba(255,255,255,0.8)' }}>
                          <div onMouseLeave={() => this.setState({ hideDropdown: true })}>
                            <DropdownItem>
                              <Link to='/shop'>
                                <div style={{ color: '#000' }} onClick={() => this.toggleDropdown()}> ALL </div>
                              </Link>
                            </DropdownItem>

                            <DropdownItem>
                              <Link to='/brands'>
                                <div style={{ color: '#000' }} onClick={() => this.toggleDropdown()}> BRANDS </div>
                              </Link>
                            </DropdownItem>

                            <DropdownItem>
                              <Link to='/refresh'>
                                <div style={{ color: '#000' }} onClick={() => {
                                  this.toggleDropdown();
                                  this.props.UpdateSearchTerms('null', 'Crossbows', 'All');
                                }}>
                                  CROSSBOWS
                          </div>
                              </Link>
                            </DropdownItem>

                            <DropdownItem>
                              <Link to='/refresh'>
                                <div style={{ color: '#000' }} onClick={() => {
                                  this.toggleDropdown();
                                  this.props.UpdateSearchTerms('null', 'Bows', 'All');
                                }}>
                                  BOWS
                            </div>
                              </Link>
                            </DropdownItem>

                            <DropdownItem>
                              <Link to='/refresh'>
                                <div style={{ color: '#000' }} onClick={() => {
                                  this.toggleDropdown();
                                  this.props.UpdateSearchTerms('null', 'Crossbow Accessories', 'All');
                                }}>
                                  CROSSBOW ACCESSORIES
                            </div>
                              </Link>
                            </DropdownItem>

                            <DropdownItem>
                              <Link to='/refresh'>
                                <div style={{ color: '#000' }} onClick={() => {
                                  this.toggleDropdown();
                                  this.props.UpdateSearchTerms('null', 'Bow Accessories', 'All');
                                }}>
                                  BOW ACCESSORIES
                            </div>
                              </Link>
                            </DropdownItem>

                          </div>
                        </DropdownMenu>

                      </Dropdown>
                    </Section>

                    <Section> <Link to='/media'> <div> MEDIA </div> </Link> </Section>

                    <Section>
                      <Dropdown>
                        <Link to='/aboutUs'>
                          <DropNav onMouseOver={() => this.toggleAboutUsDropdown()} onClick={() => this.toggleAboutUsDropdown()}>
                            COMPANY
                        </DropNav>
                        </Link>

                        <DropdownMenu hidden={this.state.hideAboutUsDropdown} style={{ background: 'rgba(255,255,255,0.8)' }}>
                          <DropdownItem>
                            <Link to='/aboutUs'>
                              <div style={{ color: '#000' }} onClick={() => { this.toggleAboutUsDropdown() }}>
                                ABOUT US
                            </div>
                            </Link>
                          </DropdownItem>

                          <DropdownItem>
                            <Link to='/shipping'>
                              <div style={{ color: '#000' }} onClick={() => { this.toggleAboutUsDropdown() }}>
                                SHIPPING
                            </div>
                            </Link>
                          </DropdownItem>

                          <DropdownItem>
                            <Link to='/becomeADealer'>
                              <div style={{ color: '#000' }} onClick={() => { this.toggleAboutUsDropdown() }}>
                                BECOME A DEALER
                            </div>
                            </Link>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </Section>
                  </Wrapper>
                </HeaderText>
              </section>

              <Wrapper className='header-right'>

                <Wrapper className='search-container' style={{ justifyContent: 'space-between', alignItems: 'center'}}
                  onKeyDown={this.handleKeyPress}
                >
                  <SingleInput
                    inputType={'text'}
                    title={' '}
                    name={'search'}
                    controlFunc={this.handleSearchInput}
                    content={this.state.searchInput}
                    placeholder={'Search'}
                  />
                  <div onClick={() => {
                    this.props.UpdateSearchTerms(this.state.searchInput, 'All', 'All');
                    this.props.history.push('/refresh');
                  }}>
                    <Icon className={'w-icon-search'} />
                  </div>
                </Wrapper>

                <Section> <Button onClick={() => this.props.history.push('/orders')}> MY ORDER </Button> </Section>

                {/* <Section> <Button onClick={this.toggleSignInModal}> SIGN IN </Button> </Section> */}
                <Section>
                  <Button onClick={() => this.props.history.push('/cart')}>
                    <Wrapper style={{ justifyContent: 'space-between', alignItems: 'center' }}> CART <Img src={cartIcon} alt={''} height={21} /> </Wrapper>
                  </Button>
                </Section>
              </Wrapper>

            </Wrapper>
          </HeaderContainer>
        </div>
      );
    }
    else { //return mini header
      return (
        <div>
          <Modal show={this.state.showMenuModal} onClose={this.toggleMenuModal} >
            <h3> Menu </h3>
            <NavItem onClick={this.toggleMenuModal} > <Link to='/shop'> <label> Shop </label> </Link> </NavItem>
            <NavItem onClick={this.toggleMenuModal} > <Link to='/media'> <label> Media </label> </Link> </NavItem>
            <NavItem onClick={this.toggleMenuModal} > <Link to='/becomeADealer'> <label> Become A Dealer </label> </Link> </NavItem>
            <NavItem onClick={this.toggleMenuModal} > <Link to='/shipping'> <div> Shipping </div> </Link> </NavItem>
            <NavItem onClick={this.toggleMenuModal} > <Link to='/aboutUs'> <div> About Us </div> </Link> </NavItem>
            <NavItem onClick={this.toggleMenuModal} > <Link to='/orders'> <label> My Order </label> </Link> </NavItem>
            <NavItem onClick={this.toggleMenuModal} > <Link to='/cart'> <label> Cart </label> </Link> </NavItem>
          </Modal>

          <HeaderContainer>
            <Wrapper>
              <OuterSection>
                <section style={{ width: '350px', cursor: 'pointer' }} onClick={() => this.props.history.push('/')}>
                  <img src={Conqueror_Outdoors} alt='Conqueror Outdoors Logo' width='100%' />
                </section>
              </OuterSection>

              <OuterSection>
                <MiniWrapper>
                  <SingleInput
                    inputType={'text'}
                    title={' '}
                    name={'search'}
                    controlFunc={this.handleSearchInput}
                    content={this.state.searchInput}
                    placeholder={'Search'}
                  />
                  <Link to={'/search/' + this.state.searchInput}>
                    <Icon className={'w-icon-search'} />
                  </Link>
                </MiniWrapper>
                <div onClick={this.toggleMenuModal}> <Icon className='w-icon-dot-chart' /> </div>
              </OuterSection>
            </Wrapper>
          </HeaderContainer>
        </div>
      );
    }
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ UpdateSearchTerms: UpdateSearchTerms }, dispatch);
}

export default withRouter(connect(null, matchDispatchToProps)(Header));

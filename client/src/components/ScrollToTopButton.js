import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/ScrollToTopButton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class ScrollToTopButton extends Component {
  state = {
    isHidden: true
  };

  showButton = () => {
    const { isHidden } = this.state
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.setState({
        isHidden: false
      });
    }
    if (window.scrollY === 0 && !this.state.isHidden) {
      this.setState({
        isHidden: true
      });
    }
  };

  scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  componentDidMount() {
    window.addEventListener('scroll', this.showButton);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.showButton);
  };

  render() {
    return (
      <Link to='/' onClick={this.scrollToTop} className={cx(styles.button, {
        showButton: !this.state.isHidden
      })}>
        <i className="fa fa-angle-up"></i>
      </Link>
    );
  }
}

export default ScrollToTopButton;

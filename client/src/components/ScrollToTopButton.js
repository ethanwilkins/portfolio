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
    // if user has scroll at least half way down the page, show button
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - (window.innerHeight / 2)) {
      this.setState({
        isHidden: false
      });
    }
    // hide button when user has gone back to top
    if (window.scrollY < 5 && !this.state.isHidden) {
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
      <div onClick={this.scrollToTop} className={cx(styles.button, {
        showButton: !this.state.isHidden,
        noSelect: true
      })}>
        <i className="fa fa-angle-up"></i>
      </div>
    );
  }
}

export default ScrollToTopButton;

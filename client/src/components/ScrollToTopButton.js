import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/ScrollToTopButton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class ScrollToTopButton extends Component {
  state = {
    hidden: true
  };

  showButton = () => {
    const { hidden } = this.state
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.setState({
        hidden: false
      });
    }
  };

  componentDidMount(){
    window.addEventListener('scroll', this.showButton);
  };

  componentWillUnmount(){
    window.removeEventListener('scroll', this.showButton);
  };

  render() {
    return (
      <Link to='/' className={cx(styles.button, {
        showButton: !this.state.hidden
      })}>
        <div className={styles.container}>
          <span className={styles.icon}>
            <i className="fa fa-angle-up"></i>
          </span>
        </div>
      </Link>
    );
  }
}

export default ScrollToTopButton;

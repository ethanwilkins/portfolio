import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPosts } from '../actions/postActions';

import NavbarContainer from './NavbarContainer';
import Footer from '../components/Footer';
import CreatePost from './CreatePost';
import PostFeed from './PostFeed';
import CategoryFeed from './CategoryFeed';
import CreateCategory from './CreateCategory';

import styles from '../styles/BlogPage.module.scss';

export class BlogPage extends Component {
  state = {
    postsSize: ''
  };

  componentDidMount = () => {
    const { getPosts } = this.props;
    getPosts().then((res) => {
      if (res.payload) {
        // to display number of blog posts
        this.setState({postsSize: res.payload.length});
      }
    });
  };

  render() {
    const { postsSize } = this.state;

    return (
      <div>
        <NavbarContainer />
        <div className={styles.blog}>
          <div className={styles.leftPane}>
            <div className="linkActive">
              All {postsSize} Posts
            </div>
            <CategoryFeed />
            <CreateCategory />
          </div>
          <div className={styles.feed}>
            {localStorage.jwtToken &&
                <CreatePost />
            }
            <PostFeed />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

BlogPage.propTypes = {
  getPosts: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts())
});

export default connect(
  null,
  mapDispatchToProps
)(BlogPage);

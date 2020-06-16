import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPosts, getPostsByCategoryId } from '../actions/postActions';
import { getCategoryByPrettyId } from '../actions/categoryActions';

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
    const { getPosts, getCategoryByPrettyId, getPostsByCategoryId, history } = this.props;
    // listens to changes in browser history
    history.listen((location) => {
      // if new path includes category, order posts by category
      if (location.pathname.includes('category')) {
        // extracts prettyId for category from path
        const prettyId = location.pathname.replace('/blog/category/', '');
        // retrieves category by it's prettyId in order to get posts with it's _id
        getCategoryByPrettyId(prettyId).then((res) => {
          if (res.payload.category) {
            getPostsByCategoryId(res.payload.category._id).then(() => {
              console.log('Successfully filtered posts by category.');
            });
          }
        });
      }
    })

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
            <CreatePost />
            <PostFeed />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

BlogPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getCategoryByPrettyId: PropTypes.func.isRequired,
  getPostsByCategoryId: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
  getCategoryByPrettyId: prettyId => dispatch(getCategoryByPrettyId(prettyId)),
  getPostsByCategoryId: categoryId => dispatch(getPostsByCategoryId(categoryId))
});

export default connect(
  null,
  mapDispatchToProps
)(BlogPage);

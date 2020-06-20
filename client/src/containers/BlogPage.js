import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { isMobile } from "react-device-detect";

import { getPosts, getPostsByCategoryId, getPostsByTagId } from '../actions/postActions';
import { getCategoryByPrettyId } from '../actions/categoryActions';
import { getTagByPrettyId } from '../actions/tagActions';

import { Link } from 'react-router-dom';

import NavbarContainer from './NavbarContainer';
import Footer from '../components/Footer';
import CreatePost from './CreatePost';
import PostFeed from './PostFeed';
import TagFeed from './TagFeed';
import CreateTag from './CreateTag';
import CategoryFeed from './CategoryFeed';
import CreateCategory from './CreateCategory';

import styles from '../styles/BlogPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export class BlogPage extends Component {
  state = {
    postsSize: '',
    expanded: false
  };

  componentDidMount = () => {
    const { getPosts, getCategoryByPrettyId, getTagByPrettyId, getPostsByCategoryId, getPostsByTagId, history } = this.props;
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
      else if (location.pathname.includes('tag')) {
        // extracts prettyId for tag from path
        const prettyId = location.pathname.replace('/blog/tag/', '');
        // retrieves category by it's prettyId in order to get posts with it's _id
        getTagByPrettyId(prettyId).then((res) => {
          if (res.payload.tag) {
            getPostsByTagId(res.payload.tag._id).then(() => {
              console.log('Successfully filtered posts by tag.');
            });
          }
        });
      }
    });
    getPosts().then((res) => {
      if (res.payload) {
        // to display number of total blog posts
        this.setState({postsSize: res.payload.length});
      }
    });
    // collapses dropdown for tags and categories in mobile on screen resize
    window.addEventListener("resize", this.collapse);
  };
  
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.collapse);
  };

  collapse = () => {
    // only applies to desktop
    if (!isMobile) {
      this.setState({ expanded: false })
    }
  };

  handleExpandClick = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  render() {
    const { postsSize, expanded } = this.state;
    const { location } = this.props;
    const path = location.pathname;

    return (
      <div>
        <NavbarContainer />
        <div className={styles.blog}>
          <div className={styles.leftPane}>
            <div className={styles.expandLink + ' noSelect'} onClick={this.handleExpandClick}>
              <div className={styles.expandIcon}>
                <i className="fa fa-angle-down"></i>
              </div>
              <div className={styles.filterPostsLabel}>Filter Posts</div>
              <div className={styles.byCategoryLabel + ' linkSoft'}>By category or tag</div>
            </div>

            <div className={cx(styles.filterPane, {
                filterPaneExpanded: expanded
            })}>
              <div className={cx(styles.filterPaneCover, {
                filterPaneCoverExpanded: expanded
              })}></div>
              <div className={cx(styles.filterPaneInner, {
                filterPaneInnerExpanded: expanded
              })}>
                <Link to='/blog' className={cx(styles.allPostsLink, {
                  linkActive: path === '/blog'
                })}>
                  All {postsSize} Posts
                </Link>
                <CategoryFeed />
                <CreateCategory />
              </div>
            </div>

            <div className={cx(styles.filterPane, {
                filterPaneExpanded: expanded
            })}>
              <div className={cx(styles.filterPaneCover, {
                filterPaneCoverExpanded: expanded
              })}></div>
              <div className={cx(styles.filterPaneInner, {
                filterPaneInnerExpanded: expanded
              })}>
                <TagFeed />
                <CreateTag />
              </div>
            </div>

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
  getTagByPrettyId: PropTypes.func.isRequired,
  getPostsByCategoryId: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
  getCategoryByPrettyId: prettyId => dispatch(getCategoryByPrettyId(prettyId)),
  getTagByPrettyId: prettyId => dispatch(getTagByPrettyId(prettyId)),
  getPostsByCategoryId: categoryId => dispatch(getPostsByCategoryId(categoryId)),
  getPostsByTagId: categoryId => dispatch(getPostsByTagId(categoryId))
});

export default connect(
  null,
  mapDispatchToProps
)(BlogPage);

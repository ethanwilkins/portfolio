import React, { Component } from 'react';
import NavbarContainer from './NavbarContainer';
import Footer from '../components/Footer';
import CreatePost from './CreatePost';
import PostFeed from './PostFeed';
import axios from 'axios';

import styles from '../styles/BlogPage.module.scss';

export class BlogPage extends Component {
  state = {
    postsSize: ''
  };

  componentDidMount = () => {
    axios.get('/posts').then((res) => {
      if (res.data) {
        // to display number of blog posts
        this.setState({postsSize: res.data.length});
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

export default BlogPage;

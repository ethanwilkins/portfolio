import React, { Component } from 'react';
import NavbarContainer from './NavbarContainer';
import Footer from '../components/Footer';
import CreatePost from './CreatePost';
import PostFeed from './PostFeed';

import styles from '../styles/BlogPage.module.scss';

export class BlogPage extends Component {
  render() {
    return (
      <div>
        <NavbarContainer />
        <div className={styles.blog}>
          <div className={styles.leftPane}>
            <div className="linkActive">
              All X Posts
            </div>
          </div>
          <div className={styles.feed}>
            {localStorage.jwtToken &&
              <div>
                <CreatePost />
                <PostFeed />
              </div>
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default BlogPage;

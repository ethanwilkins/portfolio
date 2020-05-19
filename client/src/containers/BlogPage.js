import React, { Component } from 'react';

import NavbarContainer from './NavbarContainer';
import Footer from '../components/Footer';
import { TrixEditor } from "react-trix";

import 'trix/dist/trix';
import 'trix/dist/trix.css';
import styles from '../styles/BlogPage.module.scss';

export class BlogPage extends Component {
  handleEditorReady(editor) {
    // this is a reference back to the editor if you want to
    // do editing programatically
  }
  handleChange(html, text) {
    // html is the new html content
    // text is the new text content
  }
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
              <TrixEditor
                autoFocus={true}
                placeholder="Post something awesome..."
                uploadURL="https://domain.com/imgupload/receiving/post"
                uploadData={{"key1": "value", "key2": "value"}}
                onChange={this.handleChange}
                onEditorReady={this.handleEditorReady}
              />
            }
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default BlogPage;

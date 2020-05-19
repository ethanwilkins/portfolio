import React, { Component } from 'react';

import NavbarContainer from './NavbarContainer';
import Footer from '../components/Footer';

export class BlogPage extends Component {

  render() {
    return (
      <div>
        <NavbarContainer />

        {localStorage.jwtToken &&
          <div>
            
          </div>
        }

        <Footer />
      </div>
    );
  }
}

export default BlogPage;

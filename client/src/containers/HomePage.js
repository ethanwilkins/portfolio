import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavbarContainer from './NavbarContainer';
import Footer from '../components/Footer';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import mainImg from '../images/html.jpg';
import lilCImg from '../images/lil_c_screen.png';
import styles from '../styles/HomePage.module.scss';

export class HomePage extends Component {
  render() {
    return (
      <div>
        <NavbarContainer />

        <div className={styles.headerCard}>
          <h2 className={styles.pageHeader}>
            Freelance Web Designer & Developer from Smithfield, NC.
          </h2>
        </div>

        <div className={styles.mainImgContainer} align="center">
          <LazyLoadImage
            alt='HTML code should show here.'
            effect="opacity"
            src={mainImg}
            className={styles.mainImg} />
        </div>

        <div className="card" align="left">
          <div className="cardCol">
            <p className="linkSoft">
              About
            </p>
            <p>
              Need a professional website made with quick turnaround for your business, company, or idea that hasn't launched yet?
            </p>
            <p>
              All of my websites are built from scratch using the web development framework known as Ruby on Rails. So whether it's a simple, static landing page for your art or music, or something more complex (e.g. custom social networks or inventory management systems), you've come to the right place.
            </p>
            <p>
              My specialties include website design, hosting, mobile responsive websites, search engine optimization, and full scale content management systems.
            </p>
          </div>

          <div className="cardColSpacer"></div>

          <div className="cardCol">
            <p className="linkSoft">
              Hire me
            </p>
            <p>
              So are you looking for a professional, communicative, and punctual software engineer with extensive web development skills?
            </p>
            <p>
              If you have an application you are interested in developing, a problem that needs solving or a project that needs rescuing, I'd love to help you with it.
            </p>
            <p>
              Send me an email:
            </p>
            <p>
              <a href="mailto:forrestwilkins@protonmail.com" target="_blank" rel="noopener noreferrer" className='linkUnderlined linkActive'>
                forrestwilkins@protonmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="card" align="left">
          <p className="linkSoft">
            My work
          </p>

          <a href="https://lilccorleone.com" target="_blank" rel="noopener noreferrer" className={styles.lilCLink}>
            <div className="cardCol">
              <LazyLoadImage
                alt="Lil' C. screenshot"
                effect="opacity"
                src={lilCImg}
                className={styles.lilCImg} />
            </div>

            <div className="cardColSpacer"></div>

            <div className="cardCol">
              <div className={styles.quote}>
                <i className={styles.doubleQuote}>"</i>Forrest provides excellent services. The web design he did for my website is much like the professional musician’s websites that I’ve seen and I’m lucky to have come across someone who cares about their customers as much as he does!<i className={styles.doubleQuote}>"</i>
                <div className={styles.quoteGiver}><i>- Chris Peterson, <b>Lil' C. Corleone</b></i></div>
              </div>
            </div>
          </a>
        </div>

        <div className="card" align="left">
          <p className="linkSoft">
            Projects
          </p>
          <p>
            <a href="https://play.google.com/store/apps/developer?id=Forrest+Wilkins" rel="noopener noreferrer" target="_blank">
              Interactive Art Apps made with Processing
            </a>
          </p>
        </div>

        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(HomePage);

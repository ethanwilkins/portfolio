import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tag from './Tag';

import styles from '../styles/CategoryList.module.scss';

import { isMobile } from "react-device-detect";

class TagList extends Component {
  state = {
    expanded: false
  }

  componentDidMount = () => {
    const { getTags } = this.props;
    getTags().then(() => {
      console.log("Successfully loaded tags.");
    });
    // collapses dropdown for tags in mobile on screen resize
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

  handleSeeAllClick = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  render() {
    const { tags, deleteTag } = this.props;
    const { expanded } = this.state;

    return (
      <div className={styles.container + ' ' + styles.tagContainer}>
        <div className={styles.label + " linkSoft"}>
          Tags
        </div>
        {tags.slice(0, (expanded ? tags.length : 3)).map(
          tag =>
          <Tag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            prettyId={tag.prettyId}
            deleteTag={id => deleteTag(id)}
          />
        )}
        <div
          className={styles.seeAllLink + " linkSoft"}
          onClick={this.handleSeeAllClick}
        >
          {expanded ? 'close' : 'see all'}
        </div>
      </div>
    );
  }
}

TagList.defaultProps = {
  tags: [],
};

TagList.propTypes = {
  getTags: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  )
};

export default TagList;

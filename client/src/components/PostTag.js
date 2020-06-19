import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

class PostTag extends Component {
  state = {
    tag: {}
  }

  componentDidMount = () => {
    const { getTag, _id } = this.props;
    getTag(_id).then((res) => {
      this.setState({
        tag: res.payload.tag,
      });
    });
  };

  render() {
    const { tags, _id } = this.props;
    const { tag } = this.state;
    return (
      <Link to={`/blog/tag/${tag.prettyId}`} style={{marginRight: '0.25em'}} className='linkSoft'>
        {tag.name + (tags[tags.length - 1] !== _id ? ',' : '')}
      </Link>
    );
  }
}

PostTag.propTypes = {
  _id: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  getTag: PropTypes.func.isRequired,
};

export default PostTag;

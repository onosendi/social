import PropTypes from 'prop-types';
import React from 'react';

// Local
import Loading from '../Loading';

import PostItem from '../PostItem';

const Posts = ({ loading, posts, noData }) => {
  const render = () => {
    let rendered;
    if (loading) {
      rendered = <Loading />;
    } else if (posts.length) {
      rendered = (
        posts.map((postId) => (
          <PostItem
            key={postId}
            postId={postId}
          />
        ))
      );
    } else {
      rendered = noData;
    }
    return rendered;
  };

  return render();
};

Posts.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Posts;

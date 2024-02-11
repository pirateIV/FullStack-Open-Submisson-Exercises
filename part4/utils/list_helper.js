const dummy = (blogs) => {
  return blogs;
};

const totalLikes = (blogPosts) => {
  const reducer = (acc, cur) => {
    return acc + cur.likes;
  };

  return blogPosts.reduce(reducer, 0);
};

module.exports = { dummy, totalLikes };

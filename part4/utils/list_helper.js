const dummy = (blogs) => {
  if (blogs) {
    return 1;
  }
};

const totalLikes = (blogPosts) => {
  const reducer = (acc, cur) => {
    return acc + cur.likes;
  };

  return blogPosts.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const maxLikesIndex = likes.indexOf(Math.max(...likes));

  const removeParts = (arr) => {
    return arr.map(({ title, author, likes }) => {
      return { title, author, likes };
    });
  };

  const modifiedBlogs = removeParts(blogs);

  return modifiedBlogs[maxLikesIndex];
};

const mostBlogs = () => {};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };

const _ = require('lodash');

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
  const maxLikesIndex = _.indexOf(_.map(blogs, 'likes'), _.max(_.map(blogs, 'likes')));

  const includeOnlyParts = (blogs) => {
    return _.map(blogs, ({ author, title, likes }) => {
      return { author, title, likes };
    });
  };

  const modifiedBlogs = includeOnlyParts(blogs);

  return modifiedBlogs[maxLikesIndex];
};

const mostBlogs = (blogs) => {
  const maxLikesIndex = _.indexOf(_.map(blogs, 'blogs'), _.max(_.map(blogs, 'blogs')));

  const includeOnlyParts = (blogs) => {
    return _.map(blogs, ({ author, blogs }) => {
      return { author, blogs };
    });
  };

  const modifiedBlogs = includeOnlyParts(blogs);

  return modifiedBlogs[maxLikesIndex];
};

const mostLikes = (blogs) => {
  const maxLikesIndex = _.indexOf(_.map(blogs, 'likes'), _.max(_.map(blogs, 'likes')));

  const includeOnlyParts = (blogs) => {
    return _.map(blogs, ({ author, likes }) => {
      return { author, likes };
    });
  };

  const modifiedBlogs = includeOnlyParts(blogs);

  return modifiedBlogs[maxLikesIndex];
};
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    blogs: 2,
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    blogs: 2,
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    blogs: 3,
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    blogs: 3,
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    blogs: 0,
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    blogs: 1,
    likes: 2,
    __v: 0,
  },
];

// mostBlogs(blogs);
console.log(mostLikes(blogs));
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };

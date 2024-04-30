const dummy = (blogs) => {
    return blogs.length === 0 ? 0 : 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    const findMaxLikes = (max, blog) => {
      return blog.likes > max.likes ? blog : max;
    };
  
    return blogs.reduce(findMaxLikes, { likes: -Infinity });
  };
  
const mostBlogs = (blogs) => {
    const authorBlogs = {};
    blogs.forEach((blog) => {
        if (authorBlogs[blog.author]) {
          authorBlogs[blog.author].blogs++;
        } else {
          authorBlogs[blog.author] = { author: blog.author, blogs: 1 };
        }
      });
  
    const result = Object.entries(authorBlogs).reduce((prev, curr) => {
        return curr[1].blogs > prev[1].blogs ? curr : prev;
    });

  
      return [{ author: result[0], blogs: result[1].blogs }];;
}
  

const mostLikes = (blogs) => {
    const authorStats = {};
    blogs.forEach((blog) => {
        if (authorStats[blog.author]) {
            authorStats[blog.author].blogs++;
            authorStats[blog.author].likes += blog.likes;
        } else {
            authorStats[blog.author] = { author: blog.author, blogs: 1, likes: blog.likes };
        }
    });

    const result = Object.entries(authorStats).reduce((prev, curr) => {
        return curr[1].likes > prev[1].likes ? curr : prev;
    });

    return [{ author: result[0], likes: result[1].likes }];
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};
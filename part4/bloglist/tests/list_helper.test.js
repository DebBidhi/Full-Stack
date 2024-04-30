const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

describe('total likes', () => {
    test('when list has multiple blogs, returns the sum of likes', () => {
        const listWithOneBlog = [
            {
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              likes: 5
            }
          ]
        const result = listHelper.totalLikes(listWithOneBlog);
        assert.strictEqual(result, 5);
    });
});

describe('favoriteBlog', () => {
    const blogs = [
        {
            title: 'Blog 1',
            author: 'Author 1',
            likes: 10
        },
        {
            title: 'Blog 2',
            author: 'Author 2',
            likes: 20
        },
        {
            title: 'Blog 3',
            author: 'Author 2',
            likes: 30
        }
    ];

    test('returns the blog with the most likes', () => {
        const result = listHelper.favoriteBlog(blogs);
        assert.deepStrictEqual(result, {
            title: 'Blog 3',
            author: 'Author 2',
            likes: 30
        });
    });
});

describe('mostBlogs', () => {
    const blogs = [
        {
            title: 'Blog 1',
            author: 'Author 2',
            likes: 10,
        },
        {
            title: 'Blog 2',
            author: 'Author 2',
            likes: 20,
        },
        {
            title: 'Blog 3',
            author: 'Author 2',
            likes: 30,
        },
        {
            title: 'Blog 4',
            author: 'Author 1',
            likes: 15,
        }
    ];

    test('returns the author with the most blogs', () => {
        const result = listHelper.mostBlogs(blogs);
        assert.deepStrictEqual(result, [
            {
                author: 'Author 2',
                blogs: 3
            }
        ]);
    });
});

describe('mostLikes', () => {
    const blogs = [
        {
            title: 'Blog 1',
            author: 'Author 1',
            likes: 10,
        },
        {
            title: 'Blog 2',
            author: 'Author 2',
            likes: 20,
        },
        {
            title: 'Blog 3',
            author: 'Author 3',
            likes: 30,
        }
    ];
    
    test("returns the author with the most likes", () => {
        const result = listHelper.mostLikes(blogs);
        assert.deepStrictEqual(result, [
         {
            author: "Author 3",
            likes: 30
        }
        ]);
    });
});
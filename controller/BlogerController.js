class BlogerController {
    
    /**
      * @desc    Dashboard page
      * @route   GET /bloger/dashboard
      * @access  Private
     */
    dashboard = (req, res, next) => {
        const blogs = [
            {
                id: 1,
                title: "Test",
                description: "Description for Test",
                slug: "test-1"

            },
            {
                id: 2,
                title: "Test 2",
                description: "Description for Test 2",
                slug: "test-2"
            },
            {
                id: 3,
                title: "Test 3",
                description: "Description for Test 3",
                slug: "test-3"
            },
            {
                id: 4,
                title: "Test 4",
                description: "Description for Test 4",
                slug: "test-4"
            },
        ]

        res.render('bloger/dashboard', { user: req.user, blogs: blogs })
    }
}

const blogercontroller = new BlogerController
export default blogercontroller

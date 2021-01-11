$('.formForDeleteBlog').on('click', function() {
    if(confirm('Delete Blog?')) {
        $(this).submit()
    }
})

function showUploadedBlogPhoto(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader()

        reader.onload = function (e) {
            $('.display-uploaded-blog-photo').attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0])
    }

    setTimeout(function() {
        if (input.files[0].size > 1000000) {
            $('.text-for-upload-blog-photo-bigger-then-1mb').removeClass('d-none')
            $('.saveBlogButton').attr('disabled', true)
        } else {
            $('.text-for-upload-blog-photo-bigger-then-1mb').addClass('d-none')
            $('.saveBlogButton').attr('disabled', false)
        }
    }, 500)
}

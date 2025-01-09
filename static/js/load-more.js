jQuery(document).ready(function($) {
    var page = 1;

    $('#load-more-posts').on('click', function (e) {
        console.log('clicked');
    
        e.preventDefault();
        page++;
    
        $('#spinner').show();
        $('#load-more-posts').prop('disabled', true).hide(); 
    
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'load_more',
                post_type: 'project', 
                page: page
            },
            success: function (response) {
                console.log('success');
                if (response) {
                    console.log('response success');
                    $('#post-grid-container').append(response);
                    $('#load-more-posts').prop('disabled', false).show();
                } else {
                    console.log('else');
                    $('#load-more-posts').hide(); 
                    $('#no-more-posts').removeClass('hidden'); 
                }
            },
            error: function () {
                console.log('error');
                alert('Failed to load more posts. Please try again.');
            },
            complete: function () {
                $('#spinner').hide();
            }
        });
    });
    
});

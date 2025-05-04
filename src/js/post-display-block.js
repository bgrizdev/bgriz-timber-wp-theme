import Isotope from "isotope-layout";
import imagesLoaded from "imagesloaded";

jQuery(document).ready(function ($) {
    // Initialize Isotope
    const iso = new Isotope('#post-grid-container', {
        itemSelector: '.post-grid-item',
        layoutMode: 'fitRows',
    });

    // Add event listeners to buttons
    const buttons = document.querySelectorAll('#filter-buttons .filter-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            e.target.classList.add('active');
            // Filter items
            const filterValue = e.target.getAttribute('data-filter');
            iso.arrange({ filter: filterValue });
        });
    });

    // Load more posts
    var page = 1;

    $('#load-more-posts').on('click', function (e) {
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
                page: page,
            },
            success: function (response) {
                if (response) {
                    const $newItems = $(response);
    
                    // Append new items to the container
                    $('#post-grid-container').append($newItems);
    
                    // Ensure images are loaded before triggering Isotope layout
                    imagesLoaded($newItems, function () {
                        iso.appended($newItems.get());
                        iso.layout();
                    });
    
                    $('#load-more-posts').prop('disabled', false).show();
                } else {
                    $('#load-more-posts').hide();
                    $('#no-more-posts').removeClass('hidden');
                }
            },
            error: function () {
                alert('Failed to load more posts. Please try again.');
            },
            complete: function () {
                $('#spinner').hide();
            }
        });
    });

    $('#mobile-filter-select').on('change', function () {
        const filterValue = $(this).val();

        // Apply filter
        const iso = Isotope.data('#post-grid-container'); // Reuse existing instance
        if (iso) {
            iso.arrange({ filter: filterValue });
        }

        // Optional: sync active state on desktop buttons if needed
        $('.filter-button').removeClass('active');
        $('.filter-button[data-filter="' + filterValue + '"]').addClass('active');
    });

});

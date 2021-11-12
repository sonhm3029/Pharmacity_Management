$(function() {
    // Pagination for product
    $('.page-link').click(function() {
        let urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', $(this).text());
        window.location.search = urlParams;
    })

    // Active page
    let urlParams = new URLSearchParams(window.location.search);
    var page_number = urlParams.get('page');
    const list_page_link = $('.page-link');
    for(var i = 0; i <list_page_link.length; i++) {
        if($(list_page_link[i]).text() == page_number) {
            $(list_page_link[i]).addClass('active-page');
        }
    }
})
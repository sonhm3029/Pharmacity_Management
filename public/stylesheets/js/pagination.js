$(function() {
    // Pagination for product
    const number_of_page = $('.page-link').length;
    console.log(number_of_page);
    $('.page-link').click(function() {
        let urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', $(this).text());
        window.location.search = urlParams;
    })
    $('#next-page').click(function() {
        let urlParams = new URLSearchParams(window.location.search);
        var current_page = Number(urlParams.get('page'));
        if(current_page <= number_of_page - 1) {
            current_page +=1;
        }
        current_page = String(current_page)
        urlParams.set('page', current_page);
        window.location.search = urlParams;
    })

    $('#pre-page').click(function() {
        let urlParams = new URLSearchParams(window.location.search);
        var current_page = Number(urlParams.get('page'));
        if(current_page > 1) {
            current_page -=1;
        }
        current_page = String(current_page)
        urlParams.set('page', current_page);
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

    // Active taskbar
    const taskbar_items = $('.sidebar-nav__item');
    const sidebar_task__link = $('.sidebar-task__link');
    let urlPath = window.location.pathname;
    for(var i=0; i <sidebar_task__link.length; i++) {
        if($(sidebar_task__link[i]).attr('href') == urlPath) {
            $(sidebar_task__link[i]).addClass('active-task__link');
            $(taskbar_items[i]).addClass('active-task');
        }
    }
})
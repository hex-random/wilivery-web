/* global renderArticles */

$(function(){
    renderArticles('#recent', {
        url: '/api/recent-articles',
        method: 'GET', dataType: 'json'
    });
});

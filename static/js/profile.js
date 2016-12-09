/* global renderArticles */

$(function(){
    renderArticles('#my-articles', {
        method: 'GET', dataType: 'json',
        url: '/api/get-articles/' + $('#nickname').text()
    });
});

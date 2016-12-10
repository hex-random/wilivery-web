/* global renderArticles */

$(function(){
    renderArticles('#recently-commented-articles', {
        method: 'GET', dataType: 'json',
        url: '/api/recently-commented-articles/'
    });
});

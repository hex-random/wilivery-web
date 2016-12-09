/* global Vue */

$(function(){
    $.ajax({
        url: '/api/recent-articles',
        method: 'GET', dataType: 'json'
    }).done(function(result){
        new Vue({
            el: '#recent',
            data: { articles: result },
            mounted: function(){
                $('.tooltipped').tooltip({ delay: 50 });
                $('.grid').masonry({ itemSelector: '.grid-item' });
            }
        });
    });
});

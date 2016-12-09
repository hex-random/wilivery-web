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
                $('.collapsible').collapsible();
                $('.grid').masonry({ itemSelector: '.grid-item' });
            }
        });
    });
});

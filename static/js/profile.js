/* global Vue */

$(function(){
    $.ajax({
        method: 'GET', dataType: 'json',
        url: '/api/get-articles/' + $('#nickname').text()
    }).done(function(result){
        new Vue({
            el: '#my-articles',
            data: { articles: result },
            mounted: function(){
                $('.tooltipped').tooltip({ delay: 50 });
                $('.grid').masonry({ itemSelector: '.grid-item' });
            }
        });
    });
});

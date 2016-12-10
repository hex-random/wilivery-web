/* global Vue moment */

function renderArticles(element, options){
    $.ajax(options).done(function(result){
        new Vue({
            el: element,
            data: { articles: result },
            mounted: function(){
                $('.modal').modal();
                $('.tooltipped').tooltip({ delay: 50 });
                $('.grid').masonry({ itemSelector: '.grid-item' });
            }
        });
    });
}

$(function(){
    moment.lang('ko');

    $('.parallax').parallax();
    $('.button-collapse').sideNav();
});

if(module) module.exports = renderArticles;

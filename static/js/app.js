/* global Vue moment Autolinker */

var autolinker = new Autolinker({
    stripPrefix: true, newWindow: true,
    email: true, phone: true, mention: false, hashtag: false,
    truncate: { length: 25, location: 'smart' }, className: 'link',
    urls: { schemeMatches: true, wwwMatches: true, tldMatches: true }
});

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

void(autolinker, renderArticles);

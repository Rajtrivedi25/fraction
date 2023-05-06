(function( $ ) {
    "use strict";

    var themesflat_animation_fadeup = function (container, item) {
        $(window).scroll(function () {
            var windowBottom = $(this).scrollTop() + $(this).innerHeight();
            $(container).each(function (index, value) {
                var objectBottom = $(this).offset().top + $(this).outerHeight() * 0.1;
                
                if (objectBottom < windowBottom) { 
                    var seat = $(this).find(item);
                    for (var i = 0; i < seat.length; i++) {
                        (function (index) {
                            setTimeout(function () {
                                seat.eq(index).addClass('tfanimated');
                            }, 300 * index);
                        })(i);
                    }
                }
            });
        }).scroll();
    };
    var themesflat_animation_classes = function () {
        themesflat_animation_fadeup(".wrap-blog-article.blog-list .item", "article");
        themesflat_animation_fadeup(".wrap-blog-article.blog-gird", ".item");
        themesflat_animation_fadeup(".wrap-services-post", ".item");
        themesflat_animation_fadeup(".tf-posts", ".item");
        themesflat_animation_fadeup(".wrap-doctor-post", ".item");
        themesflat_animation_fadeup(".wrap-portfolios-post", ".item");        
        themesflat_animation_fadeup(".tf-animated", ".item-animated");
        themesflat_animation_fadeup("section", ".item-animated");
        themesflat_animation_fadeup(".tf-animated-twocolumn", ".item-animated");
        themesflat_animation_fadeup(".tf-title-section", ".before-heading, .heading, .sub-title");
        themesflat_animation_fadeup(".tf-animated-column-elementor", ".elementor-column");
        themesflat_animation_fadeup(".tf-animated-column-elementor", ".elementor-column");
        themesflat_animation_fadeup(".elementor-widget-tf-button", ".tf-btn");
        themesflat_animation_fadeup(".elementor-widget-tf-counter", ".tf-counter");
    };

    var themesflat_animation_mousemove = function (container, element) {
        $(container).mousemove(function(e){
            var amountMovedX = (e.pageX * 0.1 / 20);
            var amountMovedY = (e.pageY * 0.1 / 20);
            $(this).find(element).css({
              '-webkit-transform' : 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
              '-moz-transform'    : 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
              '-ms-transform'     : 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
              '-o-transform'      : 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
              'transform'         : 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)'
            });
        });
    };
    var themesflat_animation_mousemove_classes = function () {
        themesflat_animation_mousemove(".tf-testimonial-carousel-type-group",".bg-first");
        themesflat_animation_mousemove(".tf-testimonial-carousel-type-group",".bg-last");
    };

    $(function() {
        themesflat_animation_classes();
        themesflat_animation_mousemove_classes();
    });

})(jQuery);
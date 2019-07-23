
/* animation on scroll widget */
$(function() {
    var $animation_elements = $('.animation-element');
    var $window = $(window);

    function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    
    $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
    
        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
        } else {
        $element.removeClass('in-view');
        }
    });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

});

  /*
         * active menu widget for Silex
         * create an element which links to an anchor, e.g. an element with a link to #anchor1
         * add the css class "anchor-link" to this element
         * create an element which is the anchor, e.g. an element with the css class "anchor1"
         * when the user clicks on the link, the scroll slides until the element is visible
         * when the user slides and the element is visible, the link gets a css class "active-menu"
         */
        $(function() {
            // Cache selectors
            var lastId,
            // All list items
            menuItems = $(".anchor-link a");
            $(menuItems[0]).addClass("active-menu");
            // Anchors corresponding to menu items
            // find the name of the elements which are anchors
            var scrollItems = menuItems.map(function(){
                // the names are in the href attribute of the anchor links
                var attr = $(this).attr("data-silex-href") || $(this).attr("href");
                // case of a link in text field or an external link after publish
                $(this).find("[href]").each(function() {
                    attr = $(this).attr("href");
                });
                // case of an "external link" before publish
                $(this).find("[data-silex-href]").each(function() {
                    attr = $(this).attr("href");
                });
                // the links to anchors are expected to start with #
                if(attr && attr.indexOf("#") === 0) {
                    var name = attr.substring(1);
                    var item = $("." + name);
                    // check if there is a hash in the URL to scroll to the anchor at start
                    if(window.location.hash.indexOf(name) === 1) {
                        var offsetTop = item.offset().top;
                        $('html, body').stop().animate({
                            scrollTop: offsetTop - 85
                        }, 300);
                    }
                    // now find the element itself, which has the name as a css class
                    if (item.length) { return {
                            "link": this,
                            "item": item.get(0)
                        };
                    }
                }
            });
            // Bind click handler to menu items
            // so we can get a fancy scroll animation
            scrollItems.each(function() {
                var link = this.link;
                var item = this.item;
                var offsetTop = $(item).offset().top;
                $(link).click(function(e){
                  $('html, body').stop().animate({
                      scrollTop: offsetTop - 85
                  }, 300);
                  e.preventDefault();
                });
            })
            // Bind to scroll
            $(window).scroll(function(){
               // Get container scroll position
               var fromTop = $(this).scrollTop();
               // Get id of current scroll item
               var cur = scrollItems.map(function(){
                 if ($(this.item).offset().top  - 85 <= fromTop)
                   return this;
               });
               // add the css class on the current menu item
               $(".active-menu").removeClass("active-menu");
               if(cur.length > 0) {
                   cur = cur[cur.length-1];
                   $(cur.link).addClass("active-menu");
               }
            });
        });

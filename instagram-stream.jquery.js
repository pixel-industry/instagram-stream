/* 
 * jQuery plugin for creating small widget like Instagram gallery with text.
 * 
 * Author: Pixel Industry
 * Website: http://pixel-industry.com
 * Version: 1.0
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */


(function ($) {
    $.fn.instagramstream = function (options) {
        var defaults = {            
            username: 'pixel-industry',
            limit: 6,
            overlay: true,
            textContainer: '.is-text',
            textPosition: '4'
        };
        var options = $.extend(defaults, options);

        return this.each(function () {
            var object = $(this);
           
            object.append("<ul class=\"instagram-list\"></ul>")
            var access_token = "200718541.a4734ab.cc050fa16d6141bf8b709c97ab158f57";
            var url = "https://api.instagram.com/v1/users/search?q=" + options.username + "&access_token=" + access_token + "&count=1&callback=?";
            $.getJSON(url, function (data) {

                $.each(data.data, function (i, shot) {
                    var instagram_username = shot.username;
                    if (instagram_username == options.username) {
                        var user_id = shot.id;

                        if (user_id != "") {
                            url = "https://api.instagram.com/v1/users/" + user_id + "/media/recent/?access_token=" + access_token + "&count=" + options.limit + "&callback=?";
                            $.getJSON(url, function (data) {
                                $.each(data.data, function (i, shot) {

                                    var photo_src = shot.images.low_resolution.url;
                                    var photo_url = shot.link;

                                    var photo_title = "";
                                    if (shot.caption != null) {
                                        photo_title = shot.caption.text;
                                    }

                                    var photo_container = $('<img/>').attr({
                                        src: photo_src,
                                        alt: photo_title
                                    });
                                    var url_container = $('<a/>').attr({
                                        href: photo_url,
                                        target: '_blank',
                                        title: photo_title
                                    });
                                    var tmp = $(url_container).append(photo_container);
                                    if (options.overlay) {
                                        var overlay_div = $('<div/>').addClass('img-overlay');
                                        $(url_container).append(overlay_div);
                                    }                                    
                                    
                                    // reduce by one because array stars from 0
                                    var textPos = parseInt(options.textPosition) - 1;  
                                    
                                    // add text to stream
                                    // if we are on desired position, add text
                                    if(i == textPos){
                                        
                                        // check if text is jQuery object
                                        if(jQuery.type(options.textContainer) == 'object'){                                     

                                            var text_li = $('<li/>').attr({
                                                class: 'is-text'
                                            })
                                            .append(options.textContainer.html());
                                            $("ul", object).append(text_li);

                                            // remove original element
                                            options.textContainer.remove();

                                            // otherwise check if user passed selector
                                        } else if(jQuery.type(options.textContainer) == 'string'){

                                            // find element in DOM
                                            var textHtml = jQuery(options.textContainer);                                            

                                            // append HTML if it exists
                                            if(typeof(textHtml) != 'undefined'){
                                                var text_li = $('<li/>').attr({
                                                    class: 'is-text'
                                                }).append(textHtml.html());
                                                $("ul", object).append(text_li);

                                                // remove original element
                                                textHtml.remove();
                                            }                                                
                                        }
                                    }
                                    
                                    var li = $('<li/>').append(tmp);
                                    $("ul", object).append(li);

                                });
                            });
                        }
                    }
                });
            });
                   
        });
    };
})(jQuery);
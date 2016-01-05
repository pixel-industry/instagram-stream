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
            username: 'pixel_industry', // Instagram username
            limit: 10, // how many photos to show
            overlay: true, // add overlay div
            textContainer: '.is-text', // selector or jQuery object of div with text
            textPosition: '4', // position of text in grid of photos
            textSize: '1', // size of text e.g. 1 - has size like one image; 2 - has size of two images etc.
            imageQuality: 'standard' // standard | low | thumbnail; standard: 640 x 640px; low: 320 x 320px; thumbnail: 150 x 150px
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

                                    // image quality
                                    if (options.imageQuality == 'standard') {

                                        var imgQuality = 'standard_resolution';
                                    } else if (options.imageQuality == 'low') {

                                        var imgQuality = 'low_resolution';
                                    } else if (options.imageQuality == 'thumbnail') {

                                        var imgQuality = 'thumbnail';
                                    }

                                    var photo_src = shot.images[imgQuality].url;
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

                                    var $container = $('.instagram-list');

                                    // image size
                                    var textSizeWidth = ($container.width() / 8) * options.textSize;
                                    var textSizeHeight = ($container.width() / 8);

                                    // add text to stream
                                    // if we are on desired position, add text
                                    if (i == textPos) {

                                        // check if text is jQuery object
                                        if (jQuery.type(options.textContainer) == 'object') {

                                            var text_li = $('<li/>')
                                                    .attr({
                                                        class: 'is-text'
                                                    })
                                                    .append(options.textContainer.html());

                                            $("ul", object).append(text_li);

                                            // remove original element
                                            options.textContainer.remove();

                                            // otherwise check if user passed selector
                                        } else if (jQuery.type(options.textContainer) == 'string') {

                                            // find element in DOM
                                            var textHtml = jQuery(options.textContainer);

                                            // append HTML if it exists
                                            if (typeof (textHtml) != 'undefined') {
                                                var text_li = $('<li/>')
                                                        .attr({
                                                            class: 'is-text'
                                                        })
                                                        .append(textHtml.html());

                                                $("ul", object).append(text_li);

                                                // remove original element
                                                textHtml.remove();
                                            }
                                        }
                                    }

                                    var li = $('<li/>').append(tmp);
                                    $("ul", object).append(li);

                                });

                                // calculate image and text size
                                onResize();
                            });
                        }
                    }
                });

            });

            /**
             * Resize event
             */
            $(window).resize(function () {
                onResize();
            });

            /**
             * Change image size on screen resize
             * 
             * @returns void
             */
            function onResize() {

                var windowWidth = $(window).width();

                // container
                var $container = $('.instagram-list');

                // loop through each gallery
                $container.each(function () {

                    var $this = $(this);

                    // image size
                    if (windowWidth < 320) {

                        var imageSize = $this.outerWidth();

                        if (options.textSize > 1) {
                            var textSizeWidth = (imageSize);
                            var textSizeHeight = (imageSize);
                        }

                        // smartphones
                    } else if (windowWidth > 320 && windowWidth < 479) {

                        var imageSize = $this.outerWidth();

                        if (options.textSize > 1) {
                            var textSizeWidth = (imageSize);
                            var textSizeHeight = (imageSize);
                        }

                        // smartphones and tables
                    } else if (windowWidth > 480 && windowWidth < 767) {

                        var imageSize = $this.outerWidth() / 2;

                        if (options.textSize >= 2) {
                            var textSizeWidth = imageSize;
                            var textSizeHeight = imageSize;
                        }

                        // tablets
                    } else if (windowWidth > 768 && windowWidth < 991) {

                        var imageSize = $this.outerWidth() / 4;

                        if (options.textSize >= 2) {
                            var textSizeWidth = imageSize * 2;
                            var textSizeHeight = imageSize;
                        }

                        // smaller screen desktops
                    } else if (windowWidth > 992 && windowWidth < 1199) {
                        var imageSize = $this.outerWidth() / 6;

                        if (options.textSize >= 3) {
                            var textSizeWidth = ($this.width() / 6) * 3;
                            var textSizeHeight = ($this.width() / 6);
                        } else if (options.textSize == 2) {
                            var textSizeWidth = ($this.width() / 6) * 2;
                            var textSizeHeight = ($this.width() / 6);
                        }

                        // large screen desktops
                    } else if (windowWidth > 1200) {


                        var imageSize = $this.width() / 8;

                        var textSizeWidth = ($this.width() / 8) * options.textSize;
                        var textSizeHeight = ($this.width() / 8);
                    }

                    // change image width and height
                    object.find('li:not(.is-text)').width(imageSize).height(imageSize);

                    // change text width and height
                    object.find('li.is-text').outerWidth(textSizeWidth).outerHeight(textSizeHeight);
                });

            }

        });
    };
})(jQuery);
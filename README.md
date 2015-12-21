Instagram Stream jQuery Plugin
=================================

jQuery plugin that displays latest images from instagram with addition to text that can be added inside of gallery.

<p>Author: Pixel Industry<br />
Website - pixel-industry.com<br />
Licence - MIT</p>

<h3>Description</h3>
<p>
jQuery plugin that displays latest images from instagram with addition to text that can be added inside of gallery.
                        You can use it on multiple places across your website. Only thing you
                        need is the username of the account from which you want images
                        to be shown.
</p>

<h3>Instalation</h3>
<p>This plugin needs only two js files to work. You must include them at the bottom of the body in your HTML document. These are:</p>
<ul>
<li>jQuery library</li>
<li>instagram-stream.jquery.js file which is included in the download package.</li>
</ul>

<h5>HTML Structure & jQuery code for Deviantart Feed</h5>

<pre>
<code>
&#60;article class="instagram-stream"&#62;
&#60;div class="is-text"&#62;
    &#60;h1&#62;Some heading&#60;/h1&#62;
    &#60;p&#62;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget nulla bibendum, ullamcorper sem auctor, vulputate tortor. Ut vitae metus odio. &#60;/p&#62;
&#60;/div&#62;
&#60;/article&#62;
</code>
</pre>

<p>Now enter this js code inside "script" tags at the bottom of the body in your HTML document:</p>
<pre>
<code>

// defaults
jQuery('.instagram-stream').instagramstream({
    limit: 10, // number of images to fetch
    username: 'pixel_industry', // your username
    overlay: true, // add overlay layer of hover effect
    textContainer: '.is-text', // default: '.is-text', pass jQuery object or selector
    textPosition: '3' // place that at this position
});
</code>
</pre>

<h3>CSS Styling</h3>
<p> When plugin loads, it makes one unordered list. Inside of it,
                                every image is one list item. To style it, simply refer to for example ".social-feed.flickr-feed li" in your css file and edit it the way 
                                you like. We also included demo with simple html and css styling for easier plugin understanding.</p>

<h3>Change Log</h3>
<p>v1.0</p>





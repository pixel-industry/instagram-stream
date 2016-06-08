Instagram Stream jQuery Plugin
=================================

jQuery plugin that displays latest images from Instagram with addition to text that can be added inside of gallery.

<p>Author: Pixel Industry<br />
Website - pixel-industry.com<br />
Licence - MIT</p>

<h3>Description</h3>
<p>
jQuery plugin that displays latest images from Instagram with addition to text that can be added inside of gallery.
You can use it on multiple places across your website. 
<del>Only thing you need is the username of the account from which you want images to be shown. </del>
Plugin now requires access token to fetch images from your account along with Instagram username.
</p>

<h3>Installation</h3>
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
    textPosition: '4', // place that at this position
    textSize: '1', // size of text e.g. 1 - has size like one image; 2 - has size of two images etc.
    imageQuality: 'standard', // standard | low | thumbnail; standard: 640 x 640px; low: 320 x 320px; thumbnail: 150 x 150px
    accessToken: '' // your access token
});
</code>
</pre>

<h3>Notes</h3>
<ul>
<li>Recent API and Terms changes allows fetching images only from your own account.</li>
<li>Access Token is now required to fetch images from Instagram account. Guide for generating access token can be found <a href="http://jelled.com/instagram/access-token">here</a>.</li>
</ul>

<h3>CSS Styling</h3>
<p> When plugin loads, it makes one unordered list. Inside of it, every image is one list item. To style it, simply refer to for example .instagram-stream li in your css file and edit it the way you like. We also included demo with simple html and css styling for easier plugin understanding.</p>

<h3>Change Log</h3>
<p>v1.0.3</p>
<ul>
<li>Fixed issues with recent API and terms changes.</li>
</ul>
<p>v1.0.2</p>
<ul>
<li>New parameters: "textSize" and "imageQuality" introduced.</li>
</ul>
<p>v1.0.1</p>
<ul>
<li>Image and text size issues fixed.</li>
</ul>
<p>v1.0</p>
<ul>
<li>Initial release</li>
</ul>





/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 jQuery.cookie = function (key, value, options) {
 
     // key and at least value given, set cookie...
     if (arguments.length > 1 && String(value) !== "[object Object]") {
         options = jQuery.extend({}, options);
 
         if (value === null || value === undefined) {
             options.expires = -1;
         }
 
         if (typeof options.expires === 'number') {
             var days = options.expires, t = options.expires = new Date();
             t.setDate(t.getDate() + days);
         }
 
         value = String(value);
 
         return (document.cookie = [
             encodeURIComponent(key), '=',
             options.raw ? value : encodeURIComponent(value),
             options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
             options.path ? '; path=' + options.path : '',
             options.domain ? '; domain=' + options.domain : '',
             options.secure ? '; secure' : ''
         ].join(''));
     }
 
     // key and possibly options given, get cookie...
     options = value || {};
     var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
     return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
 };
 
 
 
 // currently UNUSED
 /* http://github.com/shuber/jquery-favicons */
 jQuery.fn.favicons = function(config) {
   var config = jQuery.extend({
     apply: function(element, url) { element.addClass(config.class_name).css('background-image', 'url(' + url + ')'); },
     class_name: 'favicon',
     missing_url: null,
     url: function(domain) { return 'http://www.google.com/s2/favicons?domain=' + domain; }
   }, config);
 
   return this.each(function() {
     var element = jQuery(this);
 
     var matches = element.attr('href').match(/^\w+:\/\/([^\/]+).*/);
     var domain = matches && matches.length ? matches.pop() : document.domain;
 
     var url = config.url(domain);
     var missing_url = config.missing_url;
     if (typeof missing_url == 'function') missing_url = missing_url(domain);
 
     var favicon = new Image();
     favicon.onload = function() { config.apply(element, url); };
     if (missing_url) favicon.onerror = function() { config.apply(element, missing_url); };
 
     favicon.src = url;
   });
 }
//= require jquery-2.1.0.min
//= require bootstrap

$(function(){
  var cname = function(name) {
    return name.replace(/[ \/<>]/g, '-').toLowerCase();
  }

  $('#documentation_body').children(":header:not(h1):not(h2.title)").each(function(i) {
    var current = $(this);
    var text = current.text();
    var id = cname(text);
    current.wrap('<a href=\"#' + encodeURIComponent(id) + '\"></a>')
  });
});

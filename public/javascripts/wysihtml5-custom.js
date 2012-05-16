/*
 * Beware! Rough coding ahead.
 */
$(function(){
  $('a[data-wysihtml5-command="viewSource"]').toggle(
    function(){
      $('.wysihtml5-sandbox').hide();
      $('#wysihtml5-textarea-1').show();
    },
    function(){
      $('.wysihtml5-sandbox').show();
      $('#wysihtml5-textarea-1').hide();
    }
  );

  $('div[data-wysihtml5-dialog="insertImage"] img').bind('click', function(){
    var $parent = $(this).parent();
    $parent.find('.url').val($(this).data('src'));
  });
  
});
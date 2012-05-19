(function($){
  
  var self = {};
  
  var buttons = {
    
    'font-styles' : '<div class="wysihtml5-button-group"> \
                      <a class="wysihtml5-button" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="p">paragraph</a> \
                      <a class="wysihtml5-button" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h2">heading 2</a> \
                      <a class="wysihtml5-button" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h3">heading 3</a> \
                      <a class="wysihtml5-button" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h4">heading 4</a> \
                    </div>',
                    
    'emphasis'    : '<div class="wysihtml5-button-group"> \
                      <a class="wysihtml5-button" data-wysihtml5-command="bold">bold</a> \
                      <a class="wysihtml5-button" data-wysihtml5-command="italic">italic</a> \
                      <a class="wysihtml5-button" data-wysihtml5-command="underline">underline</a> \
                    </div>',
                
    'lists'       : '<div class="wysihtml5-button-group"> \
                      <a class="wysihtml5-button" data-wysihtml5-command="insertOrderedList">insert ordered list</a> \
                      <a class="wysihtml5-button" data-wysihtml5-command="insertUnOrderedList">insert unordered list</a> \
                      <a class="wysihtml5-button" data-wysihtml5-command="outdent">outdent</a> \
                      <a class="wysihtml5-button" data-wysihtml5-command="indent">indent</a> \
                    </div>',
                    
    'tables'      : '<a class="wysihtml5-button" data-wysihtml5-command="insertHTML" data-wysihtml5-command-value="<table border=\'1\' contenteditable><thead><tr><th>Thead1</th><th>Thead2</th><th>Thead3</th></tr></thead><tfoot><tr><td>Tfoot1</td><td>Tfoot2</td><td>Tfoot3</td></tr></tfoot><tbody><tr><td>Row1 Col1</td><td>Row1 Col2</td><td>Row1 Col3</td></tr><tr><td>Row2 Col1</td><td>Row2 Col2</td><td>Row3 Col3</td></tr></tbody></table>">insert table</a>',
    
    
  };
  
  var toolbars = {
    
    'minimal' : buttons['emphasis'],
    'basic'   : buttons['font-styles'] + buttons['emphasis'] + buttons['lists'],
    'full'    : buttons['font-styles'] + buttons['emphasis'] + buttons['lists'] + buttons['tables']
    
  };
  
  
  /*
   * Create toolbar by predefined toolbars
   * this     = <textarea>
   * options  = wysihtml5 options
   */
  self.createToolbar = function(options){
    var $toolbar  = $('<div class="wysihtml5-toolbar"></div>')
    ,   $this     = $(this)
    ;
    
    $toolbar
      .append(toolbars[options.toolbar])
      .attr('id', $this.attr('id') + '-toolbar')
      .insertBefore($this);
    
    options.toolbar = $toolbar.attr('id');
    
    return options;
  };
  
  
  /*
   * jQuery function for wysihtml5 editor
   * options = wysihtml5 options
   */
  $.fn.wysihtml5 = function(options){
    
    this.each(function(){
      var $this = $(this);
      
      $.when(self.createToolbar.call(this, options))
       .then(function(options){
         $this.data('wysihtml5', new wysihtml5.Editor($this.attr('id'), options));
       });
      
      //var onLoad = function(){
      //  console.log("Loaded");
      //};
      //
      //var onChange = function(){
      //  console.log(this);
      //};
      //
      //$this.data('wysihtml5').on('load', onLoad);
      //$this.data('wysihtml5').on('change', onChange);
      
    });
    
    return this;
  };
  
}(jQuery));
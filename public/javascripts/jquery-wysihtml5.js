(function($){
  
  var self = {};
  
  /*
   * Create toolbar
   * Gets html page named as options.toolbar
   * this     = <textarea>
   * options  = wysihtml5 options
   */
  self.createToolbar = function(options){
    var dfd     = $.Deferred()
    ,   $this   = $(this)
    ,   toolbar = options.toolbar
    ,   xhr
    ;
    
    xhr = $.get(toolbar + '.html', function(data){
      $toolbar = $(data);
      
      // Add unique ID
      $toolbar.attr('id', $toolbar.attr('id') + $('.wysihtml5-toolbar').length);
      
      // Pass new id for our wysihtml5 constructor
      options.toolbar = $toolbar.attr('id');
      
      // Insert toolbar before textarea
      $toolbar.insertBefore($this);
      
      dfd.resolve(options);
    });
    
    xhr.fail(function(){
      console.warn("wysihtml5 toolbar file not found.");
    });
    
    return dfd.promise();
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
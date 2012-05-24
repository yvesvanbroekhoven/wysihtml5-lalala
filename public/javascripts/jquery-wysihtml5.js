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
                    
    'tables'      : '<a class="wysihtml5-button" data-wysihtml5-command="insertHTML" data-wysihtml5-command-value="<table border=\'1\'><thead><th>TH</th></thead><tbody><td>TD</td></tbody></table>">insert table</a>',
    
    'link'        : '<a class="wysihtml5-button" data-wysihtml5-command="insertLink">create link</a> \
                     <div class="wysihtml5-modal wysihtml5-insert-link-modal"> \
                       <div class="wysihtml5-modal-header"> \
                        Insert link \
                       </div> \
                       <div class="wysihtml5-modal-body"> \
                         <div> \
                            <label for="wysihtml5-modal-link-text">Text to display:</label> \
                            <input type="text" id="wysihtml5-modal-link-text" data-initial-value="" /> \
                          </div> \
                         <div> \
                           <label for="wysihtml5-modal-url">Link to:</label> \
                           <input type="url" id="wysihtml5-modal-url" data-initial-value="http://" /> \
                         </div> \
                       </div> \
                       <div class="wysihtml5-modal-footer"> \
                         <a class="wysihtml5-modal-cancel">Cancel</a> \
                         <a class="wysihtml5-modal-confirm">Insert link</a> \
                       </div> \
                     </div>',
                    
   'image'        : '<a class="wysihtml5-button" data-wysihtml5-command="addImage">insert image</a> \
                     <div class="wysihtml5-modal wysihtml5-add-image-modal"> \
                       <div class="wysihtml5-modal-header"> \
                        Insert image \
                       </div> \
                       <div class="wysihtml5-modal-body"></div> \
                       <div class="wysihtml5-modal-footer"> \
                         <a class="wysihtml5-modal-cancel">Cancel</a> \
                       </div> \
                     </div>',
    
  };
  
  var toolbars = {
    
    'minimal' : buttons['emphasis'],
    'basic'   : buttons['font-styles'] + buttons['emphasis'] + buttons['lists'],
    'full'    : buttons['font-styles'] + buttons['emphasis'] + buttons['lists'] + buttons['link'] + buttons['image'] + buttons['tables']
    
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
   * this     = <textarea>
   * options  = wysihtml5 options
   */
  self.initInsertLink = function(options){
    var $this        = $(this)
    ,   $insert_link = $('#' + options.toolbar).find('a[data-wysihtml5-command="insertLink"]')
    ,   $modal       = $insert_link.siblings('.wysihtml5-insert-link-modal')
    ,   $insert_btn  = $modal.find('.wysihtml5-modal-confirm')
    ,   $cancel_btn  = $modal.find('.wysihtml5-modal-cancel')
    ,   $url_field   = $modal.find('#wysihtml5-modal-url')
    ;
    
    $insert_link.bind('click', function(){
      $url_field.val($url_field.data('initial-value'));
      $modal.show();
      $url_field.focus();
    });
    
    $insert_btn.bind('click', function(){
      $modal.hide();
      $this.data('wysihtml5').composer.commands.exec('createLink', {
        href: $url_field.val(),
        target: '',
        rel: ''
      });
    });
    
    $cancel_btn.bind('click', function(){
      $modal.hide();
      $this.data('wysihtml5').currentView.element.focus();
    });
    
  };
  
  
  self.initInsertImage = function(options){
    var $this         = $(this)
    ,   $insert_image = $('#' + options.toolbar).find('a[data-wysihtml5-command="addImage"]')
    ,   $modal        = $insert_image.siblings('.wysihtml5-add-image-modal')
    ,   $modal_body   = $modal.find('.wysihtml5-modal-body')
    ,   $cancel_btn   = $modal.find('.wysihtml5-modal-cancel')
    ,   images_url    = 'images.html' // Needs to be an option
    ;
    
    $.when($.get(images_url))
     .then(function(data){
       $modal_body.append(data);
       
       $modal.find('img').bind('click', function(){
         $modal.hide();
         $this.data('wysihtml5').composer.commands.exec("insertImage", { src: $(this).data('src'), alt: '' });
       });
     });
     
    $insert_image.bind('click', function(){
      $modal.show();
    });
    
    

    //$insert_btn.bind('click', function(){
    //  $modal.hide();
    //  $this.data('wysihtml5').composer.commands.exec('createLink', {
    //    href: $url_field.val(),
    //    target: '',
    //    rel: ''
    //  });
    //});

    $cancel_btn.bind('click', function(){
      $modal.hide();
      $this.data('wysihtml5').currentView.element.focus();
    });
    
  };
  
  
  /*
   * jQuery function for wysihtml5 editor
   * options = wysihtml5 options
   */
  $.fn.wysihtml5 = function(options){
    
    this.each(function(){
      var _this = this
      ,   $this = $(_this);
      
      $.when(self.createToolbar.call(this, options))
       .then(function(options){
         $this.data('wysihtml5', new wysihtml5.Editor($this.attr('id'), options));
         self.initInsertLink.call(_this, options);
         self.initInsertImage.call(_this, options);
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
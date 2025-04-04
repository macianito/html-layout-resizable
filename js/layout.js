/**
 * @file Dynamically Create HTML Layout of two resizable divs
 * @see [Example]{@link http://example.com}
 * @author Mazius <ivanmaciagalan@gmail.com>
 * @see [GITHUB project]{@link https://github.com/macianito/html-js-table-and-pagination/}
 * @version 0.1
 */

// ssh://macianito@github.com/macianito/html-js-table-and-pagination.git

// http://usejsdoc.org/  Documentacio de javascript
// https://milmazz.uno/article/2014/08/27/how-to-document-your-javascript-code/


/** @global */
this.Layout = (function($) {

  function Layout(id, options) {

    var options = options || {},
        type = options.type || 'horizontal';

    this.padding = options.padding || 0,
    this.positionMouseDown = null,
    this.handlerRelativePosition = null,
    this.wrapper = jQuery('#' + id),
    this.wrapperBox = null,

    this.type = type,
    this.horizontal = (type == 'horizontal');


    _storeWindowDimensions.call(this);


    var self = this;


    /*
     * cas que es s'ha de crear el layout
     * contentsLayout  sera un objecte on hi haura referencies als objectes que es recolocaran dins el layout
     *
     */

    if(options.contentsLayout) {

      this.wrapper.addClass('wrapper-layout');

      if(this.horizontal)
        this.wrapper.html('<div class="left"></div><div class="handler-horizontal"></div><div class="right"></div>');
      else
        this.wrapper.html('<div class="top"></div><div class="handler-vertical"></div><div class="bottom"></div>');

    }

    if(this.horizontal) {


      this.handlerLayout = this.wrapper.find('.handler-horizontal');
      this.layoutLeft    = this.wrapper.find('.left');
      this.layoutRight   = this.wrapper.find('.right');

      if(options.contentsLayout) {
        this.layoutLeft.append(options.contentsLayout.left);
        this.layoutRight.append(options.contentsLayout.right);
      }

      _setEventsHorizontal.call(this, id);

    } else {

      this.handlerLayout = this.wrapper.find('.handler-vertical');
      this.layoutTop     = this.wrapper.find('.top');
      this.layoutBottom  = this.wrapper.find('.bottom');

      if(options.contentsLayout) {
        this.layoutTop.append(options.contentsLayout.top);
        this.layoutBottom.append(options.contentsLayout.bottom);
      }

      _setEventsVertical.call(this, id);

    }

    _setDimensionValues.call(this);

    this.wrapper.css('visibility', 'visible');

    // react when window resize
    jQuery(window).resize(function() {
       _setDimensionValues.call(self);
    });

  }

  return Layout;


  /**
   * Set dimensions and positions of the elements
   *
   * @private
   *
   */

  function _storeWindowDimensions() {

    this.wrapperWidth  = this.wrapper.width();
    this.wrapperHeight = this.wrapper.height();

  };

  /**
   * Set dimensions and positions of the elements
   *
   * @private
   *
   */

  function _setDimensionValues() {

    this.wrapperBox = _getBoxElement(this.wrapper[0]);


    if(this.horizontal) {

      _setNewValuesHorizontal.call(this,
        Utils.getPercentage(_getBoxElement(this.layoutLeft[0]).width, this.wrapperBox.width)
      );

    } else {

      _setNewValuesVertical.call(this,
        Utils.getPercentage(_getBoxElement(this.layoutTop[0]).height, this.wrapperBox.height)
      );

    }

  };

  /**
   * Get Box element
   *
   * @private
   *
   */

  function _getBoxElement(element) {

    var boxElement = Utils.getBoxElement(element);

    return boxElement;

  };


  /**
   * Setup events of the horizontal Layout
   *
   * @private
   *
   */

  function _setEventsHorizontal(id) {

    var self = this;

    jQuery('#' + id + ' .handler-horizontal').on('mousedown', function(evt) {

      evt.preventDefault();

      self.wrapperBox = _getBoxElement(self.wrapper[0]);

      self.positionMouseDown = Utils.getAbsoluteMousePosition(evt);
      self.handlerRelativePosition = Utils.getPositionRelativeToParent(self.handlerLayout[0]).x;

    });

    jQuery(document).on('mousemove', function(evt) {

      if(self.positionMouseDown == null) return;

      var positionMouseMove = Utils.getAbsoluteMousePosition(evt),
          horizontalMovement = positionMouseMove.x - self.positionMouseDown.x,
          posHandler = self.handlerRelativePosition + horizontalMovement;

      if(posHandler < self.padding) {
        posHandler = self.padding;
      } else if(posHandler >= self.wrapperBox.width - self.padding) {
        posHandler = self.wrapperBox.width - self.padding;
      }

      var percent = Utils.getPercentage(posHandler, self.wrapperBox.width);

      _setNewValuesHorizontal.call(self, percent);


    }).on('mouseup mouseleave', function(evt) {

      self.positionMouseDown = null;

    });


  };

  /**
   * Setup events of the vertical Layout
   *
   * @private
   *
   */

  function _setEventsVertical(id) {

    var self = this;

    jQuery('#' + id + ' .handler-vertical').on('mousedown', function(evt) {

      evt.preventDefault();

      self.wrapperBox = _getBoxElement(self.wrapper[0]);

      self.positionMouseDown = Utils.getAbsoluteMousePosition(evt);
      self.handlerRelativePosition = Utils.getPositionRelativeToParent(self.handlerLayout[0]).y;

    }),

    jQuery(document).on('mousemove', function(evt) {

      if(self.positionMouseDown == null) return;

      var positionMouseMove = Utils.getAbsoluteMousePosition(evt),
          verticalMovement = positionMouseMove.y - self.positionMouseDown.y,
          posHandler = self.handlerRelativePosition + verticalMovement;

      if(posHandler < self.padding) {
        posHandler = self.padding;
      } else if(posHandler > self.wrapperBox.height - self.padding) {
        posHandler = self.wrapperBox.height - self.padding;
      }

      var percent = Utils.getPercentage(posHandler, self.wrapperBox.height);


      //console.log(leftPercent, rightPercent)

      _setNewValuesVertical.call(self,percent);

    }).on('mouseup mouseleave', function(evt) {

      self.positionMouseDown = null;

    });

  };


  /**
   * Change zone dimensions of horizontal Layout
   *
   * @private
   *
   * @param   {number}  left         left side width
   * @param   {number}  right        right side width
   * @param   {Object}  handlerLeft  position of bar handler
   *
   */

  function _setNewValuesHorizontal(left) {
    this.layoutLeft.css('width', left + '%'),
    this.layoutRight.css('width', (100 - left) + '%');

    //this.handlerLayout.css('left', left + '%');
    this.handlerLayout.css('left', (this.layoutLeft.width() + parseInt(this.wrapper.css('padding-left').replace('px', ''))) + 'px');

  };

  /**
   * Change zone dimensions of vertical Layout
   *
   * @private
   *
   * @param   {number}  top          top height
   * @param   {number}  right        bottom height
   * @param   {Object}  handlerTop   position of bar handler
   *
   */

  function _setNewValuesVertical(top) {
    this.layoutTop.css('height', top + '%'),
    this.layoutBottom.css('height', (100 - top) + '%');
    //this.handlerLayout.css('top', top + '%');
    this.handlerLayout.css('top', (this.layoutTop.height() + parseInt(this.wrapper.css('padding-top').replace('px', ''))) + 'px');

  };


})(jQuery); // Fi Layout


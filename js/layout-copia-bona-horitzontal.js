  function Layout(id, options) {

    var options = options || {},
        padding = options.padding || 0,
        type = options.type || 'horizontal',


        positionMouseDown = null,
        handlerPositionMouseDown = null,
        wrapper = jQuery('#' + id),
        wrapperBox = Utils.getBoxElement(wrapper[0]),
        horizontal = (type == 'horizontal');


    this.handlerLayout = wrapper.find('.handler-horizontal')
    this.layoutLeft = wrapper.find('.left'),
    this.layoutRight = wrapper.find('.right');

    var self = this;


    this.setNewValuesHorizontal(
      Utils.getPercentage(this.layoutLeft.width(), wrapperBox.width),
      Utils.getPercentage(this.layoutRight.width(), wrapperBox.width),
      Utils.getBoxElement(this.layoutLeft[0]).right - 14
    );

    // CONVERTIR COORDENADES CAIXES % A VALOR ABSOLUT


    jQuery('#' + id + ' .handler-horizontal').on('mousedown', function(evt) {

      evt.preventDefault();

      positionMouseDown = Utils.getAbsoluteMousePosition(evt);
      handlerPositionMouseDown = Utils.getBoxElement(self.handlerLayout[0]).left;

    }),

    jQuery(document).on('mousemove', function(evt) {

      if(positionMouseDown !== null) {

        var positionMouseMove = Utils.getAbsoluteMousePosition(evt),
            horizontalMovement = positionMouseMove.x - positionMouseDown.x;

        var leftHandler = handlerPositionMouseDown + horizontalMovement;

        if(leftHandler < padding) {
          leftHandler = padding;
        } else if(leftHandler > wrapperBox.width - padding) {
          leftHandler = wrapperBox.width - padding;
        }

        var percent = Utils.getPercentage(leftHandler, wrapperBox.width);

        var leftPercent = percent,
            rightPercent = 100 - leftPercent;

        //console.log(leftPercent, rightPercent)

        self.setNewValuesHorizontal(leftPercent, rightPercent, leftHandler);

      }

    }).on('mouseup mouseleave', function(evt) {

      positionMouseDown = null;

    });


  }


  Layout.prototype.setNewValuesHorizontal = function(left, right, handlerLeft) {
      this.layoutLeft.css('width', left + '%'),
      this.layoutRight.css('width', right + '%');
      handlerLeft && this.handlerLayout.css('left', (handlerLeft - 8) + 'px');
  }

  Layout.prototype.setNewValuesVertical = function(top, bottom, handlerTop) {
      this.layoutLeft.css('height', top + '%'),
      this.layoutRight.css('height', bottom + '%');
      handlerTop && this.handlerLayout.css('top', (handlerTop - 8) + 'px');
  }

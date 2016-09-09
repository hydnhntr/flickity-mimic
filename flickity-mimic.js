/*!
 * Flickity mimic v1.0.0
 * enable mimicry for Flickity
 */

/*jshint browser: true, undef: true, unused: true, strict: true*/

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'flickity/js/index',
      'fizzy-ui-utils/utils'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( Flickity, utils ) {

'use strict';

// -------------------------- mimic prototype -------------------------- //

Flickity.defaults.mimic = {
  indexOffset: 0
};

Flickity.createMethods.push('_mimic');

var proto = Flickity.prototype;

proto._mimic = function() {
  this.on( 'activate', this.activateMimic );
  this.on( 'destroy', this.destroyMimic );

  var mimicOption = this.options.mimic;
  // Bail out if no mimic target or we’ve enabled groupCells
  if (!mimicOption.target || this.options.groupCells) {
    return;
  }
  // HACK do async, give time for other flickity to be initalized
  var _this = this;
  setTimeout( function initCompanion() {
    _this.setCompanion( mimicOption.target );
  });
};

proto.setCompanion = function( elem ) {
  elem = utils.getQueryElement( elem );
  var companion = Flickity.data( elem );

  // stop if no companion or companion is self, same number of items and not set to groupCells
  if ( !companion || companion == this || companion.cells.length !== this.cells.length || companion.options.groupCells) {
    return;
  }

  this.companion = companion;
  // companion select
  var _this = this;
  this.onCompanionSelect = function() {
    _this.companionSelect();
  };
  companion.on( 'select', this.onCompanionSelect );

  // companion scroll
  this.onCompanionScroll = function() {
    // pass through event arguments
    _this.companionScroll.apply(_this, arguments);
  };
  companion.on( 'scroll', this.onCompanionScroll );

  // first run
  this.companionSelect( true );
};

proto.companionSelect = function( isInstant ) {
  if ( !this.companion ) {
    return;
  }

  var cellCount = this.companion.cells.length;
  var companionIndex = this.companion.selectedIndex;
  var localIndex = companionIndex + this.options.mimic.indexOffset;

  if ( localIndex < 0 ) {
    localIndex = localIndex + cellCount;
  } else if ( localIndex > cellCount - 1 ) {
    localIndex = cellCount - localIndex;
  }

  this.selectCell( localIndex, false, isInstant );
};

proto.companionScroll = function( progress, positionX ) {
  var companionCellPercentMoved = ( this.companion.selectedCell.target - ( positionX + this.companion.cursorPosition ) ) / this.companion.size.innerWidth * 100;
  this.x = -this.selectedCell.target + ( this.size.innerWidth / 100 * companionCellPercentMoved );

  // If we catch the companion drag while we’re settling we want to reset any physics
  this.isAnimating = false;
  this.velocity = 0;
  this.positionSlider();
};

proto.activateMimic = function() {
   this.companionSelect( true );
};

proto.destroyMimic = function() {
  if ( !this.companion ) {
    return;
  }
  this.companion.off( 'select', this.onCompanionSelect );
  this.companion.off( 'scroll', this.onCompanionScroll );
  delete this.companion;
};

// -----  ----- //

return Flickity;

}));

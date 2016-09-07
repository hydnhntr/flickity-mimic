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
  this.on( 'deactivate', this.deactivateMimic );
  this.on( 'destroy', this.destroyMimic );

  var mimicOption = this.options.mimic;
  // Bail out if no mimic target or we’ve enabled groupCells
  if (!mimicOption.target || this.options.groupCells) {
    return;
  }
  // HACK do async, give time for other flickity to be initalized
  var _this = this;
  setTimeout( function initNavCompanion() {
    _this.setNavCompanion( mimicOption.target );
  });
};

proto.setNavCompanion = function( elem ) {
  elem = utils.getQueryElement( elem );
  var companion = Flickity.data( elem );

  // stop if no companion or companion is self, same number of items and not set to groupCells
  if ( !companion || companion == this || companion.options.groupCells) {
    return;
  }

  this.navCompanion = companion;
  // companion select
  var _this = this;
  this.onNavCompanionSelect = function() {
    _this.navCompanionSelect();
  };
  companion.on( 'select', this.onNavCompanionSelect );

  // first run
  this.navCompanionSelect( true );
};

proto.navCompanionSelect = function( isInstant ) {
  if ( !this.navCompanion ) {
    return;
  }

  var selectedCell = this.navCompanion.selectedCells[0];
  var selectedCellIndex = this.navCompanion.cells.indexOf( selectedCell );

  this.selectCell( selectedCellIndex + this.options.mimic.indexOffset , false, isInstant );
};

proto.activateMimic = function() {
  this.navCompanionSelect( true );
};

proto.deactivateMimic = function() {
};

proto.destroyMimic = function() {
  if ( !this.navCompanion ) {
    return;
  }
  delete this.navCompanion;
};

// -----  ----- //

return Flickity;

}));

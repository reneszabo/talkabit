(function() {
  'use strict';

  angular
    .module('4pixelsTalkabit')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

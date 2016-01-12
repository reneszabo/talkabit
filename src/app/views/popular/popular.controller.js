(function () {
  'use strict';

  angular
          .module('4pixelsTalkabit')
          .controller('PopularController', PopularController);

  /** @ngInject */
  function PopularController($log) {
    var vm = this;
    
    vm.hello = "HEY";
    vm.items = [1, 2, 3, 4];
    vm.$log = $log;
    $log.debug(vm)
  }
})();

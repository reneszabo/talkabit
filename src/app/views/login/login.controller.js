(function () {
  'use strict';

  angular
          .module('4pixelsTalkabit')
          .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($log, fourPixelsApi) {
    var vm = this;

    fourPixelsApi.getConnectGoogle().then(function (data) {
      $log.info("GOOGLE CONNECT");
      $log.debug(data);
    });
  }
})();

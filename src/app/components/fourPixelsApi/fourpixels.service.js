(function () {
  'use strict';

  angular
          .module('4pixelsTalkabit')
          .factory('fourPixelsApi', fourPixelsApi);

  /** @ngInject */
  function fourPixelsApi($log, $http) {
    var apiHost = 'https://4pixels.co/api';

    var service = {
      apiHost: apiHost,
      getVideoAudioMergeForm: getVideoAudioMergeForm,
      postVideoAudioMergeForm: postVideoAudioMergeForm,
      getConnectGoogle: getConnectGoogle,
    };

    return service;

    function getVideoAudioMergeForm() {
      return $http.get(apiHost + '/talkabit/videoaudio/merge')
              .then(getCompleteGeneric)
              .catch(getFailedGeneric);
    }
    function postVideoAudioMergeForm(data) {
      $log.debug("SEND", data);

      var fd = new FormData();
      fd.append('MergeFile[video][path]', data.video.path);
      fd.append('MergeFile[audio][path]', data.audio.path);
      return $http.post(apiHost + '/talkabit/videoaudio/merge', fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
              .then(getCompleteGeneric)
              .catch(getFailedGeneric);
    }


    function getConnectGoogle() {
      return $http.get(apiHost + '/connect/google')
              .then(getCompleteGeneric)
              .catch(getFailedGeneric);
    }

    function getCompleteGeneric(response) {
      return response.data;
    }
    function getFailedGeneric(error) {
      $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
    }

  }
})();

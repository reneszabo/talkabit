(function () {
  'use strict';

  angular
          .module('4pixelsTalkabit')
          .controller('RecordController', RecordController);

  /** @ngInject */
  function RecordController($scope, $log, fourPixelsApi) {
    var vm = this;
    var formMergeBase = null;
    var formMerge = {
      video: {
        path: null
      },
      audio: {
        path: null
      }
    };
    var stream;
    var recordVideo;
    var recordAudio;
    var videoElement = null;
    var constrains = {
      video: true,
      audio: true
    };
    var isFirefox = !!navigator.mozGetUserMedia;
    $log.debug("Is Firefox ? -> " + isFirefox);
    requestUserMedia(constrains).then(userMediaSuccess, userMediaError);
    function userMediaSuccess(s) {
      stream = s;
      $log.debug(stream);
      videoElement = document.querySelector('#video');
      attachMediaStream(videoElement, stream);
      videoElement.muted = true; //FIX Echo issue
      videoElement.play();

    }
    function userMediaError(err) {
      console.log(err);
    }

    function trigerMerge() {
      $log.debug(formMerge);
      $log.debug(formMerge.audio.path instanceof Blob);
      $log.debug(formMerge.video.path instanceof Blob);
      if (formMerge.audio.path instanceof Blob && formMerge.video.path instanceof Blob) {
        fourPixelsApi.postVideoAudioMergeForm(formMerge).then(function (data) {
          $log.info("Merge Result");
          $log.debug(data);
          $('#videoResult').attr('src', data.file);
        });
      }
    }

    $scope.$on("$destroy", function () {
      console.log('DESTROY', videoElement);
      videoElement.pause();
      videoElement.src = "";
      if (stream.active) {
        stream.getTracks()[0].stop();
      }
    });

    vm.recordManager = function () {
      formMerge = {
        video: {
          path: null
        },
        audio: {
          path: null
        }
      };
      $log.info('recordManager');
      $log.debug(formMerge);
      $log.debug(formMerge.audio.path);
      $log.debug(formMerge.video.path);
      var options = {
        mimeType: 'video/webm', // or video/mp4 or audio/ogg
//                audioBitsPerSecond: 128000,
//                videoBitsPerSecond: 128000,
        bitsPerSecond: 128000 // if this line is provided, skip above two
      };
      console.log(webrtcDetectedBrowser)
      if (webrtcDetectedBrowser == 'firefox') {
        //Default Config

      } else if (webrtcDetectedBrowser === 'chrome') {
        options = {
          recorderType: WhammyRecorder,
          bitsPerSecond: 128000,
        }
      }
      recordVideo = RecordRTC(stream, options);
      $log.debug(recordVideo);
      recordVideo.setRecordingDuration(5 * 1000).onRecordingStopped(function (url) {
        $log.debug('VIDEO STOP', url);
        $('#videoResult').attr('src', url);
        formMerge.video.path = new File([recordVideo.getBlob()], guid());
        trigerMerge();
      })
              ;
      recordAudio = RecordRTC(stream,
              {
                onAudioProcessStarted: function () {
                  if (!isFirefox) {
                    recordVideo.startRecording();
                  }
                }

              }
      )
      recordAudio.setRecordingDuration(5 * 1000).onRecordingStopped(function (url) {
        $log.debug('AUDIO STOP', url);
        $('#audioResult').attr('src', url);
        formMerge.audio.path = new File([recordAudio.getBlob()], guid());
        trigerMerge();
      });
      if (!isFirefox) {
        recordAudio.startRecording();
      } else {
        recordVideo.startRecording();
      }
    }


    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
    }


    function clearphoto() {
      var context = canvas.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);

      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }

    function takepicture() {
      var context = canvas.getContext('2d');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
      } else {
        clearphoto();
      }
    }
  }
})();

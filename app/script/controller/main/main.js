
app.controller('mainCtrl', function($scope,$rootScope,talViewSrvc,$window,$interval,$timeout,$filter) {

            //--------------------
        // GET USER MEDIA CODE
        //--------------------
            navigator.getUserMedia = ( navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);

            var video;
            var webcamStream;
            var canvas, ctx;


            //--------------------
        // CAPTURE ERROR IF ANY
        //--------------------
           function checkValidation(err) {
              console.log('error',err)
              alert("Some error occured , please try again")
          }

            //--------------------
        // START WEBCAM
        //--------------------
            $scope.startWebcam =function() {
                if (navigator.getUserMedia) {
                    navigator.getUserMedia (

                        // constraints
                        {
                            video: true,
                            audio: false
                        },

                        // successCallback
                        function(localMediaStream) {
                            video = document.querySelector('video');
                            video.src = window.URL.createObjectURL(localMediaStream);
                            webcamStream = localMediaStream;

                        },

                        // errorCallback
                        function(err) {
                            console.log("The following error occured: " + err);
                        }
                    );
                } else {
                    console.log("getUserMedia not supported");
                }
            }

                //--------------------
            // STOP WEBCAM
            //--------------------
            $scope.stopWebcam=function() {
                webcamStream.stop();
            }
            //---------------------
            // TAKE A SNAPSHOT CODE
            //---------------------
            $scope.snapshot=function() {
                // Draws current image from the video element into the canvas
                ctx.drawImage(video, 0,0, canvas.width, canvas.height);
                console.log(ctx.drawImage(video, 0,0, canvas.width, canvas.height))
                var image = new Image();
                image.src = canvas.toDataURL();
                var mediaPost = talViewSrvc.mediaPost.PostPromise(canvas.toDataURL());
                mediaPost.then(
                    // OnSuccess function
                    function (answer) {
                        console.log('response',answer)
                    },
                    // OnFailure function
                    function (reason) {
                        checkValidation(reason)

                    }
                )
            }

        //---------------------
            // INIT CODE
            //---------------------
            $scope.init=function() {
                // Get the canvas and obtain a context for
                // drawing in it
                canvas = document.getElementById("myCanvas");
                ctx = canvas.getContext('2d');
            }


           // $scope.init();


    //------------------------------------------------------------------------------


    $rootScope.userDetails = JSON.parse(localStorage.getItem('userDetails'));

   $scope.getRepo =  function () {
       var mediaPost = talViewSrvc.getOnloadData.getPromise($rootScope.userDetails.repos_url);
       mediaPost.then(
           // OnSuccess function
           function (answer) {
               $scope.repo_deta = answer.data;
           },
           // OnFailure function
           function (reason) {
               checkValidation(reason)

           }
       )
   }
    $scope.getRepo()
    $scope.repo_details = {
       basic:{},
        contains:[]
    }
    $scope.showRepoDetails = function (index) {
        $scope.repo_details.contains=[];
        $scope.repo_details.basic = $scope.repo_deta[index];
        $scope.getContainsFile();
    }

    $scope.getContainsFile =  function () {
      var url =   $scope.repo_details.basic.contents_url.substring(0, $scope.repo_details.basic.contents_url.length - 8)
        var mediaPost = talViewSrvc.getContainsFile.getPromise(url);
        mediaPost.then(
            // OnSuccess function
            function (answer) {
                $scope.repo_details.contains = answer.data;
            },
            // OnFailure function
            function (reason) {
                checkValidation(reason)

            }
        )
    }


    $rootScope.logout = function() {
        localStorage.setItem('userDetails','');
        $window.location.href = '../login.html';
    }
});









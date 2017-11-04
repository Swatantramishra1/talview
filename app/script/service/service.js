var configJson  =  {
    'app_id': "36e4663b",
    app_key: "ec3f4af1438a878550a6b437293a7eb5",
    "Content-Type": "application/json"
}

app.service('talViewSrvc', ['$http', '$q', '$httpParamSerializer', function ($http, $q, $httpParamSerializer) {
    var deferObject,
       /* getOnloadData = {

            getPromise: function (Nid) {
                var config = {headers:  {
                    'authorization': configJson.token
                }
                };
                var promise = $http.get(Url.API_OnloadCall + Nid,config),
                    deferObject = deferObject || $q.defer();

                promise.then(
                    // OnSuccess function
                    function (answer) {
                        // This code will only run if we have a successful promise.
                        deferObject.resolve(answer);
                    },
                    // OnFailure function
                    function (reason) {
                        // This code will only run if we have a failed promise.
                        deferObject.reject(reason);
                    });

                return deferObject.promise;
            }
        };
        getPrimaryData = {

        getPromise: function () {
            var config = {headers:  {
                'authorization': configJson.token
            }
            };
            var promise = $http.get(Url.API_getPrimaryData ,config),
                deferObject = deferObject || $q.defer();

            promise.then(
                // OnSuccess function
                function (answer) {
                    // This code will only run if we have a successful promise.
                    deferObject.resolve(answer);
                },
                // OnFailure function
                function (reason) {
                    // This code will only run if we have a failed promise.
                    deferObject.reject(reason);
                });

            return deferObject.promise;
        }
    };*/
        mediaPost = {

        PostPromise: function (dataProcess) {
            var config = {headers:  {
                'authorization': configJson.token
            }
            };
            deferObject = deferObject || $q.defer();
            $http({
                url: Url.API_PostMedia+"?source="+dataProcess,
                method: "POST",
                headers:configJson
            })
                .then(function(response) {
                        // success
                        deferObject.resolve(response);
                    },
                    function(response) { // optional
                        // failed
                        deferObject.reject(response);
                    });
            return deferObject.promise;
        }

    };



    return {
        mediaPost    :    mediaPost ,
    }

}]);
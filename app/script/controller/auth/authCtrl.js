app.controller('authCtrl', function($scope,$rootScope,$http,$window,$base64) {
    $rootScope.otherIssu = {
        loginMessage : false
    };
    $scope.authLogin = {
        username:'',
        password:''
    }

    $scope.login = function() {
        var auth = btoa(""+$scope.authLogin.username+":"+$scope.authLogin.password+""),
            headers = {"Authorization": "Basic " + auth};
        $http.get("https://api.github.com/user", {headers: headers})
            .then(function (response) {
            localStorage.setItem('userDetails',JSON.stringify(response.data))
            $window.location.href = '/';
            $window.reload();
            }, function(data) {
            alert("Some thing went wrong please try again");
                $scope.authLogin = {
                    username:'',
                    password:''
                }
        })
    }


})
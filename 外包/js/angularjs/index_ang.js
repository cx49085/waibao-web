/***********************AngularJs*******************************************/

var app = angular.module('index', []);
//倒计时
app.controller('log_reg', function($scope, $interval, index_service) {

    //login
    $scope.login = function() {
        var param = { "phone": $scope.phone1, "password": $scope.password1 };
        console.log(param);
        index_service.post("120.25.204.86:9001/user/login", param);
    }
    //send yzm
    $scope.sendYzm = function() {
        var param = { "phone": $scope.phone2 };
        console.log(param);
        index_service.jsonp("120.25.204.86:9001/user/getcode?jsonp=JSON_CALLBACK", param);
        timePromise();
    }
    //register
    $scope.regsiter = function() {
        var param = {
            "phone": $scope.phone2,
            "password": $scope.password2,
            "nickname": $scope.nickname,
            "age": $scope.age,
            "gender": $scope.gender,
            "company": $scope.company,
            "work_type": $scope.work_type,
            "work_id": $scope.work_id,
            "code": $scope.yzm
        };
        console.log(param);
        index_service.post("120.25.204.86:9001/user/register?jsonp=JSON_CALLBACK&siteid=137bd406", param)
            .success(function(data, status) {
                alert(data.info);
            });
    }


    //返送验证码的倒计时
    $scope.times = "发送验证码"; //发送验证码
    function timePromise() { //时间显示
        var second = 6;
        $scope.btn_clicked = true;
        $interval(function() {
            if (second <= 0) {
                $interval.cancel(timePromise);
                $scope.btn_clicked = false;
                $scope.times = "重新发送";
            } else {
                $scope.times = second + "秒后可重发";
                second--;
            }
        }, 1000);
    }


});


app.service('index_service', function($http, $interval) {


    this.post = function(commentFileUrl, param) {
        return $http.post({
            method: "post",
            url: commentFileUrl,
            params: param,
            headers: { 'Cache-Control': 'no-cache' }
        });

    }

    this.get = function(commentFileUrl, param) {
        return $http.get({
            method: "post",
            url: commentFileUrl,
            params: param,
            headers: { 'Cache-Control': 'no-cache' }
        });
    }

    this.jsonp = function(commentFileUrl, param){
        console.log(param);
        return $http.jsonp({
            method: "JSONP",
            url: commentFileUrl,
            params: param
        });
// 数据
    };


})


// app.config(function($httpProvider) {
//     $httpProvider.defaults.useXDomain = true;
//     delete $httpProvider.defaults.headers
//         .common['X-Requested-With'];
// });
// app.factory('index_factory', function($interval) {
//     var backendUrl = "http://localhost:3000";
//     // var service = {
//     //         abc:
//     //     },

// return service;
// });
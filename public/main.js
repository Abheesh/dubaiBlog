var dubaiNews = angular.module('dubaiNews', ['ngRoute']);

dubaiNews.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        })

        .when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'registerCtrl'
        })
        .when('/posts', {
            templateUrl: 'templates/posts.html',
            controller: 'postsCtrl'
        })
        .otherwise({ redirectTo: '/posts' });
}]);

dubaiNews.controller('postsCtrl', function ($scope, $location, mainService) {
    var vm = $scope;
    vm.newpost = false;
    vm.blogData = {};
    vm.allPosts;
    vm.getAllPosts = function () {
        mainService.getAllPosts().then((resp) => {
            vm.allPosts = resp.data;
        })
    };
    vm.changeTab = function (id) {

        vm.tab = id;
    }
    if (localStorage.name && localStorage.uid) {
        vm.getAllPosts();
        vm.changeTab(1);
    } else {
        $location.url('/login');
    }



    vm.checkPostOwer = function (id) {
        if (id == localStorage.uid) {
            return true;
        } else {
            return false;
        }
    };

    vm.addNewPost = function () {
        vm.blogData.author = localStorage.name;
        vm.blogData.uid = localStorage.uid;
        mainService.newPosts(vm.blogData).then((resp) => {
            vm.getAllPosts();
            vm.blogData = {};
            vm.changeTab(1);
            //vm.newpost = false;
            //console.log(resp.msg);
        })
    };

    vm.updateBlock = function (data) {
        vm.showUpdate = true;
        vm.updateData = data;
    };
    vm.updatePost = function (blog) {
        let data = {
            blogName: blog.blogName,
            blogDesc: blog.blogDescription
        }
        mainService.updatePosts(data, blog._id).then((resp) => {
            vm.getAllPosts();
            vm.showUpdate = false;
            //console.log(resp.msg);
        });

    };
    vm.deleteBlock = function (id) {
        mainService.deletePosts(id).then((resp) => {
            vm.getAllPosts();

            //console.log(resp.msg);
        });
    }
    vm.remveUpdate = function () {
        vm.showUpdate = false;
    };
    vm.logout = function () {
        localStorage.removeItem('name');
        localStorage.removeItem('uid');
        $location.url('/login');
    }
});
dubaiNews.factory('mainService', function ($http) {
    var factory = {};

    factory.login = function (data) {
        return $http.post('http://localhost:3000/api/login', data);
    }
    factory.register = function (data) {
        return $http.post('http://localhost:3000/api/register', data);
    }
    factory.getAllPosts = function () {
        return $http.get('http://localhost:3000/api/blog');
    }
    factory.updatePosts = function (data, id) {
        return $http.put('http://localhost:3000/api/blog/' + id, data);
    }
    factory.deletePosts = function (id) {
        return $http.delete('http://localhost:3000/api/blog/' + id);
    }
    factory.newPosts = function (data) {
        return $http.post('http://localhost:3000/api/blog', data);
    }
    return factory;



});
dubaiNews.controller('loginCtrl', function ($scope, $location, mainService) {
    var vm = $scope;
    vm.user = {}
    if (localStorage.name && localStorage.uid) {
        $location.url('/posts');
    }
    vm.login = function () {
        if (vm.user.uname.length > 0 && vm.user.password.length > 0) {
            mainService.login(vm.user).then((resp) => {
                if (resp.data.data) {
                    localStorage.name = resp.data.data.name;
                    localStorage.uid = resp.data.data._id;
                    $location.url('/posts');
                }
            });

        }

    };


});
dubaiNews.controller('registerCtrl', function ($scope, $location, mainService) {
    var vm = $scope;
    vm.user = {}
    vm.register = function () {
        if (((vm.user.password.length > 0 && vm.user.password == vm.user.cpassword)  && vm.user.name.length > 0) && (vm.user.uname.length > 0)) {
            mainService.register(vm.user).then((resp) => {
                $location.url('/login');
            });
        }


    };
});
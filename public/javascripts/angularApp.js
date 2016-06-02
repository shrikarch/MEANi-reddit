var app = angular.module('flapper',['ui.router']);

app.factory('posts',[function(){ //defining a factory service. all the posts henceforth would be stored in here
    //service 
    var o = {
        posts: [
            {title: 'post 1', upvotes: 5},
            {title: 'post 2', upvotes: 2},
            {title: 'post 3', upvotes: 15},
            {title: 'post 4', upvotes: 9},
            {title: 'post 5', upvotes: 4, comments: [
                {author: 'Joe', body: 'Cool post!', upvotes: 0},
                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
            ]}
        ]
    };
    return o;
}]);

app.controller('mainCtrl',[
    '$scope',
    'posts',//since we created a service, we're letting the controller know about it
    function($scope, posts){ //importing service in this function.
        $scope.posts = posts.posts; //assigning it to scope.
        $scope.addPost = function(){
            $scope.posts.push({
                title: $scope.title,
                link: $scope.link,
                upvotes: 0,
                comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            });
            $scope.title = " ";
            $scope.link = " ";
        };
        $scope.incrementUpvotes = function(post){
            post.upvotes += 1;
        };
    }
]);
app.controller('postsCtrl',[
    '$scope',
    '$stateParams', //used to retrieve URL parameters.
    'posts',
    function($scope, $stateParams, posts){
        $scope.post = posts.posts[$stateParams.id]; //grab the post with that id from factory-service
        $scope.incrementUpvotes = function(post){
            post.upvotes += 1;
        };
        $scope.addComment = function(){
            $scope.post.comments.push({
                author: 'User',
                upvotes: 0,
                body: $scope.body
            });
            $scope.body = " ";
        };
    }]);

//route configureation
app.config([
    '$stateProvider', //needs these.
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        /*
for more on routing: https://thinkster.io/templatecache-tutorial
*/
        $stateProvider
            .state('home', {
            url: '/home', //this means = index.html#/home
            templateUrl: '/home.html',
            controller: 'mainCtrl'
        })
            .state('posts',{ //route for posts
            url:'/post/{id}', //{id} is a route parameter like GET method. It will be available for the ctrller
            templateUrl: '/posts.html',
            controller: 'postsCtrl'
        })

        $urlRouterProvider.otherwise('home');
    }])
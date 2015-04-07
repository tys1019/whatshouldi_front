'use strict';

/**
 * @ngdoc overview
 * @name whatshouldiAppApp
 * @description
 * # whatshouldiAppApp
 *
 * Main module of the application.
 */
angular
  .module('whatshouldiApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'MainController',
    'MainDirective',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MovieController',
        controllerAs: 'movieController'
      })
      .when('/movie/:guideboxId', {
        templateUrl: 'views/movie-details.html',
        controller: 'MovieDetailsController',
        controllerAs: 'movieDetailsController'
      })
      .when('/playlists/:playlistId', {
        templateUrl: 'views/playlist.html',
        controller: 'PlaylistController',
        controllerAs: 'playlistController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .filter('trustUrl', function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  })
  .run(function (MovieFactory, AuthFactory, PlaylistFactory, $rootScope){
    MovieFactory.getMovies();
    if (AuthFactory.user.playlist_id) {
      PlaylistFactory.getPlaylist(AuthFactory.user.playlist_id);
    };


    // $rootScope.$on("$routeChangeStart", function (event, next, current) {
    //   if (next) {
    //     debugger
    //   }
    // });
  });

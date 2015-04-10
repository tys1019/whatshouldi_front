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
      .when('/search', {
        templateUrl: 'views/search-results.html',
        controller: 'SearchResultsController',
        controllerAs: 'searchResultsController'
      })
      .when('/search/tv', {
        templateUrl: 'views/tv-search-results.html',
        controller: 'TvSearchResultsController',
        controllerAs: 'tvSearchResultsController'
      })
      .when('/tv/:guideboxId', {
        templateUrl: 'views/tv-details.html',
        controller: 'TvDetailsController',
        controllerAs: 'tvDetailsController'
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
  .run(function (MovieFactory, AuthFactory, PlaylistFactory, $rootScope, $timeout, $window){
    if (AuthFactory.user.playlist_id) {
      PlaylistFactory.getPlaylist(AuthFactory.user.playlist_id);
    };

    // $rootScope.$on("$routeChangeStart", function (event, next, current) {
    //   if (next) {
    //     debugger
    //   }
    // });
  });

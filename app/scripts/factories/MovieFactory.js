'use strict';

angular
    .module('whatshouldiApp')
    .factory('MovieFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){
            var movies = [];
            var movie = {};

            var getMovies = function() {
                $http.get(ServerUrl + '/movies').success(function(response){
                    angular.copy(response, movies);
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            }

            var getMovieDetails = function(guideboxId) {
                return $http.post(ServerUrl + '/search', {guidebox_id: guideboxId, media_type: "Movie"}).success(function(response){
                    angular.copy(response.movie, movie);
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            }

            var getMovieRatings = function(rottentomatoes_id) {
                return $http.post(ServerUrl + '/search', {rottentomatoes_id: rottentomatoes_id, search_type: "rt_ratings"}).success(function(response){
                    angular.copy(response.movie, movie);
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            }


            var getMovieReviews = function(rottentomatoes_id) {
                return $http.post(ServerUrl + '/search', {rottentomatoes_id: rottentomatoes_id, search_type: "rt_reviews"}).success(function(response){
                    angular.copy(response.movie, movie);
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            }

            return {
                movies: movies,
                movie: movie,
                getMovies: getMovies,
                getMovieDetails: getMovieDetails,
                getMovieRatings: getMovieRatings,
                getMovieReviews: getMovieReviews
            };
    }]);

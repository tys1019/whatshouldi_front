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
            };

            var getMovieDetails = function(guideboxId) {
                return $http.post(ServerUrl + '/search', {guidebox_id: guideboxId, media_type: 'Movie'}).success(function(response){
                    angular.copy(response.movie, movie);
                    movie.purchase_web_sources = JSON.parse(movie.purchase_web_sources);
                    movie.subscription_web_sources = JSON.parse(movie.subscription_web_sources);
                    movie.free_web_sources = JSON.parse(movie.free_web_sources);
                    if (movie.rt_ratings) {movie.rt_ratings = JSON.parse(movie.rt_ratings);}
                    if (movie.rt_reviews) {movie.rt_reviews = JSON.parse(movie.rt_reviews);}
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            };

            var getMovieRatings = function(rottentomatoes_id) {
                return $http.post(ServerUrl + '/search', {rottentomatoes_id: rottentomatoes_id, search_type: 'rt_ratings'}).success(function(response){
                    angular.copy(response.movie, movie);
                    if (movie.rt_ratings) {movie.rt_ratings = JSON.parse(movie.rt_ratings);}
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            };


            var getMovieReviews = function(rottentomatoes_id) {
                return $http.post(ServerUrl + '/search', {rottentomatoes_id: rottentomatoes_id, search_type: 'rt_reviews'}).success(function(response){
                    angular.copy(response.movie, movie);
                    if (movie.rt_reviews) {movie.rt_reviews = JSON.parse(movie.rt_reviews);}
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            };

            var getNetflixLink = function(movie) {
                return $http.get('http://netflixroulette.net/api/api.php?title=' + movie.title).success(function(response){
                    movie.netflixLink = "http://www.netflix.com/WiMovie/" + response.show_id
                });
            }

            return {
                movies: movies,
                movie: movie,
                getMovies: getMovies,
                getMovieDetails: getMovieDetails,
                getMovieRatings: getMovieRatings,
                getMovieReviews: getMovieReviews,
                getNetflixLink: getNetflixLink
            };
    }]);

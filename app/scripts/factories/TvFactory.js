'use strict';

angular
    .module('whatshouldiApp')
    .factory('TvFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){
            // var movies = [];
            var tvShow = {};

            // var getMovies = function() {
            //         angular.copy([], movies);

            //     $http.get(ServerUrl + '/movies').success(function(response){
            //         angular.copy(response, movies);
            //     }).error(function(data,status,headers,config){
            //         console.log('Youre doing it wrong ' + data, status, headers, config);
            //     });
            // };

            var getTvShowDetails = function(guideboxId) {
                angular.copy({}, tvShow);
                return $http.post(ServerUrl + '/search', {guidebox_id: guideboxId, media_type: 'TV'}).success(function(response){
                    angular.copy(response.results, tvShow);
                    // _parseJSON();
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            };

            // var getMovieRatings = function(rottentomatoes_id) {
            //     return $http.post(ServerUrl + '/search', {rottentomatoes_id: rottentomatoes_id, search_type: 'rt_ratings'}).success(function(response){
            //         movie.rt_ratings = JSON.parse(response.movie.rt_ratings);
            //     }).error(function(data,status,headers,config){
            //         console.log('Youre doing it wrong ' + data, status, headers, config);
            //     });
            // };


            // var getMovieReviews = function(rottentomatoes_id) {
            //     return $http.post(ServerUrl + '/search', {rottentomatoes_id: rottentomatoes_id, search_type: 'rt_reviews'}).success(function(response){
            //         movie.rt_reviews = JSON.parse(response.movie.rt_reviews);
            //     }).error(function(data,status,headers,config){
            //         console.log('Youre doing it wrong ' + data, status, headers, config);
            //     });
            // };

            // var getNetflixLink = function(movie) {
            //     return $http.get('http://netflixroulette.net/api/api.php?title=' + movie.title).success(function(response){
            //         movie.netflixLink = 'http://www.netflix.com/WiMovie/' + response.show_id;
            //     }).error(function(data,status,headers,config){
            //         movie.netflixLink = 'http://dvd.netflix.com/Search?v1=' + movie.title + '&ac_abs_posn=-1&fcld=true&ac_rel_posn=-1&ac_category_type=none';
            //     });
            // };

            // var _parseJSON = function() {
            //     if (movie.rt_ratings) {movie.rt_ratings = JSON.parse(movie.rt_ratings);}
            //     if (movie.rt_reviews) {movie.rt_reviews = JSON.parse(movie.rt_reviews);}
            //     movie.purchase_web_sources = JSON.parse(movie.purchase_web_sources);
            //     movie.subscription_web_sources = JSON.parse(movie.subscription_web_sources);
            //     movie.free_web_sources = JSON.parse(movie.free_web_sources);
            // };

            return {
                // movies: movies,
                tvShow: tvShow,
                // getMovies: getMovies,
                getTvShowDetails: getTvShowDetails,
                // getMovieRatings: getMovieRatings,
                // getMovieReviews: getMovieReviews,
                // getNetflixLink: getNetflixLink
            };
    }]);

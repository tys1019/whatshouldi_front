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
                    tvShow.netflixLink = 'http://dvd.netflix.com/Search?v1=' + tvShow.title + '&ac_abs_posn=-1&fcld=true&ac_rel_posn=-1&ac_category_type=none';
                    _parseJSON();
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            };

            var getEpisodes = function(guideboxId) {
                // return $http.post(ServerUrl + '/search', {guidebox_id: guideboxId, search_type: 'episodes'}).success(function(response){
                //     tvShow.episodes = JSON.parse(response.tvShow.episodes);
                // }).error(function(data,status,headers,config){
                //     console.log('Youre doing it wrong ' + data, status, headers, config);
                // });
            };

            var _parseJSON = function() {
                if (tvShow.epsiodes) {tvShow.epsiodes = JSON.parse(tvShow.episodes);}
            };

            return {
                tvShow: tvShow,
                getEpisodes: getEpisodes,
                getTvShowDetails: getTvShowDetails,
            };
    }]);

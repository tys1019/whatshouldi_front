'use strict';

angular
    .module('whatshouldiApp')
    .factory('TvFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){
            // var movies = [];
            var tvShow = {};
            var episode = {};

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

            var getEpisodes = function(guideboxId, season) {
                var data = {
                    guidebox_id: guideboxId,
                    search_type: 'episodes',
                    season: season
                }
                return $http.post(ServerUrl + '/search', data).success(function(response){
                    var episodes = JSON.parse(response.results);
                    var season = response.search_params.season - 1;
                    tvShow.seasons[season].episodes = episodes.reverse();
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            };

            var getSeasons = function(guideboxId) {
                return $http.post(ServerUrl + '/search', {guidebox_id: guideboxId, search_type: 'seasons'}).success(function(response){
                    tvShow.seasons = JSON.parse(response.results);
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            };

            var setEpisode = function(selected) {
                angular.copy(selected, episode);
            }

            var _parseJSON = function() {
                if (tvShow.episodes) {tvShow.episodes = JSON.parse(tvShow.episodes);}
                if (tvShow.seasons) {tvShow.seasons = JSON.parse(tvShow.seasons);}
            };

            return {
                tvShow: tvShow,
                episode: episode,
                setEpisode: setEpisode,
                getEpisodes: getEpisodes,
                getTvShowDetails: getTvShowDetails,
                getSeasons: getSeasons
            };
    }]);

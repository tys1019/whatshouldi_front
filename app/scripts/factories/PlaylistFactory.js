'use strict';

angular
    .module('whatshouldiApp')
    .factory('PlaylistFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){
            var playlists = [];
            var playlist = JSON.parse($window.localStorage.getItem('ga-playlist')) || {};

            var getPlaylist = function(playlistId) {
                $http.get(ServerUrl + '/playlists/' + playlistId).success(function(response){
                    angular.copy(response, playlist);
                    _storePlaylist(response)
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            }

            var updatePlaylist = function(user, movie) {
                var data = {user: user, movie: movie};
                $http.put(ServerUrl + '/playlists/' + user.playlist_id, data).success(function(response){
                    angular.copy(response, playlist);
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            }

            var _storePlaylist = function(data){
                $window.localStorage.setItem('ga-playlist', JSON.stringify(data));
            };



            return {
                playlists: playlists,
                playlist: playlist,
                getPlaylist: getPlaylist,
                updatePlaylist: updatePlaylist
            };
    }]);

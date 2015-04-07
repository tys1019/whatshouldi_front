'use strict';

angular
    .module('whatshouldiApp')
    .factory('AuthFactory', ['$http', '$window', 'ServerUrl', 'PlaylistFactory', function($http, $window, ServerUrl){
            var user = JSON.parse($window.localStorage.getItem('ga-user')) || {};

            var login = function(credentials, PlaylistFactory){
                return $http.post(ServerUrl + '/login', credentials).success(function(response){
                    _storeSession(response);
                    angular.copy(response, user);
                    PlaylistFactory.getPlaylist(response.playlist_id);
                });
            };

            var logout = function(){
                return $http.get(ServerUrl + '/logout').success(function(){
                        $window.localStorage.removeItem('ga-user');
                        $window.localStorage.removeItem('ga-playlist');
                        user = {};
                        PlaylistFactory.playlist = {};
                });
            };

            var signUp = function(credentials){
                return $http.post(ServerUrl + '/sign-up', credentials).success(function(response){
                    _storeSession(response);
                });
            };

            var isAuthenticated = function(){
                var user = JSON.parse($window.localStorage.getItem('ga-user'));
                if(user) return !!user.token;
                return false;
            };

            var _storeSession = function(data){
                $window.localStorage.setItem('ga-user', JSON.stringify(data));
                $http.defaults.headers.common.Authorization = 'Token token=' + data.token;
            };



            return {
                user: user,
                login: login,
                signUp: signUp,
                logout: logout,
                isAuthenticated: isAuthenticated
            };
    }]);

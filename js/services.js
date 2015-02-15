angular.module('appServices', ['kinvey'])

    .service('KinveyService', ['$kinvey', '$q', 'KINVEY',
        function ($kinvey, $q, KINVEY) {

            return {
                getData: function () {
                    var promise = $kinvey.DataStore.find('Devices');
                    return promise;
                },
                init: function () {
                    return $kinvey.init(KINVEY.APPINFO);
                },
                currentUser: function (_kinveyInitUser) {
                    console.log("_kinveyInitUser " + _kinveyInitUser);
                    if (!_kinveyInitUser) {
                        return $q.reject({error: "noUser"});
                    } else {
                        return $q.when(_kinveyInitUser);
                    }
                },
                login: function (_user, _password) {
                    return $kinvey.User.login(_user, _password);
                },
                logout: function () {
                    var user = $kinvey.getActiveUser();
                    if (null !== user) {
                        return $kinvey.User.logout();
                    } else {
                        return $q.when({});
                    }
                }

            }
        }]);

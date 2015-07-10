angular.module('app').controller('indexController', ['$scope','$http',
    function($scope , $http){
        var self = this;

        console.log('try');
    }]);

angular.module('app').controller('viewCharacterSheetController', ['$scope','$http','$location',
    function($scope, $http, $location){
        var self = this;

        $scope.classesList = {
            1:  'Human',
            2:  'Regenerator',
            3:  'Aberrant',
            4:  'Magician',
            5:  'Alchemist',
            6:  'Exorcist',
            7:  'Ki-Fighter',
            8:  '???',
            9:  'Hybrid',
            10: 'Contractor'
        };

        $scope.classes = objectToArray($scope.classesList);

        var getParams = $location.search();

        $http.requestAction('sheet/view', JSON.stringify({uid: getParams.uid}))
            .success(function(data){
                $scope.formData = data;
            });

    }]);

angular.module('app').controller('editCharacterSheetController', ['$scope','$http','$location',
    function($scope, $http, $location){
        var self = this;

        $scope.classesList = cloneObject(CLASSES_LIST);

        $scope.response = '';

        var getParams = $location.search();

        $http.requestAction('sheet/view', JSON.stringify({uid: getParams.uid}))
            .success(function(data){
                $scope.formData = data;
            });

        $scope.formSubmit = function(){
            $scope.response = '';

            $http.requestAction('sheet/update', JSON.stringify($scope.formData))
                .success(function (data) {
                    console.log($scope.formData);
                    $scope.response = data;
                });

            console.log('Form submitted');
        };
    }]);

angular.module('app').controller('generateCharacterSheetController', ['$scope','$http',
    function($scope , $http){
        var self = this;

        $scope.classesList = cloneObject(CLASSES_LIST);

        $scope.response = '';

        $scope.formSubmit = function() {
            console.log('Generating character...');

            $scope.response = '';
            $http.requestAction('sheet/generate', JSON.stringify($scope.formData))
                .success(function(data){
                    $scope.response = data;
                });
        };

    }]);

angular.module('app').controller('listCharacterSheetsController', ['$scope','$http',
    function($scope , $http){
        var self = this;

        console.log('Sheets loaded');

        $http.requestAction('sheet/list', JSON.stringify({}))
            .success(function(data){
                $scope.sheets = data;
            });
    }]);



angular.module('app').controller('userRegistrationController', ['$scope','$http',
    function($scope , $http){
        var self = this;

        $scope.formData = {
            password: ""
        };
        $scope.sideData = {
            confirmPassword: ""
        };

        $scope.formSubmit = function(){
            $http.requestAction('api/users/create', JSON.stringify($scope.formData));

            console.log('Form submitted');
        }
    }]);


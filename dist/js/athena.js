angular.module('athena', [
    'athena.autoComplete'
]);

/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete', [])
    .component('autoComplete', {
        //template: '2223232',
        templateUrl: 'views/auto-complete.view.html',
        controller: 'AutoCompleteCtrl',
        controllerAs: 'complete',
        bindings: {
            key: '@',
            type: '@',
            placeholder: '@',
            itemList: '=',
            selectedItem: '='
        }
    });


/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete')
    .controller('AutoCompleteCtrl', AutoCompleteCtrl);

AutoCompleteCtrl.$inject = ['$scope'];

function AutoCompleteCtrl($scope) {
    var vm = this;

    vm.keywords = null;
    vm.isPopup = false;

    vm.query = query;

    $scope.$on('get_auto_complete_item', function(event, args) {
        vm.keywords = args[vm.key];
    })

    vm.$onInit = function() {
    };

    function query() {
        var keywords = vm.keywords;
        if(keywords) {
            $scope.$emit('get_complete_keywords', keywords);
        }
        vm.isPopup = keywords ? true : false;
    }
}

/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete')
    .component('autoCompleteItem', {
        //templateUrl: function (element, attrs) {
        //    console.log(999,    element.type);
        //    return attrs.templateUrl || 'views/components/cs-auto-complete-' + attrs.type + '.view.html';
        //},
        template: '<div ng-include="getTemplate()"></div>',
        controller: 'AutoCompleteItemCtrl',
        controllerAs: 'complete',
        bindings: {
            type: '<',
            itemList: '=',
            selectedItem: '=',
            isPopup: '='
        }
    });


/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete')
    .controller('AutoCompleteItemCtrl', AutoCompleteItemCtrl);

AutoCompleteItemCtrl.$inject = ['$scope'];

function AutoCompleteItemCtrl($scope) {
    var vm = this;

    vm.selectResult = selectResult;

    $scope.getTemplate = function () {
        return 'views/auto-complete-' + vm.type +  '.view.html';
    };

    function selectResult(item) {
        vm.selectedItem = item;
        $scope.$emit('get_auto_complete_item', item);
        vm.isPopup = false;
    }

}

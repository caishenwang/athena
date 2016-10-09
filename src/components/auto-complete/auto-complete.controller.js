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

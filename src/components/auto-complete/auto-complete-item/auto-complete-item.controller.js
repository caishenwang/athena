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
        return 'auto-complete-' + vm.type +  '.view.html';
    };

    function selectResult() {
        vm.selectedItem = vm.item;
        console.log(111, vm.selectedItem);
    }
}

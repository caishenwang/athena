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

    function selectResult(item) {
        vm.selectedItem = item;
        $scope.$emit('get_auto_complete_item', item);
        vm.isPopup = false;
    }

}

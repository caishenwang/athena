/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete')
    .controller('AutoCompleteCtrl', AutoCompleteCtrl);

AutoCompleteCtrl.$inject = ['$scope'];

function AutoCompleteCtrl($scope) {
    var vm = this;

    //vm.keywords = vm.selectedItem ? vm.selectedItem[vm.key] : '';
    vm.isPopup = false;

    vm.showPopup = showPopup;
    vm.hidePopup = hidePopup;
    vm.change = change;
    vm.selectItem = selectItem;

    vm.$onInit = function() {
    };

    function change() {
        vm.isPopup = true;
    }

    function showPopup() {
        vm.isPopup = vm.popupOnFocus;
    }

    function hidePopup() {
        vm.isPopup = false;
    }

    function selectItem(item) {
        vm.keywords = item[vm.key];
    }
}

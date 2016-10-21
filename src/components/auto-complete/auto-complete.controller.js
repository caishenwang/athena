/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete')
    .controller('AutoCompleteCtrl', AutoCompleteCtrl);

AutoCompleteCtrl.$inject = ['$scope'];

function AutoCompleteCtrl($scope) {
    var vm = this;
    //var keywords = '';

    vm.keywords = vm.selectedItem ? vm.selectedItem[vm.key] : '';
    vm.isPopup = false;

    vm.showPopup = showPopup;
    vm.hidePopup = hidePopup;
    vm.change = change;

    vm.$onInit = function() {
    };

    //$scope.$watch('complete.selectedItem', function(newValue, oldValue) {
    //    if(vm.selectedItem) {
    //        vm.keywords = vm.selectedItem[vm.key];
    //    }
    //});

    function change() {
        //keywords = vm.keywords;
        vm.isPopup = true;
    }

    function showPopup() {
        vm.isPopup = vm.popupOnFocus;
    }

    function hidePopup() {
        vm.keywords = vm.selectedItem ? vm.selectedItem[vm.key] : '';
        vm.isPopup = false;
    }
}

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

    //vm.query = query;
    vm.showPopup = showPopup;
    vm.hidePopup = hidePopup;

    $scope.$on('get_auto_complete_item', function(event, args) {
        vm.keywords = args[vm.key];
    });

    vm.$onInit = function() {
    };

    function showPopup() {
        vm.isPopup = true;
    }

    function hidePopup() {
        vm.isPopup = false;
    }

    function query() {
        //console.log(1111);
        //var keywords = vm.selectedItem;
        //if(keywords) {
        //    $scope.$emit('get_complete_keywords', keywords);
        //}
        //vm.isPopup = keywords ? true : false;
        vm.isPopup = true;
    }
}

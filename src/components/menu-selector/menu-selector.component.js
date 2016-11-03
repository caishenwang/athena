/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.menuSelector', [])
    .component('menuSelector',{
        templateUrl: 'menu-selector.view.html',
        controller: 'MenuSelector',
        controllerAs: 'menu',
        bindings: {
            menuList: '<',  /*下拉树*/
            placeholder: '@', /*输入框提示语*/
            level: '<', /*支持等级-最多3*/
            selectedMenu: '<', /*输入框默认值*/
            isShow: '<', /*下拉树默认是否显示*/
            eventName: '@'
        }
    });

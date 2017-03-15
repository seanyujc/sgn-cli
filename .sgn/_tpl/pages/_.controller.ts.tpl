import { ICommon } from "../../core/services/common.service";

export default class <%= moduleName%>Controller{
    static $inject = ['$scope', '$rootScope', '$stateParams', 'common'];
    constructor($scope: ng.IScope, $rootScope: ng.IRootScopeService, $stateParams: angular.ui.IStateParamsService, common: ICommon) {
        console.log("<%= moduleName%>Controller 1")
    }
}

export default class <%= moduleName%>Controller{
    static $inject = ['$scope'];
    constructor($scope: ng.IScope){
        console.log("<%= moduleName%>Controller 1")
    }
}

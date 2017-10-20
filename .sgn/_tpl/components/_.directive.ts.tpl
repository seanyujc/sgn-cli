<%= moduleName%>Component.$inject = ["$log"];
function <%= moduleName%>Component($log: ng.ILogService) {
  const directive: ng.IDirective = {
    restrict: "E",
    scope: {
    },
    // tslint:disable-next-line:no-submodule-imports
    templateUrl: require("!!file-loader?name=templates/components/[name].[ext]!./<%= moduleName%>.html"),
    controller: <%= moduleName%>Controller,
  };

  return directive;

}
<%= moduleName%>Controller.$inject = ["$log"];
function <%= moduleName%>Controller($log: ng.ILogService) {
  $log.log(123);
}
export default <%= moduleName%>Component;

<%= moduleName%>Component.$inject = ['$log'];

function <%= moduleName%>Component($log: ng.ILogService) {
  const directive: ng.IDirective = {
    restrict: 'E',
    scope: {
    },
    templateUrl: require('!!file-loader?name=templates/components/[name].[ext]!./<%= moduleName%>.html'),
    controller: <%= moduleName%>Controller,
  }

  return directive;

  

}
function <%= moduleName%>Controller() {
  console.log(123);
}
export default <%= moduleName%>Component;

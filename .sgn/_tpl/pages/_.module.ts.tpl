import * as angular from 'angular';
import "./<%= moduleName%>.scss"
import <%= moduleName%>Controller from './<%= moduleName%>.controller';

const <%= moduleName%>Module = angular.module("<%= moduleName%>-module", []);
<%= moduleName%>Module.controller("<%= moduleName%>Controller", <%= moduleName%>Controller)

export default <%= moduleName%>Module;
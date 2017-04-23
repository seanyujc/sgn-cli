import * as angular from "angular";
import <%= moduleName%>Directive from "./<%= moduleName%>.directive";
import "./<%= moduleName%>.scss";

const <%= moduleName%>Module = angular.module("<%= moduleName%>-module", []);

<%= moduleName%>Module.directive("<%= moduleName%>", <%= moduleName%>Directive);

export default <%= moduleName%>Module;

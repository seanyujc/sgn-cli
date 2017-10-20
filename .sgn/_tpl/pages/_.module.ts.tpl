import * as angular from "angular";
require("!!style-loader!css-loader!sass-loader!./<%= moduleName%>.scss");
import <%= ufModuleName%>Controller from "./<%= moduleName%>.controller";

const <%= moduleName%>Module = angular.module("<%= moduleName%>-module", []);
<%= moduleName%>Module.controller("<%= moduleName%>Controller", <%= ufModuleName%>Controller)

export default <%= moduleName%>Module;

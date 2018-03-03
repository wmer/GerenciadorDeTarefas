/*
 Autor: William Santana;
 Data: 04/10/2015
 Ver.: "God Version" 1
*/
app = angular.module('gerenciadorTarefasApp', ["ui.sortable", "ui.bootstrap", "ngMaterial", "LocalStorageModule", 
	"ui.router", "gerenciadorTarefasApp.rotas", "ngAnimate", "dataHoraService", "usuarioService", "TarefasService"]);
app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);
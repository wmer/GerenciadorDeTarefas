/*
 Autor: William Santana;
 Data: 04/10/2015
 Ver.: "God Version" 1
--------------------------------------------------------------------------------ROTAS-------------------------------------------------------------------------------------------
*/
angular.module('gerenciadorTarefasApp.rotas', ["ui.router", "ngAnimate"])
//configuração de rotas
.config(function ($stateProvider, $urlRouterProvider) {
    //console.log("rota start");
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'listaTarefasControle',
            controllerAs: 'tarefasControle'
        })
        .state('login', {
            url: '/login'
        })
        .state('categoria', {
            url: '/categoria',
            templateUrl: 'templates/listaCategoria.html',
            controller: 'listaTarefasControle',
            controllerAs: 'tarefasControle'

        })
        .state('categoria.lista', {
            url: '/{listaId:[0-9]{1,4}}',
            templateUrl: 'templates/listaTarefas.html',
            controller: 'listaTarefasControle',
            controllerAs: 'categoriaControle'

        })
        .state('categoria.novo', {
            url: '/novo',
            views: {
                'novaCat@categoria': {
                    templateUrl: 'templates/categoriaNovo.html',
                    controller: 'listaTarefasControle',
                    controllerAs: 'categoriaControle'

                }
            }
        })
        .state('categoria.lista.tarefaNovo', {
            url: '/tarefa/novo',
            views: {
                'novaTare@categoria.lista': {
                    templateUrl: 'templates/tarefaNovo.html',
                    controller: 'listaTarefasControle',
                    controllerAs: 'tarefaControle'

                }
            }
        })
        .state('categoria.lista.Novanota', {
            url: '/nota/novo:tarefaId',
            views: {
                'novaTare@categoria.lista': {
                    templateUrl: 'templates/notaNovo.html',
                    controller: 'listaTarefasControle',
                    controllerAs: 'tarefaControle'

                }
            }
        })
        
    $urlRouterProvider.otherwise('/');
});
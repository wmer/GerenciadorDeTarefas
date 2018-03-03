/*
 Autor: William Santana;
 Data: 04/10/2015
 Ver.: "God Version" 1
*/
//Controladoras................................................................................................................................................................................
app.controller('listaTarefasControle', ['$rootScope', '$scope', '$state', '$stateParams', 'localStorageService', 'dataHora', 'gerenciadorUsuario', 'gerenciadorTarefas', function ($rootScope, $scope, $state, $stateParams, localStorageService, dataHora, gerenciadorUsuario, gerenciadorTarefas) {
    //console.log("controller start");
    var controlList = this;
    controlList.user = gerenciadorUsuario.user;
    controlList.logado = gerenciadorUsuario.logado;
    controlList.usuarioAtual = gerenciadorUsuario.usuarioAtual;
    controlList.show = "All";
    controlList.mover = false;
    controlList.catAtual = $scope.$stateParams;
    if ($scope.$stateParams.listaId) {
        localStorageService.set("categoriaAtual", "");
        controlList.currentShow = parseInt($scope.$stateParams.listaId);
        localStorageService.set("categoriaAtual", controlList.currentShow);
    } else {
        //exibe categoria
        if (!localStorageService.get("categoriaAtual")) {
            controlList.currentShow = 0;
        } else {
            controlList.currentShow = localStorageService.get("categoriaAtual");
        };
    }
    //troca lista
    $rootScope.$on('$stateChangeSuccess',
    function (event, toState, toParams, fromState, fromParams) {
        if (toState.name === "categoria.lista") {
            localStorageService.set("categoriaAtual", "");
            controlList.currentShow = parseInt($scope.$stateParams.listaId);
            localStorageService.set("categoriaAtual", controlList.currentShow);
        } else {
            //exibe categoria
            if (!localStorageService.get("categoriaAtual")) {
                controlList.currentShow = 0;
            } else {
                controlList.currentShow = localStorageService.get("categoriaAtual");
            };
        }
    });
    
    //DatePicker
    controlList.myDate = new Date();
    controlList.minDate = new Date(
        controlList.myDate.getFullYear(),
        controlList.myDate.getMonth() - 2,
       controlList.myDate.getDate());
    controlList.maxDate = new Date(
        controlList.myDate.getFullYear(),
        controlList.myDate.getMonth() + 2,
        controlList.myDate.getDate());

    //Gerenciamento de Usuário.................................................................................................................................................................
    //login
    controlList.login = function (usuario, senha) {
        try {
            var meuLogin = gerenciadorUsuario.login(usuario, senha);
        } catch (erro) {
            alert(erro);
        } finally {
            controlList.usuario = '';
            controlList.senha = '';
            if (meuLogin) {
                $("#loginTarefas").modal("hide");
                location.hash = "/categoria/0";
                location.reload();
            }
        }
    };

    //logout
    controlList.logOut = function (usuario) {
        try {
            var meuLogin = gerenciadorUsuario.logOut(usuario);
        } catch (erro) {
            alert(erro);
        } finally {
            if (meuLogin) {
                location.reload();
            }
        }
    };

    //Novo Usuário
    controlList.novoUsuario = function (usuario, nome, sobrenome, senha) {
        try {
            var meuUsuario = gerenciadorUsuario.novoUsuario(usuario, nome, sobrenome, senha);
        } catch (erro) {
            alert(erro);
        } finally {
            controlList.nome = '';
            controlList.sobrenome = '';
            controlList.senha = '';
            if (meuUsuario) {
                location.hash = "/categoria/0";
                location.reload();
            }
        }
    };
    //Gerenciamento de Tarefas..................................................................................................................................................
    //add Tarefa Rapida
    controlList.addTarefaRapida = function (tarefa, categoria) {
        try {
            var minhaTarefa = gerenciadorTarefas.addTarefaRapida(tarefa, categoria);
        } catch (erro) {
            alert(erro);
        } finally {
            controlList.tarefa = '';
            if (minhaTarefa) {
                var escolha = confirm("Tarefa Adicionada com Sucesso! \n Deseja adicionar outra?");
                if (!escolha) {
                    $("#novaTarefaRapida").modal("hide");
                }
            }
        }
    };

    //add Tarefa
    controlList.addTarefa = function (tarefa, categoria, data) {
        try {
            var minhaTarefa = gerenciadorTarefas.addTarefa(tarefa, categoria, data);
        } catch (erro) {
            alert(erro);
        } finally {
            controlList.tarefa = '';
            if (minhaTarefa) {
                var escolha = confirm("Tarefa Adicionada com Sucesso! \n Deseja adicionar outra?");
                if (!escolha) {
                    location.hash = "/categoria/0";
                }
            }
        }
    };

    //adicionar nota
    controlList.addNota = function (nota) {
        var tarefa = controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[$scope.$stateParams.tarefaId];
        try {
            var minhaNota = gerenciadorTarefas.addNota(tarefa, nota, controlList.currentShow);
        } catch (erro) {
            alert(erro);
        } finally {
            if (minhaNota) {
                var escolha = confirm("Nota Adicionada com Sucesso! \n Deseja adicionar outra?");
                if (!escolha) {
                    location.hash = "/categoria/0";
                }
            }
        }
    }

    //apaga nota
    //Deleta Tarefa Definitivamente
    controlList.deletaNota = function (item, notaIndex) {
        var tarefaIndex = controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas.indexOf(item);
        var nota = controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[tarefaIndex].notas;
        var escolha = confirm('Você deseja apagar "' + controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[tarefaIndex].notas[notaIndex].nota + '"? Esta ação não pode ser desfeita.');
        if (escolha === true) {
            try {
                var minhaNota = gerenciadorTarefas.deletaNota(nota, notaIndex);
            } catch (erro) {
                alert(erro);
            } finally {
                if (nota.length === 0) {
                    controlList.mostarComment = false;
                }
            }
        }
    };

    //exibe categorias
    controlList.optCat = function () {
        var option = gerenciadorTarefas.optCat(controlList.currentShow);
        $(".catMove").html(option);
    };

    //Mover Tarefa
    controlList.moveTarefa = function (indexTarefa, indexCategoria) {
        var objTarefa = controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[indexTarefa];
        var Tarefa = controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[indexTarefa].tarefa;
        var Categoria = controlList.user[controlList.usuarioAtual].tarefas[indexCategoria].categorias;
        var size = controlList.user[controlList.usuarioAtual].tarefas[indexCategoria].minhatarefas.length;
        var escolha = confirm('Você deseja mover "' + Tarefa + '" para ' + Categoria + '?');
        if (escolha) {
            try {
                gerenciadorTarefas.moveTarefa(objTarefa, Tarefa, indexTarefa, indexCategoria, Categoria, size, controlList.currentShow);
            } catch (erro) {
                alert(erro);
            } finally {
                controlList.novaTarefa = '';
                $("#moveTarefa").modal("hide");
            }
        }
    };

    //Move Lixeira
    controlList.moverLixeira = function (item) {
        var index = controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas.indexOf(item);
        var escolha = confirm('Você deseja mover "' + controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[index].tarefa + '" de ' + controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].categorias + " para lixeira?");
        if (escolha) {
            gerenciadorTarefas.moverLixeira(controlList.currentShow, index);
        }
    };

    //Limpa tarefas feitas
    controlList.limpaFeitos = function () {
        var size = controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas.length;
        var escolha = confirm('Você deseja mandar todas as tarefas feitas para lixeira?');
        if (escolha) {
            gerenciadorTarefas.limpaFeitos(controlList.currentShow, size);
        }
    };

    //Restaurar Tarefa
    controlList.restauraLixeira = function (item) {
        var index = controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas.indexOf(item);
        var escolha = confirm('Você deseja restaurar "' + controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[index].tarefa + '" da lixeira para ' + controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].categorias + "?");
        if (escolha) {
            gerenciadorTarefas.restauraLixeira(controlList.currentShow, index);
        }
    };

    //Restaura Todos
    controlList.restauraTodos = function () {
        var size = controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas.length;
        var escolha = confirm('Você deseja restaurar todas as tarefas?');
        if (escolha) {
            gerenciadorTarefas.restauraTodos(controlList.currentShow, size);
        }
    };

    //Deleta Tarefa Definitivamente
    controlList.deletaTarefa = function (item) {
        var index = controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas.indexOf(item);
        var escolha = confirm('Você deseja apagar "' + controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[index].tarefa + '"? Esta ação não pode ser desfeita.');
        if (escolha === true) {
            gerenciadorTarefas.deletaTarefa(controlList.currentShow, index);
        }
    };

    //Esvaziar Lixeira
    controlList.apagaTodos = function () {
        var size = controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas.length;
        var escolha = confirm('Você deseja esvaziar a lixeira?');
        if (escolha === true) {
            gerenciadorTarefas.apagaTodos(controlList.currentShow, size);
        }
    };

    //Gerenciamento de categorias...........................................................................................................................
    //add categoria
    controlList.addCategoria = function (categoria) {
        try {
            var minhaCategoria = gerenciadorTarefas.addCategoria(categoria);
        } catch (erro) {
            alert(erro);
        } finally {
            controlList.categoria = "";
            if (minhaCategoria) {
                var escolha = confirm("Categoria adicionada com sucesso! \n Deseja adicionar outra?");
                if (!escolha) {
                    location.hash = "/categoria/0";
                }
            }
        }
    };

    //Deleta Categoria
    controlList.deletaCategoria = function () {
        var size = controlList.user[controlList.usuarioAtual].tarefas.length;
        var escolha = confirm('Você deseja apagar a categoria "' + controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].categorias + '" e todas as tarefas contida nela?');
        if (escolha === true) {
            try {
                gerenciadorTarefas.deletaCategoria(size, controlList.currentShow);
            } catch (erro) {
                alert(erro);
            }
        }
    };

    //Controle de Visão.........................................................................................................................................................
    //acerta hora
    controlList.corrigeData = function (data) {
        return dataHora.corrigeData(data);
    }
    //reordena tarefas
    controlList.reordena = {
        containment: "parent",
        cursor: "move",
        tolerance: "pointer"
    };

    //Filtro de tarefas
    controlList.showFn = function (minhatarefas) {
        if (!minhatarefas.deletado && controlList.show === "All") {
            return true;
        } else if (minhatarefas.feito && !minhatarefas.deletado && controlList.show === "Complete") {
            return true;
        } else if (!minhatarefas.feito && !minhatarefas.deletado && controlList.show === "Incomplete") {
            return true;
        } else if (minhatarefas.deletado && controlList.show === "Delete") {
            return true;
        } else {
            return false;
        }
    };

    //contador de tarefas
    controlList.contadorTarefas = function () {
        var size = controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas.length
        var contadores = {};
        var total = 0;
        var restantes = 0;
        var feitas = 0;
        var deletadas = 0;
        for (var i = 0; i < size; i++) {
            if (controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[i].deletado !== true) { total++ };
            if (controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[i].feito !== true && controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[i].deletado !== true) { restantes++ };
            if (controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[i].feito === true && controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[i].deletado !== true) { feitas++ };
            if (controlList.user[controlList.usuarioAtual].tarefas[controlList.currentShow].minhatarefas[i].deletado === true) { deletadas++ };
        }
        contadores = { total: total, restantes: restantes, feitas: feitas, deletadas: deletadas };
        return contadores;
    };
    //total de todas as categorias
    controlList.totalTarefas = function () {
        var size = controlList.user[controlList.usuarioAtual].tarefas.length;
        var tudo = 0;
        for (var i = 0; i < size; i++) { tudo += controlList.user[controlList.usuarioAtual].tarefas[i].minhatarefas.length; };
        return tudo;
    }

    //verificando mudanças no array de usuários
    $scope.$watch("loginControle.user", function (newVal, oldVal) {
        if (newVal !== null && angular.isDefined(newVal) && newVal !== oldVal) {
            localStorageService.add("usuarios", angular.toJson(newVal));
        }
    }, true);
}]);
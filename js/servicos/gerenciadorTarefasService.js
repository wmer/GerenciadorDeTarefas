/*
 Autor: William Santana;
 Data: 04/10/2015
 Ver.: "God Version" 1
*/
function gerenciadorTarefasService(localStorageService, gerenciadorUsuario, dataHora) {
    //console.log("gerenciadorTarefasService start");
    return {
        //add Tarefa Rapida
        addTarefaRapida: function (tarefa, categoria) {
            var index = gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas.indexOf(categoria);
            var size = gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[index].minhatarefas.length;
            for (var i = 0; i < size; i++) {
                if (gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[index].minhatarefas[i].tarefa === tarefa && gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[index].minhatarefas[i].deletado !== true) {
                    throw "A Tarefa já existe meu filho!";
                }
            }
            //adiciona a tarefa
            var novaTarefa = {
                id: ++size,
                tarefa: tarefa,
                categoria: user[usuarioAtual].tarefas[index].categorias,
                criadoEm: dataHora.dataLonga + " às " + dataHora.horaAtual,
                para: dataHora.dataLonga + " às " + dataHora.horaAtual,
                notas: [],
                prioridade: "normal",
                feito: false,
                deletado: false
            };
            gerenciadorUsuario.user[usuarioAtual].tarefas[index].minhatarefas.splice(0, 0, novaTarefa);
            return true;
        },

        //add Tarefa
        addTarefa: function (tarefa, categoria, data) {
            var dataCorigida = dataHora.corrigeData(data);
            var size = gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[categoria].minhatarefas.length;
            for (var i = 0; i < size; i++) {
                if (gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[categoria].minhatarefas[i].tarefa === tarefa && gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[categoria].minhatarefas[i].deletado !== true) {
                    throw "A Tarefa já existe meu filho!";
                }
            }
            //adiciona a tarefa
            var novaTarefa = {
                id: ++size,
                tarefa: tarefa,
                categoria: user[usuarioAtual].tarefas[categoria].categorias,
                criadoEm: dataHora.dataLonga + " às " + dataHora.horaAtual,
                para: dataCorigida.dataAtual,
                notas: [],
                prioridade: "normal",
                feito: false,
                deletado: false
            };
            gerenciadorUsuario.user[usuarioAtual].tarefas[categoria].minhatarefas.splice(0, 0, novaTarefa);
            return true;
        },

        //add Nota
        addNota: function (tarefa, nota, categoria) {
            var size = tarefa.notas.length;
            for (var i = 0; i < size; i++) {
                if (tarefa.notas[i].nota === nota) {
                    throw "A Nota já existe meu filho!";
                }
            }
            //adiciona a Nota
            var novaNota = {
                id: ++size,
                nota: nota,
                criadoEm: dataHora.dataLonga + " às " + dataHora.horaAtual,
            };
            tarefa.notas.splice(0, 0, novaNota);
            return true;
        },

        //Deleta Nota
        deletaNota: function (nota, index) {
            nota.splice(index--, 1);
        },

        //Mover Tarefa
            //exibe categorias para mover
            optCat: function (currentShow) {
                var size = user[usuarioAtual].tarefas.length;
                var option = '<option value="">Selecione uma Categoria</option>';
                for (var i = 0; i < size; i++) {
                    if (gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[i].categorias !== gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[currentShow].categorias) {
                        option += '<option value="' + i + '">' + gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[i].categorias + '</option>'
                    }
                }
                return option;
            },
            //Move a Tarefa
            moveTarefa: function (objTarefa, tarefa, indexTarefa, indexCategoria, Categoria, size, currentShow) {
                //Testa se a tarefa existe na categoria selecionada
                for (var i = 0; i < size; i++) {
                    if (gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[indexCategoria].minhatarefas[i].tarefa === tarefa && gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[indexCategoria].minhatarefas[i].tarefa.deletado !== true) {
                        throw "A Tarefa já existe meu filho!";
                    }
                }
                //Apaga tarefa na categoria atual
                gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[currentShow].minhatarefas.splice(indexTarefa--, 1);
                var data = objTarefa.para;
                //Move a tarefa
                var minhaTarefa = {
                    id: ++size,
                    tarefa: tarefa,
                    categoria: Categoria,
                    criadoEm: dataHora.dataLonga + " às " + dataHora.horaAtual,
                    para: data,
                    notas: [],
                    prioridade: "normal",
                    feito: false,
                    deletado: false
                };
                gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[indexCategoria].minhatarefas.splice(0, 0, minhaTarefa);
            },

        //Move Lixeira
        moverLixeira: function (currentShow, index) {
            gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[currentShow].minhatarefas[index].deletado = true;
        },

        //Limpa tarefas feitas
        limpaFeitos: function (currentShow, size) {
            for (var i = 0; i < size; i++) {
                if (gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[currentShow].minhatarefas[i].feito === true) {
                    gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[currentShow].minhatarefas[i].deletado = true;
                }
            }
        },

        //Restaurar Tarefa
        restauraLixeira: function (currentShow, index) {
            gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[currentShow].minhatarefas[index].deletado = false;
        },

        //Restaura Todos
        restauraTodos: function (currentShow, size) {
            for (var i = 0; i < size; i++) {
                if (gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[currentShow].minhatarefas[i].deletado === true) {
                    gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[currentShow].minhatarefas[i].deletado = false;
                }
            }
        },

        //Deleta Tarefa Definitivamente
        deletaTarefa: function (currentShow, index) {
            gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[currentShow].minhatarefas.splice(index--, 1);
        },

        //Esvaziar Lixeira
        apagaTodos: function (currentShow, size) {
            for (var i = 0; i < size; i++) {
                if (gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[currentShow].minhatarefas[i].deletado === true) {
                    var index = i--;
                    if (index < 0) { index = 0 };
                    gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[currentShow].minhatarefas.splice(index, 1);
                }
            }
        },

        //add categoria
        addCategoria: function (categoria) {
            var size = gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas.length;
            for (var i = 0; i < size; i++) {
                if (gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas[i].categorias === categoria) {
                    throw "Essa Categoria Já existe!";
                }
            }
            //adiciona categoria
            var novaCategoria = {
                id: ++size,
                categorias: categoria,
                minhatarefas: []
            };
            gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas.splice(0, 0, novaCategoria);
            return true;
        },

        //Deleta Categoria
        deletaCategoria: function (size, currentShow) {
            if (size === 1) {
                throw "É preciso ao menos 1 categoria para gerenciar tarefas!"
            } else {
                gerenciadorUsuario.user[gerenciadorUsuario.usuarioAtual].tarefas.splice(currentShow--, 1);
            }
        }

    };
};
angular.module('TarefasService', ["LocalStorageModule", "usuarioService", "dataHoraService"]).service('gerenciadorTarefas', gerenciadorTarefasService);
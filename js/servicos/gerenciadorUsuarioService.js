/*
 Autor: William Santana;
 Data: 04/10/2015
 Ver.: "God Version" 1
*/
function gerenciadorUsuarioService($state, localStorageService, dataHora) {
    //console.log("gerenciadorUsuarioService start");
    //array de usuários
    if (!localStorageService.get("usuarios")) {
        user = [{
            id: 1,
            usuarios: "admin",
            detalhes: { nome: "William", sobrenome: "Santana", nomeuser: "admin", senha: "admin1234", permisao: "admin" },
            tarefas: [{ categorias: "Sem Categoria", minhatarefas: [] }],
            criadoEm: dataHora.dataLonga + " às " + dataHora.horaAtual,
            logado: false
        }];
    } else {
        user = localStorageService.get("usuarios");
    };
    //usuario logado
    if (!localStorageService.get("login") || localStorageService.get("login") === "") {
        logado = [];
        $state.go("login");
        $("#loginTarefas").modal({ show: true, backdrop: "static" });
    } else {
        logado = localStorageService.get("login");
    };
    //testa qual usuário logado
    if (!localStorageService.get("userAtual")) {
        usuarioAtual = 0;
    } else {
        usuarioAtual = localStorageService.get("userAtual");
    };

    return {
        //usuário
        user: user,
        logado: logado,
        usuarioAtual: usuarioAtual,
        //Login
        login: function (usuario, senha) {
            localStorageService.set("login", "");
            var userEncontrado = "";
            var size = user.length;
            var userIndex = 0;
            var encontrado = false;
            for (var i = 0; i < size; i++) {
                if (user[i].usuarios === usuario && user[i].detalhes.senha === senha) {
                    encontrado = true;
                    user[i].logado = true;
                    userEncontrado = user[i];
                    userIndex = i;
                }
            }
            if (encontrado) {
                logado.push(userEncontrado);
                localStorageService.set("login", userEncontrado);
                usuarioAtual = userIndex;
                localStorageService.set("userAtual", userIndex);
                return true;
            } else {
                throw "Usuário ou Senha Incorretos!";
            }
        },

        //logout
        logOut: function (index) {
            user[index].logado = false;
            localStorageService.set("login", "");
            $("#loginTarefas").modal({ show: true, backdrop: "static" });
            return true;
        },

        //Novo Usuário
        novoUsuario: function (usuario, nome, sobrenome, senha) {
            localStorageService.set("login", "");
            var size = user.length;
            for (var i = 0; i < size; i++) {
                if (user[i].usuarios === usuario) {
                    throw "Esse usuário já existe";
                }
            }
            var newUser = {
                id: ++size,
                usuarios: usuario,
                detalhes: { nome: nome, sobrenome: sobrenome, nomeuser: usuario, senha: senha, permisao: "user" },
                tarefas: [{ categorias: "Sem Categoria", minhatarefas: [] }],
                criadoEm: dataHora.dataLonga + " às " + dataHora.horaAtual,
                logado: true
            }
            user.splice(0, 0, newUser);
            localStorageService.set("login", newUser);
            usuarioAtual = 0;
            localStorageService.set("userAtual", 0);
            localStorageService.add("usuarios", newUser);
            return true;
        },

    };
};
angular.module('usuarioService', ["LocalStorageModule", "ui.router", "dataHoraService"]).service('gerenciadorUsuario', gerenciadorUsuarioService);
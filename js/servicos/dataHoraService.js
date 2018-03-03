/*
 Autor: William Santana;
 Data: 04/10/2015
 Ver.: "God Version" 1
*/
function dataHoraServiceConstructor() {
    //Variaveis
    var getTime, nomeMes, nomeSemana, nomeDia, nomeDiaFormat, dia, diaF, mes, mesF, mesFormat, ano, hora, minutos, segundos, horaF, minutosF, segundosF, horaAtual, dataCurta, dataLonga, dataHora;
    getTime = new Date();
    //dias da semana
    nomeSemana = new Array(7);
    nomeSemana[0] = "Domingo";
    nomeSemana[1] = "Segunda-Feira";
    nomeSemana[2] = "Terça-Feira";
    nomeSemana[3] = "Quarta-Feira";
    nomeSemana[4] = "Quinta-Feira";
    nomeSemana[5] = "Sexta-Feira";
    nomeSemana[6] = "Sábado";
    //meses
    nomeMes = new Array(12);
    nomeMes[0] = "Janeiro";
    nomeMes[1] = "Fevereiro";
    nomeMes[2] = "Março";
    nomeMes[3] = "Abril";
    nomeMes[4] = "Maio";
    nomeMes[5] = "Junho";
    nomeMes[6] = "Julho";
    nomeMes[7] = "Agosto";
    nomeMes[8] = "Setembro";
    nomeMes[9] = "Outubro";
    nomeMes[10] = "Novembro";
    nomeMes[11] = "Dezembro";
    //Hora
    hora = getTime.getHours();
    if (hora < 10) { horaF = "0" + hora } else { horaF = hora } ;
    minutos = getTime.getMinutes();
    if (minutos < 10) { minutosF = "0" + minutos } else { minutosF = minutos };
    segundos = getTime.getSeconds();
    if (segundos < 10) { segundosF = "0" + segundos } else { segundosF = segundos };
    //Data
    dia = getTime.getDate();
    if (dia < 10) { diaF = "0" + dia } else { diaF = dia };
    nomeDia = getTime.getDay();
    //dia formatado
    nomeDiaFormat = nomeSemana[nomeDia];
    mes = getTime.getMonth();
    if (mes < 10) { mesF = "0" + mes } else { mesF = mes };
    //mes formatado
    mesFormat = nomeMes[mes];
    ano = getTime.getFullYear();

    //data e hora formatado
    horaAtual = horaF + ":" + minutosF + ":" + segundosF;
    dataCurta = diaF + "/" + mesF + "/" + ano;
    dataLonga = nomeDiaFormat + ", " + diaF + " de " + mesFormat + " de " + ano;
    dataHora = horaAtual + "-" + dataLonga;
    return {
        //variaveis
        nomeDia: nomeDia,
        nomeDiaFormat: nomeDiaFormat,
        dia: dia,
        diaF: diaF,
        mes: mes,
        mesF: mesF,
        mesFormat: mesFormat,
        ano: ano,
        hora: hora,
        minutos: minutos,
        segundos: segundos,
        horaF: horaF,
        minutosF: minutosF,
        segundosF: segundosF,
        horaAtual: horaAtual,
        dataCurta: dataCurta,
        dataLonga: dataLonga,
        dataHora: dataHora,

        //funções
        corrigeData: function (data) {
            //data
            var dia = data.getDate();
            if (dia < 10) { dia = "0" + dia };
            var nomeDia = data.getDay();
            nomeDia = nomeSemana[nomeDia];
            var mes = data.getMonth();
            if (mes < 10) { var numMes = "0" + mes };
            mes = nomeMes[mes];
            var ano = data.getFullYear();
            //hora
            var hora = data.getHours();
            var minuto = data.getMinutes();
            var segundo = data.getSeconds();
            if (hora < 10) { hora = "0" + hora };
            if (minuto < 10) { minuto = "0" + minuto };
            if (segundo < 10) { segundo = "0" + segundo };
            //extenso
            var horaAtual = hora + ":" + minuto + ":" + segundo;
            var dataAtual = nomeDia + ", " + dia + " de " + mes + " de " + ano;
            var numFormatData = dia + "/" + numMes + "/" + ano;

            var dataCorrigida = {
                hora: hora,
                minuto: minuto,
                segundo: segundo,
                nomeDia: nomeDia,
                dia: dia,
                numMes: numMes,
                mes: mes,
                ano: ano,
                horaAtual: horaAtual,
                dataAtual: dataAtual,
                numFormatData: numFormatData,
            };
            return dataCorrigida;
        },
    };
};
angular.module('dataHoraService', []).service('dataHora', dataHoraServiceConstructor);
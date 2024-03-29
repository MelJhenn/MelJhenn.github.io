var proyectos = [];
var siglas = {
    "ELECTROMEDICINA": "emd",
    "CONSTRUCCIÓN CIVIL": "ccc",
    "GAS, PETRÓLEO Y PROCESOS": "gpp",
    "GAS, PETRÓLEO": "gpp",
    "INDUSTRIA TEXTIL Y CONFECCIÓN": "itc",
    "INFORMÁTICA INDUSTRIAL": "iin",
    "METALURGIA, SIDERURGIA Y FUNDICIÓN": "msf",
    "ELECTROMECÁNICA": "emc",
};
function crearCampo(subtitulo, valor) {
    var campo = $("<p>");
    campo.append([
        $("<span>", {
            "class": "subtitulo"
        }).text(subtitulo),
        $("<span>").text(valor),
    ]);
    return campo;
}
function crearDatos(proyecto) {
    var datos = $("<div>");
    var title = $("<h3>");
    title.text(proyecto.titulo_proyecto);
    var autor = crearCampo("Postulante(s): ", proyecto.autor);
    var tutor = crearCampo("Tutor: ", proyecto.tutor);
    var carrera = crearCampo("Carrera: ", proyecto.carrera);
    var modalidad = crearCampo("Modalidad: ", proyecto.tipo_proyecto);
    var gestion = crearCampo("Periodo: ", proyecto.gestion);
    var codigo = crearCampo("Código: ", proyecto.codigo);
    var resumen = crearCampo("Resumen: ", proyecto.descripcion);


    datos.append([title, autor, tutor, carrera, modalidad, gestion, gestion, codigo, resumen]);
    return datos;
}
function limpiar(cadena) {
    return cadena.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
}
function buscarSigla(carrera) {
    carrera = limpiar(carrera);
    for (const [key, value] of Object.entries(siglas)) {
        if (limpiar(key) == carrera)
            return value;
    }
    return null;
}
function crearCelda(proyecto) {
    var sigla = buscarSigla(proyecto.carrera);
    var padre = $("#padre");
    var celda = $("<div>", {
        "class": "celda " + sigla
    });

    var image = $("<img>", {
        "src": "./img/fichas/" + proyecto.codigo + ".jpg",
        "data-action": "zoom"
    });
    var datos = crearDatos(proyecto);

    celda.append(image);
    celda.append(datos);
    padre.append(celda);
}
function crearProyectos(lista) {
    if (lista.length == 0) {
        $("#padre").html("No se encontraron resultados.");
    }
    for (proyecto of lista) {
        crearCelda(proyecto);

    }
}
function crearMenu() {
    $("#mimenu").html(`<ul class="u-nav u-popupmenu-items u-unstyled u-nav-2">
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="index.html">Inicio</a>
    </li>
    <li class="u-nav-item">Carreras</li>
    </ul>
    <ul class="u-nav u-popupmenu-items u-unstyled u-nav-2 u-padding-left">
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="proyectos.html?sigla=emd" title="Electromedicina">Electromedicina</a>
    </li>
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="proyectos.html?sigla=ccc" title="Construcción Civil">Construcción Civil</a>
    </li>
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="proyectos.html?sigla=emc" title="Electromecánica">Electromecánica</a>
    </li>
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="proyectos.html?sigla=iin" title="Informática Industrial">Informática Industrial</a>
    </li>
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="proyectos.html?sigla=gpp" title="Gas, Petróleo y Procesos">Gas, Petróleo y Procesos</a>
    </li>
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="proyectos.html?sigla=itc" title="Industria Textil y Confección">Industria Textil y Confección</a>
    </li>
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="proyectos.html?sigla=msf" title="Metalurgia, Siderurgia y Fundición">Metalurgia, Siderurgia y Fundición</a>
    </li>
    </ul>
    <ul class="u-nav u-popupmenu-items u-unstyled u-nav-2">
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="http://itibb.edu.bo/">Contáctanos</a>
    </li>
    </ul>
    `);
}
function seleccionarCarreras(sigla) {
    var resultado = [];
    for (const [key, value] of Object.entries(siglas)) {
        if (value == sigla) resultado.push(key);
    }
    return resultado;
}
function modificarTitulo(carreras, sigla) {
    var nombre = carreras[0];
    for (carrera of carreras) {
        if (carrera.length > nombre.length)
            nombre = carrera;
    }
    $("#titulo").html('<img src="./img/' + sigla + 'logo.png" width="100px">' + nombre);
}
function contiene(proyecto, string) {
    for (const [key, value] of Object.entries(proyecto)) {
        var valor = limpiar(value);
        if (valor.toLowerCase().includes(string)) {
            return true;
        }
    }
    return false;
}
function buscar(lista, string) {
    $("#search").val(string);
    var resultado = [];
    string = limpiar(string).toLowerCase();
    for (proyecto of lista)
        if (contiene(proyecto, string))
            resultado.push(proyecto);
    return resultado;

}
function seleccionarProyectos(jsondata) {
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);
    var sigla = params.get("sigla");
    var busca = params.get("busca");
    if (busca != null) {
        $("#titulo").html("");
        return buscar(jsondata, busca);
    }
    if (sigla == null) {
        $("#titulo").html("");
        return jsondata;
    }
    var carreras = seleccionarCarreras(sigla);
    modificarTitulo(carreras, sigla);
    var resultado = [];

    for (proyecto of jsondata) {
        for (carrera of carreras) {
            carrera = limpiar(carrera);
            if (limpiar(proyecto.carrera) == carrera)
                resultado.push(proyecto);
        }
    }
    return resultado;
}
function agregarEventosBuscador() {
    $("#search").keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            var url = new URL(window.location);
            url.searchParams.set('busca', $("#search").val());
            window.location = url.href;
            return false;
        }
    });
}
$(function () {
    crearMenu();
    agregarEventosBuscador();
    var proyectos = fetch('./json/base.json')
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            proyectos = seleccionarProyectos(jsondata);
            crearProyectos(proyectos);
        });
});








var proyectos = [];
function crearCelda(proyecto) {
    var padre = $("#padre");
    var celda = $("<div>");
    var image = $("<img>", {
        "src": "./img/fichas/" + proyecto.codigo + ".png",
        "data-action": "zoom"
    });
    var title = $("<h3>");
    title.text(proyecto.titulo_proyecto);
    celda.append(image);
    //celda.append(title);
    padre.append(celda);
}
function crearProyectos(lista) {

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
    href="emd.html" title="Electromedicina">Electromedicina</a>
    </li>
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="ccc.html" title="Construcción Civil">Construcción Civil</a>
    </li>
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="emc.html" title="Electromecánica">Electromecánica</a>
    </li>
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="iin.html" title="Informática Industrial">Informática Industrial</a>
    </li>
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="gpp.html" title="Gas, Petróleo y Procesos">Gas, Petróleo y Procesos</a>
    </li>
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="itc.html" title="Industria Textil y Confección">Industria Textil y Confección</a>
    </li>
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="msf.html" title="Metalurgia, Siderurgia y Fundición">Metalurgia, Siderurgia y Fundición</a>
    </li>
    </ul>
    <ul class="u-nav u-popupmenu-items u-unstyled u-nav-2">
    <li class="u-nav-item"><a class="u-button-style u-nav-link active"
    href="http://itibb.edu.bo/">Contáctanos</a>
    </li>
    </ul>
    `);
}
$(function () {
    crearMenu();
    var proyectos = fetch('./json/base.json')
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            proyectos = jsondata;
            crearProyectos(proyectos);
        });
});








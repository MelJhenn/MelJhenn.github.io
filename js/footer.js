$(function () {
   $("#mifooter").addClass("u-align-center u-clearfix u-footer u-grey-80 u-footer").html(`
    <div class="about">
      <div>
         <p class="title-about">Acerca de Nosotros</p>
         <p>
            Instituto Tecnológico Industrial Brasil Bolivia, al servicio de la población Boliviana. <br>
            © Copyright 2023 - Todos los derechos reservados.
         </p>
      </div>
      <div>
         <ul class="socials-wrapper">
            <li><a href="https://www.facebook.com/InstitutoTecnologicoIndustrialBrasilBolivia" target="_blank"><img src="../img/facebook.svg" alt="facebook logo" draggable="false"></a></li>
            <li><a href="https://www.instagram.com" target="_blank"><img src="../img/instagram.svg" alt="instagram logo" draggable="false"></a></li>
         </ul>
      </div>
    </div>
          `);
});

function enviarformulario() {
   var name = $("#nombre").val();
   var email = $("#correo").val();
   var message = $("#mensaje").val();
   if (name.length == 0 || email.length == 0 || message.length == 0)
      return alert("LLene todos los espacios correctamente");
   var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
   if (validEmail.test(email)) {
      const url = new URL('https://api.whatsapp.com/send?')
      url.searchParams.append('phone', '59170635546')
      url.searchParams.append('text', 'hola mi nombre es: ' + name + '\nmi correo es: ' + email + '\n \n' + message);
      var win = window.open(url.href, '_blank');
      win.focus();
      $("#messageok").show();
      setTimeout(function () {
         $("#messageok").fadeOut(1500);
      }, 3000);
   } else {
      alert('Correo electrónico invalido');
   }
}






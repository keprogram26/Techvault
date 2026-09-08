document.addEventListener("DOMContentLoaded", function () {

    const boton = document.getElementById("botonTelegram");

    const TELEGRAM_USUARIO = "USUARIO_TELEGRAM";

    boton.addEventListener("click", function () {

        if (TELEGRAM_USUARIO === "USUARIO_TELEGRAM") {
            alert(
                "El asistente de Telegram todavía está en configuración."
            );
            return;
        }

        window.location.href =
            "https://t.me/" + TELEGRAM_USUARIO;
    });

});
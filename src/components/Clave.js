import React from 'react';

function Clave() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el envío del formulario
    const email = document.getElementById('email').value;
    const messageElement = document.getElementById('message');

    // Simulamos el envío exitoso del enlace de restauración de contraseña
    messageElement.textContent = `Se ha enviado un enlace de restauración de contraseña a ${email}.`;

    // Limpiamos el campo de correo
    document.getElementById('email').value = '';
  };

  return (
    <div className="outer-container">
      <div className="password-reset-container">
        <h1 className='Titulo-Principal' >SENA</h1>
        <p className="subtitle">¿Desea recuperar su contraseña?</p>
        <p className="instructions">
          Para recuperar su cuenta, escriba su correo electrónico institucional.
        </p>
        <p id="message" className="message"></p>
        <form id="passwordResetForm" onSubmit={handleSubmit}>
  <div className="form-group">
    <label className='titulo-correo' htmlFor="email">Correo Electrónico Institucional</label>
    <input className='Texto-cuadro'
      type="email"
      id="email"
      placeholder="Correo Institucional"
      required
    />
    {/* Texto de ejemplo debajo del input */}
   
  </div>
  <button type="submit" className="btn-submit">
    Enviar Enlace de Restauración
  </button>
</form>

      </div>
    </div>
  );
}

export default Clave;

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Librería de íconos

function CambiarClave() {
  const [oldPassword, setOldPassword] = useState(''); // Nuevo estado para la contraseña anterior
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña anterior
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la nueva contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      setMessage('La contraseña ha sido cambiada exitosamente.');
      // Aquí podrías hacer una petición al backend para actualizar la contraseña.
    } else {
      setMessage('Las contraseñas no coinciden. Inténtelo nuevamente.');
    }

    // Limpiar los campos de contraseña
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  };

  // Alternar la visibilidad de las contraseñas
  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container-form-cambio-clave">
      <div className="caja-form">
        <h1 className="titulo-principal">SENA</h1>
        <p className="subtitulo-clave">Cambiar Contraseña</p>
        <p className="text-clave">Por favor, ingrese su contraseña anterior y su nueva contraseña y confírmela.</p>
        <p id="message" className="mensaje-texto">{message}</p>
        <form id="passwordChangeForm" onSubmit={handleSubmit}>

          {/* Campo de Contraseña Anterior */}
          <div className="form-group">
            <label className="label-clave" htmlFor="oldPassword">Contraseña Anterior</label>
            <div className="input-contenedor">
              <input
                className="input-clave"
                type={showOldPassword ? 'text' : 'password'} // Cambia entre 'text' y 'password'
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <span className="icon-eye" onClick={toggleShowOldPassword}>
                {showOldPassword ? <FaEyeSlash /> : <FaEye />} {/* Ícono de ojo */}
              </span>
            </div>
          </div>

          {/* Campo de Nueva Contraseña */}
          <div className="form-group">
            <label className="label-clave" htmlFor="password">Nueva Contraseña</label>
            <div className="input-contenedor">
              <input
                className="input-clave"
                type={showPassword ? 'text' : 'password'} // Cambia entre 'text' y 'password'
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="icon-eye" onClick={toggleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Ícono de ojo */}
              </span>
            </div>
          </div>

          {/* Campo de Confirmar Contraseña */}
          <div className="form-group">
            <label className="label-clave" htmlFor="confirmPassword">Confirmar Contraseña</label>
            <div className="input-contenedor">
              <input
                className="input-clave"
                type={showConfirmPassword ? 'text' : 'password'} // Cambia entre 'text' y 'password'
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="icon-eye" onClick={toggleShowConfirmPassword}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Ícono de ojo */}
              </span>
            </div>
          </div>

          <button type="submit" className="boton-cambiar-clave">Cambiar Contraseña</button>
        </form>
      </div>
    </div>
  );
}

export default CambiarClave;

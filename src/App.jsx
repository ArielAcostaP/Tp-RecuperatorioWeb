import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

export default function App() {
  const form = useRef();
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const enviarEmail = (e) => {
    e.preventDefault();
    setCargando(true);

    const SERVICE_ID = 'service_zljxmen';
    const TEMPLATE_ID = 'template_4vhet4u'; 
    const PUBLIC_KEY = 'U1-Rf2N7mRYMt-iQh';   

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        (result) => {
          console.log('Mensaje enviado:', result.text);
          setEnviado(true);
          setCargando(false);
          form.current.reset();
        },
        (error) => {
          console.error('Error al enviar:', error.text);
          alert('Error al enviar el mensaje. Revisa las claves de EmailJS.');
          setCargando(false);
        }
      );
  };

  return (
    <div className="contenedor-principal">
      <header className="encabezado">
        <h1>Universidad UPATECO</h1>
        <p>Contacto y Ubicación Institucional</p>
      </header>

      <main className="contenido-contacto">
        <section className="seccion-formulario">
          <h2>Envíanos tu Consulta</h2>
          {enviado && (
            <div className="mensaje-exito">
              ¡Tu mensaje ha sido enviado con éxito! Te responderemos a la brevedad.
            </div>
          )}
          
          <form ref={form} onSubmit={enviarEmail} className="formulario-contacto">
            <div className="campo">
              <label htmlFor="user_name">Nombre Completo:</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                placeholder="Ej: Jorge Acosta"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="user_email">Correo Electrónico:</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                placeholder="acostajorgeariel@gmail.com"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="message">Mensaje:</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Escribe tu mensaje aquí..."
                required
              ></textarea>
            </div>

            <button type="submit" disabled={cargando} className="boton-enviar">
              {cargando ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </section>

        <section className="seccion-mapa">
          <h2>Nuestra Ubicación</h2>
          <div className="contenedor-mapa">
            <iframe
              title="Ubicación Universidad UPATECO"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.670355448651!2d-65.41097222374668!3d-24.77250494862483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc391f63080d5%3A0xb3fc784e1b2195f4!2sUPaTeCo%20-%20Universidad%20Provincial%20de%20Administraci%C3%B3n%2C%20Tecnolog%C3%ADa%20y%20Oficios!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p className="direccion-texto">
            📍 Av. Pereyra Rozas 550, Salta, Argentina.
          </p>
        </section>
      </main>

      <footer className="pie-pagina">
        <p>Programación Web II - Recuperatorio TP Final 2026</p>
      </footer>
    </div>
  );
}
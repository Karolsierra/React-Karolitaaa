import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { getProgramacionesPorFicha } from '../api/api';
import axios from 'axios'; // Asegúrate de tener axios instalado

function Calendariomain() {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [profesion, setProfesion] = useState(''); // Campo de texto para Profesión
  const [selectedCoordinacion, setSelectedCoordinacion] = useState(null);
  const [fichaOptions, setFichaOptions] = useState([]);

  const coordinacionOptions = [
    { value: 'Coordinacion A', label: 'Tele-Informatica' },
    { value: 'Coordinacion B', label: 'Tele-Comunicaciones' },
    { value: 'Coordinacion C', label: 'Recursos-Humanos' },
    { value: 'Coordinacion D', label: 'Comunicacion' }
  ];

  // Cargar las opciones de ficha desde el servidor
  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const response = await axios.get('http://localhost:7777/api/ficha');
        const options = response.data.map(ficha => ({
          value: ficha.numero_Ficha,
          label: ficha.numero_Ficha
        }));
        setFichaOptions(options);
      } catch (error) {
        console.error("Error al obtener las fichas:", error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar las fichas.',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      }
    };

    fetchFichas();
  }, []);

  const generateDaysArray = (year, month, events) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toISOString().split('T')[0];
      const event = events.find(e => e.fecha === dateStr);
      daysArray.push({
        day: i,
        dateStr: dateStr,
        hasEvent: !!event,
      });
    }

    return daysArray;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFicha) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor seleccione una ficha y una coordinación.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
      return;
    }

    const ficha = selectedFicha.value;

    try {
      const response = await getProgramacionesPorFicha(ficha);
      console.log("Response de API:", response);

      const uniqueEvents = [];
      const seen = new Set();

      response.forEach(item => {
        Object.values(item).forEach(event => {
          const key = `${event.fecha_procaptall}-${event.nombre_Taller}`;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueEvents.push({
              sede_procaptall: event.sede_procaptall,
              descripcion_procaptall: event.descripcion_procaptall,
              ambiente_procaptall: event.ambiente_procaptall,
              fecha: event.fecha_procaptall.split('T')[0],
              horaInicio_procaptall: event.horaInicio_procaptall,
              horaFin_procaptall: event.horaFin_procaptall,
              numero_FichaFK: event.numero_FichaFK,
              nombre_Taller: event.nombre_Taller,
              nombre_Capacitador: event.nombre_Capacitador,
            });
          }
        });
      });

      console.log("Eventos únicos mapeados:", uniqueEvents);
      setEvents(uniqueEvents);

      const daysArray = generateDaysArray(currentYear, currentMonth, uniqueEvents);
      setDaysInMonth(daysArray);
      setCalendarVisible(true);
    } catch (error) {
      console.error("Error al obtener programaciones:", error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo obtener la programación.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
  };

  const handleDayClick = (dateStr) => {
    const dailyEvents = events.filter(e => e.fecha === dateStr);
    if (dailyEvents.length > 0) {
      const eventDetails = dailyEvents.map(e =>
        `<div style="text-align: left;">
          <strong>Taller:</strong> ${e.nombre_Taller}<br>
          <strong>Capacitador:</strong> ${e.nombre_Capacitador}<br>
          <strong>Descripción:</strong> ${e.descripcion_procaptall}<br>
          <strong>Sede:</strong> ${e.sede_procaptall}<br>
          <strong>Ambiente:</strong> ${e.ambiente_procaptall}<br>
          <strong>Fecha:</strong> ${e.fecha}<br>
          <strong>Hora Inicio:</strong> ${e.horaInicio_procaptall}<br>
          <strong>Hora Fin:</strong> ${e.horaFin_procaptall}
        </div>`).join('<hr/>');

      Swal.fire({
        title: `Programación para ${dateStr}`,
        html: eventDetails,
        confirmButtonText: 'Cerrar',
      });
    } else {
      Swal.fire({
        title: 'Sin Programación',
        text: 'No hay eventos programados para este día.',
        icon: 'info',
        confirmButtonText: 'Cerrar',
      });
    }
  };

  return (
    <main>
      <div>
      <p className="instrucciones-busqueda">Ingrese los datos necesarios para buscar el calendario.</p> 
      </div>

      <div className="form-container-calendariousua">
        <h2 className="Titulo-calendariousua">Seleccione Ficha, Profesión y Coordinación</h2>
        <form id="selection-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <div className="field-item">
              <label className="label-ficha-calendariousua" htmlFor="ficha">Ficha:</label>
              <Select
                className="input-calendariousua ficha-small"
                id="ficha"
                name="ficha"
                options={fichaOptions}
                value={selectedFicha}
                onChange={setSelectedFicha}
                isClearable
                placeholder="Seleccione una ficha..."
              />
            </div>

            <div className="field-item">
              <label className="label-profesion-calendariousua" htmlFor="profesion">Profesión:</label>
              <div className='profesion-coordinacion'>
                coordinacion
              </div>
            </div>
          </div>

          <label className="label-coordinacion-calendariousua" htmlFor="coordinacion">Coordinación:</label>
          <div className='profesion-coordinacion'>
            coordinacion
          </div>

          <button className="boton-calendarioUsuario" type="submit">Mostrar Calendario</button>
        </form>
      </div>
      {calendarVisible && (
        <div className="calendar-container">
          <div className="calendar-grid">
            {daysInMonth.map(day => (
              <div
                key={day.dateStr}
                className={`calendar-day ${day.hasEvent ? 'event' : ''}`}
                onClick={() => handleDayClick(day.dateStr)}
              >
                {day.day}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Calendariomain;

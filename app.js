/**
 * Pozuelo Talent Assessment
 * Archivo: app.js (Consolidado: Selección + Entrevistas de Salida)
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
  // GESTIÓN DE ACCESO POR CÓDIGO DE EVALUADOR
  // =========================================================================
  const modalLogin = document.getElementById('modalLoginEvaluador');
  const inputCodigo = document.getElementById('inputCodigoEvaluador');
  const errorLogin = document.getElementById('errorLoginEvaluador');
  const btnConfirmar = document.getElementById('btnConfirmarCodigo');
  const btnCambiar = document.getElementById('btnCambiarEvaluador');

  function cargarEvaluadorActivo() {
    const sesionGuardada = localStorage.getItem('evaluadorActivoPozuelo');
    if (sesionGuardada) {
      const data = JSON.parse(sesionGuardada);
      aplicarPerfilEvaluador(data);
    } else {
      abrirModalLogin();
    }
  }

  function abrirModalLogin() {
    if (modalLogin) {
      modalLogin.classList.remove('hidden');
      errorLogin?.classList.add('hidden');
      if (inputCodigo) {
        inputCodigo.value = '';
        setTimeout(() => inputCodigo.focus(), 150);
      }
    }
  }

  function aplicarPerfilEvaluador(evaluador) {
    document.getElementById('avatarEvaluador').textContent = evaluador.iniciales;
    document.getElementById('nombreEvaluador').textContent = evaluador.nombre;
    document.getElementById('rolEvaluador').textContent = evaluador.rol;
    localStorage.setItem('evaluadorActivoPozuelo', JSON.stringify(evaluador));
    modalLogin?.classList.add('hidden');
  }

  function validarCodigo() {
    const codIngresado = inputCodigo.value.trim();
    const lista = BANCO_DATOS.evaluadores || [];
    const match = lista.find(e => e.codigo === codIngresado);

    if (match) {
      aplicarPerfilEvaluador(match);
    } else {
      errorLogin?.classList.remove('hidden');
    }
  }

  btnConfirmar?.addEventListener('click', validarCodigo);
  inputCodigo?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') validarCodigo();
  });

  btnCambiar?.addEventListener('click', abrirModalLogin);

  // Inicializar verificación de perfil al cargar
  cargarEvaluadorActivo();
  // =========================================================================
  // 1. ESTADO GLOBAL DE LA SESIÓN
  // =========================================================================
  const estado = {
    moduloActual: 'hub',
    // Selección
    candidato: '',
    requisicion: '',
    areaGestion: 'Operaciones',
    tipoIngreso: 'Nuevo ingreso',
    nivelPuesto: 'operativo',
    evaluaciones: {},
    preguntaAdicional: { activa: false, texto: '', calificacion: 1.0, notas: '' },
    // Salida
    salida: {
      compania: '',
      cedula: '',
      colaborador: '',
      cargo: '',
      jefatura: '',
      antiguedadEmpresa: '',
      antiguedadPuesto: '',
      motivo: '',
      fortalezas: [],
      expPositiva: '',
      expNegativa: '',
      calificacionesMatriz: {}, // { factorId: 1..5 }
      feedbackLider: '',
      cumplioExpectativas: '',
      enps: '',
      sugerenciaMejora: '',
      notasEntrevistador: ''
    }
  };

  // Referencias principales del DOM
  const seccionHub = document.getElementById('seccionHub');
  const seccionEncuadre = document.getElementById('seccionEncuadre');
  const seccionEvaluacion = document.getElementById('seccionEvaluacion');
  const seccionResultado = document.getElementById('seccionResultado');
  const seccionSalida = document.getElementById('seccionSalida');
  const contenedorEtapasSeleccion = document.getElementById('contenedorEtapasSeleccion');
  const contenedorKpiSalida = document.getElementById('contenedorKpiSalida');

  // =========================================================================
  // 2. COPILOT FLOTANTE (DRAWER)
  // =========================================================================
  const copilotDrawer = document.getElementById('copilotDrawer');
  const btnToggleCopilot = document.getElementById('btnToggleCopilot');
  const btnCerrarCopilot = document.getElementById('btnCerrarCopilot');

  function abrirCopilot() {
    copilotDrawer?.classList.remove('translate-x-full');
  }

  function cerrarCopilot() {
    copilotDrawer?.classList.add('translate-x-full');
  }

  btnToggleCopilot?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (copilotDrawer?.classList.contains('translate-x-full')) {
      abrirCopilot();
    } else {
      cerrarCopilot();
    }
  });

  btnCerrarCopilot?.addEventListener('click', cerrarCopilot);

  // =========================================================================
  // 3. NAVEGACIÓN DESDE EL HUB INICIAL
  // =========================================================================
  document.getElementById('btnModuloSeleccion')?.addEventListener('click', () => {
    estado.moduloActual = 'seleccion';
    seccionHub?.classList.add('hidden');
    seccionEncuadre?.classList.remove('hidden');
    contenedorEtapasSeleccion?.classList.remove('hidden');
    contenedorKpiSalida?.classList.add('hidden');

    document.getElementById('resumenModulo').textContent = 'Entrevista Selección';
    document.getElementById('resumenRQ').textContent = 'Configurando...';
    actualizarBarraEtapas(1);
    if (window.lucide) lucide.createIcons();
  });

  // DISPARADOR DE SALIDA (Abre la vista y carga los datos de bancoDatos.js)
  document.getElementById('btnModuloSalida')?.addEventListener('click', () => {
    estado.moduloActual = 'salida';
    seccionHub?.classList.add('hidden');
    seccionSalida?.classList.remove('hidden');
    contenedorEtapasSeleccion?.classList.add('hidden');
    contenedorKpiSalida?.classList.remove('hidden');

    document.getElementById('resumenModulo').textContent = 'Entrevista de Salida';
    document.getElementById('resumenRQ').textContent = 'N/A - Salida';
    document.getElementById('resumenCandidato').textContent = 'Colaborador por definir';
    document.getElementById('resumenNivel').textContent = 'Registro de Egreso';

    inicializarModuloSalida();
    if (window.lucide) lucide.createIcons();
  });

  document.getElementById('btnVolverHubGlobal')?.addEventListener('click', () => {
    seccionEncuadre?.classList.add('hidden');
    seccionEvaluacion?.classList.add('hidden');
    seccionResultado?.classList.add('hidden');
    seccionSalida?.classList.add('hidden');
    contenedorEtapasSeleccion?.classList.add('hidden');
    contenedorKpiSalida?.classList.add('hidden');
    seccionHub?.classList.remove('hidden');

    estado.moduloActual = 'hub';
    document.getElementById('resumenModulo').textContent = 'Hub Principal';
    document.getElementById('resumenRQ').textContent = 'Sin seleccionar';
    document.getElementById('resumenCandidato').textContent = 'Por definir';
    document.getElementById('resumenNivel').textContent = 'N/A';
    cerrarCopilot();
  });

  // =========================================================================
  // 4. PARÁMETROS DE SELECCIÓN (5 PASOS)
  // =========================================================================
  const contenedorPasos = document.getElementById('contenedorPasosEncuadre');
  if (contenedorPasos && typeof BANCO_DATOS !== 'undefined' && BANCO_DATOS.pasosEncuadre) {
    contenedorPasos.innerHTML = BANCO_DATOS.pasosEncuadre.map(p => `
      <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2">
        <div>
          <span class="text-[10px] font-black uppercase text-red-600 tracking-wider">Paso ${p.paso}</span>
          <h4 class="text-xs font-bold text-slate-800 mt-1 leading-snug">${p.titulo}</h4>
        </div>
        <p class="text-[11px] text-slate-500 leading-relaxed">${p.descripcion}</p>
      </div>
    `).join('');
  }

  const inputCandidato = document.getElementById('inputCandidato');
  const selectRequisicion = document.getElementById('selectRequisicion');
  const selectAreaGestion = document.getElementById('selectAreaGestion');
  const selectNivelPuesto = document.getElementById('selectNivelPuesto');

  inputCandidato?.addEventListener('input', (e) => {
    estado.candidato = e.target.value.trim();
    document.getElementById('resumenCandidato').textContent = estado.candidato || 'Por definir';
  });

  selectRequisicion?.addEventListener('change', (e) => {
    estado.requisicion = e.target.value;
    document.getElementById('resumenRQ').textContent = estado.requisicion || 'Sin seleccionar';
  });

  selectAreaGestion?.addEventListener('change', (e) => {
    estado.areaGestion = e.target.value;
    actualizarFichaNivel();
  });

  selectNivelPuesto?.addEventListener('change', (e) => {
    estado.nivelPuesto = e.target.value;
    actualizarFichaNivel();
  });

  function actualizarFichaNivel() {
    const nombresNivel = {
      operativo: 'Nivel 1: Operativo',
      tactico: 'Nivel 2: Táctico',
      tactico_cargo: 'Nivel 3: Táctico c/c',
      estrategico: 'Nivel 4: Estratégico'
    };
    const etiqueta = nombresNivel[estado.nivelPuesto] || 'Nivel 1';
    document.getElementById('resumenNivel').textContent = `${estado.areaGestion} • ${etiqueta}`;
  }

  document.querySelectorAll('.btn-tipo-ingreso').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-tipo-ingreso').forEach(b => {
        b.classList.remove('bg-red-600', 'text-white', 'border-red-600', 'active-selector');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-300');
      });
      btn.classList.add('bg-red-600', 'text-white', 'border-red-600', 'active-selector');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-300');
      estado.tipoIngreso = btn.getAttribute('data-tipo-ingreso') || 'Nuevo ingreso';
    });
  });

  document.getElementById('btnIniciarEvaluacion')?.addEventListener('click', () => {
    if (!estado.requisicion || !estado.candidato) {
      alert('Por favor complete el Número de Requisición y el Nombre del Candidato(a).');
      return;
    }

    document.getElementById('badgeCandidatoActivo').textContent = estado.candidato;
    document.getElementById('badgeNivelActivo').textContent = `${estado.areaGestion} • ${selectNivelPuesto.options[selectNivelPuesto.selectedIndex].text}`;

    generarTarjetasEvaluacion();

    seccionEncuadre?.classList.add('hidden');
    seccionEvaluacion?.classList.remove('hidden');
    actualizarBarraEtapas(2);
    if (window.lucide) lucide.createIcons();
  });

  function generarTarjetasEvaluacion() {
    const contenedor = document.getElementById('contenedorPreguntasActivas');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    estado.evaluaciones = {};

    let contador = 1;
    const nivelData = BANCO_DATOS.potencialLiderazgo[estado.nivelPuesto];

    if (nivelData && nivelData.competencias) {
      nivelData.competencias.forEach(comp => {
        const idUnico = `F_${comp.id}`;
        contenedor.appendChild(crearTarjetaFija(comp, contador++, 'Potencial de Liderazgo', idUnico));
      });
    }

    for (let i = 1; i <= 3; i++) {
      const idUnico = `D_SOCIO_${i}`;
      contenedor.appendChild(crearTarjetaDinamica(BANCO_DATOS.habilidadesSocioemocionales, contador++, 'Habilidad Socioemocional', idUnico, 'socioemocional'));
    }

    if (estado.nivelPuesto === 'tactico_cargo' || estado.nivelPuesto === 'estrategico') {
      for (let i = 1; i <= 3; i++) {
        const idUnico = `D_LIDER_${i}`;
        contenedor.appendChild(crearTarjetaDinamica(BANCO_DATOS.estilosLiderazgo, contador++, 'Estilo de Liderazgo', idUnico, 'estiloliderazgo'));
      }
    }

    document.getElementById('indicadorProgreso').textContent = `${contador - 1} tarjetas activas`;
  }

  function crearTarjetaFija(item, numero, categoria, idUnico) {
    const div = document.createElement('div');
    div.className = 'bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4';
    estado.evaluaciones[idUnico] = { calificacion: 1.0, notas: '', valida: false };

    div.innerHTML = `
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span class="text-[10px] font-black uppercase text-red-600 tracking-wider">${categoria} • Pregunta ${numero}</span>
          <h3 class="text-sm font-bold text-slate-800">${item.competencia}</h3>
        </div>
      </div>
      <div>
        <label class="block text-xs font-bold text-slate-600 mb-1">Seleccione la pregunta formulada (1 de 2): *</label>
        <select class="w-full text-xs font-medium border border-slate-300 rounded-xl p-2.5 bg-white select-pregunta focus:ring-2 focus:ring-red-500" data-id="${idUnico}">
          <option value="" disabled selected>Seleccione la pregunta a evaluar...</option>
          ${item.preguntas.map((p, idx) => `<option value="${idx}">${idx + 1}. ${p}</option>`).join('')}
        </select>
      </div>
      ${generarBloqueRespuesta(idUnico)}
    `;
    asignarEventosTarjeta(div, idUnico);
    return div;
  }

  function crearTarjetaDinamica(bancoOpciones, numero, categoria, idUnico, grupoFiltro) {
    const div = document.createElement('div');
    div.className = 'bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4 tarjeta-dinamica';
    div.dataset.grupo = grupoFiltro;

    estado.evaluaciones[idUnico] = { calificacion: 1.0, notas: '', valida: false, idCompetenciaSeleccionada: null };

    div.innerHTML = `
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <div class="w-full">
          <span class="text-[10px] font-black uppercase text-slate-500 tracking-wider">${categoria} • Competencia ${numero}</span>
          <select class="block w-full mt-1.5 text-xs font-bold text-slate-800 border border-slate-300 bg-slate-50 rounded-xl p-2.5 focus:ring-2 focus:ring-red-500 selector-competencia" data-id="${idUnico}">
            <option value="" disabled selected>Seleccione la competencia a evaluar en este bloque...</option>
            ${bancoOpciones.map(opt => `<option value="${opt.id}">${opt.competencia}</option>`).join('')}
          </select>
        </div>
      </div>
      
      <div class="contenido-oculto hidden space-y-4 pt-2">
        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1">Seleccione la pregunta formulada (1 de 2): *</label>
          <select class="w-full text-xs font-medium border border-slate-300 rounded-xl p-2.5 bg-white select-pregunta focus:ring-2 focus:ring-red-500" data-id="${idUnico}">
          </select>
        </div>
        ${generarBloqueRespuesta(idUnico)}
      </div>
    `;

    const selectCompetencia = div.querySelector('.selector-competencia');
    selectCompetencia?.addEventListener('change', (e) => {
      const idComp = e.target.value;
      const compData = bancoOpciones.find(c => c.id === idComp);
      estado.evaluaciones[idUnico].idCompetenciaSeleccionada = idComp;
      estado.evaluaciones[idUnico].valida = false;

      div.querySelector('.contenido-oculto')?.classList.remove('hidden');

      const selectPreg = div.querySelector('.select-pregunta');
      if (selectPreg && compData) {
        selectPreg.innerHTML = `
          <option value="" disabled selected>Seleccione la pregunta a evaluar...</option>
          ${compData.preguntas.map((p, idx) => `<option value="${idx}">${idx + 1}. ${p}</option>`).join('')}
        `;
      }

      actualizarFiltrosDinamicos(grupoFiltro);
    });

    asignarEventosTarjeta(div, idUnico);
    return div;
  }

  function generarBloqueRespuesta(idUnico) {
    return `
      <div>
        <label class="block text-xs font-bold text-slate-600 mb-1">Notas de respuesta y evidencias observadas (Metodología STAR):</label>
        <textarea rows="2" placeholder="Describa situación, tarea, acciones directas del candidato y resultados obtenidos..." 
          class="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 textarea-notas" data-id="${idUnico}"></textarea>
      </div>
      <div class="flex items-center justify-between pt-2">
        <span class="text-xs font-bold text-slate-700">Calificación de cumplimiento:</span>
        <div class="flex gap-2">
          ${[
            { val: 1.25, label: 'Supera (1.25)' },
            { val: 1.00, label: 'Cumple (1.00)' },
            { val: 0.50, label: 'Parcial (0.50)' },
            { val: 0.00, label: 'No cumple' }
          ].map(opt => `
            <button type="button" class="btn-calif px-3 py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${opt.val === 1.0 ? 'bg-red-600 text-white border-red-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}"
              data-id="${idUnico}" data-val="${opt.val}">${opt.label}</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function asignarEventosTarjeta(tarjetaDOM, idUnico) {
    tarjetaDOM.querySelector('.select-pregunta')?.addEventListener('change', () => {
      estado.evaluaciones[idUnico].valida = true;
    });

    const textarea = tarjetaDOM.querySelector('.textarea-notas');
    textarea?.addEventListener('input', (e) => {
      estado.evaluaciones[idUnico].notas = e.target.value;
      escanearTextoArticulo404(e.target.value);
    });

    tarjetaDOM.querySelectorAll('.btn-calif').forEach(btn => {
      btn.addEventListener('click', () => {
        tarjetaDOM.querySelectorAll('.btn-calif').forEach(b => {
          b.className = 'btn-calif px-3 py-1.5 text-[11px] font-bold rounded-lg border bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 cursor-pointer';
        });
        btn.className = 'btn-calif px-3 py-1.5 text-[11px] font-bold rounded-lg border bg-red-600 text-white border-red-600 cursor-pointer';
        estado.evaluaciones[idUnico].calificacion = parseFloat(btn.getAttribute('data-val') || '1.0');
      });
    });
  }

  function actualizarFiltrosDinamicos(grupoFiltro) {
    const tarjetas = document.querySelectorAll(`.tarjeta-dinamica[data-grupo="${grupoFiltro}"]`);
    const seleccionadas = [];

    tarjetas.forEach(t => {
      const sel = t.querySelector('.selector-competencia');
      if (sel && sel.value) seleccionadas.push(sel.value);
    });

    tarjetas.forEach(t => {
      const sel = t.querySelector('.selector-competencia');
      if (!sel) return;
      Array.from(sel.options).forEach(opt => {
        if (!opt.value) return;
        if (seleccionadas.includes(opt.value) && sel.value !== opt.value) {
          opt.disabled = true;
          opt.text = opt.text.replace(' (Ya seleccionada)', '') + ' (Ya seleccionada)';
        } else {
          opt.disabled = false;
          opt.text = opt.text.replace(' (Ya seleccionada)', '');
        }
      });
    });
  }

  // =========================================================================
  // 5. PREGUNTA ADICIONAL Y ART. 404
  // =========================================================================
  const btnPreguntaSi = document.getElementById('btnPreguntaAdicionalSi');
  const btnPreguntaNo = document.getElementById('btnPreguntaAdicionalNo');
  const camposAdicionales = document.getElementById('camposPreguntaAdicional');

  btnPreguntaSi?.addEventListener('click', () => {
    estado.preguntaAdicional.activa = true;
    camposAdicionales?.classList.remove('hidden');
    btnPreguntaSi.className = 'px-4 py-2 text-xs font-bold rounded-xl border border-red-600 bg-red-600 text-white transition-all cursor-pointer';
    btnPreguntaNo.className = 'px-4 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white text-slate-700 hover:border-slate-400 transition-all cursor-pointer';
  });

  btnPreguntaNo?.addEventListener('click', () => {
    estado.preguntaAdicional.activa = false;
    camposAdicionales?.classList.add('hidden');
    btnPreguntaNo.className = 'px-4 py-2 text-xs font-bold rounded-xl border border-red-600 bg-red-600 text-white transition-all cursor-pointer';
    btnPreguntaSi.className = 'px-4 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white text-slate-700 hover:border-slate-400 transition-all cursor-pointer';
  });

  document.getElementById('selectCumplimientoAdicional')?.addEventListener('change', (e) => {
    estado.preguntaAdicional.calificacion = parseFloat(e.target.value);
  });

  function escanearTextoArticulo404(texto) {
    if (!BANCO_DATOS || !BANCO_DATOS.alertasArticulo404) return;
    const textoMin = texto.toLowerCase();
    const alertaBox = document.getElementById('alertaArticulo404Contenedor');
    const alertaTxt = document.getElementById('alertaArticulo404Texto');

    for (const regla of BANCO_DATOS.alertasArticulo404) {
      for (const palabra of regla.palabrasClave) {
        if (textoMin.includes(palabra)) {
          if (alertaBox) alertaBox.className = 'bg-red-100 rounded-2xl border border-red-300 p-4 space-y-2 animate-pulse transition-all';
          if (alertaTxt) alertaTxt.innerHTML = `<strong>⚠️ ALERTA ÉTICO-LEGAL:</strong> Se detectó el término <em>"${palabra}"</em> vinculado a <strong>${regla.tema}</strong>. Prohibido por Art. 404 del Código de Trabajo.`;
          abrirCopilot();
          return;
        }
      }
    }

    if (alertaBox) alertaBox.className = 'bg-amber-50 rounded-2xl border border-amber-200/90 p-4 space-y-2 transition-all';
    if (alertaTxt) alertaTxt.textContent = 'Monitoreo activo: Evite formular o registrar preguntas sobre estado civil, familia, salud, deudas, edad o sindicatos.';
  }

  // =========================================================================
  // 6. CÁLCULO FINAL DE SELECCIÓN (0 A 100)
  // =========================================================================
  document.getElementById('btnCalcularResultado')?.addEventListener('click', () => {
    let sumaPuntos = 0;
    let totalContestadas = 0;

    Object.values(estado.evaluaciones).forEach(item => {
      if (item.valida) {
        sumaPuntos += item.calificacion;
        totalContestadas++;
      }
    });

    if (estado.preguntaAdicional.activa) {
      sumaPuntos += estado.preguntaAdicional.calificacion;
      totalContestadas++;
    }

    if (totalContestadas === 0) {
      alert('Debe seleccionar y evaluar al menos una pregunta para generar el diagnóstico.');
      return;
    }

    const notaFinal = Math.round((sumaPuntos / (totalContestadas * 1.25)) * 100);

    document.getElementById('valorNotaFinal').textContent = notaFinal;
    asignarDiagnostico(notaFinal);

    seccionEvaluacion?.classList.add('hidden');
    seccionResultado?.classList.remove('hidden');
    actualizarBarraEtapas(3);
    cerrarCopilot();
  });

  function asignarDiagnostico(nota) {
    const badge = document.getElementById('badgeClasificacion');
    const recomendacion = document.getElementById('textoRecomendacionFinal');
    if (!badge || !recomendacion) return;

    if (nota >= 87) {
      badge.textContent = 'SOBRESALIENTE';
      badge.className = 'inline-block px-6 py-2 rounded-xl text-xs font-black tracking-widest uppercase bg-emerald-100 text-emerald-800 border border-emerald-300';
      recomendacion.textContent = 'Altamente recomendable. Candidato con evidencias sólidas y consistentes. Prioridad para la terna del líder.';
    } else if (nota >= 78) {
      badge.textContent = 'ÓPTIMO';
      badge.className = 'inline-block px-6 py-2 rounded-xl text-xs font-black tracking-widest uppercase bg-blue-100 text-blue-800 border border-blue-300';
      recomendacion.textContent = 'Recomendable. Cumple sólidamente con lo esperado para el cargo y presenta fortalezas adicionales.';
    } else if (nota >= 71) {
      badge.textContent = 'ADECUADO';
      badge.className = 'inline-block px-6 py-2 rounded-xl text-xs font-black tracking-widest uppercase bg-amber-100 text-amber-800 border border-amber-300';
      recomendacion.textContent = 'Recomendable con observaciones. Cumple con el nivel esperado, pero se aconseja validar brechas puntuales con el líder.';
    } else if (nota >= 61) {
      badge.textContent = 'CON RESERVAS';
      badge.className = 'inline-block px-6 py-2 rounded-xl text-xs font-black tracking-widest uppercase bg-orange-100 text-orange-800 border border-orange-300';
      recomendacion.textContent = 'Continuidad condicionada. Presenta brechas que podrían afectar su adaptación. Validar con Gestión Humana.';
    } else {
      badge.textContent = 'BAJA ADECUACIÓN';
      badge.className = 'inline-block px-6 py-2 rounded-xl text-xs font-black tracking-widest uppercase bg-rose-100 text-rose-800 border border-rose-300';
      recomendacion.textContent = 'No recomendable para la posición actual. Considerar para otros perfiles que se ajusten mejor a sus fortalezas.';
    }
  }

  function actualizarBarraEtapas(paso) {
    ['stepNav1', 'stepNav2', 'stepNav3'].forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (idx + 1 === paso) {
        el.className = 'flex items-center gap-3 p-2.5 rounded-xl bg-red-50 text-red-700 font-bold text-xs border border-red-200';
        const num = el.querySelector('div');
        if (num) num.className = 'w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center text-[10px]';
      } else {
        el.className = 'flex items-center gap-3 p-2.5 rounded-xl text-slate-500 font-semibold text-xs hover:bg-slate-50 transition-all';
        const num = el.querySelector('div');
        if (num) num.className = 'w-6 h-6 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]';
      }
    });
  }

  document.getElementById('btnVolverEncuadre')?.addEventListener('click', () => {
    seccionEvaluacion?.classList.add('hidden');
    seccionEncuadre?.classList.remove('hidden');
    actualizarBarraEtapas(1);
  });

  document.getElementById('btnReiniciarEntrevista')?.addEventListener('click', () => {
    window.location.reload();
  });

  // =========================================================================
  // 7. LÓGICA DEL MÓDULO DE ENTREVISTAS DE SALIDA
  // =========================================================================

  function inicializarModuloSalida() {
    const cfg = BANCO_DATOS?.entrevistaSalida;
    if (!cfg) {
      alert('Error: No se encontró el objeto "entrevistaSalida" en bancoDatos.js. Verifique el archivo.');
      return;
    }

    // A. Llenar selects demográficos
    const selCompania = document.getElementById('salidaCompania');
    if (selCompania && selCompania.options.length <= 1) {
      selCompania.innerHTML = `<option value="" disabled selected>Seleccione la compañía o filial...</option>` +
        cfg.companias.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    const selAntiguedad = document.getElementById('salidaAntiguedadEmpresa');
    if (selAntiguedad && selAntiguedad.options.length <= 1) {
      selAntiguedad.innerHTML = `<option value="" disabled selected>Antigüedad en empresa...</option>` +
        cfg.antiguedadEmpresa.map(a => `<option value="${a}">${a}</option>`).join('');
    }

    const selPuesto = document.getElementById('salidaAntiguedadPuesto');
    if (selPuesto && selPuesto.options.length <= 1) {
      selPuesto.innerHTML = `<option value="" disabled selected>Antigüedad en puesto...</option>` +
        cfg.antiguedadPuesto.map(a => `<option value="${a}">${a}</option>`).join('');
    }

    const selMotivo = document.getElementById('salidaMotivo');
    if (selMotivo && selMotivo.options.length <= 1) {
      selMotivo.innerHTML = `<option value="" disabled selected>Causa principal de egreso...</option>` +
        cfg.motivosSalida.map(m => `<option value="${m}">${m}</option>`).join('');
    }

    // Sincronizar nombre en la ficha lateral
    document.getElementById('salidaNombreColaborador')?.addEventListener('input', (e) => {
      estado.salida.colaborador = e.target.value.trim();
      document.getElementById('resumenCandidato').textContent = estado.salida.colaborador || 'Colaborador por definir';
    });

    // B. Construir Chips de Fortalezas (Límite 3)
    const contenedorChips = document.getElementById('contenedorChipsFortalezas');
    if (contenedorChips && contenedorChips.children.length === 0) {
      contenedorChips.innerHTML = cfg.fortalezasDisponibles.map(f => `
        <button type="button" class="chip-fortaleza px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold hover:border-slate-300 transition-all cursor-pointer" data-val="${f}">
          ${f}
        </button>
      `).join('');

      contenedorChips.querySelectorAll('.chip-fortaleza').forEach(chip => {
        chip.addEventListener('click', () => {
          const val = chip.getAttribute('data-val');
          const idx = estado.salida.fortalezas.indexOf(val);

          if (idx > -1) {
            estado.salida.fortalezas.splice(idx, 1);
            chip.className = 'chip-fortaleza px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold hover:border-slate-300 transition-all cursor-pointer';
          } else {
            if (estado.salida.fortalezas.length >= 3) {
              alert('Solo puede seleccionar un máximo de 3 fortalezas clave.');
              return;
            }
            estado.salida.fortalezas.push(val);
            chip.className = 'chip-fortaleza px-3.5 py-2 rounded-xl border border-emerald-500 bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm cursor-pointer';
          }

          document.getElementById('contadorFortalezas').textContent = `${estado.salida.fortalezas.length} / 3 seleccionadas`;
        });
      });
    }

    // C. Construir Matriz 1 a 5 (Acepta factoresEvaluacion o factoresEvaluacion1a5)
    const listaFactores = cfg.factoresEvaluacion || cfg.factoresEvaluacion1a5 || [];
    const contenedorMatriz = document.getElementById('contenedorMatrizSalida');
    if (contenedorMatriz && contenedorMatriz.children.length === 0 && listaFactores.length > 0) {
      contenedorMatriz.innerHTML = listaFactores.map((item, idx) => `
        <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3 fila-matriz-salida" data-id="${item.id}">
          <div class="max-w-md">
            <h4 class="text-xs font-extrabold text-slate-800">${idx + 1}. ${item.titulo}</h4>
            <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">${item.descripcion}</p>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <span class="text-[10px] text-slate-400 font-bold mr-2 hidden md:inline">1 (Bajo) → 5 (Alto)</span>
            ${[1, 2, 3, 4, 5].map(n => `
              <button type="button" class="btn-calif-matriz w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 font-extrabold text-xs hover:border-slate-400 transition-all cursor-pointer" data-factor="${item.id}" data-val="${n}">
                ${n}
              </button>
            `).join('')}
          </div>
        </div>
      `).join('');

      contenedorMatriz.querySelectorAll('.btn-calif-matriz').forEach(btn => {
        btn.addEventListener('click', () => {
          const factor = btn.getAttribute('data-factor');
          const val = parseInt(btn.getAttribute('data-val'), 10);
          const fila = btn.closest('.fila-matriz-salida');

          fila.querySelectorAll('.btn-calif-matriz').forEach(b => {
            b.className = 'btn-calif-matriz w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 font-extrabold text-xs hover:border-slate-400 transition-all cursor-pointer';
          });

          btn.className = 'btn-calif-matriz w-9 h-9 rounded-xl border border-red-600 bg-red-600 text-white font-extrabold text-xs transition-all shadow-sm cursor-pointer';
          estado.salida.calificacionesMatriz[factor] = val;
          calcularPromedioMatrizSalida();
        });
      });
    }

    // D. Botones de Expectativas y eNPS
    document.querySelectorAll('.btn-salida-expectativa').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-salida-expectativa').forEach(b => {
          b.className = 'btn-salida-expectativa py-2.5 px-3 text-xs font-bold rounded-xl border border-slate-300 bg-white text-slate-700 hover:border-slate-400 transition-all text-center';
        });
        btn.className = 'btn-salida-expectativa py-2.5 px-3 text-xs font-bold rounded-xl border border-red-600 bg-red-600 text-white transition-all text-center';
        estado.salida.cumplioExpectativas = btn.getAttribute('data-val');
      });
    });

    document.querySelectorAll('.btn-salida-enps').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-salida-enps').forEach(b => {
          b.className = 'btn-salida-enps py-2.5 px-2 text-xs font-bold rounded-xl border border-slate-300 bg-white text-slate-700 hover:border-slate-400 transition-all text-center';
        });
        btn.className = 'btn-salida-enps py-2.5 px-2 text-xs font-bold rounded-xl border border-red-600 bg-red-600 text-white transition-all text-center';
        estado.salida.enps = btn.getAttribute('data-val');
      });
    });
  }

  function calcularPromedioMatrizSalida() {
    const notas = Object.values(estado.salida.calificacionesMatriz);
    if (notas.length === 0) return;

    const suma = notas.reduce((acc, curr) => acc + curr, 0);
    const promedio = (suma / notas.length).toFixed(1);

    document.getElementById('promedioMatrizSalida').textContent = `${promedio} / 5.0`;
    document.getElementById('kpiSatisfaccionValor').textContent = `${promedio} / 5.0`;

    let label = 'Nivel Regular';
    if (promedio >= 4.5) label = 'Excelente Clima';
    else if (promedio >= 3.8) label = 'Favorable / Sólido';
    else if (promedio <= 2.5) label = 'Alerta de Retención';

    document.getElementById('kpiSatisfaccionEtiqueta').textContent = `${notas.length} de 11 factores evaluados • ${label}`;
  }

  // Guardado de la Entrevista de Salida
  document.getElementById('btnGuardarSalida')?.addEventListener('click', () => {
    const comp = document.getElementById('salidaCompania').value;
    const ced = document.getElementById('salidaCedula').value.trim();
    const nom = document.getElementById('salidaNombreColaborador').value.trim();

    if (!comp || !ced || !nom) {
      alert('Por favor complete al menos la Compañía, Cédula y Nombre del colaborador.');
      return;
    }

    if (estado.salida.fortalezas.length === 0) {
      alert('Por favor seleccione al menos una fortaleza organizacional.');
      return;
    }

    const totalFactores = Object.keys(estado.salida.calificacionesMatriz).length;
    if (totalFactores < 11) {
      if (!confirm(`Ha calificado ${totalFactores} de 11 factores en la matriz de satisfacción. ¿Desea registrar la entrevista con calificaciones pendientes?`)) {
        return;
      }
    }

    alert(`✅ Entrevista de salida registrada con éxito.\nColaborador: ${nom}\nÍndice Promedio: ${document.getElementById('promedioMatrizSalida').textContent}\nSe ha preparado el registro para su inserción en SharePoint.`);
    window.location.reload();
  });

  document.getElementById('btnCancelarSalida')?.addEventListener('click', () => {
    if (confirm('¿Desea cancelar el registro y volver al inicio? Los datos no guardados se perderán.')) {
      document.getElementById('btnVolverHubGlobal')?.click();
    }
  });

  // Modal de Feedback
  const modalFeedback = document.getElementById('modalFeedback');
  document.getElementById('btnFeedbackModal')?.addEventListener('click', () => modalFeedback?.classList.remove('hidden'));
  document.getElementById('btnCerrarModalFeedback')?.addEventListener('click', () => modalFeedback?.classList.add('hidden'));
  document.getElementById('btnEnviarFeedback')?.addEventListener('click', () => {
    alert('Comentario enviado satisfactoriamente al equipo de desarrollo.');
    modalFeedback?.classList.add('hidden');
    const txt = document.getElementById('textoFeedback');
    if (txt) txt.value = '';
  });

});
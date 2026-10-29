/**
 * Pozuelo Talent Assessment
 * Archivo: bancoDatos.js (Consolidado Maestro)
 * Propósito: Banco de evaluadores, preguntas STAR por nivel, 
 *            blindaje legal Art. 404 y matriz de Entrevistas de Salida.
 * Fuente: Procedimiento de selección de talento y formulario de retiro institucional.
 */

const BANCO_DATOS = {

  // =========================================================================
  // 0. DIRECTORIO DE EVALUADORES AUTORIZADOS
  // =========================================================================
  evaluadores: [
    {
      codigo: "5658",
      nombre: "WILLIAM ALFARO DELGADO",
      rol: "Reclutador Asignado",
      iniciales: "WA"
    },
    {
      codigo: "5677",
      nombre: "MONICA JIMENEZ SEAS",
      rol: "Gestión de Talento Humano",
      iniciales: "MJ"
    }
  ],

  // =========================================================================
  // 1. ENCUADRE INICIAL OBLIGATORIO (5 PASOS POZUELO)
  // =========================================================================
  pasosEncuadre: [
    {
      paso: 1,
      titulo: "Dar la bienvenida al candidato",
      descripcion: "Iniciar la entrevista generando un ambiente cálido y de confianza. Agradecer al candidato por su tiempo e interés en formar parte del proceso. Este primer momento busca que se sienta cómodo y con la libertad de expresarse con autenticidad."
    },
    {
      paso: 2,
      titulo: "Encuadre de la entrevista",
      descripcion: "Explicar brevemente la estructura y duración de la entrevista, así como el propósito de la conversación. Esto ayuda a que el candidato sepa qué esperar y a mantener una dinámica fluida y transparente."
    },
    {
      paso: 3,
      titulo: "Presentar a Pozuelo: quiénes somos, nuestra cultura y la posición",
      descripcion: "Compartir información sobre la historia de la empresa, su propósito, valores y cultura organizacional. Destacar los aspectos que hacen de Pozuelo un lugar único para trabajar y explicar de manera clara el rol y sus principales responsabilidades."
    },
    {
      paso: 4,
      titulo: "Indagar la parte personal",
      descripcion: "Conocer al candidato más allá de su experiencia profesional: sus intereses, motivaciones, valores y lo que busca en un entorno laboral. Esta parte permite identificar el nivel de afinidad cultural y la conexión con los valores de Pozuelo."
    },
    {
      paso: 5,
      titulo: "Indagar experiencia laboral",
      descripcion: "Explorar las experiencias laborales previas, las principales funciones desempeñadas, logros y aprendizajes. Profundizar en cómo ha enfrentado desafíos y trabajado en equipo, buscando entender su estilo de trabajo y contribución en entornos anteriores."
    }
  ],

  // =========================================================================
  // 2. POTENCIAL DE LIDERAZGO POR NIVEL ORGANIZACIONAL
  // =========================================================================
  potencialLiderazgo: {
    operativo: {
      nivelNombre: "Nivel 1: Operativos",
      evaluaTexto: "No se evalúa liderazgo formal. Se evalúa potencial: proactividad, responsabilidad e iniciativa.",
      competencias: [
        {
          id: "PL-OP-01",
          competencia: "Autoliderazgo",
          preguntas: [
            "Cuénteme sobre una ocasión en la que nadie le pidió hacer algo adicional, pero usted decidió hacerlo porque sabía que era importante.",
            "Cuénteme sobre una ocasión en la que cometió un error en su trabajo. ¿Qué hizo para corregirlo y qué aprendió?"
          ]
        },
        {
          id: "PL-OP-02",
          competencia: "Adaptación",
          preguntas: [
            "Hábleme de un cambio importante que haya vivido en su trabajo. ¿Qué hizo para adaptarse?",
            "Cuénteme de una ocasión en la que tuvo que aprender rápidamente una nueva tarea o forma de trabajar. ¿Cómo lo hizo?"
          ]
        },
        {
          id: "PL-OP-03",
          competencia: "Gestión efectiva",
          preguntas: [
            "Hábleme de una ocasión donde tuvo varias tareas al mismo tiempo. ¿Cómo decidió qué hacer primero?",
            "Hábleme de una ocasión en la que tuvo poco tiempo para completar una tarea importante. ¿Cómo se organizó para cumplir?"
          ]
        },
        {
          id: "PL-OP-04",
          competencia: "Trabajo colaborativo",
          preguntas: [
            "Cuénteme sobre una ocasión donde un compañero necesitó ayuda. ¿Qué hizo usted?",
            "Hábleme de una ocasión en la que tuvo que trabajar con alguien que tenía una forma de trabajar diferente a la suya. ¿Cómo lo manejó?"
          ]
        }
      ]
    },
    tactico: {
      nivelNombre: "Nivel 2: Personal táctico",
      evaluaTexto: "Capacidad de influir técnicamente, resolver problemas y adaptarse a necesidades organizacionales.",
      competencias: [
        {
          id: "PL-TAC-01",
          competencia: "Influencia",
          preguntas: [
            "Cuénteme sobre una ocasión donde necesitó convencer a otras personas de una idea o propuesta. ¿Cómo logró que aceptaran?",
            "Cuénteme sobre una ocasión en la que una persona no estuvo de acuerdo con su recomendación. ¿Cómo manejó la conversación y cuál fue el resultado?"
          ]
        },
        {
          id: "PL-TAC-02",
          competencia: "Gestión del cambio",
          preguntas: [
            "Hábleme de un cambio que inicialmente generó resistencia. ¿Qué hizo para que el trabajo siguiera adelante?",
            "Hábleme de una ocasión en la que tuvo que modificar su forma habitual de trabajar debido a una nueva necesidad de la organización. ¿Qué hizo?"
          ]
        },
        {
          id: "PL-TAC-03",
          competencia: "Resolución de problemas",
          preguntas: [
            "Cuénteme sobre un problema que parecía complicado. ¿Cómo lo analizó? ¿Qué hizo?",
            "Hábleme de una situación en la que tuvo que tomar una decisión sin contar con toda la información que necesitaba. ¿Cómo procedió?"
          ]
        },
        {
          id: "PL-TAC-04",
          competencia: "Trabajo colaborativo",
          preguntas: [
            "Hábleme de un proyecto donde participaron varias áreas. ¿Qué papel tuvo usted?",
            "Hábleme de una situación en la que necesitó coordinar esfuerzos con otras personas para cumplir un objetivo. ¿Cómo se aseguró de que todos estuvieran alineados?"
          ]
        }
      ]
    },
    tactico_cargo: {
      nivelNombre: "Nivel 3: Personal táctico con personas a cargo",
      evaluaTexto: "Liderazgo de equipos, desarrollo de colaboradores y gestión de prioridades bajo presión.",
      competencias: [
        {
          id: "PL-TC-01",
          competencia: "Desarrollo del talento",
          preguntas: [
            "Descríbame una situación donde ayudó a un colaborador a mejorar significativamente. ¿Qué hizo exactamente?",
            "Cuénteme sobre una ocasión en la que identificó una fortaleza o potencial en una persona de su equipo. ¿Qué hizo para desarrollarlo?"
          ]
        },
        {
          id: "PL-TC-02",
          competencia: "Empoderamiento",
          preguntas: [
            "Hábleme de una ocasión donde delegó una responsabilidad importante. ¿Cómo decidió en quién confiar? ¿Cómo dio seguimiento?",
            "Hábleme de una situación en la que permitió que un colaborador tomara una decisión importante por su cuenta. ¿Cómo lo preparó y qué resultado obtuvo?"
          ]
        },
        {
          id: "PL-TC-03",
          competencia: "Influencia",
          preguntas: [
            "Cuénteme sobre una decisión difícil que debía implementar aunque el equipo no estuviera de acuerdo. ¿Cómo manejó la situación?",
            "Cuénteme sobre una ocasión en la que necesitó obtener el compromiso de su equipo en una meta desafiante. ¿Qué hizo para lograrlo?"
          ]
        },
        {
          id: "PL-TC-04",
          competencia: "Gestión del cambio",
          preguntas: [
            "Cuénteme sobre un cambio que tuvo que liderar. ¿Cómo preparó al equipo? ¿Qué resultado obtuvo?",
            "Hábleme de una ocasión en la que su equipo tuvo dificultades para adaptarse a un cambio. ¿Cómo intervino?"
          ]
        },
        {
          id: "PL-TC-05",
          competencia: "Gestión efectiva",
          preguntas: [
            "¿Cómo prioriza cuando todas las personas consideran que sus solicitudes son urgentes?",
            "Cuénteme sobre un momento en el que tuvo que reorganizar prioridades de su equipo ante una situación inesperada."
          ]
        }
      ]
    },
    estrategico: {
      nivelNombre: "Nivel 4: Personal estratégico",
      evaluaTexto: "Visión de negocio a largo plazo, negociación entre áreas y resiliencia ante giros estratégicos.",
      competencias: [
        {
          id: "PL-EST-01",
          competencia: "Gestión estratégica",
          preguntas: [
            "Hábleme de una decisión que tomó pensando en el mediano o largo plazo. ¿Qué información utilizó?",
            "Cuénteme sobre una ocasión en la que identificó una oportunidad o riesgo para el negocio antes de que fuera evidente para otros. ¿Qué hizo al respecto?"
          ]
        },
        {
          id: "PL-EST-02",
          competencia: "Influencia",
          preguntas: [
            "Cuénteme sobre una iniciativa estratégica donde necesitó influir sin tener autoridad directa.",
            "Hábleme de una ocasión en la que necesitó obtener apoyo de líderes o actores clave para impulsar una iniciativa estratégica. ¿Cómo construyó ese respaldo?"
          ]
        },
        {
          id: "PL-EST-03",
          competencia: "Gestión del talento",
          preguntas: [
            "¿Cuál ha sido la persona que más ha crecido bajo su liderazgo? ¿Qué hizo usted para desarrollarla?",
            "¿Cómo identifica cuándo un colaborador está listo para asumir mayores responsabilidades?"
          ]
        },
        {
          id: "PL-EST-04",
          competencia: "Gestión de relaciones",
          preguntas: [
            "Cuénteme sobre una situación donde dos áreas tenían intereses completamente diferentes. ¿Cómo logró alinearlas?",
            "Describa una situación donde construyó alianzas entre diferentes áreas. ¿Cómo lo logró?"
          ]
        },
        {
          id: "PL-EST-05",
          competencia: "Adaptación",
          preguntas: [
            "Hábleme sobre un momento donde la estrategia cambió completamente. ¿Cómo reaccionó?",
            "Cuénteme sobre una ocasión en la que un cambio del entorno o del negocio lo obligó a replantear una prioridad estratégica. ¿Cómo tomó la decisión?"
          ]
        },
        {
          id: "PL-EST-06",
          competencia: "Resolución de conflictos",
          preguntas: [
            "Descríbame el problema más complejo que haya tenido que resolver. ¿Cómo estructuró el análisis? ¿Qué criterios utilizó para decidir?",
            "Hábleme de una situación en la que existían posiciones muy diferentes entre líderes o áreas y era necesario llegar a una decisión. ¿Cómo facilitó la resolución?"
          ]
        }
      ]
    }
  },

  // =========================================================================
  // 3. HABILIDADES SOCIOEMOCIONALES Y MOTIVADORES (TRANSVERSAL - SELECCIONA 3)
  // =========================================================================
  habilidadesSocioemocionales: [
    {
      id: "SOC-01",
      competencia: "Inteligencia emocional",
      preguntas: [
        "Cuéntame sobre una situación en la que tuviste que manejar una conversación difícil con un compañero o cliente. ¿Qué hiciste?",
        "Háblame de una ocasión en la que identificaste que tus emociones podían afectar una decisión. ¿Cómo lo manejaste?",
        "Describe un momento en el que tuviste que comprender el punto de vista de alguien con quien no estabas de acuerdo."
      ]
    },
    {
      id: "SOC-02",
      competencia: "Gestión de la frustración",
      preguntas: [
        "Cuéntame sobre un objetivo importante que no lograste alcanzar. ¿Cómo reaccionaste?",
        "Háblame de una ocasión en la que las cosas no salieron como esperabas. ¿Qué hiciste después?",
        "Describe una situación en la que recibiste una negativa o rechazo repetidamente. ¿Cómo mantuviste tu motivación?"
      ]
    },
    {
      id: "SOC-03",
      competencia: "Autocontrol",
      preguntas: [
        "Cuéntame de una ocasión en la que sentiste mucho estrés o presión laboral. ¿Cómo mantuviste el control?",
        "Háblame de una situación en la que alguien te hizo un comentario que te molestó. ¿Cómo respondiste?",
        "Describe un momento en el que tuviste que actuar con calma a pesar de estar bajo mucha presión."
      ]
    },
    {
      id: "SOC-04",
      competencia: "Autoeficacia",
      preguntas: [
        "Cuéntame sobre un reto que inicialmente parecía muy difícil de lograr y cómo lo superaste.",
        "Háblame de una meta que alcanzaste gracias a tu iniciativa y perseverancia.",
        "Describe una ocasión en la que asumiste una responsabilidad para la que no te sentías completamente preparado."
      ]
    },
    {
      id: "SOC-05",
      competencia: "Conciencia de sí mismo",
      preguntas: [
        "¿Cuál consideras que ha sido uno de tus mayores errores profesionales y qué aprendiste de él?",
        "Cuéntame sobre una ocasión en la que recibiste retroalimentación difícil. ¿Qué hiciste con ella?",
        "¿Qué fortalezas personales has identificado y cómo las utilizas en tu trabajo?"
      ]
    },
    {
      id: "SOC-06",
      competencia: "Adaptación al cambio",
      preguntas: [
        "Cuéntame sobre un cambio importante que hayas vivido en tu trabajo. ¿Cómo te adaptaste?",
        "Háblame de una ocasión en la que tuviste que aprender rápidamente una nueva herramienta o proceso.",
        "Describe una situación en la que un cambio inesperado modificó tus prioridades. ¿Cómo reaccionaste?"
      ]
    },
    {
      id: "SOC-07",
      competencia: "Trabajo en equipo",
      preguntas: [
        "Cuéntame sobre un proyecto donde dependían del trabajo de otras personas para alcanzar el resultado.",
        "Háblame de una ocasión en la que hubo un conflicto dentro del equipo. ¿Cómo contribuiste a resolverlo?",
        "Describe una situación en la que apoyaste a un compañero, aunque no fuera parte de tus responsabilidades."
      ]
    },
    {
      id: "SOC-08",
      competencia: "Asertividad",
      preguntas: [
        "Cuéntame sobre una ocasión en la que tuviste que expresar un desacuerdo con tu jefe o un compañero. ¿Cómo lo hiciste?",
        "Háblame de una situación en la que tuviste que decir 'no' a una solicitud. ¿Cómo manejaste la conversación?",
        "Describe un momento en el que tuviste que dar retroalimentación constructiva a otra persona."
      ]
    },
    {
      id: "SOC-09",
      competencia: "Orientación al servicio",
      preguntas: [
        "Cuéntame sobre una ocasión en la que superaste las expectativas de un cliente interno o externo.",
        "Háblame de una situación en la que tuviste que atender a un cliente molesto. ¿Qué hiciste?",
        "Describe una ocasión en la que identificaste una necesidad del cliente antes de que él la expresara."
      ]
    }
  ],

  // =========================================================================
  // 4. ESTILO DE LIDERAZGO (ROLES CON PERSONAL A CARGO - SELECCIONA 3)
  // =========================================================================
  estilosLiderazgo: [
    {
      id: "LID-01",
      competencia: "Dirección y toma de decisiones",
      preguntas: [
        "Cuénteme sobre una situación en la que tuvo que tomar una decisión importante que afectaba a su equipo. ¿Cómo tomó la decisión y cómo involucró a las personas?",
        "Hábleme de una ocasión en la que un colaborador no estaba de acuerdo con una decisión suya. ¿Cómo manejó la situación y cuál fue el resultado?"
      ]
    },
    {
      id: "LID-02",
      competencia: "Comunicación con el equipo",
      preguntas: [
        "Cuénteme sobre una ocasión en la que tuvo que comunicar una decisión a su equipo. ¿Cómo lo hizo y cómo manejó las reacciones?",
        "Hábleme de una situación en la que se dio cuenta de que su equipo no había comprendido correctamente una instrucción o expectativa. ¿Qué hizo?"
      ]
    },
    {
      id: "LID-03",
      competencia: "Delegación y autonomía",
      preguntas: [
        "Cuénteme sobre una responsabilidad importante que haya delegado. ¿Cómo eligió a la persona y qué nivel de autonomía le dio?",
        "Hábleme de una ocasión en la que un colaborador tomó una decisión diferente a la que usted habría tomado. ¿Cómo reaccionó y qué hizo posteriormente?"
      ]
    },
    {
      id: "LID-04",
      competencia: "Manejo del desempeño",
      preguntas: [
        "Cuénteme sobre una situación en la que tuvo que abordar a un colaborador cuyo desempeño o comportamiento no era el esperado. ¿Cómo llevó la conversación?",
        "Hábleme de una ocasión en la que una persona de su equipo cometió un error importante. ¿Cómo manejó la situación con esa persona y con el resto del equipo?"
      ]
    },
    {
      id: "LID-05",
      competencia: "Motivación y reconocimiento",
      preguntas: [
        "Cuénteme sobre un momento en el que notó a su equipo desmotivado o con bajo compromiso. ¿Qué hizo para abordar la situación?",
        "Hábleme de una ocasión en la que reconoció el buen desempeño de un colaborador. ¿Cómo decidió reconocerlo y qué impacto observó?"
      ]
    },
    {
      id: "LID-06",
      competencia: "Manejo de conflictos y relaciones",
      preguntas: [
        "Cuénteme sobre un conflicto entre dos personas de su equipo. ¿Cómo intervino y qué hizo para llegar a una solución?",
        "Hábleme de una situación en la que tuvo que manejar a un colaborador difícil o resistente a sus indicaciones. ¿Cómo abordó la situación y qué resultado obtuvo?"
      ]
    }
  ],

  // =========================================================================
  // 5. METODOLOGÍA STAR: GUÍA DE PROFUNDIZACIÓN PARA COPILOT
  // =========================================================================
  guiaSTAR: {
    situacion: {
      foco: "Comprender el contexto de la experiencia.",
      preguntasSugeridas: [
        "¿Cuál era el contexto o situación exacta?",
        "¿Quiénes estaban involucrados?",
        "¿Por qué era una situación desafiante o relevante?"
      ]
    },
    tarea: {
      foco: "Identificar la responsabilidad específica del candidato.",
      preguntasSugeridas: [
        "¿Qué se esperaba específicamente de usted?",
        "¿Cuál era su objetivo personal dentro de esa meta?",
        "¿Cuál era su responsabilidad directa?"
      ]
    },
    accion: {
      foco: "Explorar qué hizo personalmente (evitar que hable solo en 'nosotros').",
      preguntasSugeridas: [
        "¿Qué hizo usted directamente dentro de ese proceso?",
        "¿Por qué decidió actuar de esa manera y no de otra?",
        "¿Cuál fue el primer paso que dio?"
      ]
    },
    resultado: {
      foco: "Explorar las consecuencias medibles y los aprendizajes.",
      preguntasSugeridas: [
        "¿Qué resultado concreto obtuvo?",
        "¿Cómo supo que la acción fue exitosa?",
        "¿Qué aprendió de esa experiencia y qué haría diferente hoy?"
      ]
    }
  },

  // =========================================================================
  // 6. BLINDAJE LEGAL: ARTÍCULO 404 (ALERTAS EN TIEMPO REAL)
  // =========================================================================
  alertasArticulo404: [
    { id: 1, tema: "Estado civil", palabrasClave: ["casado", "soltero", "divorciado", "unión libre", "conyuge", "esposo", "esposa"] },
    { id: 2, tema: "Hijos y cuido", palabrasClave: ["hijos", "bebé", "guardería", "quién cuida", "tiempo extra hijos"] },
    { id: 3, tema: "Embarazo", palabrasClave: ["embarazo", "embarazada", "maternidad", "planes de tener hijos", "lactancia"] },
    { id: 4, tema: "Matrimonio", palabrasClave: ["planes de casarse", "boda", "compromiso matrimonial"] },
    { id: 5, tema: "Salud y enfermedades", palabrasClave: ["enfermedad", "crónica", "dolor de espalda", "lesión", "diagnóstico"] },
    { id: 6, tema: "Medicamentos", palabrasClave: ["medicamento", "pastillas", "tratamiento diario", "fármaco"] },
    { id: 7, tema: "Incapacidades", palabrasClave: ["incapacidad", "incapacidades largas", "días incapacitado"] },
    { id: 8, tema: "Discapacidad", palabrasClave: ["discapacidad física", "condición médica", "impedimento"] },
    { id: 9, tema: "Deudas financieras", palabrasClave: ["deudas", "préstamos", "problemas de dinero", "créditos"] },
    { id: 10, tema: "Historial crediticio", palabrasClave: ["sugef", "manchado", "buró", "embargo", "embargo salarial"] },
    { id: 11, tema: "Vivienda", palabrasClave: ["casa propia", "alquila", "hipoteca", "vive de alquiler"] },
    { id: 12, tema: "Antecedentes penales", palabrasClave: ["policía", "antecedentes", "hoja de delincuencia", "cárcel", "detenido"] },
    { id: 13, tema: "Nacionalidad u origen", palabrasClave: ["nacionalidad", "extranjero", "familia de dónde es", "país de origen"] },
    { id: 14, tema: "Religión", palabrasClave: ["religión", "iglesia", "culto", "creencia", "asiste a la iglesia"] },
    { id: 15, tema: "Política e ideología", palabrasClave: ["partido político", "voto", "ideología", "elecciones"] },
    { id: 16, tema: "Sindicatos", palabrasClave: ["sindicato", "afiliado", "huelga", "comité de trabajadores"] },
    { id: 17, tema: "Edad", palabrasClave: ["edad", "años cumplidos", "año de nacimiento", "cuántos años tiene"] },
    { id: 18, tema: "Orientación sexual", palabrasClave: ["orientación sexual", "identidad de género", "pareja del mismo sexo"] },
    { id: 19, tema: "Convivencia personal", palabrasClave: ["con quién vive", "vive solo", "vive con sus padres"] }
  ],

  // =========================================================================
  // 7. RÚBRICA Y ESCALA OFICIAL POZUELO (0 A 100)
  // =========================================================================
  escalaEvaluacion: {
    nivelesCumplimiento: [
      { valor: 1.25, etiqueta: "Cumple y supera" },
      { valor: 1.00, etiqueta: "Cumple" },
      { valor: 0.50, etiqueta: "Cumple parcialmente" },
      { valor: 0.00, etiqueta: "No cumple" }
    ],
    rangosNota: [
      { min: 87, max: 100, dictamen: "SOBRESALIENTE", recomendacion: "Altamente recomendable. Candidato con potencial para la terna." },
      { min: 78, max: 86.99, dictamen: "ÓPTIMO", recomendacion: "Recomendable. Adecuado al puesto, revisar resto de pruebas." },
      { min: 71, max: 77.99, dictamen: "ADECUADO", recomendacion: "Recomendable con observaciones. Aceptable con áreas a revisar con el líder." },
      { min: 61, max: 70.99, dictamen: "CON RESERVAS", recomendacion: "Continuidad condicionada. Revisar las áreas de oportunidad identificadas." },
      { min: 0, max: 60.99, dictamen: "BAJA ADECUACIÓN", recomendacion: "No recomendable para el cargo. Considerarse para otros puestos." }
    ]
  },

  // =========================================================================
  // 8. CONFIGURACIÓN DEL MÓDULO DE ENTREVISTAS DE SALIDA
  // =========================================================================
  entrevistaSalida: {
    companias: [
      "Compañía de Galletas Pozuelo DCR, S.A.",
      "Comercial Pozuelo Nicaragua",
      "Comercial Pozuelo El Salvador",
      "Comercial Pozuelo Guatemala",
      "Galletas Noel",
      "Molinos Buga",
      "Molinos Santa Marta",
      "Doria",
      "Novaventa",
      "Setas de Colombia",
      "Pastas Comarrico",
      "Otras empresas del Grupo Nutresa"
    ],
    antiguedadEmpresa: [
      "Menos de 3 meses",
      "De 3 meses a 6 meses",
      "De 6 meses a 1 año",
      "De 1 a 2 años",
      "De 2 a 5 años",
      "De 5 a 10 años",
      "Más de 10 años"
    ],
    antiguedadPuesto: [
      "Menos de 1 año",
      "De 1 a 5 años",
      "Más de 5 años"
    ],
    motivosSalida: [
      "Renuncia voluntaria",
      "Despido",
      "Jubilación",
      "Traslado a otra empresa del grupo",
      "Mutuo acuerdo",
      "Abandono de trabajo"
    ],
    fortalezasDisponibles: [
      "Cultura y valores organizacionales",
      "Clima Organizacional",
      "Oportunidades de aprendizaje y crecimiento",
      "Beneficios",
      "Salarios competitivos",
      "Comunicación y Transparencia",
      "Equipo de Trabajo",
      "Liderazgo",
      "Horarios",
      "Estabilidad Laboral",
      "Flexibilidad laboral",
      "Apoyo a la familia",
      "Otro"
    ],
    // Doble enlace para evitar discrepancias de lectura en app.js
    factoresEvaluacion: [
      { id: "lider", titulo: "Gestión del líder inmediato", descripcion: "Acompañamiento, claridad y estilo de liderazgo de su jefatura directa." },
      { id: "clima", titulo: "Clima Organizacional", descripcion: "Ambiente laboral y dinamismo relacional entre pares del equipo." },
      { id: "salario", titulo: "Salario", descripcion: "Competitividad y equidad de la remuneración económica recibida." },
      { id: "beneficios", titulo: "Portafolio de beneficios", descripcion: "Variedad, utilidad y acceso a los beneficios complementarios." },
      { id: "cultura", titulo: "Cultura Organizacional", descripcion: "Vivencia tangible de los valores y propósitos institucionales." },
      { id: "desarrollo", titulo: "Oportunidades de desarrollo", descripcion: "Crecimiento profesional y posibilidades de plan de carrera." },
      { id: "necesidades", titulo: "Apoyo a necesidades del colaborador", descripcion: "Acompañamiento institucional ante eventualidades personales." },
      { id: "entrenamiento", titulo: "Entrenamiento en el puesto", descripcion: "Calidad de inducción y herramientas para ejecutar sus funciones." },
      { id: "reconocimiento", titulo: "Reconocimiento", descripcion: "Valoración oportuna del esfuerzo individual y colectivo." },
      { id: "ideas", titulo: "Oportunidad de aportar ideas", descripcion: "Apertura para proponer mejoras continuas en su área." },
      { id: "retroalimentacion", titulo: "Retroalimentación constante", descripcion: "Claridad y frecuencia en la evaluación de su trabajo." }
    ],
    get factoresEvaluacion1a5() {
      return this.factoresEvaluacion;
    }
  }
};
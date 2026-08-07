import { ClinicConfig } from '../types/clinic';
import { mediaAssets } from './mediaAssets';

export const clinicConfig: ClinicConfig = {
  name: 'DUOCLINIC ODONTOLOGIA INDAIATUBA',
  brandName: 'DuoClinic Odontologia',
  tagline: 'Seu sorriso cuidado com precisão, estética e acolhimento.',
  instagramHandle: '@duoclinic.indaiatuba',
  instagramUrl: 'https://www.instagram.com/duoclinic.indaiatuba/',
  googleRating: 5.0,
  googleReviewCount: 5,
  googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.3436069920955!2d-47.2065385237839!3d-23.083947843513363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8b368a35d7bf1%3A0x6b24d9c72df3b36e!2sRua%20Paul%20Harris%2C%20494%20-%20Cidade%20Nova%2C%20Indaiatuba%20-%20SP%2C%2013334-070!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr',
  googleMapDirectUrl: 'https://maps.google.com/?q=Rua+Paul+Harris,+494,+Cidade+Nova,+Indaiatuba+-+SP',
  address: {
    street: 'Rua Paul Harris',
    number: '494',
    room: 'Sala 02',
    neighborhood: 'Cidade Nova',
    city: 'Indaiatuba',
    state: 'SP',
    cep: '13334-070',
    fullAddress: 'Rua Paul Harris, 494, Sala 02, Cidade Nova, Indaiatuba — SP, CEP 13334-070',
    geo: {
      latitude: -23.0839528,
      longitude: -47.2039636
    }
  },
  contact: {
    phoneFormatted: '(11) 98927-3701',
    whatsappFormatted: '(11) 98927-3701',
    whatsappRaw: '5511989273701',
    hoursWeekdays: 'Segunda a sexta, das 08h às 18h'
  },
  legal: {
    cnpj: '61.624.285/0001-26',
    cnes: '8019266',
    technicalDirector: 'Dra. Giovana Basso Pastorello (CRO/SP 158.568)'
  },
  professionals: [
    {
      id: 'dr-gabriel',
      name: 'Dr. Gabriel Mitsuo Murakami',
      role: 'Cirurgião-Dentista | Sócio-proprietário',
      specialty: 'Especialista em Endodontia',
      bio: 'Atuação focada no diagnóstico e tratamento de canal e preservação dental. Dedica-se a cuidar da estrutura natural dos dentes com rigor técnico, atenção aos detalhes e escuta atenta.',
      focus: [
        'Diagnóstico criterioso de alterações na polpa',
        'Tratamento e retratamento de canal (Endodontia)',
        'Preservação da dentição natural',
        'Acompanhamento e suporte atencioso'
      ],
      imageUrl: mediaAssets.professionals.drGabriel,
      badge: 'Especialista em Endodontia'
    },
    {
      id: 'dra-giovana',
      name: 'Dra. Giovana Basso Pastorello',
      role: 'Cirurgiã-Dentista | Sócia-proprietária',
      specialty: 'Clínica Geral, Estética e em Especialização em Dentística',
      cro: 'CRO/SP 158.568',
      bio: 'Cirurgiã-dentista, em especialização em Dentística, Dra. Giovana combina o cuidado clínico geral e preventivo com tratamentos estéticos conservadores. Seu trabalho busca devolver harmonia ao sorriso através de facetas e restaurações em resina composta, clareamento supervisionado e prevenção.',
      focus: [
        'Avaliação clínica integral e profilaxia',
        'Restaurações e facetas em resina composta',
        'Fechamento de diastema com naturalidade',
        'Clareamento dental supervisionado'
      ],
      imageUrl: mediaAssets.professionals.draGiovana,
      badge: 'CRO/SP 158.568'
    }
  ],
  services: [
    {
      id: 'endodontia',
      title: 'Tratamento de Canal (Endodontia)',
      category: 'endodontia',
      shortDescription: 'Cuidado especializado da polpa dental para reduzir incômodos e buscar a preservação do dente natural.',
      fullDescription: 'Quando a polpa do dente sofre inflamação ou infecção por cárie ou trauma, a Endodontia atua limpando e desinfetando o canal radicular. Na DuoClinic, o procedimento é realizado com anestesia, atenção e planejamento focado na preservação da estrutura dental.',
      iconName: 'Activity',
      benefits: [
        'Recursos destinados a reduzir o desconforto',
        'Manutenção da mastigação e estética natural',
        'Busca pela preservação da dentição natural',
        'Acompanhamento pós-procedimento atencioso'
      ],
      imageUrl: mediaAssets.clinic.consultorioDetalhe,
      featured: true
    },
    {
      id: 'clinica-geral',
      title: 'Clínica Geral e Avaliação Integral',
      category: 'clinica_geral',
      shortDescription: 'Exame criterioso da saúde bucal, diagnóstico precoce e plano de tratamento transparente.',
      fullDescription: 'A consulta inicial na DuoClinic envolve a análise dos dentes, gengivas e tecidos bucais. Explicamos cada etapa em linguagem clara, definindo com você as prioridades para a sua saúde.',
      iconName: 'Stethoscope',
      benefits: [
        'Mapeamento completo da saúde bucal',
        'Plano de tratamento personalizado por fases',
        'Orientações claras e transparentes',
        'Atendimento com tempo adequado'
      ],
      featured: true
    },
    {
      id: 'odontologia-estetica',
      title: 'Odontologia Estética',
      category: 'estetica',
      shortDescription: 'Procedimentos conservadores para buscar harmonia e naturalidade no sorriso.',
      fullDescription: 'Tratamentos estéticos planejados para respeitar as características de cada paciente. Buscamos resultados elegantes que valorizem o sorriso de forma equilibrada.',
      iconName: 'Sparkles',
      benefits: [
        'Planejamento individualizado por análise clínica',
        'Materiais estéticos adequados ao caso',
        'Técnicas focadas na preservação do dente',
        'Aspecto leve e natural'
      ],
      featured: true
    },
    {
      id: 'facetas-resina',
      title: 'Facetas e Restaurações em Resina',
      category: 'estetica',
      shortDescription: 'Adequação de formato, cor e pequenas imperfeições com resina composta.',
      fullDescription: 'Escultura em resina composta para ajustar imperfeições, pequenas fraturas, manchas ou formatos, com textura natural e polimento.',
      iconName: 'Gem',
      benefits: [
        'Preservação da estrutura natural do dente',
        'Aplicação direta e resultado harmônico',
        'Manutenção e polimento simples',
        'Abordagem estética conservadora'
      ],
      featured: true
    },
    {
      id: 'fechamento-diastema',
      title: 'Fechamento de Diastema',
      category: 'estetica',
      shortDescription: 'Ajuste de espaços entre os dentes com escultura em resina composta.',
      fullDescription: 'O espaço entre os dentes pode ser suavemente preenchido com escultura em resina composta, buscando o equilíbrio do sorriso de forma conservadora.',
      iconName: 'Maximize2',
      benefits: [
        'Abordagem conservadora sem desgastes excessivos',
        'Harmonia na linha do sorriso',
        'Seleção de cor adequada aos dentes vizinhos',
        'Atendimento atencioso e gradual'
      ]
    },
    {
      id: 'clareamento-dental',
      title: 'Clareamento Dental Supervisionado',
      category: 'estetica',
      shortDescription: 'Adequação do tom e luminosidade dos dentes com supervisão profissional.',
      fullDescription: 'Aplicações supervisionadas com moldeiras sob medida e acompanhamento profissional, com orientações específicas para o controle de sensibilidade.',
      iconName: 'Sun',
      benefits: [
        'Protocolo com acompanhamento profissional',
        'Moldeiras personalizadas sob medida',
        'Evolução gradual da tonalidade',
        'Orientações claras para o dia a dia'
      ],
      featured: true
    },
    {
      id: 'extracao-siso',
      title: 'Extração e Cirurgias de Siso',
      category: 'cirurgia',
      shortDescription: 'Remoção cirúrgica com planejamento criterioso e orientações pós-operatórias.',
      fullDescription: 'Avaliação clínica e radiográfica prévia para planejamento da remoção de terceiros molares, buscando conforto na intervenção e suporte no pós-operatório.',
      iconName: 'Scissors',
      benefits: [
        'Procedimento realizado com planejamento prévio',
        'Acompanhamento no período pós-operatório',
        'Prevenção de complicações locais',
        'Orientações claras para cuidados em casa'
      ]
    },
    {
      id: 'odontopediatria',
      title: 'Odontopediatria e Cuidado Infantil',
      category: 'infantil',
      shortDescription: 'Atendimento infantil conduzido de forma gradual, respeitosa e adaptada a cada criança.',
      fullDescription: 'Atendimento infantil focado na prevenção e na construção de experiências calmas, orientando pais e crianças sobre hábitos saudáveis.',
      iconName: 'Smile',
      benefits: [
        'Atendimento gradual e no ritmo da criança',
        'Acompanhamento preventivo do desenvolvimento',
        'Orientações para os pais sobre higiene bucal',
        'Ambiente tranquilo e acolhedor'
      ]
    },
    {
      id: 'limpeza-profilaxia',
      title: 'Limpeza e Profilaxia Profissional',
      category: 'preventiva',
      shortDescription: 'Remoção de placa bacteriana e manchas superficiais para a manutenção da saúde gengival.',
      fullDescription: 'Higienização profissional acompanhada de orientações personalizadas sobre escovação e uso do fio dental para prevenir problemas futuros.',
      iconName: 'Sparkles',
      benefits: [
        'Manutenção da saúde das gengivas',
        'Sensação agradável de limpeza bucal',
        'Remoção de manchas superficiais',
        'Prevenção periódica recomendada'
      ]
    },
    {
      id: 'restauracoes',
      title: 'Restaurações em Resina Composta',
      category: 'clinica_geral',
      shortDescription: 'Restabelecimento da forma e função para dentes afetados por cáries ou fraturas.',
      fullDescription: 'Remoção do tecido acometido e preenchimento com resina composta na tonalidade correspondente ao dente, buscando devolver a forma e resistência.',
      iconName: 'CheckCircle2',
      benefits: [
        'Material estético na cor do dente',
        'Restauração da função mastigatória',
        'Acabamento polido e discreto',
        'Preservação da estrutura saudável'
      ]
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Tatiani Cristina Camilo',
      rating: 5,
      date: 'Há 2 meses',
      text: 'Atendimento excepcional! Fiz extração do siso com o Dr. Gabriel e a Dra. Giovana e fiquei impressionada com o cuidado, a paciência e a organização do espaço. Pós-operatório super tranquilo com acompanhamento constante.',
      source: 'Google',
      highlight: 'Extração de siso cuidadosa e pós-operatório atencioso'
    },
    {
      id: 'rev-2',
      author: 'Josias De Barros Ferreira',
      rating: 5,
      date: 'Há 3 meses',
      text: 'Clínica na Cidade Nova, ambiente limpo, organizado e tranquilo. O Dr. Gabriel é muito atencioso na área de Endodontia. Explicou todo o tratamento de canal com clareza. Recomendo!',
      source: 'Google',
      highlight: 'Tratamento de canal com clareza e ambiente impecável'
    },
    {
      id: 'rev-3',
      author: 'Andrea Murakami',
      rating: 5,
      date: 'Há 4 meses',
      text: 'A Dra. Giovana é extremamente detalhista e delicada. Fiz facetas de resina e clareamento, o resultado ficou muito bonito e harmonioso. Excelente equipe!',
      source: 'Google',
      highlight: 'Facetas de resina com resultado natural e detalhista'
    },
    {
      id: 'rev-4',
      author: 'Rayane Araujo',
      rating: 5,
      date: 'Há 5 meses',
      text: 'Acolhimento maravilhoso desde a recepção. Espaço agradável, cadeiras confortáveis e organização nos horários.',
      source: 'Google',
      highlight: 'Acolhimento desde a recepção e pontualidade'
    },
    {
      id: 'rev-5',
      author: 'Pedro Augusto',
      rating: 5,
      date: 'Há 6 meses',
      text: 'Profissionais atenciosos e ambiente extremamente limpo. O cuidado com a higiene e esterilização dá muita tranquilidade.',
      source: 'Google',
      highlight: 'Estrutura limpa, organizada e higienizada'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Quando devo procurar avaliação para tratamento de canal (endodontia)?',
      answer: 'Você deve procurar avaliação ao sentir desconforto ou dor constante, sensibilidade ao quente ou frio, incômodo ao mastigar ou alteração de cor em um dente. A consulta com o Dr. Gabriel identificará a indicação exata por meio de exames clínicos.',
      category: 'endodontia'
    },
    {
      id: 'faq-2',
      question: 'O tratamento de canal é doloroso?',
      answer: 'O procedimento é realizado com anestesia e recursos destinados a reduzir o desconforto. A percepção varia de pessoa para pessoa, e pode ocorrer sensibilidade temporária após o tratamento. Cada caso precisa de avaliação individual.',
      category: 'endodontia'
    },
    {
      id: 'faq-3',
      question: 'Como funciona a primeira consulta na DuoClinic?',
      answer: 'A primeira consulta é dedicada a escutar suas necessidades, realizar um exame clínico detalhado e apresentar as opções de tratamento disponíveis com transparência.',
      category: 'atendimento'
    },
    {
      id: 'faq-4',
      question: 'Como é feito o atendimento de crianças (Odontopediatria)?',
      answer: 'O atendimento infantil é conduzido de forma gradual, respeitosa e adaptada à idade e às necessidades de cada criança.',
      category: 'atendimento'
    },
    {
      id: 'faq-5',
      question: 'Os tratamentos estéticos (facetas e clareamento) ficam naturais?',
      answer: 'A indicação e os resultados possíveis dependem das características de cada caso e devem ser avaliados individualmente durante a consulta.',
      category: 'estetica'
    },
    {
      id: 'faq-6',
      question: 'Quais são as formas de atendimento disponíveis?',
      answer: 'Entre em contato pelo WhatsApp para confirmar as formas de atendimento disponíveis no momento.',
      category: 'atendimento'
    },
    {
      id: 'faq-7',
      question: 'Qual é a localização da DuoClinic em Indaiatuba?',
      answer: 'Estamos localizados na Rua Paul Harris, 494, Sala 02, no bairro Cidade Nova em Indaiatuba — SP (CEP 13334-070).',
      category: 'geral'
    },
    {
      id: 'faq-8',
      question: 'Como agendar uma avaliação pelo WhatsApp?',
      answer: 'Basta clicar em qualquer botão de agendamento do site para iniciar a conversa pelo WhatsApp (11) 98927-3701 e solicitar a sua avaliação.',
      category: 'atendimento'
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Recepção DuoClinic',
      category: 'clinica',
      imageUrl: mediaAssets.clinic.recepcaoPrincipal,
      caption: 'Balcão curvo iluminado com detalhes em madeira clara e recepção acolhedora.',
      aspect: 'landscape'
    },
    {
      id: 'gal-2',
      title: 'Consultório Principal',
      category: 'tratamento',
      imageUrl: mediaAssets.clinic.consultorioPrincipal,
      caption: 'Consultório equipado com cadeira ergonômica, luz indireta e máxima higiene.',
      aspect: 'landscape'
    },
    {
      id: 'gal-3',
      title: 'Corpo Clínico DuoClinic',
      category: 'atendimento',
      imageUrl: mediaAssets.professionals.draGiovana,
      caption: 'Dra. Giovana Basso Pastorello • Clínica geral, estética e em especialização em Dentística.',
      aspect: 'portrait'
    },
    {
      id: 'gal-4',
      title: 'Consultório de Atendimento',
      category: 'tratamento',
      imageUrl: mediaAssets.clinic.consultorioDetalhe,
      caption: 'Estrutura organizada e higienizada para atendimento com tranquilidade.',
      aspect: 'landscape'
    },
    {
      id: 'gal-5',
      title: 'Ambiente da Clínica',
      category: 'clinica',
      imageUrl: mediaAssets.clinic.recepcaoHorizontal,
      caption: 'Iluminação suave e atmosfera serena para o seu acolhimento.',
      aspect: 'landscape'
    }
  ],
  beforeAfterCases: [],
  videoReels: []
};

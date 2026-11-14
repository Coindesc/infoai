import { Language, CategoryKey } from '../types';

export const CATEGORY_LABELS: Record<CategoryKey, Record<Language, string>> = {
  all: {
    pt: 'Todas as Editorias',
    en: 'All Sections',
    es: 'Todas las Secciones',
    fr: 'Toutes les Rubriques',
    de: 'Alle Rubriken',
    zh: '全部资讯'
  },
  politica: {
    pt: 'Política',
    en: 'Politics',
    es: 'Política',
    fr: 'Politique',
    de: 'Politik',
    zh: '时事政治'
  },
  economia: {
    pt: 'Economia',
    en: 'Economy & Markets',
    es: 'Economía',
    fr: 'Économie',
    de: 'Wirtschaft',
    zh: '财经金融'
  },
  mundo: {
    pt: 'Mundo',
    en: 'World News',
    es: 'Mundo',
    fr: 'Monde',
    de: 'Weltnachrichten',
    zh: '国际局势'
  },
  tecnologia: {
    pt: 'Tecnologia & IA',
    en: 'Tech & AI',
    es: 'Tecnología e IA',
    fr: 'Tech & IA',
    de: 'Technologie & KI',
    zh: '前沿科技与AI'
  },
  esportes: {
    pt: 'Esportes',
    en: 'Sports',
    es: 'Deportes',
    fr: 'Sports',
    de: 'Sport',
    zh: '体育竞技'
  },
  ciencia_saude: {
    pt: 'Ciência & Saúde',
    en: 'Science & Health',
    es: 'Ciencia y Salud',
    fr: 'Science & Santé',
    de: 'Wissenschaft & Gesundheit',
    zh: '科学探索与健康'
  },
  cultura: {
    pt: 'Cultura & Pop',
    en: 'Culture & Entertainment',
    es: 'Cultura y Pop',
    fr: 'Culture & Pop',
    de: 'Kultur & Unterhaltung',
    zh: '文化与流行'
  }
};

export const UI_TRANSLATIONS: Record<Language, {
  siteTitle: string;
  mastheadSub: string;
  editionBadge: string;
  systemStatusLabel: string;
  systemStatusOnline: string;
  readOnWhatsApp: string;
  subscribeBtn: string;
  whyItMatters: string;
  minRead: string;
  sourcesVerified: string;
  breakingNews: string;
  latestEdition: string;
  archive: string;
  sponsoredTag: string;
  officialPartner: string;
  exploreSponsor: string;
  subscribeTitle: string;
  subscribeSubtitle: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  channelLabel: string;
  channelEmail: string;
  channelWhatsApp: string;
  channelBoth: string;
  emailLabel: string;
  emailPlaceholder: string;
  whatsappLabel: string;
  whatsappPlaceholder: string;
  scheduleTimeLabel: string;
  scheduleTimeHint: string;
  interestsLabel: string;
  interestsHint: string;
  submitSubscribe: string;
  submitting: string;
  subscribeSuccess: string;
  whatsAppModalTitle: string;
  whatsAppModalSub: string;
  copyWhatsAppText: string;
  copied: string;
  close: string;
  footerRights: string;
  autonomousPledge: string;
  themeToggle: string;
  sectionTitle: string;
  filterShowing: string;
  readMore: string;
}> = {
  pt: {
    siteTitle: 'INFOAI',
    mastheadSub: 'Jornal & Newsletter Digital 100% Autônomo • Cobertura Multitemática de Alta Precisão',
    editionBadge: 'Edição Diária Oficial',
    systemStatusLabel: 'Status Editorial',
    systemStatusOnline: '100% Autônomo • Sem Pendências',
    readOnWhatsApp: 'Leitura WhatsApp (2 min)',
    subscribeBtn: 'Receber no Meu Horário',
    whyItMatters: 'Por que isso importa',
    minRead: 'min de leitura',
    sourcesVerified: 'fontes cruzadas e auditadas',
    breakingNews: 'RADAR EM TEMPO REAL',
    latestEdition: 'Edição Principal de Hoje',
    archive: 'Arquivo de Edições',
    sponsoredTag: 'CONTEÚDO PATROCINADO',
    officialPartner: 'Parceiro Editorial',
    exploreSponsor: 'Conhecer Solução',
    subscribeTitle: 'Personalize o seu Diário de Inteligência',
    subscribeSubtitle: 'Receba as editorias de sua preferência por E-mail ou WhatsApp, no horário exato da sua rotina.',
    fullNameLabel: 'Nome Completo',
    fullNamePlaceholder: 'Ex: Dra. Helena Souza',
    channelLabel: 'Canal de Entrega',
    channelEmail: 'E-mail',
    channelWhatsApp: 'WhatsApp',
    channelBoth: 'Ambos os Canais',
    emailLabel: 'Seu Melhor E-mail',
    emailPlaceholder: 'voce@empresa.com',
    whatsappLabel: 'WhatsApp com DDD',
    whatsappPlaceholder: '+55 (11) 99999-9999',
    scheduleTimeLabel: 'Horário Exato de Entrega',
    scheduleTimeHint: 'Selecione a hora do seu resumo matinal ou noturno',
    interestsLabel: 'Editorias Selecionadas',
    interestsHint: 'Escolha quais temas você deseja receber no seu resumo',
    submitSubscribe: 'Confirmar Assinatura Autônoma',
    submitting: 'Registrando no Banco...',
    subscribeSuccess: '🎉 Assinatura confirmada com sucesso! Você receberá as editorias escolhidas no seu horário.',
    whatsAppModalTitle: 'Prévia do Payload WhatsApp',
    whatsAppModalSub: 'Edição expressa multitemática formatada para leitura em menos de 2 minutos:',
    copyWhatsAppText: 'Copiar Texto Formatado',
    copied: 'Copiado para Área de Transferência!',
    close: 'Fechar',
    footerRights: 'InfoAI Publishing Network. Todos os direitos reservados.',
    autonomousPledge: 'Operação orientada por Gemini 3.8 Flash com apuração cruzada de múltiplas fontes independentes e verificação rigorosa de fatos.',
    themeToggle: 'Alternar Tema',
    sectionTitle: 'Cadernos & Cobertura Completa',
    filterShowing: 'Exibindo pautas de',
    readMore: 'Ler matéria completa'
  },
  en: {
    siteTitle: 'INFOAI',
    mastheadSub: '100% Autonomous Digital Newspaper & Newsletter • High-Precision Multi-Topic Coverage',
    editionBadge: 'Official Daily Edition',
    systemStatusLabel: 'Editorial Status',
    systemStatusOnline: '100% Autonomous • Fully Operational',
    readOnWhatsApp: 'WhatsApp Brief (2 min)',
    subscribeBtn: 'Receive at My Schedule',
    whyItMatters: 'Why it matters',
    minRead: 'min read',
    sourcesVerified: 'cross-audited sources',
    breakingNews: 'REAL-TIME RADAR',
    latestEdition: "Today's Lead Story",
    archive: 'Edition Archives',
    sponsoredTag: 'SPONSORED SPOTLIGHT',
    officialPartner: 'Official Partner',
    exploreSponsor: 'Learn More',
    subscribeTitle: 'Tailor Your Intelligence Digest',
    subscribeSubtitle: 'Select your favorite sections delivered via Email or WhatsApp at the exact minute you prefer.',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'e.g., Sarah Jenkins',
    channelLabel: 'Delivery Channel',
    channelEmail: 'Email',
    channelWhatsApp: 'WhatsApp',
    channelBoth: 'Both Channels',
    emailLabel: 'Primary Email Address',
    emailPlaceholder: 'you@company.com',
    whatsappLabel: 'WhatsApp (with country code)',
    whatsappPlaceholder: '+1 (555) 123-4567',
    scheduleTimeLabel: 'Scheduled Delivery Time',
    scheduleTimeHint: 'Select when you want to receive your daily briefing',
    interestsLabel: 'Sections of Interest',
    interestsHint: 'Filter which sections to include in your daily briefing',
    submitSubscribe: 'Confirm Autonomous Subscription',
    submitting: 'Saving Preferences...',
    subscribeSuccess: '🎉 Subscription verified! You will receive your selected sections at your scheduled time.',
    whatsAppModalTitle: 'WhatsApp Express Payload Preview',
    whatsAppModalSub: 'Multi-topic express edition engineered for sub-2-minute reading:',
    copyWhatsAppText: 'Copy Formatted Text',
    copied: 'Copied to Clipboard!',
    close: 'Close',
    footerRights: 'InfoAI Publishing Network. All rights reserved.',
    autonomousPledge: 'Engineered with Gemini 3.8 Flash, multi-source cross-verification and strictly independent automated news curation.',
    themeToggle: 'Toggle Theme',
    sectionTitle: 'Full Editorial Desks & Coverage',
    filterShowing: 'Showing stories from',
    readMore: 'Read full story'
  },
  es: {
    siteTitle: 'INFOAI',
    mastheadSub: 'Periódico y Boletín 100% Autónomo • Cobertura Multitemática de Alta Precisión',
    editionBadge: 'Edición Diaria Oficial',
    systemStatusLabel: 'Estado Editorial',
    systemStatusOnline: '100% Autónomo • Sin Pendientes',
    readOnWhatsApp: 'Lectura WhatsApp (2 min)',
    subscribeBtn: 'Recibir en Mi Horario',
    whyItMatters: 'Por qué importa',
    minRead: 'min de lectura',
    sourcesVerified: 'fuentes cruzadas y auditadas',
    breakingNews: 'RADAR EN TIEMPO REAL',
    latestEdition: 'Edición Principal de Hoy',
    archive: 'Archivo de Ediciones',
    sponsoredTag: 'CONTENIDO PATROCINADO',
    officialPartner: 'Socio Editorial',
    exploreSponsor: 'Conocer Más',
    subscribeTitle: 'Personalice su Resumen de Inteligencia',
    subscribeSubtitle: 'Reciba sus secciones preferidas por Correo o WhatsApp a la hora exacta que elija.',
    fullNameLabel: 'Nombre Completo',
    fullNamePlaceholder: 'Ej: Dr. Carlos Méndez',
    channelLabel: 'Canal de Entrega',
    channelEmail: 'Correo Electrónico',
    channelWhatsApp: 'WhatsApp',
    channelBoth: 'Ambos Canales',
    emailLabel: 'Su Mejor Correo',
    emailPlaceholder: 'tu@empresa.com',
    whatsappLabel: 'WhatsApp con Código de País',
    whatsappPlaceholder: '+34 600 000 000',
    scheduleTimeLabel: 'Horario Exacto de Entrega',
    scheduleTimeHint: 'Seleccione la hora de entrega de su resumen diario',
    interestsLabel: 'Secciones Seleccionadas',
    interestsHint: 'Seleccione sus temas de interés',
    submitSubscribe: 'Confirmar Suscripción',
    submitting: 'Registrando...',
    subscribeSuccess: '🎉 ¡Suscripción confirmada! Recibirá sus secciones en su horario seleccionado.',
    whatsAppModalTitle: 'Vista Previa Payload WhatsApp',
    whatsAppModalSub: 'Edición exprés multitemática en menos de 2 minutos:',
    copyWhatsAppText: 'Copiar Texto',
    copied: '¡Copiado al portapapeles!',
    close: 'Cerrar',
    footerRights: 'InfoAI Publishing Network. Todos los derechos reservados.',
    autonomousPledge: 'Impulsado por Gemini 3.8 Flash con verificación cruzada de fuentes y rigor editorial autónomo.',
    themeToggle: 'Cambiar Tema',
    sectionTitle: 'Secciones y Cobertura Completa',
    filterShowing: 'Mostrando temas de',
    readMore: 'Leer noticia completa'
  },
  fr: {
    siteTitle: 'INFOAI',
    mastheadSub: 'Journal & Newsletter 100% Autonome • Couverture Multithématique de Haute Précision',
    editionBadge: 'Édition Quotidienne Officielle',
    systemStatusLabel: 'Statut Éditorial',
    systemStatusOnline: '100% Autonome • Pleinement Opérationnel',
    readOnWhatsApp: 'Lecture WhatsApp (2 min)',
    subscribeBtn: 'Recevoir à Mon Heure',
    whyItMatters: 'Pourquoi cela compte',
    minRead: 'min de lecture',
    sourcesVerified: 'sources croisées et vérifiées',
    breakingNews: 'RADAR EN TEMPS RÉEL',
    latestEdition: "À la Une Aujourd'hui",
    archive: 'Archives des Éditions',
    sponsoredTag: 'CONTENU SPONSORISÉ',
    officialPartner: 'Partenaire Officiel',
    exploreSponsor: 'En Savoir Plus',
    subscribeTitle: 'Personnalisez votre Veille Stratégique',
    subscribeSubtitle: 'Recevez vos rubriques favorites par Email ou WhatsApp à la minute de votre choix.',
    fullNameLabel: 'Nom Complet',
    fullNamePlaceholder: 'Ex: Julien Laurent',
    channelLabel: 'Canal de Réception',
    channelEmail: 'Email',
    channelWhatsApp: 'WhatsApp',
    channelBoth: 'Les Deux Canaux',
    emailLabel: 'Adresse Email Principale',
    emailPlaceholder: 'vous@entreprise.fr',
    whatsappLabel: 'Numéro WhatsApp (avec indicatif)',
    whatsappPlaceholder: '+33 6 12 34 56 78',
    scheduleTimeLabel: 'Heure de Réception Prévue',
    scheduleTimeHint: 'Choisissez le moment exact de livraison de votre briefing',
    interestsLabel: 'Rubriques Préférées',
    interestsHint: 'Sélectionnez les thèmes de votre édition',
    submitSubscribe: 'Confirmer l\'Abonnement',
    submitting: 'Enregistrement...',
    subscribeSuccess: '🎉 Abonnement confirmé ! Vous recevrez vos rubriques à l\'heure choisie.',
    whatsAppModalTitle: 'Aperçu du Format WhatsApp',
    whatsAppModalSub: 'Formaté pour une lecture express mobile en moins de 2 minutes :',
    copyWhatsAppText: 'Copier le Texte',
    copied: 'Copié dans le presse-papiers !',
    close: 'Fermer',
    footerRights: 'InfoAI Publishing Network. Tous droits réservés.',
    autonomousPledge: 'Propulsé par Gemini 3.8 Flash avec recoupement rigoureux de sources multiples.',
    themeToggle: 'Changer de Thème',
    sectionTitle: 'Rubriques & Couverture Complète',
    filterShowing: 'Affichage des articles de',
    readMore: 'Lire l\'article complet'
  },
  de: {
    siteTitle: 'INFOAI',
    mastheadSub: '100% Autonome Digitale Zeitung & Newsletter • Multithematische Berichterstattung',
    editionBadge: 'Offizielle Tagesausgabe',
    systemStatusLabel: 'Redaktionsstatus',
    systemStatusOnline: '100% Autonom • Voll Betriebsbereit',
    readOnWhatsApp: 'WhatsApp-Kompakt (2 Min)',
    subscribeBtn: 'Zu Meiner Wunschzeit',
    whyItMatters: 'Warum das wichtig ist',
    minRead: 'Min. Lesezeit',
    sourcesVerified: 'Geprüfte & gegengelesene Quellen',
    breakingNews: 'ECHTZEIT-RADAR',
    latestEdition: 'Heutige Titelgeschichte',
    archive: 'Ausgabenarchiv',
    sponsoredTag: 'GESPONSERTER BEITRAG',
    officialPartner: 'Offizieller Partner',
    exploreSponsor: 'Mehr Erfahren',
    subscribeTitle: 'Ihr persönliches Intelligenz-Briefing',
    subscribeSubtitle: 'Wählen Sie Ihre bevorzugten Ressorts per E-Mail oder WhatsApp zur Wunschzeit.',
    fullNameLabel: 'Vollständiger Name',
    fullNamePlaceholder: 'z.B. Dr. Thomas Weber',
    channelLabel: 'Empfangskanal',
    channelEmail: 'E-Mail',
    channelWhatsApp: 'WhatsApp',
    channelBoth: 'Beide Kanäle',
    emailLabel: 'Ihre E-Mail-Adresse',
    emailPlaceholder: 'ihre.mail@firma.de',
    whatsappLabel: 'WhatsApp-Nummer (mit Ländervorwahl)',
    whatsappPlaceholder: '+49 170 1234567',
    scheduleTimeLabel: 'Gewünschte Sendezeit',
    scheduleTimeHint: 'Wählen Sie Ihre bevorzugte Uhrzeit',
    interestsLabel: 'Bevorzugte Ressorts',
    interestsHint: 'Wählen Sie Ihre Themenschwerpunkte',
    submitSubscribe: 'Abonnement Bestätigen',
    submitting: 'Wird gespeichert...',
    subscribeSuccess: '🎉 Abonnement erfolgreich aktiviert! Die nächste Ausgabe erhalten Sie pünktlich.',
    whatsAppModalTitle: 'WhatsApp-Payload-Vorschau',
    whatsAppModalSub: 'Optimiert für 2-Minuten-Lektüre auf dem Smartphone:',
    copyWhatsAppText: 'Text Kopieren',
    copied: 'In die Zwischenablage kopiert!',
    close: 'Schließen',
    footerRights: 'InfoAI Publishing Network. Alle Rechte vorbehalten.',
    autonomousPledge: 'Betrieben mit Gemini 3.8 Flash, Multi-Quellen-Faktencheck und autonomer Redaktionsdisziplin.',
    themeToggle: 'Design Umschalten',
    sectionTitle: 'Ressorts & Gesamtabdeckung',
    filterShowing: 'Artikel aus dem Ressort',
    readMore: 'Ganzen Artikel lesen'
  },
  zh: {
    siteTitle: 'INFOAI',
    mastheadSub: '100% 全自主数字报刊与通讯 • 覆盖政治/财经/科技/体育的多板块全景新闻',
    editionBadge: '每日官方出版',
    systemStatusLabel: '编辑系统状态',
    systemStatusOnline: '100% 全自主运行 • 无未决事项',
    readOnWhatsApp: 'WhatsApp 速读版 (2分钟)',
    subscribeBtn: '按我的时间接收',
    whyItMatters: '核心影响与意义',
    minRead: '分钟阅读',
    sourcesVerified: '多方信源独立交叉审计',
    breakingNews: '实时全球雷达',
    latestEdition: '今日头条深度报道',
    archive: '历史刊物存档',
    sponsoredTag: '赞助支持内容',
    officialPartner: '官方合作伙伴',
    exploreSponsor: '了解详情',
    subscribeTitle: '定制您的专属全球全品类情报日报',
    subscribeSubtitle: '自由勾选您关心的板块（政治、经济、体育、科技等），按您指定的时刻准时送达。',
    fullNameLabel: '您的全名',
    fullNamePlaceholder: '例如：李明 / Dr. Zhang',
    channelLabel: '接收渠道',
    channelEmail: '电子邮件',
    channelWhatsApp: 'WhatsApp',
    channelBoth: '双渠道同步',
    emailLabel: '常用工作邮箱',
    emailPlaceholder: 'you@enterprise.com',
    whatsappLabel: 'WhatsApp 号码（含国际区号）',
    whatsappPlaceholder: '+86 138 0000 0000',
    scheduleTimeLabel: '指定送达时间',
    scheduleTimeHint: '选择您日常阅读早报或晚报的精确时刻',
    interestsLabel: '订阅资讯板块',
    interestsHint: '选择您希望接收的新闻分类',
    submitSubscribe: '确认自主订阅',
    submitting: '正在写入数据库...',
    subscribeSuccess: '🎉 订阅已确认！下一期日报将在您设定的时间准时送达。',
    whatsAppModalTitle: 'WhatsApp 极速版载荷预览',
    whatsAppModalSub: '针对全品类多板块 2 分钟极速阅读精心排版：',
    copyWhatsAppText: '复制排版文本',
    copied: '已复制到剪贴板！',
    close: '关闭',
    footerRights: 'InfoAI Publishing Network. 版权所有。',
    autonomousPledge: '由 Gemini 3.8 Flash 强力驱动，通过多源交叉事实核查实现全自动严肃新闻出版。',
    themeToggle: '切换外观模式',
    sectionTitle: '新闻专栏与全方位全景报道',
    filterShowing: '正在查看板块：',
    readMore: '阅读报道全文'
  }
};

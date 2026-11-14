import { SponsorAd } from '../types';

export const SPONSOR_ADS: SponsorAd[] = [
  {
    id: 'sponsor-ribbon-1',
    type: 'ribbon',
    sponsorName: 'Hostinger Cloud VPS',
    tagline: {
      pt: 'Infraestrutura NVMe ultra-veloz para agentes de IA e aplicações autônomas.',
      en: 'Ultra-fast NVMe cloud infrastructure for AI agents and autonomous workloads.',
      es: 'Infraestructura NVMe ultra rápida para agentes de IA y aplicaciones autónomas.',
      fr: 'Infrastructure Cloud NVMe ultra-rapide pour agents d\'IA et charges de travail autonomes.',
      de: 'Ultraschnelle NVMe-Cloud-Infrastruktur für KI-Agenten und autonome Workloads.',
      zh: '专为 AI 智能体与自主高并发业务打造的极速 NVMe 云基础设施。'
    },
    callToAction: {
      pt: 'Conhecer Servidores KVM',
      en: 'Explore KVM Servers',
      es: 'Explorar Servidores KVM',
      fr: 'Découvrir les Serveurs KVM',
      de: 'KVM Server Entdecken',
      zh: '了解 KVM 算力服务器'
    },
    link: 'https://www.hostinger.com/vps-hosting',
    badge: {
      pt: 'INFRAESTRUTURA PARCEIRA',
      en: 'OFFICIAL HOSTING PARTNER',
      es: 'INFRAESTRUCTURA SOCIA',
      fr: 'PARTENAIRE HÉBERGEMENT',
      de: 'OFFIZIELLER HOSTING-PARTNER',
      zh: '官方云计算合作伙伴'
    }
  },
  {
    id: 'sponsor-infeed-1',
    type: 'infeed',
    sponsorName: 'Supabase Enterprise',
    tagline: {
      pt: 'A alternativa de código aberto ao Firebase com Postgres nativo, autenticação e pgvector para IA.',
      en: 'The open-source Firebase alternative with full Postgres, built-in Auth, and pgvector for AI workloads.',
      es: 'La alternativa de código abierto a Firebase con Postgres nativo, autenticación y pgvector para IA.',
      fr: 'L\'alternative open source à Firebase avec Postgres complet, authentification intégrée et pgvector pour l\'IA.',
      de: 'Die Open-Source-Alternative zu Firebase mit vollem Postgres, integrierter Authentifizierung und pgvector für KI.',
      zh: '基于原生 Postgres 的开源后端云平台，内置完整鉴权与 pgvector 向量检索。'
    },
    callToAction: {
      pt: 'Iniciar Projeto Grátis',
      en: 'Start Free Project',
      es: 'Empezar Gratis',
      fr: 'Démarrer Gratuitement',
      de: 'Kostenlos Starten',
      zh: '免费开启数据库项目'
    },
    link: 'https://supabase.com',
    badge: {
      pt: 'DESTAQUE EDITORIAL DE TECNOLOGIA',
      en: 'EDITORIAL TECH SPOTLIGHT',
      es: 'DESTACADO DE TECNOLOGÍA',
      fr: 'COUP DE PROJECTEUR TECH',
      de: 'EDITORIAL TECH-SPOTLIGHT',
      zh: '编辑推荐前沿科技'
    }
  }
];


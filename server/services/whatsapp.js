import dotenv from 'dotenv';
dotenv.config();

const EVOLUTION_API_URL = (process.env.EVOLUTION_API_URL || 'http://localhost:8082').replace(/\/+$/, '');
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || 'InfoAI_Evolution_Key_2026_Secure';
const INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME || 'venderapido-bot';

/**
 * Normaliza número para padrão DDI + DDD + Número (ex: 5521975800055)
 */
export function formatPhoneNumber(phone) {
  if (!phone) return '';
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10 || cleaned.length === 11) {
    cleaned = '55' + cleaned;
  }
  return cleaned;
}

/**
 * Cria uma nova instância na Evolution API caso não exista
 */
export async function createInstance(instanceName = INSTANCE_NAME) {
  try {
    const res = await fetch(`${EVOLUTION_API_URL}/instance/create`, {
      method: 'POST',
      headers: {
        'apikey': EVOLUTION_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instanceName,
        qrcode: true,
        integration: 'WHATSAPP-BAILEYS'
      })
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[WhatsApp Service] Erro ao criar instância:', error.message);
    throw error;
  }
}

/**
 * Obtém o QR Code ou estado de conexão da instância
 */
export async function getConnectQRCode(instanceName = INSTANCE_NAME) {
  try {
    const res = await fetch(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, {
      method: 'GET',
      headers: {
        'apikey': EVOLUTION_API_KEY
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[WhatsApp Service] Erro ao obter QR Code:', error.message);
    throw error;
  }
}

/**
 * Verifica o status de conexão da instância
 */
export async function getConnectionState(instanceName = INSTANCE_NAME) {
  try {
    const res = await fetch(`${EVOLUTION_API_URL}/instance/connectionState/${instanceName}`, {
      method: 'GET',
      headers: {
        'apikey': EVOLUTION_API_KEY
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[WhatsApp Service] Erro ao consultar estado:', error.message);
    return { state: 'disconnected', error: error.message };
  }
}

/**
 * Envia mensagem de texto via WhatsApp
 */
export async function sendTextMessage(number, text, instanceName = INSTANCE_NAME) {
  const formattedNumber = formatPhoneNumber(number);
  try {
    const res = await fetch(`${EVOLUTION_API_URL}/message/sendText/${instanceName}`, {
      method: 'POST',
      headers: {
        'apikey': EVOLUTION_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: formattedNumber,
        text
      })
    });
    const data = await res.json();
    return { success: res.ok, data };
  } catch (error) {
    console.error(`[WhatsApp Service] Erro ao enviar mensagem para ${formattedNumber}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Envia imagem com legenda via WhatsApp
 */
export async function sendMediaMessage(number, mediaUrl, caption, instanceName = INSTANCE_NAME) {
  const formattedNumber = formatPhoneNumber(number);
  try {
    const res = await fetch(`${EVOLUTION_API_URL}/message/sendMedia/${instanceName}`, {
      method: 'POST',
      headers: {
        'apikey': EVOLUTION_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: formattedNumber,
        mediatype: 'image',
        mimetype: 'image/jpeg',
        caption: caption || '',
        media: mediaUrl
      })
    });
    const data = await res.json();
    return { success: res.ok, data };
  } catch (error) {
    console.error(`[WhatsApp Service] Erro ao enviar mídia para ${formattedNumber}:`, error.message);
    return { success: false, error: error.message };
  }
}


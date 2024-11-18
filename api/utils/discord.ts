import fetch from 'node-fetch';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1307992170250371132/OPCr6Zz3cXOsvycvFOoNOUjf4Yzqyi2kAb60Zo8_mV5mR2zb5U7Qf5bUn8E7Hn3NK7Ru';

interface DiscordMessage {
  content?: string;
  embeds?: {
    title: string;
    description: string;
    color?: number;
    fields?: { name: string; value: string; inline?: boolean }[];
    timestamp?: string;
  }[];
}

export async function sendDiscordNotification(notification: {
  title: string;
  message: string;
  type: 'transaction' | 'system' | 'reward';
}) {
  try {
    const colors = {
      transaction: 0x2ecc71,
    };

    const message: DiscordMessage = {
      embeds: [{
        title: notification.title,
        description: notification.message,
        color: colors[notification.type],
        timestamp: new Date().toISOString()
      }]
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
  }
}
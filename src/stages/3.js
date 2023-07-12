import { VenomBot } from '../venom.js';
import { storage } from '../storage.js';
import { STAGES } from './index.js';

export const stageThree = {
  async exec({ from, message }) {
    storage[from].address = message;
    storage[from].stage = STAGES.PEDIDO;

    let msg = 'Pedido *CANCELADO* com sucesso. \nVolte Sempre!';
    if (message === '*') {
      storage[from].stage = STAGES.INICIAL;
    } else {
      const itens = storage[from].itens;
      const desserts = itens.map((item) => item.description).join(", ");

      const totalItems = itens.length;
      const valorTotal = itens.reduce((total, item) => total + item.price, 0);

      const pixCode = '4c00f74f-56c4-4fbd-9b29-aa268deddc46';

      msg =
        `🗒️ *RESUMO DO PEDIDO*: \n\n📃 Documentos: *${desserts}* \n🎯 Informações: *${message}* \n💰 Valor do pedido: *${valorTotal.toFixed(
          2
        )} reais*. \n⏳ Tempo de entrega: *30-60 minutos*.\n\n💵 PIX:`;

      await VenomBot.getInstance().sendText({ to: from, message: msg });
      await VenomBot.getInstance().sendText({ to: from, message: pixCode });
    }

    return '✅ *Prontinho, pedido feito!* \nAgora, é só aguardar que logo te mando o seu documento com as instruções de uso.\n\n⏳ *Aguarde! (feito por ordem de pedidos)*.';
  },
};

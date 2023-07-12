import { VenomBot } from '../venom.js';
import { storage } from '../storage.js';
import { STAGES } from './index.js';

export const stageFour = {
  async exec({ from, message }) {
    const address = storage[from].address;
    const phone = from.split('@');

    storage[from].stage = STAGES.FALAR_COM_ATENDENTE;

    storage[from].finalStage = {
      startsIn: new Date().getTime(),
      endsIn: new Date().setSeconds(60), // 1 minute of inactivity
    };

    const itens = storage[from].itens;
    const desserts = itens.map((item) => item.description).join(', ');

    let total = 0;
    itens.forEach((item) => {
      total += item.price;
    });

    const msg = `🔔 *NOVO PEDIDO* 🔔: \n\n📞 Cliente: +${phone[0]} \n📃 Documentos: *${desserts}* \n🎯 Informações: *${address}* \n💰 Valor do pedido: *${total.toFixed(2)} reais*. \n⏳ Tempo de entrega: *30-60 minutos*.`;

    await VenomBot.getInstance().sendText({ to: from, message: msg });
  },
};

import { storage } from '../storage.js'
import { VenomBot } from '../venom.js'
import { STAGES } from './index.js'

export const initialStage = {
  async exec({ from }) {
    storage[from].stage = STAGES.MENU

    const venombot = await VenomBot.getInstance()

    const message = `👋 Olá, como vai?

Eu sou MedFarmacos BOT, o *assistente virtual* do ${venombot.getSessionName}.
*Posso te ajudar?* 🙋‍♂️

-----------------------------------
1️⃣ - FAZER PEDIDO
0️⃣ - FALAR COM ATENDENTE`

    await venombot.sendText({ to: from, message })
  },
}

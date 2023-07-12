import { VenomBot } from '../venom.js'
import { menu } from '../menu.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageTwo = {
  async exec(params) {
    const message = params.message.trim()
    const isMsgValid = /[1|2|3|4|5|#|*]/.test(message)

    let msg =
      '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️'

    if (isMsgValid) {
      if (['#', '*'].includes(message)) {
        const option = options[message]()
        msg = option.message
        storage[params.from].stage = option.nextStage
      } else {
        msg =
        `✅ *${menu[message].description}* adicionado com sucesso! \n\n` +
        'Deseja adicionar outro pedido ao carrinho?\n' +
        '```Digite outra opção```: \n\n' +
        '-----------------------------------\n#️⃣ - ```FINALIZAR pedido``` \n*️⃣ - ```CANCELAR pedido```'
        storage[params.from].itens.push(menu[message])
      }

      if (storage[params.from].stage === STAGES.INICIAL) {
        storage[params.from].itens = []
      }
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg })
  },
}

const options = {
  '*': () => {
    const message =
      '🔴 Pedido *CANCELADO* com sucesso. \n\n ```Volte Sempre!```'

    return {
      message,
      nextStage: STAGES.INICIAL,
    }
  },
  '#': () => {
    const message = `📃 Agora, preencha o formulário com essas *INFORMAÇÕES* para finalizar seu.
    
*PARA RECEITAS* 📃: 
    
Nome Completo:
End. Próx. Sua Casa:
Sua Cidade:
Nome do Medicamento/Receita:

-----------------------------------

*PARA ATESTADOS* 📃:

Nome Completo:
Data de Nascimento:
Cpf:
Sua Cidade:
Qual Dia Ate Qual Dia (05/05 Até 08/05):
Que Horas Estava no Hospital (12:24 Até 12:54):
CID (opcional):
Medico/Hospital (opcional):

-----------------------------------
*️⃣ - CANCELAR pedido`

    return {
      message,
      nextStage: STAGES.RESUMO,
    }
  },
}

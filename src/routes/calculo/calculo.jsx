import { useState } from 'react'
import './calculo.css'
import calculosDB from '../../services/firebaseConfig'
import { addDoc } from 'firebase/firestore'

function Calculo() {

  //Variaveis usadas para calcular o sistema
  const [resultado, setResultado] = useState()
  const [comprimentoPainel, setComprimentoPainel] = useState()
  const [larguraPainel, setLarguraPainel] = useState()
  const [potenciaPainel, setPotenciaPainel] = useState()
  const [placasPorInversor, setPlacasPorInversor] = useState()
  const [potenciaSistema, setPotenciaSistema] = useState()
  const [validator, setValidator] = useState(false)
   
  //Função responsavel pelo calculo do sistema
  function calcularSistema(POTENCIA_PAINEL,COMPRIMENTO_PAINEL,POTENCIA_TOTAL,LARGURA_PAINEL,MAXIMO_PLACAS_POR_INVERSOR) {
  
    const potenciaPorPlaca = POTENCIA_PAINEL / 1000; // Potência por placa em KW
    const quantidadePlacas = Math.ceil(POTENCIA_TOTAL / potenciaPorPlaca); // Quantidade de placas necessárias
    const quantidadeInversores = Math.ceil(quantidadePlacas / MAXIMO_PLACAS_POR_INVERSOR); // Quantidade de inversores necessários
    const comprimentoEstrutura = quantidadePlacas * COMPRIMENTO_PAINEL; // Comprimento da estrutura necessária
    const areaUtil = quantidadePlacas * COMPRIMENTO_PAINEL * LARGURA_PAINEL; // Área útil necessária

    postFirebase(quantidadePlacas, quantidadeInversores, potenciaPainel, comprimentoEstrutura, areaUtil)
  
    return {
      quantidadePlacas,
      quantidadeInversores,
      potenciaPainel: POTENCIA_PAINEL,
      comprimentoEstrutura,
      areaUtil
    };
  }
  
  //Função que captura os dados do formulario e chama a função de calculo do sistema 
  function capturarInputs(e){
    e.preventDefault()
    
    if (comprimentoPainel>0 && larguraPainel>0 && potenciaPainel>0 && placasPorInversor>0 && potenciaSistema>0) {
      setResultado(calcularSistema(potenciaPainel, comprimentoPainel, potenciaSistema, larguraPainel, placasPorInversor))
      
      setValidator(false)
    }
    
    else{
      setValidator(true)
    }
  }

  //Função para inserir os dados no FireBase
  async function postFirebase(quantidadePlacas, quantidadeInversores, potenciaPainel, comprimentoEstrutura, areaUtil){
    const calculo = await addDoc(calculosDB, {
      quantidadePlacas,
      quantidadeInversores,
      potenciaPainel,
      comprimentoEstrutura,
      areaUtil,
    })
  }
  
  
  return (
    <>
      <div className='formContainer'>
        <h1>Simule seu Projeto</h1>
        <form>
          <div className='inputContainer'>
            <label htmlFor="comprimetoPainel" className='comprimetoPainel'>Comprimento do Painel</label>
            <input type="number" name="comprimetoPainel" id="comprimetoPainel" placeholder='10m' onChange={(e) => setComprimentoPainel(e.target.value)} />
          </div>
          
          <div className='inputContainer'>
            <label htmlFor="larguraPainel">Largura do Painel</label>
            <input type="number" name="larguraPainel" id="larguraPainel" placeholder='2m' onChange={(e) => setLarguraPainel(e.target.value)} />
          </div>
          
          <div className='inputContainer'>
            <label htmlFor="potenciaPainel">Potencia do Painel</label>
            <input type="number" name="potenciaPainel" id="potenciaPainel" placeholder='550W' onChange={(e) => setPotenciaPainel(e.target.value)} />
          </div>
          
          <div className='inputContainer'>
            <label htmlFor="placasPorInversor">Placas por Inversor</label>
            <input type="number" name="placasPorInversor" id="placasPorInversor" placeholder='4' onChange={(e) => setPlacasPorInversor(e.target.value)} />
          </div>

          <div className='inputContainer'>
            <label htmlFor="potenciaTotal">Potencia do Sistema</label>
            <input type="number" name="potenciaTotal" id="potenciaTotal" placeholder='4.5KW' onChange={(e) => setPotenciaSistema(e.target.value)} />
          </div>

          <button onClick={capturarInputs}>Calcular</button>
        </form>
          {resultado && (
            <div className='resultadoContainer'>
              <p>Placas necessarias: {resultado.quantidadePlacas}</p>
              <p>Inversores necessarios: {resultado.quantidadeInversores}</p>
              <p>Paineis com potencia de: {resultado.potenciaPainel}</p>
              <p>O comprimento da estrutura sera de: {resultado.comprimentoEstrutura}m</p>
              <p>A area da estrutura sera de: {resultado.areaUtil}m</p>
            </div>
          )}
          
          {validator && (
            <div className='errorMessage'>
              <p>Por favor preencha todos os campos corretamente</p>
            </div>
          )}
      </div>
    </>
  )
}

export default Calculo

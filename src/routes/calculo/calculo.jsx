import { useEffect, useState } from 'react'
import { getDocs } from "firebase/firestore";
import calculosDB from '../../services/firebaseConfig';
import './calculo.css'

function Calculo() {
  
  useEffect(()=>{
    const getCalculos = async () => {
      const data = await getDocs(calculosDB)
      setCalculos(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
    }
    getCalculos()
  },[])

  const [calculos, setCalculos] = useState([])

  function calcularSistema(POTENCIA_PAINEL,COMPRIMENTO_PAINEL,POTENCIA_TOTAL,LARGURA_PAINEL,MAXIMO_PLACAS_POR_INVERSOR) {
  
    const potenciaPorPlaca = POTENCIA_PAINEL / 1000; // Potência por placa em KW
    const quantidadePlacas = Math.ceil(POTENCIA_TOTAL / potenciaPorPlaca); // Quantidade de placas necessárias
    const quantidadeInversores = Math.ceil(quantidadePlacas / MAXIMO_PLACAS_POR_INVERSOR); // Quantidade de inversores necessários
    const comprimentoEstrutura = quantidadePlacas * COMPRIMENTO_PAINEL; // Comprimento da estrutura necessária
    const areaUtil = quantidadePlacas * COMPRIMENTO_PAINEL * LARGURA_PAINEL; // Área útil necessária
  
    return {
      quantidadePlacas,
      quantidadeInversores,
      potenciaPainel: POTENCIA_PAINEL,
      comprimentoEstrutura,
      areaUtil
    };
  }

  function calcular(e){
    e.preventDefault()
    const inputComprimento = parseFloat(document.querySelector('#comprimetoPainel').value)
    const inputLargura = parseFloat(document.querySelector('#larguraPainel').value)
    const inputPotencia = parseFloat(document.querySelector('#potenciaPainel').value)
    const inputPlacasPorInversor = parseFloat(document.querySelector('#placasPorInversor').value)
    const inputPotenciaTotal = parseFloat(document.querySelector('#potenciaTotal').value)

    const resultado =calcularSistema(inputPotencia, inputComprimento, inputPotenciaTotal, inputLargura, inputPlacasPorInversor)
    return resultado
  }


  return (
    <>
      <div className='formContainer'>
        <h1>Simule seu Projeto</h1>
        <form>
          <div className='inputContainer'>
            <label htmlFor="comprimetoPainel" className='comprimetoPainel'>Comprimento do Painel</label>
            <input type="number" name="comprimetoPainel" id="comprimetoPainel" placeholder='10m' />
          </div>
          
          <div className='inputContainer'>
            <label htmlFor="larguraPainel">Largura do Painel</label>
            <input type="number" name="larguraPainel" id="larguraPainel" placeholder='2m' />
          </div>
          
          <div className='inputContainer'>
            <label htmlFor="potenciaPainel">Potencia do Painel</label>
            <input type="number" name="potenciaPainel" id="potenciaPainel" placeholder='550W' />
          </div>
          
          <div className='inputContainer'>
            <label htmlFor="placasPorInversor">Placas por Inversor</label>
            <input type="number" name="placasPorInversor" id="placasPorInversor" placeholder='4' />
          </div>

          <div className='inputContainer'>
            <label htmlFor="potenciaTotal">Potencia do Sistema</label>
            <input type="number" name="potenciaTotal" id="potenciaTotal" placeholder='4.5KW' />
          </div>

          <button onClick={calcular}>Calcular</button>
        </form>
      </div>
    </>
  )
}

export default Calculo

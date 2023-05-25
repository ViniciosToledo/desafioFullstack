import { useEffect, useState } from 'react'
import { getDocs } from "firebase/firestore";
import calculosDB from '../../services/firebaseConfig';
import './calculo.css'

function Calculo() {

  const [calculos, setCalculos] = useState([])
  const [comprimentoPainel, setComprimentoPainel] = useState(0)
  const [larguraPainel, setLarguraPainel] = useState(0)
  const [potenciaPainel, setPotenciaPainel] = useState(0)
  const [placasPorInversor, setPlacasPorInversor] = useState(0)
  const [potenciaMaxima, setPotenciaMaxima] = useState(0)

  useEffect(()=>{
    const getCalculos = async () => {
      const data = await getDocs(calculosDB)
      setCalculos(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
    }
    getCalculos()
  },[])


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

          <button>Calcular</button>

        </form>
      </div>
    </>
  )
}

export default Calculo

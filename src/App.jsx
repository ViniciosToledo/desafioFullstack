import { useEffect, useState } from 'react'
import { getDocs } from "firebase/firestore";
import './App.css'
import calculosDB from './services/firebaseConfig'

function App() {

  const [calculos, setCalculos] = useState([])

  useEffect(()=>{
    const getCalculos = async () => {
      const data = await getDocs(calculosDB)
      setCalculos(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
    }
    getCalculos()
  },[])


  return (
    <>
      <ul>
        {calculos.map(calculo => {
          return (
            <div>
              <li>{calculo.potenciaPainel}</li>
              <li>{calculo.comprimentoPainel}</li>
              <li>{calculo.larguraPainel}</li>
              <li>{calculo.placasPorInversor}</li>
              <li>{calculo.potenciaTotal}</li>
            </div>
          )
        })}
      </ul>
    </>
  )
}

export default App

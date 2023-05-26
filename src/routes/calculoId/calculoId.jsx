import { useParams } from "react-router-dom"
import { getDocs } from "firebase/firestore";
import calculosDB from "../../services/firebaseConfig";
import { useEffect, useState } from "react";
import './calculoId.css'


function CalculoId() {

    const {id} = useParams()
    const [calculos, setCalculos] = useState([])
    const [calculoFiltrado, setCalculoFiltrado] = useState({})
    
    useEffect(()=>{
      const getCalculos = async() => {
        const data = await getDocs(calculosDB)
        setCalculos(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
      }
      getCalculos()
      filterCreate(calculos)
    },[])
    
    function filterCreate(data){
      setCalculoFiltrado((calculos.find((item)=>item.id == id)))
    }
    useEffect(filterCreate, [calculos])

    return (
      <>
      {calculoFiltrado&&(
        <div className="container-infos">
          <strong>ID: {id}</strong>

          <ol class="alternating-colors">
            <li>
              <strong>Area ultil:</strong>
              <p>{calculoFiltrado.areaUtil}m²</p>
            </li>
            <li>
              <strong>Comprimento Necessario:</strong>
              <p>{calculoFiltrado.comprimentoEstrutura}m²</p>
            </li>
            <li>
              <strong>Potencia do Painel:</strong>
              <p>{calculoFiltrado.potenciaPainel}W</p>
            </li>
            <li>
              <strong>Quantidade de Inversores:</strong>
              <p>{calculoFiltrado.quantidadeInversores}</p>
            </li>
            <li>
              <strong>Quantidade de Placas Solares:</strong>
              <p>{calculoFiltrado.quantidadePlacas}</p>
            </li>
          </ol>
        </div>
        
      )}
      </>
    )
  }
  
  export default CalculoId
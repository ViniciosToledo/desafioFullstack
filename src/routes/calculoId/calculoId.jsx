import { Link, useParams } from "react-router-dom"
import { getDocs } from "firebase/firestore";
import calculosDB from "../../services/firebaseConfig";
import { useEffect, useState } from "react";
import './calculoId.css'


function CalculoId() {

    //Variaveis
    const {id} = useParams()
    const [calculos, setCalculos] = useState([])
    const [calculoFiltrado, setCalculoFiltrado] = useState({})
    
    //Hook usado para buscar dados da API ao iniciar o componente
    useEffect(()=>{
      const getCalculos = async() => {
        const data = await getDocs(calculosDB)
        setCalculos(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
      }
      getCalculos()
      filterCreate(calculos)
    },[])
    
    //Filtrando o elemento com ID respectivo da pagina
    function filterCreate(data){
      setCalculoFiltrado((calculos.find((item)=>item.id == id)))
    }
    useEffect(filterCreate, [calculos])

    return (
      <>
      {calculoFiltrado&&(
        <div className="container-infos">
          <strong>ID: {id}</strong>

          <ol className="alternating-colors">
            <li className="item-list">
              <strong className="bold">Area ultil:</strong>
              <p>{calculoFiltrado.areaUtil}m²</p>
            </li>
            <li className="item-list">
              <strong>Comprimento Necessario:</strong>
              <p>{calculoFiltrado.comprimentoEstrutura}m²</p>
            </li>
            <li className="item-list">
              <strong>Potencia do Painel:</strong>
              <p>{calculoFiltrado.potenciaPainel}W</p>
            </li>
            <li className="item-list">
              <strong>Quantidade de Inversores:</strong>
              <p>{calculoFiltrado.quantidadeInversores}</p>
            </li>
            <li className="item-list">
              <strong>Quantidade de Placas Solares:</strong>
              <p>{calculoFiltrado.quantidadePlacas}</p>
            </li>
          </ol>
          <button><Link to={`/calculo`}>Voltar</Link></button>
        </div>
        
      )}
      </>
    )
  }
  
  export default CalculoId
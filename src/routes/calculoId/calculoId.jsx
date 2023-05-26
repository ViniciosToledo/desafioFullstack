import { useParams } from "react-router-dom"
import { getDocs } from "firebase/firestore";
import calculosDB from "../../services/firebaseConfig";
import { useEffect, useState } from "react";


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
        <ul>
          <li>{console.log(calculoFiltrado)}</li>
          <li>{calculoFiltrado.areaUtil}</li>
          <li>{calculoFiltrado.comprimentoEstrutura}</li>
          <li>{calculoFiltrado.potenciaPainel}</li>
          <li>{calculoFiltrado.quantidadeInversores}</li>
          <li>{calculoFiltrado.quantidadePlacas}</li>
        </ul>
      )}
      </>
    )
  }
  
  export default CalculoId
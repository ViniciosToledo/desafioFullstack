import { useState, useEffect } from 'react'
import './listaDeCalculos.css'
import { getDocs } from "firebase/firestore";
import calculosDB from '../services/firebaseConfig';
import { Link } from 'react-router-dom';

function ListaDeCalculos() {

  const [calculos, setCalculos] = useState([])

  useEffect(()=>{
    const getCalculos = async() => {
      const data = await getDocs(calculosDB)
      setCalculos(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
    }
    getCalculos()
  },[])

    return (
      <>
      {calculos&&(
        <div className='container-id'>
          <h1>Projetos Anteriores</h1>
          {console.log(calculos)}
          <section className="secao-principal">
            <div className="list">
              <ul className="lista-Id">
                {calculos.map((item)=>{
                  return(
                    <div>
                      <li className='id-item'><Link className='link-items' to={`/calculo/${item.id}`}>{item.id}</Link></li>
                    </div>
                    
                  )
                })}
              </ul>
            </div>
            <div className="animation"></div>
          </section>
        </div>
      )}
      </>
    )
  }
  
  export default ListaDeCalculos
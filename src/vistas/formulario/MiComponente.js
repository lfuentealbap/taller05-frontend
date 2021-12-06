import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import Swal from 'sweetalert2'

const MiComponente = () => {
    const [patente, setPatente] = useState("")
    const [anio, setAnio] = useState("")
    const [marca1, setMarca1] = useState("")
    const [marca, setMarca] = useState([])
    const [autos, setAutos] = useState([])


    const isMobile = useMediaQuery({ query: `(max-width: 760px)`});
    
    const handleInputChangePatente = (event) => {
        setPatente(event.target.value)
    }

    const handleInputChangeAnio = (event) => {
        setAnio(event.target.value)
    }
    const cambioSelectMarca = (event) =>{
        setMarca1(event.target.value)
    }
    
    const enviarDatos = () => {
        console.log(`Enviando datos Patente:${patente} y Año:${anio}`)

        guardarAuto();
        handleInputClean();
    }

    useEffect(() => {
        getAutos()
    },[])
    const json = ""
    async function getAutos(){
        try{
            const response = await axios.get('http://localhost:4000/api/autos')
            if (response.status == 200){
                setAutos(response.data.autosconmarca) // Se setea el response json en la variable auto
            }
        } catch (error){
            console.error(error)
        }
    }
    useEffect(() => {
        getMarca()
    },[])
    async function getMarca(){
        try{
            const response = await axios.get('http://localhost:4000/api/marca')
            if (response.status == 200){
                setMarca(response.data.marca) // Se setea el response json en la variable auto
            }
        } catch (error){
            console.error(error)
        }
    }


    function guardarAuto(){
        axios.post('http://localhost:4000/api/autos', {
            patente: patente,
            anio: anio,
            idMarca: marca1
        })
        .then(function (response){
            if(response.status == 200){
                //alert("Registro correcto")
                Swal.fire(
                    'Registro exitoso!',
                    'El auto ha sido registrado exitosamente!',
                    'success'
                  )
                getAutos()
            }
            else {
                alert("Error al guardar el auto")
            }

        })
        .catch(function (error){
            console.log(error);
        });
    }

    
/*
    const columns = [
        {
            name: "Marca",
            field: "marca",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Patente",
            field: "patente",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Año",
            field: "anio",
            options: {
                filter: true,
                sort: false,
            }
        }
        
    ];

    
    const data1 = [
        {name: "Name 1", title: "Title 1", location: "Location 1", age: 30, salary: 10},
        {name: "Name 2", title: "Title 2", location: "Location 2", age: 31, salary: 11},
    ];
    */
    
/*
    const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData.name);
        setPatente(rowData.patente);
        setAnio(rowData.anio);
        setMarca(rowData.marca)
    };
*/
    const handleInputClean = () => {
        setPatente('');
        setAnio('');
        setMarca1('');
    }
/*
    const options = {
        filterType: 'checkbox',
        onlyOneRowCanBeSelected: true,
        onRowClick: handleRowClick
    };
*/
    return (
        <body>
            <div><br></br></div>
            <div className="container border">
                <h3>Registro de autos</h3>
                <br></br>
                <br></br>
                <form>
                    <div className="mb-3 col-3">
                        <label for="patente" className="form-label">Patente</label>
                        <input type="text" className="form-control" id="patente" name="patente" value={patente} onChange={handleInputChangePatente}></input>
                    </div>
                    <div className="mb-3 col-3">
                        <label for="anio" className="form-label">Año</label>
                        <input type="text" className="form-control" id="anio" name = "anio" value={anio} onChange={handleInputChangeAnio}></input>
                    </div>
                    <div className="mb-3 col-3">
                        <label for="marca1" className="form-label">Marca</label>
                        <select className="form-select" aria-label="Default select example" id="marca1" name="marca1" onChange={cambioSelectMarca}>
                            <option value="0" disabled selected>Seleccione una marca...</option>
                            {
                            marca?.map((marc, index)=>(
                                    <option key={index} value={marc._id}>{marc.descripcion}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-primary" onClick={()=>enviarDatos()}>Guardar</button>
                    </div>
                </form>
                <br></br>
                <br></br>
                <br></br>
                {/* Tabla de autos */}
                <div className="mb-3 col-3">
                <table className="table table-success table-striped">
                    <thead>
                        <tr>
                           
                            <th>MARCA</th>
                            <th>PATENTE</th>
                            <th >AÑO</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                           autos?.map((autito, index)=>(
                                <tr key={index}>
                                    <td >{autito.marca[0].descripcion}</td>
                                    <td >{autito.patente}</td>
                                    <td >{autito.anio}</td>
                                </tr>
                            ))
                         }
                        
                        
                    </tbody>
                </table>
                </div>
            </div>

        </body>
    )
}
export default MiComponente

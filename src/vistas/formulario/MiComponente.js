import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import MaterialDatatable from 'material-datatable';
import { useMediaQuery } from 'react-responsive';
import { Container, Grid, Button, Typography, TextField, Select, MenuItem } from '@material-ui/core';
import Swal from 'sweetalert2'

const MiComponente = () => {
    const [patente, setPatente] = useState("")
    const [anio, setAnio] = useState("")
    const [marca, setMarca] = useState("")
    const [autos, setAutos] = useState([])


    const isMobile = useMediaQuery({ query: `(max-width: 760px)`});

    const handleInputChangePatente = (event) => {
        setPatente(event.target.value)
    }

    const handleInputChangeAnio = (event) => {
        setAnio(event.target.value)
    }
    const cambioSelectMarca = (event) =>{
        setMarca(event.target.value)
    }

    const enviarDatos = () => {
        console.log(`Enviando datos Patente:${patente} y Año:${anio}`)

        guardarAuto();
    }

    useEffect(() => {
        getAutos()
    },[])
    const json = ""
    async function getAutos(){
        try{
            const response = await axios.get('localhost:4000/api/autos')
            if (response.status == 200){
                setAutos(response.data.auto) // Se setea el response json en la variable auto
            }
        } catch (error){
            console.error(error)
        }
    }


    function guardarAuto(){
        axios.post('localhost:4000/api/autos', {
            patente: patente,
            anio: anio,
            marca: marca
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

    /*
    const data1 = [
        {name: "Name 1", title: "Title 1", location: "Location 1", age: 30, salary: 10},
        {name: "Name 2", title: "Title 2", location: "Location 2", age: 31, salary: 11},
    ];
    */
    

    const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData.name);
        setPatente(rowData.patente);
        setAnio(rowData.anio);
        setMarca(rowData.marca)
    };

    const handleInputClean = () => {
        setPatente('');
        setAnio('');
        setMarca('');
    }

    const options = {
        filterType: 'checkbox',
        onlyOneRowCanBeSelected: true,
        onRowClick: handleRowClick
    };

    return (
        <Container maxWidth="md">
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Typography variant="h6">
                    Registro de Autos
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} fullWidth>
                <TextField id="patente" label="Patente" variant="outlined" onChange={handleInputChangePatente} value={patente} fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField id="anio" label="Año" variant="outlined" onChange={handleInputChangeAnio} value={anio} fullWidth />
            </Grid>
                <Grid item xs={12} md={6}>
                    <Select
                        value={marca}
                        onChange={cambioSelectMarca}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </Grid>
            <Grid item xs={12} md={2}>
                <Button variant="contained" color="primary" onClick={guardarAuto} fullWidth>Guardar</Button>

            </Grid>
           
        </Grid>

  
        <Grid item xs={12} md={12} className="tabla">
        <MaterialDatatable
            title={"Lista de autos"}
            data={autos}
            columns={columns}
            options={options}
        />
        
    </Grid>
  

    </Container>
    )
}
export default MiComponente
//variables globales
const formularioUI = document.querySelector("#formulario")
const listaActividadesUI = document.querySelector("#listaActividades")
let arrayActividades = [];
// let item = {
//         actividad: '',
//         estado: false
//     }
//Funciones

const CrearItem = (actividad) => {
        let item = {
            actividad: actividad,
            estado: false
        }
        arrayActividades.push(item)
            //sin return no regresa ningun valor
        return item;

    }
    //guardamos los datos en el LS
const GuardarDB = () => {
        localStorage.setItem("rutina", JSON.stringify(arrayActividades))
        PintarDB()
    }
    //mostramos los elementos en el HTML
const PintarDB = () => {
    listaActividadesUI.innerHTML = " ";
    arrayActividades = JSON.parse(localStorage.getItem("rutina"))
        //se inicia en null por si el arreglo comienza vacio no existira ningun error ya queno se pueden pintar elementos vacios
    if (arrayActividades === null) {
        arrayActividades = [];
    } else {
        arrayActividades.forEach(element => {

            if (element.estado) {
                listaActividadesUI.innerHTML +=
                    ` <div class="alert alert-success" role="alert">
        <i class="fa-brands fa-audible"></i>
        <b>${element.actividad}</b> -${element.estado}
        <span class="float-right span-icon">
        <i class="fa-solid fa-check"></i>
        <i class="fa-solid fa-trash"></i>
    </span>
    </div>`
            } else {
                listaActividadesUI.innerHTML +=
                    ` <div class="alert alert-primary" role="alert">
            <i class="fa-brands fa-audible"></i>
            <b>${element.actividad}</b> -${element.estado}
            <span class="float-right span-icon">
            <i class="fa-solid fa-check"></i>
            <i class="fa-solid fa-trash"></i>
        </span>
        </div>`
            }




        })
    }
}
const EliminarDB = (actividad) => {
    let indexArray;
    arrayActividades.forEach((elemento, index) => {
        if (elemento.actividad === actividad) {
            indexArray = index
        }


    })
    arrayActividades.splice(indexArray, 1)
    GuardarDB();
}



const EditarDB = (actividad) => {
    let indexArray = arrayActividades.findIndex((elemento) => {
        return elemento.actividad === actividad
    })
    arrayActividades[indexArray].estado = true;
    GuardarDB();
}

//EnventListener


formularioUI.addEventListener("submit", (e) => {
        e.preventDefault()
        let actividadUI = document.querySelector("#actividad").value;
        //validando si los campos estan vacios o no
        if (actividadUI.trim().length === 0) {
            alert("Los campos no pueden quedar vacios");
            return
        } else {
            CrearItem(actividadUI)
            GuardarDB()
            formularioUI.reset();
        }

    })
    //linea que realiza la carga de la tabla al entrar al html
document.addEventListener("DOMContentLoaded", PintarDB)


listaActividadesUI.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log(e.path[2].childNodes[3].innerHTML)
    // console.log(e.target.className)

    if (e.target.className === "fa-solid fa-check" || e.target.className === "fa-solid fa-trash") {
        let textoElegido = e.path[2].childNodes[3].innerHTML
        console.log(textoElegido)
            //eleccion eliminar
        if (e.target.className === "fa-solid fa-trash") {
            EliminarDB(textoElegido)
        }
        if (e.target.className === "fa-solid fa-check") {
            EditarDB(textoElegido)
        }
    }
})
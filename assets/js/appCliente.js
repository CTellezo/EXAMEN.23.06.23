var urlServer="";
var sesion=localStorage.getItem("nombre");

const checarSesion=()=>{
  if(sesion==null){
    window.location.href="index.html";
  }
  document.querySelector("#usuario").innerHTML=sesion;
}

const cerrarSesion=()=>{
    localStorage.clear();
    window.location.href="index.html";
}


const agregarCliente= async()=>{
    var nombre=document.querySelector("#nombre").value;
   
  
    

    if(nombre.trim()==='' ){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS',
            footer: 'CRUD CONTACTOS'
          })  
        return;       
    }


    // INSERTAR A LA BASE DE DATOS
    const datos=new FormData();
    datos.append("nombre",nombre);
    
    
    

    var respuesta=await fetch(urlServer+"php/cliente/agregarCliente.php",{
        method:'POST',
        body:datos
    });

    var resultado=await respuesta.json();

    if(resultado.success==true){
        Swal.fire({
            icon: 'success',
            title: 'EXITO!',
            text: resultado.mensaje,
            footer: 'CRUD CLIENTE'
          }) 
          document.querySelector("#formAgregar").reset();
         
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'CRUD CLIENTE'
          }) 
    }
    document.querySelector("#agregarModal").click();
    cargarClientes();
}

const cargarClientes=async()=>{

    var respuesta=await fetch(urlServer+"php/cliente/cargarClientes.php",{});
    var registrosHTML=``;
    var resultado=await respuesta.json();

    //console.log(resultado);

    resultado.data.forEach(fila=>{
        registrosHTML+=`
     <tr>
        <td>${fila[1]}</td>
       
        <td><button class="btn btn-success "  data-bs-toggle="modal" data-bs-target="#editarModal" onclick="cargarCliente(${fila[0]})"><i class="bi bi-pencil-square p-1"></i>Editar</button></td>
        <td><button class="btn btn-danger" onclick="eliminarCliente(${fila[0]})"> <i class="bi bi-trash p-1"></i>Eliminar</button></td>
      </tr>
        `;
    });
    document.querySelector("#registros").innerHTML=registrosHTML;

}

const eliminarCliente=(clienteid)=>{
    Swal.fire({
        title: '¿Estás seguro de eliminar este Contacto?',
        showDenyButton: true,
        confirmButtonText: 'SI',
        confirmButtonColor: '#198754',
        denyButtonText: 'NO',
      }).then(async(result) => {
        if (result.isConfirmed) {

            const datos=new FormData();
                datos.append("clienteid",clienteid);

            var respuesta=await fetch(urlServer+"php/cliente/eliminarCliente.php",{
                method:'POST',
                body:datos
            });
        
            var resultado=await respuesta.json();
        
            if(resultado.success==true){
                Swal.fire({
                    icon: 'success',
                    title: 'EXITO!',
                    text: resultado.mensaje,
                    footer: 'CRUD CONTACTOS'
                  }) 
                 
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: resultado.mensaje,
                    footer: 'CRUD CONTACTOS'
                  }) 
            }
            cargarClientes();         
        } 
      })
}

const cargarCliente=async(clienteid)=>{
    const datos=new FormData();
    datos.append("clienteid",clienteid);
    
    var respuesta=await fetch(urlServer+"php/cliente/cargarCliente.php",{
        method:'POST',
        body:datos
    });
    
    var resultado=await respuesta.json();

    document.querySelector("#clienteid").value=resultado.clienteid;
    document.querySelector("#enombre").value=resultado.nombre;
 
   

}

const editarCliente=async()=>{
    var clienteid=document.querySelector("#clienteid").value;
    var nombre=document.querySelector("#enombre").value;
    
   

    if(nombre.trim()==='' ){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS',
            footer: 'CRUD CONTACTOS'
          })  
        return;       
    }

     // MODIFICAR EN LA BASE DE DATOS
     const datos=new FormData();
     datos.append("clienteid",clienteid);
     datos.append("nombre",nombre);
  
     
     
 
     var respuesta=await fetch(urlServer+"php/cliente/editarCliente.php",{
         method:'POST',
         body:datos
     });
 
     var resultado=await respuesta.json();
     document.querySelector("#editarModal").click();
     if(resultado.success==true){        
         Swal.fire({
             icon: 'success',
             title: 'EXITO!',
             text: resultado.mensaje,
             footer: 'CRUD CLIENTES'
           }) 
           document.querySelector("#formEditar").reset();
          
     }else{
         Swal.fire({
             icon: 'error',
             title: 'ERROR',
             text: resultado.mensaje,
             footer: 'CRUD CLIENTES'
           }) 
     }     
     cargarClientes();

}
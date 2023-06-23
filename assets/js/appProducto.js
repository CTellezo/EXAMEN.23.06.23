let productos=JSON.parse(localStorage.getItem("productos"));

if(!productos){  localStorage.setItem("productos",JSON.stringify([]));}

var add=document.querySelector("#agregar")
add.onclick=()=>{
    //RECOPILA DATOS
    let nombre=document.querySelector("#nombre").value;
    let precio=document.querySelector("#precio").value;
    let stock=document.querySelector("#stock").value;
    let categoria=document.querySelector("#categoria").value;
    //VALIDAR DATOS
    if(nombre.trim()===''||precio.trim()===''||stock.trim()===''||categoria.trim()===''){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'CAMPOS VACIOS',
            footer: 'TIENDITA CECYTO'
        })
        return;
    }
    let producto={nombre,precio,stock, categoria}
    productos.push(producto);
    localStorage.setItem("productos",JSON.stringify(productos))
    document.querySelector("#formAdd").reset();
    document.querySelector("#addModalProducto").click()
    mostrarProductos();
}

const mostrarProductos=()=>{
    var productosHTML="";
    productos=JSON.parse(localStorage.getItem("productos"))
    let i=1;
    productos.map(producto=>{
        productosHTML+=`<div class="card bg-white text-dark w-25 m-auto mb-2 p-4">
        <p><b>Nombre: </b>${producto.nombre}</p>
        <p><b>Stock: </b>${producto.stock}</p>
        <p><b>Precio: </b>$${producto.precio}</p>
        <p><b>Categoria: </b>${producto.categoria}</p>
        <button class="btn btn-danger" onclick="eliminarProducto(${i})">Eliminar</button>
        </div>`
        
    })
    document.querySelector("#listProductos").innerHTML=productosHTML;
    mostrarCategorias();
}

const eliminarProducto=(id)=>{
    Swal.fire({
        title: 'Estas seguro de eliminar producto?',
        showDenyButton: true,
        confirmButtonText: 'SI',
        denyButtonText: 'NO',
    }).then((result) => {
        if (result.isConfirmed) {
            productos=JSON.parse(localStorage.getItem("productos"))
            let productos2=new Array();
            let i=1
            productos.map(producto=>{
                if(i!=id){
                    productos2.push(producto)
                }
                i++;
            })
            localStorage.setItem("productos",JSON.stringify(productos2))
            mostrarProductos();         
        } else if (result.isDenied) {
            return;
        }
    })
}

const mostrarCategorias=()=>{
    var categoriasHTML="";
    categorias=JSON.parse(localStorage.getItem("categorias"))
    categorias.map(categoria=>{
        categoriasHTML+=`<option value="${categoria.nombre}">${categoria.nombre}</option>`;        
    })
    document.querySelector("#categoria").innerHTML=categoriasHTML;
}
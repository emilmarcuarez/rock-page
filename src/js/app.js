document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    NavegacionFija();
    crearGaleria();
    scrollNav();
}

function NavegacionFija(){
    const barra=document.querySelector('.header');
    const sobreFestival=document.querySelector('.sobre-festival');
    const body=document.querySelector('body');

    window.addEventListener('scroll', function(){
        console.log(sobreFestival.getBoundingClientRect());
        if(sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }

    });
}
// sobreFestival.getBoundingClientRect().top<0 para saber cuando pase la primera seccion
function scrollNav(){
    const enlaces=document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace=>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const seccionScroll=e.target.attributes.href.value;
           const seccion=document.querySelector(seccionScroll);
           seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}

function crearGaleria(){
    const galeria=document.querySelector('.galeria-imagenes');
// recorremos cada una de las imagenes que se encuentran en la carpeta thumb y ellas estan enumeradas del 1 al 12
    for(let i=1; i<=12;i++){
        const imagen=document.createElement('picture');
        imagen.innerHTML=`
        <source srcset="build/img/thumb/${i}.avif" type="imagen/avif">
        <source srcset="build/img/thumb/${i}.webp" type="imagen/webp">
         <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        imagen.onclick=function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const imagen=document.createElement('picture');
    imagen.innerHTML=`
    <source srcset="build/img/grande/${id}.avif" type="imagen/avif">
    <source srcset="build/img/grande/${id}.webp" type="imagen/webp">
     <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;
// crear el overlay con la imagen
    const overlay=document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick=function(){
        const body=document.querySelector('body');
        // para poder cerrar una foto de la galeria al darle click en cualquier parte
        body.classList.remove('fijar-body');
        overlay.remove();
    }
// Boton para cerrar el modal
const cerrarModal=document.createElement('P');
cerrarModal.textContent='X';
cerrarModal.classList.add('btn-cerrar');
cerrarModal.onclick=function(){
    const body=document.querySelector('body');
    // para poder darle scroll luego de cerrar una foto de la galeria
    body.classList.remove('fijar-body');
    overlay.remove();
}
overlay.appendChild(cerrarModal);

// añadirlo al html
    const body=document.querySelector('body');
    body.appendChild(overlay);
    // para no darle scroll
    body.classList.add('fijar-body');
}
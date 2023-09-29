// GULP
const {src, dest, watch, parallel}=require("gulp");

// CSS
const sass=require("gulp-sass")(require('sass'));
const plumber=require('gulp-plumber');
const autoprefixer=require('autoprefixer');
const cssnano=require('cssnano');
const postcss=require('gulp-postcss');
const sourcemaps=require('gulp-sourcemaps');

// IMAGENES
const cache=require('gulp-cache'); //hacer las imagenes mas livianas instalando la dependencia cache
const imagemin=require('gulp-imagemin'); //hacer las imagenes mas livianas instalando la dependencia imagenin
const webp=require("gulp-webp");  //se agrega la dependencia para crear imagenes .webp
const avif=require("gulp-avif"); //se crea dependencia para crear imagenes avif

// Javascript
const terser=require('gulp-terser-js');

function css(done){
// src para identificar el archivo y DEST para guardarlo
src('src/scss/**/*.scss') // INDENTIFICAR EL ARCHIVO SASS
    .pipe(sourcemaps.init())
    .pipe(plumber())  // 
    .pipe(sass())  // COMPILARLO
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe( dest("build/css"));//ALMACENAR EN DISCO DURO


    done();//callback que avisa a gulp cuando llegamos al final
}

// funcion para transformar las imagenes de png y jpg a webp
function versionWebp(done){
    const opciones= {
        quality:50
    };

    src('src/img/**/*.{png,jpg}') //va a buscar imagenes png y jpg
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )//ubicacion de las imagenes
    done();
}

// funcion para aligerar las imagenes usando imagenin y cache
function imagenes(done){

    const opciones={
        optimizationLevel:3
    }

    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    done();
}

// Funciones para crear imagenes tipo avif
function versionAvif(done){
    
    const opciones= {
        quality:50
    };

    src('src/img/**/*.{png,jpg}') //va a buscar imagenes png y jpg
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )//ubicacion de las imagenes
    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
         .pipe(terser())
         .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

        done();
}

function dev(done){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)
    done();
}

exports.css=css;
exports.js=javascript;
exports.imagenes=imagenes;
exports.versionWebp=versionWebp;
exports.versionAvif=versionAvif;
exports.dev=parallel(javascript,imagenes, versionWebp, versionAvif, dev); //ejecuta la de webp y la de dev automaticamente. inician las 2 al mismo tiempo
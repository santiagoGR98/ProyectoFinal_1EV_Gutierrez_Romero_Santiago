/*++++ CONSULTAS EN COLECCIÓN RED SOCIAL ++++*/

/*En este documento vamos a realizar consultas sobre la
 colección RedSocial la cual se alberga en la base de datos
 g2_proyecto.*/

 /*Los diferentes campos que podemos encontrar en esta colección
  son: Nombre, Apellidos, Publicaciones, NombresUsuarios,
  NumPublicaciones, HorasDeUso, Premium, FechaIngreso, CodPost
  , Direccion, Telefono*/


  /*Consulta 1 Uso de operador $and explicito para concatenar dos condiciones y uso de operador $exists para recuperar
  aquellos documentos en los que no exista el campo "Publicaciones" y si exista el campo "CodPost". El resultado han sido 
  4 documentos que cumplen con dichas condiciones de los 31 existentes.*/

      db.RedSocial.find( { $and: [ { Publicaciones: { $exists: false } }, { CodPost: { $exists: true } } ] } ).pretty()

  /*Consulta 2 Uso de operador $or, con este operador lo que hemos hecho es especificar dos condiciones las cuales pueden
   o no ser cumplidas por los documentos, en este caso se pide que en el Documento embebido "NumPublicaciones" se cumplan
   una o las dos de las siguientes condiciones, que el usuarios tenga menos de 5 fotos publicadas o que tengan mas de 100
    frases publicadas o ambas condiciones. En este caso han sido 9 los documentos resultantes.*/

     db.RedSocial.find( { $or: [ { "NumPublicaciones.Fotos": { $lt: 5 } }, { "NumPublicaciones.Frases": { $gt: 100  } } ] } ).pretty()

/*Consulta 3 uso de and implicito con operadores $lt y $gt y busqueda de campo fecha. En este caso tratamos de listar aquellos
 documentos en los que los usuarios hayan hecho su ingreso en la red social entre el 1 de enero del 2000 y el 1 de enero
  del 2005. Hemos obtenido 6 resultados, es decir 6 usuarios que ingresaron a la página entre estas fechas.*/

     db.RedSocial.find( { FechaIngreso: { $lt: new Date(2005,01,01), $gt: new Date(2000,01,01) } } ). pretty()

/*Consulta 4 En esta consulta hacemos uso de varios operadores, en primer lugar el operador $and para concadenar condiciones,
 las cuales serán un "Publiciones" $not $gt: 50 (que las publicaciones no sean más de 50), y "Direccion" $exists: true (y que el 
    campo direccion exista en los documentos con menos 50 publicaciones.). EN ESTE CASO AL ESPECIFICAR EL OPERADOR $NOT 
     EN CONJUNTO CON $GT: 50 TAMBIÉN LISTAREMOS AQUELLOS USUARIOS QUE NO TENGAN NINGUNA PUBLICACIÓN, LO CUAL SIGNIFICA QUE NO
     EXISTA EL CAMPO PUBLICACIÓN EN DICHOS DOCUMENTOS. En este caso hemos obtenido 6 resultados.*/

     db.RedSocial.find( { $and: [ { Publicaciones: { $not: {$gt: 50} } }, {Direccion: {$exists: true }}] } ).pretty()

/*Consulta 5 En esta consulta haremos uso de el operador $regex con el fin de listar
todos los documentos cuyo campo "NombreUsuarios" de tipo array contenga un tag que comienze por la letra P.*/

    db.RedSocial.find( { NombresUsuarios: { $regex: /^P/ } } ).pretty()

/*Consulta 6 En esta consulta haremos uso del operador $and explicito el cual nos permitirá buscar en nuestra base de 
 datos aquellos usuarios que hayan hecho el ingreso en la página entre el 1 de enero de 2005 y el 1 de enero de 2020 y además que hayan publicado más 
  de 50 fotos. En este caso hemos obtenido 3 resultados.*/

  db.RedSocial.find( { $and: [ { FechaIngreso: { $lt: new Date(2020,01,01), $gt: new Date(2005,01,01) } }, { "NumPublicaciones.Fotos": { $gt: 50 } } ] } ).pretty()

/*Consulta 7    ++++ COMENTAR EN PRESENTACIÓN ++++
 En este caso vamos a hacer una consulta que sea igual a la anterior solo que también añadiremos lass condiciones
 de que el numero de publicaciones total sea mayor que 100 y que los usuarios sean premium. Además también hemos acotado las 
  fechas entre el 1 de enero de 2007 y el 1 de enero de 2012. Se han obtenido 2 resultados.*/

 db.RedSocial.find( { $and: [ 
  { FechaIngreso: { $lt: new Date(2012,01,01), $gt: new Date(2007,01,01) } },
  { "NumPublicaciones.Fotos": { $gt: 50 } }, 
  { Publicaciones: { $gt: 100 } },
  { Premium: { $eq: true } },
  ] } ).pretty()

  db.RedSocial.count( { $and: [ 
    { FechaIngreso: { $lt: new Date(2012,01,01), $gt: new Date(2007,01,01) } },
    { "NumPublicaciones.Fotos": { $gt: 50 } }, 
    { Publicaciones: { $gt: 100 } },
    { Premium: { $eq: true } },
    ] } )

/*Consulta 8    ++++ COMENTAR EN PRESENTACIÓN ++++
En este caso vamos a tratar con aquellos campos que no son comunes a todos los documentos, estos son "CodPost"
"Telefono", "Direccion", además de contener estos campos también buscaremos aquellos usuarios que tengan más de 1 hora
de uso o igual a 1 horas de uso, que sean usuarios premium y en último lugar que uno de los nombres de usuario contenidos en 
el array "NombresUsuarios" comienze por la letra "f", independientemente de que sea mayúscula o minúscula.Se ha obtenido
 1 resultado.*/

 db.RedSocial.find( { $and: [ 
  { CodPost: {$exists: true } },
  { Direccion: {$exists: true } }, 
  { Telefono: {$exists: true } },
  { Premium: { $eq: true } },
  { HorasDeUso: { $gte: 1 } },
  { NombresUsuarios: { $regex: /^f/i } }
  ] } ).pretty()

  db.RedSocial.count( { $and: [ 
    { CodPost: {$exists: true } },
    { Direccion: {$exists: true } }, 
    { Telefono: {$exists: true } },
    { Premium: { $eq: true } },
    { HorasDeUso: { $gte: 1 } },
    { NombresUsuarios: { $regex: /^f/i } }
    ] } )

  /*Consulta 9   ++++ COMENTAR EN PRESENTACIÓN ++++
  En esta consulta buscamos listar aquellos documentos en los que sus usuarios se hayan registrado en la página entre 
  el 1 de enero del 2000 y el 1 de enero del 2020, que no tengan un numero de publicaciones igual a 23, que sus nombres de
  usuario contenidos en un array de documentos no contengan las letras "U" y "A" independientemente de que sean mayusculas 
  o minúsculas, que el número de horas de uso no sea igual a 1 hora y en último lugar que el campo publicaciones 
  exista ya que al decir que queremos aquellos documentos que tengan un numero de publicaciones no igual a 23 aquellos
  documentos en los que no exista el campo "Publicaciones" también se listarían. Se han obtenido 3 documentos que 
  cumplimenten estas condiciones. */

  db.RedSocial.find( { $and: [ 
    { FechaIngreso: { $gt: new Date(2000,01,01), $lt: new Date(2020,01,01) } },
    { Publicaciones: { $ne: 23 } },
    { Publicaciones: {$exists: true } },
    { NombresUsuarios: { $nin: [ /U/i, /A/i ] } },
    { HorasDeUso: { $ne: 1}  },
     ] } ).pretty()

     db.RedSocial.count( { $and: [ 
      { FechaIngreso: { $gt: new Date(2000,01,01), $lt: new Date(2020,01,01) } },
      { Publicaciones: { $ne: 23 } },
      { Publicaciones: {$exists: true } },
      { NombresUsuarios: { $nin: [ /U/i, /A/i ] } },
      { HorasDeUso: { $ne: 1}  },
       ] } )

  /*Consulta 10   ++++ COMENTAR EN PRESENTACIÓN ++++ 
   En esta consulta hacemos uso de el operador $or con el cual vamos a tratar de buscar 2 tipos de documentos:
   -Tipo 1 de documento (1º $and): Usuarios que tengan menos de 10 publicaciones, que hayan ingresado en la página después
    del 1 de enero de 2010 y que sean usuarios premium. (Se deben de cumplir todas las condiciones).
   -Tipo 2 de documento (2º $and): Usuarios que tengan mas de 50 publicaciones, que hayan ingresado a la página antes del
    1 de enero de 2007, que hayan especificado su dirección y que no hayan especificado su código postal.(Se deben de 
    cumplir todas las condiciones). En este caso se han obtenido 3 documentos*/

 db.RedSocial.find( {
  $or: [
      { $and: [ { Publicaciones: { $lt : 10 } }, { FechaIngreso : { $gt: new Date(2010,01,01) } }, { Premium: { $eq: true } } ] },
      { $and: [ { Publicaciones: { $gt : 50 } }, { FechaIngreso : { $lt: new Date(2007,01,01) } }, { Direccion: {$exists: true } }, { CodPost: {$exists: false } } ] }
  ]
} )

db.RedSocial.count( {
  $or: [
      { $and: [ { Publicaciones: { $lt : 10 } }, { FechaIngreso : { $gt: new Date(2010,01,01) } }, { Premium: { $eq: true } } ] },
      { $and: [ { Publicaciones: { $gt : 50 } }, { FechaIngreso : { $lt: new Date(2007,01,01) } }, { Direccion: {$exists: true } }, { CodPost: {$exists: false } } ] }
  ]
} )

  /*Consulta 11   ++++COMENTAR EN PRESENTACIÓN
   En este caso la consulta es similar a la anterior solo que en este caso con el uso del operador $and
    combinado con el operado $or hemos conseguido crear 3 perfiles que queremos listar haciendo uso únicamente de 
     2 operadores $and:
    - Perfil 1: Se listarán aquellos documentos cuyo array "NombresUsuarios contenga 2 elementos", cuyos
     nombres empiezen por "M", que tengan el su documentos el campo "codpost" y que hayan hecho ingreso en la página entre el 
     1 de enero de 2020 y el 1 de enero de 2018
     -Perfil 2: Se listarán aquellos documentos que en el array "NombresUsuarios" presenten dos elementos, quee su fecha
     de ingreso haya sido entre el 1 de enero de 2010 y el 1 de enero de 2015, que sean usuarios premium, que no cuenten
     con el campo "codPost" y que hayan publicado menos de 20 fotos. ("NumPublicaciones.Fotos")
     -Perfil 3: Sería igual al perfil 2 pero cambiaría la última condición que sería que el usuario haya 
      publicado más de 75 frases. Se han obtenido 3 resultados. */

  db.RedSocial.find( {
    $or: [
        { $and: [ { NombresUsuarios: { $size : 2 } }, { Nombre : { $regex: /^M/ } }, { CodPost: { $exists: true } }, { FechaIngreso: { $gt: new Date(2018,01,01), $lt: new Date(2020,01,01) } } ] },
        { $and: [ { NombresUsuarios: { $size : 2 } }, { FechaIngreso : { $gt: new Date(2010,01,01), $lt: new Date(2015,01,01) } }, { Premium: {$eq: true } }, { CodPost: {$exists: false } }, { $or: [ { "NumPublicaciones.Fotos": { $lt: 20 } }, { "NumPublicaciones.Frases": { $gt: 75  } } ] } ] }
    ]
  } )

  db.RedSocial.count( {
    $or: [
        { $and: [ { NombresUsuarios: { $size : 2 } }, { Nombre : { $regex: /^M/ } }, { CodPost: { $exists: true } }, { FechaIngreso: { $gt: new Date(2018,01,01), $lt: new Date(2020,01,01) } } ] },
        { $and: [ { NombresUsuarios: { $size : 2 } }, { FechaIngreso : { $gt: new Date(2010,01,01), $lt: new Date(2015,01,01) } }, { Premium: {$eq: true } }, { CodPost: {$exists: false } }, { $or: [ { "NumPublicaciones.Fotos": { $lt: 20 } }, { "NumPublicaciones.Frases": { $gt: 75  } } ] } ] }
    ]
  } )

  /*Consulta 12.  CONSULTAS PARA COMPROBAR QUE LOS CAMPOS DE LA COLECCIÓN ESTÁN CORRECTOS
  Con esta consulta lograremos buscar aquellos documentos que tengan un "string" en 
  el campo deseado, en nuestro caso vamos a elegir el campo "Nombre", van a parecer todos los documentos de la 
  colección ya que todos los nombres van entrecomillados y por lo tanto son un string, aun así esto nos podría
  ser de ayuda a la hora de buscar errores en nuestro código de inserciones . Tambien podríamos comprobar
  aquellos documentos que tengan un campo concreto decimal, booleano, fecha, array, objectID... */

  db.RedSocial.find( { Nombre: { $type: "string" } } ).count()

  db.RedSocial.find( { NombresUsuarios: { $type: "array" } } ).count()

  db.RedSocial.find( { HorasDeUso: { $type: "decimal" } } ).count()

  db.RedSocial.find( { FechaIngreso: { $type: "date" } } ).count()

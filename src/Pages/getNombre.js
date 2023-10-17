function generarNombre() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let cadena = '';
    const caracteresLength = caracteres.length;
    
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * caracteresLength);
      cadena += caracteres.charAt(randomIndex);
    }
    
    return cadena;
  }
  export default generarNombre;
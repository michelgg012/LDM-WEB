




    export const globalColors =  {
    dark: '#333',
    confirmed: '#1f7008',
    danger: '#e71d36',
    background:'#fff',
    success: '#2E86C1',
    warning: '#fca311',

    primary:'fff'
    }

    export  function capitalizar(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }


export const globalStyles = ( {

   
      container: {
        display:'flex',
        backgroundColor: globalColors.background,
        justifyContent:'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        boxSizing: 'border-box',
      },
      

  
    primaryButton: {
      backgroundColor: globalColors.primary,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width:'100%',
      alignItems: 'center',
      
    },
  
    secundaryButton: {
      backgroundColor: globalColors.primary,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width:160,
      alignItems: 'center',
    },
  
    buttonText: {
      color: globalColors.background,
      fontSize: 18,
    },
  } );



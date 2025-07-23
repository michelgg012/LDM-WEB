
    export  function Capitalizar(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }

// export const Catalogo = () => {
//   const { articulos, filterByRubro, filterBySubrubro } = CatalogoHook();

//   const getImagePath = (idarticulo) => {
//     const formattedId = idarticulo.toString().padStart(5, '0');
//     const extensions = ['png', 'jpg'];
//     for (const ext of extensions) {
//       try {
//         return new URL(`../../assets/articulos/${formattedId}X.${ext}`, import.meta.url).href;
//       } catch (error) {
//         // Continue to the next extension
//       }
//     }
//     return notFound;
//   };




//   const groupedBySubrubro = articulos.reduce((acc, articulo) => {
//     const { idsubrubro, subrubro } = articulo;
//     if (!acc[idsubrubro]) {
//       acc[idsubrubro] = { subrubro, articulos: [] };
//     }
//     acc[idsubrubro].articulos.push(articulo);
//     return acc;
//   }, {});

//   return (
//     <>
//       <div className="filters">
//         <button className="btnFilters" onClick={() => filterByRubro(1)}>Lacteos</button>
//         <button className="btnFilters" onClick={() => filterByRubro(2)}>Embutidos</button>
//         <button className="btnFilters" onClick={() => filterByRubro(3)}>Almacen</button>
//         <button className="btnFilters" onClick={() => filterByRubro(4)}>Papelera</button>
//         <button className="btnFilters" onClick={() => filterByRubro(0)}>Mostrar Todos</button>
//       </div>
//       {Object.keys(groupedBySubrubro).length > 0 && (
//         <div className="catalogo">
//           {Object.keys(groupedBySubrubro).map((idsubrubro) => (
//             <div key={idsubrubro} className="subrubro-section">
//               <h2>{groupedBySubrubro[idsubrubro].subrubro}</h2>
//               <div className="articulos">
//                 {groupedBySubrubro[idsubrubro].articulos.map((articulo) => (
//                   <div key={articulo.idarticulo} className="articulo">
//                     <img src={getImagePath(articulo.idarticulo)} alt={articulo.descripcion} onError={(e) => e.target.src = notFound} />
//                     <h2>{articulo.descripcion}</h2>
//                     <h2>id art: {articulo.idarticulo}</h2>
//                     <h2>id rubro: {articulo.idrubro}</h2>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };
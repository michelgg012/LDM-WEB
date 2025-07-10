import { ENV } from '@/Utils';


export class Cart {
  add(item,description ,quantity ) {
    const products = this.getAll();
    const objIndex = products.findIndex((obj => obj.id === item));
    if(objIndex < 0 ){
      products.push({ id: item, description,quantity });
    } else{
      products[objIndex].quantity += quantity ;
      };
    
    localStorage.setItem( ENV.CART, JSON.stringify(products));
  }
// ...existing code...
remove(id) {
  const products = this.getAll();
  const updated = products.filter(item => item.id !== id);
  localStorage.setItem(ENV.CART, JSON.stringify(updated));
}
// ...existing code...
  getAll() {
    const response = localStorage.getItem(ENV.CART);
    if(!response) {
      return []}
      else{
        return JSON.parse(response);
      }
  }

  count(){
    const response = this.getAll();
    return response.length;
  }
  // count(){
  //   const response = this.getAll();
  //   let count = 0;
  //   response.forEach((item) => {
  //     count += item.quantity;
  //   });
  //   return count;
  // }

  
}
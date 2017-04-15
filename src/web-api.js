let latency = 200;

let products = [
  {
    id:"1",
    name:'Radical Coffee Maker',
    description:'The best coffee maker your ass will ever own',
    imgUrl:''
  },
  {
    id:"2",
    name:'The Worst Shit Ever',
    description:'The worst coffee maker your ass will ever own',
    imgUrl:''
  },
  {
    id:"3",
    name:'Some Gnarly Product',
    description:'You dont want to use this thing or buy it or nothing',
    imgUrl:''
  },
  {
    id:"4",
    name:'Stupid Coffee Maker',
    description:'Tries to make tea, doesn\'t understand its place in the world',
    imgUrl:''
  },
  {
    id:"5",
    name:'Tub of Butter',
    description:'I don\'t think you\'re ready for this jelly',
    imgUrl:''
  }
];

export class WebAPI {
  isRequesting = false;
  
  getProductList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = products.map(x =>  { return {
          id:x.id,
          name:x.name,
          description:x.description,
          imgUrl:x.imgUrl
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getProductDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = contacts.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }
}
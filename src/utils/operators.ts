// must recieve and return an observable

export const consolePrint =(obs:any)=>{
 return obs.subscribe((x:any)=>console.log(x))
}
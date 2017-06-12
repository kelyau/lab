export default function(intent){
  const change$ = intent.changeToggle$
    .startWith(false)
    .map(toggle => {
      return {
        val: toggle? 'ON': 'OFF'
      }
    })
  return {
    change$
  }  
}
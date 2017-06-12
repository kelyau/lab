export default function(DOM) {
  let changeToggle$ = DOM.select('input').events('change')
   .map(ev => ev.target.checked);

  return {
    changeToggle$
  }
}
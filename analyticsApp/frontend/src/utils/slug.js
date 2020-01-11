export const slugify = s => {
  let l = s.split(" ");
  for(let item of l){
    const idx = l.indexOf(item);
    l[idx] = item.toLowerCase();
  }
  return l.join("-")
}

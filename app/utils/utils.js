const getRandomInt = (top) => {
  return Math.floor(Math.random() * Math.floor(top));
}

/*
  Randomly sort colors in new array
*/
const Colors = (count) => {
  let ItemColors = [
    "#CF7474",
    "#2D9CDB",
    "#3ED67F",
    "#1FD2DE",
    "#12FF2A",
    "#EB5757",
    "#08FFE1",
    "#FF7E08"
  ]
  let randomColorArr = []
  for (var i = 0; i < count; i++) {
    let index = getRandomInt(ItemColors.length)
    randomColorArr.push(ItemColors[index])
    // ItemColors.splice(index,1)
  }
  console.log(randomColorArr);
  return randomColorArr
}

const getCatchPhrase = () => {
  let catchPhrase = ["Say Something Dreamy", "Tell Me Everything", "So What Happened", "Morning", "One Sheep Two Sheep..."]
  return catchPhrase[getRandomInt(catchPhrase.length)]
}

module.exports = {
  Colors: Colors,
  getCatchPhrase: getCatchPhrase
}

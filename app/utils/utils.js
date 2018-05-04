import React from 'react';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.rootNav
);

const addListener = createReduxBoundAddListener("root");

const Month = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const getRandomInt = (top) => {
  return Math.floor(Math.random() * Math.floor(top));
}

const Colors = () => {
    let ItemColors = ["#CF7474", "#2D9CDB", "#3ED67F", "#1FD2DE", "#12FF2A", "#EB5757", "#08FFE1", "#FF7E08"]
    let randomColorArr = []
    while (ItemColors.length){
      // console.log(ItemColors.length);
      let index = getRandomInt(ItemColors.length)
      randomColorArr.push(ItemColors[index])
      ItemColors.splice(index,1)
    }
    // console.log(randomColorArr);
    return randomColorArr
  }

const getCatchPhrase = () => {
  let catchPhrase = ["Say Something Dreamy","Tell Me Everything","So What Happened","Morning","One Sheep Two Sheep..."]
  return catchPhrase[getRandomInt(catchPhrase.length)]
}

// const mapNavigationStateParamsToProps = (SomeComponent) => {
//   return class extends React.Component {
//     static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
//     render () {
//       const {navigation: {state: {params}}} = this.props;
//       return <SomeComponent {...params} {...this.props} />;
//     }
//   };
// };

module.exports = {
  middleware: middleware,
  addListener: addListener,
  Month: Month,
  Colors:Colors,
  getCatchPhrase: getCatchPhrase
}

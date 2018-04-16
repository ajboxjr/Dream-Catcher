import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import React from 'react';
export const mapNavigationStateParamsToProps = (SomeComponent) => {
  return class extends React.Component {
    static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
    render () {
      const {navigation: {state: {params}}} = this.props;
      return <SomeComponent {...params} {...this.props} />;
    }
  };
};

export const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.rootNav
);

export const addListener = createReduxBoundAddListener("root");

export const Month = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
// export const Colors = ['#3ED67F', '#56CCF2', '#EBB617', '#9B51E0', '#EB5757', '#2D9CDB','#FF7800', '#3DFF45', '#F2994A','#AF07B2']
const getRandomInt = (top) => {
  return Math.floor(Math.random() * Math.floor(top));
}

export const Colors = () => {
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
  export const getCatchPhrase = () => {
    let catchPhrase = ["Say Something Dreamy","Tell Me Everything","So What Happened","Morning","One Sheep Two Sheep..."]
    return catchPhrase[getRandomInt(catchPhrase.length)]
  }

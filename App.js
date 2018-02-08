import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions as RouteActions, Scene, Stack, Router, TabBar, Icon, Tabs} from 'react-native-router-flux';

import { Provider } from 'react-redux';

import configureStore from 'store/store'
const store = configureStore({});

import NewDreamIcon from 'icons/NewDreamIcon'
import ProfileIcon from 'icons/ProfileIcon'
import ListIcon from 'icons/ListIcon'

//Login Scene
import LoginScene from 'scenes/LoginScene'
// Home Scenes
import DreamListScene from 'scenes/DreamListScene'
import NewDreamScene from 'scenes/NewDreamScene'
import ProfileScene from 'scenes/ProfileScene'
import DreamEntryScene from 'scenes/DreamEntryScene'


store.subscribe(() => {
  state = store.getState()
  if(state.user.token === null){
    // TODO: Authenticate token with database
    RouteActions.login_menu()
  }
  else {
    RouteActions.main_menu()
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Stack key="root">
            <Scene key="login_menu" tabBarStyle={{ backgroundColor: '#eee', alignItems: 'center' }} hideNavBar={true} navTransparent={1}>
              <Scene key="scene_1" component={LoginScene} title="login" />
            </Scene>
            <Tabs key="main_menu" tabBarStyle={{ backgroundColor: '#eee', alignItems: 'flex-end' }} >
              <Scene key="tab1" title=" " icon={ListIcon}>
                <Scene key="tab1_scene2" component={DreamListScene}  navTransparent={1} hideNavBar={true} />
                <Scene key="tab2_scene2" component={DreamEntryScene} title="Dream Entry" navTransparent={1} hideNavBar={true} />
              </Scene>
              <Scene key="tab2" title=" " icon={NewDreamIcon}>
                <Scene key="tab2_scene1" component={NewDreamScene}  hideNavBar={true} initial />
              </Scene>
              <Scene key="tab3" title=" " icon={ProfileIcon}>
                <Scene key="tab3_scene1" component={ProfileScene} hideNavBar={true} intial />
              </Scene>
            </Tabs>
        </Stack>
      </Router>
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

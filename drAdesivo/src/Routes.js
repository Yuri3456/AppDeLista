import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Main from './pages/Main';
import Money from './pages/Money';

const Routes = createAppContainer(
    createSwitchNavigator(
        {
            Main,
            Money
        }, {
            initialRouteName: "Main",
            backBehavior: "history"
        }
    )
);

export default Routes;
import { Navigation } from "react-native-navigation";

import ContactListScreen from "./src/front/ContactListScreen";
import ViewContactScreen from "./src/front/ViewContactScreen";
import AddContactScreen from "./src/front/AddContactScreen";

Navigation.registerComponent(`ContactListScreen`, () => ContactListScreen);
Navigation.registerComponent(`ViewContactScreen`, () => ViewContactScreen);
Navigation.registerComponent(`AddContactScreen`, () => AddContactScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: "ContactListScreen"
          }
        }]
      }
    }
  });
});
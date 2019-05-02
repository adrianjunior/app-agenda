import { Navigation } from "react-native-navigation";

import ContactListScreen from "./src/ContactListScreen";
import ViewContactScreen from "./src/ViewContactScreen";
import AddContactScreen from "./src/AddContactScreen";

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
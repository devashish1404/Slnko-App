import { NovuProvider } from "@novu/react-native";
import YourCustomInbox from "./Inbox";
 
function TestingApp() {
  return (
    <NovuProvider
      subscriber="6864c58da3a6f7ceca663d9d"
      applicationIdentifier="vHKf6fc5ojnD"
    >
        <YourCustomInbox />
    </NovuProvider>
  );
}

export default TestingApp;
import { AuthContextProvider } from "./contexts/Auth/AuthContextProvider";
import { RoutesPages } from "./routes";

function App() {
  return (
    <AuthContextProvider>
      <RoutesPages />
    </AuthContextProvider>
  );
}

export default App;

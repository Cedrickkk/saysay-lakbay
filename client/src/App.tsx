import { Button } from "@/components/ui/button";

function App() {
  return (
    <Button asChild>
      <a href={`${import.meta.env.VITE_API_BASE_URL!}/auth/google`}>
        Login with Google
      </a>
    </Button>
  );
}

export default App;

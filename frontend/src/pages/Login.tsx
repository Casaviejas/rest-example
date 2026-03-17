import { View } from "../modules/login/View";
import { Decorate } from "../modules/login/Decorate";

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <View />
      <Decorate />
    </div>
  );
}

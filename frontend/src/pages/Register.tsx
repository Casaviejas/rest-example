import { Decorate } from "../modules/register/Decorate";
import { View } from "../modules/register/View";

export function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <View />
      <Decorate />
    </div>
  );
}

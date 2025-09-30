import NotFoundScreen from "@/components/shared_screens/NotFoundScreen";
import ConditionalBGGradient from "@/components/ui/BackgroundGradient/ConditionalBackgroundGradient";
import Providers from "../providers";

export default function NotFoundPage() {
  return (
    <Providers>
      <ConditionalBGGradient />
      <NotFoundScreen />
    </Providers>
  );
}

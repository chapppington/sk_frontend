import type { Metadata } from "next";
import FirstScreen from "./screens/FirstScreen";
import AboutConferenceScreen from "./screens/AboutConferenceScreen";
import PartnershipScreen from "./screens/PartnershipScreen";
import PreviousMeetingsScreen from "./screens/PreviousMeetingsScreen";
import SpeakersScreen from "./screens/SpeakersScreen";
import VenueScreen from "./screens/VenueScreen";
import ProgramScreen from "./screens/ProgramScreen";
import OrganizerScreen from "./screens/OrganizerScreen";
import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";

export const metadata: Metadata = {
  title: "VII Встреча главных энергетиков Сибири | СибКомплект",
  description: "VII Встреча главных энергетиков Сибири. 24 апреля 2026 года, г. Барнаул. Ключевое отраслевое событие года.",
};

export default function ForumPage() {
  return (
    <main>
      <FirstScreen />
      <AboutConferenceScreen />
      <SpeakersScreen />
      <ProgramScreen />
      <PreviousMeetingsScreen />
      <PartnershipScreen />
      <OrganizerScreen />
      <VenueScreen />
      <ContactUsScreen variant="forum" />
    </main>
  );
}

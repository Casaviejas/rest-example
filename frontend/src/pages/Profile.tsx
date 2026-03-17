import { useState } from "react";
import { WiiCard } from "../components/WiiCard";
import { useProfile } from "../modules/profile/useProfile";
import { ProfileHeader } from "../modules/profile/ProfileHeader";
import { ProfileForm } from "../modules/profile/ProfileForm";
import { ProfileActions } from "../modules/profile/ProfileActions";
import { Decorate } from "../modules/profile/Decorate";
import { ConnectionStatus } from "../modules/profile/ConnectionStatus";
import { ProfileFooter } from "../modules/profile/ProfileFooter";

export function Profile() {
  const [isOnline] = useState(true);
  const { state, actions } = useProfile();
  const { isEditing } = state;

  if (state.isLoading) {
    return (
      <WiiCard className="w-full max-w-2xl p-8 text-center text-white">
        <p>Cargando perfil...</p>
      </WiiCard>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Connection status indicator */}
      <ConnectionStatus isOnline={isOnline} />

      {/* Main profile card */}
      <WiiCard className="w-full max-w-2xl p-8 mb-8">
        {/* Avatar and header */}
        <ProfileHeader
          name={state.name}
          email={state.email}
          isEditing={isEditing}
        />

        {/* Profile form */}
        <ProfileForm state={state} actions={actions} />

        {/* Action buttons */}
        <ProfileActions isEditing={isEditing} actions={actions} />
      </WiiCard>

      {/* Footer */}
      <ProfileFooter />

      {/* Decorative elements */}
      <Decorate />
    </div>
  );
}

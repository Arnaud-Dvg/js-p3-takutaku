function ProfilePicture() {
  return (
    <>
      <img
        src="/profilepicture1.png"
        alt="Profile Pic"
        className="rounded-full h-25 w-25"
      />
      <button
        type="button"
        className="border-1 border-tertiary rounded-full text-secondary my-2 p-2"
      >
        Modifier ma photo de profil
      </button>
    </>
  );
}

export default ProfilePicture;

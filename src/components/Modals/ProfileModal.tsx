import { UserData } from "@/types/userTypes";
import Modal from "react-modal";

interface ProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  field: string | null;
  user: UserData | undefined;
  onSave: (updatedData: Partial<UserData>) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onRequestClose,
  field,
  user,
  onSave,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const updatedData: Partial<UserData> = {};

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        updatedData[key as keyof UserData] = value;
      }
    });

    onSave(updatedData);
    onRequestClose();
  };

  const renderField = () => {
    switch (field) {
      case "profileImg":
        return (
          <form onSubmit={handleSubmit}>
            <label>Profile Image URL</label>
            <input name="profileImg" type="text" defaultValue={user?.profileImg} />
            <button type="submit">Save</button>
          </form>
        );
      case "nameAndLastName":
        return (
          <form onSubmit={handleSubmit} className="p-[1px]">
            <div className="flex flex-col border border-gray-300 rounded-xl p-1">
              <label className="font-bold text-sm">Your Name</label>
              <input
                className="border border-gray-300 rounded-lg p-1"
                name="name"
                type="text"
                defaultValue={user?.name}
              />
              <label className="font-bold text-sm">Your Last Name</label>
              <input name="lastName" type="text" defaultValue={user?.lastName} />
              <button type="submit">Save</button>
            </div>
          </form>
        );
      case "location":
        return (
          <form onSubmit={handleSubmit}>
            <label>City</label>
            <textarea name="city" defaultValue={user?.city}></textarea>
            {/* <label>Country</label>
            <input name="country" type="text" defaultValue={user?.country} /> */}
            <button type="submit">Save</button>
          </form>
        );
      case "bio":
        return (
          <form onSubmit={handleSubmit}>
            <label>Bio</label>
            <textarea name="bio" defaultValue={user?.bio}></textarea>
            <button type="submit">Save</button>
          </form>
        );
      case "professions":
        return (
          <form onSubmit={handleSubmit}>
            <label>Professions</label>
            <input
              name="profesions"
              type="text"
              defaultValue={user?.profesions.map((prof) => prof.category).join(", ")}
            />
            <button type="submit">Save</button>
          </form>
        );
      case "education":
        return (
          <form onSubmit={handleSubmit}>
            <label>Education</label>
            <input
              name="educations"
              type="text"
              defaultValue={user?.educations.map((edu) => edu.title).join(", ")}
            />
            <button type="submit">Save</button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          padding: "20px",
          borderRadius: "8px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}>
      <div>{renderField()}</div>
    </Modal>
  );
};

export default ProfileModal;

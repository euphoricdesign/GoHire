import { UserData } from "@/types/userTypes";
import Modal from "react-modal";
import { FaWpforms } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";

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
          <form onSubmit={handleSubmit} className="flex flex-col shadow-xl rounded-xl p-4">
            <label className="font-bold text-sm">Your Name</label>
            <div className="relative flex items-center">
              <input
                className="w-full text-gray-700 text-base pl-0 pr-3 py-2 peer border-b-2 border-gray-300 focus:border-[#3C65F5]"
                name="name"
                type="text"
                defaultValue={user?.name}
              />
              <FaPencil className="absolute right-3 text-gray-400 peer-focus:text-[#3C65F5]" />
            </div>
            <label className="font-bold text-sm mt-4">Your Last Name</label>
            <div className="relative flex items-center">
              <input
                name="lastName"
                type="text"
                defaultValue={user?.lastName}
                className="w-full text-gray-700 text-base pl-0 pr-3 py-2 peer border-b-2 border-gray-300 focus:border-[#3C65F5]"
              />
              <FaPencil className="absolute right-3 text-gray-400 peer-focus:text-[#3C65F5]" />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-[#93B4FF] transition-all duration-300">
              Save
            </button>
          </form>
        );
      case "location":
        return (
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col shadow-xl rounded-xl p-4">
              <FaWpforms />
              <label className="font-bold text-sm">Your City</label>
              <div className="relative flex items-center">
                <input
                  className="w-full text-gray-700 text-base pl-0 pr-3 py-2 peer border-b-2 border-gray-300 focus:border-[#3C65F5]"
                  name="name"
                  type="text"
                  defaultValue={user?.city}
                />
                <FaPencil className="absolute right-3 text-gray-400 peer-focus:text-[#3C65F5]" />
              </div>
              <label className="font-bold text-sm mt-4">Your Country</label>
              <div className="relative flex items-center">
                <input
                  name="lastName"
                  type="text"
                  defaultValue={user?.country}
                  className="w-full text-gray-700 text-base pl-0 pr-3 py-2 peer border-b-2 border-gray-300 focus:border-[#3C65F5]"
                />
                <FaPencil className="absolute right-3 text-gray-400 peer-focus:text-[#3C65F5]" />
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-[#93B4FF] transition-all duration-300">
                Save
              </button>
            </form>
          </div>
        );
      case "bio":
        return (
          <form onSubmit={handleSubmit} className="flex flex-col shadow-xl rounded-xl p-4">
            <label>Bio</label>
            <textarea name="bio" defaultValue={user?.bio}></textarea>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-[#93B4FF] transition-all duration-300">
              Save
            </button>
          </form>
        );
      case "professions":
        return (
          <form onSubmit={handleSubmit} className="flex flex-col shadow-xl rounded-xl p-4">
            <label>Professions</label>
            <input
              name="profesions"
              type="text"
              defaultValue={user?.profesions.map((prof) => prof.category).join(", ")}
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-[#93B4FF] transition-all duration-300">
              Save
            </button>
          </form>
        );
      case "education":
        return (
          <form onSubmit={handleSubmit} className="flex flex-col shadow-xl rounded-xl p-4">
            <label>Education</label>
            <input
              name="educations"
              type="text"
              defaultValue={user?.educations.map((edu) => edu.title).join(", ")}
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-[#93B4FF] transition-all duration-300">
              Save
            </button>
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
          padding: "0px",
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

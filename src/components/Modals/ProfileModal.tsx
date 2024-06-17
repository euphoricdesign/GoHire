"use client";
import Modal from "react-modal";
import React, { useState } from "react";
import CustomModal from "./CustomModal";
import { UserData } from "@/types/userTypes";
import { FaPencil } from "react-icons/fa6";
import { useGetCategoryQuery } from "@/lib/services/jobsApi";

interface ProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  field: string | null;
  user: UserData | undefined;
  onSave: (updatedData: Record<string, string | number>) => void;
  ariaHideApp: boolean;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onRequestClose,
  field,
  user,
  onSave,
  ariaHideApp,
}) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const { data: categoryData, isLoading, error } = useGetCategoryQuery(null); // Usar el hook de RTK Query

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];
          setPreviewImage(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    if (previewImage) {
      console.log(previewImage, "osapdfksapofksadfa");

      onSave({ imgPictureUrl: previewImage });
      onRequestClose();
    }
  };

  const renderField = () => {
    switch (field) {
      case "profileImg":
        return (
          <form onSubmit={handleSaveImage} className="flex flex-col shadow-xl rounded-xl p-4">
            <label className="font-bold text-sm">Choose your Profile Image</label>
            <div className="flex flex-col items-center">
              <div className="flex-grow relative w-full text-center">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <FaPencil className="absolute right-3 text-gray-400 peer-focus:text-[#3C65F5]" />
                <label
                  htmlFor="image"
                  className="w-full text-gray-700 text-lg focus:outline-none pl-0 pr-3 py-2 peer cursor-pointer flex items-center">
                  <span className="text-gray-500">
                    {previewImage ? "Change image" : "Add image"}
                  </span>
                </label>
                {previewImage && (
                  <div className="mt-4">
                    <img src={previewImage} alt="Profile Preview" className="max-w-full max-h-60" />
                  </div>
                )}
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 peer-focus:w-full peer-focus:bg-[#3C65F5]"
                  style={{ width: "calc(100% - 3rem)" }}></div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-[#93B4FF] transition-all duration-300">
              Save
            </button>
          </form>
        );
      case "nameAndLastName":
        return (
          <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={ariaHideApp}
            title="Edit Name and Last Name"
            fields={[
              { name: "name", label: "Your Name", type: "text", defaultValue: user?.name },
              {
                name: "lastName",
                label: "Your Last Name",
                type: "text",
                defaultValue: user?.lastName,
              },
            ]}
            onSave={onSave}
          />
        );
      case "location":
        return (
          <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={ariaHideApp}
            title="Edit Location"
            fields={[
              { name: "city", label: "Your City", type: "text", defaultValue: user?.city },
              { name: "country", label: "Your Country", type: "text", defaultValue: user?.country },
            ]}
            onSave={onSave}
          />
        );
      case "bio":
        return (
          <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={ariaHideApp}
            title="Edit Bio"
            fields={[
              { name: "bio", label: "My Description", type: "textarea", defaultValue: user?.bio },
            ]}
            onSave={onSave}
          />
        );
      case "professions":
        if (isLoading) {
          return <div>Loading...</div>;
        }

        if (error) {
          return <div>Error loading categories</div>;
        }

        const categories = categoryData?.categoryReturn.map((category) => category) || [];

        return (
          <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={ariaHideApp}
            title="Add Profession"
            fields={[
              {
                name: "profession",
                label: "Profession",
                type: "select",
                options: categories,
              },
            ]}
            onSave={onSave}
          />
        );
      case "education":
        return (
          <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={ariaHideApp}
            title="Add Education"
            fields={[
              { name: "title", label: "Tittle", type: "text" },
              { name: "educationalEntity", label: "Educational Entity", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "studiesState", label: "Studies State", type: "text" },
              { name: "startDate", label: "Start Date", type: "text" },
              { name: "endDate", label: "End Date", type: "text" },
            ]}
            onSave={onSave}
          />
        );
      case "completeProfile":
        return (
          <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={ariaHideApp}
            title="Complete Profile"
            fields={[
              { name: "name", label: "Your Name", type: "text", defaultValue: user?.name },
              {
                name: "lastName",
                label: "Your Last Name",
                type: "text",
                defaultValue: user?.lastName,
              },
              { name: "city", label: "Your City", type: "text", defaultValue: user?.city },
              { name: "country", label: "Your Country", type: "text", defaultValue: user?.country },
              { name: "dni", label: "DNI", type: "number", defaultValue: user?.dni },
              { name: "bio", label: "Description", type: "textarea", defaultValue: user?.bio },
              {
                name: "professions",
                label: "Professions",
                type: "text",
                defaultValue: user?.profesions.map((prof) => prof.category).join(", "),
              },
            ]}
            onSave={onSave}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={ariaHideApp}
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
      {renderField()}
    </Modal>
  );
};

export default ProfileModal;

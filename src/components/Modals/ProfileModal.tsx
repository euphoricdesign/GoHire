"use client";
import Modal from "react-modal";
import React, { useState } from "react";
import CustomModal from "./CustomModal";
import { UserData, UserPatchData } from "@/types/userTypes";
import { useGetAllProfessionsQuery } from "@/lib/services/professionsApi";
import axios from "axios";
import { UserEducation } from "@/types/educationsTypes";
import { Professions } from "@/types/professionsTypes";

interface ProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  field: string | null;
  user: UserData | undefined;
  onSave: (
    updatedData: Partial<UserEducation> | Partial<Professions> | Partial<UserPatchData>
  ) => void;
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
  const { data: categoryData, isLoading, error } = useGetAllProfessionsQuery(null);
  const [selectedProfession, setSelectedProfession] = useState("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file, "ESTO ES FILE = EVENT.TARGET");
    if (file) {
      setSelectedImage(file);
      console.log(selectedImage, "ESTO ES SELECTED IMAGE, DESPUÉS DEL SET");
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedImage) {
      // const formData = new FormData();
      // const blob = new Blob([selectedImage], { type: selectedImage.type });
      // formData.append("imgPictureUrl", blob, selectedImage.name);

      onSave({ imgPictureUrl: selectedImage });
      onRequestClose();
      setSelectedImage(null);
      setPreviewImage(null);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading categories</div>;
  }

  const categories = categoryData?.map((profession) => profession.category) || [];

  const handleSave = () => {
    onSave({ category: selectedProfession });
    onRequestClose();
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    if (fieldName === "profession") {
      setSelectedProfession(value);
    }
  };

  const renderField = () => {
    switch (field) {
      case "profileImg":
        return (
          <form onSubmit={(e) => handleImageSave(e)} className="p-4">
            <h2 className="text-xl font-bold mb-4">Change Profile Image</h2>
            <input name="image" type="file" accept="image/*" onChange={handleImageChange} />
            {previewImage && (
              <div className="mt-4">
                <h3 className="text-lg">Preview:</h3>
                <img src={previewImage} alt="Preview" className="w-full h-auto mt-2" />
              </div>
            )}
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
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
            onFieldChange={handleFieldChange}
            onSave={handleSave}
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
          <div>
            <h2>Do you want to be part of our Talents?</h2>
            <h3>It's very easy!</h3>
            <h3>All you need to do is complete your information</h3>
          </div>
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

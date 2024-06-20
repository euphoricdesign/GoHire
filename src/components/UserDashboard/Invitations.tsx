import { useGetInvitationOffersQuery } from "@/lib/services/userApi";
import { invitationsData } from "@/types/invitationsTypes";
import React from "react";

const Invitations = () => {
  const { data: invitationOffers, error, isLoading } = useGetInvitationOffersQuery(null);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  console.log("ESTO ES LA INFO DE INVITACIÓN", invitationOffers);

  return (
    <div>
      <h2 className="font-bold text-2xl py-2">Invitations received:</h2>
      <ul>
        {invitationOffers &&
          invitationOffers.map((offer: invitationsData) => (
            <div key={offer.id} className="border border-gray-300 shadow-lg p-2 my-5">
              <div className="text-lg">
                Job Tittle: <span className="mr-2 font-bold">{offer.issue}</span>
              </div>
              <div>
                <div className="font-bold p-1">Description</div>
                <div className="text-sm p-1">{offer.jobDescription}</div>
              </div>
              <div className="flex items-center">
                <div className="font-bold p-1">Pay per Hour:</div>
                <div>${offer.payPerHour}</div>
              </div>
              <div className="flex items-center">
                <div className="font-bold p-1">Location:</div>
                <div>{offer.location}</div>
              </div>
              <div className="flex items-center">
                <div className="font-bold p-1">Start Date::</div>
                <div>{offer.startDate}</div>
              </div>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Invitations;

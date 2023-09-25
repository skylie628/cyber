import React from "react";
import { MultipleShowsQueryResponseType } from "../../type";
import ProfileMediaCard from "./ProfileMediaCard";
const MediaList = ({
  mediaList,
  status,
}: {
  mediaList: MultipleShowsQueryResponseType;
  status: string;
}) => {
  return status === "isFavorited" ? (
    <>
      {mediaList
        .filter((media) => media.isFavorited)
        .map((media) => (
          <ProfileMediaCard key={media.id} media={media} />
        ))}
    </>
  ) : status === "All" ? (
    <>
      {mediaList?.map((media) => (
        <ProfileMediaCard key={media.id} media={media} />
      ))}
    </>
  ) : (
    <>
      {mediaList
        ?.filter((media) => media.status === status)
        .map((media) => (
          <ProfileMediaCard key={media.id} media={media} />
        ))}
    </>
  );
};
export default MediaList;

import { ConfigsType } from "./types";

let configs = {
  discussionD2Uid: "",
  discussionApiClientHeader: ""
};

export const setConfigs = ({
  discussionD2Uid = "",
  discussionApiClientHeader = ""
}: ConfigsType) => {
  configs = {
    discussionD2Uid: discussionD2Uid,
    discussionApiClientHeader: discussionApiClientHeader
  };
};

export const getConfigs = () => configs;

import { updateState } from "../models/UpdateState/UpdateState";
import { StatfeedEvent } from "../models/StatfeedEvent/StatfeedEvent";

export const transformStatfeedEvent = (innerMessage: any) => {
  //console.log("TransformStateFeedEvent - data: ", innerMessage);
  const data = innerMessage.data;
  return {
    event_name: data.event_name,
    main_target: {
      id: data.main_target.id,
      name: data.main_target.name,
      team_num: data.main_target.team_num,
    },
    secondary_target: {
      id: data.secondary_target.id,
      name: data.secondary_target.name,
      team_num: data.secondary_target.team_num,
    },
    type: data.type,
  };
};

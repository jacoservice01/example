export const resolveStatus = (status: string): string => {
    return status==="Alive"?"🟢":status==="Dead"?"🔴":"⚫";
};
  
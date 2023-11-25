export const STAGES = {
  FORM: ['landing', 'recipients', 'body', 'attachments', 'summary', 'send'],
  LOGIN: ['landing', 'signin'],
  REGISTER: ['landing', 'signup'],
};

export const getStageInfo = (stageName: string) => {
  const stageInfo = {
    currentStage: stageName,
  };
  for (const [stageType, stages] of Object.entries(STAGES)) {
    const foundIndex = stages.indexOf(stageName);
    if (foundIndex > -1) {
      stageInfo.stageType = stageType;
      stageInfo.stageIndex = foundIndex;
      stageInfo.prevStage = foundIndex - 1 > -1 ? stages[foundIndex - 1] : null;
      stageInfo.nextStage = foundIndex + 1 < stages.length ? stages[foundIndex + 1] : null;
      return stageInfo;
    }
  }
};

const dataReducer = (state, action) => {
  const { type, payload } = action;
  const { imageKitTokens, formStage, updatedFields } = payload;

  switch (type) {
    case 'SET_STAGE':
      console.log('SET_STAGE', payload);
      return {
        ...state,
        formStage,
      };
    case 'UPDATE_FIELDS':
      console.log('UPDATE_FIELDS', payload);
      return {
        ...state,
        formData: {
          ...state.formData,
          ...updatedFields,
        },
      };

    default:
      throw new Error(`No case for type ${type} found in dataReducer.`);
  }
};

export default dataReducer;

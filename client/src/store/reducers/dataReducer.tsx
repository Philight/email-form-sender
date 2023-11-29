import { IStateType } from './initialState';

export const STAGES = {
  FORM: ['landing', 'recipients', 'body', 'attachments', 'summary', 'recipients'],
  LOGIN: ['landing', 'signin', 'recipients', 'body', 'attachments', 'summary', 'recipients'],
  REGISTER: [
    'landing',
    'signup',
    'signin',
    'recipients',
    'body',
    'attachments',
    'summary',
    'recipients',
  ],
};

export const getStageInfo = (
  stageName: string,
): {
  stageName: string;
  stageType: string;
  stageIndex: string;
  prevStage: number | null;
  nextStage: number | null;
} => {
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

export const dataReducer = (state, action): IStateType => {
  const { type, payload } = action;
  const { formStage, user, updatedFields } = payload;

  switch (type) {
    case 'SET_STAGE':
      console.log('SET_STAGE', payload);
      return {
        ...state,
        formStage,
      };
    case 'SET_USER':
      console.log('SET_USER', payload);
      return {
        ...state,
        user,
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
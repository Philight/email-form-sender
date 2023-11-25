import React, { PropsWithChildren, useEffect, useReducer, createContext, useContext } from 'react';
import dataReducer from '@store/reducers/dataReducer';
import { initialState, IStateType } from '@store/reducers/initialState';

// import { arrayUniqueValues } from '@utils/array';

export const DataContext = createContext();

interface IContextType extends IStateType {
  updateField: (fieldName: string, fieldValue: unknown) => void;
  setFormStage: (formStage: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const DataProvider = ({ children }: PropsWithChildren<T>): React.FC<React.ReactNode> => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const setFormStage = (formStage: string): void => {
    dispatch({
      type: 'SET_STAGE',
      payload: {
        formStage,
      },
    });
  };

  const setLoading = (loading: boolean): void => {
    dispatch({
      type: 'SET_LOADING',
      payload: {
        loading,
      },
    });
  };

  const setError = (error: Error | null): void => {
    dispatch({
      type: 'SET_ERROR',
      payload: {
        error,
      },
    });
  };

  const updateFields = (updatedFields: { [key: string]: string }): void => {
    dispatch({
      type: 'UPDATE_FIELDS',
      payload: {
        updatedFields,
      },
    });
  };

  const contextValue = {
    pageData: state.pageData,
    formStage: state.formStage,
    formData: state.formData,
    updateFields,
    setFormStage,
    setLoading,
    setError,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const useDataContext = (): IContextType => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useDataContext must be used inside the DataProvider');
  }

  return context;
};

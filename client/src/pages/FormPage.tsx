import React, { useCallback, useState, useEffect, forwardRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  FormControl,
  FormGroup,
  Paper,
  Container,
  Stack,
  FormHelperText,
  FormControlLabel,
  FormLabel,
  TextareaAutosize,
} from '@mui/material';

import { NavigationButton } from '@components/interactive/NavigationButton';
import { Form } from '@components/form/Form';

import { useDataContext } from '@contexts/DataContext';
import { getStageInfo } from '@store/reducers/dataReducer';
import { toCapitalCase } from '@utils/string';
import { withPageData } from '@utils/hoc';

import { Props } from 'default-types';
interface PageProps extends Props {}

const FormPage = (props: PageProps) => {
  const { className } = props;

  const context = useDataContext();
  const formData = context.formData;
  const formStage = context.formStage;
  const stageInfo = getStageInfo(formStage);
  const pageData = context.pageData[formStage] ?? {};
  const fields = pageData?.fields ?? {};

  // Temporary local state
  const [values, setValues] = useState({});
  // Create state for form errors:
  const [validationErrors, setValidationErrors] = useState({});

  const mSlide = useMotionValue(0);
  const aX = useTransform(mSlide, [0, 1, 2], ['100%', '0%', '-100%']);

  const slideIn = async () => {
    mSlide.set(0);
    const animation = animate(mSlide, 1, {
      ease: 'circIn',
      ease: 'backOut',
      duration: 0.8,
      onComplete: () => {},
    });

    return () => animation.stop();
  };

  const slideOut = async () => {
    return new Promise(resolve => {
      mSlide.set(1);
      const animation = animate(mSlide, 2, {
        ease: 'anticipate',
        ease: 'backIn',
        ease: 'backOut',
        duration: 0.4,
        onComplete: () => {
          resolve(true);
        },
      });
      return () => animation.stop();
    });
  };

  const resetForm = () => {
    setValues({});
    setValidationErrors({});
  };

  useEffect(() => {
    /*
    let animation = null;
    mSlide.set(0);
    animation = animate(mSlide, 1, {
      ease: 'circIn',
      ease: 'backOut',
      duration: 0.8,
      onComplete: () => {},
    });

    return () => animation.stop();
*/
    slideIn();
    resetForm();
  }, [formStage]);

  const onFieldChange = useCallback(
    (fieldName: string, newValue?: unknown) => (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('onFieldChange', fieldName, newValue, e?.target.value);
      setValues(prevValues => ({
        ...prevValues,
        [fieldName]: newValue ?? e.target.value,
      }));
    },
    [],
  );

  /*
  const onFieldChange = useCallback((fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    context.updateField(fieldName, e.target.value);
  }, [])
*/

  const onSubmit = event => {
    event.preventDefault();
    console.log('onSubmit', formData);
    console.log(context.formData);
    console.log(values);

    // Skip validations
    if (formStage === 'landing' || formStage === 'attachments') {
      context.updateFields(values);
      context.setFormStage(stageInfo.nextStage);
      return;
    }

    pageData?.validations
      .validate({ ...formData, ...values }, { abortEarly: false })
      .then(() => {
        // PUSH VALUES TO ONTEXT
        context.updateFields(values);
        // Reset Form
        //        resetForm();
        // Next stage
        // animation OUT
        return slideOut(); // .then();
      })
      .then(animated => {
        console.log('animated', animated);
        context.setFormStage(stageInfo.nextStage);
      })
      .catch(err => {
        //        console.log(err.inner);
        const validErrors = err.inner.reduce((acc, error) => {
          return {
            ...acc,
            [error.path]: error.message,
          };
        }, {});
        //        console.log(validErrors);
        setValidationErrors(validErrors);
      });
  };

  const getButtonLabel = () => {
    switch (stageInfo.nextStage) {
      case 'summary':
        return { icon: 'summary' };
      case 'send':
        return { icon: 'envelope-fill' };
      default:
        return { label: 'Next' };
    }
  };

  return (
    <main className={['form-page__c page', className].css()}>
      <Stack direction="column">
        <Typography variant="h3" className={[``].css()} align="center">
          {pageData?.subheading}
        </Typography>

        <motion.div className={[`form-page__form-container`].css()} style={{ x: aX }}>
          <Form
            editable={formStage !== 'summary'}
            fields={fields}
            values={values}
            formData={formData}
            validationErrors={validationErrors}
            onFieldChange={onFieldChange}
          />
        </motion.div>

        <NavigationButton
          className={[`form-page__form-submit`].css()}
          type="submit"
          variant="standard"
          size="lg"
          {...getButtonLabel()}
          onClick={onSubmit}
        />
      </Stack>
    </main>
  );
};

const pageData = { page: 'contact', img: '' };
export default withPageData(FormPage, pageData);

import React, { useCallback, useState, useEffect, forwardRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { AppBar, Toolbar, Typography, TextField, FormControl, FormGroup, Paper, Container, Stack } from '@mui/material';

import { NavigationButton } from '@components/interactive/NavigationButton';
import { useDataContext } from '@contexts/DataContext';
import { getStageInfo } from '@store/reducers/dataReducer';
import { toCapitalCase } from '@utils/string';
import { withPageData } from '@utils/hoc';

import { Props } from 'default-types';
interface PageProps extends Props {}

const FormPage = (props: PageProps) => {
  const { className } = props;

  const context = useDataContext();
  const formStage = context.formStage;
  const pageData = context.pageData[formStage] ?? {};
  const fields = pageData?.fields ?? {};
  const stageInfo = getStageInfo(formStage);

  const [values, setValues] = useState({});
  // Create state for form errors:
  const [validationErrors, setValidationErrors] = useState({});

  const mSlide = useMotionValue(0);
  const aX = useTransform(
    mSlide,
    [0, 1, 2],
    ['100%', '0%', '-100%']
  );

  useEffect(() => {
//    if (withAnimation) {
      let animation = null;
      mSlide.set(0);
      animation = animate(mSlide, 1, {
        ease: "circIn",
        ease: "backOut",
        duration: 0.8,
        onComplete: () => {
        },
      });

      return () => animation.stop();
//    }
  }, [formStage]);

  const animateOut = async () => {
    return new Promise(resolve => {
      mSlide.set(1);
      let animation = animate(mSlide, 2, {
        ease: "anticipate",
        ease: "backIn",
        ease: "backOut",
        duration: 0.4,
        onComplete: () => {
          resolve(true);
        },
      })
    });
  }

  const onFieldChange = useCallback(
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(prevValues => ({
        ...prevValues,
        [fieldName]: e.target.value,
      }));
    },
    [],
  );

  const resetForm = () => {
    setValues({});
    setValidationErrors({});
  };

  /*
  const onFieldChange = useCallback((fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    context.updateField(fieldName, e.target.value);
  }, [])
*/

  const onSubmit = event => {
    event.preventDefault();
    animateOut().then((animated) => {
        console.log('animated', animated)

      context.setFormStage(stageInfo.nextStage);
    });

    console.log(context.formData);
    console.log(values);
    /*
    try {
//      signInSchema.validateSync(context.formData, { abortEarly: false })
//      recipientSchema.validateSync(values, { abortEarly: false })
      bodySchema.validateSync(values, { abortEarly: false })

    } catch(err) {
//console.log(err)
console.log(err.inner)
      return;
    }
*/
    pageData?.validations
      .validate(values, { abortEarly: false })
      .then(() => {
        // PUSH VALUES TO ONTEXT
        context.updateFields(values);
        // Reset Form
        resetForm();
        // Next stage
        // animation OUT
        return animateOut();//.then();
      })
      .then((animated) => {
        console.log('animated', animated)
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
      
      <motion.div 
        className={[`form-page__form-container`].css()}
//        initial={{ x: aX }}
//        transition={{}}
//        animate={{ x: aX }}
//        exit
//        translateX={aX}
        style={{ 
          x: aX 
        }}
      >
        <Paper elevation={8}>
          <form noValidate>
            <FormGroup className={[`form-page__form-group`].css()}>
              {Object.keys(fields).map(fieldName => (
                <TextField
                  className={[`form-page__form-field`].css()}
                  variant="standard"
                  key={fieldName}
                  id={fieldName}
                  type={fields[fieldName].type}
                  label={fields[fieldName].label}
                  required={fields[fieldName].required}
                  helperText={validationErrors[fieldName] && toCapitalCase(validationErrors[fieldName])}
                  error={validationErrors[fieldName]?.length > 0}
                  onChange={onFieldChange(fieldName)}
                />
              ))}
            </FormGroup>

          </form>
        </Paper>
      </motion.div>
      <NavigationButton
        className={[`form-page__form-submit`].css()}
        type="submit"
        variant="standard"
        size="lg"
        //          nextStage={stageInfo.nextStage}
        {...getButtonLabel()}
        onClick={onSubmit}
      />
      </Stack>
    </main>
  );
};

const pageData = { page: 'contact', img: '' };
export default withPageData(FormPage, pageData);

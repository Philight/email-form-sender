import React, { useCallback, useState, useEffect } from 'react';
import { useCookies, Cookies } from 'react-cookie';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Typography, Stack } from '@mui/material';

import { NavigationButton } from '@components/interactive/NavigationButton';
import { Form, AlertBox } from '@components/form';
import { Loader } from '@components/graphic';

import { signUpUser, signInUser, sendEmail } from '@api/mailer';
import { useDataContext } from '@contexts/DataContext';
import { getStageInfo } from '@store/reducers/dataReducer';
import { withPageData } from '@utils/hoc';

import { Props } from 'default-types';
interface PageProps extends Props {}

const FormPage = (props: PageProps): JSX.Element | null => {
  const { className } = props;

  const context = useDataContext();
  const formData = context.formData;
  const formStage = context.formStage;
  const stageInfo = getStageInfo(formStage);
  const pageData = context.pageData[formStage] ?? {};
  const fields = pageData?.fields ?? {};

  // Cookies
  const [cookies, setCookie] = useCookies<Cookies>();
  // Temporary local state
  const [values, setValues] = useState({});
  // Create state for form errors:
  const [validationErrors, setValidationErrors] = useState({});
  const [alert, setAlert] = useState({
    type: '',
    title: '',
    message: '',
  });

  const mSlide = useMotionValue(0);
  const aX = useTransform(mSlide, [0, 1, 2], ['100%', '0%', '-100%']);

  const mLoader = useMotionValue(0);
  const aOpacity = useTransform(mLoader, [0, 1], [0, 1]);
  const aIndex = useTransform(mLoader, [0, 1], [-100, 100]);
  const mAlert = useMotionValue(0);
  const aAlertX = useTransform(mAlert, [0, 1], ['100%', '0%']);

  const ANIMATIONS = {
    form: mSlide,
    loader: mLoader,
    alert: mAlert,
  };

  const animateEffect = async (
    element: string,
    fromStage: number,
    toStage: number,
    options?: unknown = {},
  ): (() => void) => {
    const { delay, ease, duration } = options;
    const motionValue = ANIMATIONS[element];
    return new Promise(resolve => {
      motionValue.set(fromStage);
      const animation = animate(motionValue, toStage, {
        ease: ease ?? 'easeInOut',
        duration: duration ?? 0.4,
        delay: delay,
        onComplete: () => {
          resolve(true);
        },
      });
      return () => animation.stop();
    });
  };

  const resetForm = (): void => {
    setValues({});
    setValidationErrors({});
  };

  /**
   * On every stage change
   */
  useEffect(() => {
    resetForm();
    animateEffect('form', 0, 1, { ease: 'backOut', duration: 0.8 });
  }, [formStage, animateEffect]);

  const onFieldChange = useCallback(
    (fieldName: string, newValue?: unknown, operation?: 'add' | 'remove') =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAttachments = (prevValues): [] => {
          if (operation === 'add') {
            return 'attachments' in prevValues ? [...prevValues.attachments, newValue] : [newValue];
          } else if (operation === 'remove') {
            return prevValues.attachments?.length === 1
              ? []
              : prevValues.attachments
                  ?.slice(0, newValue)
                  .concat(prevValues.attachments.slice(newValue + 1));
          }
        };

        if (fieldName === 'attachments') {
          setValues(prevValues => ({
            ...prevValues,
            attachments: newAttachments(prevValues),
          }));
        } else {
          setValues(prevValues => ({
            ...prevValues,
            [fieldName]: e.target.value,
          }));
        }
      },
    [],
  );

  const onSubmit = (event): void => {
    event.preventDefault();

    // Skip validations and go to Next stage
    if (formStage === 'landing' || formStage === 'attachments') {
      context.updateFields(values);
      context.setFormStage(stageInfo.nextStage);
      return;
    }

    // After Alert stage
    if (alert.type) {
      setAlert({ type: '', title: '', message: '' });
      animateEffect('alert', 1, 0);
      if (alert.type === 'success') {
        context.setFormStage(stageInfo.nextStage);
        return;
      }
      // Show previous Form
      return animateEffect('form', 0, 1, { ease: 'backOut', duration: 0.8 });
    }

    const callAPI = (): void => {
      // Animate Exit and Fetch API
      animateEffect('form', 1, 2, { ease: 'backOut', duration: 0.4 }).then(async animated => {
        let response: unknown;

        // Submit
        if (formStage === 'signin') {
          await animateEffect('loader', 0, 1);
          response = await signInUser(values);
          await animateEffect('loader', 1, 0, { delay: 1 });
        } else if (formStage === 'signup') {
          await animateEffect('loader', 0, 1);
          response = await signUpUser(values);
          await animateEffect('loader', 1, 0, { delay: 1 });
        } else if (formStage === 'summary') {
          await animateEffect('loader', 0, 1);
          response = await sendEmail({ ...formData, access_token: cookies.access_token });
          await animateEffect('loader', 1, 0, { delay: 1 });
        } else {
          context.setFormStage(stageInfo.nextStage);
          return;
        }

        if (response instanceof Error) {
          setAlert({ type: 'error', title: 'Error', message: response?.response?.data?.error });
          animateEffect('alert', 0, 1);
        } else if (response.status === 'success') {
          setAlert({ type: 'success', title: 'Success', message: response?.message });
          animateEffect('alert', 0, 1);
          if (formStage === 'signin') {
            setCookie('access_token', response.access_token);
            setCookie('refresh_token', response.refresh_token);
          }
        }
      });
    };

    // Validations
    if (pageData.validations) {
      pageData.validations
        .validate({ ...formData, ...values }, { abortEarly: false })
        .then(() => {
          // Update Context values
          context.updateFields(values);

          // Call API
          callAPI();
        })
        .catch(err => {
          const validErrors = err.inner.reduce((acc, error) => {
            return {
              ...acc,
              [error.path]: error.message,
            };
          }, {});
          setValidationErrors(validErrors);
        });
    } else {
      callAPI();
    }
  };

  const buttonLabelProps = (): { icon?: string; label?: string } => {
    if (stageInfo.currentStage === 'summary' && stageInfo.nextStage === 'recipients') {
      return { icon: 'envelope-fill' };
    }
    switch (stageInfo.nextStage) {
      case 'summary':
        return { icon: 'summary' };
      default:
        return { label: 'Next' };
    }
  };

  return (
    <main className={['form-page__c page', className].css()}>
      <Stack direction="column">
        <Typography variant="h3" className={[`form-page__subheading`].css()} align="center">
          {pageData?.subheading}
        </Typography>

        <Loader
          className={['form-page__loader'].css()}
          fullscreen
          overlayed
          style={{ opacity: aOpacity, zIndex: aIndex }}
        />

        <motion.div className={[`form-page__alert`].css()} style={{ x: aAlertX }}>
          <AlertBox
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClick={onSubmit}
          />
        </motion.div>

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
          {...buttonLabelProps()}
          onClick={onSubmit}
        />
      </Stack>
    </main>
  );
};

const pageData = { page: 'contact', img: '' };
export default withPageData(FormPage, pageData);

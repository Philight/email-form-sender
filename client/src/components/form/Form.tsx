import React from 'react';
import { TextField, FormGroup, Paper } from '@mui/material';

import { TextareaField, UploadField, AttachmentsField } from '@components/form';
import { toCapitalCase } from '@utils/string';

import { Props } from 'default-types';
interface ComponentProps extends Props {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const Form = (props: ComponentProps): JSX.Element | null => {
  const { className, fields, editable, values, formData, onFieldChange, validationErrors } = props;
  return (
    <Paper className={[`form__c`, className].css()} elevation={12}>
      <form noValidate>
        <FormGroup className={[`form-page__form-group`].css()}>
          {Object.keys(fields).map(fieldName =>
            ['text', 'password'].includes(fields[fieldName].type) ? (
              <TextField
                key={fieldName}
                id={fieldName}
                className={[
                  `form-page__form-field`,
                  fields[fieldName].type,
                  !editable && 'disabled',
                ].css()}
                variant="standard"
                type={fields[fieldName].type}
                label={fields[fieldName].label}
                required={fields[fieldName].required}
                defaultValue={formData[fieldName]}
                helperText={
                  validationErrors[fieldName] && toCapitalCase(validationErrors[fieldName])
                }
                error={validationErrors[fieldName]?.length > 0}
                onChange={onFieldChange(fieldName)}
                disabled={!editable}
              />
            ) : fields[fieldName].type === 'textarea' ? (
              <TextareaField
                key={fieldName}
                className={[
                  `form-page__form-field`,
                  fields[fieldName].type,
                  !editable && 'disabled',
                ].css()}
                fieldName={fieldName}
                fields={fields}
                defaultValue={formData[fieldName]}
                validationErrors={validationErrors}
                onFieldChange={onFieldChange}
                disabled={!editable}
              />
            ) : fields[fieldName].type === 'upload' ? (
              <UploadField
                key={fieldName}
                fieldName={fieldName}
                className={[`form-page__form-field`, fields[fieldName].type].css()}
                fields={fields}
                defaultValue={formData.attachments}
                value={values.attachments}
                validationErrors={validationErrors}
                onFieldChange={onFieldChange}
              />
            ) : (
              fields[fieldName].type === 'attachments' && (
                <AttachmentsField
                  key={fieldName}
                  fieldName={fieldName}
                  className={[
                    `form-page__form-field`,
                    fields[fieldName].type,
                    !editable && 'disabled',
                  ].css()}
                  fields={fields}
                  defaultValue={formData[fieldName]}
                  value={values[fieldName]}
                  validationErrors={validationErrors}
                  onFieldChange={onFieldChange}
                  disabled={!editable}
                />
              )
            ),
          )}
        </FormGroup>
      </form>
    </Paper>
  );
};

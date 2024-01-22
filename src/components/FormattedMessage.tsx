import React from 'react';
import { FormattedMessage as IntlFormattedMessage, useIntl } from 'react-intl';
import { appSelector } from 'redux/slice/app.slice';

import { useAppSelector } from 'hooks';

type Props = React.ComponentProps<typeof IntlFormattedMessage>;

const FormattedMessage: React.FC<Props> = ({ id, ...props }) => {
  const { isMultipleLanguage } = useAppSelector(appSelector);

  const intl = useIntl();

  const isMessageIdDefined = Object.prototype.hasOwnProperty.call(intl.messages, id as PropertyKey);

  return isMultipleLanguage && isMessageIdDefined ? <IntlFormattedMessage id={id} {...props} /> : id;
};

export default FormattedMessage;

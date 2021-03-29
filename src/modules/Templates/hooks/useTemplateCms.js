import {useSession} from 'next-auth/client';

import normalizeNumber from '@/utils/normalizeNumber';
import sendEmail from '@/utils/sendEmail';
import useCms from '@/modules/reactQuery/queries/useCms';

export const useTemplateCms = () => {
  const [session] = useSession();
  const {data: cmsList} = useCms();

  const onSubmitEmail = data => {
    const templateHeader = `(Credentials to ${data.cms.name})\n`;
    const templateLogin = `Login: ${data.login}\n`;
    const templateLink = `Link: ${data.cms.link}\n`;
    const templateFooter = `Best regards\n${session.user.name}`;

    const patternEmail = [templateHeader, templateLogin, templateLink, templateFooter].join('\n');

    sendEmail(data.email, templateHeader, patternEmail);
  };

  const onSubmitSms = data => {
    const templateHeader = `(Credentials to ${data.cms.name})\n`;
    const templatePassword = `Password: ${data.password}\n`;
    const templateFooter = `Best regards\n${session.user.name}`;

    const patternSms = [templateHeader, templatePassword, templateFooter].join('\n');

    sendEmail(
      `${normalizeNumber(data.phone)}@${process.env.NEXT_PUBLIC_SMS_DOMAIN}`,
      templateHeader,
      patternSms
    );
  };

  return {cmsList, onSubmitEmail, onSubmitSms};
};

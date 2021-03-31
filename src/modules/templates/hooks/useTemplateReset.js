import {useSession} from 'next-auth/client';

import normalizeNumber from '@/utils/normalizeNumber';
import sendEmail from '@/utils/sendEmail';

export const useTemplateReset = () => {
  const [session] = useSession();

  const onSubmit = data => {
    const templateHeader = `(Temporary domain password)\n`;
    const templatePassword = `Password: ${data.password}\n`;
    const templateFooter = `Best regards\n${session.user.name}`;

    const patternSms = [templateHeader, templatePassword, templateFooter].join('\n');

    if (normalizeNumber(data.phone).length === 9) {
      sendEmail(
        `${normalizeNumber(data.phone)}@${process.env.NEXT_PUBLIC_SMS_DOMAIN}`,
        templateHeader,
        patternSms
      );
    }
  };

  return {onSubmit};
};

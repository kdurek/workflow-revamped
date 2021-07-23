import {useSession} from 'next-auth/client';

import sendEmail from '@/utils/sendEmail';

const useTemplateCms = () => {
  const [session] = useSession();

  const onSubmitEmail = data => {
    const templateSubject = `Credentials to ${data.cms.name}`;
    const templateHeader = `Those are your credentials to ${data.cms.name}\n`;
    const templateLogin = `Login: ${data.login}`;
    const templatePassword = `Password: ${data.password}\n`;
    const templateLink = `Link: ${data.cms.link}\n`;
    const templateFooter = `Best regards\n${session.user.name}`;

    const patternEmail = [
      templateHeader,
      templateLogin,
      templatePassword,
      templateLink,
      templateFooter,
    ].join('\n');

    sendEmail(data.email, templateSubject, patternEmail);
  };

  return {onSubmitEmail};
};

export default useTemplateCms;

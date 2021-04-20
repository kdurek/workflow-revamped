const sendEmail = (to, subject = '', body = '', cc = ' ') => {
  const compose = `mailto:${to}?cc=${cc}&subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.open(compose, '_blank');
};

export default sendEmail;

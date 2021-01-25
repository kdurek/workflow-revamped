const sendEmail = (to, subject = '', body = '', cc = ' ') => {
  const compose = `mailto:${to}?cc=${cc}&subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = compose;
};

export default sendEmail;

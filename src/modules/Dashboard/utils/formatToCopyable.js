import copyToClipboard from '@/utils/copyToClipboard';

const formatToCopyable = tonersList => {
  let data = [];
  tonersList.forEach(toner => {
    data.push(`${toner.brand} ${toner.code} - ${2 - toner.amount}`);
  });
  copyToClipboard(data.join('\n'));
};

export default formatToCopyable;

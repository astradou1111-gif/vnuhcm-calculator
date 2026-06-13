export const checkUitLanguageBonus = (type, score, score2 = '') => {
  const val = parseFloat(score);
  if (isNaN(val) && type !== 'JLPT') return 0;
  
  if (type === 'IELTS') {
    return val >= 5.0 ? 5 : 0;
  }
  if (type === 'TOEFL') {
    return val >= 50 ? 5 : 0;
  }
  if (type === 'TOEIC') {
    const val2 = parseFloat(score2);
    if (isNaN(val2)) return 0;
    return (val >= 650 && val2 >= 250) ? 5 : 0;
  }
  if (type === 'JLPT') {
    if (!score) return 0;
    const level = score.toString().toUpperCase().trim();
    return ['N3', 'N2', 'N1'].includes(level) ? 5 : 0;
  }
  return 0;
};

export const roundUit = (value) => Math.round(value * 100) / 100;

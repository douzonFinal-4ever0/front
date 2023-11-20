export const getFormattedTime = () => {
  const currentDate = new Date();

  const hours = currentDate.getHours().toString().padStart(2, '0');

  // 분을 0으로 설정하여 정각으로만 처리
  const formattedTime = `${hours}:00`;

  return formattedTime;
};

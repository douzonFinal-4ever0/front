export const convertDataTree = (data) => {
  // //const { name, email, position_name, deptVO } = data;
  const items = {};
  //부서명 추출
  const uniqueDeptNames = new Set();
  data.forEach((user) => {
    if (user.deptVO && user.deptVO['dept_name']) {
      uniqueDeptNames.add(user.deptVO['dept_name']);
    }
  });
  const uniqueDeptNamesArray = Array.from(uniqueDeptNames);

  // 루트 데이터 생성
  const root = {
    index: 'root',
    isFolder: true,
    children: uniqueDeptNamesArray,
    data: 'Root item'
  };

  // items 객체에 루트 데이터 삽입
  items['root'] = root;

  // 부서별 사원 리스트
  const deptList = [];
  uniqueDeptNamesArray.forEach((i) => {
    const dept = data.filter((user) => user.deptVO['dept_name'] === i);
    deptList.push(dept);
  });

  // 부서 child 데이터 생성
  uniqueDeptNamesArray.forEach((item) => {
    items[item] = {
      index: item,
      children: [],
      data: item,
      isFolder: true
    };
  });

  // 부서 chilren에 사원명 리스트 업데이트
  deptList.forEach((dept) => {
    const deptName = dept[0].deptVO.dept_name;
    const arr = dept.map((item) => item.name);
    items[deptName].children = [...arr];
  });

  // 사원 child 데이터 생성
  deptList.forEach((dept) => {
    dept.forEach((user) => {
      const memChild = {
        index: user.name,
        data: `${user.name} (${user.email})`,
        children: []
      };

      items[memChild.index] = memChild;
    });
  });

  return items;
};

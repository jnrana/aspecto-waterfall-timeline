export const unFlattenData = (data, parentKey) => {
  let tree = data
    .map((i) => ({ ...i }))
    .sort((a, b) => {
      return new Date(a.startTime) - new Date(b.startTime);
    });

  const output = {};
  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    output[item.spanId] = item;
    for (let j = 0; j < tree.length; j++) {
      const subItem = tree[j];
      if (subItem.parentSpanId === item.spanId) {
        output[item.spanId].children = output[item.spanId]?.children || [];
        output[item.spanId].children.push(subItem);
      }
    }
  }

  return tree;
};

export const filterInitRecords = (records: any[]) => {
  if (!records.length) return [];
  const myMap = new Map<String, Set<String>>();

  Object.keys(records[0]).forEach((key) => {
    myMap.set(key, new Set<any>());
  });

  const filteredRecords: any[] = [];
  records.forEach((record) => {
    let state: boolean = true;
    Object.keys(record).forEach((key) => {
      if (myMap.has(key) && myMap.get(key)?.has(record[key])) state = false;
    });

    if (state) {
      filteredRecords.push(record);
      Object.keys(record).forEach((key) => {
        if (myMap.has(key)) myMap.get(key)?.add(record[key]);
      });
    }
  });
  return filteredRecords;
};

export const filterDatabaseRecords = (
  databaseRecords: any[],
  toBeAddedRecords: any[]
) => {
  if (!databaseRecords.length) return toBeAddedRecords;

  const myMap = new Map<String, Set<any>>();

  Object.keys(toBeAddedRecords[0]).forEach((key) => {
    myMap.set(key, new Set<any>());
  });

  databaseRecords.forEach((record) => {
    Object.keys(record).forEach((key) => {
      if (myMap.has(key)) myMap.get(key)?.add(record[key]);
    });
  });
  toBeAddedRecords = toBeAddedRecords.filter((record) => {
    let state: boolean = true;
    Object.keys(record).forEach((key) => {
      if (myMap.has(key) && myMap.get(key)?.has(record[key])) state = false;
    });
    return state;
  });
  return toBeAddedRecords;
};

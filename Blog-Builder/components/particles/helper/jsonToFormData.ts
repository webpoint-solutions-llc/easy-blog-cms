export function convertJsonToFormData(requestData: any) {
  const formData = new FormData();
  for (const data in requestData) {
    if (requestData[data] instanceof Array) {
      requestData[data].forEach((dataEl: any, index: number) => {
        if (dataEl instanceof Object && !(dataEl instanceof File)) {
          Object.keys(dataEl).forEach((elKey) => formData.append(`${data}[${index}].${elKey}`, dataEl[elKey]));
        } else if (dataEl instanceof File) {
          formData.append(`${data}`, dataEl);
        } else if (typeof dataEl === 'number' || typeof dataEl === 'string') {
          formData.append(`${data}[${index}]`, dataEl.toString());
        }
      });
    } else if (requestData[data] instanceof Object && !(requestData[data] instanceof File)) {
      Object.entries(requestData[data]).forEach(([key, value]: [string, any]) =>
        formData.append(`${data}.${key}`, value),
      );
    } else {
      formData.append(data, requestData[data]);
    }
  }

  return formData;
}

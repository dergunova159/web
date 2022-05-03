export interface IData {
  id?: number;
  name?: string;
  start?: string;
  end?: string;
}


function BaseGet<T>(url): Promise<T> {
  return new Promise((resolve, reject) => {
    $.get(url, (res: T) => {
      resolve(res);
    });
  });
}

function BasePost<T>(url, args = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    $.post(url, args, (res: T) => {
      resolve(res);
    });
  });
}

export function GetIssues() {
  return BaseGet<Array<IData>>("/api/issues");
}

export function NewIssue(obj) {
  return BasePost<IData>("/api/issues/new", obj);
}

export function EditIssue(obj) {
  return BasePost<number>("/api/issues/edit", obj);
}

export function DeleteIssue(obj) {
  return BasePost<number>("/api/issues/delete", obj);
}